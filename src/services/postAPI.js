import api from "./api";

export const createPostAPI = async(postData) => {
 try {
    const response = await api.post('/posts',postData);
    return response.data;
 } catch (error) {
    console.error("Error in creating post:", error.response?.data || error.message);
    throw error;
 }
};

export const updatePostAPI = async({_id,updateData}) => {
 try {
   const response = await api.patch(`/posts/${_id}`,updateData);
    return response.data;
 } catch (error) {
    console.error("Error in updating post:", error.response?.data || error.message);
    throw error;
 }
};

export const deletePostAPI = async(_id) => {
 try {
    const response = await api.delete(`/posts/${_id}`);
    return response.data.data;
 } catch (error) {
    console.error("Error in deleting post:", error.response?.data || error.message);
    throw error;
 }
};

export const getAllPostAPI = async(queryParams) => {
 try {
    const response = await api.get('/posts/',{params : queryParams});
    return response.data.data;
 } catch (error) {
    console.error("Error in getting all post:", error.response?.data || error.message);
    throw error;
 }
};

export const getPostByIdAPI = async(_id) => {
 try {
    const response = await api.get(`/posts/${_id}`);
    return response.data.data;
 } catch (error) {
    console.error("Error in getting post by id :", error.response?.data || error.message);
    throw error;
 }
};


export const getPostByFollowedUserAPI = async(queryParams) => {
  try {
    const response = await api.get('/posts/following-posts',{params : queryParams});
    return response.data.data;
  } catch (error) {
   console.error("Error in getting post by following user ", error.response?.data || error.message);
   throw error;
  }
}


