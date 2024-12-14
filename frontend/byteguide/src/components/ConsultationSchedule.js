import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const availableSlots = [
  new Date(2023, 5, 15, 9, 0),
  new Date(2023, 5, 15, 11, 0),
  new Date(2023, 5, 16, 10, 0),
  new Date(2023, 5, 16, 14, 0),
  new Date(2023, 5, 17, 13, 0),
  new Date(2023, 5, 17, 15, 0),
]

const ConsultationScheduling = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedSlot, setSelectedSlot] = useState(null)

  const handleDateSelect = (slotInfo) => {
    setSelectedDate(slotInfo.start)
    setSelectedSlot(null)
  }

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot)
  }

  const events = availableSlots.map(slot => ({
    start: slot,
    end: new Date(slot.getTime() + 60 * 60 * 1000),
    title: 'Available',
  }))

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot){
      alert('Please select a date and time slot to continue.');
      return;
    }
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      message: e.target.message.value,
      date: selectedDate,
      slot: selectedSlot,
    };

    console.log(formData);
  }

  const CustomToolbar = ({ onNavigate, label }) => (
    <div className="flex justify-between items-center mb-4">
      <button
        type="button"
        onClick={() => onNavigate('PREV')}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ChevronLeft className="h-6 w-6 text-gray-600" />
      </button>
      <span className="text-lg font-semibold text-gray-800">{label}</span>
      <button
        type="button"
        onClick={() => onNavigate('NEXT')}
        className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <ChevronRight className="h-6 w-6 text-gray-600" />
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <style>
        {`
          .rbc-calendar {
            background-color: white;
          }
          .rbc-toolbar {
            background-color: #f8f9fa;
          }
          .rbc-header {
            color: #4a5568;
          }
          .rbc-date-cell {
            color: #2d3748;
          }
          .rbc-date-cell.rbc-now {
            background-color: #ebf4ff;
          }
          .rbc-date-cell.rbc-off-range {
            color: #a0aec0;
          }
          .rbc-event {
            background-color: #5a67d8;
            color: white;
          }
        `}
      </style>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
            Schedule Your Consultation
          </h1>
          <p className="text-xl text-gray-600 text-center mb-12">
            Choose a date and time that works best for you, and we'll be happy to discuss your academic journey.
          </p>
        </motion.div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Date</h2>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 400 }}
                onSelectSlot={handleDateSelect}
                selectable
                views={['month']}
                components={{
                  toolbar: CustomToolbar,
                }}
                dayPropGetter={(date) => ({
                  style: {
                    backgroundColor: date.getDay() === 0 || date.getDay() === 6 ? '#f7fafc' : 'white',
                  },
                })}
              />
            </div>
            <div className="md:w-1/2 p-6 bg-gray-50">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {selectedDate ? 'Available Time Slots' : 'Your Information'}
              </h2>
              {selectedDate ? (
                <div>
                  <p className="text-gray-600 mb-4">
                    Selected Date: {selectedDate.toDateString()}
                  </p>
                  <div className="space-y-2">
                    {availableSlots
                      .filter(slot => slot.toDateString() === selectedDate.toDateString())
                      .map((slot, index) => (
                        <button
                          key={index}
                          onClick={() => handleSlotSelect(slot)}
                          className={`w-full py-2 px-4 rounded flex items-center ${
                            selectedSlot === slot
                              ? 'bg-indigo-600 text-white'
                              : 'bg-white text-gray-800 hover:bg-gray-100'
                          } transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50`}
                        >
                          <Clock className="h-5 w-5 mr-2" />
                          {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </button>
                      ))}
                  </div>
                  {selectedSlot && (
                    <form className="space-y-4 mt-4" onSubmit={e => handleSubmit(e)}>
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                            placeholder="Ayush Mittal"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                            placeholder="mr.mittal@byteguide.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                            placeholder="+91 77777 77777"
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                          Message (Optional)
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-gray-400" />
                          </div>
                          <textarea
                            id="message"
                            name="message"
                            rows={4}
                            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                            placeholder="Any specific topics you'd like to discuss?"
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              ) : (
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                        placeholder="+1 (555) 987-6543"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Message (Optional)
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                        <MessageSquare className="h-5 w-5 text-gray-400" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md text-gray-900"
                        placeholder="Any specific topics you'd like to discuss?"
                      ></textarea>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              type="submit"
              className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {selectedSlot ? 'Confirm Booking' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultationScheduling;