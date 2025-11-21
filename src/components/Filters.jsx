import { useEffect } from 'react'

function Filters({ brands, selectedBrand, setSelectedBrand, minPrice, setMinPrice, maxPrice, setMaxPrice, onApply }) {
  useEffect(() => {
    // no-op for now
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <select
        value={selectedBrand}
        onChange={(e) => setSelectedBrand(e.target.value)}
        className="bg-slate-800/60 border border-blue-500/20 rounded-lg px-3 py-3 text-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      >
        <option value="">All Brands</option>
        {brands.map((b) => (
          <option key={b.name} value={b.name}>{b.name} {b.count ? `(${b.count})` : ''}</option>
        ))}
      </select>
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        className="bg-slate-800/60 border border-blue-500/20 rounded-lg px-3 py-3 text-blue-100 placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        className="bg-slate-800/60 border border-blue-500/20 rounded-lg px-3 py-3 text-blue-100 placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      />
      <div className="sm:col-span-3 flex justify-end">
        <button onClick={onApply} className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">Apply Filters</button>
      </div>
    </div>
  )
}

export default Filters
