import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../redux/user/userSlice';
import { Link } from 'react-router-dom';

const SignUp = () => {
   const [formData, setFormData] = useState({});
   const { loading, error } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (formData.password !== formData.confirmPassword) {
         dispatch(signupFailure('Passwords do not match.'));
         return;
      }

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
            dispatch(signupFailure(data.message));
            return;
         }

         dispatch(signupSuccess(data.user));
      } catch (err) {
         console.log(err);
         dispatch(signupFailure('Something went wrong. Please try again later.'));
      }
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
               placeholder="Username"
               onChange={handleChange}
            />
            <input
               className="w-full px-5 py-3 rounded-md border-gray-300 bg-[#212e42] text-gray-200"
               type="password"
               name="password"
               id="password"
               placeholder="Password"
               onChange={handleChange}
            />
            <input
               className="w-full px-5 py-3 rounded-md border-gray-300 bg-[#212e42] text-gray-200"
               type="password"
               name="confirmPassword"
               id="confirmPassword"
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
            <span className='text-light'>Already have an account? </span>
            <Link className="text-sky-600 font-bold" to="/signin">
               Sign In
            </Link>
         </div>

         {error && <p className="text-red-700 mt-5 font-medium">{error}</p>}
      </div>
   );
};

export default SignUp;
