// Track statuses for Pomodoro method.
global.breakStatus = false;
global.pomoStatus = false;
global.noSession = false;
global.lastSession;
global.timer;
global.timeOutStart;
var elapsedTime;

function clearSession(msg, telegram) {
    telegram.sendMessage(msg.chat.id, "All sessions cleared.");
    clearTimeout(timer);
  }

function pomoSession(msg, telegram) {
    telegram.sendMessage(msg.chat.id, "25 minutes done! Take a break.");
    pomoStatus = false;
    breakStatus = true;
    timer = setTimeout(breakSession, 7 * 60 * 1000, msg, telegram);
    timer;
    timeOutStart = Date.now();
  }

// Get current status of the Pomodoro session.
function getStatus(msg, session, telegram) {
    if (noSession) {
      telegram.sendMessage(msg.chat.id, "No pomodoro session is currently running.");
    }
    else if (pomoStatus) {
      elapsedTime = Number((25 - ((Date.now() - timeOutStart) / 1000) / 60).toFixed(1));
      telegram.sendMessage(msg.chat.id, `Session "${session}" is currently running. You have ${elapsedTime} minute(s) left.`);
    }
    else if (breakStatus) {
      elapsedTime = Number((7 - ((Date.now() - timeOutStart) / 1000) / 60).toFixed(1));
      telegram.sendMessage(msg.chat.id, `You're on break from "${session}"! You have ${elapsedTime} minute(s) left before work.`);
    }
  }

  function breakSession(msg, telegram) {
    noSession = true;
    breakStatus = false;
    timeOutStart = Date.now();
    telegram.sendMessage(msg.chat.id, "7 minutes done. Back to work!");
  }

  module.exports = {
    clear: clearSession,
    pomoSession: pomoSession,
    break: breakSession,
    status: getStatus,
  };
