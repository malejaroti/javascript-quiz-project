document.addEventListener("DOMContentLoaded", () => {
  /************  HTML ELEMENTS  ************/
  // View divs
  const quizView = document.querySelector("#quizView");
  const endView = document.querySelector("#endView");

  // Quiz view elements
  const progressBar = document.querySelector("#progressBar");
  const questionCount = document.querySelector("#questionCount");
  const questionContainer = document.querySelector("#question");
  const choiceContainer = document.querySelector("#choices");
  const nextButton = document.querySelector("#nextButton");
  const restartButton = document.querySelector("#restartButton");
  const answerNode = document.querySelector(".answers");

  // End view elements
  const resultContainer = document.querySelector("#result");

  /************  SET VISIBILITY OF VIEWS  ************/
  quizView.style.display = "block";
  endView.style.display = "none";

  /************  QUIZ DATA  ************/

  // Array with the quiz questions
  const questions = [
    new Question("What is the most dangerous animal in New Zealand", ["Great white shark", "Orca whale", "Orc", "Australian", "Elephant"], "Australian", 1),
    new Question("People often say New Zealanders have many friends. What is the sheep to human ratio in New Zealand", ["1 sheep per human", "6 sheep per human", "22 sheep per human"], "22 sheep per human", 1),
    new Question("How much ice cream do Kiwi's consume per capita per year", ["4 litres", "7 litres ", "8 litres", "26 litres"], "26 litres", 1),
    new Question("What is the most dangerous animal in New Zealand", ["Great white shark", "Orca whale", "Orc", "Australian", "Elephant"], "Australian", 1),
    new Question("Which of these is a common nickname Colombians use for foreigners?", ["Parce", "Ñero", "Gringo", "Paisa", "Cucho"], "Gringo", 1),
    new Question("What happens in Bogotá on Ciclovía Sundays?", ["Everyone goes to church", "Cars turn into bikes", "Streets are closed for bikes and people", "People play tejo in the street", "Aguardiente flows in the fountains"], "Streets are closed for bikes and people", 1),
  ];
  const quizDuration = 120; // 120 seconds (2 minutes)

  /************  QUIZ INSTANCE  ************/

  // Create a new Quiz instance object
  const quiz = new Quiz(questions, quizDuration, quizDuration);
  // Shuffle the quiz questions
  quiz.shuffleQuestions();

  /************  SHOW INITIAL CONTENT  ************/

  // Convert the time remaining in seconds to minutes and seconds, and pad the numbers with zeros if needed
  const minutes = Math.floor(quiz.timeRemaining / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (quiz.timeRemaining % 60).toString().padStart(2, "0");

  // Display the time remaining in the time remaining container
  const timeRemainingContainer = document.getElementById("timeRemaining");
  timeRemainingContainer.innerText = `${minutes}:${seconds}`;

  // Show first question
  const timer = startTimer(); // start the timer when we show the first question
  showQuestion();

  /************  TIMER  ************/

  // I wrapped the timer in a function that returned the timer reference. This made it a bit easier to start stop and reset the timer
  // depending where in the quiz the user is
  function startTimer() {
    quiz.timeRemaining = quiz.timeLimit;

    let timer = setInterval(() => {
      quiz.timeRemaining--;
      timeRemainingContainer.innerText = quiz.convertTimeRemainingToString();

      // when the user runs out of time we immediatly move to the final page
      if (quiz.timeRemaining < 0) {
        clearInterval(timer);
        // ensures the timer resets
        showResults();
      }
    }, 1000);
    return timer;
  }

  /************  EVENT LISTENERS  ************/

  nextButton.addEventListener("click", nextButtonHandler);
  restartButton.addEventListener("click", () => {
    quizView.style.display = "block";
    endView.style.display = "none";
    quiz.timeRemaining = quiz.timeLimit;
    quiz.shuffleQuestions();

    // restart the timer when the restart button is pressed
    startTimer();

    showQuestion();
  });

  /************  FUNCTIONS  ************/

  // showQuestion() - Displays the current question and its choices
  // nextButtonHandler() - Handles the click on the next button
  // showResults() - Displays the end view and the quiz results

  function showQuestion() {
    // If the quiz has ended, show the results
    if (quiz.hasEnded()) {
      showResults();
      return;
    }

    // Clear the previous question text and question choices
    questionContainer.innerText = "";
    choiceContainer.innerHTML = "";

    // Get the current question from the quiz by calling the Quiz class method `getQuestion()`
    const question = quiz.getQuestion();

    question.shuffleChoices();

    // 1. Show the question
    questionContainer.innerText = question.text;

    // 2. Update the green progress bar
    let progress = (quiz.currentQuestionIndex / quiz.questions.length) * 100;
    progressBar.style.width = `${progress}%`;

    // 3. Update the question count text
    questionCount.innerText = `Question ${quiz.currentQuestionIndex + 1} of ${quiz.questions.length}`;

    question.choices.forEach((choice, index) => {
      radioNode = document.createElement("input");
      labelNode = document.createElement("label");

      radioNode.type = "radio";
      radioNode.value = choice;
      radioNode.name = "choice";
      labelNode.innerText = choice;

      choiceContainer.appendChild(radioNode);
      choiceContainer.appendChild(labelNode);
      choiceContainer.appendChild(document.createElement("br"));
    });
  }

  function nextButtonHandler() {
    let selectedAnswer; // A variable to store the selected answer
    const checkedChoice = document.querySelector('input[name="choice"]:checked');
    selectedAnswer = checkedChoice.value;
    quiz.checkAnswer(selectedAnswer);
    quiz.moveToNextQuestion();
    showQuestion();
  }

  function showResults() {
    // YOUR CODE HERE:
    answerNode.innerHTML = `<div class="answers"></div>`;
    //
    // 1. Hide the quiz view (div#quizView)
    quizView.style.display = "none";

    // 2. Show the end view (div#endView)
    endView.style.display = "flex";

    // 3. Update the result container (div#result) inner text to show the number of correct answers out of total questions
    resultContainer.innerText = `You scored ${quiz.correctAnswers} out of ${quiz.questions.length} correct answers!`; // This value is hardcoded as a placeholder

    answerNode.style.display = "block";
    let answeredCorrectly = false;
    quiz.questions.forEach((question) => {
      answeredCorrectly = true;
      const answer = answeredCorrectly ? "correct-answer" : "incorrect-answer";
      answerNode.innerHTML += `<div class="answers"><p>${question.text}: </p><span class=${answer}>${question.answer}</span></div>`;
      // answerNode.querySelectorAll(`span`).style.color = "blue";
    });
  }
});
