class Question {
    // YOUR CODE HERE:
    //
    // 1. constructor (text, choices, answer, difficulty)

    // 2. shuffleChoices()
    constructor (text, choices, answer, difficulty){
        this.text = text;
        this.choices = choices;
        this.answer = answer;
        this.difficulty = difficulty;
    }

    shuffleChoices(){
        let arr = this.choices // or this.choices.splice()
        for (let i = arr.length - 1; i > 0; i--) {
            // Pick a random index from 0 to i
            const j = Math.floor(Math.random() * (i + 1));

            // Swap arr[i] with arr[j]
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
}
