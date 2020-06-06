const genId = () => '_' + Math.random().toString(36).substr(2, 9)

let current;

const newview = (src) => {
  // generate div
  let wv = document.createElement("webview")
  wv.className = 'tab'
  wv.id = genId()
  wv.src = src

  // append div to container
  let container = document.getElementById('tab-container')
  container.appendChild(wv)

  return wv;
}

current = newview()

document.addEventListener('goto', ({ detail }) => {
  // get tab-view
  let tab = document.getElementById('tab-container')
  tab.style.display = "flex"

  let [ url, rest ] = detail

  let src = url.startsWith('http') ? url
  : rest || !url.includes('.') ? `http://google.com/search?q=${detail.join('+')}`
  : `https://${url}`

  current.src = src

  // set container.height to 5%
  document.getElementById('container').style.height = "1em"
  document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight
})

document.addEventListener('back', () => {
  current.goBack()
})

document.addEventListener('forward', ({ detail }) => {
  current.goForward()
})

document.addEventListener('close', () => {
  document.getElementById('tab-container').removeChild(current)
  if (document.getElementById('tab-container').hasChildNodes()) {
    current = document.getElementById('tab-container').firstChild
    current.style.display = "inherit"
  } else {
    document.getElementById('container').style.height = "auto"
  }
})

document.addEventListener('open', ({ detail }) => {
  let tab = document.getElementById('tab-container')
  tab.style.display = "flex"

  // set container.height to 5%
  document.getElementById('container').style.height = "1em"
  document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight

  current.style.display = "none"

  let [ url, rest ] = detail

  let src = url.startsWith('http') ? url
  : rest || !url.includes('.') ? `http://google.com/search?q=${detail.join('+')}`
  : `https://${url}`

  current = newview(src)
})
