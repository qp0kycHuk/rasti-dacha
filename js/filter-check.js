document.addEventListener('click',(event)=>{
  if(event.target.closest('[data-check-label]')){
    const id = event.target.closest('[data-check-label]').getAttribute('data-check-label')
    const list = [...document.querySelectorAll('[data-check-input="' + id + '"]')]
    let checked = true;
    if(list.filter((item)=>item.checked).length > list.filter((item)=>!item.checked).length){
      checked = false
    }
    list.map((item)=>{
      item.checked = checked
    })
  }
})