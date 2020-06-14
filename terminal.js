// TERMINAL LISTENERS
let list = []
let current = ''

// only called from main.js
const nav = (url) => {
  let ev = new CustomEvent(`goto`, { detail: [url] })
  document.dispatchEvent(ev)
}

document.addEventListener('click', (e) => {
  let args = e.target.innerHTML.split(' ')
  let [url, ...rest] = args.reverse()
  if (url.startsWith('http')) {
    let ev = new CustomEvent(`switch`, { detail: url })
    document.dispatchEvent(ev)
  }
})

document.addEventListener('ls', () => {
  let tabs = list
  let container = document.getElementById('container')

  for (var i = 0; i < tabs.length; i++) {
    // generate div
    let div = document.createElement("div")
    div.className = 'line ls'
    div.innerHTML = `
      <div class="input"> ${i+1}|: ${tabs[i]}</div>
    `

    container.appendChild(div)
    window.scrollTo(0, container.scrollHeight)
    container.scrollTop = container.scrollHeight
  }
})

document.addEventListener('esc', () => {
  window.open('', 'esc')
})

document.addEventListener('help', () => {
  let div = document.createElement("div")
  div.style.marginLeft = "3%"
  div.style.marginTop = "1%"
  div.style.marginBottom = "1%"
  div.style.lineHeight = "2em"

  div.innerHTML = `
      <span style="color: magenta;">goto &ltquery&gt</span> : go to site or perform a search, query can be several terms
      <br>
      <span style="color: magenta;">open &ltquery&gt</span> : open a new tab and goto &ltquery&gt
      <br>
      <span style="color: magenta;">back</span>       : go to the previous page
      <br>
      <span style="color: magenta;">forward</span>    : go to the next page
      <br>
      <span style="color: magenta;">esc</span>        : escape to terminal mode, press &quotesc&quot key to open up page again
      <br>
      <span style="color: magenta;">home</span>       : return to the home directory
      <br>
      <span style="color: magenta;">ls</span>         : list all the tabs on the working directory
      <br>
      <span style="color: magenta;">mkdir &ltname&gt</span> : create a new directory
      <br>
      <span style="color: magenta;">cd &ltname&gt</span>    : enter a directory
  `

  container.appendChild(div)
  window.scrollTo(0, container.scrollHeight)
  container.scrollTop = container.scrollHeight
})

document.addEventListener('home', () => console.log('return to home directory'))

document.addEventListener('mkdir', ({ detail }) => console.log('create new directory'))

document.addEventListener('cd', ({ detail }) => console.log('enter a directory'))

// TAB LISTENERS
const genId = () => '_' + Math.random().toString(36).substr(2, 9)

document.addEventListener('goto', ({ detail }) => {

  let [ url, rest ] = detail

  let src = url.startsWith('http') ? url
  : rest || !url.includes('.') ? `http://google.com/search?q=${detail.join('+')}`
  : `https://${url}`

  let index = list.indexOf(current)
  list[index] = src
  window.open(src, 'goto')
})

document.addEventListener('open', ({ detail }) => {

    let [ url, rest ] = detail

    let src = url.startsWith('http') ? url
    : rest || !url.includes('.') ? `http://google.com/search?q=${detail.join('+')}`
    : `https://${url}`

    current = src
    list.push(src)
    window.open(src, 'open')
})

document.addEventListener('switch', ({ detail }) => {
    window.open(detail, 'switch')
})

document.addEventListener('back', () => {
  window.open('', 'back')
})

document.addEventListener('forward', ({ detail }) => {
  window.open('', 'forward')
})

document.addEventListener('close', () => {
  window.open('', 'close')
})
