$(document).ready(function() {
    //Get audio
    var buzzer = $('#beep')[0];
    //Get default break length, session length and timer label
    var breakLength = parseInt($('#break-length').html()) * 60;
    var sessionLength = parseInt($('#session-length').html()) * 60;
    var step = $('#timer-label').html();
    //false when the pomodoro clock is off, otherwise is true
    var sessionStart = false;
    //false when the timer is off, otherwise is true
    var timerActive = false;
    var counter; // the Interval is stored here
    var count; // the current time length is stored here
    
    $('#start_stop').click(function() {
      // Check if the pomodoro clock is off
      if (!sessionStart && !timerActive) {
        //Set the current time length
        count = step === 'Session' ? sessionLength : breakLength;
        //Change the timer label
        $('#timer-label').html(step);
        //Set the pomodoro clock and the timer as on
        timerActive = true;
        sessionStart = true;
        //Start the interval and store it in the counter variable
        counter = setInterval(timer, 1000);
        // To pause the timer
      } else if (sessionStart && timerActive){
        clearInterval(counter);
        timerActive = false;
        step === 'Session' ? sessionLength = count : breakLength = count;
        //To resume the timer
      } else if (sessionStart && !timerActive) {
        timerActive = true;
        count = step === 'Session' ? sessionLength : breakLength;
        counter = setInterval(timer, 1000);       
      }
      
      function timer() {
        //Check if the timer is set to on
        if (timerActive) {
          //Check if the timer has reached zero
          if (count === 0) {
            //Switch count and step accordingly
            count = step === 'Session' ? breakLength : sessionLength;
            step = step === 'Session' ? 'Break' : 'Session';
            //Change the timer label accordingly
            $('#timer-label').html(step);
            //Start the sound
            buzzer.play();
          } else {
            count -=1;
          }
        }
        displayTime(count);
      }
    });
    
    $('#break-decrement').click(function() {
      if (Math.floor(breakLength/60) > 1) {
        breakLength = Math.floor(((breakLength/60) - 1) * 60);
        $('#break-length').html(Math.floor(breakLength/60));
      }
    });
    
    $('#break-increment').click(function() {
      if (Math.floor(breakLength/60) < 60) {
       breakLength = Math.floor(((breakLength/60) + 1) * 60);
        $('#break-length').html(Math.floor(breakLength/60));
      }
    });
    
    $('#session-decrement').click(function() {
      if (Math.floor(sessionLength/60) > 1) {
        sessionLength = Math.floor(((sessionLength/60) - 1) * 60);
        $('#session-length').html(Math.floor(sessionLength/60));
        displayTime(sessionLength);
      }
    });
    
    $('#session-increment').click(function() {
      if (Math.floor(sessionLength/60) < 60) {
        sessionLength = Math.floor(((sessionLength/60) + 1) * 60);
        $('#session-length').html(Math.floor(sessionLength/60));
        displayTime(sessionLength);
      }
    });
    
    $('#reset').click(function() {
      //Stop the interval
      clearInterval(counter);
      //Stop the sond and rewind it to the beginning
      buzzer.pause();
      buzzer.currentTime = 0;
      //Reset all the parameters
      sessionStart = false;
      timerActive = false;
      sessionLength = 1500;
      breakLength = 300;
      $('#session-length').html(Math.floor(sessionLength/60));
      $('#break-length').html(Math.floor(breakLength/60));
      displayTime(sessionLength);
      $('#timer-label').html("Session");
    });
    
    //Format the time (mm:ss)
    function displayTime(seconds) {
      if ((Math.floor(seconds%60) < 10) && (Math.floor(seconds/60) < 10)) {
        $('#time-left').html("0"+Math.floor(seconds/60)+":0"+ Math.floor(seconds%60));
      } else if (Math.floor(seconds%60) < 10) {
        $('#time-left').html(Math.floor(seconds/60)+":0"+ Math.floor(seconds%60));
      } else if (Math.floor(seconds/60) < 10) {
        $('#time-left').html("0"+Math.floor(seconds/60)+":"+ Math.floor(seconds%60));
      } else {
        $('#time-left').html(Math.floor(seconds/60)+":"+ Math.floor(seconds%60));
      }
    }
    
    
  });
  