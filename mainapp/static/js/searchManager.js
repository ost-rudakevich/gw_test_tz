class SearchManager {
  constructor(apiService) {
    this.apiService = apiService
    this.input = document.getElementById('input')
    this.btn = document.getElementById('searchBtn')
    this.output = document.getElementById('output')
    this.debounceTimer = null
    this.init()
  }

  init() {
    this.btn.addEventListener('click', () => this.handleSearch())

    this.input.addEventListener('input', () => {
      clearTimeout(this.debounceTimer)
      this.debounceTimer = setTimeout(() => this.handleSearch(), 500)
    })
  }

  async handleSearch() {
    const query = this.input.value.trim()

    if (!query) {
      this.hideResults()
      return
    }

    if (query.length < 2) {
      return
    }

    try {
      const result = await this.apiService.getProductData('search', query)
      this.renderSearchResults(result)
    } catch (error) {
      this.showMessage('Помилка пошуку')
    }
  }

  renderSearchResults(result) {
    this.output.innerHTML = ''

    if (result && result.length > 0) {
      const ul = document.createElement('ul')
      ul.className = 'list-none m-0 p-0'

      result.forEach(item => {
        const li = document.createElement('li')
        li.className =
          'p-[8px] cursor-pointer transition-colors duration-200 hover:bg-[#f0f0f0]'

        const productCard = new ProductCard(item)
        const cardElement = productCard.createCard()

        li.appendChild(cardElement)
        ul.appendChild(li)
      })

      this.output.appendChild(ul)
      this.showResults()
    } else {
      this.showMessage('Нічого не знайдено')
    }
  }

  showResults() {
    this.output.classList.remove('hidden')
    setTimeout(() => {
      this.output.classList.remove(
        'opacity-0',
        '-translate-y-6',
        'scale-75',
        'blur-xl',
        'rotate-[-5deg]'
      )
      this.output.classList.add(
        'opacity-100',
        'translate-y-0',
        'scale-100',
        'blur-none',
        'rotate-none'
      )
    }, 10)
  }

  hideResults() {
    this.output.classList.add('hidden')
    this.output.classList.remove(
      'opacity-100',
      'translate-y-0',
      'scale-100',
      'blur-none',
      'rotate-none'
    )
    this.output.classList.add(
      'opacity-0',
      '-translate-y-6',
      'scale-75',
      'blur-xl',
      'rotate-[-5deg]'
    )
  }

  showMessage(message) {
    this.output.innerHTML = `<div class="p-2 text-gray-500">${message}</div>`
    this.showResults()
  }
}
