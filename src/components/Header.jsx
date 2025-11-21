import { useState } from 'react'

function Header({ onSearch }) {
  const [term, setTerm] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch(term)
  }

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.25),transparent_60%)]" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600/20 border border-blue-400/20 flex items-center justify-center">
              <span className="text-blue-400 font-bold">L</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-white leading-tight">Laptop Hub</h1>
              <p className="text-xs text-blue-200/80">Your one-stop shop for HP, Dell, Lenovo and more</p>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="mt-6 flex items-center gap-2">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search laptops by name..."
            className="flex-1 bg-slate-800/60 border border-blue-500/20 rounded-lg px-4 py-3 text-blue-100 placeholder:text-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <button type="submit" className="px-4 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors">Search</button>
        </form>
      </div>
    </header>
  )
}

export default Header
