import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check } from 'lucide-react'

export default function CustomSelect({
    value,
    onChange,
    options = [],
    placeholder = 'Select...',
    icon: Icon,
    className = ''
}) {
    const [isOpen, setIsOpen] = useState(false)
    const containerRef = useRef(null)

    const selectedOption = options.find(opt => opt.value === value)

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div className={`relative ${className}`} ref={containerRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full h-10 pl-10 pr-10 text-left bg-white border rounded-lg text-sm transition-all duration-200 outline-none
          ${isOpen ? 'border-indigo-500 ring-2 ring-indigo-500/10' : 'border-gray-200 hover:border-gray-300'}
        `}
            >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {Icon && <Icon className="h-4 w-4 text-gray-500" />}
                </div>

                <span className={`block truncate ${!selectedOption ? 'text-gray-500' : 'text-gray-900'}`}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>

                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown
                        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                    />
                </div>
            </button>

            {isOpen && (
                <div
                    className="absolute z-50 mt-1 w-full bg-white rounded-lg shadow-xl border border-gray-100 py-1 overflow-y-auto focus:outline-none animate-in fade-in zoom-in-95 duration-100 origin-top max-h-60 [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none' }}
                >
                    {options.length > 0 ? (
                        options.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    onChange(option.value)
                                    setIsOpen(false)
                                }}
                                className={`w-full text-left px-3 py-2 text-sm flex items-center justify-between group transition-colors
                  ${option.value === value ? 'bg-indigo-50 text-indigo-700' : 'text-gray-700 hover:bg-gray-50'}
                `}
                            >
                                <span className={`block truncate ${option.value === value ? 'font-medium' : 'font-normal'}`}>
                                    {option.label}
                                </span>
                                {option.count !== undefined && (
                                    <span className="ml-auto mr-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-500">
                                        {option.count}
                                    </span>
                                )}
                                {option.value === value && (
                                    <Check className="h-4 w-4 text-indigo-600" />
                                )}
                            </button>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-sm text-gray-400 text-center">
                            No options
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
