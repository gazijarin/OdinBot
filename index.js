const TelegramBot = require('node-telegram-bot-api');
const natural = require('natural');
const classifierJSON = require('./classifier.json')
var nlpControl = require('./nlpcontrol');
var pomo = require('./pomo');
var pomoStatus = require('./pomo').pomoStatus

telegram = new TelegramBot("841504355:AAF67TNOSpE5GYna-2SF7tgoyaH_xc9QHvs", { polling: true });
var classifier = new natural.BayesClassifier();

// Add the NLP.
nlpControl.add(classifier);

var json_file = classifierJSON['docs'];
var len = json_file.length;

// Check how much a typed word matches an actual word.
function check(label, word){
  var stemmed_word = natural.PorterStemmer.stem(word.toLowerCase());
  var actual_word;

  for (var i = 0; i < len; i++) {
    if (json_file[i]['label'] == label) {
      actual_word = json_file[i]['text'][0];
      break;
    }
  }
  if (natural.JaroWinklerDistance(stemmed_word, actual_word) > 0.5) {
    console.log(natural.JaroWinklerDistance(stemmed_word, actual_word))
    console.log(stemmed_word);
    console.log(actual_word);
    return true;
  }
  else {
    console.log(natural.JaroWinklerDistance(stemmed_word, actual_word))
    console.log(stemmed_word);
    console.log(actual_word);
    return false;
  }
}

// On pomodoro text.
telegram.onText(/\/pomodoro (.+)/, (msg, match) => {
  const prompt = match[1];
  if ((prompt === 'status') || (prompt === 'Status')) {
    pomo.status(msg, global.lastSession, telegram);
  }
  else if ((prompt === 'clear') || (prompt === 'Clear')) {
    global.pomoSession = false;
    global.breakSession = false;
    global.noSession = true;
    pomo.clear(msg, telegram);
  }
  else {
    global.lastSession = prompt;
    var date = new Date().toLocaleString();
    telegram.sendMessage(msg.chat.id, `Session "${prompt}" started on ${date}.`);
    global.pomoStatus = true;
    global.noSession = false;
    global.timer = setTimeout(pomo.pomoSession, 25 * 60 * 1000, msg, telegram);
    global.timer;
    global.timeOutStart = Date.now();
  }
});

telegram.on("message", (message) => {
  console.log(classifier.getClassifications(message.text))
  var str = message.text;
  var letter = str.charAt(0);

  if (letter === '/') { 
  }
  else if (classifier.getClassifications(message.text)[0]['value'] <= 0.7) {
    if  (classifier.getClassifications(message.text)[0]['label'] == 'greeting' && check('greeting', message.text)) {
      telegram.sendMessage(message.chat.id, (nlpControl.NLGgreetings[Math.floor(Math.random() * nlpControl.NLGgreetings.length)]));
    }
    else if (classifier.getClassifications(message.text)[0]['label'] == 'bye' || check('bye', message.text)) {
      telegram.sendMessage(message.chat.id, (nlpControl.NLGfarewells[Math.floor(Math.random() * nlpControl.NLGfarewells.length)]));
    }
    else if (classifier.getClassifications(message.text)[0]['label'] == 'smalltalk' || check('smalltalk', message.text)) {
      telegram.sendMessage(message.chat.id, (nlpControl.NLGsmalltalk[Math.floor(Math.random() * nlpControl.NLGsmalltalk.length)]));
    }
  else {
    telegram.sendMessage(message.chat.id, "Sorry, did not get that. Can you say it again?");
  }
}
});
