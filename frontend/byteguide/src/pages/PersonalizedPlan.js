import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronRight, Globe, Lightbulb, Lock } from 'lucide-react';
import { submitOnboardingData } from '../services/onboardingService';
import calculateProgress from '../utils/progressCalculation';

const Progress = ({ value, className }) => (
  <div className={`relative ${className} bg-gray-200 rounded-full overflow-hidden`}>
    <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${value}%` }}></div>
  </div>
);

const Button = ({ children, asChild, variant, ...props }) => (
  <button className={`px-4 py-2 rounded ${variant === 'outline' ? 'border' : 'bg-blue-500 text-white'}`} {...props}>
    {asChild ? children : <span>{children}</span>}
  </button>
);

const Card = ({ children, className, onClick }) => (
  <div className={`p-4 bg-gradient-to-r from-gray-800 via-gray-900 to-black shadow-lg rounded-xl border-4 border-gray-700 ${className}`} onClick={onClick}>
    {children}
  </div>
);

const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const CardHeader = ({ children }) => <div className="p-4 border-b">{children}</div>;
const CardTitle = ({ children, className }) => <h2 className={`text-lg font-bold text-light ${className}`}>{children}</h2>;
const CardDescription = ({ children, className }) => <p className={`text-gray-300 ${className}`}>{children}</p>;

const Accordion = ({ children }) => <div>{children}</div>;

const AccordionItem = ({ children, value }) => (
  <div className="border-b">{children}</div>
);

const AccordionTrigger = ({ children, onClick, stopPropagation }) => (
  <div className="flex justify-between items-center p-4 cursor-pointer" onClick={(e) => {
    if (stopPropagation) e.stopPropagation();
    onClick();
  }}>
    {children}
  </div>
);

const AccordionContent = ({ children, isOpen }) => (
  isOpen ? <div className="p-4 text-gray-600">{children}</div> : null
);

const PersonalizedPlan = () => {
  const [expandedSemester, setExpandedSemester] = useState(null);
  const [overallProgress, setOverallProgress] = useState(0);
  const [semesters, setSemesters] = useState([]);
  const [expandedSubject, setExpandedSubject] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [proTip, setProTip] = useState('');
  const subscriptionUrl = '/subscription';

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
          throw new Error("No user data found in local storage.");
        }

        const response = await fetch('https://byteguide-backend.onrender.com/authentication/get-user-data', {
          method: 'GET',
          headers:{
            "Content-Type": "application/json",
          },
          credentials: 'include',
        });
        console.log("Response:", response);
        if (response.ok) {
          const dbUserData = await response.json();
          setOverallProgress(dbUserData.overallProgress);
          setSemesters(dbUserData.semesters);
          setProTip(dbUserData.proTip);
          setLoading(false);
        } else if (response.status === 404) {
          const response = await submitOnboardingData(userData);
          const parsedResponse = JSON.parse(response);
          console.log("Parsed response:", parsedResponse);

          setOverallProgress(parsedResponse.overallProgress);

          const semesterWithProgress = parsedResponse.semesters.map(semester => ({
            ...semester,
            progress: calculateProgress(semester.id)
          }));
          console.log("Semester with progress:", semesterWithProgress);

          const updatedUserData = { 
            ...userData, 
            semesters: semesterWithProgress,
            overallProgress: parsedResponse.overallProgress,
            proTip: parsedResponse.proTip
          };
          localStorage.setItem('userData', JSON.stringify(updatedUserData));

          setSemesters(semesterWithProgress);
          setProTip(parsedResponse.proTip);
          setLoading(false);
          
          await fetch('https://byteguide-backend.onrender.com/authentication/update-user-data', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ userData: updatedUserData }),
          });
        } else {
          throw new Error("Failed to fetch user data from database.");
        }
      } catch (err) {
        console.error("Error fetching plan:", err);
        setError("Failed to load your personalized plan. Please try again later.");
        setLoading(false);
      }
    };
    
    fetchPlan();
  }, []);

  const toggleSubject = (semesterId, subjectId) => {
    setExpandedSubject(prevState => ({
      ...prevState,
      [semesterId]: prevState[semesterId] === subjectId ? null : subjectId
    }));
  };

  const toggleSemester = (semesterId) => {
    setExpandedSemester(expandedSemester === semesterId ? null : semesterId);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-light">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8 text-light">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Your CS Journey</CardTitle>
          <CardDescription className="text-center">Personalized plan for your Computer Science degree</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-light">Overall Progress</h3>
            <Progress value={overallProgress} className="w-full h-4" />
            <p className="text-sm text-light mt-2">You're {overallProgress}% through your degree!</p>
          </div>

          <div className="space-y-4">
            {semesters && semesters.length > 0 ? (
             semesters.map((semester) => (
              <motion.div
                key={semester.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: semester.id * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 ${expandedSemester === semester.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => !semester.locked && toggleSemester(semester.id)}
                >
                  <CardHeader className="flex flex-row items-center justify-between p-4">
                    <CardTitle className="text-xl font-semibold">{semester.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Progress value={semester.progress} className="w-24 h-2" />
                      <span className="text-sm font-medium text-light">{semester.progress}%</span>
                      {expandedSemester === semester.id ? <ChevronDown className="h-5 w-5 text-light" /> : <ChevronRight className="h-5 w-5 text-light" />}
                    </div>
                  </CardHeader>
                  {expandedSemester === semester.id && (
                    <CardContent>
                    {semester.locked ? (
                      <div className="relative text-center text-gray-400">
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center z-20">
                          <Lock className="h-16 w-16 text-gray-400 mb-4" /> {/* Adjusted size */}
                          <p>This content is locked. Buy a subscription to unlock future learning content.</p>
                          {/* Button */}
                          <Button
                            variant="outline"
                            className="mt-4 z-30"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.location.href = subscriptionUrl;
                            }}
                          >
                            Buy Subscription
                          </Button>
                        </div>
                        {/* Blurred Background */}
                        <div className="blur-sm opacity-50 pointer-events-none">
                          {semester.subjects.map((subject) => (
                            <div key={subject.id} className="mb-4">
                              <h4 className="font-semibold text-light">{subject.title}</h4>
                              <p className="text-gray-300">{subject.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      semester.subjects.map((subject) => (
                        <Accordion key={subject.id}>
                          <AccordionItem value={`item-${subject.id}`}>
                            <AccordionTrigger onClick={() => toggleSubject(semester.id, subject.id)} stopPropagation>
                              <div className="flex justify-between items-center w-full">
                                <span className="text-light">{subject.title}</span>
                                {expandedSubject[semester.id] === subject.id ? (
                                  <ChevronDown className="h-5 w-5 text-light" />
                                ) : (
                                  <ChevronRight className="h-5 w-5 text-light" />
                                )}
                              </div>
                            </AccordionTrigger>
                            <AccordionContent isOpen={expandedSubject[semester.id] === subject.id}>
                              <p className="mb-4 text-gray-300">{subject.description}</p>
                              <h4 className="font-semibold mb-2 text-light">Key Tasks:</h4>
                              <ul className="list-disc pl-5 mb-4 space-y-1 text-light">
                                {subject.tasks.map((task, index) => (
                                  <li key={index}>{task.task}</li>
                                ))}
                              </ul>
                              <h4 className="font-semibold mb-2 text-light">Resources:</h4>
                              <div className="flex flex-wrap gap-2">
                                {subject.resources.map((resource, index) => (
                                  <Button key={index} variant="outline" asChild>
                                    <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-light">
                                      <Globe className="mr-2 h-4 w-4 text-light" />
                                      {resource.name}
                                    </a>
                                  </Button>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      ))
                    )}
                  </CardContent>

                  )}
                </Card>
              </motion.div>
            ))
            ) : (
              <p className="text-light">No semester data available</p>
            )}
            <motion.div
              key="future"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: semesters.length * 0.1 }}
            >
              <Card className="cursor-pointer transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between p-4">
                  <CardTitle className="text-xl font-semibold">Upcoming Semester</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Progress value={0} className="w-24 h-2" />
                    <span className="text-sm font-medium text-light">0%</span>
                    <ChevronRight className="h-5 w-5 text-light" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative text-center text-gray-400">
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center space-y-4">
                      <Lock className="h-16 w-16 text-gray-400 mb-4" />
                      <p className="max-w-xs">This content is locked. Buy a subscription to unlock future learning content.</p>
                      <Button
                        className="px-6 py-3 bg-accent text-light rounded-lg shadow-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105"
                        onClick={() => window.location.href = subscriptionUrl}
                      >
                        Buy Subscription
                      </Button>
                    </div>
                    <div className="blur-sm opacity-50 pointer-events-none">
                      <div className="mb-4">
                        <h4 className="font-semibold text-light">Locked Subject 1</h4>
                        <p className="text-gray-300">Description 1</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-light">Locked Subject 2</h4>
                        <p className="text-gray-300">Description 2</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                Pro Tip
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-light">{proTip}</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonalizedPlan;
