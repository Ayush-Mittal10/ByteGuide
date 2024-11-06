import puppeteer from 'puppeteer';

export async function getCodeforcesProfile(req, res) {

    const username = req.params.username;
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto(`https://codeforces.com/profile/${username}`, {
            waitUntil: 'networkidle2'
        });

        const profileData = await page.evaluate(() => {
        const problemsSolved = document.querySelectorAll('._UserActivityFrame_counterValue');
        const rating = document.querySelector('.user-rank span') ? document.querySelector('.user-rank span').textContent : null;
        const contestRating = document.querySelector('li:nth-child(1) span[style="font-weight:bold;"]') ? document.querySelector('li:nth-child(1) span[style="font-weight:bold;"]').textContent : null;
            
        return {
            problemsSolvedAllTime: problemsSolved[0]?.textContent || null,
            problemsSolvedYear: problemsSolved[1]?.textContent || null,
            problemsSolvedMonth: problemsSolved[2]?.textContent || null,
            rating: rating,
            contestRating: contestRating
            };
        });

        await browser.close();
        res.json(profileData);

    } catch (error) {
        console.error('Error fetching profile data:', error);
        res.status(500).json({ error: 'Failed to fetch profile data' });
    }
};