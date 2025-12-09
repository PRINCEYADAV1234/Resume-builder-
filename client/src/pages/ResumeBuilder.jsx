import React, { useEffect, useState } from 'react'
import ResumePreview from "../components/ResumePreview";
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useToast } from '../components/Toast'
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Download,
  DownloadIcon,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkle,
  User
} from 'lucide-react'
import PersonalinfoForm from '../components/PersonalinfoForm'
import SummaryForm from '../components/SummaryForm'
import ExperianceForm from '../components/ExperianceForm'
import EducationForm from '../components/EducationForm'
import ProjectForm from '../components/ProjectForm'
import SkillsForm from '../components/SkillsForm'


export default function ResumeBuilder() {
  const { resumeId } = useParams()
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [removeBackground,setRemoveBakcground] = useState(false)


  const [resumeData, setResumeData] = useState({
    _id: '',
    title: '',
    personal_info: {},
    experiance: [],
    education: [],
    project: [],
    skills: [],
    template: 'classic',
    accent_color: '#3882F6',
    public: false
  })

  const [activeSectionIndex, setactiveSectionIndex] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  const section = [
    { id: 'personal', name: 'Personal Info', Icon: User },
    { id: 'summary', name: 'Summary', Icon: FileText },
    { id: 'experiance', name: 'Experience', Icon: Briefcase },
    { id: 'education', name: 'Education', Icon: GraduationCap },
    { id: 'projects', name: 'Projects', Icon: FolderIcon },
    { id: 'skills', name: 'Skills', Icon: Sparkle }
  ]

  const activeSection = section[activeSectionIndex]
  const loadExistingResume = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        error('Please login to view resume')
        navigate('/login')
        return
      }

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000'
      const response = await fetch(`${API_URL}/api/resumes/get/${resumeId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.resume) {
          setResumeData(data.resume)
          document.title = data.resume.title || 'Resume Builder'
        }
      } else {
        const errorData = await response.json()
        error(errorData.message || 'Failed to load resume')
        navigate('/app')
      }
    } catch (err) {
      console.error('Error loading resume:', err)
      error('Failed to load resume')
      navigate('/app')
    }
  }

  useEffect(() => {
    if (resumeId) {
      loadExistingResume()
    }
  }, [resumeId])

const changeResumeVisibility = async()=>{
  setResumeData ({...resumeData, public: !resumeData.public})
}

const handleShare = ()=>{
  const frontendUrl = window.location.href.split('/app/')[0];
  const resumeUrl = frontendUrl+'/view' + resumeId;

  if(navigator.share){
    navigator.share({url:resumeUrl,text:"My Resume",})
  }
  else {
    error('Share not supported on this browser...')
  }
}

const downloadResume=()=>{
  window.print();
}

const saveChanges = async () => {
  if (!resumeId) {
    error('Resume ID not found')
    return
  }

  setIsSaving(true)
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      error('Please login to save changes')
      navigate('/login')
      return
    }

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7000'
    
    const response = await fetch(`${API_URL}/api/resumes/update/${resumeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(resumeData)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Failed to save changes')
    }

    success('Resume saved successfully!')
    } catch (err) {
      console.error('Error saving resume:', err)
      error(err.message || 'Failed to save changes. Please try again.')
    } finally {
    setIsSaving(false)
  }
}

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Back to dashboard link */}
      <Link
        to="/app"
        className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all mb-6"
      >
        <ArrowLeftIcon className="size-4" />
        Back To Dashboard
      </Link>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Left side: progress bar + navigation + form area */}
        <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1">

            {/* Progress bar */}
            <div className="relative w-[95%] mx-auto mb-6">
              <hr className="w-full border-2 border-gray-200 rounded-full" />
              <div
                className="absolute top-0 left-0 h-[6px] bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-700"
                style={{
                  width: `${(activeSectionIndex * 100) / (section.length - 1)}%`
                }}
              />
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mb-6 border-b border-gray-300 py-2">
  
              <div className="flex items-center">
                {activeSectionIndex !== 0 && (
                  <button
                    onClick={() =>
                      setactiveSectionIndex((prev) => Math.max(prev - 1, 0))
                    }
                    className="flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all"
                  >
                    <ChevronLeft className="size-4" /> Previous
                  </button>
                )}

                <button
                  onClick={() =>
                    setactiveSectionIndex((prev) =>
                      Math.min(prev + 1, section.length - 1)
                    )
                  }
                  className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition-all ${
                    activeSectionIndex === section.length - 1
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                  disabled={activeSectionIndex === section.length - 1}
                >
                  Next <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
      <div className='space-y-6'>
              {activeSection.id === 'personal' && (
                <PersonalinfoForm data = {resumeData.personal_info} onChange={(data)=>setResumeData(prev => ({...prev,personal_info:data}))}  removeBackground={removeBackground} setRemoveBakcground={setRemoveBakcground} />
              ) } 
{activeSection.id === 'summary' && (
    <SummaryForm
      data={resumeData.summary}
      onChange={(data) => setResumeData((prev) => ({ ...prev, summary: data }))}
    />
  )}
  {activeSection.id === 'experiance' && (
    <ExperianceForm
      data={resumeData.experiance}
      onChange={(data) =>
        setResumeData((prev) => ({ ...prev, experiance: data }))
      }
    />
  )}
  {activeSection.id === 'education' && (
    <EducationForm
      data={resumeData.education}
      onChange={(data) =>
        setResumeData((prev) => ({ ...prev, education: data }))
      }
    />
  )}
  {activeSection.id === 'projects' && (
    <ProjectForm
      data={resumeData.project}
      onChange={(data) =>
        setResumeData((prev) => ({ ...prev, project: data }))
      }
    />
  )}
  {activeSection.id === 'skills' && (
    <SkillsForm
      data={resumeData.skills}
      onChange={(data) => setResumeData((prev) => ({ ...prev, skills: data }))}
    />
  )}  

        <button 
          onClick={saveChanges}
          disabled={isSaving}
          className='bg-gradient-to-hr from-green-100 to-green-200 ring-green-300 text-green-600 ring hover:ring-green-400 transition-all rounded-md px-6 py-2 mt-6 text-sm disabled:opacity-50 disabled:cursor-not-allowed'>
        {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
          </div>
        </div>
        {/* Right side (blank for now) */}
        {/* <div className="lg:col-span-7 max-lg:mt-6">
          <div className='relative w-full'>
            <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'> 
    {
      resumeData.public &&(
        <button className='flex items-center p-2 px-4 gap-2 text-xs bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 rounded-lg ring-blue-300 hover:ring transition-colors'>
            <Share2Icon className='size-4' />
        </button>
      )
    }
    <button>
      {resumeData.public ? <EyeIcon className="size-4" />:<EyeOffIcon className='size-4' /> }

      {resumeData.public ?'Public':'Private'}
    </button>

        <button className='flex items-center gap-2 px-6 py-2 text-xs bg-gradient-to-br from-green-100 to-green-200 text-green-600 rounded-lg ring-green-300 hover:ring transition-colors'>
          <DownloadIcon className='size-4' /> 
          Download
          </button>
            </div>

          </div>
        <ResumePreview resumeData={resumeData} />
        </div> */}
        
          <div className="lg:col-span-7 max-lg:mt-6">
  <div className="relative w-full">

    {/* --- Action Buttons Row --- */}
    <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-3">

      {/* Share Button (Only if public) */}
      {resumeData.public && (
        <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 text-xs 
          bg-gradient-to-br from-blue-100 to-blue-200 
          text-blue-600 rounded-lg ring-blue-300 
          hover:ring transition-all shadow-sm">
          <Share2Icon className="size-4" />
          Share
        </button>
      )}

      {/* Public / Private Toggle Button */}
      <button onClick={changeResumeVisibility} className="flex items-center gap-2 px-4 py-2 text-xs 
        bg-gray-100 text-gray-700 rounded-lg 
        hover:bg-gray-200 shadow-sm transition-all">

        {resumeData.public ? (
          <>
            <EyeIcon className="size-4 text-green-600" />
            <span className="text-green-700 font-medium">Public</span>
          </>
        ) : (
          <>
            <EyeOffIcon className="size-4 text-red-600" />
            <span className="text-red-700 font-medium">Private</span>
          </>
        )}
      </button>

      {/* Download Button */}
      <button onClick={downloadResume} className="flex items-center gap-2 px-6 py-2 text-xs 
        bg-gradient-to-br from-green-100 to-green-200 
        text-green-600 rounded-lg ring-green-300 
        hover:ring transition-all shadow-sm">
        <DownloadIcon className="size-4" />
        Download
      </button>

    </div>
  </div>

  {/* Resume Preview Component */}
  {/* <ResumePreview resumeData={resumeData} /> */}
  

  <div id="resume-area">
  <ResumePreview resumeData={resumeData} />
</div>

</div>

           {/* <ResumePreview resumeData={resumeData} /> */}
      </div>
    </div>
  )
}
