import React from 'react'

interface TooltipProps {
  children: React.ReactNode
  title: string
  position?: 'top' | 'right' | 'left' | 'bottom'
}

const variants = {
  top: {
    container: 'left-1/2 -translate-x-1/2 bottom-full',
    item: 'bottom-[-3px] left-1/2 -translate-x-1/2',
  },
  bottom: {
    container: 'top-full left-1/2 -translate-x-1/2',
    item: 'top-[-3px] left-1/2 -translate-x-1/2',
  },
  right: {
    container: 'left-full top-1/2 -translate-y-1/2',
    item: 'left-[-3px] top-1/2 -translate-y-1/2',
  },
  left: {
    container: 'right-full top-1/2 -translate-y-1/2',
    item: 'right-[-3px] top-1/2 -translate-y-1/2',
  },
}

function Tooltip({ children, title, position = 'top' }: TooltipProps) {
  return (
    <div className="relative inline-block group">
      {children}
      <div
        className={`absolute z-20 whitespace-nowrap rounded bg-black py-[6px] px-4 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 ${variants[position].container}`}
      >
        <span
          className={`absolute w-2 h-2 rotate-45 bg-black rounded-sm -z-10 ${variants[position].item}`}
        />
        {title}
      </div>
    </div>
  )
}

export default Tooltip
