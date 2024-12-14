import axios from 'axios';

export const submitOnboardingData = async (userData) => {
    try {
        console.log("User data:", userData);
        const response = await axios.post('http://localhost:4000/api/recommendations/get-recommendations', userData);
        return response.data;
        
    } catch (error) {
        console.error("Failed to fetch recommendations:", error);
    }
};
