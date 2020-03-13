var trivia = {//initial game values

    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 11,
    timerOn: false,
    timerId: '',

    questions: {

        q1: "What is the state capital of Maine?",
        q2: "What is the state capital of Vermont?",
        q3: "What is the state capital of New Hampshire?",
        q4: "What is the state capital of New York?",
        q5: "What is the state capital of New Jersey?",
        q6: "What is the state capital of Massachusetts?",
        q7: "What is the state capital of Rhode Island?",
        q8: "What is the state capital of Pennsylvania?",
        q9: "What is the state capital of Maryland?",
        q10: "What is the state capital of Delaware?"
    },
    choices: {
        q1: ["Bangor", "Portland", "Bar Harbor", "Augusta"],
        q2: ["Burlington", "Manchester", "Montpelier", "Stowe"],
        q3: ["Portsmouth", "Concord", "Keene", "Nashua"],
        q4: ["Rochester", "New York City", "Albany", "Buffalo"],
        q5: ["Trenton", "Newark", "Atlantic City", "Jersey City"],
        q6: ["Cambridge", "Boston", "Worcester", "Salem"],
        q7: ["Newport", "Warwick", "Cranston", "Providence"],
        q8: ["Philadelphia", "Scranton", "Harrisburg", "Pittsburgh"],
        q9: ["Baltimore", "Annapolis", "Ocean City", "Silver Spring"],
        q10: ["Wilmington", "Dover", "Rehoboth Beach", "Newark"]
    },
    answers: {
        q1: "Augusta",
        q2: "Montpelier",
        q3: "Concord",
        q4: "Albany",
        q5: "Trenton",
        q6: "Boston",
        q7: "Providence",
        q8: "Harrisburg",
        q9: "Annapolis",
        q10: "Dover"
    }
}


$(document).ready(function () { 
    $("#remaining-time").hide();//hides the timer before the user presses start
    $("#current-question").hide();// hides the current questions row
    $("#start").on("click", startGame);//onclick event listener to fire trivia.gameStart anytime the start button is pushed
})

function startGame()
{
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    trivia.timer = 11;
    $("#results").html(""); 
    $("#remaining-time").show(); 
    $("#timer").text(trivia.timer); 
    trivia.currentSet = 0;
    $("#current-question").show();
    $("#choices").show();
    $("#start").hide();
    showquestion();

}

function showquestion() {

    if (!trivia.timerOn) {
        trivia.timerId = setInterval(timerCount, 1000); 
        trivia.timerOn=true;
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#current-question').text(questionContent);
    var questionChoices = Object.values(trivia.choices)[trivia.currentSet];
    var choicekey= Object.keys(trivia.choices)[trivia.currentSet];
    
    $.each(questionChoices, function (index, value) {
      
        $('#choices').append($("<input type='radio' class='choices' value ='" + value + "' name = '" + choicekey +"'>"));
        $('#choices').append($("<label>" + value + "</label><br>"))        
    })
    $(".choices").on("click", checkAnswer);

}

function checkAnswer() {
    var inputval = $(this).val();
    console.log(inputval);
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    console.log(currentAnswer)
    if (inputval === currentAnswer) {//if the user guesses right******************************
        trivia.correct++;//add 1 to correct variable
        clearInterval(trivia.timerId);//clear timer again
        $('#results').html('<h3>Correct!</h3>');//correct message      
    }
    else {
        trivia.incorrect++;//add 1 to incorrect variable
        clearInterval(trivia.timerId);//clear timer again
        $("#results").html("<h3>Better luck next time. The answer was: " + currentAnswer + "</h3>");//incorrect message       
    }
    setTimeout(function(){checkResult();},2000);
    $("#choices").empty();
}

function checkResult() {
    trivia.currentSet++;//move on to the next set of key:value pairs
    if (trivia.currentSet === Object.values(trivia.questions).length) {// if program has run through all questions:
        $("#results").show();// show the results
        $("#results").html(//push the results variables to the html
            "<h2>Game Over</h2>" +
            "<p>Correct: " + trivia.correct + "</p>" +
            "<p>Incorrect: " + trivia.incorrect + "</p>" +
            "<p>Unaswered: " + trivia.unanswered + "</p>"
        );
        $("#current-question").hide();//hide the question div
        $("#remaining-time").hide();//hide the remaining time div
        $("#start").show();//show the start button so user can restart game
    } else { 
    $("#choices").empty();//get rid of the old choices
    $("#results").empty();
    trivia.timerOn =false;
    trivia.timer = 11;
    $("#timer").text(trivia.timer);
    showquestion();
    }
}

function timerCount() {
    if (trivia.timer > 0 ) {
        trivia.timer--;
        $("#timer").text(trivia.timer);
    }
    else  {// if timer has run out:
        trivia.unanswered++;//mark one question as unanswered
        $("#current-question").text("Times Up!");// display message 'Times Up'
        $('#results').html("<h2>The answer was " + Object.values(trivia.answers)[trivia.currentSet] + "</h2>"); 
        $("#choices").empty(); 
        clearInterval(trivia.timerId);
        setTimeout(function () {checkResult();}, 2000);
    }
   
}
