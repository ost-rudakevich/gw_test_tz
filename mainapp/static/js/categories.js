class Categories {
  initDropdownHandlers() {
    const buttons = document.querySelectorAll('#header-bottom-menu button')
    const dropdown = document.getElementById('category-dropdown')
    const headerBottom = document.getElementById('header-bottom')

    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        const categoryName = button.textContent
        this.fillDropdownContent(categoryName)
        dropdown.classList.remove('opacity-0', '-translate-y-5', 'scale-90')
        dropdown.classList.add('opacity-100', 'translate-y-0', 'scale-100')
      })
    })

    const hideDropdown = () => {
      dropdown.classList.remove('opacity-100', 'translate-y-0', 'scale-100')
      dropdown.classList.add('opacity-0', '-translate-y-5', 'scale-90')
    }

    headerBottom.addEventListener('mouseleave', hideDropdown)
    dropdown.addEventListener('mouseleave', hideDropdown)
  }

  fillDropdownContent(categoryName) {
    const dropDownLeft = document.getElementById('category-dropdown-left')
    const dropDownRightList = document.getElementById(
      'category-dropdown-right-list'
    )

    dropDownLeft.innerHTML = ''
    const span = document.createElement('span')
    span.textContent = categoryName
    dropDownLeft.appendChild(span)

    dropDownRightList.innerHTML = ''
    for (let i = 1; i <= 5; i++) {
      const li = document.createElement('li')
      li.textContent = `${categoryName}.${i}`
      li.className =
        'text-[#333] hover:text-blue-600 cursor-pointer transition-colors'
      dropDownRightList.appendChild(li)
    }
  }
}
