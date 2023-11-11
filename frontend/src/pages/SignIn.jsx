import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const SignIn = () => {
   const [formData, setFormData] = useState({});
   const { loading, error } = useSelector((state) => state.user);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      try {
         dispatch(signinStart());

         const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
         });
         const data = await response.json();

         if (!data.success) {
            dispatch(signinFailure(data.message));
            return;
         }
         
         dispatch(signinSuccess(data.user));
         
         navigate('/');
      } catch (err) {
         console.log(err);
         dispatch(signinFailure('Something went wrong. Please try again later.'));
      }
   };

   return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
         <h1 className="text-3xl font-bold ">Sign In</h1>
         <div>
            <form
               className="flex flex-col justify-start items-center gap-5"
               action=""
               method="post"
               onSubmit={handleSubmit}
            >
               <input
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  onChange={handleChange}
               />
               <input
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={handleChange}
               />
               <button
                  className="w-full border-2 border-gray-300 rounded-md p-2 bg-blue-500 text-white font-bold"
                  type="submit"
                  disabled={loading}
               >
                  {loading ? 'Loading...' : 'Sign In'}
               </button>
            </form>
            <div className="mt-5">
               <span>Don&apos;t have an account? </span>
               <Link className="text-blue-500 font-bold" to="/signup">
                  Sign Up
               </Link>
            </div>

            {error && <p className="text-red-700 mt-5 font-medium">{error}</p>}
         </div>
      </div>
   );
};

export default SignIn;
