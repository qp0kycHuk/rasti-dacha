const copyLink = (event) => {
  const button = event.target
  const copy = button.closest('[data-copy]')
  const input = copy.querySelector('*[data-copy-input]')

  setTimeout(() => {
    input.select()
    document.execCommand('copy')
    button.textContent = 'Скопировано!'
    button.setAttribute('disabled', 'disabled')
    button.style.background = 'var(--color-accent)'
    button.style.color = 'var(--color-primary)'
  }, 100)

  setTimeout(() => window.Fancybox.close(), 2000)
}

const init = () => {
  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-copy-button]')) copyLink(event)
  })
}

export default { init }