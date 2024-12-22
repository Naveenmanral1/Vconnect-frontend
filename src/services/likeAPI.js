import api from "./api";

export const togglePostLikeAPI = async(postId) => {
    try {
       const response = await api.post(`/likes/toggle/${postId}`);
       return response.data.data;
    } catch (error) {
       console.error("Error in getting post likes:", error.response?.data || error.message);
       throw error;
    }
   };


export const fetchLikesAPI = async(postId) => {
      try {
         const response = await api.get(`/likes/${postId}/likes`);
         return response.data.data;
      } catch (error) {
         console.error("Error fetching likes : ",error);
      }
   }