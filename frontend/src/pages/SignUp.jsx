import { useState } from 'react';

const SignUp = () => {
   const [formData, setFormData] = useState({});

   const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData);
   };

   return (
      <div className="w-full h-screen flex flex-col justify-center items-center gap-10">
         <h1 className="text-3xl font-bold ">Sign Up</h1>
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
               <input
                  className="w-full border-2 border-gray-300 rounded-md px-3 py-1"
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleChange}
               />
               <button
                  className="w-full border-2 border-gray-300 rounded-md p-2 bg-blue-500 text-white font-bold"
                  type="submit"
               >
                  Sign Up
               </button>
            </form>
            <div className="mt-5">
               <span>Already have an </span>
               <a className="text-blue-500 font-bold" href="/signin">
                  Sign In
               </a>
            </div>
         </div>
      </div>
   );
};

export default SignUp;
