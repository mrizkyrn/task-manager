import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000/api/bugs',
   withCredentials: true,
});

export const postBug = async (bug) => {
   try {
      const response = await api.post('/', bug);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};
