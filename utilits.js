class Quiz {
  constructor(root, isSelected, score, currentIdx) {
    this.root = root;
    this.isSelected = isSelected;
    this.score = score;
    this.currentIdx = currentIdx;
  }

  renderUi() {
    this.root.innerHTML = `

        <div class="form-group form-row">
        <label for="categories" class="text-light display-4 my-4">Select Category</label>
        <select class="form-control" id="categories">
        <option>Any Category</option>
          <option value="9">General knowlege</option>
          <option value="11">Film</option>
          <option value="27">Animal</option>
          <option value="23">History</option>
          <option value="21">Sports</option>
          <option value="18">Computer</option>
          <option value="14">Television</option>
          <option value="10">Books</option>
        </select>
        </div>

        <button id="btn" class="btn btn-light btn-lg d-none"  data-select="true">Start Your Quiz</button>

        <button id="final-score" type="button" class="btn btn-light d-none" data-toggle="modal" data-target="#staticBackdrop">
          Check Your Score
        </button>

        <!-- Modal -->
        <div class="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content text-center">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body display-4">
                ...
              </div>
              <div class="modal-footer text-center">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" id="reset" class="btn btn-dark">Reset</button>
              </div>
            </div>
          </div>
        </div>
        `;
  }

  creatQuestion(question, answers, correct_answer, index) {
    const div = document.createElement("div");
    div.classList.add("d-none", "question-div", "m-4");
    div.innerHTML = `

       <h4 class="text-light font-weight-bold my-4">${
         index + 1
       } - ${question}</h4>
         <p  class="danger bg-danger m-4 py-2 text-light d-none">Slecet Answer Please</p>
         <div  class="choices-${index} m-4">
         <button class="btn btn-light btn-block choice">${answers[0]}</button>
         <button class="btn btn-light btn-block choice">${answers[1]}</button>
         <button class="btn btn-light btn-block choice">${answers[2]}</button>
         <button class="btn btn-light btn-block choice">${answers[3]}</button>
        </div>

        <p id="answer-${index}" class="text-left text-light btn d-none">check the correct answer</p>

    `;

    root.insertBefore(div, btn);

    const choices = document.querySelector(`.choices-${index}`);
    const checkAnswer = document.querySelector(`#answer-${index}`);

    const modalBody = document.querySelector(".modal-body");

    choices.addEventListener("click", (e) => {
      let choice = e.target;
      if (this.isSelected || !choice.classList.contains("btn")) return;

      choice.classList.remove("btn-light");
      if (choice.textContent === correct_answer) {
        choice.classList.add("btn-success");
        this.score++;
      } else {
        choice.classList.add("btn-danger");
        checkAnswer.classList.remove("d-none");
      }

      if (index === 9) {
        btn.classList.add("d-none");
        document.querySelector("#final-score").classList.remove("d-none");
        modalBody.textContent = `Your Score ${this.score} `;
        if (this.score > 5) {
          modalBody.classList.add("text-success");
        } else {
          modalBody.classList.add("text-danger");
        }
      }

      this.isSelected = true;
    });

    checkAnswer.addEventListener(
      "click",
      () => (checkAnswer.textContent = correct_answer)
    );
  }

  showQuestion(list, btn) {
    if (this.isSelected === false) {
      const alert = document.querySelectorAll(".danger");

      alert[this.currentIdx].classList.remove("d-none");
      setTimeout(() => {
        alert[this.currentIdx].classList.add("d-none");
      }, 2000);
    } else if (this.currentIdx < 10) {
      btn.textContent = "next";
      list.forEach((q) => q.classList.add("d-none"));

      list[this.currentIdx + 1].classList.remove("d-none");

      this.isSelected = false;
      this.currentIdx++;
    }
  }

  async fetchData(category) {
    const res = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=easy&type=multiple`
    );

    const data = await res.json();

    const results = data.results;
    return results;
  }

  async inSelect(category) {
    const questions = await this.fetchData(category);

    questions.forEach((questionObj, i) => {
      const { question, correct_answer, incorrect_answers } = questionObj;
      const randomIdx = Math.floor(Math.random() * 4);
      const allAnswers = incorrect_answers;
      allAnswers.splice(randomIdx, 0, correct_answer);

      this.creatQuestion(question, allAnswers, correct_answer, i);
    });
  }
}
