import React from "react";

export default function ResumePreview({ resumeData = {} }) { 
  const {
    personal_info = {},
    summary = "",
    experiance = [],
    education = [],
    project = [],
    skills = []
  } = resumeData;
  return (
    <div className="w-full bg-white shadow-md rounded-lg p-8 border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-6 border-b pb-4 mb-6">
          
          {personal_info?.image && (
  <img
    src={typeof personal_info.image === "string"
      ? personal_info.image
      : URL.createObjectURL(personal_info.image)}
    alt="Profile"
    className="w-24 h-24 rounded-full object-cover"
  />
)}

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {personal_info?.full_name || "Your Name"}
          </h1>
          <p className="text-gray-600 text-lg">
            {personal_info?.profession || "Your Role / Title"}
          </p>
        </div>
      </div>

      {/* Contact Info + Education */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 text-sm text-gray-700 space-y-4">
          <div>
            <h2 className="font-semibold text-gray-900 mb-1">CONTACT</h2>
            <p>{personal_info?.phone || "Phone Number"}</p>
            <p>{personal_info?.email || "Email"}</p>
            <p>{personal_info?.address || "Location"}</p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-900 mb-1">EDUCATION</h2>
            {education?.length > 0 ? (
              education.map((edu, idx) => (
                <div key={idx}>
                  <p className="font-semibold">{edu.degree}</p>
                  <p className="text-sm">{edu.institution}</p>
                  <p className="text-xs text-gray-500">{edu.year}</p>
                </div>
              ))
            ) : (
              <p>No education added</p>
            )}
          </div>
        </div>

        {/* Right 2 columns (Summary + Experience + Projects + Skills) */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          <div>
            <h2 className="text-blue-600 font-bold text-lg mb-2 uppercase">
              Summary
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              {summary || "Add your summary here."}
            </p>
          </div>

          {/* Experience */}
          <div>
            <h2 className="text-blue-600 font-bold text-lg mb-2 uppercase">
              Experience
            </h2>
            {experiance?.length > 0 ? (
              experiance.map((exp, idx) => (
                <div key={idx} className="mb-3">
                  <h3 className="font-semibold text-gray-900">{exp.role}</h3>
                  <p className="text-sm text-blue-600">{exp.company}</p>
                  <p className="text-xs text-gray-500 mb-1">
                    {exp.duration}
                  </p>
                  <p className="text-xs text-gray-500 mb-1">
                    {exp.description}
                  </p>
                  <ul className="list-disc ml-5 text-sm text-gray-700">
                    {exp.details?.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                </div>
              ))
            ) : (
              <p>No experience added</p>
            )}
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-blue-600 font-bold text-lg mb-2 uppercase">
              Projects
            </h2>
            {project?.length > 0 ? (
              project.map((proj, idx) => (
                <div key={idx}>
                  <h3 className="font-semibold">{proj.title}</h3>
                  <p className="text-sm text-gray-600">{proj.description}</p>
                </div>
              ))
            ) : (
              <p>No projects added</p>
            )}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-blue-600 font-bold text-lg mb-2 uppercase">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills?.length > 0 ? (
                skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <p>No skills added</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
