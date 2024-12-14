function getSemesterProgress() {
    const currentMonth = new Date().getMonth() + 1;
    let semester = null;
    let semesterProgress = 0;
  
    if (currentMonth >= 8 && currentMonth <= 12) {
      semester = 'odd';
      semesterProgress = ((currentMonth - 8) / 5) * 100;
    } else if (currentMonth >= 1 && currentMonth <= 5) {
      semester = 'even';
      semesterProgress = ((currentMonth - 1) / 5) * 100;
    }
  
    semesterProgress = Math.min(semesterProgress, 100);
  
    return {
      semester,
      progress: semesterProgress,
    };
  }
  
  function calculateProgress(semesterId) {
    const currentProgress = getSemesterProgress();
  
    const isOddSemester = semesterId % 2 === 1;
    const isCurrentSemesterOdd = currentProgress.semester === 'odd';

    const progress = isOddSemester === isCurrentSemesterOdd
    ? Math.round(currentProgress.progress)
    : 0;

  return progress;
  }
  
  export default calculateProgress;
  