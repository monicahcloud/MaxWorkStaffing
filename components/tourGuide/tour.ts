import { Tour } from "nextstepjs";
const steps: Tour[] = [
  {
    tour: "mainTour",
    steps: [
      {
        title: "Dashboard",
        selector: ".dashboard-link",
        side: "right",
        icon: "👋",
        content:
          "Directs the user to the Dashboard, where they can get an overview of their progress and activity within the platform.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Resumes",
        selector: ".resumes-link",
        side: "right",
        icon: "👋",
        content:
          "Takes the user to the Resumes section, allowing them to upload, edit, or delete their resumes as needed for job applications.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Cover Letter",
        selector: ".coverletter-link",
        side: "right",
        icon: "👋",
        content: "Create a coverletter.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Personal Profile",
        selector: ".profile-link",
        side: "right",
        icon: "👋",
        content: "Professional profile to share with recruiters.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Job Tracker",
        selector: ".job-tracker-link",
        side: "right",
        icon: "👋",
        content:
          "Navigates to the Job Tracker, a feature for monitoring all job applications and their current statuses (e.g., applied, interviewing, rejected)",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Job Search",
        selector: ".job-search-link",
        side: "right",
        icon: "👋",
        content: "Search for real up to date jobs",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Stats",
        selector: ".stats-link",
        side: "right",
        icon: "👋",
        content:
          "Displays a summary of job application statistics, giving users a quick snapshot of their progress and outcomes.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "AI Mock Interview",
        selector: ".mock-interview-link",
        side: "right",
        icon: "👋",
        content: "An AI-powered platform for preparing for mock interviews.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Expert Interview & Resume Tips",
        selector: ".interviewing-tools-link",
        side: "right",
        icon: "👋",
        content:
          "Provides access to a suite of interview preparation resources and tools to help users get ready for interviews.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "FAQs",
        selector: ".faqs-link",
        side: "right",
        icon: "👋",
        content:
          "Opens the Frequently Asked Questions section, where users can quickly find answers to common questions about the platform.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Support",
        selector: ".support-link",
        side: "right",
        icon: "👋",
        content:
          "Connects users to support resources, letting them contact the help team for any assistance or troubleshooting.",
        showControls: true,
        showSkip: true,
      },

      // {
      //   title: "Stats Section",
      //   selector: ".stats-section",
      //   side: "right",
      //   icon: "👋",
      //   content:
      //     "Displays a summary of job application statistics, giving users a quick snapshot of their progress and outcomes.",
      //   showControls: true,
      //   showSkip: true,
      // },
      // {
      //   title: "Add job",
      //   selector: ".add-job-btn",
      //   side: "right",
      //   icon: "👋",
      //   content:
      //     "A call-to-action button for users to add their first (or additional) job applications to the tracker.",
      //   showControls: true,
      //   showSkip: true,
      // },
    ],
  },
  {
    tour: "resumeTour",
    steps: [
      {
        title: "Create Resume",
        selector: ".new-resume",
        side: "bottom",
        icon: "👋",
        content:
          "Guides users to the resume builder to create a brand new resume from scratch.",
        showControls: true,
        showSkip: true,
      },
      {
        title: "Upload Resume",
        selector: ".upload-resume",
        side: "bottom",
        icon: "👋",
        content:
          "Enables users to upload an existing resume file to the platform.",
        showControls: true,
        showSkip: true,
      },
    ],
  },
];

export default steps;
