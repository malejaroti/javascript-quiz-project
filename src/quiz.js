class Quiz {
  // YOUR CODE HERE:
  //
  // 1. constructor (questions, timeLimit, timeRemaining)
  constructor(questions, timeLimit, timeRemaining) {
    this.questions = questions;
    this.timeLimit = timeLimit;
    this.timeRemaining = timeRemaining;
    this.correctAnswers = 0;
    this.currentQuestionIndex = 0;
  }

  // 2. getQuestion()
  getQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // 3. moveToNextQuestion()
  moveToNextQuestion() {
    this.currentQuestionIndex++;
  }

  // 4. shuffleQuestions()
  shuffleQuestions() {
    for (let i = this.questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.questions[i], this.questions[j]] = [
        this.questions[j],
        this.questions[i],
      ];
    }
    this.currentQuestionIndex = 0;
  }

  // 5. checkAnswer(answer)
  // Checks if the passed answer is correct for the current question and increments correctAnswers by 1 if the answer is correct.

  // should be defined.
  // should be a function.
  // should receive 1 argument (answer - string).
  // should increase correctAnswers by 1 when called with a correct answer for the current question

  checkAnswer(answer) {
    if (this.questions[this.currentQuestionIndex].answer === answer) {
      this.correctAnswers++;
    }
    console.log(this.correctAnswers)
  }

  // 6. hasEnded()
  hasEnded() {
    if (this.currentQuestionIndex < (this.questions.length)) {
      return false;
    } else if (this.currentQuestionIndex === (this.questions.length )){
      return true;
    }
    // when we run out of time, stop the quiz
    else if(this.timeRemaining<0){
      return true;
    }
  }
  filterQuestionsByDifficulty(difficulty){
    // added less/greater or equal to symbols. Without it the only acceptable difficult in 2 for this method
    if(difficulty >= 1  && difficulty <= 3){
      this.questions = this.questions.filter( question => question.difficulty === difficulty)
    }

  }
  // averageDifficulty(){
  //   return this.questions.reduce( (sum, ele) =>  (sum + ele.difficulty))
  // }
  // averageDifficulty(){ 
  //   let sum = this.questions.reduce( (sum, ele) =>  (sum + ele.difficulty),0)
  //   return sum / this.questions.length
//   }

averageDifficulty(){
  let sumOfDifficulty=this.questions.reduce((acc,question)=> (acc + question.difficulty ),0)
  return sumOfDifficulty/this.questions.length


}
convertTimeRemianingToString(){

  const minutes = Math.floor(this.timeRemaining / 60).toString().padStart(2, "0");
  const seconds = (this.timeRemaining % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`

}
}

// should return 'false' when 'currentQuestionIndex' is less than the 'questions' array length
// should return 'true' when 'currentQuestionIndex' is equal to the 'questions' array length
