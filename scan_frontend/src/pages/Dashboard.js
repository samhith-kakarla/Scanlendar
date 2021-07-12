import React, { useContext, useState } from 'react'; 

import { Avatar } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { CalendarContext } from '../context/CalendarContext';
import { MainAppBar } from '../components/MainAppBar';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { getUserCalender, addEvent } from '../api/scan';

import transparentLogo from '../assets/transparentlogo.png';
import userLogo from '../assets/IMG-1898.PNG'; // remove later (hard-coded)

const Dashboard = () => {
  const { user } = useContext(CalendarContext);
  const [message, setMessage] = useState('');

  const gapi = window.gapi;

  return (
    <div>
      <MainAppBar />
      <div class="container-center-horizontal">
        <div class="frame-1screen">
            <div class="overlap-group">
            <img
                class="transparentlogo-1-1"
                src={transparentLogo}
                alt=""
            />
            <Avatar 
              src={userLogo}
              style={{ height: 100, width: 100, marginLeft: 32, marginTop: -45 }}
            />
            </div>
            <div class="samhith-kakarlas">Samhith Kakarla’s</div>
            <div class="calendar">Calendar</div>
            <div class="overlap-group2" onclick="checkEventsBtnToggle()">
              <VisibilityIcon style={{ marginLeft: 15 }} />
              <div class="view-my-calendar">View my calendar</div>
            </div>
            <div class="overlap-group1">
              <div class="create-a-new-event">Create a new Event</div>
                <textarea
                  type="text"
                  class="rectangle-3" 
                  onChange={(e) => setMessage(e.target.value)} 
                  placeholder="Enter the note/message containing the event info.

                  Ex. 2 hour meeting with John about virtual teaching and e-learning on Zoom a week from today at noon
                  "
                  />
                <AddCircleIcon style={{ height: 30, margin: 'auto', marginTop: -10 }} />
              </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard;
