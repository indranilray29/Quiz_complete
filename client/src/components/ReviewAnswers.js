// ReviewAnswers.js
import React from "react";
import { useSelector } from "react-redux";

const ReviewAnswers = () => {
    const { result, correctAnswers, reviewMode } = useSelector((state) => state.result);
    const { queue } = useSelector((state) => state.questions); // assuming queue holds the question objects

    if (!reviewMode) return null;

    return (
        <div>
            <h2 style={{ color: "white" }}>Review Your Answers</h2>
            {queue.map((question, index) => {
                const userAnswer = result[index];
                const correctAnswer = correctAnswers[index];
                const isCorrect = userAnswer === correctAnswer;

                return (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <p style={{ color: "white" }}>Question {index + 1}: {question.question}</p>

                        {question.options.map((option, optionIndex) => {
                            const isUserAnswer = result[index] === optionIndex;
                            const isCorrectOption = correctAnswers[index] === optionIndex;
                            console.log(`Option ${optionIndex} - isCorrectOption: ${isCorrectOption}, isUserAnswer: ${isUserAnswer}`);

                            return (
                                <div key={optionIndex} style={{ marginLeft: "20px" }}>
                                    <label
                                        style={{
                                            color: isCorrectOption ? "green" : isUserAnswer && !isCorrect ? "red" : "white",
                                            fontWeight: isCorrectOption || isUserAnswer ? "bold" : "normal",
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            
                                            checked={isCorrectOption || isUserAnswer}  // Checked if correct or user answer
                                            style={{
                                                marginRight: "10px",
                                                accentColor: isCorrectOption ? "green" : isUserAnswer ? "red" : "black",
                                            }}
                                        />
                                        {option}
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default ReviewAnswers;
