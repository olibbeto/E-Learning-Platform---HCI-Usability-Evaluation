import { User, Course, Assignment, Quiz, Notification, CalendarEvent, GradeEntry, Achievement, Instructor, Module } from '../types';

export const currentUser: User = {
  id: 'u1',
  name: 'Alex Johnson',
  email: 'alex.johnson@university.edu',
  avatar: 'https://i.pravatar.cc/150?u=alex',
  joinDate: '2024-01-15T00:00:00Z',
  bio: 'Computer Science major with a passion for web technologies and user experience.',
};

const defaultInstructor: Instructor = {
  id: 'inst1',
  name: 'Dr. Sarah Smith',
  avatar: 'https://i.pravatar.cc/150?u=sarah',
  title: 'Professor of Computer Science',
  bio: 'Expert in Human-Computer Interaction and Software Engineering.'
};

const baseModules: Module[] = [
  {
    id: 'm1',
    title: 'Introduction',
    lessons: [
      { id: 'l1', title: 'Course Overview', duration: '10:00', type: 'video', completed: true },
      { id: 'l2', title: 'Basic Concepts', duration: '15:00', type: 'reading', completed: true },
    ]
  },
  {
    id: 'm2',
    title: 'Core Principles',
    lessons: [
      { id: 'l3', title: 'Theory and Practice', duration: '20:00', type: 'video', completed: false },
      { id: 'l4', title: 'Case Studies', duration: '25:00', type: 'video', completed: false },
      { id: 'l5', title: 'Knowledge Check', duration: '15:00', type: 'quiz', completed: false },
    ]
  }
];

