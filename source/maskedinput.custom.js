function maskedInputInit() {
	$('input[type="tel"]').mask('+7 (9 9 9) 9 9 9 - 9 9 - 9 9', { autoclear: false });
}

maskedInputInit()



document.addEventListener('input', (event) => {
	if (!event.target.closest('[data-mask="order"]')) return
	const input = event.target
	const value = input.value;


	if (value.match(/(\d{1,}_\/\d)/g)) {
		let values = value.split('_/')
		values[0] = values[0].replace(/[^0-9]/g, '')
		values[1] = values[1].replace(/[^0-9]/g, '')[0]
		input.value = values[0] + '/' + values[1]

	} else if (value.match(/(\d{1,}\/\d)/g)) {
		let values = value.split('/')
		values[0] = values[0].replace(/[^0-9]/g, '')
		values[1] = values[1].replace(/[^0-9]/g, '')[0]
		input.value = values[0] + '/' + values[1]

	} else if (value.match(/(\d{1,}\/)/g)) {
		let values = value.split('/')
		values[0] = values[0].replace(/[^0-9]/g, '')
		input.value = values[0] + '/_'
		input.setSelectionRange(input.value.length - 1, input.value.length - 1)

	} else {
		let numValue = parseInt(value.replace(/[^0-9]/g, ''));
		if (isNaN(numValue)) numValue = '';
		input.value = numValue + '_/'
		input.setSelectionRange(input.value.length - 2, input.value.length - 2)

	}


})