var panel = $("#quiz-area");

var questions = [{
  question: "What was the first full length CGI movie?",
  answers: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King"],
  Answer: "Toy Story"
},

  {
  question: "Which of these is NOT a name of one of the Spice Girls?",
  answers: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice"],
  Answer: "Fred Spice"
},

  {
  question: "Which NBA team won the most titles in the 90s?",
  answers: ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls"],
  Answer: "Chicago Bulls"
},

  {
  question: "Which group released the hit song, - Smells Like Teen Spirit ?",
  answers: ["Nirvana", "Backstreet Boys", "The Offspring", "No Doubt"],
  Answer: "Nirvana"
},

  {
  question: "Which popular Disney movie featured the song, Circle of Life ?",
  answers: ["Aladdin", "Hercules", "Mulan", "The Lion King"],
  Answer: "The Lion King"
  }
];

var timer;

var game = {
  correct: 0,
  incorrect: 0,
  timer: 60,

  countdown: function() {
    game.timer--;
    $("#counter-number").html(game.timer);
    if (game.timer === 0) {
      console.log("Times up!!");
      game.done();
    }
  },

  start: function() {
    timer = setInterval(game.countdown, 1000);

    $("#sub-wrapper").prepend("<h2>Time left: <span id='counter-number'>60</span> Seconds</h2>");

    $("#start").remove();

    for (var i = 0; i < questions.length; i++) {
      panel.append("<h2>" + questions[i].question + "</h2>");
      for (var j = 0; j < questions[i].answers.length; j++) {
        panel.append("<input type='radio' name='question-" + i +
        "' value='" + questions[i].answers[j] + "''>" + questions[i].answers[j]);
      }
    }

    panel.append("<button id='done'>Done</button>");
  },

  done: function() {
for(var i=0; i < questions.length; i++)
  {
    // console.log(i);

    $.each($("input[name='question-"+i+"']:checked"), function() {
      if ($(this).val() === questions[i].Answer) {
        game.correct++;
      }
      else {
        game.incorrect++;
      }
    });
  };
    this.result();

  },


  result: function() {

    clearInterval(timer);

    $("#sub-wrapper h2").remove();

    panel.html("<h2>All Done!</h2>");
    panel.append("<h3>Correct Answers: " + this.correct + "</h3>");
    panel.append("<h3>Incorrect Answers: " + this.incorrect + "</h3>");
    panel.append("<h3>Unanswered: " + (questions.length - (this.incorrect + this.correct)) + "</h3>");
  }
};

$(document).on("click", "#start", function() {
  game.start();
});


$(document).on("click", "#done", function() {
  game.done();
});
