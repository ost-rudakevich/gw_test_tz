const API = 'http://127.0.0.1:8000'

const headerTopMenuItems = [
  { name: 'Про нас', link: '' },
  { name: 'Відгуки', link: '' },
  { name: 'Оплата та доставка', link: '' },
  { name: 'Обмін та повернення', link: '' },
  { name: 'Блог', link: '' }
]

const topMenuList = document.querySelector('.header__top-menu')

headerTopMenuItems.forEach(element => {
  const listElement = document.createElement('li')
  listElement.className = 'header__top-menu-item'
  listElement.textContent = element.name
  topMenuList.appendChild(listElement)
})

class ApiService {
  constructor(baseUrl = 'http://127.0.0.1:8000') {
    this.baseUrl = baseUrl
  }

  async getProductData(endpoint = 'search', query = 'product') {
    try {
      const response = await fetch(
        `${this.baseUrl}/${endpoint}/?query=${encodeURIComponent(query)}`
      )
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
      }
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error:', error)
      return []
    }
  }
}

window.addEventListener('DOMContentLoaded', async () => {
  const apiService = new ApiService()

  new SearchManager(apiService)

  const products = await apiService.getProductData()
  const container = document.querySelector('.products')
  products.forEach(product => {
    const card = new ProductCard(product, 'product-card')
    container.appendChild(card.createCard())
  })

  const slider = new Slider()
  slider.renderSlider('.carousel')

  const categories = new Categories()
  categories.renderCategories('.header__bottom-menu')
  categories.renderCategories('.footer__categories')

  const bottomShowcase = new BottomShowcase(products, 'bottom-showcase')
  bottomShowcase.create()
  bottomShowcase.create('left')
})

class SearchManager {
  constructor(apiService) {
    this.apiService = apiService
    this.input = document.getElementById('input')
    this.btn = document.getElementById('searchBtn')
    this.output = document.getElementById('output')
    this.init()
  }

  init() {
    this.btn.addEventListener('click', () => this.handleSearch())
  }

  async handleSearch() {
    const query = this.input.value.trim()
    if (!query) {
      this.output.style.display = 'none'
      this.output.classList.remove('show')
      return
    }

    const result = await this.apiService.getProductData('search', query)
    this.renderSearchResults(result)
  }

  renderSearchResults(result) {
    this.output.innerHTML = ''
    this.output.className = 'output'

    if (result && result.length > 0) {
      const ul = document.createElement('ul')
      ul.className = 'output__list'

      result.forEach(item => {
        const li = document.createElement('li')
        li.className = 'output__list-element'
        const horizontalProductCard = new ProductCard(
          item,
          'product-card',
          'horizontal'
        )

        li.appendChild(horizontalProductCard.createCard())
        ul.appendChild(li)
      })

      this.output.appendChild(ul)
      this.output.style.display = 'block'
      this.output.classList.add('show')
    } else {
      this.output.textContent = 'Нічого не знайдено або помилка'
      this.output.style.display = 'block'
      this.output.classList.add('show')
    }
  }
}

class ProductCard {
  constructor(product, className, layout = 'vertical') {
    this.product = product
    this.className = className
    this.layout = layout
  }

  createClassName(value) {
    return this.layout === 'vertical'
      ? `${this.className}__${value}`
      : `${this.className}__${value} ${this.className}__${value}--horizontal`
  }

  createCard() {
    const card = document.createElement('div')
    card.className =
      this.layout === 'vertical'
        ? `${this.className}`
        : `${this.className} ${this.className}--horizontal`

    // Фото
    const img = document.createElement('img')
    img.className = this.createClassName('image')
    img.src = this.product.image
    img.alt = this.product.name
    card.appendChild(img)

    // Контейнер для тексту і кнопок
    const info = document.createElement('div')
    info.className = this.createClassName('info')

    const title = document.createElement('div')
    title.className = this.createClassName('title')
    info.appendChild(title)

    // Назва
    const name = document.createElement('span')
    name.className = this.createClassName('name')
    name.textContent = this.product.name
    title.appendChild(name)

    // Сердечко
    if (this.layout === 'vertical') {
      const favoriteBtn = document.createElement('button')
      favoriteBtn.className = `${this.className}__favorite`
      favoriteBtn.innerHTML = '<i class="fa-regular fa-heart fa-lg"></i>'

      if (this.isFavorite(this.product.id)) {
        favoriteBtn.classList.add(`${this.className}__favorite--active`)
      }

      favoriteBtn.addEventListener('click', () =>
        this.toggleFavorite(this.product.id, favoriteBtn)
      )
      title.appendChild(favoriteBtn)
    }

    // Наявність
    const availability = document.createElement('span')
    availability.className = this.createClassName('availability')
    availability.textContent = this.product.available
      ? 'В наявності'
      : 'Немає в наявності'
    info.appendChild(availability)

    const bottomInfo = document.createElement('div')
    bottomInfo.className = this.createClassName('bottom-info')

    // Стара ціна (якщо є)
    if (this.product.price !== this.product.price_without_discount) {
      const oldPrice = document.createElement('span')
      oldPrice.className = `${this.createClassName(
        'price'
      )} ${this.createClassName('price--old')}`
      oldPrice.textContent = `${this.product.price_without_discount} UAN`
      bottomInfo.appendChild(oldPrice)
    }

    // Ціна
    const price = document.createElement('span')
    price.className = this.createClassName('price')
    price.textContent = `${this.product.price} UAN`
    bottomInfo.appendChild(price)

    // Рейтинг
    if (this.layout === 'vertical') {
      const rating = document.createElement('div')
      rating.className = this.createClassName('raiting')
      const ratingValue = Math.floor(this.product.rating)
      rating.textContent = '★'.repeat(ratingValue) + '☆'.repeat(5 - ratingValue)
      bottomInfo.appendChild(rating)
    }

    info.appendChild(bottomInfo)

    card.appendChild(info)

    return card
  }

  isFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || []
    return favorites.includes(productId)
  }

  toggleFavorite(productId, btn) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || []

    if (this.isFavorite(productId)) {
      favorites = favorites.filter(id => id !== productId)
      btn.classList.remove(`${this.className}__favorite--active`)
    } else {
      favorites.push(productId)
      btn.classList.add(`${this.className}__favorite--active`)
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}

class BottomShowcase {
  constructor(products, className) {
    this.products = products
    this.className = className
  }

  getRandomProducts(count = 2) {
    return this.products.sort(() => Math.random() - 0.5).slice(0, count)
  }

  createBanner() {
    const randomProduct = this.getRandomProducts(1)[0]
    const banner = document.createElement('img')
    banner.src = randomProduct.image
    banner.alt = 'Banner'
    banner.className = `${this.className}__banner`
    return banner
  }

  create(startSide = 'right') {
    const bottomShowcase = document.querySelector('.' + this.className)

    const productsContainer = document.createElement('div')
    productsContainer.className = `${this.className}__products-container`

    const productsWrapper = document.createElement('div')
    productsWrapper.className = `${this.className}__products-wrapper`

    this.getRandomProducts().forEach(product => {
      const card = new ProductCard(product, 'product-card')
      productsWrapper.appendChild(card.createCard())
    })

    productsContainer.appendChild(productsWrapper)

    const container = document.createElement('div')
    container.className = 'bottom-showcase__container'

    if (startSide === 'right') {
      container.appendChild(productsContainer)
      container.appendChild(this.createBanner())
      container.style.justifyContent = 'end'
    } else if (startSide === 'left') {
      container.appendChild(this.createBanner())
      container.appendChild(productsContainer)
      container.style.justifyContent = 'start'
    }

    bottomShowcase.appendChild(container)
    const btnContainer = document.createElement('div')
    btnContainer.className = 'button__container'

    const button = document.createElement('button')
    button.textContent = 'Переглянути всі знижки'
    button.className = 'button-container'
    button.style.width = '100%'

    btnContainer.appendChild(button)
    productsContainer.appendChild(btnContainer)
  }
}

class Categories {
  getCategoriesData() {
    const categoriesElement = document.getElementById('categories-data')
    if (categoriesElement && categoriesElement.textContent) {
      try {
        return JSON.parse(categoriesElement.textContent)
      } catch (error) {
        console.error('Помилка парсингу категорій', error)
      }
    }
    return []
  }

  renderCategories(className) {
    const categoriesList = this.getCategoriesData()
    const container = document.querySelector(className)

    if (!container || !categoriesList.length) return

    container.innerHTML = ''

    categoriesList.forEach(category => {
      const categoryElement = document.createElement('li')
      const categoryButton = document.createElement('button')

      categoryButton.textContent = category.name
      categoryButton.dataset.categoryId = category.id

      categoryElement.appendChild(categoryButton)
      container.appendChild(categoryElement)
    })

    this.initDropdownHandlers(categoriesList)
  }

  initDropdownHandlers(categoriesList) {
    const buttons = document.querySelectorAll('.header__bottom-menu button')
    const dropdown = document.querySelector('.category-dropdown')
    const headerBottom = document.querySelector('.header__bottom')

    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        const categoryId = button.dataset.categoryId
        this.fillDropdownContent(categoryId, categoriesList)
        dropdown.style.opacity = '1'
      })
    })

    headerBottom.addEventListener('mouseleave', () => {
      dropdown.style.opacity = '0'
    })

    dropdown.addEventListener('mouseleave', () => {
      dropdown.style.opacity = '0'
    })
  }

  fillDropdownContent(categoryId, categoriesList) {
    const category = categoriesList.find(cat => cat.id == categoryId)
    const dropdown = document.querySelector('.category-dropdown')

    if (category && dropdown) {
      const dropDownLeft = dropdown.querySelector('.category-dropdown__left')
      dropDownLeft.innerHTML = ''
      const span = document.createElement('span')
      span.textContent = category.name
      dropDownLeft.appendChild(span)

      const dropDownRightList = dropdown.querySelector(
        '.category-dropdown__right-list'
      )
      dropDownRightList.innerHTML = ''
      for (let i = 1; i <= 5; i++) {
        const li = document.createElement('li')
        li.textContent = `${category.name}.${i}`
        dropDownRightList.appendChild(li)
      }
    }
  }
}

class Slider {
  getSliders() {
    const sliderElement = document.getElementById('main_slider-data')
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
      slide.className = 'carousel__slide'
      if (index === 0) slide.dataset.active = true

      const img = document.createElement('img')
      img.src = slider.image
      img.alt = slider.name || `Slide ${index + 1}`

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
          .closest('.carousel')
          .querySelector('[data-slides]')
        const activeSlide = slides.querySelector('[data-active]')

        if (!activeSlide) return

        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if (newIndex < 0) newIndex = slides.children.length - 1
        if (newIndex >= slides.children.length) newIndex = 0

        delete activeSlide.dataset.active
        slides.children[newIndex].dataset.active = true
      })
    })
  }
}
