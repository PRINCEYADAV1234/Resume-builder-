import React from 'react'

export default function EducationForm({ data, onChange }) {
  const handleChange = (index, field, value) => {
    const newData = [...data]
    newData[index][field] = value
    onChange(newData)
  }
  const addEducation = () => {
    onChange([...data, { degree: '', institution: '', year: '' }])
  }

  const removeEducation = (index) => {
    const newData = data.filter((_, i) => i !== index)
    onChange(newData)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Education</h2>
      {data.map((edu, i) => (
        <div key={i} className="border border-gray-200 p-3 rounded-md mb-3 space-y-2">
          <input
            type="text"
            placeholder="Degree (e.g. B.Tech in IT)"
            value={edu.degree}
            onChange={(e) => handleChange(i, 'degree', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Institution (e.g. IIT Delhi)"
            value={edu.institution}
            onChange={(e) => handleChange(i, 'institution', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
          <input
            type="text"
            placeholder="Year (e.g. 2023)"
            value={edu.year}
            onChange={(e) => handleChange(i, 'year', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
          <button
            onClick={() => removeEducation(i)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
      >
        + Add Education
      </button>
    </div>
  )
}
