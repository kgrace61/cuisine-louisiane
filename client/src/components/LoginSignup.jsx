import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom';

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

const LoginSignup = ({ updateUser, user }) => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  const initialMenu = location.state?.menu || {};

  const handleSubmit = (values) => {
    const url = isSignup ? 'http://localhost:5555/users' : 'http://localhost:5555/login';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: values.email.toLowerCase(),
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
        updateUser(data);
        console.log('Success:', data);
        localStorage.setItem('user', JSON.stringify(data));
        navigate(from, { replace: true, state: { menu: initialMenu } });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      updateUser(JSON.parse(storedUser));
    }
  }, [updateUser]);

  return (
    <div className="container mx-auto p-4 max-w-md">
      <button
        onClick={() => setIsSignup(!isSignup)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Switch to {isSignup ? 'Login' : 'Signup'}
      </button>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={isSignup ? SignupSchema : LoginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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