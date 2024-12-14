import axios from 'axios';

const fetchAllCodingProfiles = async (usernames) => {
  try {
    const userData = JSON.parse(localStorage.getItem('userData')) || {};

    if (usernames.Codeforces) {
      const codeforcesData = await axios.get(`http://localhost:4000/api/profiles/codeforces-profile/${usernames.Codeforces}`);
      userData.codeforcesStats = codeforcesData.data;
    }

    if (usernames.LeetCode) {
      const leetCodeData = await axios.get(`http://localhost:4000/api/profiles/leetcode-profile/${usernames.leetcode}`);
      userData.leetCodeStats = leetCodeData.data;
    }

    localStorage.setItem('userData', JSON.stringify(userData));
  } catch (error) {
    console.error("Error fetching coding profile data:", error);
  }
};

export default fetchAllCodingProfiles;