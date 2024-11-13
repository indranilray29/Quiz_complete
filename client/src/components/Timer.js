// components/Timer.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrementTimer, autoSubmitQuiz } from '../redux/question_reducer';
// import { decrementTimer} from '../redux/question_reducer';
import { Navigate } from 'react-router-dom';

import { setReviewDataAction, resetResultAction } from "../redux/result_reducer";
//import { answers } from '../database/data';

import { attempts_Number, earnPoints_Number, flagResult } from '../helper/helper';
import { usePublishResult } from '../hooks/setResult';


const Timer = () => {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.questions.timer);
  const isSubmitted = useSelector((state) => state.questions.isSubmitted);
  // const { answers } = useSelector((state) => state.questions.queue);
  const { questions : { queue ,answers}, result : { result, userId}}  = useSelector(state => state)

  const totalPoints = queue.length * 10; 
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answers, 10)
  const flag = flagResult(totalPoints, earnPoints)

  const [resultData, setResultData] = useState({});

  // const result = useSelector(state => state.result.result);

  useEffect(() => {
    const countdown = setInterval(() => {
      dispatch(decrementTimer());
    }, 1000);

    // Auto-submit when timer reaches 0
    if (timer === 0) {
      clearInterval(countdown);
      dispatch(autoSubmitQuiz());
    }

    return () => clearInterval(countdown);
  }, [dispatch, timer]);

  // // Redirect to result page if quiz is submitted
  //   useEffect(() => {
  //     setResultData( {
  //       result,
  //       username: userId,
  //       attempts,
  //       points: earnPoints,
  //       achieved: flag ? "Passed" : "Failed",
  //     });
  //   }, [isSubmitted])
  //    //Call publish function if the quiz is submitted
  //     usePublishResult(resultData);
  //     dispatch(setReviewDataAction({ result: result, correctAnswers: answers }));

  // useEffect(() => {
  //   if (isSubmitted) {
  //     const resultData = {
  //       result,
  //       username: userId,
  //       attempts,
  //       points: earnPoints,
  //       achieved: flag ? "Passed" : "Failed",
  //     };
      
  //     // Set the resultData
  //     setResultData(resultData);

  //     // Publish the result
  //     usePublishResult(resultData);

  //     // Set review data
  //     dispatch(setReviewDataAction({ result, correctAnswers: answers }));
  //   }
  // }, [isSubmitted, dispatch, result, userId, attempts, earnPoints, flag, answers]);
    

  // useEffect(() => {
  //   if (isSubmitted) {
  //     const resultData = {
  //       result,
  //       username: userId,
  //       attempts,
  //       points: earnPoints,
  //       achieved: flag ? "Passed" : "Failed",
  //     };

  //     // Call publish function if the quiz is submitted
  //     usePublishResult(resultData);
  //     dispatch(setReviewDataAction({ result: result, correctAnswers: answers }));
  //   }
  // }, [isSubmitted, dispatch, result, userId, attempts, earnPoints, flag, answers]);

  // Redirect to result page if quiz is submitted
  if (isSubmitted) {
    dispatch(setReviewDataAction({ result: result, correctAnswers: answers }));
    return <Navigate to={'/result'} replace={true} />;
  }
  

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div>
      <p style={{ color: "white", fontSize: "1.5rem"}}>Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</p>
    </div>
  );
};

export default Timer;
