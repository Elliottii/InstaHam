import {useState, useEffect} from 'react';

const baseUrl = 'http://media.mw.metropolia.fi/wbma/';

const useAllMedia = () => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'tags/mpjakk');
    const json = await response.json();
    const items = await Promise.all(json.map(async (item) => {
      const response = await fetch(baseUrl + 'media/' + item.file_id);
      return await response.json();
    }));
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return data;
};

const useSingleMedia = (id) => {
  const [data, setData] = useState(null);
  const fetchUrl = async (fileid) => {
    const response = await fetch(baseUrl + 'media/' + fileid);
    const item = await response.json();
    if (localStorage.getItem('token') !== null) {
      const userResponse = await getUser(item.user_id,
        localStorage.getItem('token'));
      item.user = userResponse;
    }
    setData(item);
  };

  useEffect(() => {
    fetchUrl(id);
  }, [id]);

  return data;
};

const getAvatarImage = async (id) => {
  const response = await fetch(baseUrl + 'tags/avatar_' + id);
  return await response.json();
};

const register = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const login = async (inputs) => {
  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'login', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkUserAvailable = async (name) => {
  try {
    const response = await fetch(baseUrl + 'users/username/' + name);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const checkToken = async (token) => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'users/user', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const updateProfile = async (inputs, token) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'users', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

// eslint-disable-next-line camelcase
const addTag = async (file_id, tag, token) => {
  const tagOptions = {
    method: 'POST',
    body: JSON.stringify({
      file_id,
      tag,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  try {
    const tagResponse = await fetch(baseUrl + 'tags', tagOptions);
    const tagJson = await tagResponse.json();
    return tagJson;
  } catch (e) {
    throw new Error(e.message);
  }
};

const upload = async (inputs, token) => {
  const fd = new FormData();
  fd.append('title', inputs.title);
  fd.append('description', inputs.description);
  fd.append('file', inputs.file);

  const fetchOptions = {
    method: 'POST',
    body: fd,
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'media', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    const tagJson = addTag(json.file_id, 'mpjakk', token);
    return {json, tagJson};
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUser = async (id, token) => {
  const fetchOptions = {
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'users/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteFile = async (id) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(baseUrl + 'media/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const modifyFile = async (inputs, id) => {
  const fetchOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
    body: JSON.stringify(inputs),
  };
  try {
    const response = await fetch(baseUrl + 'media/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const useComments = (id) => {
  const [data, setData] = useState([]);
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'comments/file/' + id);
    const json = await response.json();
    setData(json);
  };

  useEffect(() => {
    fetchUrl(id);
    // eslint-disable-next-line
  }, [id]);

  return data;
};

const addComment = async (file_id, comment, token) => {

  const data = {
    'file_id': file_id,
    'comment': comment,
  };

  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'comments/', fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteComment = async (id) => {
  const fetchOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(baseUrl + 'comments/' + id, fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const uploadAvatar = async (inputs, token, user_id) => {
  const fd = new FormData();
  fd.append('file', inputs.file);
  const fetchOptions = {
    method: 'POST',
    body: fd,
    headers: {
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'media', fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    const tagJson = addTag(json.file_id, 'avatar_' + user_id, token);
    return {json, tagJson};
  } catch (e) {
    throw new Error(e.message);
  }
};

const useFavouritesMedia = () => {
  const [data, setData] = useState([]);
  const fetchOptions = {
    headers: {
      'x-access-token': localStorage.getItem('token'),
    },
  };
  const fetchUrl = async () => {
    const response = await fetch(baseUrl + 'favourites/', fetchOptions);
    const json = await response.json();
    const items = await Promise.all(json.map(async (item) => {
      const response = await fetch(baseUrl + 'media/' + item.file_id);
      return await response.json();
    }));
    setData(items);
  };

  useEffect(() => {
    fetchUrl();
    // eslint-disable-next-line
  }, []);

  return data;
};

const useSingleFavourites = (id) => {
  const [data, setData] = useState([]);
  const fetchUrl = async (fileid) => {
    const response = await fetch(baseUrl + 'favourites/file/' + fileid);
    const item = await response.json();
    setData(item);
  };

  useEffect(() => {
    fetchUrl(id);
  }, [id]);

  return data;
};

const addFavouritesMedia = async (file_id, token) => {

  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({
      'file_id': file_id,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'favourites/', fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteFavouritesMedia = async (file_id, token) => {
  const fetchOptions = {
    method: 'DELETE',
    body: JSON.stringify({
      'file_id': file_id,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(baseUrl + 'favourites/file/' + file_id,
      fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const useLike = (id) => {
  const [data, setData] = useState([]);
  const fetchUrl = async (fileid) => {
    const response = await fetch(baseUrl + 'ratings/file/' + fileid);
    const item = await response.json();
    setData(item);
  };

  useEffect(() => {
    fetchUrl(id);
  }, [id]);

  return data;
};

const addLike = async (file_id, rating, token) => {

  const fetchOptions = {
    method: 'POST',
    body: JSON.stringify({
      'file_id': file_id,
      'rating': rating,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  };
  try {
    const response = await fetch(baseUrl + 'ratings/', fetchOptions);
    const json = await response.json();
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

const deleteLike = async (file_id, token) => {
  const fetchOptions = {
    method: 'DELETE',
    body: JSON.stringify({
      'file_id': file_id,
    }),
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': localStorage.getItem('token'),
    },
  };
  try {
    const response = await fetch(baseUrl + 'ratings/file/' + file_id,
      fetchOptions);
    const json = await response.json();
    if (!response.ok) throw new Error(json.message + ': ' + json.error);
    return json;
  } catch (e) {
    throw new Error(e.message);
  }
};

export {
  useAllMedia,
  useSingleMedia,
  register,
  login,
  checkUserAvailable,
  checkToken,
  getAvatarImage,
  updateProfile,
  upload,
  addTag,
  getUser,
  deleteFile,
  modifyFile,
  useComments,
  addComment,
  deleteComment,
  uploadAvatar,
  useFavouritesMedia,
  useSingleFavourites,
  addFavouritesMedia,
  deleteFavouritesMedia,
  useLike,
  addLike,
  deleteLike,
};
