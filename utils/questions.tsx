// interviewQuestions.tsx
import { nanoid } from "nanoid";

export type InterviewQuestion = {
  id: string;
  question: string;
  answer: string;
  type: "public" | "private";
};

export const interviewQuestions: InterviewQuestion[] = [
  {
    id: nanoid(),
    question:
      "Can you explain how your background and experience align with the mission of our agency?",
    answer:
      "My background in business intelligence and systems analysis has equipped me with the skills to interpret data and propose process improvements that align with your agency’s mission of operational transparency and public service.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "Describe a time when you had to comply with a policy or regulation that you did not agree with. How did you handle it?",
    answer:
      "I once had to implement a time-tracking software that I personally felt was invasive. However, I followed the directive, educated staff on its usage, and communicated employee concerns to leadership for adjustments.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "How do you handle working on multiple projects with tight deadlines?",
    answer:
      "I prioritize tasks, break down deliverables, and use project management tools like JIRA to manage competing deadlines effectively while maintaining high standards.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "What experience do you have with handling confidential information?",
    answer:
      "At BRP, I handled employee records and payroll data, ensuring that all information was stored securely and shared only with authorized personnel, maintaining compliance with data protection regulations.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "Can you provide an example of a complex problem you solved and the steps you took to solve it?",
    answer:
      "At BRP, I was tasked with integrating a legacy system with SAP. I conducted a needs analysis, mapped data flows, and coordinated with IT to implement the solution, resulting in streamlined operations.",
    type: "public",
  },
  {
    id: nanoid(),
    question: "Why do you want to work for this government agency?",
    answer:
      "I’m drawn to the public sector’s mission of service and believe my skills in data-driven decision-making can contribute meaningfully to your goals.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "What do you believe are the biggest challenges facing public sector agencies today?",
    answer:
      "Bureaucratic inefficiencies and outdated systems are major challenges. I believe modernizing with data systems and training is key to overcoming them.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "How would you handle a situation where you are asked to perform duties outside your job description?",
    answer:
      "I would assess the request’s urgency, communicate with my supervisor for alignment, and perform the task while documenting outcomes to ensure transparency.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "Have you ever had to work with a difficult colleague or client? How did you manage the relationship?",
    answer:
      "Yes, I worked with a colleague who was often uncooperative. I initiated weekly check-ins, clarified expectations, and focused on collaboration, which improved the relationship.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "Can you describe a project where you had to use data analysis to make decisions?",
    answer:
      "At BRP, I analyzed production data trends using Power BI, which helped us identify bottlenecks and make decisions that improved throughput by 15%.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "What skills do you bring to our team that are unique and valuable?",
    answer:
      "I bring a unique blend of front-end development, data analysis, and user experience design that ensures our solutions are not only functional but user-friendly.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "Describe a time when you had to learn a new skill or program quickly. How did you approach it?",
    answer:
      "I had to learn Power BI within two weeks. I completed an online course, practiced on sample datasets, and asked a colleague for mentorship to ramp up quickly.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "How do you ensure compliance with policies and laws in your work?",
    answer:
      "I stay informed on policies through training and ensure my work adheres to documentation, audits, and regulatory reviews.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "What strategies do you use to ensure clear and effective communication in a bureaucratic environment?",
    answer:
      "I use structured communication, like bullet points and visual aids, and follow up meetings with summary emails to ensure everyone is aligned.",
    type: "public",
  },
  {
    id: nanoid(),
    question:
      "Can you talk about a time when you had to advocate for change in your organization? What approach did you take?",
    answer:
      "I advocated for adopting agile practices. I conducted a pilot project, presented success metrics, and gradually gained stakeholder buy-in through collaborative workshops.",
    type: "public",
  },

  // PRIVATE QUESTIONS
  {
    id: nanoid(),
    question:
      "Can you describe a project that you led and what the outcome was?",
    answer:
      "I led a CRM implementation project that improved client follow-up time by 30%.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "What strategies do you use to stay organized and prioritize tasks?",
    answer:
      "I use digital tools like Trello and calendar blocking to organize and prioritize tasks.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "Tell us about a time when you had a conflict with a team member. How was it resolved?",
    answer:
      "A disagreement over task delegation was resolved through a team meeting and clearer role definition.",
    type: "private",
  },
  {
    id: nanoid(),
    question: "How do you keep yourself motivated in high-pressure situations?",
    answer:
      "I break challenges into small wins and reflect on long-term goals to stay focused.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "What are your career aspirations and how does this role fit into your plans?",
    answer:
      "I aim to move into a senior analyst role; this position provides the right experience and mentorship.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "What innovations or improvements have you introduced at your previous job?",
    answer:
      "At my last job, I automated a reporting task that saved 10 hours weekly.",
    type: "private",
  },
  {
    id: nanoid(),
    question: "How do you handle receiving constructive criticism?",
    answer:
      "I listen first, evaluate the feedback objectively, and use it to improve.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "What is your approach to understanding and meeting customer expectations?",
    answer:
      "I start by identifying key pain points and continuously gather feedback to meet expectations.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "Can you describe a situation where you had to analyze data to make a business decision? What tools did you use?",
    answer:
      "I used Power BI to identify customer churn trends and adjusted strategy, which boosted retention.",
    type: "private",
  },
  {
    id: nanoid(),
    question: "What do you think is the key to successful teamwork?",
    answer:
      "Open communication, shared goals, and accountability are key to successful teamwork.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "Describe a time when you failed in a project. What did you learn from it?",
    answer:
      "A budget miscalculation delayed a project. I learned to double-check financial assumptions early.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "How do you adapt to rapidly changing technology and environments?",
    answer:
      "I read industry news, attend webinars, and engage in online communities to stay current.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "What experience do you have in driving sales or meeting financial targets?",
    answer:
      "I exceeded quarterly sales goals by 15% by upselling value-added services.",
    type: "private",
  },
  {
    id: nanoid(),
    question: "How do you approach managing remote teams or working remotely?",
    answer:
      "I establish clear goals, use collaboration tools, and ensure regular check-ins with remote teams.",
    type: "private",
  },
  {
    id: nanoid(),
    question:
      "Can you provide an example of how you've contributed to your company's growth or stability?",
    answer:
      "I helped improve onboarding processes, reducing new hire ramp-up time by 40%.",
    type: "private",
  },
];
