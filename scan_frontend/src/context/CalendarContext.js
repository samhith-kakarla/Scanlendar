import React, { createContext, useState } from 'react';

export const CalendarContext = createContext();

export const CalendarContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [calendarEvents, setCalendarEvents] = useState([]);
  
  return (
    <CalendarContext.Provider 
      value={{ 
        calendarEvents, setCalendarEvents, isAuthenticated, setIsAuthenticated,
        user, setUser
      }}
    >
      { props.children }
    </CalendarContext.Provider>
  )
}