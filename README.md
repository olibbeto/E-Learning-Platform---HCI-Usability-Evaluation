# LearnEase — Learn smarter. Navigate easier.

> **HCI Course Project** | Usability Evaluation of E-Learning Platforms

A fully functional, polished e-learning website prototype built as a university Human-Computer Interaction (HCI) assignment. The design addresses real usability pain-points found in traditional Learning Management Systems (Moodle, Blackboard, Canvas) by applying HCI principles, Nielsen's heuristics, and user-centred design throughout.

---

## 🚀 Quick Start

```bash
# 1. Navigate to the project folder
cd learnease

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in your browser
http://localhost:3000
```

### Demo Account
| Field | Value |
|-------|-------|
| **Email** | `alex.johnson@university.edu` |
| **Password** | `password123` |

Click "Use Demo Credentials" on the login page to fill them in automatically.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** (App Router) | Framework & routing |
| **React 19** | UI component model |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Utility-first styling |
| **Lucide React** | Icon library |
| **Recharts** | Data visualisation (progress charts) |
| **next/font** | Google Fonts (Inter) |

---

## ✨ Features

### 📖 Learning Experience
- **Course Catalog** — browse, filter, and enrol in 8 courses
- **Course Detail** — full syllabus, objectives, instructor info, enrol CTA
- **Learning Interface** — video player UI, lesson sidebar, mark complete
- **My Learning** — enrolled courses with live progress bars

### 📝 Assessments
- **Assignments** — view, submit (file upload simulation), see feedback
- **Quiz Engine** — timed interactive quiz with instant results & explanations
- **Grades** — GPA overview, per-assignment breakdown, letter grades

### 📊 Progress & Planning
- **Progress Dashboard** — circular progress, weekly activity bar chart, achievements
- **Calendar** — monthly grid with colour-coded events (assignments, quizzes, lectures, exams)
- **Notifications** — filterable feed (all / unread), mark all as read

### 👤 Account
- **Profile** — view and edit name, bio, email
- **Settings** — account, notification preferences, appearance, accessibility tabs
- **Login / Register** — demo credentials, password strength meter

### 🔍 Search
- Full-text search across courses, lessons, and assignments
- Filter by category with live result counts

---

## 🗺️ All Routes

| Route | Page |
|-------|------|
| `/` | Landing page |
| `/login` | Login |
| `/register` | Register |
| `/dashboard` | Student dashboard |
| `/courses` | Course catalog |
| `/courses/[id]` | Course detail |
| `/my-learning` | Enrolled courses |
| `/learn/[courseId]/[lessonId]` | Learning interface |
| `/search` | Search |
| `/assignments` | Assignments list |
| `/assignments/[id]` | Assignment detail & submission |
| `/quiz/[id]` | Interactive quiz |
| `/quiz/[id]/results` | Quiz results |
| `/grades` | Grades overview |
| `/progress` | Learning progress |
| `/calendar` | Academic calendar |
| `/notifications` | Notifications |
| `/profile` | User profile |
| `/settings` | Account settings |

---

## 📁 Project Structure

```
learnease/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx            # Landing page
│   │   ├── layout.tsx          # Root layout (Providers)
│   │   ├── globals.css         # Design system & global styles
│   │   ├── dashboard/
│   │   ├── courses/
│   │   │   └── [id]/
│   │   ├── learn/
│   │   │   └── [courseId]/[lessonId]/
│   │   ├── assignments/
│   │   │   └── [id]/
│   │   ├── quiz/
│   │   │   └── [id]/
│   │   │       └── results/
│   │   ├── grades/
│   │   ├── progress/
│   │   ├── calendar/
│   │   ├── notifications/
│   │   ├── search/
│   │   ├── profile/
│   │   ├── settings/
│   │   ├── login/
│   │   └── register/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Responsive top navigation
│   │   │   └── CourseSidebar.tsx # Lesson sidebar with accordion
│   │   └── ui/
│   │       ├── CourseCard.tsx   # Course card (catalog/enrolled/recommended)
│   │       ├── AssignmentCard.tsx
│   │       ├── ProgressBar.tsx  # Accessible progress bar
│   │       ├── Toast.tsx        # Toast notification system
│   │       ├── Modal.tsx        # Confirmation modal
│   │       ├── EmptyState.tsx   # Empty state placeholder
│   │       └── LoadingSpinner.tsx
│   ├── context/
│   │   └── AppContext.tsx       # Global state (enrollments, progress, notifications)
│   ├── data/
│   │   └── mock-data.ts         # All demo data (courses, assignments, quiz, etc.)
│   ├── lib/
│   │   └── utils.ts             # Helper utilities (cn, formatDate, etc.)
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── HCI_IMPLEMENTATION.md        # HCI principles documentation
├── README.md
├── package.json
└── tsconfig.json
```

---

## 🎓 HCI Course Context

This project was built for the **"Usability Evaluation of E-Learning Platforms"** assignment in a university Human-Computer Interaction course. It demonstrates:

- **Stakeholder Analysis** — student learner persona (Alex Johnson, CS major)
- **Task Analysis** — core tasks: browse courses, complete lessons, submit assignments, track progress
- **Function Allocation** — clear system vs. user responsibility boundaries
- **Design Rationale** — see `HCI_IMPLEMENTATION.md` for full heuristic mapping
- **Navigation Design** — persistent top nav, breadcrumbs, lesson sidebar
- **Usability Principles** — see `HCI_IMPLEMENTATION.md`

---

## 📄 Licence

MIT — built for academic demonstration purposes.
