import React from 'react'

export default function SummaryForm({ data, onChange }) {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Professional Summary</h2>
      <textarea
        className="w-full border border-gray-300 rounded-md p-3 text-sm focus:ring-2 focus:ring-blue-400 outline-none"
        rows="5"
        placeholder="Write a short summary about yourself..."
        value={data || ''}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
