import React from 'react'

export default function Avatar({role}) {
  return (
    <div className="avatar online placeholder w-14 max-h-14 ">
        <div className="bg-neutral text-neutral-content rounded-full  ">
            <span className="text-sm">{role == 'assistant' ? 'GPT': role }</span>
        </div>
    </div>
  )
}
