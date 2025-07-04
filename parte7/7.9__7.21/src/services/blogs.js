import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const createComment = async (blogId, newCommentObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(`${baseUrl}/comments/${blogId}`, newCommentObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response;
};

const updateLikes = async (id, newObject) => {
  
  const objectUpdated = { ...newObject, likes: newObject.likes + 1 };
  const response = await axios.put(`${ baseUrl }/${id}`, objectUpdated)
  return response.data
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};

export default { setToken, getAll, create, update, updateLikes, deleteBlog, createComment };
