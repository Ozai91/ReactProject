import React from 'react'

const About = () => {
  const teamMembers = [
    { name: "Pin Vatana" },
    { name: "Cheann Bora" },
    { name: "Ngol Mengsue" },
    { name: "Vy Chorvinn" }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              About Us
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              School Project
            </p>
            <p className="text-base text-gray-500">
              A collaborative assignment developed by our team
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xl font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    
                    {/* Name */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Team Member
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Project Information
            </h2>
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <p className="text-gray-700 text-lg mb-4">
                This is a school project assignment developed by a team of 4 members.
              </p>
              <p className="text-gray-600">
                We've worked together to create an e-commerce platform for Apple products,
                featuring product listings, shopping cart functionality, and a clean, modern user interface.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
