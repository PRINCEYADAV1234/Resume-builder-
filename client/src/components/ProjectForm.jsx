import React from 'react'

export default function ProjectForm({ data, onChange }) {
  const handleChange = (index, field, value) => {
    const newData = [...data]
    newData[index][field] = value
    onChange(newData)
  }

  const addProject = () => {
    onChange([...data, { title: '', description: '' }])
  }

  const removeProject = (index) => {
    const newData = data.filter((_, i) => i !== index)
    onChange(newData)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Projects</h2>
      {data.map((project, i) => (
        <div key={i} className="border border-gray-200 p-3 rounded-md mb-3 space-y-2">
          <input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => handleChange(i, 'title', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
          <textarea
            placeholder="Short project description"
            rows="3"
            value={project.description}
            onChange={(e) => handleChange(i, 'description', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />
          <button
            onClick={() => removeProject(i)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addProject}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
      >
        + Add Project
      </button>
    </div>
  )
}
