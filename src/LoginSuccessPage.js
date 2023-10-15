import React from 'react';

function LoginSuccessPage() {
  return (
    <div className="thank-you-page">
      <h2>Thank You for Logging In!</h2>
      <p>
            {/* By submitting this form, you agree to our{' '} */}
            <a href={'https://www.google.com'} target="_blank" rel="noopener noreferrer">
              Open https://www.google.com
            </a>
      </p>
    </div>
  );
}

export default LoginSuccessPage;
