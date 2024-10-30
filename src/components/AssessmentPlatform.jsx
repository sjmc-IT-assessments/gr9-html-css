import React, { useState } from 'react';
import { Send, Code, Eye } from 'lucide-react';

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
    if (!studentName.trim()) errors.name = 'Name is required';
    if (!studentClass.trim()) errors.class = 'Class is required';
    if (!selectedTopic) errors.topic = 'Topic selection is required';
    if (!htmlCode.trim()) errors.html = 'HTML code is required';
    if (!cssCode.trim()) errors.css = 'CSS code is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const confirmed = window.confirm(
      `Are you sure you want to submit?\nName: ${studentName}\nClass: ${studentClass}\nTopic: ${selectedTopic}\n\nYour code will be submitted and this action cannot be undone.`
    );

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
      window.alert('Your work has been submitted successfully!');
    }
  };

  const SubmitModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Submit Your Work</h2>
        
        <div className="mb-4">
          <label className="block mb-2">Name:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">Class:</label>
          <input
            type="text"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="px-4 py-2 rounded border hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
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
              <span className="text-red-500 text-sm">
                {validationErrors.topic}
              </span>
            )}
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Send className="w-4 h-4" />
            Submit Work
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab('html')}
                className={`px-4 py-2 font-medium ${
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
                className={`px-4 py-2 font-medium ${
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
              className="w-full h-[calc(100vh-240px)] font-mono text-sm p-4 bg-gray-50 focus:outline-none"
              spellCheck="false"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border">
            <div className="flex items-center justify-between border-b px-4 py-2">
              <div className="flex items-center gap-2 font-medium text-gray-800">
                <Eye className="w-4 h-4" />
                Preview
              </div>
            </div>
            <div className="h-[calc(100vh-240px)] bg-white">
              <iframe
                srcDoc={`<!DOCTYPE html><html><style>${cssCode}</style><body>${htmlCode}</body></html>`}
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