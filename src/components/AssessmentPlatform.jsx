import React, { useState } from 'react';
import { Send, Code, Eye, Moon, Sun } from 'lucide-react';

const DarkModeToggle = ({ darkMode, setDarkMode }) => (
  <div className={`fixed bottom-4 right-4 flex items-center gap-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
    <span className="text-sm font-medium">Dark Mode</span>
    <button
      onClick={() => setDarkMode(!darkMode)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        darkMode ? 'bg-purple-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          darkMode ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
  );

const AnimatedBMO = () => (
  <div className="absolute top-4 left-4 z-10" style={{ width: '70px', height: '90px' }}>
    <svg
      viewBox="0 0 100 120"
      className="w-full h-full"
      style={{ 
        animation: 'dance 2s infinite',
        transformOrigin: 'bottom'
      }}
    >
      {/* Main body */}
      <rect
        x="20"
        y="10"
        width="60"
        height="80"
        rx="8"
        fill="#00B5AD"
      />
      
      {/* Screen */}
      <rect
        x="25"
        y="15"
        width="50"
        height="40"
        rx="4"
        fill="#E0FFFF"
      />
      
      {/* Eyes */}
      <circle cx="40" cy="30" r="4" fill="#000" />
      <circle cx="60" cy="30" r="4" fill="#000" />
      
      {/* Smile */}
      <path
        d="M 43 38 Q 50 43 57 38"
        stroke="#000"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Buttons */}
      <rect x="30" y="60" width="40" height="3" fill="#000" /> {/* Slot */}
      <path d="M 35 70 h 8 v 8 h -8 z" fill="#FFD700" /> {/* Yellow cross */}
      <path d="M 45 70 L 53 70 L 49 78 Z" fill="#87CEEB" /> {/* Blue triangle */}
      <circle cx="60" cy="74" r="4" fill="#FF4500" /> {/* Red button */}
      <circle cx="70" cy="74" r="2" fill="#32CD32" /> {/* Green dot */}
      
      {/* Left arm - normal */}
      <path 
        d="M 0 70 Q 10 70 20 70" 
        stroke="#00B5AD" 
        strokeWidth="8" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Right arm - waving */}
      <path 
        d="M 80 70 Q 90 50 95 45" 
        stroke="#00B5AD" 
        strokeWidth="8" 
        strokeLinecap="round"
        fill="none"
        style={{
          animation: 'wave 1s infinite',
          transformOrigin: '80px 70px'
        }}
      />
      
      {/* Legs */}
      <rect x="30" y="90" width="8" height="20" fill="#00B5AD" />
      <rect x="62" y="90" width="8" height="20" fill="#00B5AD" />

      <style>{`
        @keyframes dance {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-2px); }
        }

        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }
      `}</style>
    </svg>
  </div>
);
const AssessmentPlatform = () => {
  const [activeTab, setActiveTab] = useState('html');
  const [darkMode, setDarkMode] = useState(false);
  const [htmlCode, setHtmlCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <title>Add Your Title Here</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- Add your content here -->
</body>
</html>`);

  const [cssCode, setCssCode] = useState(`/* Add your styles here */
body {
    margin: 0;
    padding: 20px;
    font-family: Arial, sans-serif;
}

/* Add more CSS rules below */`);

  const [showModal, setShowModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [splitPosition, setSplitPosition] = useState(50);

  // Constants
  const TOPIC = "Digital Citizenship: The Digital Dilemma";
  const GOOGLE_FORM_BASE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyEaF1oM6lPWFejuOX3BDMtxD6R7z6TjwKImzs4StcovJbFA/formResponse';
  const FORM_FIELDS = {
    name: 'entry.1120732995',
    class: 'entry.1336450333',
    topic: 'entry.1421884587',
    html: 'entry.1760210967',
    css: 'entry.179417740'
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const container = document.getElementById('split-container');
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const percentage = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const limitedPercentage = Math.min(Math.max(percentage, 20), 80);
    setSplitPosition(limitedPercentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const SubmitModal = () => {
    const [localName, setLocalName] = useState('');
    const [localClass, setLocalClass] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
      if (!localName || !localClass) {
        alert('Please fill in all required fields');
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to submit?\n\nName: ${localName}\nClass: ${localClass}\nTopic: ${TOPIC}\n\nYour code will be submitted and this action cannot be undone.`
      );

      if (confirmed) {
        setSubmitting(true);
        try {
          const form = document.createElement('form');
          form.method = 'POST';
          form.action = GOOGLE_FORM_BASE_URL;
          form.target = '_blank';

          const addField = (name, value) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = name;
            input.value = value;
            form.appendChild(input);
          };

          addField(FORM_FIELDS.name, localName);
          addField(FORM_FIELDS.class, localClass);
          addField(FORM_FIELDS.topic, TOPIC);
          addField(FORM_FIELDS.html, htmlCode);
          addField(FORM_FIELDS.css, cssCode);

          document.body.appendChild(form);
          form.submit();
          document.body.removeChild(form);
          
          setShowModal(false);
          window.alert('Your work has been submitted successfully!');
        } catch (error) {
          console.error('Submission error:', error);
          window.alert('Error submitting form. Please try again.');
        } finally {
          setSubmitting(false);
        }
      }
    };

    return (
      <div className={`fixed inset-0 ${darkMode ? 'bg-black/50' : 'bg-black/50'} flex items-center justify-center z-50`}>
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-6 w-[90%] max-w-md`}>
          <h2 className={`text-xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Submit Your Work</h2>
          <div className="space-y-4">
            <div>
              <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Name:</label>
              <input 
                type="text" 
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className={`w-full rounded p-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} border`} 
              />
            </div>
            <div>
              <label className={`block mb-1 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Class:</label>
              <input 
                type="text" 
                value={localClass}
                onChange={(e) => setLocalClass(e.target.value)}
                className={`w-full rounded p-2 ${darkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white border-gray-300'} border`} 
              />
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSubmit}
                disabled={submitting || !localName || !localClass}
                className={`${darkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2`}
              >
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
              <button 
                onClick={() => setShowModal(false)}
                disabled={submitting}
                className={`border px-4 py-2 rounded ${darkMode ? 'hover:bg-gray-700 text-gray-200 border-gray-600' : 'hover:bg-gray-100 text-gray-700'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col relative`}>
      <AnimatedBMO />
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm p-4`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Grade 9 HTML/CSS Assessment - {TOPIC}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowModal(true)}
              className={`flex items-center gap-2 ${darkMode ? 'bg-purple-600 hover:bg-purple-500' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-lg transition-all`}
            >
              <Send className="w-4 h-4" />
              Submit Work
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div id="split-container" className="h-[calc(100vh-8rem)] relative flex">
          {/* Editor Section */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-lg shadow-sm border overflow-hidden`} style={{ width: `${splitPosition}%` }}>
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'html' 
                    ? `${darkMode ? 'text-purple-400 border-purple-400 bg-gray-700/50' : 'text-blue-600 border-blue-600 bg-blue-50'} border-b-2` 
                    : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  HTML
                </div>
              </button>
              <button
                onClick={() => setActiveTab('css')}
                className={`px-4 py-2 font-medium ${
                  activeTab === 'css' 
                    ? `${darkMode ? 'text-purple-400 border-purple-400 bg-gray-700/50' : 'text-blue-600 border-blue-600 bg-blue-50'} border-b-2` 
                    : `${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'}`
                }`}
              >
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  CSS
                </div>
              </button>
            </div>
            <textarea
              value={activeTab === 'html' ? htmlCode : cssCode}
              onChange={(e) => activeTab === 'html' ? setHtmlCode(e.target.value) : setCssCode(e.target.value)}
              className={`w-full h-[calc(100%-3rem)] font-mono text-sm p-4 focus:outline-none ${
                darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
              }`}
              spellCheck="false"
            />
          </div>

          {/* Resizer */}
          <div
            className={`w-2 ${darkMode ? 'bg-gray-700 hover:bg-purple-500' : 'bg-gray-200 hover:bg-blue-500'} cursor-col-resize transition-colors`}
            onMouseDown={handleMouseDown}
          />

          {/* Preview Section */}
          <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} rounded-lg shadow-sm border overflow-hidden`} style={{ width: `${100 - splitPosition}%` }}>
            <div className={`flex items-center justify-between border-b px-4 py-2 ${darkMode ? 'border-gray-700' : ''}`}>
              <div className={`flex items-center gap-2 font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                <Eye className="w-4 h-4" />
                Preview
              </div>
            </div>
            <iframe
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <style>${cssCode}</style>
                  <body>${htmlCode}</body>
                </html>
              `}
              title="preview"
              className="w-full h-[calc(100%-3rem)]"
            />
          </div>
        </div>
      </main>

      {showModal && <SubmitModal />}

      <DarkModeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
};

export default AssessmentPlatform;