import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import QuestionService from "./questions.js";

let questions = [];
let currentQuestionIndex = 0;
let correct;

// Helper logic

// Ui Logic
function showQuestion() {
  $("#start").fadeOut();
  if (currentQuestionIndex <= questions.length - 1) {
    $("#question-text").text(`${questions[currentQuestionIndex].question}`);
  } else {
    $("#question-text").text(`You got ${correct} right!`);
  }
}

$("#true").on("click", () => {
  if (questions[currentQuestionIndex].correct_answer === "True") {
    correct++;
  }
  currentQuestionIndex += 1;
  showQuestion();
  // this should show if they got answer correct or simply move on to next question and show them correct answers after last question
});
$("#false").on("click", () => {
  if (questions[currentQuestionIndex].correct_answer === "False") {
    correct++;
  }

  currentQuestionIndex += 1;
  showQuestion();
  // this should show if they got answer correct or simply move on to next question and show them correct answers after last question
});
$("#start").on("click", () => {
  let promise = QuestionService.getQuestions();
  promise.then(
    function (response) {
      const body = JSON.parse(response);
      questions = body.results;
      correct = 0;
      showQuestion();
    },
    function (error) {
      console.log("There was an error", error);
    }
  );
});
