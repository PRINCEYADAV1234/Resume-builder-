import React, { useEffect, useState } from 'react'
import {FilePenLineIcon, Pencil, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon} from 'lucide-react'
import {useNavigate} from 'react-router-dom'
import { useToast } from '../components/Toast'
import { useAuth } from '../context/AuthContext'


export default function Dashboard() {
  const colors = ["#933mdea", "#d97706", "#dc2626", "#0228c7", "#16a34a"]
  const [allResumes,setAllResumes] = useState([])
  const [showCreateResume,setshowCreateResume] = useState(false)
  const [showUploadResume,setshowUploadResume] = useState(false)
  const [title,setitle] = useState('')
  const [resume,setResume] = useState(null)
  const [editResumeId,seteditResumeId] = useState()
  const { user } = useAuth()
  const { success, error } = useToast()
  const navigate = useNavigate()


  const loadAllResumes = async () =>{
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        setAllResumes([])
        return
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000'
      const response = await fetch(`${API_URL}/api/users/resumes`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.resumes && data.resumes.length > 0) {
          setAllResumes(data.resumes)
        } else {
          setAllResumes([])
        }
      } else {
        setAllResumes([])
      }
    } catch (error) {
      console.error('Error loading resumes:', error)
      setAllResumes([])
    }
  }

  const createResume = async (event)=>{
    event.preventDefault()
    if (!title.trim()) {
      error('Please enter a resume title')
      return
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        error('Please login to create resume')
        return
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000'
      const response = await fetch(`${API_URL}/api/resumes/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create resume')
      }

      setshowCreateResume(false)
      setitle('')
      success('Resume created successfully!')
      // Reload resumes
      await loadAllResumes()
      // Navigate to the new resume
      if (data.resume && data.resume._id) {
        navigate(`/app/builder/${data.resume._id}`)
      }
    } catch (err) {
      console.error('Error creating resume:', err)
      error(err.message || 'Failed to create resume. Please try again.')
    }
  }

  const uploadResume = async(event)=>{
    event.preventDefault()
    // This is for future implementation - for now just create a resume
    await createResume(event)
  }

  const editTitle = async(event)=>{
    event.preventDefault()
    if (!title.trim() || !editResumeId) {
      return
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        error('Please login to update resume')
        return
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000'
      const response = await fetch(`${API_URL}/api/resumes/update/${editResumeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update resume')
      }

      seteditResumeId('')
      setitle('')
      success('Resume title updated successfully!')
      // Reload resumes
      await loadAllResumes()
    } catch (err) {
      console.error('Error updating resume:', err)
      error(err.message || 'Failed to update resume. Please try again.')
    }
  }

  const deleteResume = async(resumeId)=>{
    const confirm = window.confirm('Are you sure you want to delete this resume?')
    if(!confirm){
      return
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        error('Please login to delete resume')
        return
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000'
      const response = await fetch(`${API_URL}/api/resumes/delete/${resumeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to delete resume')
      }

      // Reload resumes
      await loadAllResumes()
      success('Resume deleted successfully!')
    } catch (err) {
      console.error('Error deleting resume:', err)
      error(err.message || 'Failed to delete resume. Please try again.')
    }
  }

  useEffect(()=>{
    loadAllResumes()
  },[])


  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
      <p className='text-2xl font-medium mb-6 bgg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, {user?.name || 'User'}</p>

      <div className='flex gap-4'>
        <button onClick={()=> setshowCreateResume(true) } className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
          <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
          <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
        </button>

      <button onClick={()=>setshowUploadResume(true)} className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>


       <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 text-white rounded-full' />
          <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
      </button>
      </div>

      <hr className='border-slate-300 my-6 sm:w-[302px]' />

      <div className='grid grid-cols2 sm:flex flex-wrap gap-4'>
      {allResumes.map((resume,index)=>{
          const basecolor = colors[index % colors.length];
          return (
            <button key={index} onClick={()=>navigate(`/app/builder/${resume._id}`)} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{background:`linear-gradient(135deg,${basecolor}10, ${basecolor}40)`, borderColor : basecolor + '40'}}>

              <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{color:basecolor}} />
              <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color:basecolor}}>{resume.title}</p>

              <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{color:basecolor + '90'}} >
                updated on {new Date (resume.updatedAt).toLocaleDateString()}

              </p>

              {/* <div onClick={(e)=>e.stopPropagation()} className='absolute top-1 right-1 group-hover:flex items-center hidden'>
                            <TrashIcon className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' />
                                     <PencilIcon  onClick={()=>{ console.log("Clicked Pencil for:", ); seteditResumeId(resume.id); setitle (resume.title)} } className='size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors' /> 
              </div> */}

              <div
  onClick={(e) => e.stopPropagation()}
  className="absolute top-1 right-1 flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
>
  <TrashIcon  onClick={()=>deleteResume(resume._id)} className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
  <PencilIcon
    onClick={() => {
      console.log("Clicked Pencil for:", resume._id);
      seteditResumeId(resume._id);
      setitle(resume.title);
    }}
    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors cursor-pointer"
  />
</div>

            </button>
          )
      })}
      </div>

  
      {showCreateResume && (
  <form
    className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
    onClick={() => setshowCreateResume(false)}   // ✅ fixed
    onSubmit={createResume}
  >
    <div
      className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold mb-4">Create a Resume</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setitle(e.target.value)}
        className="w-full px-4 mb-4 border border-slate-300 rounded focus:border-blue-600 focus:ring-blue-600"
        placeholder="Enter Resume type"
        required
      />

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Create Resume
      </button>

      <XIcon
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={() => {
          setshowCreateResume(false);
          setitle('');
        }}
      />
    </div>
  </form>
)}



    {editResumeId && (
  <form
    className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
    onClick={() => seteditResumeId('')}   // ✅ fixed
    onSubmit={editTitle}
  >
    <div
      className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setitle(e.target.value)}
        className="w-full px-4 mb-4 border border-slate-300 rounded focus:border-blue-600 focus:ring-blue-600"
        placeholder="Enter Resume type"
        required
      />

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Update
      </button>

      <XIcon
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={() => {
          seteditResumeId('');
          setitle('');
        }}
      />
    </div>
  </form>
)}

      {/* for the upload resume feature */}
      { showUploadResume && (
         <form
    className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
    onClick={() => setshowUploadResume(false)}   // ✅ fixed
    onSubmit={uploadResume}
  >
    <div
      className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-xl font-bold mb-4">Upload Resume</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setitle(e.target.value)}
        className="w-full px-4 mb-4 border border-slate-300 rounded focus:border-blue-600 focus:ring-blue-600"
        placeholder="Enter Resume title"
        required
      />

          <div>
              <label htmlFor="resume-input" className='block text-sm text-slate-700'>
              Select resuem file
              <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-slate-400 border-dashed rounded-md p-4 py-10 my-4 hover:border-blue500 hover:text-blue-700 cursor-pointer transition-colors'>

              {resume ? (
                <p className='text-blue-700'>
                  {resume.name}
                </p>
              ): <>
              <UploadCloud className='size-14 stroke-1'/>
              <p>Upload Resume</p>
              </>}
              </div>
              </label>

              <input type="file" name="" id="resume-input" accept='.pdf' hidden onChange={(e)=>setResume(e.target.files[0])}  />
          </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Upload Resume
      </button>

      <XIcon
        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
        onClick={() => {
          setshowUploadResume(false);
          setitle('');
        }}
      />
    </div>
  </form>

      )}

      </div>
    </div>
  )
}
