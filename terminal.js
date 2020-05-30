// const command = ([ cmd, ...args]) => {
//   switch (cmd) {
//     case 'goto':
//       window.location = `http://google.com/search?q=${args.join('+')}`
//     break;
//     default:
//       return
//   }
// }
//
// const runCommand = (cmd) => {
//   let args = cmd.split(' ')
//   command(args)
// }

const newline = () => {

  // generate div
  let div = document.createElement("div")
  div.className = 'line'
  div.innerHTML = `
    <span> tc </span>
    <div class="input"><div></div><span class="caret">█</span></div>
  `

  // append div to container
  document.getElementById('container').appendChild(div)
  window.scrollTo(0,document.body.scrollHeight)

  return div;
}

let line;
window.addEventListener('load', function() {
  line = newline()
})

document.addEventListener('keydown', function (e) {

  window.scrollTo(0,document.body.scrollHeight)

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
