import { useEffect, useMemo, useState } from 'react'
import Header from './components/Header'
import Filters from './components/Filters'
import ProductCard from './components/ProductCard'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [brands, setBrands] = useState([])
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // filters
  const [selectedBrand, setSelectedBrand] = useState('')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchBrands()
    fetchItems()
  }, [])

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/brands`)
      const data = await res.json()
      setBrands(data.items || [])
    } catch (e) {
      // silent fail for brands
      setBrands([])
    }
  }

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    try {
      const params = new URLSearchParams()
      if (selectedBrand) params.set('brand', selectedBrand)
      if (minPrice) params.set('min_price', minPrice)
      if (maxPrice) params.set('max_price', maxPrice)
      if (searchTerm) params.set('q', searchTerm)

      const res = await fetch(`${baseUrl}/api/laptops?${params.toString()}`)
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      setItems(data.items || [])
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const onSearch = (term) => {
    setSearchTerm(term)
    // defer to fetch with new term
    setTimeout(fetchItems, 0)
  }

  const onApplyFilters = () => {
    fetchItems()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <Header onSearch={onSearch} />

        <div className="mt-8 bg-slate-900/40 border border-blue-500/20 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-blue-100">Browse Laptops</h2>
            <span className="text-xs text-blue-300/70">Backend: {baseUrl}</span>
          </div>

          <Filters
            brands={brands}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onApply={onApplyFilters}
          />

          {loading ? (
            <div className="text-center py-12 text-blue-300">Loading...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-300">{error}</div>
          ) : items.length === 0 ? (
            <div className="text-center py-12 text-blue-300/80">No laptops found. Try adjusting filters.</div>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {items.map((it) => (
                <ProductCard key={it.id} item={it} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
