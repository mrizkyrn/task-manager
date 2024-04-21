import axios from 'axios';

const api = axios.create({
   baseURL: 'https://task-manager-api-v1.vercel.app/api/bugs',
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
