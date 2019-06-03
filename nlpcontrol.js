NLGgreetings = ["Hey.", "Hi.", "Hello.", "Greetings.", "Hi, friend.", "Hello, human."];
NLGfarewells = ["Bye!", "See you.", "Nice working with you.", "Later!", "Goodbye, human!", "Bye bye."];
NLGsmalltalk = ["Okay.", "Alrighty.", "Yup.", "Uh-huh.", "Hmmm.", "Alright.", "Mhmm.", "Yeah."];

function addIntents(classifier) {
    // Greeting intent.
    classifier.addDocument('hello', 'greeting');
    classifier.addDocument('hi', 'greeting');
    classifier.addDocument('howdy', 'greeting');
    classifier.addDocument('hey', 'greeting');
    classifier.addDocument('hola', 'greeting');
    classifier.addDocument('yo', 'greeting');
    // Farewell intent.
    classifier.addDocument('bye', 'bye');
    classifier.addDocument('goodbye', 'bye');
    classifier.addDocument('good bye', 'bye');
    classifier.addDocument('later', 'bye');
    classifier.addDocument('farewell', 'bye');
    classifier.addDocument('see ya', 'bye');
    // Smalltalk intent.
    classifier.addDocument('ok', 'smalltalk');
    classifier.addDocument('okay', 'smalltalk');
    classifier.addDocument('alright', 'smalltalk');
    classifier.addDocument('ya', 'smalltalk');
    classifier.addDocument('yeah', 'smalltalk');
    classifier.addDocument('haha', 'smalltalk');

    classifier.train();

    // Use the code below if you want to modify the intents! Make sure to delete classifier.json first.
    // classifier.save('classifier.json', function(err, classifier) {
    //   // the classifier is saved to the classifier.json file!
    // });
}

module.exports = {
    add: addIntents,
    NLGgreetings: NLGgreetings,
    NLGfarewells: NLGfarewells,
    NLGsmalltalk: NLGsmalltalk
  };
  