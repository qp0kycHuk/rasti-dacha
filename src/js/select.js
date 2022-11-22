function init() {
  document.addEventListener('click', (event) => {
    if (event.target.closest('.select-item')) {
      const select = event.target.closest('.select')
      const item = event.target.closest('.select-item')
      const toggler = select.querySelector('.select-toggler')
      const value = item.getAttribute('data-value')
      const target = select.querySelector('.select-target')
      const content = document.getElementById(select.getAttribute('data-content'))

      toggler.innerHTML = item.querySelector('.select-item-inner').outerHTML
      if (content) {
        if (item.querySelector('.select-item-content')) {
          content.innerHTML = item.querySelector('.select-item-content')?.innerHTML
        } else {
          content.innerHTML = ''
        }
      }


      let toSelect = target.querySelector(`option[value='${value}']`);
      if (!toSelect) {
        [toSelect] = target.options;
      }
      toSelect.selected = true;
      target.dispatchEvent(new CustomEvent('change'));

    }
  })
}

export default { init }