export const courses: Course[] = [
  {
    id: 'c1',
    title: 'Human-Computer Interaction (HCI)',
    instructor: defaultInstructor,
    description: 'Learn the principles of UI/UX and human-centered design.',
    shortDescription: 'Principles of UI/UX design.',
    category: 'Design',
    difficulty: 'Intermediate',
    duration: '12 weeks',
    rating: 4.8,
    reviewCount: 342,
    students: 1540,
    image: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600',
    tags: ['UI', 'UX', 'Design'],
    objectives: ['Understand user needs', 'Design interfaces', 'Conduct usability tests'],
    modules: [
      {
        id: 'm1_hci',
        title: 'Introduction to HCI',
        lessons: [
          { id: 'l1_hci', title: 'What is HCI?', duration: '15:00', type: 'video', completed: true },
          { id: 'l2_hci', title: 'History of HCI', duration: '20:00', type: 'reading', completed: true },
          { id: 'l3_hci', title: 'Design Principles', duration: '25:00', type: 'video', completed: true },
        ]
      },
      {
        id: 'm2_hci',
        title: 'User-Centered Design',
        lessons: [
          { id: 'l4_hci', title: 'User Research', duration: '30:00', type: 'video', completed: true },
          { id: 'l5_hci', title: 'Prototyping', duration: '35:00', type: 'video', completed: false },
        ]
      }
    ],
    price: '$49.99',
    enrolled: true,
    progress: 72,
    lastLesson: 'User Research',
    lastLessonId: 'l4_hci',
    color: 'from-indigo-500 to-purple-600'
  },
  {
    id: 'c2',
    title: 'Web Development',
    instructor: defaultInstructor,
    description: 'Master frontend and backend web development.',
    shortDescription: 'Full-stack web dev.',
    category: 'Development',
    difficulty: 'Intermediate',
    duration: '16 weeks',
    rating: 4.9,
    reviewCount: 520,
    students: 3100,
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600',
    tags: ['React', 'Node', 'Fullstack'],
    objectives: ['Build SPAs', 'Create APIs', 'Deploy applications'],
    modules: [
      {
        id: 'm1_web',
        title: 'HTML & CSS Basics',
        lessons: [
          { id: 'l1_web', title: 'HTML5 Elements', duration: '18:00', type: 'video', completed: true },
          { id: 'l2_web', title: 'CSS Flexbox & Grid', duration: '25:00', type: 'video', completed: true },
        ]
      },
      {
        id: 'm2_web',
        title: 'JavaScript Essentials',
        lessons: [
          { id: 'l3_web', title: 'ES6+ Features', duration: '30:00', type: 'video', completed: false },
          { id: 'l4_web', title: 'Async JS', duration: '22:00', type: 'video', completed: false },
        ]
      }
    ],
    price: '$89.99',
    enrolled: true,
    progress: 45,
    lastLesson: 'CSS Flexbox & Grid',
    lastLessonId: 'l2_web',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'c3',
    title: 'Cybersecurity Fundamentals',
    instructor: defaultInstructor,
    description: 'Learn the basics of securing systems and networks.',
    shortDescription: 'Intro to cybersecurity.',
    category: 'Security',
    difficulty: 'Beginner',
    duration: '10 weeks',
    rating: 4.7,
    reviewCount: 210,
    students: 1200,
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=600',
    tags: ['Security', 'Networks', 'Cryptography'],
    objectives: ['Identify threats', 'Apply encryption', 'Secure networks'],
    modules: [
      {
        id: 'm1_sec',
        title: 'Introduction to Security',
        lessons: [
          { id: 'l1_sec', title: 'CIA Triad', duration: '12:00', type: 'video', completed: true },
          { id: 'l2_sec', title: 'Common Threats', duration: '20:00', type: 'video', completed: false },
        ]
      },
      {
        id: 'm2_sec',
        title: 'Cryptography basics',
        lessons: [
          { id: 'l3_sec', title: 'Symmetric vs Asymmetric', duration: '25:00', type: 'video', completed: false },
        ]
      }
    ],
    price: '$59.99',
    enrolled: true,
    progress: 28,
    lastLesson: 'CIA Triad',
    lastLessonId: 'l1_sec',
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'c4',
    title: 'Software Engineering',
    instructor: defaultInstructor,
    description: 'Learn agile methodologies and software lifecycle.',
    shortDescription: 'Agile & Lifecycle.',
    category: 'Engineering',
    difficulty: 'Advanced',
    duration: '14 weeks',
    rating: 4.6,
    reviewCount: 430,
    students: 2200,
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600',
    tags: ['Agile', 'Scrum', 'Architecture'],
    objectives: ['Lead teams', 'Design systems', 'Manage projects'],
    modules: baseModules,
    price: '$79.99',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'c5',
    title: 'Computer Networks',
    instructor: defaultInstructor,
    description: 'Understand TCP/IP, routing, and network protocols.',
    shortDescription: 'TCP/IP & Routing.',
    category: 'Infrastructure',
    difficulty: 'Intermediate',
    duration: '12 weeks',
    rating: 4.8,
    reviewCount: 150,
    students: 980,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600',
    tags: ['Networking', 'TCP/IP', 'Routing'],
    objectives: ['Understand OSI model', 'Configure routers', 'Analyze traffic'],
    modules: baseModules,
    price: '$69.99',
    color: 'from-fuchsia-500 to-pink-500'
  },
  {
    id: 'c6',
    title: 'Database Systems',
    instructor: defaultInstructor,
    description: 'SQL, NoSQL, and database design principles.',
    shortDescription: 'SQL & NoSQL.',
    category: 'Data',
    difficulty: 'Intermediate',
    duration: '10 weeks',
    rating: 4.7,
    reviewCount: 310,
    students: 1800,
    image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=600',
    tags: ['SQL', 'MongoDB', 'PostgreSQL'],
    objectives: ['Write complex queries', 'Design schemas', 'Optimize performance'],
    modules: baseModules,
    price: '$59.99',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 'c7',
    title: 'UI/UX Design',
    instructor: defaultInstructor,
    description: 'Create beautiful and functional user interfaces using Figma.',
    shortDescription: 'Design with Figma.',
    category: 'Design',
    difficulty: 'Beginner',
    duration: '8 weeks',
    rating: 4.9,
    reviewCount: 890,
    students: 4500,
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=600',
    tags: ['Figma', 'UI', 'UX'],
    objectives: ['Use Figma', 'Create design systems', 'Prototyping'],
    modules: baseModules,
    price: '$49.99',
    color: 'from-rose-400 to-red-500'
  },
  {
    id: 'c8',
    title: 'Programming Fundamentals',
    instructor: defaultInstructor,
    description: 'Learn to code from scratch using Python.',
    shortDescription: 'Python for beginners.',
    category: 'Development',
    difficulty: 'Beginner',
    duration: '6 weeks',
    rating: 4.8,
    reviewCount: 1200,
    students: 8000,
    image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bfce8?auto=format&fit=crop&q=80&w=600',
    tags: ['Python', 'Basics', 'Coding'],
    objectives: ['Write Python', 'Understand logic', 'Solve problems'],
    modules: baseModules,
    price: '$29.99',
    color: 'from-green-400 to-emerald-600'
  }
];

