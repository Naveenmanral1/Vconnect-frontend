import api from "./api";

export const createProfileAPI = async(profileData) => {
    try {
        const response = await api.post('/profiles' , profileData);
        return response.data;
    } catch (error) {
        console.error("Error in creating profile :", error.response?.data || error.message);
        throw error;
    }
};

export const createAvatarAPI = async(avatar) => {
    try {
        const response = await api.post('/profiles' , avatar);
        return response.data;
    } catch (error) {
        console.error("Error in creating avatar :", error.response?.data || error.message);
        throw error;
    }
};

export const createCoverAPI = async(cover) => {
    try {
        const response = await api.post('/profiles' , cover);
        return response.data;
    } catch (error) {
        console.error("Error in creating cover :", error.response?.data || error.message);
        throw error;
    }
};

export const updateProfileAPI = async(_id,updateData) => {
    try {
        const response = await api.patch(`/profiles/${_id}` , updateData);
        return response.data;
    } catch (error) {
        console.error("Error in updating profile :", error.response?.data || error.message);
        throw error;
    }
};

export const updateAvatarAPI = async(_id,updateAvatarImage) => {
    try {
        const response = await api.patch(`/profiles/${_id}` , updateAvatarImage);
        return response.data;
    } catch (error) {
        console.error("Error in updating Avatar :", error.response?.data || error.message);
        throw error;
    }
};

export const updateCoverAPI = async(_id,updateCoverImage) => {
    try {
        const response = await api.patch(`/profiles/${_id}` , updateCoverImage);
        return response.data;
    } catch (error) {
        console.error("Error in updating Cover :", error.response?.data || error.message);
        throw error;
    }
};

export const getProfileByIdAPI = async(_id ) => {
    try {
        const response = await api.get(`/profiles/${_id}`);
        return response.data.data;
    } catch (error) {
        console.error("Error in getting profile :", error.response?.data?.message || error.message);
        throw error;
    }
};