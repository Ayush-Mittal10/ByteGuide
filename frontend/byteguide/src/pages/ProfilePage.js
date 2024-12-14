import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatar from '../assets/avatar.png';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editableData, setEditableData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
    if (storedUserData) {
      setUserData(storedUserData);
      setEditableData(storedUserData);
    } else {
      navigate('/onboarding');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableData({ ...editableData, [name]: value });
  };

  const handleSave = () => {
    localStorage.setItem('userData', JSON.stringify(editableData));
    setUserData(editableData);
    alert('Profile updated successfully!');
  };

  const renderProgressBars = () => {
    return Object.entries(editableData.languageRatings || {}).map(([language, rating]) => (
      <div key={language} className="mb-4 w-full">
        <label className="block mb-2 text-lg font-semibold text-light">{language}:</label>
        <div className="w-full bg-gray-300 rounded-full h-6">
          <div
            className="bg-green-500 h-6 rounded-full"
            style={{ width: `${rating}%` }}
          ></div>
        </div>
      </div>
    ));
  };

  const formatArrayField = (field) => {
    // If the field is an array, join it to a string. If it's a string, display it as is.
    return Array.isArray(field) ? field.join(', ') : field || '';
  };

  if (!userData) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gradientStart to-gradientEnd text-light px-6">
      <div className="max-w-5xl w-full bg-secondary p-8 rounded-lg shadow-md text-light flex flex-row">
        <div className="w-1/3 flex flex-col items-center">
          <img src={avatar} alt="Profile Avatar" className="h-24 w-24 rounded-full mb-4" />
          <h3 className="text-xl font-semibold">{userData.name}</h3>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-semibold text-light">Semester:</label>
            <input
              type="text"
              name="semester"
              value={editableData.semester || ''}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-dark"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-semibold text-light">Languages Learned:</label>
            <input
              type="text"
              name="languagesLearned"
              value={formatArrayField(editableData.languagesLearned)}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-dark"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-semibold text-light">Frameworks:</label>
            <input
              type="text"
              name="selectedFrameworks"
              value={formatArrayField(editableData.selectedFrameworks)}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-dark"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-semibold text-light">Competitive Programming Platforms:</label>
            <input
              type="text"
              name="selectedPlatforms"
              value={formatArrayField(editableData.selectedPlatforms)}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-dark"
            />
          </div>
          <div className="mt-4">
            <label className="block mb-2 text-lg font-semibold text-light">Project Link:</label>
            <input
              type="text"
              name="projectLink"
              value={editableData.projectLink || ''}
              onChange={handleChange}
              className="w-full p-3 rounded-md border border-gray-300 text-dark"
            />
          </div>
          <button onClick={handleSave} className="mt-4 px-4 py-2 bg-green-500 text-light rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
            Save
          </button>
        </div>
        <div className="w-2/3 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-4 text-center">Your Profile</h2>
          <div className="w-full">
            {renderProgressBars()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
