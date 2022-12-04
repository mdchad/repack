import React from 'react'

function Card({ children, className }: any) {
    return (
        <div className={`bg-white border border-gray-200 rounded-lg shadow-md p-4 ${className || ''}`}>
            {children}
        </div>
    )
}

export default Card