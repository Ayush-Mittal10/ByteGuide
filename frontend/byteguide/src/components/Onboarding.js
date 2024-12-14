import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchAllCodingProfiles from '../utils/fetchAllCodingProfiles';

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [languagesLearned, setLanguagesLearned] = useState([]);
  const [languageRatings, setLanguageRatings] = useState({});
  const [selectedLibraries, setSelectedLibraries] = useState({});
  const [otherLibraries, setOtherLibraries] = useState({});
  const [selectedFrameworks, setSelectedFrameworks] = useState([]);
  const [cpOption, setCpOption] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [usernames, setUsernames] = useState({});
  const [projectOption, setProjectOption] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const navigate = useNavigate();
  const totalSteps = 7;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const savedStep = parseInt(searchParams.get('step'), 10);
    if (savedStep) {
      setStep(savedStep);
    }

    const savedUserData = JSON.parse(localStorage.getItem('userData'));
    if (savedUserData) {
      setSelectedSemester(savedUserData.semester || '');
      setLanguagesLearned(savedUserData.languagesLearned || []);
      setLanguageRatings(savedUserData.languageRatings || {});
      setSelectedLibraries(savedUserData.selectedLibraries || {});
      setOtherLibraries(savedUserData.otherLibraries || {});
      setSelectedFrameworks(savedUserData.selectedFrameworks || []);
      setCpOption(savedUserData.cpOption || '');
      setSelectedPlatforms(savedUserData.selectedPlatforms || []);
      setUsernames(savedUserData.usernames || {});
      setProjectOption(savedUserData.projectOption || '');
      setProjectLink(savedUserData.projectLink || '');
    }
  }, []);

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (validateStep()) {
      const requestBody = {
        semester: selectedSemester,
        languagesLearned,
        languageRatings,
        selectedLibraries,
        otherLibraries,
        selectedFrameworks,
        cpOption,
        selectedPlatforms,
        usernames,
        projectOption,
        projectLink
      };

      try {
        localStorage.setItem('userData', JSON.stringify(requestBody));
        const response = await fetch('http://localhost:4000/authentication/login-status', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        const result = await response.json();
        if (!result.isLoggedIn) {
          navigate(`/login?from=/onboarding&step=${step}`);
          return;
        }

        console.log(requestBody);
        await fetchAllCodingProfiles(requestBody.usernames);

        const updatedUserData = JSON.parse(localStorage.getItem('userData'));

        await fetch('http://localhost:4000/authentication/update-user-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ userData: updatedUserData }),
        });

        navigate('/personalized-plan');
        
      } catch (error) {
        console.error(error);
      }
    }
  };

  const validateStep = () => {
    switch (step) {
      case 1:
        return selectedSemester !== '';
      case 2:
        return languagesLearned.length > 0;
      case 3:
        return Object.keys(languageRatings).length === languagesLearned.length;
      case 4:
        return Object.keys(selectedLibraries).length === languagesLearned.length;
      case 5:
        return selectedFrameworks.length > 0;
      case 6:
        return cpOption !== '' && (cpOption === 'no' || selectedPlatforms.length > 0);
      case 7:
        return projectOption !== '' && (projectOption === 'no' || projectLink !== '');
      default:
        return false;
    }
  };

  const getLibrariesForLanguage = (language) => {
    const libraries = {
      'C': ['GLib', 'LibXML2', 'CURL', 'None'],
      'C++': ['Boost', 'Qt', 'STL', 'None'],
      'Java': ['Spring', 'Hibernate', 'Apache Commons', 'None'],
      'Python': ['NumPy', 'Pandas', 'Requests', 'None'],
      'JavaScript': ['React', 'Lodash', 'Axios', 'None'],
      'Ruby': ['Rails', 'Sinatra', 'RSpec', 'None'],
      'Go': ['Gin', 'Echo', 'Beego', 'None'],
      'Swift': ['Alamofire', 'SwiftyJSON', 'SnapKit', 'None'],
    };
    return libraries[language] || [];
  };

  const frameworks = [
    'React',
    'Angular',
    'Vue',
    'Django',
    'Flask',
    'Spring',
    'Rails',
    'Laravel',
    'Express',
    'ASP.NET',
    'None'
  ]

  const toggleFramework = (framework) => {
    setSelectedFrameworks(prev =>
      prev.includes(framework)
        ? prev.filter(f => f !== framework)
        : [...prev, framework]
    )
  }

  const togglePlatform = (platform) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const setUsername = (platform, username) => {
    setUsernames(prev => ({ ...prev, [platform]: username }));
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gradientStart to-gradientEnd text-light px-6">
      <div className="max-w-xl w-full bg-secondary p-8 rounded-lg shadow-md text-light">
        <h2 className="text-2xl font-bold mb-4 text-center">Let's Get to Know You!</h2>
        
        {step === 1 && (
          <div>
            <label className="block mb-2 text-lg font-semibold text-light">Which semester are you in?</label>
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full p-3 rounded-md border border-gray-300 text-dark"
            >
              <option className="text-dark">Select Semester</option>
              <option className="text-dark">1st Semester</option>
              <option className="text-dark">2nd Semester</option>
              <option className="text-dark">3rd Semester</option>
              <option className="text-dark">4th Semester</option>
              <option className="text-dark">5th Semester</option>
              <option className="text-dark">6th Semester</option>
              <option className="text-dark">7th Semester</option>
              <option className="text-dark">8th Semester</option>
            </select>
          </div>
        )}

        {step === 2 && (
          <div>
            <label className="block mb-2 text-lg font-semibold text-light">Which languages have you learned so far?</label>
            <div className="w-full p-3 rounded-md border border-gray-300">
              {['C', 'C++', 'Java', 'Python', 'JavaScript', 'Ruby', 'Go', 'Swift'].map(language => (
                <div key={language} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={language}
                    value={language}
                    checked={languagesLearned.includes(language)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setLanguagesLearned([...languagesLearned, language]);
                      } else {
                        setLanguagesLearned(languagesLearned.filter(lang => lang !== language));
                      }
                    }}
                    className="mr-2"
                  />
                  <label htmlFor={language} className="text-light">{language}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <label className="block mb-2 text-lg font-semibold text-light">Rate your proficiency in each language (1 to 10):</label>
            <div className="w-full p-3 rounded-md border border-gray-300">
              {languagesLearned.map(language => (
                <div key={language} className="mb-4">
                  <label className="block mb-2 text-light">{language}</label>
                  <div className="flex space-x-2">
                    {[...Array(10).keys()].map(i => (
                      <button
                        key={i + 1}
                        className={`px-2 py-1 rounded-md border ${languageRatings[language] === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-dark'}`}
                        onClick={() => setLanguageRatings({ ...languageRatings, [language]: i + 1 })}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <label className="block mb-2 text-lg font-semibold text-light">Select the most common libraries you use for each language:</label>
            <div className="w-full p-3 rounded-md border border-gray-300">
              {languagesLearned.map(language => (
                <div key={language} className="mb-4">
                  <label className="block mb-2 text-light">{language}</label>
                  <div className="flex space-x-2">
                    {getLibrariesForLanguage(language).map(library => (
                      <div key={library} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`${language}-${library}`}
                          value={library}
                          checked={selectedLibraries[language]?.includes(library) || false}
                          onChange={(e) => {
                            const updatedLibraries = selectedLibraries[language] || [];
                            if (e.target.checked) {
                              updatedLibraries.push(library);
                            } else {
                              const index = updatedLibraries.indexOf(library);
                              if (index > -1) {
                                updatedLibraries.splice(index, 1);
                              }
                            }
                            setSelectedLibraries({ ...selectedLibraries, [language]: updatedLibraries });
                          }}
                          className="mr-2"
                        />
                        <label htmlFor={`${language}-${library}`} className="text-light">{library}</label>
                      </div>
                    ))}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={`${language}-other`}
                        value="other"
                        checked={selectedLibraries[language]?.includes('other') || false}
                        onChange={(e) => {
                          const updatedLibraries = selectedLibraries[language] || [];
                          if (e.target.checked) {
                            updatedLibraries.push('other');
                          } else {
                            const index = updatedLibraries.indexOf('other');
                            if (index > -1) {
                              updatedLibraries.splice(index, 1);
                            }
                          }
                          setSelectedLibraries({ ...selectedLibraries, [language]: updatedLibraries });
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={`${language}-other`} className="text-light">Other</label>
                      {selectedLibraries[language]?.includes('other') && (
                        <input
                          type="text"
                          placeholder="Enter library"
                          value={otherLibraries[language] || ''}
                          onChange={(e) => setOtherLibraries({ ...otherLibraries, [language]: e.target.value })}
                          className="ml-2 p-2 rounded-md border border-gray-300 text-dark"
                        />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <label className="block mb-2 text-lg font-semibold text-dark">
              Which frameworks have you learned so far?
            </label>
            <div className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 min-h-[100px]">
              <div className="flex flex-wrap gap-2">
                {frameworks.map(framework => (
                  <button
                    key={framework}
                    onClick={() => toggleFramework(framework)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
                      selectedFrameworks.includes(framework)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-dark hover:bg-gray-300'
                    }`}
                  >
                    {framework}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <label className="block mb-2 text-lg font-semibold text-dark">
              Do you have prior experience with Competitive Programming?
            </label>
            <div className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 min-h-[100px]">
              <div className="flex gap-2">
                <button
                  onClick={() => setCpOption('yes')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
                    cpOption === 'yes'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-dark hover:bg-gray-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setCpOption('no')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
                    cpOption === 'no'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-dark hover:bg-gray-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            {cpOption === 'yes' && (
              <div className="mt-4">
                <label className="block mb-2 text-lg font-semibold text-dark">
                  Which platforms have you used?
                </label>
                <div className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 min-h-[100px]">
                  <div className="flex flex-wrap gap-2">
                    {['Codechef', 'Codeforces', 'Hacker Rank', 'AtCoder'].map(platform => (
                      <button
                        key={platform}
                        onClick={() => togglePlatform(platform)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
                          selectedPlatforms.includes(platform)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-dark hover:bg-gray-300'
                        }`}
                      >
                        {platform}
                      </button>
                    ))}
                  </div>
                </div>
                {selectedPlatforms.map(platform => (
                  <div key={platform} className="mt-4">
                    <label className="block mb-2 text-lg font-semibold text-dark">
                      Enter your {platform} username:
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md text-dark"
                      value={usernames[platform] || ''}
                      onChange={e => setUsername(platform, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {step === 7 && (
          <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <label className="block mb-2 text-lg font-semibold text-dark">
              Have you made any projects?
            </label>
            <div className="w-full p-3 rounded-md border border-gray-300 bg-gray-50 min-h-[100px]">
              <div className="flex gap-2">
                <button
                  onClick={() => setProjectOption('yes')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
                    projectOption === 'yes'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-dark hover:bg-gray-300'
                  }`}
                >
                  Yes
                </button>
                <button
                  onClick={() => setProjectOption('no')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out ${
                    projectOption === 'no'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-dark hover:bg-gray-300'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
            {projectOption === 'yes' && (
              <div className="mt-4">
                <label className="block mb-2 text-lg font-semibold text-dark">
                  How many projects have you made?
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md text-dark"
                />
                <div>
                  <label className="block mb-2 text-lg font-semibold text-dark">
                    Paste the link of the best project you have made:
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-md text-dark"
                    value={projectLink || ''}
                    onChange={e => setProjectLink(e.target.value)}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button onClick={handlePrevious} className="px-4 py-2 bg-accent text-light rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              Previous
            </button>
          )}
          {step < totalSteps ? (
            <button onClick={handleNext} className="px-4 py-2 bg-primary text-light rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105">
              Next
            </button>
          ) : (
            <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-light rounded-lg shadow-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
