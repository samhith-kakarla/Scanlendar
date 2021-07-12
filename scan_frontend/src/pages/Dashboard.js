import React, { useContext, useState, useEffect } from 'react'; 
import { useHistory } from 'react-router-dom';

import { Avatar } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getEventInfo as eventInfo, addEvent } from '../api/scan';
import { CalendarContext } from '../context/CalendarContext';
import { MainAppBar } from '../components/MainAppBar';
import { getUserCalender } from '../api/scan';

import transparentLogo from '../assets/transparentlogo.png';

const Dashboard = () => {
  const { user } = useContext(CalendarContext);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const gapi = window.gapi;
  const history = useHistory();

  const getEventInfo = () => {
    setLoading(true);
    eventInfo(message).then((response) => {
      console.log(response.data);
      addEvent(response.data)
    })
  }

  const addEvent = async (info) => {
    const newEvent = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: info.start_time, 
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: info_end_time, 
        timeZone: 'America/New_York',
      }, 
      summary: info.title,
      description: info.description,
    });
  }

  useEffect(() => {
    setEmail(user.email.split('@'));
  }, []);

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
              src={user.photoURL}
              style={{ height: 100, width: 100, marginLeft: 32, marginTop: -45 }}
            />
            </div>
            <div class="samhith-kakarlas">{user.displayName}'s</div>
            <div class="calendar">Calendar</div>
            <div class="overlap-group2" onclick="checkEventsBtnToggle()">
              <VisibilityIcon style={{ marginLeft: 15 }} />
              <div 
                class="view-my-calendar"
              >
                <a 
                  href={`https://calendar.google.com/calendar/embed?src=${email}%40gmail.com&ctz=America%2FNew_York`}
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  View my calendar
                </a>
                </div>
            </div>
            <div class="overlap-group1">
              {!loading ? (
                <div>
                  <div class="create-a-new-event">Create a new Event</div>
                    <textarea
                      type="text"
                      class="rectangle-3" 
                      onChange={(e) => setMessage(e.target.value)} 
                      placeholder="Enter the note/message containing the event info.

                      Ex. 2 hour meeting with John about virtual teaching and e-learning on Zoom a week from today at noon
                      "
                      />
                    <AddCircleIcon 
                      fontSize='large' 
                      style={{ height: 30, margin: 'auto', marginTop: 15 }}
                      onClick={() => getEventInfo()} 
                    />
                </div>
              ) : (
                <div style={{ margin: 'auto'}}>
                <CircularProgress size={80} />
                </div>
              )}
              <p style={{ margin: 'auto', color: 'green', marginTop: 20 }}>{success ? 'Event added!' : null}</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard;
