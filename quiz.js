// Questions array
const questions = [
    { question: "What is the capital of France?", options: ["Paris", "London", "Rome"], answer: "Paris" },
    { question: "Which is the largest planet?", options: ["Mars", "Jupiter", "Earth"], answer: "Jupiter" },
    { question: "Which language runs in the browser?", options: ["Python", "JavaScript", "C++"], answer: "JavaScript" },
    { question: "What color do you get when you mix red and white?", options: ["Pink", "Purple", "Orange"], answer: "Pink" },
    { question: "Will you be my Valentine?", options: ["Yes", "No"], special: true }
];

// Shuffle questions
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

let shuffledQuestions = shuffle([...questions]);
let currentIndex = 0;
let score = 0;

const quizContainer = document.getElementById("quiz");
const submitBtn = document.getElementById("submit-quiz");
const resultDiv = document.getElementById("quiz-result");

// Show current question
function showQuestion() {
    quizContainer.innerHTML = ""; // clear previous question
    const q = shuffledQuestions[currentIndex];

    const qDiv = document.createElement("div");
    qDiv.classList.add("question-card");

    const qTitle = document.createElement("h3");
    qTitle.textContent = `Question ${currentIndex + 1}: ${q.question}`;
    qDiv.appendChild(qTitle);

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    q.options.forEach(option => {
        const card = document.createElement("div");
        card.classList.add("option-card");
        card.textContent = option;

        if (q.special && option === "No") {
            card.addEventListener("mouseenter", () => {
                const x = Math.random() * 200 - 100;
                const y = Math.random() * 200 - 100;
                card.style.transform = `translate(${x}px, ${y}px)`;
            });
        }

        card.addEventListener("click", () => {

            if (q.special && option === "Yes") {
                quizContainer.innerHTML = "";
                resultDiv.innerHTML = "🎉💖 YOU WON THE JACKPOT 💖🎉<br>ME!!!!!<br>Happy Valentine’s Day!";
                resultDiv.style.fontSize = "1.5rem";
                resultDiv.style.color = "#c75c6f";
                return;
            }

            if (q.special && option === "No") {
                return; // impossible to click anyway 😉
            }

            optionsDiv.querySelectorAll(".option-card").forEach(c => c.style.pointerEvents = "none");

            const feedback = document.createElement("div");
            feedback.style.marginTop = "0.5rem";
            feedback.style.fontWeight = "bold";
            if (option === q.answer) {
                card.classList.add("correct");
                card.style.borderColor = "green";
                card.style.backgroundColor = "#d4f5d4";
                feedback.textContent = "Correct!";
                feedback.style.color = "green";
                score++;
            } else {
                card.classList.add("wrong");
                card.style.borderColor = "red";
                card.style.backgroundColor = "#f9d6d6";
                feedback.textContent = `Wrong! Correct answer: ${q.answer}`;
                feedback.style.color = "red";
            }
            qDiv.appendChild(feedback);

            setTimeout(() => {
                currentIndex++;
                if (currentIndex < shuffledQuestions.length) {
                    showQuestion();
                } else {
                    quizContainer.innerHTML = "";
                    submitBtn.style.display = "none";
                    resultDiv.textContent = `Quiz completed! You scored ${score} out of ${shuffledQuestions.length}.`;
                }
            }, 3000);
        });

        optionsDiv.appendChild(card);
    });

    qDiv.appendChild(optionsDiv);
    quizContainer.appendChild(qDiv);
}

// Initialize
showQuestion();