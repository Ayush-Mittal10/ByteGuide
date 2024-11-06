import { launch } from 'puppeteer';

export async function getLeetcodeProfile(username) {
  const url = `https://leetcode.com/u/${username}`;
  
  try {
    const browser = await launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    await page.goto(url, { waitUntil: 'networkidle2' });

    const data = await page.evaluate(() => {
        const getTextContent = (selector) => document.querySelector(selector)?.textContent?.trim() || null;
        const getContestRating = () => {
          const contestDiv = document.querySelector(".flex.w-full .text-2xl");
          return contestDiv ? contestDiv.textContent.trim() : null;
        };
        const getGlobalRanking = () => {
          const rankingDiv = document.querySelector(".text-label-1.font-medium.leading-\\[22px\\]");
          if (rankingDiv) {
            const [rank, total] = rankingDiv.textContent.trim().split('/');
            return { rank: rank.trim(), total: total.trim() };
          }
          return null;
        };
        const getDifficultyCount = (level) => {
          const difficultyDiv = document.querySelector(`.text-sd-${level}`);
          return difficultyDiv ? difficultyDiv.nextElementSibling.textContent.trim() : null;
        };

        return {
            contestRating: getContestRating(),
            level: getTextContent(".text-sm.leading-\\[22px\\].text-blue-s"),
            globalRanking: getGlobalRanking(),
            attendedContests: getTextContent(".hidden.md\\:block .font-medium.leading-\\[22px\\]"),
            topPercentage: getTextContent(".relative.min-h-\\[49px\\] .text-2xl"),
            problemsSolved: getTextContent(".text-\\[30px\\].font-semibold.leading-\\[32px\\]"),
            difficultyCounts: {
              easy: getDifficultyCount("easy"),
              medium: getDifficultyCount("medium"),
              hard: getDifficultyCount("hard"),
            }
          };
        });
      
        await browser.close();
        return data;
      }
    catch (error) {
    console.error('Error scraping Leetcode profile:', error);
  }
};