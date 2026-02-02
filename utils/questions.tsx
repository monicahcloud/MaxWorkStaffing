// interviewQuestions.ts
import { nanoid } from "nanoid";

export type InterviewQuestion = {
  id: string;
  question: string;
  answer: string;
  type: "public" | "private";
  tags?: string[];
  framework?: "STAR" | "CAR";
};

export const interviewQuestions: InterviewQuestion[] = [
  /* ———————————  PUBLIC  ——————————— */
  {
    id: nanoid(),
    question:
      "Can you explain how your background and experience align with the mission of our agency?",
    answer: `♦ Situation: While working as a Business-Intelligence Analyst, our team sought ways to align with public sector transparency standards.
  
♦ Task: I was responsible for aligning our analytics with public KPIs.
  
♦ Action: I created dashboards focused on citizen-facing metrics and streamlined the reporting pipeline.
  
♦ Result: Leadership adopted the dashboards, improving transparency and decision-making speed by 25%.`,
    type: "public",
    tags: ["Behavioral", "Mission Alignment", "Motivation"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "Describe a time when you had to comply with a policy or regulation that you did not agree with. How did you handle it?",
    answer: `♦ Situation: At my previous job, leadership decided to implement time-tracking software that many employees—including myself—found intrusive.
  
♦ Task: I was responsible for rolling out the system and ensuring adoption.
  
♦ Action: I hosted informational sessions to clarify its intent, addressed concerns transparently, and gathered anonymous feedback to relay to management.
  
♦ Result: This approach eased resistance and led to feature adjustments, increasing employee acceptance and compliance.`,
    type: "public",
    tags: ["Behavioral", "Policy Compliance", "Conflict Resolution"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "How do you handle working on multiple projects with tight deadlines?",
    answer: `♦ Challenge: I was managing three client deliverables with the same deadline.
  
♦ Action: I used a prioritization matrix, split deliverables into sprints, and delegated repetitive tasks to junior analysts.
  
♦ Result: All projects were delivered on time with high client satisfaction.`,
    type: "public",
    tags: ["Time Management", "Prioritization"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "What experience do you have with handling confidential information?",
    answer: `♦ Challenge: I managed payroll and HR data during my role as an operations assistant.
  
♦ Action: I used encrypted systems and followed access protocols rigorously.
  
♦ Result: We passed an external compliance audit with no findings.`,
    type: "public",
    tags: ["Data Privacy", "Compliance"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "Can you provide an example of a complex problem you solved and the steps you took to solve it?",
    answer: `♦ Situation: A legacy system was failing to integrate with our reporting tools.
  
♦ Task: I was asked to create a bridge between systems without impacting data accuracy.
  
♦ Action: I mapped all incoming data streams, created transformation scripts, and validated records.
  
♦ Result: The new pipeline improved reporting speed by 40% and eliminated data duplication.`,
    type: "public",
    tags: ["Problem Solving", "Technical", "Systems Integration"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question: "Why do you want to work for this government agency?",
    answer: `♦ Challenge: I’ve always wanted to apply my skills in a mission-driven environment.
  
♦ Action: I researched your agency’s recent initiatives and saw alignment with my past projects.
  
♦ Result: I believe I can contribute to data modernization efforts from day one.`,
    type: "public",
    tags: ["Motivation", "Mission Fit"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "What do you believe are the biggest challenges facing public sector agencies today?",
    answer: `♦ Challenge: Public sector agencies face unique structural and cultural hurdles.  

♦ Action: I believe the biggest challenges are bureaucratic inefficiencies and outdated systems.  

♦ Result: Modernizing infrastructure and workforce through training and agile methods is critical to progress.`,
    type: "public",
    tags: ["Industry Insight", "Analytical Thinking"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "How would you handle a situation where you are asked to perform duties outside your job description?",
    answer: `♦ Situation: At my previous job, we experienced a gap when a team member left unexpectedly.  

♦ Task: I was asked to temporarily take over client reporting, which was not in my original responsibilities.  

♦ Action: I discussed with my manager to prioritize tasks, accepted the responsibility, and documented the process.  

♦ Result: The reports were delivered on time, and we used my documentation to onboard a new team member smoothly.`,
    type: "public",
    tags: ["Adaptability", "Flexibility", "Teamwork"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "Have you ever had to work with a difficult colleague or client? How did you manage the relationship?",
    answer: `♦ Situation: I once worked with a colleague who often missed deadlines, which impacted team delivery.  

♦ Task: I needed to find a way to improve collaboration without escalating tensions.  

♦ Action: I initiated weekly check-ins, clarified expectations, and proposed shared project milestones.  

♦ Result: Communication improved, deadlines were met, and our collaboration became more productive.`,
    type: "public",
    tags: ["Conflict Resolution", "Teamwork"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "Can you describe a project where you had to use data analysis to make decisions?",
    answer: `♦ Situation: At ABC Company, throughput was slowing down, and leadership wanted to understand why.  

♦ Task: I was asked to investigate and recommend process improvements.  

♦ Action: I used Power BI to analyze production trends and identify bottlenecks.  

♦ Result: We adjusted shift scheduling and machine usage, improving throughput by 15%.`,
    type: "public",
    tags: ["Data Analysis", "Decision Making"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "What skills do you bring to our team that are unique and valuable?",
    answer: `♦ Challenge: Many teams benefit from cross-functional capabilities.  

♦ Action: I bring a unique blend of front-end development, data analysis, and user-experience design.  

♦ Result: This ensures our solutions are both technically sound and user-friendly, bridging gaps between stakeholders and developers.`,
    type: "public",
    tags: ["Unique Value", "Skills"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "Describe a time when you had to learn a new skill or program quickly. How did you approach it?",
    answer: `♦ Situation: I needed to analyze customer churn data for a major presentation in two weeks.  

♦ Task: Learn Power BI and generate actionable insights fast.  

♦ Action: I completed an online Power BI course, worked on internal sample data, and received feedback from a colleague.  

♦ Result: I created a professional dashboard that was used in executive strategy discussions.`,
    type: "public",
    tags: ["Learning Agility", "Self-Development"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "How do you ensure compliance with policies and laws in your work?",
    answer: `♦ Challenge: In compliance-heavy industries, mistakes can be costly.  

♦ Action: I stay up to date with regulations through training, apply best practices to documentation, and build audit-friendly systems.  

♦ Result: Our department passed annual audits without issue for three consecutive years.`,
    type: "public",
    tags: ["Compliance", "Regulatory Knowledge"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "What strategies do you use to ensure clear and effective communication in a bureaucratic environment?",
    answer: `♦ Challenge: Working across silos often leads to miscommunication.  

♦ Action: I use structured communication formats, visual reporting, and follow-up emails summarizing key takeaways.  

♦ Result: Stakeholders consistently reported higher clarity and better alignment in cross-department projects.`,
    type: "public",
    tags: ["Communication", "Stakeholder Management"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "Can you talk about a time when you had to advocate for change in your organization? What approach did you take?",
    answer: `♦ Situation: I noticed inefficiencies in our project management workflow.  

♦ Task: Advocate for implementing agile practices.  

♦ Action: I conducted a pilot sprint, gathered metrics, and led workshops to gain stakeholder buy-in.  

♦ Result: Leadership approved a full agile rollout, and productivity increased by 20%.`,
    type: "public",
    tags: ["Change Management", "Leadership"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "Can you describe a project that you led and what the outcome was?",
    answer: `♦ Situation: I was assigned to lead a CRM implementation to streamline client communications.

♦ Task: My role was to ensure successful adoption and measurable improvement in response times.

♦ Action: I coordinated stakeholders, trained users, and monitored system performance.

♦ Result: The project reduced client follow-up time by 30% and improved client satisfaction.`,
    type: "private",
    tags: ["Leadership", "Project Management"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "What strategies do you use to stay organized and prioritize tasks?",
    answer: `♦ Challenge: Managing multiple deadlines and projects effectively.

♦ Action: I rely on Trello for task tracking and use calendar blocking for focused work sessions.

♦ Result: This system has improved my task visibility and reduced missed deadlines.`,
    type: "private",
    tags: ["Organization", "Time Management"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "Tell us about a time when you had a conflict with a team member. How was it resolved?",
    answer: `♦ Situation: A team member and I had a disagreement over task delegation in a shared project.

♦ Task: We needed to collaborate effectively to meet a tight deadline.

♦ Action: I proposed a team meeting to clarify responsibilities and expectations.

♦ Result: We reached consensus, roles were realigned, and the project was delivered on time.`,
    type: "private",
    tags: ["Conflict Resolution", "Teamwork"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question: "How do you keep yourself motivated in high‑pressure situations?",
    answer: `♦ Challenge: Staying focused during high-pressure deliverables and competing priorities.

♦ Action: I break down larger goals into smaller milestones and revisit my long-term objectives.

♦ Result: This helps me stay calm, motivated, and productive even under stress.`,
    type: "private",
    tags: ["Motivation", "Stress Management"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "What are your career aspirations and how does this role fit into your plans?",
    answer: `♦ Challenge: Defining a path that leads to senior-level responsibilities.

♦ Action: I seek opportunities that provide leadership exposure and mentorship, like this role.

♦ Result: This position aligns perfectly with my goal of becoming a senior analyst.`,
    type: "private",
    tags: ["Career Goals", "Motivation"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "What innovations or improvements have you introduced at your previous job?",
    answer: `♦ Situation: Our team was spending excessive time on manual report generation.

♦ Task: I aimed to automate the process to improve efficiency.

♦ Action: I developed an automated reporting system using Excel macros and scheduled tasks.

♦ Result: This saved 10 hours per week, improving productivity and team morale.`,
    type: "private",
    tags: ["Innovation", "Process Improvement"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question: "How do you handle receiving constructive criticism?",
    answer: `♦ Challenge: Receiving difficult feedback about a presentation style early in my career.

♦ Action: I actively listened, asked clarifying questions, and sought mentorship.

♦ Result: I incorporated the feedback and delivered clearer, more confident presentations moving forward.`,
    type: "private",
    tags: ["Feedback", "Growth Mindset"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "What is your approach to understanding and meeting customer expectations?",
    answer: `♦ Challenge: Aligning service delivery with evolving client expectations.

♦ Action: I conduct regular feedback surveys and adjust processes based on results.

♦ Result: This proactive approach has led to higher customer satisfaction and retention.`,
    type: "private",
    tags: ["Customer Focus", "Service Orientation"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "Can you describe a situation where you had to analyze data to make a business decision? What tools did you use?",
    answer: `♦ Situation: Customer churn was rising at my previous company.

♦ Task: I was asked to investigate root causes and propose a solution.

♦ Action: Using Power BI, I identified that churn correlated with service response times.

♦ Result: We adjusted staffing and hours, which reduced churn by 12% in the next quarter.`,
    type: "private",
    tags: ["Data Analysis", "Decision Making", "Technical"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question: "What do you think is the key to successful teamwork?",
    answer: `♦ Challenge: Building effective collaboration in cross-functional teams.

♦ Action: I encourage open communication, clear role ownership, and mutual accountability.

♦ Result: These principles consistently lead to higher team satisfaction and performance.`,
    type: "private",
    tags: ["Teamwork", "Collaboration"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "Describe a time when you failed in a project. What did you learn from it?",
    answer: `♦ Situation: I underestimated the budget needed for a software procurement.

♦ Task: My job was to forecast accurate financial needs.

♦ Action: I reevaluated vendor quotes and consulted finance earlier in future projects.

♦ Result: I learned to always double-check financial assumptions, which prevented future issues.`,
    type: "private",
    tags: ["Resilience", "Learning from Failure"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question:
      "How do you adapt to rapidly changing technology and environments?",
    answer: `♦ Challenge: Staying current with evolving tools in a fast-paced industry.

♦ Action: I subscribe to industry newsletters, take short courses, and participate in developer forums.

♦ Result: This habit keeps me confident and agile when learning and adapting to new systems.`,
    type: "private",
    tags: ["Adaptability", "Continuous Learning"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "What experience do you have in driving sales or meeting financial targets?",
    answer: `♦ Situation: I was responsible for increasing upsells for existing customers.

♦ Task: My target was to exceed quarterly sales targets.

♦ Action: I developed tailored packages and followed up strategically.

♦ Result: I exceeded my goal by 15%, contributing significantly to team revenue.`,
    type: "private",
    tags: ["Sales", "Results Oriented"],
    framework: "STAR",
  },
  {
    id: nanoid(),
    question: "How do you approach managing remote teams or working remotely?",
    answer: `♦ Challenge: Coordinating deliverables across time zones with a remote team.

♦ Action: I implemented structured check-ins, clear documentation, and asynchronous tools.

♦ Result: We hit 95% of our sprint goals and maintained strong engagement.`,
    type: "private",
    tags: ["Remote Management", "Leadership"],
    framework: "CAR",
  },
  {
    id: nanoid(),
    question:
      "Can you provide an example of how you've contributed to your company's growth or stability?",
    answer: `♦ Situation: High turnover and inefficient onboarding impacted our company’s growth.

♦ Task: I was asked to propose improvements to the onboarding process.

♦ Action: I redesigned documentation and introduced a mentorship program.

♦ Result: New hire ramp-up time was reduced by 40%, improving retention and productivity.`,
    type: "private",
    tags: ["Business Impact", "Process Improvement"],
    framework: "STAR",
  },
];
