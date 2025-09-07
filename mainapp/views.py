from unicodedata import category
from django.http import JsonResponse
from django.shortcuts import render

main_slider = [
    {'id': 1, 'name': 'Main Slider 1', 'image': 'https://picsum.photos/600/500'},
    {'id': 2, 'name': 'Main Slider 2', 'image': 'https://picsum.photos/600/500'},
    {'id': 3, 'name': 'Main Slider 3', 'image': 'https://picsum.photos/600/500'},
]

categories = [
    {'id': 1, 'name': 'Category 1', 'image': 'https://picsum.photos/600/500'},
    {'id': 2, 'name': 'Category 2', 'image': 'https://picsum.photos/600/500'},
    {'id': 3, 'name': 'Category 3', 'image': 'https://picsum.photos/600/500'},
]

products = [
    {'id': 1, 'name': 'Product 1', 'price': 100, 'price_without_discount': 100, 'rating': 4.5, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 2, 'name': 'Product 2', 'price': 200, 'price_without_discount': 200, 'rating': 4.0, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 3, 'name': 'Product 3', 'price': 300, 'price_without_discount': 300, 'rating': 3.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 4, 'name': 'Product 4', 'price': 400, 'price_without_discount': 470, 'rating': 3.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 5, 'name': 'Product 5', 'price': 500, 'price_without_discount': 500, 'rating': 2.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 2},
    {'id': 6, 'name': 'Product 6', 'price': 600, 'price_without_discount': 600, 'rating': 2.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 7, 'name': 'Product 7', 'price': 700, 'price_without_discount': 710, 'rating': 1.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 2},
    {'id': 8, 'name': 'Product 8', 'price': 800, 'price_without_discount': 800, 'rating': 1.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 9, 'name': 'Product 9', 'price': 900, 'price_without_discount': 900, 'rating': 0.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 10, 'name': 'Product 10', 'price': 1000, 'price_without_discount': 1400, 'rating': 0.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 11, 'name': 'Product 11', 'price': 1100, 'price_without_discount': 1100, 'rating': 0.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 2},
    {'id': 12, 'name': 'Product 12', 'price': 1200, 'price_without_discount': 1200, 'rating': 1.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 13, 'name': 'Product 13', 'price': 1300, 'price_without_discount': 1800, 'rating': 1.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 2},
    {'id': 14, 'name': 'Product 14', 'price': 1400, 'price_without_discount': 1400, 'rating': 2.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 15, 'name': 'Product 15', 'price': 1500, 'price_without_discount': 1500, 'rating': 2.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 3},
    {'id': 16, 'name': 'Product 16', 'price': 1600, 'price_without_discount': 1600, 'rating': 3.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 2},
    {'id': 17, 'name': 'Product 17', 'price': 1700, 'price_without_discount': 1700, 'rating': 3.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 18, 'name': 'Product 18', 'price': 1800, 'price_without_discount': 1800, 'rating': 4.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 2},
    {'id': 19, 'name': 'Product 19', 'price': 1900, 'price_without_discount': 1900, 'rating': 4.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 3},
    {'id': 20, 'name': 'Product 20', 'price': 2000, 'price_without_discount': 2000, 'rating': 1.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 21, 'name': 'Product 21', 'price': 2100, 'price_without_discount': 2100, 'rating': 2.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 3},
    {'id': 22, 'name': 'Product 22', 'price': 2200, 'price_without_discount': 2200, 'rating': 3.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 23, 'name': 'Product 23', 'price': 2300, 'price_without_discount': 2300, 'rating': 1.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 24, 'name': 'Product 24', 'price': 2400, 'price_without_discount': 2400, 'rating': 2.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 25, 'name': 'Product 25', 'price': 2500, 'price_without_discount': 2800, 'rating': 2.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 26, 'name': 'Product 26', 'price': 2600, 'price_without_discount': 2600, 'rating': 4.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 27, 'name': 'Product 27', 'price': 2700, 'price_without_discount': 2700, 'rating': 4.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 28, 'name': 'Product 28', 'price': 2800, 'price_without_discount': 2800, 'rating': 4.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 29, 'name': 'Product 29', 'price': 2900, 'price_without_discount': 2900, 'rating': 0.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 30, 'name': 'Product 30', 'price': 3000, 'price_without_discount': 3400, 'rating': 1.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 31, 'name': 'Product 31', 'price': 3100, 'price_without_discount': 3800, 'rating': 0.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 2},
    {'id': 32, 'name': 'Product 32', 'price': 3200, 'price_without_discount': 3200, 'rating': 1.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 33, 'name': 'Product 33', 'price': 3300, 'price_without_discount': 3300, 'rating': 1.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 3},
    {'id': 34, 'name': 'Product 34', 'price': 3400, 'price_without_discount': 3400, 'rating': 2.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 35, 'name': 'Product 35', 'price': 3500, 'price_without_discount': 3500, 'rating': 2.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 3},
    {'id': 36, 'name': 'Product 36', 'price': 3600, 'price_without_discount': 3600, 'rating': 3.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1  },
    {'id': 37, 'name': 'Product 37', 'price': 3700, 'price_without_discount': 3700, 'rating': 3.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 38, 'name': 'Product 38', 'price': 3800, 'price_without_discount': 3800, 'rating': 4.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 39, 'name': 'Product 39', 'price': 3900, 'price_without_discount': 3900, 'rating': 4.5, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
    {'id': 40, 'name': 'Product 40', 'price': 4000, 'price_without_discount': 4200, 'rating': 5.0, 'new': True, 'top': True, 'image': 'https://picsum.photos/230/270', 'available': True, 'category_id': 1},
    {'id': 41, 'name': 'Product 41', 'price': 4100, 'price_without_discount': 4500, 'rating': 5.0, 'new': False, 'top': False, 'image': 'https://picsum.photos/230/270', 'available': False, 'category_id': 1},
]

def index(request):
    return render(request, 'index.html', {'products': products, 'categories': categories, 'main_slider': main_slider})

def search(request):
    query = request.GET.get('query', '').strip().lower()
    if not query:
        return JsonResponse([], safe=False)

    results = [
        product for product in products
        if query in product['name'].lower()
    ][:10]

    return JsonResponse(results, safe=False)