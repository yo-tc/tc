// const path = require('path')
// const command = require('./command.js')

let caret = `█`

const command = ([ cmd, ...args]) => {
  switch (cmd) {
    case 'goto':
      window.open('http://google.com/search?q='+args.join('+'))
    break;
    default:
      return
  }
}

const runCommand = (cmd) => {
  let parsed = cmd.substring(3)
  let args = parsed.split(' ')
  command(args)
}

const newline = () => {

  // generate div
  let div = document.createElement("div")
  div.className = 'line'
  div.innerHTML = `tc ${caret}`

  // append div to app-content
  let contents = document.getElementById('app-contents')
  contents.appendChild(div)
  window.scrollTo(0,document.body.scrollHeight)

  return div;
}

let line;
window.addEventListener('load', function() {
  line = newline()
})

window.addEventListener('keyup', function (e) {
  if (e.key == 'Meta') console.log('Meta pressed')
})

document.addEventListener('keyup', function (e) {
  console.log(e.key)

  if (e.key == 'Enter') {
    let str = line.innerHTML
    str = `${str.substring(0, str.length - 1)}`
    line.innerHTML = str
    runCommand(line.innerHTML)
    line = newline()
  }
  else if (e.key == 'Backspace'){
    let str = line.innerHTML
    str = `${str.substring(0, str.length - 2)}${caret}`
    line.innerHTML = str
  }
  else if (e.key == 'CapsLock' || e.key == 'Shift') {

  } else {
    line.innerHTML = line.innerHTML.substring(0, line.innerHTML.length - 1)
    line.innerHTML += `${e.key}${caret}`
  }

})
