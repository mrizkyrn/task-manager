import axios from 'axios';

const api = axios.create({
   baseURL: 'https://task-manager-api-v1.vercel.app/api/auth',
   withCredentials: true,
});

export const signup = async (username, password) => {
   try {
      const response = await api.post('/signup', { username, password });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const signin = async (username, password) => {
   try {
      const response = await api.post('/signin', { username, password });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const signout = async () => {
   try {
      const response = await api.post('/signout');
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};
