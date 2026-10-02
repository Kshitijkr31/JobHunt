const BOOKMARKS_KEY = "jobhunt_bookmarked_jobs";
const SAVED_JOBS_KEY = "jobhunt_saved_jobs";

const getJobs = (key) => {
  try {
    const jobs = localStorage.getItem(key);
    return jobs ? JSON.parse(jobs) : [];
  } catch (error) {
    console.error("Error reading jobs from localStorage:", error);
    return [];
  }
};

const saveJobs = (key, jobs) => {
  localStorage.setItem(key, JSON.stringify(jobs));

  window.dispatchEvent(
    new CustomEvent("jobhunt-storage-change", {
      detail: {
        key,
        jobs,
      },
    })
  );
};

const toggleJob = (key, job) => {
  if (!job?._id) {
    return false;
  }

  const jobs = getJobs(key);

  const alreadyExists = jobs.some(
    (item) => item?._id === job?._id
  );

  let updatedJobs;

  if (alreadyExists) {
    updatedJobs = jobs.filter(
      (item) => item?._id !== job?._id
    );
  } else {
    updatedJobs = [...jobs, job];
  }

  saveJobs(key, updatedJobs);

  return !alreadyExists;
};

const isJobStored = (key, jobId) => {
  const jobs = getJobs(key);

  return jobs.some(
    (job) => job?._id === jobId
  );
};

export const getBookmarkedJobs = () => {
  return getJobs(BOOKMARKS_KEY);
};

export const getSavedJobs = () => {
  return getJobs(SAVED_JOBS_KEY);
};

export const toggleBookmark = (job) => {
  return toggleJob(BOOKMARKS_KEY, job);
};

export const toggleSavedJob = (job) => {
  return toggleJob(SAVED_JOBS_KEY, job);
};

export const isBookmarked = (jobId) => {
  return isJobStored(BOOKMARKS_KEY, jobId);
};

export const isSavedJob = (jobId) => {
  return isJobStored(SAVED_JOBS_KEY, jobId);
};

export const BOOKMARKS_STORAGE_KEY = BOOKMARKS_KEY;
export const SAVED_JOBS_STORAGE_KEY = SAVED_JOBS_KEY;