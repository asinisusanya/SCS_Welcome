import { useState, useEffect } from 'react'
import { Users, BookOpen, Briefcase, MapPin, Clock } from 'lucide-react'
import { useDigitalSignageData } from './hooks/useDigitalSignageData'
import './App.css'

function WelcomeScreen({ data, currentImageIndex, setCurrentImageIndex }) {
  useEffect(() => {
    if (data.images.length > 0) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % data.images.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [data.images.length, setCurrentImageIndex])

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-3xl font-bold">Department of Statistics and Computer Science</h1>
          <p className="text-blue-200">University of Peradeniya</p>
        </div>
        <div className="text-right">
          <p className="text-blue-200">{currentDate}</p>
          <p className="text-4xl font-bold">{currentTime}</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="px-6 pb-20">
        {/* Image Carousel */}
        <div className="relative mb-8 h-80 bg-black/20 rounded-lg overflow-hidden">
          {data.images.length > 0 ? (
            <>
              <img 
                src={data.images[currentImageIndex]?.url || '/api/placeholder/800/400'} 
                alt={data.images[currentImageIndex]?.title || 'Department facility'}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4">
                <h3 className="text-lg font-semibold">{data.images[currentImageIndex]?.title || 'Department facility'}</h3>
                <div className="flex justify-center mt-2 space-x-2">
                  {data.images.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-blue-200">Loading images...</p>
            </div>
          )}
        </div>

        {/* Live Department Statistics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Live Department Statistics</h2>
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">{data.statistics.activeStudents}</div>
              <div className="text-blue-200">Active Students</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <BookOpen className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">{data.statistics.coursesRunning}</div>
              <div className="text-blue-200">Courses Running</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <Briefcase className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <div className="text-4xl font-bold mb-2">{data.statistics.projectsActive}</div>
              <div className="text-blue-200">Projects Active</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ClassScheduleScreen({ data }) {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  // Group schedule by venue
  const venueSchedules = data.schedule.reduce((acc, classItem) => {
    if (!acc[classItem.venue]) {
      acc[classItem.venue] = []
    }
    acc[classItem.venue].push(classItem)
    return acc
  }, {})

  const venues = Object.keys(venueSchedules)
  const currentVenue = venues[0] || 'No venues'
  const currentVenueClasses = venueSchedules[currentVenue] || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-3xl font-bold">Class Schedule</h1>
          <p className="text-blue-200">Today's class timetable and venue information</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">{currentTime}</p>
        </div>
      </header>

      {/* Daily Timeline */}
      <div className="px-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Daily Timeline</h2>
            <span className="text-blue-200">8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex justify-between text-sm text-blue-200">
            {['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map(time => (
              <span key={time}>{time}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Venue Information */}
      <div className="px-6 pb-20">
        <div className="text-center mb-6">
          <h3 className="text-lg text-blue-200">Currently Showing: Venue 1 of {venues.length}</h3>
        </div>
        
        {venues.length > 0 ? (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="w-6 h-6 text-orange-400" />
                <div>
                  <h3 className="text-2xl font-bold">{currentVenue}</h3>
                  <p className="text-blue-200">{currentVenueClasses.length} classes today</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-200">Utilization</p>
                <p className="text-2xl font-bold">30%</p>
              </div>
            </div>

            <div className="space-y-4">
              {currentVenueClasses.map((classItem, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-4 h-4 text-green-400" />
                        <span className="text-green-400 font-semibold">{classItem.time}</span>
                        <span className="bg-green-500 text-white px-2 py-1 rounded text-xs">LECTURE</span>
                      </div>
                      <h4 className="text-lg font-bold text-orange-400">{classItem.code}</h4>
                      <p className="text-white mb-2">{classItem.name}</p>
                      <p className="text-blue-200 text-sm">👨‍🏫 {classItem.instructor}</p>
                      <p className="text-blue-200 text-sm">👥 {classItem.students} students enrolled</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
            <p className="text-blue-200">No classes scheduled for today</p>
          </div>
        )}
      </div>
    </div>
  )
}

function AvailableHallsScreen({ data }) {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-3xl font-bold">Available Halls</h1>
          <p className="text-blue-200">Current hall availability and utilization</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">{currentTime}</p>
        </div>
      </header>

      {/* Halls Grid */}
      <div className="px-6 pb-20">
        <div className="grid grid-cols-2 gap-6">
          {data.halls.map((hall, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">{hall.name}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  hall.status === 'available' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {hall.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-blue-200">Utilization:</span>
                  <span className="font-bold">{hall.utilization}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Classes Today:</span>
                  <span className="font-bold">{hall.classes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function NoticesScreen({ data }) {
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <div>
          <h1 className="text-3xl font-bold">Department Notices</h1>
          <p className="text-blue-200">Latest announcements and updates</p>
        </div>
        <div className="text-right">
          <p className="text-4xl font-bold">{currentTime}</p>
        </div>
      </header>

      {/* Notices */}
      <div className="px-6 pb-20">
        <div className="space-y-6">
          {data.notices.length > 0 ? (
            data.notices.map((notice, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-2">{notice.title}</h3>
                <p className="text-blue-200 mb-2">{notice.description}</p>
                <p className="text-sm text-blue-300">{notice.date}</p>
              </div>
            ))
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
              <p className="text-blue-200">No notices available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function ProgressIndicator({ currentScreen, totalScreens }) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
      <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-3">
        <span className="text-white text-sm">{currentScreen} of {totalScreens}</span>
        <div className="w-32 h-2 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-orange-400 transition-all duration-1000"
            style={{ width: `${(currentScreen / totalScreens) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}

function App() {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const data = useDigitalSignageData()
  const screens = ['welcome', 'schedule', 'halls', 'notices']
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length)
    }, 10000) // 10 seconds per screen
    
    return () => clearInterval(interval)
  }, [screens.length])

  const renderScreen = () => {
    switch (screens[currentScreen]) {
      case 'welcome':
        return <WelcomeScreen data={data} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} />
      case 'schedule':
        return <ClassScheduleScreen data={data} />
      case 'halls':
        return <AvailableHallsScreen data={data} />
      case 'notices':
        return <NoticesScreen data={data} />
      default:
        return <WelcomeScreen data={data} currentImageIndex={currentImageIndex} setCurrentImageIndex={setCurrentImageIndex} />
    }
  }

  if (data.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1e3a8a] via-[#1e40af] to-[#3b82f6] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Loading Digital Signage...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {renderScreen()}
      <ProgressIndicator currentScreen={currentScreen + 1} totalScreens={screens.length} />
      {data.error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          <p className="text-sm">Data fetch error: Using fallback data</p>
        </div>
      )}
    </div>
  )
}

export default App
