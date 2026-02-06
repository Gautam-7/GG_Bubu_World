const questions = [
    { question: "First Date?", options: ["Hilton", "Hilock", "Fountain"], answer: "Hilock" },
    { question: "What instrument can I play?", options: ["Guitar", "Piano", "Violin"], answer: "Piano" },
    { question: "Which will I prefer?", options: ["Food", "Sleep", "Game"], answer: "Sleep" },
    { question: "Theme of my proposal?", options: ["Beauty", "Gamble", "Paradise"], answer: "Gamble" },
    { question: "How many sunflowers I got you the first time?", options: ["1", "2", "3"], answer: "1" },
    { question: "When did we get 'engaged'?", options: ["29 Aug", "30 Aug", "31 Aug"], answer: "31 Aug" },
    { question: "When did we first meet?", options: ["14 Feb", "13 Feb", "15 Feb"], answer: "14 Feb" },
    { question: "First hotel we stayed", options: ["Regenta", "Sparsh", "Privilon"], answer: "Sparsh" },
    { question: "Which season do I like the most?", options: ["Summer", "Autumn", "Winter"], answer: "Autumn" },
    { question: "What’s my dream vacation spot?", options: ["Switzerland", "Maldives", "USA"], answer: "Switzerland" },
    { question: "Where's Chelsea's home?", options: ["Stamford Bridge", "Standford Park", "Stanford Bridge"], answer: "Stamford Bridge" },
    { question: "Where did we not go when in Goa?", options: ["Candolim", "Panaji", "Anjuna"], answer: "Anjuna" },
    { question: "How many times have I gotten you flowers", options: ["1", "4", "6"], answer: "4" },
    { question: "What is our favourite memory?", options: ["Goa", "Meeting for the first time", "Regenta"], answer: "Meeting for the first time" },
    { question: "What Naan did we eat at fountain?", options: ["Garlic", "Butter", "Plain"], answer: "Garlic" },
    { question: "Best thing about you?", options: ["Kindness", "Your love", "Emotions"], answer: "Your Love" },
    { question: "My favourite Chelsea Player?", options: ["Hazard", "Drogba", "Lampard"], answer: "Lampard" },
    { question: "Best food we have had till now?", options: ["Fountain", "Your Pasta", "Chur Chur Naan"], answer: "Your Pasta" },
    { question: "Kanada word I learned first", options: ["Chennagite", "Novu Hegide", "Pretisthutheni"], answer: "Novu Hegide" },
    { question: "My favourite food?", options: ["Chicken", "Eggs", "Potato"], answer: "Eggs" },
    { question: "What about you bothers me the most?", options: ["Your EX", "Your Anger", "Your Health"], answer: "Your Anger" },
    { question: "How good are we together?", options: ["OK OK", "Very Good", "Perfect"], answer: "Perfect" },
    { question: "What is my favourite gift from you?", options: ["Chelsea Jersey", "Chelsea Hoodie", "Starry Night Frame"], answer: "Chelsea Jersey" },
    { question: "What do I like the least?", options: ["Coconut", "Brinjal", "Fish"], answer: "Fish" },
    { question: "How planned are we about the coming trip?", options: ["No plans", "Rough Idea", "Full planned"], answer: "Rough Idea" }
];

const specialQuestion = { question: "Will you be my Valentine?", options: ["Yes", "No"], special: true }

function getRandomQuestions(array, n) {
  const arr = [...array]; // copy original array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
  }
  return arr.slice(0, n); // take only first n items
}

let shuffledQuestions = getRandomQuestions(questions,5);
let currentIndex = 0;
let score = 0;

if (Math.random() < 0.1) {
  shuffledQuestions.unshift(specialQuestion); 
}

const quizContainer = document.getElementById("quiz");
const submitBtn = document.getElementById("submit-quiz");
const resultDiv = document.getElementById("quiz-result");

function showQuestion() {
    quizContainer.innerHTML = "";
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
            function dropNo() {
                card.classList.add("drop-off");

                setTimeout(() => {
                card.style.display = "none";
                }, 800);
            }

            card.addEventListener("mouseenter", dropNo);  
            card.addEventListener("click", dropNo);      
            card.addEventListener("touchstart", e => {  
                e.preventDefault();
                dropNo();
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
                return;
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
                    if (score === 5)
                        resultDiv.textContent = `Quiz completed! You scored ${score} out of ${shuffledQuestions.length}. Perfect as you are!`;
                    else if (score<5 && score>2)
                        resultDiv.textContent = `Quiz completed! You scored ${score} out of ${shuffledQuestions.length}. Could be better!`;
                    else if (score>0)
                        resultDiv.textContent = `Quiz completed! You scored ${score} out of ${shuffledQuestions.length}. Pathetic!`;
                    else
                        resultDiv.textContent = `Quiz completed! You scored ${score} out of ${shuffledQuestions.length}. My disappointment is immeasurable and my day is ruined.`;
                }
            }, 1000);
        });

        optionsDiv.appendChild(card);
    });

    qDiv.appendChild(optionsDiv);
    quizContainer.appendChild(qDiv);
}

showQuestion();