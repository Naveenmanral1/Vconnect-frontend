import api from "./api";

export const toggleFollowAPI = async(pageId) => {
    try {
       const response = await api.post(`/follows/${pageId}`);
       return response.data.data.followed;
    } catch (error) {
       console.error( error.response?.data || error.message);
       throw error;
    }
};


export const getUserPageFollowerAPI = async(pageId) => {
    try {
       const response = await api.get(`/follows/${pageId}`);
       return response.data.data;
    } catch (error) {
       console.error( error.response?.data || error.message);
       throw error;
    }
};

export const getFollowedPagesAPI = async(followerId) => {
    try {
       const response = await api.get(`/follows/${followerId}/following`);
       return response.data.data;
    } catch (error) {
       console.error( error.response?.data || error.message);
       throw error;
    }
};


