import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken= (newToken) => {
  token =`bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  };
  console.log('token', token);

  const response = await axios.post(baseUrl, newBlog, config);
  console.log('response from create', response.data);
  return response.data;
}

export default { getAll, setToken, create }