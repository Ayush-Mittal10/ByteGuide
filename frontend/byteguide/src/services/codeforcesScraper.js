import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export default async function codeforcesScraper(username) {
  try {
    const proxyUrl = process.env.PROXY_URL;
    const response = await axios.get(`${proxyUrl}https://codeforces.com/profile/${username}`);
    const parser = new DOMParser();
    const doc = parser.parseFromString(response.data, 'text/html');

    const allTimeSolved = doc.querySelector('._UserActivityFrame_countersRow ._UserActivityFrame_counter:nth-of-type(1) ._UserActivityFrame_counterValue').textContent.trim();
    const yearlySolved = doc.querySelector('._UserActivityFrame_countersRow ._UserActivityFrame_counter:nth-of-type(2) ._UserActivityFrame_counterValue').textContent.trim();
    const monthlySolved = doc.querySelector('._UserActivityFrame_countersRow ._UserActivityFrame_counter:nth-of-type(3) ._UserActivityFrame_counterValue').textContent.trim();

    const maxStreak = doc.querySelector('._UserActivityFrame_countersRow:nth-of-type(2) ._UserActivityFrame_counter:nth-of-type(1) ._UserActivityFrame_counterValue').textContent.trim();
    const yearlyStreak = doc.querySelector('._UserActivityFrame_countersRow:nth-of-type(2) ._UserActivityFrame_counter:nth-of-type(2) ._UserActivityFrame_counterValue').textContent.trim();
    const monthlyStreak = doc.querySelector('._UserActivityFrame_countersRow:nth-of-type(2) ._UserActivityFrame_counter:nth-of-type(3) ._UserActivityFrame_counterValue').textContent.trim();

    const rating = doc.querySelector('.info .user-rank span').textContent.trim();
    const contestRating = doc.querySelector('.info ul li span.user-4000').textContent.trim();

    return {
      problemsSolved: {
        allTime: allTimeSolved,
        yearly: yearlySolved,
        monthly: monthlySolved
      },
      activityStreak: {
        max: maxStreak,
        yearly: yearlyStreak,
        monthly: monthlyStreak
      },
      rating: {
        userRank: rating,
        contestRating: contestRating
      }
    };
  } catch (error) {
    console.error('Error scraping Codeforces profile:', error);
    return null;
  }
}
