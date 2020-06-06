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
    div.dataset.src = tabs[i].src
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

document.addEventListener('home', ({ detail }) => console.log('return to home directory'))

document.addEventListener('mkdir', ({ detail }) => console.log('create new directory'))
