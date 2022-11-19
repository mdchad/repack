import React from 'react'

function Tags({ children }) {
    return (
        <div className="text-[10px] font-bold leading-sm uppercase py-2 px-3 rounded-full bg-[#293C4A] text-[#fff] tracking-[.15em]">
            #{children}
        </div>
    )
}

export default Tags