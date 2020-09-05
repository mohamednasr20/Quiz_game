const ui = () => {
  const root = document.querySelector("#root");
  let isSelected = true;
  let score = 0;
  currentIdx = -1;
  const quiz = new Quiz(root, isSelected, score, currentIdx);

  quiz.renderUi();
  const form = document.querySelector(".form-group");
  const categories = document.querySelector("#categories");
  const btn = document.querySelector("#btn");
  const reset = document.querySelector("#reset");

  categories.addEventListener("change", (e) => {
    quiz.inSelect(e.target.value);
    form.classList.add("d-none");
    btn.classList.remove("d-none");
  });

  btn.addEventListener("click", () => {
    const questionDiv = document.querySelectorAll(".question-div");

    quiz.showQuestion(questionDiv, btn);
  });

  reset.addEventListener("click", () => document.location.reload());
};

ui();
