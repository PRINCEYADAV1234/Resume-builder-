// import React from 'react'

// export default function ExperianceForm({ data, onChange }) {
//   const handleChange = (index, field, value) => {
//     const newData = [...data]
//     newData[index][field] = value
//     onChange(newData)
//   }

//   const addExperience = () => {
//     onChange([...data, { role: '', company: '', duration: '', description: '' }])
//   }

//   const removeExperience = (index) => {
//     const newData = data.filter((_, i) => i !== index)
//     onChange(newData)
//   }

  
//   return (
//     <div>
//       <h2 className="text-lg font-semibold mb-3">Work Experience</h2>
//       {data.map((exp, i) => (
//         <div key={i} className="border border-gray-200 p-3 rounded-md mb-3 space-y-2">
//           <input
//             type="text"
//             placeholder="Role (e.g. Full Stack Developer)"
//             value={exp.role}
//             onChange={(e) => handleChange(i, 'role', e.target.value)}
//             className="w-full border border-gray-300 rounded-md p-2 text-sm"
//           />
//           <input
//             type="text"
//             placeholder="Company (e.g. Google)"
//             value={exp.company}
//             onChange={(e) => handleChange(i, 'company', e.target.value)}
//             className="w-full border border-gray-300 rounded-md p-2 text-sm"
//           />
//           <input
//             type="text"
//             placeholder="Duration (e.g. Jan 2024 - Present)"
//             value={exp.duration}
//             onChange={(e) => handleChange(i, 'duration', e.target.value)}
//             className="w-full border border-gray-300 rounded-md p-2 text-sm"
//           />
//           <textarea
//             placeholder="Description (each line will be a bullet point)"
//             rows="3"
//             value={exp.description}
//             onChange={(e) => handleChange(i, 'description', e.target.value)}
//             className="w-full border border-gray-300 rounded-md p-2 text-sm"
//           />
//           <button
//             onClick={() => removeExperience(i)}
//             className="text-red-500 text-sm hover:underline"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//       <button
//         onClick={addExperience}
//         className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
//       >
//         + Add Experience
//       </button>
//     </div>
//   )
// }









import React from 'react'

export default function ExperianceForm({ data = [], onChange }) {
  
  const handleChange = (index, field, value) => {
    const newData = [...data]
    newData[index][field] = value
    onChange(newData)
  }

  const addExperience = () => {
    onChange([
      ...data, 
      { role: '', company: '', duration: '', description: '' }
    ])
  }

  const removeExperience = (index) => {
    const newData = data.filter((_, i) => i !== index)
    onChange(newData)
  }

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Work Experience</h2>

      {(data || []).map((exp, i) => (
        <div key={i} className="border border-gray-200 p-3 rounded-md mb-3 space-y-2">
          
          <input
            type="text"
            placeholder="Role (e.g. Full Stack Developer)"
            value={exp.role}
            onChange={(e) => handleChange(i, 'role', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />

          <input
            type="text"
            placeholder="Company (e.g. Google)"
            value={exp.company}
            onChange={(e) => handleChange(i, 'company', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />

          <input
            type="text"
            placeholder="Duration (e.g. Jan 2024 - Present)"
            value={exp.duration}
            onChange={(e) => handleChange(i, 'duration', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />

          <textarea
            placeholder="Description (each line will be a bullet point)"
            rows="3"
            value={exp.description}
            onChange={(e) => handleChange(i, 'description', e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm"
          />

          <button
            onClick={() => removeExperience(i)}
            className="text-red-500 text-sm hover:underline"
          >
            Remove
          </button>

        </div>
      ))}

      <button
        onClick={addExperience}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md text-sm"
      >
        + Add Experience
      </button>
    </div>
  )
}
