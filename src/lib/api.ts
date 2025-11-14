import axios from 'axios';

const API_URL = 'http://localhost:1337/api';

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

//AVATAR
export const uploadAvatar = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append('files', file);

  const uploadRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (!uploadRes.ok) throw new Error('Ошибка загрузки файла');

  const uploadedFiles = await uploadRes.json();
  return uploadedFiles[0].id; // ID загруженного файла
};

//UPDATE AVATAR
export const updateUserAvatar = async (
  userId: number,
  avatarId: number,
  token: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: avatarId,
      }),
    }
  );

  if (!res.ok) throw new Error('Ошибка обновления аватара');

  return await res.json();
};

//UPDATENAME
export async function updateUserName(
  userId: number,
  newName: string,
  token: string | null
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/${userId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ username: newName }),
    }
  );

  return res.json();
}

//UPDATEPASSWORD
export async function updatePassword(
  currentPassword: string,
  newPassword: string,
  token: string
) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change-password`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword,
        password: newPassword,
        passwordConfirmation: newPassword,
      }),
    }
  );

  return res.json();
}
