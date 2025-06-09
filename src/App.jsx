// import React, { useState, useEffect } from "react";
// import htmlCssQuestions from "./components/questions/HtmlCssQuestions";
// import stateCapitalQuestions from "./components/questions/StateCapitalQuestions";
// import animalQuestions from "./components/questions/AnimalQuestions";
// import foodQuestions from "./components/questions/FoodQuestions";
// import "./App.css";

// const categories = {
//   "State & Capital": stateCapitalQuestions,
//   // "HTML & CSS": htmlCssQuestions,
//   "Foods": foodQuestions,
//   "Animals": animalQuestions,
// };

// export default function App() {
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [isQuizFinished, setIsQuizFinished] = useState(false);
//   const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);

//   useEffect(() => {
//     if (!selectedCategory || isQuizFinished) return;

//     if (timeLeft === 0) {
//       setShowTimeoutAlert(true);
//       setTimeout(() => {
//         setShowTimeoutAlert(false);
//         goToNextQuestion();
//       }, 1500);
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, selectedCategory, isQuizFinished]);

//   const startQuiz = (category) => {
//     setSelectedCategory(category);
//     setQuestions(categories[category]);
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setTimeLeft(30);
//     setIsQuizFinished(false);
//   };

//   const handleAnswerClick = (option) => {
//     if (option === questions[currentQuestionIndex].answer) {
//       setScore(score + 1);
//     }
//     goToNextQuestion();
//   };

//   const goToNextQuestion = () => {
//     const next = currentQuestionIndex + 1;
//     if (next < questions.length) {
//       setCurrentQuestionIndex(next);
//       setTimeLeft(30);
//     } else {
//       setIsQuizFinished(true);
//     }
//   };

//   const restartQuiz = () => {
//     setSelectedCategory(null);
//     setQuestions([]);
//     setCurrentQuestionIndex(0);
//     setScore(0);
//     setTimeLeft(30);
//     setIsQuizFinished(false);
//   };

//   if (!selectedCategory) {
//     return (
//       <div className="container">
//         <h1 className="title">MCQ Quiz Game</h1>
//         <p className="subtitle">Choose a category to begin:</p>
//         <div className="category-buttons">
//           {Object.keys(categories).map((cat) => (
//             <button key={cat} onClick={() => startQuiz(cat)} className="category-button">
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (isQuizFinished) {
//     return (
//       <div className="container">
//         <h2 className="title">Quiz Completed!</h2>
//         <p className="score">
//           You scored {score} out of {questions.length}
//         </p>
//         <button onClick={restartQuiz} className="restart-button">
//           Restart Quiz
//         </button>
//       </div>
//     );
//   }

//   const currentQ = questions[currentQuestionIndex];

//   return (
//     <div className="container">
//       <div className="quiz-box">
//         <div className="top-bar">
//           <span>Category: {selectedCategory}</span>
//           <span>Time Left: {timeLeft}s</span>
//         </div>
//         <img src={currentQ.image} alt="Question" className="question-img" />
//         <h3 className="question">
//           Q{currentQuestionIndex + 1}: {currentQ.question}
//         </h3>
//         <div className="options">
//           {currentQ.options.map((option, index) => (
//             <button
//               key={index}
//               className="option-button"
//               onClick={() => handleAnswerClick(option)}
//             >
//               {option}
//             </button>
//           ))}
//         </div>
//         {showTimeoutAlert && (
//           <div className="timeout-alert">⏰ Time's up! Moving to next question...</div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useState, useEffect } from "react";
import htmlCssQuestions from "./components/questions/HtmlCssQuestions";
import stateCapitalQuestions from "./components/questions/StateCapitalQuestions";
import animalQuestions from "./components/questions/AnimalQuestions";
import foodQuestions from "./components/questions/FoodQuestions";
import "./App.css";

const categories = {
  "State & Capital": stateCapitalQuestions,
  // "HTML & CSS": htmlCssQuestions,
  "Foods": foodQuestions,
  "Animals": animalQuestions,
};

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [showTimeoutAlert, setShowTimeoutAlert] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({}); // Track answered questions

  useEffect(() => {
    if (!selectedCategory || isQuizFinished) return;

    if (timeLeft === 0) {
      setShowTimeoutAlert(true);
      setTimeout(() => {
        setShowTimeoutAlert(false);
        goToNextQuestion();
      }, 1500);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, selectedCategory, isQuizFinished]);

  const startQuiz = (category) => {
    setSelectedCategory(category);
    setQuestions(categories[category]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setIsQuizFinished(false);
    setAnsweredQuestions({});
  };

  const handleAnswerClick = (option) => {
    // If question already answered, ignore
    if (answeredQuestions[currentQuestionIndex]) return;

    if (option === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestionIndex]: option,
    }));
  };

  const goToNextQuestion = () => {
    const next = currentQuestionIndex + 1;
    if (next < questions.length) {
      setCurrentQuestionIndex(next);
      setTimeLeft(30);
    } else {
      setIsQuizFinished(true);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setTimeLeft(30);
    }
  };

  const restartQuiz = () => {
    setSelectedCategory(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimeLeft(30);
    setIsQuizFinished(false);
    setAnsweredQuestions({});
  };

  if (!selectedCategory) {
    return (
      <div className="container">
        <h1 className="title">MCQ Quiz Game</h1>
        <p className="subtitle">Choose a category to begin:</p>
        <div className="category-buttons">
          {Object.keys(categories).map((cat) => (
            <button key={cat} onClick={() => startQuiz(cat)} className="category-button">
              {cat}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (isQuizFinished) {
    return (
      <div className="container">
        <h2 className="title">Quiz Completed!</h2>
        <p className="score">
          You scored {score} out of {questions.length}
        </p>
        <button onClick={restartQuiz} className="restart-button">
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const userAnswer = answeredQuestions[currentQuestionIndex];

  return (
    <div className="container">
      <div className="quiz-box">
        <div className="top-bar">
          <span>Category: {selectedCategory}</span>
          <span>Time Left: {timeLeft}s</span>
        </div>
        <img src={currentQ.image} alt="Question" className="question-img" />
        <h3 className="question">
          Q{currentQuestionIndex + 1}: {currentQ.question}
        </h3>
        <div className="options">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${
                userAnswer === option
                  ? option === currentQ.answer
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={!!userAnswer} // Disable if already answered
            >
              {option}
            </button>
          ))}
        </div>

        <div className="navigation-buttons">
          <button
            onClick={goToPreviousQuestion}
            disabled={currentQuestionIndex === 0}
            className="nav-button"
          >
            ← Previous
          </button>
          <button
            onClick={goToNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className="nav-button"
          >
            Next →
          </button>
        </div>

        {showTimeoutAlert && (
          <div className="timeout-alert">⏰ Time's up! Moving to next question...</div>
        )}
      </div>
    </div>
  );
}
