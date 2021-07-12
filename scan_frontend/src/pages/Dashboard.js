import React from 'react'; 

import { MainAppBar } from '../components/MainAppBar';
import { getUserCalender, addEvent } from '../api/scan';

import transparentLogo from '../assets/transparentlogo.png';

const Dashboard = () => {
  const gapi = window.gapi;

  return (
      <div>
          <div class="container-center-horizontal">
            <div class="frame-1screen">
                <div class="overlap-group">
                {/* <img
                    class="ellipse-1"
                    src="ellipse-1.svg"
                /> */}
                {/* <h1 class="title">Avatar</h1> */}
                <img
                    class="transparentlogo-1-1"
                    src={transparentLogo}
                    alt=""
                />
                </div>
                <div class="samhith-kakarlas">Samhith Kakarla’s</div>
                <div class="calendar">Calendar</div>
                <div class="overlap-group2" onclick="checkEventsBtnToggle()"><div class="view-my-calendar">View my calendar</div></div>
                <div class="overlap-group1">
                <div class="create-a-new-event">Create a new Event</div>
                <textarea class="rectangle-3"> </textarea>
                <input class="bbb" onclick="submitBtnToggle()" type="submit" value="Add"></input>
                </div>
            </div>
        </div>
      </div>
  )
}

export default Dashboard;
