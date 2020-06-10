// TERMINAL LISTENERS

document.addEventListener('click', (e) => {
  let args = e.target.innerHTML.split(' ')
  let [url, ...rest] = args.reverse()
  if (url.startsWith('http')) {
    let tabs = document.getElementById('tab-container')
    for (var i = 0; i < tabs.children.length; i++) {
      if (tabs.children[i].src == url) {
        tabs.removeChild(tabs.children[i])
        let ev = new CustomEvent(`open`, { detail: [url] })
        document.dispatchEvent(ev)
      }
    }
  }
})

document.addEventListener('ls', () => {
  let tabs = document.getElementById('tab-container').children
  let container = document.getElementById('container')

  for (var i = 0; i < tabs.length; i++) {
    // generate div
    let div = document.createElement("div")
    div.className = 'line ls'
    div.innerHTML = `
      <div class="input"> ${i+1}|: ${tabs[i].getTitle()} ${tabs[i].src}</div>
    `

    container.appendChild(div)
    window.scrollTo(0, container.scrollHeight)
    container.scrollTop = container.scrollHeight
  }
})

document.addEventListener('esc', () => {
  document.getElementById('tab-container').style.display = "none"
  document.getElementById('container').style.height = "auto"
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

document.addEventListener('window', () => {
  let modal = window.open('http://oryoki.io/', 'open')
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

  window.open(src, 'goto')
})

document.addEventListener('open', ({ detail }) => {

    let [ url, rest ] = detail

    let src = url.startsWith('http') ? url
    : rest || !url.includes('.') ? `http://google.com/search?q=${detail.join('+')}`
    : `https://${url}`

    window.open(src, 'open')
})

document.addEventListener('switch', ({ detail }) => {
    console.log('switch', detail)
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
