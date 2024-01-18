const init = () => {
    const certificates = document.querySelectorAll('*[data-certificate]')

	certificates.forEach((certificate) => {
		if (!certificate) return

		const canvas = certificate.querySelector('*[data-certificate-canvas]')
		const download = certificate.querySelector('*[data-certificate-download]')
		const context = canvas.getContext('2d')
		const image = new Image()

		image.addEventListener('load', () => {
			context.drawImage(image, 0, 0)
			context.font = '32px Inter'
			context.fillStyle = 'rgba(35, 35, 35, 0.5)'
			context.textAlign = 'center'
			context.fillText(certificate.dataset.certificate, canvas.width/2, canvas.height/1.2)

			if (download) download.href = canvas.toDataURL()
		})

		image.src = canvas.dataset.certificateCanvas
	})
}

export default { init }