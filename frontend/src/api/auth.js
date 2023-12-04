import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000/api/auth',
   withCredentials: true,
});

export const signup = async (username, password) => {
   try {
      const response = await api.post('/signup', { username, password });
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const signin = async (username, password) => {
   try {
      const response = await api.post('/signin', { username, password });
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const signout = async () => {
   try {
      const response = await api.post('/signout');
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};
