document.addEventListener('toggleopen', (event) => {
	if (
		event.detail.target.closest('#mobil') ||
		event.detail.target.closest('#catalog-filter') ||
		event.detail.target.closest('#news-catalog-nav')
	) {
		document.body.classList.add('menu-opened')
	}
})
document.addEventListener('toggleclose', (event) => {
	if (
		event.detail.target.closest('#mobil') ||
		event.detail.target.closest('#catalog-filter') ||
		event.detail.target.closest('#news-catalog-nav')
	) {
		document.body.classList.remove('menu-opened')
	}
})

window.addEventListener('swipe', function (event) {
	if (!('ontouchstart' in window)) return;
	const offset = 50;
	const sidebar = document.getElementById('mobil');
	const filter = document.getElementById('catalog-filter');
	const newsNav = document.getElementById('news-catalog-nav');

	if (event.detail.startTarget.closest('.irs')) return;
	if (event.detail.startTarget.closest('.bx_filter_block')) return;

	if (event.detail.startX < offset && event.detail.dir == 'right' && sidebar && !sidebar.classList.contains('toggle-active')) {
		window.Toggle.toggle(sidebar.id);
		return
	}

	if (event.detail.dir == 'left' && sidebar && sidebar.classList.contains('toggle-active')) {
		window.Toggle.toggle(sidebar.id);
		return
	}

	if (event.detail.dir == 'left' && filter && filter.classList.contains('toggle-active')) {
		window.Toggle.toggle(filter.id);
		return
	}

	if (event.detail.dir == 'left' && newsNav && newsNav.classList.contains('toggle-active')) {
		window.Toggle.toggle(newsNav.id);
		return
	}
})


function checkFieldsError(form) {
	const fields = [...form.querySelectorAll('input, textarea, select')]
	let isValid = true


	fields.map((input) => {
		if (input.getAttribute('data-required') != null && !input.value) {
			const field = input.closest('.form-field')
			field.classList.add('form-field-error')

			isValid = false

			const onInput = (event) => field.classList.remove('form-field-error')
			input.addEventListener('input', onInput, { once: true })
		}
	})

	return isValid
}


window.addEventListener('submit', (event) => {

	if (!event.target.closest('.kit-ajax-form')) return
	event.preventDefault()

	const isValid = checkFieldsError(event.target)
	if (!isValid) return

	console.log('kit-ajax-form');

	const formData = new FormData(event.target)

	fetch('/local/ajax/forms.php', {
		method: 'post',
		body: formData
	})
		.then((response) => response.text())
		.then((result) => {
			console.log(result);

			jQuery.fancybox.close()
			jQuery.fancybox.openModal('/local/ajax/dialog-info.html')

			event.target.reset()
			event.target.querySelectorAll('.form-field-error').forEach(element => element.classList.remove('form-field-error'));
		})
})



Waves.init({
	duration: 500,
});
Waves.attach('.btn:not(.btn--link)');
Waves.attach('.waves');
Waves.attach('.card-page__image');
Waves.attach('.card-page-card-icon');






function click(event) {
	function scrollTo() {
		const target = event.target.closest('a[href]');
		const href = target.getAttribute('href');
		console.log(target);

		if (!href) return;
		if (href[0] != '#' || href == '#') return;

		event.preventDefault();

		var element = document.querySelector(href);
		const offset = 45;
		const bodyRect = document.body.getBoundingClientRect().top;
		const elementRect = element.getBoundingClientRect().top;
		const elementPosition = elementRect - bodyRect;
		const offsetPosition = elementPosition - offset;

		window.scrollTo({
			top: offsetPosition,
			behavior: 'smooth'
		});
	}
	if (event.target.closest('a[href]')) scrollTo();



}


document.addEventListener('click', click);



