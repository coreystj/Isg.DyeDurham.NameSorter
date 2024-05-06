import React, { useState, useEffect } from 'react';

// Define the props type
type CopyToClipboardInputProps = {
  defaultValue: string;
};

// Update the component to accept `CopyToClipboardInputProps`
const CopyToClipboardInput: React.FC<CopyToClipboardInputProps> = ({ defaultValue }) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    // Optionally reset to default value if it changes (consider if needed)
    setInputValue(defaultValue);
  }, [defaultValue]); // Depend on defaultValue to reset it when prop changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(inputValue)
      .then(() => {
        console.log('Text copied to clipboard');
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3000); // Hide the checkmark after 3 seconds
      })
      .catch((error) => {
        console.error('Error copying text to clipboard:', error);
      });
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control bg-dark text-light"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter text here"
      />
      <div className="input-group-append text-light">
        <button
          className={`btn btn-outline-warning ${copied ? 'btn-success' : ''}`}
          type="button"
          onClick={handleCopyToClipboard}
        >
          {copied ? (
            <div className="text-light">
              <span className="mr-1 text-light">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2" viewBox="0 0 16 16">
                  <path d="M5.612 11.354a.5.5 0 0 1-.707 0L2.146 8.5a.5.5 0 1 1 .708-.708L5 10.793l7.646-7.647a.5.5 0 0 1 .708.708l-8 8z"/>
                </svg>
              </span>
              Copied
            </div>
          ) : (
            <>Copy to Clipboard</>
          )}
        </button>
      </div>
    </div>
  );
};

export default CopyToClipboardInput;
