import React, { useEffect, useContext } from 'react'; 
import '../App.css';
import GoogleButton from 'react-google-button'; 

// import { initCalendarClient, googleAuthenticate } from '../api/google';
import firebase from '../firebase/firebaseConfig';
import { CalendarContext } from '../context/CalendarContext';
import { Navbar } from '../components/Navbar';
import { colors } from '../theme/colors';
import mainLogo from '../assets/logo.jpg';

const Home = ({ props }) => {
  const gapi = window.gapi;
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(CalendarContext);

  const initCalendarClient = () => {
    const API_KEY = 'AIzaSyDwzeTPkQTs21TeAVqZCK8pxaX3eG9g_dw';
    const CLIENT_ID = '261275212482-4lc3nhd99ccd67s0btcma11fvh9cjavm.apps.googleusercontent.com';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    const SCOPES = 'https://www.googleapis.com/auth/calendar';
  
    gapi.load('client', () => {
      console.log("Client loaded");
  
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scopes: SCOPES,
      });
  
      gapi.client.load('calendar', 'v3', () => console.log("calendar loaded."));
    })
  };

  const googleAuthenticate = async () => {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
  
    const token = googleUser.getAuthResponse().id_token;
  
    const credential = firebase.auth.GoogleAuthProvider.credential(token);
    await firebase.auth.Auth.signInWithCredential(credential);
  };

  useEffect(() => {
    const gapi = window.gapi;
    initCalendarClient(gapi);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const user = firebase.auth().currentUser;
      setUser(user);
      props.history.push('/dashboard');
    }
  }, [isAuthenticated]);

  const signInWithGoogle = () => {
    googleAuthenticate().then(() => {
      setIsAuthenticated(true);
      const user = firebase.auth().currentUser;
      setUser(user);
    }).catch((error) => {
      console.log(error);
    });
  };

  return (
      <div style={{ backgroundColor: colors.blue1, height: '100vh' }}>
          <Navbar />
          <img src={mainLogo} alt="" className="header-logo"/>
          <h1 className="header-text">Never miss an event again.</h1>
          <p className="header-description">
            Scanlendar takes your messages and automatically transfers them to your calendar!
          </p>
          <GoogleButton 
            type="light" 
            className="google-sign-in-button" 
            onClick={() => signInWithGoogle()}
          />
      </div>
  )
}

export default Home;
