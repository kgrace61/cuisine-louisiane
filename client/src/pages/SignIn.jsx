import React from 'react';
import LoginSignup from '../components/LoginSignup'; 

// SignIn functional component that takes updateUser function as a prop
function SignIn({updateUser}) {
  // Render method returns JSX to be displayed in the UI
  return (
    <div>
      {/* LoginSignup component which handles user login or signup
          It receives updateUser as a prop to update the user state in the parent component */}
      <LoginSignup updateUser={updateUser}/>
    </div>
  );
}
export default SignIn;