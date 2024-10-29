import React, { useState, useEffect } from 'react';
import { Send, Code, Eye, AlertCircle, CheckCircle, Timer, Save } from 'lucide-react';
import SubmitModal from './SubmitModal';

const AssessmentPlatform = () => {
  // State Definitions
  const [activeTab, setActiveTab] = useState('html');
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

  const topics = [
    { id: 'environmental', name: 'Environmental Awareness' },
    { id: 'technology', name: 'Technology and Innovation' },
    { id: 'culture', name: 'Cultural Heritage' },
    { id: 'sports', name: 'Sports and Wellness' },
    { id: 'science', name: 'Science Discovery' }
  ];

  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Google Form Configuration
  const GOOGLE_FORM_BASE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyEaF1oM6lPWFejuOX3BDMtxD6R7z6TjwKImzs4StcovJbFA/formResponse';
  const FORM_FIELDS = {
    name: 'entry.1120732995',
    class: 'entry.1336450333',
    topic: 'entry.1421884587',
    html: 'entry.1760210967',
    css: 'entry.179417740'
  };
  //Functions & Submit modal
// Auto-save Effect with debounce
//useEffect(() => {
  //const timeoutId = setTimeout(() => {
   // localStorage.setItem('assessment-data', JSON.stringify({
     // htmlCode,
      //cssCode,
     // selectedTopic,
    //  lastSaved: new Date().toISOString()
   // }));
  //  setAutoSaveStatus('Saved');
 //   setTimeout(() => setAutoSaveStatus(''), 2000);
//  }, 1000);

 // return () => clearTimeout(timeoutId);
//}, [htmlCode, cssCode, selectedTopic]);

// Timer Effect
useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 0) {
        clearInterval(timer);
        setShowModal(true);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, []);

// Helper Functions
const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const validateForm = () => {
  const errors = {};
  if (!studentName.trim()) errors.name = 'Name is required';
  if (!studentClass.trim()) errors.class = 'Class is required';
  if (!selectedTopic) errors.topic = 'Topic selection is required';
  if (!htmlCode.trim() || htmlCode === '<!-- Add your content here -->') {
    errors.html = 'HTML code is required';
  }
  if (!cssCode.trim() || cssCode === '/* Add your styles here */') {
    errors.css = 'CSS code is required';
  }
  setValidationErrors(errors);
  return Object.keys(errors).length === 0;
};

const handleSubmit = async () => {
  if (!validateForm()) return;

  const confirmed = window.confirm(`Are you sure you want to submit?
Name: ${studentName}
Class: ${studentClass}
Topic: ${selectedTopic}

Your code will be submitted and this action cannot be undone.`);

  if (confirmed) {
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

    addField(FORM_FIELDS.name, studentName);
    addField(FORM_FIELDS.class, studentClass);
    addField(FORM_FIELDS.topic, selectedTopic);
    addField(FORM_FIELDS.html, htmlCode);
    addField(FORM_FIELDS.css, cssCode);

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
    
    setShowModal(false);
  }
};

const handleModalSubmit = (name, classValue) => {
  setStudentName(name);
  setStudentClass(classValue);
  handleSubmitWithAnimation();
};

const SubmitModal = () => {
  // Local state with simpler structure
  const [formState, setFormState] = useState({
    name: studentName || '',
    class: studentClass || ''
  });

  // Single handler for both inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit handler
  const handleModalSubmit = (e) => {
    e.preventDefault(); // Prevent form submission
    if (formState.name && formState.class) {
      setStudentName(formState.name);
      setStudentClass(formState.class);
      handleSubmitWithAnimation();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <form onSubmit={handleModalSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Submit Your Work</h2>
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formState.name}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
                autoComplete="off"
              />
            </div>

            <div>
              <label className="block mb-1">
                Class <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="class"
                value={formState.class}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your class (e.g., 9A)"
                autoComplete="off"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 p-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!formState.name || !formState.class || !selectedTopic}
                className="flex-1 p-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
//Display/preview
return (
  <div className="min-h-screen bg-gray-50">
    {/* Header with Timer */}
    <header className="bg-white border-b shadow-sm p-4">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">Grade 9 HTML/CSS Assessment</h1>
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className={`border rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200 
              ${validationErrors.topic ? 'border-red-500' : ''}`}
          >
            <option value="">Select a Topic</option>
            {topics.map(topic => (
              <option key={topic.id} value={topic.name}>
                {topic.name}
              </option>
            ))}
          </select>
          {validationErrors.topic && (
            <span className="text-red-500 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors.topic}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Timer Display */}
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg 
            ${timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
            <Timer className="w-5 h-5" />
            <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
          </div>
          
          {/* Auto-save Status */}
          {autoSaveStatus && (
            <div className="flex items-center gap-2 text-green-600">
              <Save className="w-4 h-4" />
              <span className="text-sm">{autoSaveStatus}</span>
            </div>
          )}
          
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            <Send className="w-4 h-4" />
            Submit Work
          </button>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Editor Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('html')}
              className={`px-4 py-2 font-medium transition-all duration-300 ${
                activeTab === 'html' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                HTML
              </div>
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`px-4 py-2 font-medium transition-all duration-300 ${
                activeTab === 'css' 
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50' 
                  : 'text-gray-600 hover:text-gray-800'
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
            className={`w-full h-[calc(100vh-240px)] font-mono text-sm p-4 bg-gray-50 focus:outline-none transition-all duration-300
              ${validationErrors[activeTab] ? 'border-red-500' : ''}`}
            spellCheck="false"
          />
          {validationErrors[activeTab] && (
            <div className="text-red-500 text-sm p-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {validationErrors[activeTab]}
            </div>
          )}
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="flex items-center justify-between border-b px-4 py-2">
            <div className="flex items-center gap-2 font-medium text-gray-800">
              <Eye className="w-4 h-4" />
              Preview
            </div>
          </div>
          <div className="h-[calc(100vh-240px)] bg-white">
            <iframe
              srcDoc={`<!DOCTYPE html>
                <html>
                  <style>${cssCode}</style>
                  <body>${htmlCode}</body>
                </html>`}
              title="preview"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </main>

    <SubmitModal 
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onSubmit={handleModalSubmit}
  selectedTopic={selectedTopic}
/>
  </div>
);
};

export default AssessmentPlatform;
