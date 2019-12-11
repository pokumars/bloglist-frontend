import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken= (newToken) => {
  token =`bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getBlog = async (id) => { 
  const response = await axios.get(`${baseUrl}/${id}`);
  console.log(response.data);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  //console.log('token', token);

  const response = await axios.post(baseUrl, newBlog, config);
  console.log('response from create', response.data);
  return response.data;
};

const update = async (blogToUpdate) => {
  /*The extra fetch is needed to get the modified .user value of the blog obj to 
  display who added it and if the delete button should be rendered*/

  return axios.put(`${baseUrl}/${blogToUpdate._id? blogToUpdate._id: blogToUpdate.id}`, blogToUpdate)
    .then((res) => {
      console.log('res in update service',res);
      return getBlog(`${res.data._id? res.data._id: res.data.id}`);
    })
    .catch((err) => console.log(err));


  //const response = await axios.put(`${baseUrl}/${blogToUpdate._id? blogToUpdate._id: blogToUpdate.id}`, blogToUpdate);
  //const returnVal = await getBlog(`${blogToUpdate._id? blogToUpdate._id: blogToUpdate.id}`);
  //return returnVal;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  };
  console.log('delete request token', token);
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  console.log('delete request response', response);
  return response;
};



export default { getAll, setToken, create, update, deleteBlog, getBlog };