import React from 'react';

interface ProgressBarProps {
  value: number; // Expect a number between 0 and 1
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  // Convert the value from 0-1 to 0-100 for the width percentage
  const percentage = Math.round(value);

  return (

    <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
            style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

export default ProgressBar;
