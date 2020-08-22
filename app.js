const start = document.querySelector(".start-btn");
const question = document.querySelector("#ques");
const answers = document.querySelectorAll(".btn");
const quiz = document.querySelector(".quiz");
const next = document.querySelector(".next-btn");
let questionIndex = 0;

async function fetchData(idx) {
  let response = await fetch(
    "https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple"
  );
  let correctIdx = Math.floor(Math.random() * 3 + 1);
  let incorrectIdx = 0;
  let questions = await response.json();
  let quest = questions.results[idx].question;
  let correct = questions.results[idx].correct_answer;
  let incorrect = questions.results[idx].incorrect_answers;

  return ui(quest, correct, incorrect, correctIdx, incorrectIdx);
}

const ui = (quest, correct, incorrect, correctIdx, incorrectIdx) => {
  question.textContent = quest;
  answers[correctIdx].textContent = correct;
  answers.forEach((answer, i) => {
    if (i !== correctIdx) {
      answer.textContent = incorrect[incorrectIdx];
      incorrectIdx++;
    }
  });
};

const startQuiz = () => {
  start.classList.add("hide");
  quiz.classList.remove("hide");
  questionIndex++;
};

const nextQuestion = () => {
  if (questionIndex > 9) {
    console.log("done");
  } else {
    fetchData(questionIndex);
    questionIndex++;
  }
};

start.addEventListener("click", () => {
  fetchData(questionIndex);
  startQuiz();
});

next.addEventListener("click", () => {
  nextQuestion();
});
