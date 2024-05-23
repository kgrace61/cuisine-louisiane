import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Validation schemas for user, login, and signup forms
const userSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

// Main component for login and signup functionality
const LoginSignup = ({ updateUser, user }) => {
  // State to toggle between login and signup forms
  const [isSignup, setIsSignup] = useState(false);

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = (values) => {
    // Determine the URL based on whether the user is signing up or logging in
    const url = isSignup ? 'http://localhost:5555/users' : 'http://localhost:5555/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.email.toLowerCase(), // Convert email to lowercase to ensure case-insensitivity
        password: values.password,
      }),
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.error('Error');
        }
      })
      .then(data => {
        updateUser(data); // Update user state with response data
        console.log('Success:', data);
        navigate('/', { replace: true }); // Navigate to home page on successful login/signup
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      {/* Button to toggle between login and signup forms */}
      <button
        onClick={() => setIsSignup(!isSignup)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Switch to {isSignup ? 'Login' : 'Signup'}
      </button>
      {/* Formik form for handling login/signup */}
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={isSignup ? SignupSchema : LoginSchema} // Choose the correct validation schema
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Field
                name="email"
                type="email"
                placeholder="Email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs italic" />
            </div>
            <div className="mb-6">
              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs italic" />
            </div>
            {/* Submit button, disabled while submitting */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                disabled={isSubmitting}
              >
                {isSignup ? 'Sign Up' : 'Log In'}
              </button>
              {isSubmitting && <p className="text-gray-500 text-xs italic">Loading...</p>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginSignup;