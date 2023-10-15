import React from 'react';

function ThankYou() {
  return (
    <div>
      <h2>Thank you for your information!</h2>
      <p>Your data has been submitted successfully.</p>
      <p>
            {/* By submitting this form, you agree to our{' '} */}
            <a href={'https://www.google.com'} target="_blank" rel="noopener noreferrer">
              Open https://www.google.com
            </a>
      </p>
    </div>
  );
}

export default ThankYou;