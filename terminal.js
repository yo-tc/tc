// const { ipcRenderer } = require('electron')

const command = ([ cmd, ...args]) => {
  switch (cmd) {
    case 'goto':
      // get tab-view
      let tab = document.getElementById('tab-container')
      tab.style.display = "flex"
      tab.innerHTML = `<webview class="tab" src="http://google.com/search?q=${args.join('+')}"></webview>`
      console.log(tab.innerHTML)
      // set container.height to 5%
      document.getElementById('container').style.height = "5%"
    break;
    default:
      return
  }
  // if (cmd == 'goto') {
  //
  //   let goto = new Event('goto', { args: args });
  //   window.dispatchEvent(goto);
  // }
}

const runCommand = (cmd) => {
  let args = cmd.split(' ')
  command(args)
}

const newline = () => {

  // generate div
  let div = document.createElement("div")
  div.className = 'line'
  div.innerHTML = `
    <span> tc </span>
    <div class="input"><div></div><span class="caret">█</span></div>
  `

  // append div to container
  let container = document.getElementById('container')
  container.appendChild(div)
  window.scrollTo(0, document.getElementById('container').scrollHeight)
  container.scrollTop = container.scrollHeight

  return div;
}

let line;
window.addEventListener('load', function() {
  line = newline()
})

// NOTE: prevent unnwannted scrolling on 'Space' keydown
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});

document.addEventListener('keydown', function (e) {

  // window.scrollTo(0, document.getElementById('container').scrollHeight)
  let container = document.getElementById('container')
  container.scrollTop = container.scrollHeight

  let div = line.children[1]
  let input = div.children[0]

  if (e.key == 'Enter') {
    div.removeChild(div.children[1])
    line = newline()
    runCommand(input.innerHTML)
  }
  else if (e.key == 'Backspace'){
    let str = input.innerHTML
    str = `${str.substring(0, str.length - 1)}`
    input.innerHTML = str
  }
  else if (e.key == 'CapsLock' || e.key == 'Shift') {

  } else {
    input.innerHTML += e.key
  }

})
