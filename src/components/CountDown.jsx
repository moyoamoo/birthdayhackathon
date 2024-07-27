import React from "react";
import Countdown from "react-countdown";
import { unixToDate } from "../utils/utils";

const CountDownTimer = () => {
  const date = 1753612830000;
  const name = "Liam";

  const difference = date - Date.now();

  return (
    <div>
      <div className="countdown">
        <Countdown date={Date.now() + difference} daysInHours={false} />
      </div>
      <div className="countdownDescription">
        <div className="description">
          <p>days</p>
          <p>hours</p>
          <p>minutes</p>
          <p>seconds</p>
        </div>
        <p>{`left till ${name}s birthday on ${unixToDate(date)}`}</p>
      </div>
    </div>
  );
};
export default CountDownTimer;
