import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000/api/users',
   withCredentials: true,
});

export const changeUsername = async (id, username) => {
   try {
      const response = await api.patch(`/${id}/username`, { username });
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const changeAvatar = async (id, avatar) => {
   try {
      const response = await api.patch(`/${id}/avatar`, { avatar });
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const deleteUser = async () => {
   try {
      const response = await api.delete('/');
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};
