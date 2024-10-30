import React, { useState, useEffect } from 'react';
import { Send, Code, Eye, AlertCircle, CheckCircle, Save } from 'lucide-react';

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


  const validateForm = () => {
    const errors = {};
    
    // Log current values for debugging
    console.log('Current values:', {
      studentName,
      studentClass,
      selectedTopic,
      htmlLength: htmlCode?.length,
      cssLength: cssCode?.length
    });
  
    // Check for empty values
    if (!studentName) errors.name = 'Name is required';
    if (!studentClass) errors.class = 'Class is required';
    if (!selectedTopic) errors.topic = 'Topic selection is required';
  
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    console.log('HandleSubmit called with:', {
      name: studentName,
      class: studentClass,
      topic: selectedTopic
    });
    if (!validateForm()) {
      console.log('Validation failed');
      return;
    }
  const confirmed = window.confirm(`Are you sure you want to submit?
Name: ${studentName}
Class: ${studentClass}
Topic: ${selectedTopic}

Your code will be submitted and this action cannot be undone.`);

if (confirmed) {
  try {
    // Create and submit form
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
    window.alert('Your work has been submitted successfully!');
  } catch (error) {
    console.error('Submission error:', error);
    window.alert('Error submitting form. Please try again.');
  }
}
};
    
const handleSubmitWithAnimation = () => {
  setIsSubmitting(true);
  setTimeout(() => {
    handleSubmit();
    setIsSubmitting(false);
  }, 1000);
};

const handleModalSubmit = (name, classValue) => {
  setStudentName(name);
  setStudentClass(classValue);
  handleSubmitWithAnimation();
};

const SubmitModal = () => {
  const [localName, setLocalName] = useState('');
  const [localClass, setLocalClass] = useState('');

  const handleModalSubmit = () => {
    if (!localName || !localClass || !selectedTopic) {
      alert('Please fill in all required fields');
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to submit?
Name: ${localName}
Class: ${localClass}
Topic: ${selectedTopic}

Your code will be submitted and this action cannot be undone.`);

    if (confirmed) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = GOOGLE_FORM_BASE_URL;
      form.target = '_blank';

      // Add fields
      const fields = {
        [FORM_FIELDS.name]: localName,
        [FORM_FIELDS.class]: localClass,
        [FORM_FIELDS.topic]: selectedTopic,
        [FORM_FIELDS.html]: htmlCode,
        [FORM_FIELDS.css]: cssCode
      };

      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });

      // Submit form
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      setShowModal(false);
      alert('Your work has been submitted successfully!');
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '400px'
      }}>
        <h2 style={{ marginBottom: '20px' }}>Submit Your Work</h2>
        
        <div>
          <label>
            Name:
            <input
              type="text"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ccc'
              }}
            />
          </label>
        </div>

        <div>
          <label>
            Class:
            <input
              type="text"
              value={localClass}
              onChange={(e) => setLocalClass(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '20px',
                border: '1px solid #ccc'
              }}
            />
          </label>
        </div>

        <div>
          <button
            onClick={handleModalSubmit}
            disabled={!localName || !localClass || !selectedTopic}
            style={{
              backgroundColor: '#2563eb',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              marginRight: '10px',
              opacity: (!localName || !localClass || !selectedTopic) ? '0.5' : '1'
            }}
          >
            Submit
          </button>
          <button
            onClick={() => setShowModal(false)}
            style={{
              padding: '8px 16px',
              borderRadius: '4px'
            }}
          >
            Cancel
          </button>
        </div>
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

    {showModal && <SubmitModal />}
  </div>
);
};

export default AssessmentPlatform;