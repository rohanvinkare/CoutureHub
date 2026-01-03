export default function Loader() {
  return (
    <div className="relative overflow-x-auto border rounded-lg animate-pulse">
      <table className="w-full text-sm text-left">
        {/* Header Skeleton */}
        <thead className="bg-gray-100 border-b">
          <tr>
            <th className="p-4">
              <div className="h-4 w-12 bg-gray-300 rounded" />
            </th>
            {Array.from({ length: 8 }).map((_, i) => (
              <th key={i} className="px-4 py-3">
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </th>
            ))}
          </tr>
        </thead>

        {/* Body Skeleton */}
        <tbody>
          {Array.from({ length: 8 }).map((_, row) => (
            <tr key={row} className="border-b">
              {/* Image cell */}
              <td className="p-4">
                <div className="w-14 h-14 bg-gray-200 rounded" />
              </td>

              {/* Text cells */}
              {Array.from({ length: 8 }).map((_, col) => (
                <td key={col} className="px-4 py-3">
                  <div
                    className={`h-3 bg-gray-200 rounded
                      ${col === 0 ? 'w-40' : 'w-24'}
                    `}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