export const assignments: Assignment[] = [
  {
    id: 'a1',
    title: 'HCI Usability Evaluation',
    courseId: 'c1',
    courseName: 'Human-Computer Interaction (HCI)',
    description: 'Conduct a heuristic evaluation of a popular mobile application.',
    instructions: ['Select an app', 'Apply Nielsen heuristics', 'Write report'],
    dueDate: '2026-09-12T23:59:59Z',
    maxScore: 100,
    status: 'not_submitted',
    resources: [{ name: 'Evaluation Template', url: '#', type: 'document' }]
  },
  {
    id: 'a2',
    title: 'Web Development Project',
    courseId: 'c2',
    courseName: 'Web Development',
    description: 'Build a responsive portfolio website using HTML, CSS, and JS.',
    instructions: ['Create layout', 'Make it responsive', 'Deploy to GitHub Pages'],
    dueDate: '2026-09-20T23:59:59Z',
    maxScore: 100,
    status: 'submitted',
    submittedAt: '2026-08-30T10:00:00Z',
    submittedFile: 'portfolio.zip',
    resources: [{ name: 'Design Assets', url: '#', type: 'image' }]
  },
  {
    id: 'a3',
    title: 'Network Security Analysis',
    courseId: 'c3',
    courseName: 'Cybersecurity Fundamentals',
    description: 'Analyze the provided PCAP file using Wireshark.',
    instructions: ['Open PCAP', 'Find anomalous traffic', 'Answer worksheet'],
    dueDate: '2026-08-25T23:59:59Z',
    maxScore: 100,
    status: 'graded',
    grade: 91,
    feedback: 'Great analysis, clear identification of the DoS attack.',
    submittedAt: '2026-08-24T15:00:00Z',
    submittedFile: 'analysis.pdf',
    resources: [{ name: 'Capture File', url: '#', type: 'file' }]
  }
];

