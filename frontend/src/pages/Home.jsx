import Container from '../component/layouts/Container';

const Home = () => {
   return (
      <Container>
         <h1 className="text-2xl md:text-3xl font-bold text-gray-200">Welcome to Task Manager</h1>

         <p className="text-sm md:text-base text-gray-400 mt-10">
            To get started, click on the <span className="font-bold">Tasks</span> link in the navbar.
         </p>
      </Container>
   );
};

export default Home;
