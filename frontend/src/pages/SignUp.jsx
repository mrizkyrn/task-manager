import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

const SignUp = () => {
   const [formData, setFormData] = useState({
      username: '',
      password: '',
      confirmPassword: '',
   });
   const { loading, error } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) return;

      try {
         dispatch(signupStart());

         const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });
         const data = await response.json();

         if (!data.success) {
            onSignupFailure(data.message);
            return;
         }

         onSignupSuccess();
      } catch (err) {
         console.log(err);
         dispatch(signupFailure('Something went wrong. Please try again later.'));
      }
   };

   const onSignupSuccess = () => {
      dispatch(signupSuccess());

      // set the form data to empty
      setFormData({
         username: '',
         password: '',
         confirmPassword: '',
      });

      // show the success toast
      toast.success('Sign up successful!, Please sign in.');
   };

   const onSignupFailure = (message) => {
      dispatch(signupFailure(message));
      toast.error(message);
   }

   const validateForm = () => {
      // check if the username is empty
      if (!formData.username) {
         dispatch(signupFailure('Username cannot be empty.'));
         return false;
      }

      // check if the password is empty
      if (!formData.password) {
         dispatch(signupFailure('Password cannot be empty.'));
         return false;
      }

      // check if the confirm password is empty
      if (!formData.confirmPassword) {
         dispatch(signupFailure('Confirm Password cannot be empty.'));
         return false;
      }

      // check if the username is less than 3 characters
      if (formData.username.length < 3) {
         dispatch(signupFailure('Username must be at least 3 characters long.'));
         return false;
      }

      // check if the password is less than 3 characters
      if (formData.password.length < 3) {
         dispatch(signupFailure('Password must be at least 3 characters long.'));
         return false;
      }

      // check if password and confirm password match
      if (formData.password !== formData.confirmPassword) {
         dispatch(signupFailure('Passwords do not match.'));
         return false;
      }

      return true;
   };

   return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-10 px-7 bg-semiDark">
         <h1 className="text-3xl font-bold text-light">Sign Up</h1>
         <form
            className="w-64 sm:w-72 flex flex-col justify-start items-center gap-5"
            action=""
            method="post"
            onSubmit={handleSubmit}
         >
            <input
               className="w-full px-5 py-3 rounded-md border-gray-300 bg-[#212e42] text-gray-200"
               type="text"
               name="username"
               id="username"
               value={formData.username}
               placeholder="Username"
               autoComplete="off"
               onChange={handleChange}
            />
            <input
               className="w-full px-5 py-3 rounded-md border-gray-300 bg-[#212e42] text-gray-200"
               type="password"
               name="password"
               id="password"
               value={formData.password}
               placeholder="Password"
               onChange={handleChange}
            />
            <input
               className="w-full px-5 py-3 rounded-md border-gray-300 bg-[#212e42] text-gray-200"
               type="password"
               name="confirmPassword"
               id="confirmPassword"
               value={formData.confirmPassword}
               placeholder="Confirm Password"
               onChange={handleChange}
            />
            <button
               className="w-full bg-[#415c8a] hover:bg-[#2d4369] px-5 py-2 rounded-md text-white font-semibold mt-5"
               type="submit"
               disabled={loading}
            >
               {loading ? 'Loading...' : 'Sign Up'}
            </button>
         </form>
         <div className="mt-5">
            <span className="text-light">Already have an account? </span>
            <Link className="text-sky-600 font-bold" to="/signin">
               Sign In
            </Link>
         </div>

         {error && <p className="text-red-700 mt-5 font-medium">{error}</p>}

         <ToastContainer />
      </div>
   );
};

export default SignUp;
