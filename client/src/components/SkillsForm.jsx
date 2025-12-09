import React, { useState } from 'react'

export default function SkillsForm({ data, onChange }) {
  const [skill, setSkill] = useState('')

  const addSkill = () => {
    if (skill.trim() !== '') {
      onChange([...data, skill.trim()])
      setSkill('')
    }
  }

  const removeSkill = (index) => {
    const newData = data.filter((_, i) => i !== index)
    onChange(newData)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Skills</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          placeholder="Add a skill (e.g. React, Python)"
          className="flex-1 border border-gray-300 rounded-md p-2 text-sm"
        />
        <button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((s, i) => (
          <span
            key={i}
            className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
          >
            {s}
            <button
              onClick={() => removeSkill(i)}
              className="text-red-500 hover:text-red-700 ml-1"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  )
}
