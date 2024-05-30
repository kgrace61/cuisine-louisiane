import React from 'react';
import LoginSignup from '../components/LoginSignup';
import { useLocation } from 'react-router-dom';

// SignIn functional component that takes updateUser function as a prop
function SignIn({ updateUser }) {
  const location = useLocation();
  const initialMenu = location.state?.menu || {};

  // Render method returns JSX to be displayed in the UI
  return (
    <div className="mt-[2in]">
      {/* LoginSignup component which handles user login or signup
          It receives updateUser as a prop to update the user state in the parent component */}
      <LoginSignup updateUser={updateUser} initialMenu={initialMenu} />
    </div>
  );
}

export default SignIn;