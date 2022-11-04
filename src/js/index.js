import ripple from 'npm-kit-ripple';
import Swiper, { Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy } from 'swiper';
import mask from './input-tel'
import slider from './slider.js'

import '../source/jquery.fancybox.min.css'
import '../source/ion.rangeSlider.min.css'
import '../fonts/stylesheet.css'
import '../scss/style.scss'
import '../scss/frontend--style.scss'


Swiper.use([Navigation, Pagination, Scrollbar, Autoplay, Grid, Thumbs, EffectFade, Lazy]);
Swiper.defaults.touchStartPreventDefault = false
window.Swiper = Swiper

window.addEventListener('DOMContentLoaded', loadHandler)

function loadHandler() {

    mask.init()
    slider.init()


    ripple.init()
	ripple.attach('.btn')
	ripple.attach('.waves')
	ripple.attach('.card-page__image')
	ripple.attach('.card-page-card-icon')
	ripple.deAttach('.btn--link')

    document.addEventListener('click', click);



}


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

