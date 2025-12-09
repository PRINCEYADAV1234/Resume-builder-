import React from 'react'

export default function Promotional() {
  return (
    <div id="contact">
      <div className="m-auto flex flex-col md:flex-row items-center justify-around text-sm border border-gray-200 rounded-2xl m-4 max-w-5xl w-full bg-white mb-9">
        
    <div className="flex flex-col text-center md:text-left items-center md:items-start pt-14 md:p-10">
        <h2 className="  text-gray-800">Boost your productivity.<br />Start using our app today.</h2>

        <div className="flex items-center gap-4 mt-6">
            <button type="button" aria-label="getStarted" className="bg-indigo-500 hover:bg-indigo-600 px-7 py-2.5 text-white rounded-md active:scale-95 transition-all">
                Get started
            </button>
        </div>
    </div>
</div>
    </div>
  )
}
