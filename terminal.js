// const { ipcRenderer } = require('electron')

const command = async ([ cmd, ...args]) => {
  if (cmd == 'goto') {
    // get tab-view
    let tab = document.getElementById('tab-container')
    tab.style.display = "flex"

    let pasted = await navigator.clipboard.readText()
    let [ url, rest ] = args
    console.log(url, url == 'pasted')
    // url == 'pasted' ? url = pasted : url = url
    url == 'pasted' ? tab.innerHTML = `<webview class="tab" id="view" src="${await navigator.clipboard.readText()}"></webview>`
    : rest || !url.includes('.') ? tab.innerHTML = `<webview class="tab" id="view" src="http://google.com/search?q=${args.join('+')}"></webview>`
    : tab.innerHTML = `<webview class="tab" id="view" src="http://${url}"></webview>`

    // set container.height to 5%
    document.getElementById('container').style.height = "1em"
    document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight
  }
  if (cmd == 'back') {
    let view = document.getElementById('view')
    view.goBack()
  }
  if (cmd == 'forward') {
    let view = document.getElementById('view')
    view.goForward()
  }
  if (cmd == 'close') {
    let tab = document.getElementById('tab-container')
    tab.style.display = "none"
    document.getElementById('container').style.height = "auto"
  }
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
window.addEventListener('load', async function() {
  console.log(await navigator.clipboard.readText())
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
  else if (e.key == 'CapsLock' || e.key == 'Shift' || e.key == 'Meta') {

  } else {
    input.innerHTML += e.key
  }

})
