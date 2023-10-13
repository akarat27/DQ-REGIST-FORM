import React from 'react';
import { Link } from 'react-router-dom';

function LanguageSwitch() {
  return (
    <div className="language-switch">
      <Link to="/th">ไทย</Link> | <Link to="/en">EN</Link>
    </div>
  );
}

export default LanguageSwitch;