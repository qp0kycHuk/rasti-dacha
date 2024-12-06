const setCookie = (event) => {
  const block = event.target.closest('[data-cookie]')
  const id = block.id
  const path = String(block.dataset.cookie) || ''

  document.cookie = `cookie_${id}_active=1; path=${path}; max-age=${7 * 24 * 60 * 60}`
  block.remove()
}

export default () => {
  document.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-cookie-button'))
      setCookie(event)
  })
}
