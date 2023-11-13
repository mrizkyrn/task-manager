import { useEffect } from 'react';
import Container from '../component/Container';

const Home = () => {
   useEffect(() => {
      fetch('http://localhost:3000/api/tasks', {
         method: 'GET',
         credentials: 'include',
      })
         .then((res) => res.json())
         .then((data) => console.log(data));
   }, []);
   return (
      <Container>
         <div>Home</div>
      </Container>
   );
};

export default Home;
