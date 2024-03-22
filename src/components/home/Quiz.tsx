import React, { useState } from "react";
import { ReactComponent as ChevronLeft } from "src/icons/chevronLeft.svg";
import Header from "./Header";
import { colors } from "src/constants/colorPalette";
import { CourseQuizSection } from "src/types";
// import Modal from "./Modal";

interface Props {
  quizSection: CourseQuizSection,
}

const Quiz: React.FC<Props> = ({ quizSection }) => {
  const [selectedAnswers, setSelectedAnswers] = useState(new Array(quizSection.questions.length).fill([]));
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    const updatedSelectedAnswers = [...selectedAnswers];
    const currentSelectedAnswers = updatedSelectedAnswers[questionIndex];

    if (currentSelectedAnswers.includes(answerIndex)) {
      // Deselect the answer if already selected
      updatedSelectedAnswers[questionIndex] = currentSelectedAnswers.filter((index) => index !== answerIndex);
    } else {
      // Select the answer if not selected
      updatedSelectedAnswers[questionIndex] = [...currentSelectedAnswers, answerIndex];
    }

    setSelectedAnswers(updatedSelectedAnswers);
  };

  const handleSubmit = () => {
    const correctAnswersCount = calculateScore();

    setScore(correctAnswersCount);
    setShowFeedbackModal(true);
  };

  const calculateScore = () => {
    let correctAnswersCount = 0;

    quizSection.questions.forEach((question, questionIndex) => {
      const selectedAnswerIndices = selectedAnswers[questionIndex];
      const correctAnswerIndices = question.answers
        .map((answer, index) => (answer.correctAnswer ? index : null))
        .filter((index) => index !== null);

      if (
        correctAnswerIndices.every((index) => selectedAnswerIndices.includes(index)) &&
        correctAnswerIndices.length === selectedAnswerIndices.length
      ) {
        correctAnswersCount++;
      }
    });

    return correctAnswersCount;
  };

  const closeModal = () => {
    setScore(null);
    setShowFeedbackModal(false);
  };

  const totalQuestions = quizSection.questions.length;

  return (
    <div className="mb-4 ms-4">
      <div>
        <div className="d-flex align-items-center">
          <div role="button">
            <ChevronLeft
              stroke={colors.orange}
              className="mt-4 me-1" />
          </div>
          <Header title="Quiz" />
        </div>
        {quizSection.questions.map((question, questionIndex) => (
          <div key={question.id}>
            <h5 className="mt-2 mb-4">{question.question}</h5>
            {question.answers.map((answer, answerIndex) => (
              <div
                key={answer.id}
                className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`question-${questionIndex}-answer-${answerIndex}`}
                  checked={selectedAnswers[questionIndex].includes(answerIndex)}
                  onChange={() => handleAnswerChange(questionIndex, answerIndex)}/>
                <label
                  className="form-check-label"
                  htmlFor={`question-${questionIndex}-answer-${answerIndex}`}>
                  {answer.answer}
                </label>
              </div>
            ))}
          </div>
        ))}
        <button
          className="btn btn-primary mt-3"
          onClick={handleSubmit}>
          Submit
        </button>
      </div>
      {/* {showFeedbackModal && (
        <Modal onClose={closeModal}>
          {score !== null ? (
            <>
              <div className={score === totalQuestions ? 'text-success' : 'text-danger'}>
                {score === totalQuestions ? '✔' : '✘'}
              </div>
              <p>
                {score}/{totalQuestions} answered correctly!
              </p>
            </>
          ) : null}
        </Modal>
      )} */}
    </div>
  );
};

export default Quiz;
