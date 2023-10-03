import by from './lang/by'
import ru from './lang/ru'

function init(selector) {
  const country = ru

  document.addEventListener('input', (event) => {
    const target = event.target

    if (!target.matches(selector)) return
    const maskedValue = country.getMaskedValue(target.value)

    target.value = maskedValue

    const blurHandler = () => {
      if (!country.isComplete(target.value)) {
        target.value = ''
      }
    }

    target.addEventListener('blur', blurHandler, { once: true })
  })
}

export default { init }
