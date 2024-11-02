import { fetchRecommendations } from '../services/recommendations.js';

export async function getRecommendations(req, res) {
    try {
        const userData = req.body;
        console.log("User data:", userData);
        const recommendations = await fetchRecommendations(userData);
        console.log("Recommendations:", recommendations);
        
        res.json(recommendations);
    } catch (error) {
        console.error("Error fetching recommendations:", error);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
}
