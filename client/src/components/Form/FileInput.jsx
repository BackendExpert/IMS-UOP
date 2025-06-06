import React from 'react'

const FileInput = ({ label, name, onChange, required = false, accept, multiple = false }) => {
    return (
        <div className="mb-5">
            {label && (
                <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>
            )}
            <input
                type="file"
                name={name}
                id={name}
                onChange={onChange}
                required={required}
                accept={accept}
                multiple={multiple}
                className="block w-full cursor-pointer rounded-2xl border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:rounded-2xl file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:text-gray-800 hover:file:bg-gray-200 transition"
            />
        </div>
    )
}

export default FileInput