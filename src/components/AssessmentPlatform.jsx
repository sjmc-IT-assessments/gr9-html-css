import React, { useState, useEffect } from 'react';
import { Send, Code, Eye, AlertCircle, CheckCircle, Timer, Save } from 'lucide-react';

const AssessmentPlatform = () => {
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
        
        /* Add more CSS rules below */
        `);
    const topics = [
            { id: 'environmental', name: 'Environmental Awareness' },
            { id: 'technology', name: 'Technology and Innovation' },
            { id: 'culture', name: 'Cultural Heritage' },
            { id: 'sports', name: 'Sports and Wellness' },
            { id: 'science', name: 'Science Discovery' }
        ];
  const [showModal, setShowModal] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [studentClass, setStudentClass] = useState(''); // Was incorrectly using setStudentName
  const [selectedTopic, setSelectedTopic] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour in seconds
  const [autoSaveStatus, setAutoSaveStatus] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  
  // Auto-save functionality
  useEffect(() => {
    const saveToLocalStorage = () => {
      localStorage.setItem('assessment-data', JSON.stringify({
        htmlCode,
        cssCode,
        selectedTopic,
        lastSaved: new Date().toISOString()
      }));
      setAutoSaveStatus('Saved');
      setTimeout(() => setAutoSaveStatus(''), 2000);
    };

    const intervalId = setInterval(saveToLocalStorage, 30000); // Auto-save every 30 seconds
    return () => clearInterval(intervalId);
  }, [htmlCode, cssCode, selectedTopic]);

  // Timer functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setShowModal(true); // Force submission when time's up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Your existing Google Form configuration...
  const GOOGLE_FORM_BASE_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdyEaF1oM6lPWFejuOX3BDMtxD6R7z6TjwKImzs4StcovJbFA/formResponse';
  const FORM_FIELDS = {
    name: 'entry.1120732995',
    class: 'entry.1336450333',
    topic: 'entry.1421884587',
    html: 'entry.1760210967',
    css: 'entry.179417740'
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    // Create form data
    const formData = new FormData();
    formData.append(FORM_FIELDS.name, studentName);
    formData.append(FORM_FIELDS.class, studentClass);
    formData.append(FORM_FIELDS.topic, selectedTopic);
    formData.append(FORM_FIELDS.html, htmlCode);
    formData.append(FORM_FIELDS.css, cssCode);

    const confirmed = window.confirm(`Are you sure you want to submit?
        Name: ${studentName}
        Class: ${studentClass}
        Topic: ${selectedTopic}
        
        Your code will be submitted and this action cannot be undone.`);
        
            if (confirmed) {
              // Construct URL with parameters
              const params = new URLSearchParams({
                [FORM_FIELDS.name]: studentName,
                [FORM_FIELDS.class]: studentClass,
                [FORM_FIELDS.topic]: selectedTopic,
                [FORM_FIELDS.html]: htmlCode,
                [FORM_FIELDS.css]: cssCode
              });
        
              // Open form in new tab
              window.open(`${GOOGLE_FORM_BASE_URL}?${params.toString()}`, '_blank');
              
              // Show success message
              alert('Your work has been submitted successfully!');
              setShowModal(false);
            }
          };
        
  const validateForm = () => {
    const errors = {};
    if (!studentName.trim()) errors.name = 'Name is required';
    if (!studentClass.trim()) errors.class = 'Class is required';
    if (!selectedTopic) errors.topic = 'Topic selection is required';
    if (!htmlCode.trim() || htmlCode === '<!-- Start your HTML here -->') {
      errors.html = 'HTML code is required';
    }
    if (!cssCode.trim() || cssCode === '/* Add your CSS here */') {
      errors.css = 'CSS code is required';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };


  // Cool animation for preview toggle
  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmitWithAnimation = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      handleSubmit();
      setIsSubmitting(false);
    }, 1000);
  };

  // Enhanced modal with better styling
  const SubmitModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Submit Your Work</h2>
          <button 
            onClick={() => setShowModal(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-300 ${
                validationErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              autoFocus
            />
            {validationErrors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {validationErrors.name}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={studentClass}
              onChange={(e) => setStudentClass(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md transition-all duration-300 focus:ring-2 focus:ring-blue-300 ${
                validationErrors.class ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your class (e.g., 9A)"
            />
            {validationErrors.class && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {validationErrors.class}
              </p>
            )}
          </div>

          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitWithAnimation}
              disabled={isSubmitting || !studentName || !studentClass || !selectedTopic}
              className={`flex-1 bg-blue-600 text-white py-2 px-4 rounded-md transition-all duration-300 
                ${isSubmitting ? 'bg-green-600' : 'hover:bg-blue-700'}
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2`}
            >
              {isSubmitting ? (
                <>
                  <CheckCircle className="w-4 h-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Submit Assessment
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

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
          {/* Editor Section with validation */}
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

          {/* Preview Section with animation */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <div className="flex items-center gap-2 font-medium text-gray-800">
                <Eye className="w-4 h-4" />
                Preview
              </div>
              <button
                onClick={handlePreviewToggle}
                className="text-gray-600 hover:text-gray-800 transition-transform duration-300 transform hover:scale-110"
              >
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
            </div>
            <div className={`transition-all duration-500 ${showPreview ? 'h-[calc(100vh-240px)]' : 'h-0'} bg-white overflow-hidden`}>
              <iframe
                srcDoc={`
                  <html>
                    <style>${cssCode}</style>
                    <body>${htmlCode}</body>
                  </html>
                `}
                title="preview"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Enhanced Submit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 transform transition-all duration-300 scale-100">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Your Work</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md transition-colors duration-300
                    ${validationErrors.name ? 'border-red-500' : ''}`}
                  placeholder="Enter your full name"
                  autoFocus
                />
                {validationErrors.name && (
                  <span className="text-red-500 text-sm flex items-center gap-1 mt-1">
                    <AlertCircle className="w-4 h-4" />
                    {validationErrors.name}
                  </span>
                )}
              </div>

              {/* Similar validation for other fields... */}

              <div className="flex gap-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentPlatform;