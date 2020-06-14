let keysPressed = []

const runCommand = (line) => {
  let [cmd, ...args] = line.split(' ')
  let ev = new CustomEvent(`${cmd}`, { detail: args })

  // Dispatch the event.
  document.dispatchEvent(ev)
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
  window.scrollTo(0, document.body.scrollHeight)
  document.body.scrollTop = document.body.scrollHeight

  return div;
}

let line;
window.addEventListener('load', async function() {
  line = newline()
})

// NOTE: prevent unnwannted scrolling on 'Space' keydown
window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
})

document.addEventListener('keyup', () => {
  keysPressed = []
})

document.addEventListener('keydown', async function (e) {
  keysPressed[event.key] = true;

  window.scrollTo(0, document.body.scrollHeight)
  document.body.scrollTop = document.body.scrollHeight

  let div = line.children[1]
  let input = div.children[0]

  if (e.key == 'Enter') {
    div.removeChild(div.children[1])
    runCommand(input.innerHTML)
    line = newline()
  }
  else if (e.key == 'Backspace'){
    let str = input.innerHTML
    str = `${str.substring(0, str.length - 1)}`
    input.innerHTML = str
  }
  else if (e.key == 'CapsLock' || e.key == 'Shift' || e.key == 'Meta') {

  }
  else if (e.key == 'ArrowUp' || e.key == 'ArrowDown' || e.key == 'ArrowRight' || e.key == 'ArrowLeft') {

  }
  else if (keysPressed['Meta'] && event.key == 'v') {
    let pasted = await navigator.clipboard.readText()
    input.innerHTML += pasted
  } else {
    input.innerHTML += e.key
  }

})
