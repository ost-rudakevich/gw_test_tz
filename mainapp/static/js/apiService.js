class ApiService {
  constructor(baseUrl = 'http://127.0.0.1:8000') {
    this.baseUrl = baseUrl
  }

  async getProductData(endpoint = 'search', query = '') {
    try {
      const response = await fetch(
        `${this.baseUrl}/${endpoint}/?query=${encodeURIComponent(query)}`
      )

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API error:', error)
      return []
    }
  }
}
