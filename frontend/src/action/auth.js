import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const register = async (user) =>
  await axios.post(`${API_URL}/user/register`, user);

export const login = async (user) =>
  await axios.post(`${API_URL}/user/login`, user);
