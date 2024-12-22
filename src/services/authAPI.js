import api from "./api";

export const loginUserAPI = async (data) => {
  try {
      const response = await api.post('/users/login', data);
      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem('accessToken', accessToken); 
      localStorage.setItem('refreshToken', refreshToken); 

      return { user, accessToken, refreshToken };  
  } catch (error) {
      console.error("Error during login:", error);
      throw error;  
  }
};


export const signupUserAPI = async(userData) => {
   try {
     const response = await api.post('/users/register',userData);
     return response.data;
   } catch (error) {
    console.error("Error in registering user:", error.response?.data || error.message);
    throw error;
   }
};


export const updatePasswordAPI = async(data) => {
  try {
    const response = await api.patch('/users/update-password',data);
    console.log(response,"response of updating password")
    return response.data;
  } catch (error) {
    console.error("Error in updating password : ",error.response?.data || error.message);
    throw error;
  }
}


export const getCurrentUserAPI = async() => {
 try {
   const response = await api.get("/users/current-user");
   return response.data.data;
   
 } catch (error) {
  console.error("Error in getting current user:", error.response?.data || error.message);
 }
}



export const logoutUserAPI = async () => {
  try {
      const response = await api.post('/users/logout');
       
       localStorage.removeItem('accessToken');
       localStorage.removeItem('refreshToken');

       console.log('User logged out successfully');
  } catch (error) {
    console.error("Logout failed:", error.response || error);
  return { success: false, message: error?.response?.data?.message || 'Logout failed' };
  }
};


export const refreshAccessTokenAPI = async() => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
      throw new Error("No refresh token found.");
      return;
  }
  try {
    const response = await api.post("/users/refresh-token",{refreshToken});
    const { accessToken  ,refreshToken: newRefreshToken} = response.data.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        return { accessToken, newRefreshToken };
  } catch (error) {
    console.error("Error refreshing access token:",error?.response?.data?.error || error.message);
    throw error;
  }
}


