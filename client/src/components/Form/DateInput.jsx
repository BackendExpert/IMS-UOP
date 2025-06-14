import React from 'react'

const DateInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    required = false,
    min,
    max
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type="date"
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                min={min}
                max={max}
                className="w-full rounded-2xl border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
        </div>
    )
}

export default DateInput
