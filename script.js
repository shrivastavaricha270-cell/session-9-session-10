const themeButton = document.querySelector("#themeToggle");

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  if (themeButton) {
    themeButton.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  }
}

const savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeButton?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", next);
  applyTheme(next);
});

const questions = [
  { q: "Which language is this project mainly using for the quiz?", a: ["Python", "JavaScript", "C++", "SQL"], correct: 1 },
  { q: "Which file controls the page structure?", a: ["HTML", "CSS", "Git", "JSON"], correct: 0 },
  { q: "Which file controls visual styling?", a: ["HTML", "CSS", "Git", "Python"], correct: 1 },
  { q: "Which command starts Python's simple local server?", a: ["python -m http.server 8000", "python start web", "git server", "npm python"], correct: 0 },
  { q: "What does a test help us do?", a: ["Verify behavior", "Delete code", "Hide errors", "Replace Git"], correct: 0 }
];

const quiz = document.querySelector("#quiz");
const nextButton = document.querySelector("#nextButton");
const result = document.querySelector("#result");

if (quiz && nextButton) {
  let index = 0;
  let score = 0;
  let answered = false;

  function render() {
    answered = false;
    const item = questions[index];
    quiz.innerHTML = `<h2>${index + 1}. ${item.q}</h2>` +
      item.a.map((choice, i) =>
        `<button class="option" type="button" data-choice="${i}">${choice}</button>`
      ).join("");
    nextButton.disabled = true;

    document.querySelectorAll("[data-choice]").forEach(button => {
      button.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const choice = Number(button.dataset.choice);
        if (choice === item.correct) score++;
        nextButton.disabled = false;
      });
    });
  }

  nextButton.addEventListener("click", () => {
    if (!answered) return;
    index++;
    if (index < questions.length) {
      render();
    } else {
      quiz.innerHTML = "<h2>Quiz complete</h2>";
      nextButton.disabled = true;
      result.textContent = `Score: ${score}/${questions.length}`;
    }
  });

  render();
}
