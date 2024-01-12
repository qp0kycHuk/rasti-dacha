import toggle from 'npm-kit-toggle';
import tab from 'npm-kit-tab';
import ripple from 'npm-kit-ripple';
import slider from './slider'
import fancybox from "./fancybox";
import phonemask from "./phonemask/phonemask";
import showPass from "./show-pass";
import select from "./select";
import filterCheck from "./filter-check";
import profileLoadPhoto from "./profile-load-photo";
import copyLink from "./copy-link";

import '../scss/index.scss'

window.addEventListener('DOMContentLoaded', loadHandler)

fancybox.init()

function loadHandler() {
	toggle.init()
	tab.init()
	phonemask.init('[type="tel"]')
	slider.init()
	showPass.init()
	select.init()
	filterCheck.init()
	profileLoadPhoto.init()

	ripple.init();
	ripple.attach('.btn:not(.btn--link)');
	ripple.attach('.waves');
	ripple.attach('.card-page__image');
	ripple.attach('.card-page-card-icon');
	copyLink.init()
}


document.addEventListener('toggleopen', (event) => {
	if (
		event.detail.target.closest('#mobil') ||
		event.detail.target.id == 'catalog-filter' ||
		event.detail.target.closest('#news-catalog-nav')
	) {
		document.body.classList.add('menu-opened')
	}
})

document.addEventListener('toggleclose', (event) => {
	if (
		event.detail.target.closest('#mobil') ||
		event.detail.target.id == 'catalog-filter' ||
		event.detail.target.closest('#news-catalog-nav')
	) {
		document.body.classList.remove('menu-opened')
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

			Fancybox.close()

			Fancybox.show([{

				src: '/local/ajax/dialog-info.php',
				type: 'ajax',
				dragToClose: false,
				mainClass: 'fancybox-modal'

			}])

			event.target.reset()
			event.target.querySelectorAll('.form-field-error').forEach(element => element.classList.remove('form-field-error'));
		})
})










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