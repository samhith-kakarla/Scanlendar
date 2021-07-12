
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

export const getEventInfo = (text) => {
  // make api request here
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