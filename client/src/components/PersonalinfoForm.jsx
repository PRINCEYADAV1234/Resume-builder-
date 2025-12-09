import { BriefcaseBusiness, Globe, Linkedin, Mail, MapPin, Phone, User } from 'lucide-react'
import React from 'react'

export default function PersonalinfoForm({data,onChange,removeBackground,setRemoveBakcground}) {
    const handlechange = (field,value)=>{
        onChange({...data,[field]:value})
    }
    const fields = [
        {key: "full_name", label:"Full Name" , icon:User, type:"text", required:true},
        {key: "email", label:"Email Address" , icon:Mail, type:"email", required:true},
        {key: "phone", label:"Phone Number" , icon:Phone, type:"tel"},
        {key: "location", label:"Full Location" , icon:MapPin, type:"text"},
        {key: "profession", label:"Profession" , icon:BriefcaseBusiness, type:"text"},
        {key: "linkedin", label:"LinkedIn Profile" , icon:Linkedin, type:"url"},
        {key: "website", label:"Personal Website" , icon:Globe, type:"text"},
    ]
  return (
    <div>
      <h3 className='text-lg font-semibold text-gray-900'>Personal Information</h3>
      <p className='text-sm text-gray-600'>Get Started with the personal information</p>

      <div className='flex items-center gap-2'>
        <label >
            {data.image ? (
                <img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt='user-image' className='w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80' />
            ): (
                <div className='inline-flex items-center gap-2 mt-5 text-slate-600 hover:text-slate-700 cursor-pointer'>
                    <User className ='size-10 p-2.5 border rounded-full' />
                    Upload User Image
                </div>
            )}
            <input type="file" accept='image/jpeg, image/png' className='hidden' onChange={(e)=>handlechange("image",e.target.files[0])} />
        </label>
      </div>


      {fields.map((field)=>{
        const Icon = field.icon;
        return (
            <div key={field.key} className='space-y-1 mt-5'>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                    <Icon className='size-4'/>
                    {field.label}
                    {field.required && <span className='text-red-500'>
                        *</span>}
                </label>
                <input type={field.type} value={data[field.key] ||  ""} onChange={(e)=>handlechange(field.key, e.target.value)} className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors text-sm' placeholder={`Enter Your ${field.label.toLowerCase()}`} required={field.required} />
            </div>
        )
      })}
    </div>
  )
}
