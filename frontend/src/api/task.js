import axios from 'axios';

const api = axios.create({
   baseURL: 'https://task-manager-api-v1.vercel.app/api/tasks',
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

export const addUserToAssignees = async (id, assignee) => {
   try {
      const response = await api.post(`/${id}/users`, assignee);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const removeUserFromAssginees = async (id, assigneeId) => {
   try {
      const response = await api.delete(`/${id}/users`, { data: { assigneeId } });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const getUserTaskRole = async (id) => {
   try {
      const response = await api.get(`/${id}/users/role`);
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const changeAssigneeRole = async (id, userId, role) => {
   try {
      const response = await api.patch(`/${id}/users/role`, { userId, role });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};

export const changeTaskImportance = async (id, importance) => {
   try {
      const response = await api.patch(`/${id}/importance`, { importance });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.log(error.response.data);
      return error.response.data;
   }
};
