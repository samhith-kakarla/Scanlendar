import React, { useEffect, useContext } from 'react'; 
import { useHistory } from 'react-router-dom';
import '../App.css';
import GoogleButton from 'react-google-button'; 

// import { initCalendarClient, googleAuthenticate } from '../api/google';
import firebaseAuth from '../firebase/firebaseConfig';
import { CalendarContext } from '../context/CalendarContext';
import { MainAppBar } from '../components/MainAppBar';
import { colors } from '../theme/colors';
import mainLogo from '../assets/logo.jpg';

const Home = () => {
  const gapi = window.gapi;
  const { 
    isAuthenticated, setIsAuthenticated, setUser, setCalendarEvents } 
  = useContext(CalendarContext);
  const history = useHistory();

  const googleAuthenticate = () => {
    const API_KEY = 'AIzaSyB6TxkQ0gs5PelUfEStXvsI3oEclp1qiKw';
    const CLIENT_ID = '671433459980-ra2bm5drm34m3ndeueo5fdpou8mghhqp.apps.googleusercontent.com';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = 'https://www.googleapis.com/auth/calendar';
  
    gapi.load('client:auth2', () => {
      console.log('loaded client')

      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      })

      gapi.client.load('calendar', 'v3', () => console.log('bam!'))

      gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
        gapi.client.calendar.events.list({
          calenderId: 'primary',
          timeMin: new Date().toISOString(),
          showDeleted: false,
          singleEvents: true,
          maxResults: 5,
          orderBy: 'startTime',
        }).then((calendarEvents) => {
          setCalendarEvents(calendarEvents.result.items);
        });      
        const token = googleUser.getAuthResponse().id_token;
        console.log(token);

        const credential = firebaseAuth.auth.GoogleAuthProvider.credential(token);
        console.log(credential);

        firebaseAuth.auth().signInWithCredential(credential).then(() => {
          console.log("firebase log in successful");
          setIsAuthenticated(true);
        }).catch((error) => {
          console.log(error);
          console.log("firebase login unsuccessful");
        })
        setIsAuthenticated(true);
      });
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      const user = firebaseAuth.auth().currentUser;
      setUser(user);
      history.push('/dashboard');
    }
  }, [isAuthenticated]);

  return (
      <div style={{ backgroundColor: colors.blue1, height: '100vh' }}>
          <MainAppBar/>
          <img src={mainLogo} alt="" className="header-logo"/>
          <h1 className="header-text">Never miss an event again.</h1>
          <p className="header-description">
            Scanlendar takes your messages and automatically transfers them to your calendar!
          </p>
          <GoogleButton 
            type="light" 
            className="google-sign-in-button" 
            onClick={() => googleAuthenticate()}
          />
      </div>
  )
}

export default Home;
