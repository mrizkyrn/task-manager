import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signinStart, signinSuccess, signinFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../component/Button';

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
      <div className="w-full h-screen flex flex-col justify-center items-center gap-10 px-7 bg-semiDark">
         <h1 className="text-3xl font-bold text-light">Sign In</h1>
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
               autoComplete="off"
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
            <Button className="w-full" type="submit" disabled={loading}>
               {loading ? 'Loading...' : 'Sign In'}
            </Button>
         </form>
         <div className="mt-5">
            <span className="text-light">Don&apos;t have an account? </span>
            <Link className="text-sky-600 font-bold" to="/signup">
               Sign Up
            </Link>
         </div>

         {error && <p className="text-red-700 mt-5 font-medium">{error}</p>}
      </div>
   );
};

export default SignIn;
