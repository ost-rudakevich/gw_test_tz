class Slider {
  getSliders() {
    const sliderElement = document.getElementById('main-slider-data')
    if (sliderElement && sliderElement.textContent) {
      try {
        return JSON.parse(sliderElement.textContent)
      } catch (error) {
        console.error('Помилка парсингу слайдеру', error)
      }
    }
    return []
  }

  renderSlider() {
    const slidersList = this.getSliders()
    const slidesContainer = document.querySelector('[data-slides]')

    if (!slidesContainer || slidersList.length === 0) return

    slidesContainer.innerHTML = ''

    slidersList.forEach((slider, index) => {
      const slide = document.createElement('li')
      slide.className =
        'absolute inset-0 h-full opacity-0 transition-opacity duration-200 ease-in-out transition-delay-200'
      if (index === 0) {
        slide.dataset.active = true
        slide.classList.add('opacity-100', 'z-10', 'transition-delay-0')
      }

      const img = document.createElement('img')
      img.src = slider.image
      img.alt = slider.name || `Slide ${index + 1}`
      img.className =
        'block object-cover h-full w-full transition-opacity duration-500 ease-in-out'

      slide.appendChild(img)
      slidesContainer.appendChild(slide)
    })

    this.initCarouselButtons()
  }

  initCarouselButtons() {
    const buttons = document.querySelectorAll('[data-carousel-button]')

    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const offset = button.dataset.carouselButton === 'next' ? 1 : -1
        const slides = button
          .closest('[data-carousel]')
          .querySelector('[data-slides]')
        const activeSlide = slides.querySelector('[data-active]')

        if (!activeSlide) return

        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        delete activeSlide.dataset.active
        activeSlide.classList.remove(
          'opacity-100',
          'z-10',
          'transition-delay-0'
        )
        activeSlide.classList.add('opacity-0', 'transition-delay-200')

        slides.children[newIndex].dataset.active = true
        slides.children[newIndex].classList.remove(
          'opacity-0',
          'transition-delay-200'
        )
        slides.children[newIndex].classList.add(
          'opacity-100',
          'z-10',
          'transition-delay-0'
        )
      })
    })
  }
}
