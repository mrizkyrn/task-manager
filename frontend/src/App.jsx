import { useState } from 'react';

const App = () => {
   const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const onSubmit = async (event) => {
    console.log('onSubmit');
      event.preventDefault();

      const response = await fetch('http://localhost:3000/api/auth/signup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      console.log(data);
   }

   return (
      <form action="" method="POST" onSubmit={onSubmit}>
         <label htmlFor="username">username</label>
         <input type="text" name="username" id="username" onChange={(event) => setUsername(event.target.value)} />
         <label htmlFor="password">Password</label>
         <input type="password" name="password" id="password" onChange={(event) => setPassword(event.target.value)} />
         <button type="submit">Submit</button>
      </form>
   );
};

export default App;
