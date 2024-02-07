import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000/api/users',
   withCredentials: true,
});

export const searchUserByUsername = async (username) => {
   try {
      const response = await api.get(`/search?username=${username}`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
}

export const changeUsername = async (id, username) => {
   try {
      const response = await api.patch(`/${id}/username`, { username });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const changeAvatar = async (id, avatar) => {
   try {
      const response = await api.patch(`/${id}/avatar`, { avatar });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const deleteUser = async () => {
   try {
      const response = await api.delete('/');
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};