export const quizData: Quiz = {
  id: 'q1',
  title: 'HCI Principles Quiz',
  courseId: 'c1',
  courseName: 'Human-Computer Interaction (HCI)',
  timeLimit: 15,
  questions: [
    {
      id: 'qq1',
      question: 'Which of the following is NOT one of Nielsen\'s 10 Usability Heuristics?',
      options: ['Visibility of system status', 'Match between system and real world', 'Aesthetic and minimalist design', 'Maximum visual complexity'],
      correctAnswer: 3,
      explanation: 'Maximum visual complexity goes against minimalist design.'
    },
    {
      id: 'qq2',
      question: 'What is a persona in HCI?',
      options: ['A fake account', 'A fictional character representing a user type', 'A type of interface', 'A testing tool'],
      correctAnswer: 1,
      explanation: 'Personas represent target user types to help guide design decisions.'
    },
    {
      id: 'qq3',
      question: 'Fitts\'s Law relates to:',
      options: ['Time to move to a target area', 'Color contrast', 'Font readability', 'System feedback time'],
      correctAnswer: 0,
      explanation: 'Fitts\'s Law models human movement primarily for predicting time to point at an object.'
    },
    {
      id: 'qq4',
      question: 'What does UX stand for?',
      options: ['User Example', 'Universal Experience', 'User Experience', 'Unix Exchange'],
      correctAnswer: 2,
      explanation: 'UX stands for User Experience.'
    },
    {
      id: 'qq5',
      question: 'Which of these is a low-fidelity prototyping method?',
      options: ['React App', 'Figma interactive prototype', 'Paper sketch', 'HTML/CSS mockup'],
      correctAnswer: 2,
      explanation: 'Paper sketching is quick and low fidelity.'
    },
    {
      id: 'qq6',
      question: 'Accessibility in design primarily ensures that:',
      options: ['The site loads fast', 'People with disabilities can use the product', 'The UI looks modern', 'The code is clean'],
      correctAnswer: 1,
      explanation: 'Accessibility is about inclusive design for people with varying abilities.'
    },
    {
      id: 'qq7',
      question: 'What is affordance?',
      options: ['The price of the software', 'A clue about how an object should be used', 'The memory required', 'A visual effect'],
      correctAnswer: 1,
      explanation: 'An affordance is a property that indicates how an object can be used (e.g. a button affords clicking).'
    },
    {
      id: 'qq8',
      question: 'A/B testing is used to:',
      options: ['Test two different versions to see which performs better', 'Test alphabetic sorting', 'Test audio/video', 'Test database connections'],
      correctAnswer: 0,
      explanation: 'A/B testing compares two variations of a page or app to determine which performs better.'
    },
    {
      id: 'qq9',
      question: 'Cognitive load refers to:',
      options: ['Server processing power', 'The amount of mental effort being used in working memory', 'The size of the database', 'Screen brightness'],
      correctAnswer: 1,
      explanation: 'Cognitive load is the total amount of mental effort being used in the working memory.'
    },
    {
      id: 'qq10',
      question: 'Which of the following improves readability?',
      options: ['Low contrast', 'Tiny fonts', 'Good whitespace and typography', 'Cluttered layout'],
      correctAnswer: 2,
      explanation: 'Proper use of whitespace and readable typography significantly improve readability.'
    }
  ]
};

export const notifications: Notification[] = [
  { id: 'n1', type: 'assignment', title: 'New Assignment', message: 'HCI Usability Evaluation is now available.', timestamp: '2026-09-01T08:00:00Z', read: false },
  { id: 'n2', type: 'grade', title: 'Grade Posted', message: 'Network Security Analysis grade: 91/100', timestamp: '2026-08-28T14:30:00Z', read: false },
  { id: 'n3', type: 'announcement', title: 'Course Update', message: 'Web Development lecture time changed.', timestamp: '2026-08-30T09:15:00Z', read: true },
  { id: 'n4', type: 'lesson', title: 'New Module', message: 'Cybersecurity Module 3 is published.', timestamp: '2026-08-31T11:00:00Z', read: true },
  { id: 'n5', type: 'assignment', title: 'Due Date Reminder', message: 'Web Development Project due soon.', timestamp: '2026-08-20T10:00:00Z', read: true },
  { id: 'n6', type: 'announcement', title: 'System Maintenance', message: 'Scheduled downtime on Sept 5.', timestamp: '2026-09-01T07:00:00Z', read: false },
  { id: 'n7', type: 'lesson', title: 'Live Q&A', message: 'Join the HCI live Q&A session today.', timestamp: '2026-08-25T16:00:00Z', read: true },
  { id: 'n8', type: 'grade', title: 'Feedback Added', message: 'Dr. Smith added feedback to your essay.', timestamp: '2026-08-22T13:45:00Z', read: true }
];

