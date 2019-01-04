var socket = null;

if (document.readyState != 'loading') ready();
else document.addEventListener('DOMContentLoaded', ready);
let times = [0];
let beats = [];
let measured = false;
let cut = false;

function ready() {

  const url = 'ws://' + location.host + '/ws';
  socket = new ReconnectingWebsocket(url);

  //get the square to dispaly on screen
  socket.onmessage = function(evt) {
    logReceived(evt.data);
    if (evt.data == 'Pattern1') {

      vibrate();
    }
    if (evt.data == 'Pattern2') {

      vibrate2();
    }
    if (evt.data == 'Pattern3') {

      vibrate3();
    }
  };

  //Get the elements from startPattern1
  document.getElementById("startPattern1").addEventListener('click', function() {
    send("Pattern1");
    //console.log ("hello1");
  });

  function vibrate() {
   // beats.length = 0;
    //window.navigator.vibrate([200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200]);
  }

  function vibrate2() {
    //window.navigator.vibrate([400, 400, 400, 400, 400, 400, 400,400, 400, 400, 400, 400, 400, 400]);
    let date = new Date();
    let milliseconds = date.getTime();
    let seconds = milliseconds / 1000;

    let delay = Math.abs(times[times.length - 1] - milliseconds);
    
    times.push(milliseconds);
    beats.push(delay - 100);
    beats.push(100);
    
    console.log(beats[beats.length - 1])
  }

  function vibrate3() {
    //window.navigator.vibrate([100, 700, 100, 700, 100, 700, 100, 700, 100, 700, 100, 700, 100, 700, 100]);
    if(!cut) {
      
      cut = true;
    }
    beats.splice(0, 1);
    window.navigator.vibrate(beats)
    console.log(beats[0])
    //beats.length = 0;
  }



  //Get the elements from startPattern2
  document.getElementById("startPattern2").addEventListener('click', function() {
    send("Pattern2");
    console.log ("hello2");
  });




  document.getElementById("startPattern3").addEventListener('click', function() {
    send("Pattern3");
    console.log ("hello");
  });


}

function send(str) {
  console.log(new Date().toLocaleTimeString() +  '> ' + str);
  socket.send(str);
}

function logReceived(d) {
  document.getElementById('lastMsg').innerHTML = d + '<br />' + document.getElementById('lastMsg').innerHTML;
}