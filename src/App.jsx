import React, { useState } from 'react';

const schedule = [
  {
    day: "Day 1 - 07/10/2026",
    theme: "Introduction to Quantum Computing",
    format: "Online lectures, gamified activities, live quizzes",
    details: "Topics include Classical vs Quantum Computing, Qubits, Superposition, Entanglement, and applications."
  },
  {
    day: "Day 2 - 08/10/2026",
    theme: "Quantum Computing Fundamentals & Qiskit Workshop",
    format: "Live coding and hands-on programming",
    details: "Set up Qiskit, create quantum circuits, run simulations, and execute circuits on IBM Quantum hardware."
  },
  {
    day: "Day 3 - 09/10/2026",
    theme: "Expert Talk & Industry Session",
    format: "Keynote, Q&A, networking",
    details: "Learn about the current state of quantum computing, real-world applications, and careers in quantum."
  },
  {
    day: "Day 4 - 10/10/2026",
    theme: "Advanced Topic (QML/QEC) + Hackathon Kickoff",
    format: "Technical workshop and hackathon launch",
    details: "Choose between Quantum Machine Learning or Quantum Error Correction tracks. Form teams and start the hackathon."
  },
  {
    day: "Day 5 - 11/10/2026",
    theme: "Hackathon Presentations & Closing Ceremony",
    format: "Project demos, judging, awards",
    details: "Final presentations, judging based on innovation, technical implementation, and practical impact."
  }
];

const speakers = [
  {
    name: "Dr. Asha Sebastian",
    title: "Assistant Professor, Member QuDAIS Lab",
    org: "Indian Institute of Information Technology Kottayam",
    day: "Day 2"
  },
  {
    name: "Dr. Jayakumar V",
    title: "CEO, IBM Qiskit Advocate",
    org: "Anuthantra Pvt. Ltd",
    day: "Day 3"
  },
  {
    name: "Dr. Rubell Marion Lincy G",
    title: "Founder QuDAIS Lab, Assistant Professor, HOD, CSE",
    org: "Indian Institute of Information Technology Kottayam",
    day: "Day 5"
  }
];

function App() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center space-x-2">
              <span className="font-bold text-xl text-blue-700">Qiskit Fall Fest '26</span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">About</a>
              <a href="#schedule" className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Schedule</a>
              <a href="#speakers" className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Speakers</a>
              <a href="#register" className="text-slate-600 hover:text-blue-600 px-3 py-2 text-sm font-medium">Register</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-blue-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-purple-900 opacity-90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
            Qiskit Fall Fest 2026
          </h1>
          <p className="text-xl md:text-2xl font-medium mb-4 text-blue-100 max-w-3xl">
            From Quantum Fundamentals to Real-World Quantum Applications
          </p>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-8 text-blue-200">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <span>7 - 11 October 2026</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <span>Online Event</span>
            </div>
          </div>
          <p className="text-lg text-blue-100 mb-8">
            Organized by QuDAIS Lab, Indian Institute of Information Technology Kottayam
          </p>
          <a href="#register" className="bg-white text-blue-900 px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors shadow-lg">
            Register Now
          </a>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">About the Event</h2>
          <p className="text-lg text-slate-600 leading-relaxed">
            A five-day online event designed to introduce students to quantum computing, provide hands-on experience with Qiskit, connect participants with experts from academia and industry, and foster collaborative learning through a virtual hackathon.
          </p>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Event Timeline</h2>
          <div className="space-y-8">
            {schedule.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col md:flex-row gap-6">
                <div className="md:w-1/4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full mb-2">
                    {item.day.split(' - ')[0]}
                  </span>
                  <p className="text-slate-500 font-medium text-sm">{item.day.split(' - ')[1]}</p>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{item.theme}</h3>
                  <p className="text-blue-600 font-medium mb-3">{item.format}</p>
                  <p className="text-slate-600">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      <section id="speakers" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Featured Speakers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-slate-50 rounded-xl p-8 text-center border border-slate-100 hover:shadow-md transition-shadow">
                <div className="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center text-blue-500">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{speaker.name}</h3>
                <p className="text-sm font-medium text-blue-600 mb-3">{speaker.day} Speaker</p>
                <p className="text-sm text-slate-700 font-medium mb-1">{speaker.title}</p>
                <p className="text-sm text-slate-500">{speaker.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration & Photo Release */}
      <section id="register" className="py-20 bg-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-blue-900 p-6 sm:p-10 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">Register Now</h2>
              <p className="text-blue-200">Secure your spot for the Qiskit Fall Fest 2026</p>
            </div>
            
            <form className="p-6 sm:p-10" onSubmit={(e) => { e.preventDefault(); alert('Registration submitted!'); }}>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-slate-700">First name</label>
                    <input type="text" id="first-name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="John" required />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-slate-700">Last name</label>
                    <input type="text" id="last-name" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="Doe" required />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email address</label>
                  <input type="email" id="email" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="john@example.com" required />
                </div>

                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-slate-700">Institution / Organization</label>
                  <input type="text" id="institution" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2 border" placeholder="University of..." required />
                </div>

                <div className="border-t border-slate-200 pt-6 mt-6">
                  <h3 className="text-lg font-medium text-slate-900 mb-4">Event Photo Release Agreement</h3>
                  
                  <div className="bg-slate-50 p-4 rounded-md border border-slate-200 h-48 overflow-y-auto text-sm text-slate-600 mb-4">
                    <p className="mb-3">
                      I understand and agree I may be videotaped, recorded, interviewed, and/or photographed during the Qiskit Fall Fest at any time by IBM and by other participants and individuals ("third parties") who may or may not be affiliated with the event, including media.
                    </p>
                    <p className="mb-3">
                      I grant to IBM and third parties the unrestricted, world-wide, royalty-free license to use, commercially exploit, produce, reproduce, distribute, transmit, publish, perform, display, broadcast, and exhibit in any and all media now known or hereinafter developed for any purposes my name, image, likeness, voice, texts, posts and any statements in whole or in part recorded during the event at any time.
                    </p>
                    <p className="mb-3">
                      I agree I have no right of inspection or approval, and no compensation will be given for the above license and rights.
                    </p>
                    <p>
                      I acknowledge that I have read this agreement, fully understand its terms, and agree to this publicity release freely and voluntarily.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input 
                        id="photo-release" 
                        type="checkbox" 
                        required
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500" 
                      />
                    </div>
                    <label htmlFor="photo-release" className="ml-2 text-sm font-medium text-slate-700">
                      I read, acknowledge, and agree to the event photo release
                    </label>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={!agreed}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${agreed ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500' : 'bg-slate-400 cursor-not-allowed'}`}
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 text-center">
        <p>© 2026 QuDAIS Lab, Indian Institute of Information Technology Kottayam. All rights reserved.</p>
        <p className="mt-2 text-sm">Organized as part of the IBM Qiskit Fall Fest 2026.</p>
      </footer>
    </div>
  );
}

export default App;
