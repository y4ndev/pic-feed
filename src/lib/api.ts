import axios from 'axios';

const API_URL = 'http://localhost:1337/api'; // Замените на ваш URL Strapi

//REGISTER
export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await axios.post(`${API_URL}/auth/local/register`, {
    username,
    email,
    password,
  });
  return response.data;
};
//LOGIN
export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/local`, {
    identifier: email,
    password,
  });
  return response.data;
};
