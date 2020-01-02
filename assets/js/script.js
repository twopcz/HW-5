var scheduleArr = [];
var scheduleObj;
var storedSchedule;
var savedSchedule;

$(document).ready(function() {
  init();
  updateTime();
  setInterval(updateTime, 1000);

  function init() {
    getLocalStorage();
    scheduleFocus();
    displaySchedule();
    saveEvent();
  }

  function updateTime() {
    var currentDate = moment().format('dddd, MMMM Do YYYY');
    var currentTime = moment().format('HH:mm:ss');
    $('#title-date').html('Event schedule for <b>' + currentDate + '</b>');
    $('#title-time').html('The current time is: <b>' + currentTime + '</b>');
  }

  // save event version 1.0
  function saveEvent() {
    $('.save-button').on('click', function() {
      var trId = $(this)
        .closest('tr')
        .attr('id');
      var textAreaVal = $(this)
        .closest('tr')
        .find('textarea')
        .val()
        .trim();
      scheduleObj = {};
      storedSchedule = JSON.parse(localStorage.getItem('schedule'));

      if (storedSchedule === null) {
        scheduleObj[trId] = textAreaVal;
        scheduleArr.push(scheduleObj);
        localStorage.setItem('schedule', JSON.stringify(scheduleArr));
        console.log('creating initial array');
      } else {
        for (var i = 0; i < storedSchedule.length; i++) {
          if (storedSchedule[i].hasOwnProperty(trId)) {
            storedSchedule[i][trId] = textAreaVal;
            scheduleArr = storedSchedule;
            localStorage.setItem('schedule', JSON.stringify(scheduleArr));
            console.log('replacing stuff');
            return;
          }
        }
        scheduleObj[trId] = textAreaVal;
        scheduleArr.push(scheduleObj);
        localStorage.setItem('schedule', JSON.stringify(scheduleArr));
        console.log('adding new stuff to the array now');
      }
    });
  }

  function displaySchedule() {
    savedSchedule = JSON.parse(localStorage.getItem('schedule'));

    if (savedSchedule !== null) {
      for (var i = 0; i < savedSchedule.length; i++) {
        var getKey = Object.keys(savedSchedule[i]);
        var getValue = Object.values(savedSchedule[i]);
        $('#area-' + getKey).html(getValue[0]);
      }
    }
  }

  function getLocalStorage() {
    var existingStorage = JSON.parse(localStorage.getItem('schedule'));

    if (existingStorage !== null) {
      scheduleArr = existingStorage;
    } else {
      scheduleArr = [];
    }
  }

  function scheduleFocus() {
    var currentHourInt = parseInt(moment().format('HH'));
    currentHourInt = 13;

    var timeIDs = $('#schedule-table tr[id]')
      .map(function() {
        return this.id;
      })
      .get();

    for (var i = 0; i < timeIDs.length; i++) {
      var timeIDsInt = parseInt(timeIDs[i]);
      if (timeIDsInt < currentHourInt) {
        $('#' + timeIDs[i])
          .find('textarea')
          .css('background-color', 'grey');
          // past
      } else if (timeIDsInt === currentHourInt) {
        $('#' + timeIDs[i])
          .find('textarea')
          .css('background-color', '#ccffff');
          // current
      } else {
        $('#' + timeIDs[i])
          .find('textarea')
          .css('background-color', 'lightblue');
          // future
      }
    }
  }

  // function clearSchedule() {
  //     $('#clear-button').on('click', function() {
  //         $('textarea').html("");
  //         localStorage.clear();
  //         displaySchedule();
  //     });
  // } this does not work properly
});
