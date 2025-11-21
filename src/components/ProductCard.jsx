function ProductCard({ item }) {
  return (
    <div className="group rounded-xl border border-blue-500/20 bg-slate-800/40 p-4 hover:border-blue-400/40 transition-colors">
      <div className="aspect-[4/3] rounded-lg bg-slate-900/60 mb-4 overflow-hidden flex items-center justify-center">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <div className="text-blue-300/50 text-sm">No Image</div>
        )}
      </div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-blue-50 font-semibold leading-tight">{item.name}</h3>
          <p className="text-xs text-blue-300/60">{item.brand}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-blue-200">${item.price?.toLocaleString()}</div>
          {typeof item.rating === 'number' && (
            <div className="text-xs text-amber-300/80">⭐ {item.rating.toFixed(1)}</div>
          )}
        </div>
      </div>
      {item.highlights?.length > 0 && (
        <ul className="mt-3 text-xs text-blue-200/80 list-disc list-inside space-y-1">
          {item.highlights.slice(0,3).map((h, idx) => (
            <li key={idx}>{h}</li>
          ))}
        </ul>
      )}
      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium py-2 rounded-lg transition-colors">Add to Cart</button>
    </div>
  )
}

export default ProductCard