export const calendarEvents: CalendarEvent[] = [
  { id: 'e1', title: 'HCI Lecture', date: '2026-09-05T10:00:00Z', type: 'lecture', courseId: 'c1', courseName: 'HCI' },
  { id: 'e2', title: 'HCI Usability Eval Due', date: '2026-09-12T23:59:59Z', type: 'assignment', courseId: 'c1', courseName: 'HCI' },
  { id: 'e3', title: 'Web Dev Lecture', date: '2026-09-07T14:00:00Z', type: 'lecture', courseId: 'c2', courseName: 'Web Development' },
  { id: 'e4', title: 'Web Dev Project Due', date: '2026-09-20T23:59:59Z', type: 'assignment', courseId: 'c2', courseName: 'Web Development' },
  { id: 'e5', title: 'Cybersecurity Quiz', date: '2026-09-15T12:00:00Z', type: 'quiz', courseId: 'c3', courseName: 'Cybersecurity Fundamentals' },
  { id: 'e6', title: 'Cyber Lab Session', date: '2026-09-10T15:00:00Z', type: 'lecture', courseId: 'c3', courseName: 'Cybersecurity Fundamentals' },
  { id: 'e7', title: 'Study Group', date: '2026-09-18T18:00:00Z', type: 'lecture' },
  { id: 'e8', title: 'Midterm Prep', date: '2026-09-22T10:00:00Z', type: 'lecture' },
  { id: 'e9', title: 'HCI Midterm', date: '2026-09-25T09:00:00Z', type: 'exam', courseId: 'c1', courseName: 'HCI' },
  { id: 'e10', title: 'Web Dev Exam', date: '2026-09-28T13:00:00Z', type: 'exam', courseId: 'c2', courseName: 'Web Development' }
];

export const grades: GradeEntry[] = [
  { id: 'g1', title: 'Network Security Analysis', type: 'assignment', courseId: 'c3', courseName: 'Cybersecurity Fundamentals', score: 91, maxScore: 100, date: '2026-08-28T14:30:00Z' },
  { id: 'g2', title: 'HTML/CSS Basics Quiz', type: 'quiz', courseId: 'c2', courseName: 'Web Development', score: 95, maxScore: 100, date: '2026-08-15T10:00:00Z' },
  { id: 'g3', title: 'Design Principles Essay', type: 'assignment', courseId: 'c1', courseName: 'HCI', score: 88, maxScore: 100, date: '2026-08-20T16:00:00Z' },
  { id: 'g4', title: 'JS Fundamentals Exam', type: 'exam', courseId: 'c2', courseName: 'Web Development', score: 82, maxScore: 100, date: '2026-08-22T11:00:00Z' },
  { id: 'g5', title: 'Cryptography Quiz', type: 'quiz', courseId: 'c3', courseName: 'Cybersecurity Fundamentals', score: 100, maxScore: 100, date: '2026-08-10T14:00:00Z' },
  { id: 'g6', title: 'Prototyping Task', type: 'assignment', courseId: 'c1', courseName: 'HCI', score: 94, maxScore: 100, date: '2026-08-05T09:00:00Z' }
];

export const achievements: Achievement[] = [
  { id: 'ach1', title: 'First Steps', description: 'Completed your first lesson.', icon: '🎯', earned: true, earnedDate: '2026-01-20T10:00:00Z' },
  { id: 'ach2', title: 'Perfect Score', description: 'Got 100% on a quiz.', icon: '🌟', earned: true, earnedDate: '2026-08-10T14:30:00Z' },
  { id: 'ach3', title: 'Early Bird', description: 'Submitted an assignment 3 days early.', icon: '⏰', earned: true, earnedDate: '2026-08-22T09:00:00Z' },
  { id: 'ach4', title: 'Course Master', description: 'Complete an entire course.', icon: '🎓', earned: false },
  { id: 'ach5', title: 'Social Butterfly', description: 'Participated in 10 forum discussions.', icon: '💬', earned: false }
];
