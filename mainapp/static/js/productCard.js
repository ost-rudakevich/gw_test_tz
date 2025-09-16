class ProductCard {
  constructor(product) {
    this.product = product
  }

  createCard() {
    // Контейнер карточки
    const card = document.createElement('div')
    card.className =
      'flex h-[70px] w-[300px] gap-x-[20px] flex-row cursor-pointer'

    // Зображення
    const img = document.createElement('img')
    img.className = 'h-[70px] w-[60px] object-cover cursor-pointer'
    img.src = this.product.image
    img.alt = this.product.name
    img.loading = 'lazy'
    card.appendChild(img)

    // Контейнер для тексту і кнопок
    const info = document.createElement('div')
    info.className = 'flex flex-col justify-between w-full h-full gap-0'

    // Заголовок + сердечко
    const title = document.createElement('div')
    title.className = 'flex justify-between items-center text-[14px]'

    const name = document.createElement('span')
    name.textContent = this.product.name

    title.appendChild(name)
    info.appendChild(title)

    // Нижня частина (ціна + стара ціна)
    const bottomInfo = document.createElement('div')
    bottomInfo.className = 'flex gap-x-[15px] items-center justify-start'

    if (this.product.price !== this.product.price_without_discount) {
      const oldPrice = document.createElement('span')
      oldPrice.className = 'text-[14px] text-[#9a9a9a] line-through'
      oldPrice.textContent = `${this.product.price_without_discount} UAH`
      bottomInfo.appendChild(oldPrice)
    }

    const price = document.createElement('span')
    price.className = 'text-[14px]'
    price.textContent = `${this.product.price} UAH`
    bottomInfo.appendChild(price)

    // Наявність
    const availability = document.createElement('span')
    availability.className = 'text-[10px]'
    availability.textContent = this.product.available
      ? 'В наявності'
      : 'Немає в наявності'

    info.appendChild(bottomInfo)
    info.appendChild(availability)
    card.appendChild(info)

    return card
  }
}

class FavoritesManager {
  constructor() {
    this.favorites = this.loadFavorites()
    this.init()
  }

  loadFavorites() {
    const data = localStorage.getItem('favorites')
    return data ? JSON.parse(data) : []
  }

  saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites))
  }

  toggleFavorite(productId) {
    if (this.favorites.includes(productId)) {
      this.favorites = this.favorites.filter(id => id !== productId)
    } else {
      this.favorites.push(productId)
    }
    this.saveFavorites()
    this.updateUI(productId)
  }

  updateUI(productId) {
    const buttons = document.querySelectorAll(
      `[data-product-id="${productId}"] i`
    )
    buttons.forEach(btn => {
      if (this.favorites.includes(productId)) {
        btn.classList.remove('fa-regular')
        btn.classList.add('fa-solid', 'text-red-500')
      } else {
        btn.classList.remove('fa-solid', 'text-red-500')
        btn.classList.add('fa-regular')
      }
    })
  }

  init() {
    document.querySelectorAll('[data-product-id]').forEach(btn => {
      const productId = Number(btn.dataset.productId)
      this.updateUI(productId)

      btn.addEventListener('click', e => {
        e.preventDefault()
        this.toggleFavorite(productId)
      })
    })
  }
}
