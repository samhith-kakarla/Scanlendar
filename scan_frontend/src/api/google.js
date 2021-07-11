import firebase from '../firebase/firebaseConfig';


export const initCalendarClient = (gapi) => {
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

export const googleAuthenticate = async (gapi) => {
  const googleAuth = gapi.auth2.getAuthInstance();
  const googleUser = await googleAuth.signIn();

  const token = googleUser.getAuthResponse().id_token;

  const credential = firebase.auth.GoogleAuthProvider.credential(token);
  await firebase.auth.Auth.signInWithCredential(credential);
};

export const logoutUser = () => {
  firebase.auth().signOut();
}

export const getUserCalendar = async (gapi) => {
  const calendarEvents = await gapi.client.calendar.events.list({
    calenderId: 'primary',
    timeMin: new Date().toISOString(),
    showDeleted: false,
    singleEvents: true,
    maxResults: 5,
    orderBy: 'startTime',
  });

  console.log(calendarEvents);
  return calendarEvents.result.items;
}

export const addEvent = async (gapi) => {
  const newEvent = await gapi.client.calendar.events.insert({
    calendarId: 'primary',
    start: {
      dateTime: '', 
      timeZone: 'America/Los_Angeles',
    },
    end: {
      dateTime: '', 
      timeZone: 'America/Los_Angeles',
    }, 
    summary: 'Title of event',
    description: 'Description of event',
  });

  await getUserCalendar(gapi);
}