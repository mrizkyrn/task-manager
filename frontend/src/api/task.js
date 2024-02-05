import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000/api/tasks',
   withCredentials: true,
});

export const getUserTasks = async () => {
   try {
      const response = await api.get('/');
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const getTaskById = async (id) => {
   try {
      const response = await api.get(`/${id}`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const createTask = async (task) => {
   try {
      const response = await api.post('/', task);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const updateTask = async (id, task) => {
   try {
      const response = await api.put(`/${id}`, task);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const deleteTask = async (id) => {
   try {
      const response = await api.delete(`/${id}`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const updateTaskStatus = async (id, status) => {
   try {
      const response = await api.patch(`/${id}`, { status });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const getAllAssignedUsers = async (id) => {
   try {
      const response = await api.get(`/${id}/users`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const addUserToAssignees = async (id, user) => {
   try {
      const response = await api.post(`/${id}/users`, user);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const removeUserFromAssginees = async (id, removedUserId) => {
   try {
      const response = await api.delete(`/${id}/users`, { data: { removedUserId } });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};
