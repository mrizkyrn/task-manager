import axios from 'axios';

const api = axios.create({
   baseURL: 'http://localhost:3000/api/tasks',
   withCredentials: true,
});

export const getUserTasks = async () => {
   try {
      const response = await api.get('/');
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const getTaskById = async (id) => {
   try {
      const response = await api.get(`/${id}`);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const createTask = async (task) => {
   try {
      const response = await api.post('/', task);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const updateTask = async (id, task) => {
   try {
      const response = await api.put(`/${id}`, task);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const deleteTask = async (id) => {
   try {
      const response = await api.delete(`/${id}`);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const updateTaskStatus = async (id, completed) => {
   try {
      const response = await api.patch(`/${id}`, { completed });
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const getAllCollaboratorUsers = async (id) => {
   try {
      const response = await api.get(`/${id}/users`);
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const addUserToCollaborators = async (id, userId) => {
   try {
      const response = await api.post(`/${id}/users`, { userId });
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};

export const removeUserFromCollaborators = async (id, userId) => {
   try {
      const response = await api.delete(`/${id}/users`, { data: { userId } });
      return response.data;
   } catch (error) {
      return error.response.data;
   }
};