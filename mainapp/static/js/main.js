const API = 'http://127.0.0.1:8000'

const headerTopMenuItems = [
  { name: 'Про нас', link: '' },
  { name: 'Відгуки', link: '' },
  { name: 'Оплата та доставка', link: '' },
  { name: 'Обмін та повернення', link: '' },
  { name: 'Блог', link: '' }
]

const topMenuList = document.querySelector('#header-top-menu')

headerTopMenuItems.forEach(element => {
  const listElement = document.createElement('li')
  listElement.className = `
  cursor-pointer hover:text-blue-600 transition-colors duration-200 
  text-center break-keep text-[10px]
  sm:text-[12px]
  lg:text-[14px]
  xl:text-[15px]
  3xl:text-[25px]
  4xl:text-[30px]
  5xl:text-[35px]
  `
  listElement.textContent = element.name
  topMenuList.appendChild(listElement)
})

document.addEventListener('DOMContentLoaded', async () => {
  const apiService = new ApiService()
  new FavoritesManager()

  new SearchManager(apiService)

  const slider = new Slider()
  slider.renderSlider()

  const categories = new Categories()
  categories.initDropdownHandlers()
})
