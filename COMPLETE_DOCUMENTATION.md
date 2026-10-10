# LearnEase — Complete Project Documentation
## HCI Course Project: Usability Evaluation of E-Learning Platforms

**Document Version**: 1.0  
**Date**: 2026-09-01  
**Project Type**: HCI Course Assignment  
**Status**: Production-Ready Prototype

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [HCI Principles & Theory](#hci-principles--theory)
4. [Requirements Analysis](#requirements-analysis)
5. [Features & Functionality](#features--functionality)
6. [Design System](#design-system)
7. [Task Analysis](#task-analysis)
8. [Testing Strategy](#testing-strategy)
9. [Customization Guide](#customization-guide)
10. [Development Workflow](#development-workflow)
11. [Appendices](#appendices)

---

# 1. Project Overview

## 1.1 What is LearnEase?

**LearnEase** is a fully functional, polished e-learning platform prototype designed to address real usability pain-points found in traditional Learning Management Systems (Moodle, Blackboard, Canvas).

### Project Characteristics
- **Type**: University HCI Course Project
- **Focus**: Usability Evaluation of E-Learning Platforms
- **Architecture**: Frontend-only prototype (client-side)
- **Status**: Production-ready code
- **Purpose**: Demonstrate HCI principles applied to real-world problems

## 1.2 Project Goals

### Primary Goals
1. ✅ Design an intuitive e-learning platform
2. ✅ Apply Nielsen's 10 Usability Heuristics
3. ✅ Ensure WCAG 2.1 AA accessibility
4. ✅ Implement cognitive science principles (Fitts' Law, Hick's Law)
5. ✅ Create responsive, mobile-first design

### Success Metrics
- 19 complete pages/routes
- 100+ HCI principles documented
- WCAG 2.1 AA compliance
- Works on mobile/tablet/desktop
- Production-ready code quality

## 1.3 Problem Statement

### Traditional LMS Pain Points

| Issue | Problem | Impact |
|-------|---------|--------|
| **Cluttered Navigation** | 20+ menu items | Users overwhelmed, hard to find features |
| **No Progress Tracking** | Hidden status | Students don't know learning status |
| **Unclear Assignment Status** | Ambiguous states | Confusion between submitted/graded |
| **Buried Deadlines** | Hard to find | Students miss due dates |
| **Confusing Quiz UI** | Poor workflow | Stressful assessment experience |
| **Generic Errors** | No guidance | Users don't know how to fix problems |
| **Desktop-Only** | No mobile support | Inaccessible on phones/tablets |

### Research Insight
Students experience:
- Missed deadlines
- Confusion about progress
- Frustration with unclear statuses
- Low engagement with platform

## 1.4 LearnEase Solution

### Core Design Principles
1. **Simplicity** — 5 primary nav items (vs. 20+ in traditional LMS)
2. **Transparency** — Progress visible everywhere
3. **Clarity** — Color-coded status badges
4. **Mobile-First** — Works on all devices
5. **Inclusive** — Accessible to all users

### What We Built
✅ Course catalog & enrollment system  
✅ Interactive learning interface with sidebar  
✅ Assignment management & submission  
✅ Timed quiz engine with explanations  
✅ Progress tracking & analytics  
✅ Academic calendar  
✅ Notification system  
✅ User profiles & settings  
✅ Full-text search with filters  

---

# 2. Technical Architecture

## 2.1 Technology Stack

### Frontend Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.3.4 | App Router, file-based routing, SSR |
| **React** | 19.2.8 | UI components, hooks, functional programming |
| **TypeScript** | 5 | Type safety, compile-time error checking |
| **Tailwind CSS** | 4 | Utility-first styling, responsive design |
| **Radix UI** | Latest | Accessible UI primitives |
| **Lucide React** | 1.38.0 | Icon library (40+ icons) |
| **Recharts** | 3.10.1 | Data visualization (progress charts) |
| **Google Fonts** | Inter | Professional typography |

### Development Tools
- **ESLint** — Code quality & linting
- **PostCSS** — CSS transformations
- **npm** — Package management

## 2.2 Project Structure

```
learnease/
├── src/
│   ├── app/                          # Next.js App Router pages
│   │   ├── page.tsx                  # Landing page
│   │   ├── layout.tsx                # Root layout with providers
│   │   ├── globals.css               # Global styles & design system
│   │   ├── dashboard/                # Student dashboard
│   │   ├── courses/                  # Course catalog & detail
│   │   │   └── [id]/                 # Dynamic course page
│   │   ├── my-learning/              # Enrolled courses
│   │   ├── learn/                    # Learning interface
│   │   │   └── [courseId]/[lessonId]/
│   │   ├── assignments/              # Assignment management
│   │   │   └── [id]/                 # Assignment detail
│   │   ├── quiz/                     # Quiz interface
│   │   │   └── [id]/results/         # Quiz results
│   │   ├── grades/                   # Grade overview
│   │   ├── progress/                 # Progress analytics
│   │   ├── calendar/                 # Academic calendar
│   │   ├── notifications/            # Notification feed
│   │   ├── search/                   # Full-text search
│   │   ├── profile/                  # User profile
│   │   ├── settings/                 # Account settings
│   │   ├── login/                    # Authentication
│   │   └── register/                 # User registration
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx            # Main navigation bar
│   │   │   └── CourseSidebar.tsx     # Lesson sidebar accordion
│   │   └── ui/
│   │       ├── CourseCard.tsx        # Reusable course card
│   │       ├── AssignmentCard.tsx    # Assignment card
│   │       ├── ProgressBar.tsx       # Accessible progress bar
│   │       ├── Toast.tsx             # Toast notifications
│   │       ├── Modal.tsx             # Confirmation dialogs
│   │       ├── EmptyState.tsx        # Empty state placeholders
│   │       └── LoadingSpinner.tsx    # Loading indicator
│   │
│   ├── context/
│   │   └── AppContext.tsx            # Global state (React Context)
│   │
│   ├── data/
│   │   └── mock-data.ts              # Mock database (1000+ lines)
│   │
│   ├── lib/
│   │   └── utils.ts                  # Helper functions
│   │
│   └── types/
│       └── index.ts                  # TypeScript interfaces
│
├── public/                            # Static assets
├── HCI_IMPLEMENTATION.md              # HCI design decisions
├── PROJECT_PRESENTATION.md            # 33-slide presentation
├── README.md                          # Quick start guide
├── package.json                       # Dependencies
├── tsconfig.json                      # TypeScript config
├── next.config.ts                     # Next.js config
├── tailwind.config.mjs                # Tailwind config
└── eslint.config.mjs                  # ESLint config
```

## 2.3 Data Model

### Core TypeScript Interfaces

```typescript
// User
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  bio: string;
}

// Instructor
interface Instructor {
  id: string;
  name: string;
  avatar: string;
  title: string;
  bio: string;
}

// Course & Learning
interface Course {
  id: string;
  title: string;
  instructor: Instructor;
  description: string;
  shortDescription: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  rating: number;
  reviewCount: number;
  students: number;
  image: string;
  tags: string[];
  objectives: string[];
  modules: Module[];
  price: string;
  enrolled?: boolean;
  progress?: number;
  lastLesson?: string;
  lastLessonId?: string;
  grade?: number;
  color: string;
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed: boolean;
  description?: string;
  videoUrl?: string;
  content?: string;
}

// Assessments
interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  description: string;
  instructions: string[];
  dueDate: string;
  maxScore: number;
  status: 'not_submitted' | 'submitted' | 'graded';
  grade?: number;
  feedback?: string;
  submittedAt?: string;
  submittedFile?: string;
  resources: { name: string; url: string; type: string }[];
}

interface Quiz {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  timeLimit: number;
  questions: QuizQuestion[];
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  quizId: string;
  score: number;
  total: number;
  answers: number[];
  completedAt: string;
}
```

## 2.4 State Management

### Global State (React Context)
Location: `src/context/AppContext.tsx`

Manages:
- User authentication state
- Enrolled courses
- Assignment progress
- Quiz results
- Grade tracking
- Notifications
- User preferences

### Component-Level State
- Form inputs (React useState)
- Modal open/close state
- Sidebar visibility
- Filter selections
- Search query

---

# 3. HCI Principles & Theory

## 3.1 Nielsen's 10 Usability Heuristics

### H1: Visibility of System Status
**Principle**: Always keep users informed about what is going on.

| Implementation | Example |
|---|---|
| Progress bars on courses | Dashboard shows "65% complete" |
| Lesson checkmarks | Green ✓ for completed, ○ for pending |
| Quiz timer & counter | "Question 3 of 10" with countdown |
| Status badges | Assignment: "Submitted" (blue), "Graded" (green) |
| Unread notifications | Bell icon shows count badge |
| Loading spinners | Visible while fetching data |
| Active nav highlight | Current page highlighted in navbar |

### H2: Match Between System and Real World
**Principle**: System should speak user's language.

| Implementation | Example |
|---|---|
| Academic terminology | "Assignment", "Quiz", "Grade" (not "Task", "Test") |
| Calendar format | Monthly grid (matches physical calendars) |
| Letter grades | A-F scale (familiar to students) |
| Icon semantics | BookOpen = courses, Calendar = schedule, Bell = alerts |
| Relative dates | "Due in 3 days" (more intuitive than "2026-09-04") |

### H3: User Control and Freedom
**Principle**: Users need emergency exits and undo functionality.

| Implementation | Example |
|---|---|
| Confirmation modals | "Are you sure?" before submitting assignment |
| Previous/Next buttons | Navigate between lessons without sidebar |
| Quiz review | Can change answers before final submit |
| Modal close (×) | Always closable without losing data |
| Persistent navbar | Navigate away from any page anytime |
| Back to login link | Register page has easy exit |

### H4: Consistency and Standards
**Principle**: Use consistent conventions throughout.

| Implementation | Example |
|---|---|
| Same navbar everywhere | Sticky top navigation on all 19 pages |
| Button styles | Primary (indigo-600), Secondary (slate border), Danger (red) |
| Card layouts | CourseCard and AssignmentCard follow same pattern |
| Typography | Inter font with defined scale (text-sm, text-base, etc.) |
| Color coding | Indigo=primary, Emerald=success, Amber=warning, Red=error |
| Status badges | Same colors on cards and detail pages |

### H5: Error Prevention
**Principle**: Good design prevents problems before they occur.

| Implementation | Example |
|---|---|
| Email validation | Format checked before login |
| Password strength meter | Guides users to create strong passwords |
| Confirmation modal | File name shown before assignment submit |
| Quiz validation | Warns if trying to submit unanswered questions |
| File type restrictions | Only PDF, DOCX, ZIP accepted for uploads |
| Visual warnings | Overdue assignments marked in red |

### H6: Recognition Rather Than Recall
**Principle**: Minimize memory load by making options visible.

| Implementation | Example |
|---|---|
| Breadcrumbs | Home > Courses > [Course] > [Lesson] visible |
| Course sidebar | Full module/lesson structure always visible |
| Active nav indicator | Current page highlighted (no need to remember) |
| "Continue" button | Last visited lesson available on dashboard |
| Search history | Previous query in URL for quick return |
| Card details | Course name, due date, status all visible (no extra clicks) |

### H7: Flexibility and Efficiency of Use
**Principle**: Provide accelerators for expert users.

| Implementation | Example |
|---|---|
| Full-text search | Search across all courses/lessons/assignments |
| Category filters | Narrow results by difficulty, subject |
| Keyboard navigation | Tab through all elements, Enter to activate |
| Responsive design | Same experience on mobile, tablet, desktop |
| Direct links | "Continue Learning" bypasses navigation |
| Power user actions | "Mark all as read" for notifications |

### H8: Aesthetic and Minimalist Design
**Principle**: Remove irrelevant or rarely needed information.

| Implementation | Example |
|---|---|
| Dashboard minimalism | Only relevant info: courses, deadlines, grades |
| Card essentials only | Title, instructor, rating, progress (no extra details) |
| Clean learning interface | White canvas, distraction-free for reading/video |
| Limited palette | White/slate with indigo accents (no chaos) |
| Generous whitespace | Padding between sections aids scannability |
| 2 font weights only | Regular (400) and Semibold (600) |

### H9: Help Users Recognize, Diagnose, and Recover from Errors
**Principle**: Error messages should be plain language with solutions.

| Implementation | Example |
|---|---|
| Plain language errors | "Invalid email or password. Please try again." |
| Inline validation | Field errors shown immediately after blur |
| Empty states | Icon + message + action CTA (e.g., "Browse Courses") |
| Toast feedback | Success/error/info toasts for all actions |
| 404 guidance | "No results for '[query]' — try a different keyword" |

### H10: Help and Documentation
**Principle**: Provide help and documentation if needed.

| Implementation | Example |
|---|---|
| Placeholder text | "Enter your university email" in input |
| Descriptive labels | Every form field has clear <label> |
| Quiz explanations | Correct answer explanation shown after submit |
| Icon tooltips | title attributes on icon-only buttons |
| Demo credentials | Login auto-fills for easy testing |

---

## 3.2 Accessibility (WCAG 2.1 AA)

### Semantic HTML
- ✅ Proper heading hierarchy (H1-H6)
- ✅ Semantic tags: `<nav>`, `<main>`, `<section>`, `<article>`
- ✅ Form labels associated with inputs
- ✅ List structures for lists
- ✅ Alt text on all images

### Keyboard Navigation
- ✅ All interactive elements keyboard-accessible
- ✅ Tab order logical and predictable
- ✅ `:focus-visible` outline (2px solid indigo-600)
- ✅ Escape key closes modals
- ✅ No keyboard traps
- ✅ 44×44px minimum touch targets

### Screen Reader Support
- ✅ `aria-label` on icon buttons
- ✅ `role="progressbar"` with aria-valuenow/min/max
- ✅ `aria-modal="true"` on modals (focus trap)
- ✅ `sr-only` hidden text for context
- ✅ Skip links to main content

### Visual Accessibility
- ✅ Color contrast ≥ 4.5:1 (AA standard)
- ✅ Not relying on color alone (icons + labels)
- ✅ Reduced motion support: `@media (prefers-reduced-motion: reduce)`
- ✅ Sufficient color brightness

---

## 3.3 Cognitive Science: Fitts' Law

**Formula**: Time = a + b × log₂(distance/size + 1)

**Principle**: Interaction time depends on distance to target and target size.

### LearnEase Applications

| Application | How It Reduces Time |
|---|---|
| **Large buttons (44-48px)** | Increases size, reduces selection time |
| **Sticky navbar** | Zero distance to navigation (always accessible) |
| **Grouped actions** | Related buttons close together (short travel) |
| **Direct links** | "Continue Learning" bypasses extra navigation |
| **Modal close (32px)** | Large hit area, easy to close |
| **Icon spacing** | 16-24px apart (easy to click individually) |

### Result
Users complete tasks **faster** with less effort.

---

## 3.4 Cognitive Science: Hick's Law

**Formula**: Reaction Time = a + b × log₂(n + 1)

**Principle**: Reaction time increases with number of choices.

### Traditional LMS Problem
- 20+ menu items → User takes longer to decide
- No filtering → Must browse 200+ courses
- Generic statuses → Ambiguous what to do next

### LearnEase Solutions

| Solution | Impact |
|---|---|
| **5 primary nav items** | Reduced from 20+ (quick decisions) |
| **Contextual sidebars** | Only relevant lessons shown (fewer choices) |
| **Search filters** | Category/difficulty filters (reduce paralysis) |
| **Color-coded status** | Instant visual decision (amber=pending, green=done) |
| **Progressive disclosure** | Show essential info first, details on demand |
| **Consistent patterns** | User learns pattern once, applies everywhere |

### Result
Users **make decisions faster** and experience **less cognitive load**.

---

## 3.5 Before/After Comparison

| Traditional LMS | LearnEase |
|---|---|
| 20+ cluttered menu items | 5 clear primary navigation items |
| No progress tracking visible | Progress bars on every course |
| Unclear assignment status | Color-coded badges (amber/blue/green) |
| Hidden deadline information | Calendar + dashboard deadline alerts |
| Confusing quiz workflow | Step-by-step quiz with timer & progress |
| Generic error messages | Descriptive inline errors + recovery guidance |
| No empty state feedback | Custom empty states with action CTAs |
| Desktop-only design | Mobile-first responsive design |
| No accessibility features | WCAG 2.1 AA compliant |
| High cognitive load | Hick's Law applied (fewer choices) |

---

# 4. Requirements Analysis

## 4.1 Business Requirements

### Project Context
- **Type**: University HCI (Human-Computer Interaction) course project
- **Scope**: Usability evaluation of e-learning platforms
- **Objective**: Demonstrate improvement over traditional LMS
- **Audience**: Students, instructors, HCI professionals

### Business Goals
1. ✅ Build a usable alternative to Moodle/Blackboard/Canvas
2. ✅ Demonstrate HCI principles in practice
3. ✅ Create case study for usability design
4. ✅ Provide reference implementation
5. ✅ Evaluate design decisions

## 4.2 Functional Requirements

### Learning Management
- ✅ Browse course catalog (8 courses available)
- ✅ Filter by category and difficulty
- ✅ View course details (syllabus, objectives, instructor)
- ✅ Enroll/unenroll from courses
- ✅ View enrolled courses with progress tracking
- ✅ Access learning interface (video/reading)
- ✅ Mark lessons as complete
- ✅ Track course progress percentage

### Assessment System
- ✅ View all assignments with due dates
- ✅ Submit assignments (file upload simulation)
- ✅ View assignment feedback and grades
- ✅ Take timed quizzes (multiple choice)
- ✅ Review quiz answers before final submit
- ✅ View instant quiz results and explanations
- ✅ Track quiz scores

### Progress & Analytics
- ✅ Dashboard with overview of learning status
- ✅ Progress visualization (circular progress, charts)
- ✅ Grade overview and breakdown
- ✅ Letter grade conversion (A-F)
- ✅ Academic calendar with color-coded events
- ✅ Deadline awareness and alerts

### Communication & Discovery
- ✅ Notification center (filterable feed)
- ✅ Mark notifications as read
- ✅ Full-text search across platform
- ✅ Filter search by category
- ✅ Search results highlighting

### Account Management
- ✅ User login with validation
- ✅ User registration with password strength meter
- ✅ View/edit user profile
- ✅ Account settings (notifications, theme, accessibility)
- ✅ Demo account for easy testing

### Additional Features
- ✅ 19 complete pages/routes
- ✅ Responsive design (mobile/tablet/desktop)
- ✅ Dark/light theme support
- ✅ Accessibility features (keyboard nav, screen readers)

## 4.3 Non-Functional Requirements

### Performance
- ✅ Fast page loads (Next.js optimization)
- ✅ Code splitting and lazy loading
- ✅ Optimized images
- ✅ Smooth animations (respects prefers-reduced-motion)

### Accessibility
- ✅ WCAG 2.1 AA compliance
- ✅ Keyboard navigation fully supported
- ✅ Screen reader compatible
- ✅ Color contrast ≥ 4.5:1
- ✅ Focus indicators visible on all interactive elements

### Usability
- ✅ Intuitive navigation with minimal cognitive load
- ✅ Clear feedback for all actions
- ✅ Error prevention and recovery
- ✅ Consistent design patterns throughout
- ✅ Mobile-friendly touch targets (44×44px minimum)

### Security
- ✅ Email format validation
- ✅ Password strength requirements
- ✅ Form input validation
- ✅ Type safety (TypeScript)

### Reliability
- ✅ No broken links or missing pages
- ✅ Consistent functionality across browsers
- ✅ Proper error handling
- ✅ State persistence (context management)

### Maintainability
- ✅ Component-based architecture
- ✅ Full TypeScript types
- ✅ ESLint configuration
- ✅ Clear code comments
- ✅ Documented design decisions

---

# 5. Features & Functionality

## 5.1 Core Features by Domain

### 📖 Learning Experience
1. **Course Catalog** (8 courses)
   - Browse with filtering (category, difficulty)
   - View course details (description, objectives, instructor)
   - Rating and review count
   - Enroll button

2. **Learning Interface**
   - Video player UI
   - Lesson sidebar with accordion
   - Lesson progress tracking
   - Lesson completion checkbox
   - Previous/Next navigation
   - Module overview

3. **My Learning**
   - Enrolled courses list
   - Live progress bars (% complete)
   - Continue where you left off button
   - Last visited lesson name
   - Course completion status

### 📝 Assessments
1. **Assignments**
   - List view with status, due date, course
   - Detail page with instructions
   - File upload simulation
   - Submission status tracking (Not Submitted / Submitted / Graded)
   - Instructor feedback display
   - Submission date/time tracking

2. **Quizzes**
   - Timed quiz interface
   - Multiple choice questions
   - Progress indicator (current question of total)
   - Timer countdown
   - Review and change answers before submit
   - Confirmation before final submission
   - Instant results with score
   - Explanations for correct answers

3. **Grades**
   - GPA overview
   - Per-assignment grade breakdown
   - Letter grade conversion
   - Score history
   - Performance by course

### 📊 Progress & Planning
1. **Dashboard**
   - Quick stats (GPA, current courses, upcoming deadlines)
   - Enrolled courses with progress bars
   - Continue learning button
   - Weekly activity chart
   - Achievement badges

2. **Calendar**
   - Monthly grid view
   - Color-coded event types (lectures, assignments, quizzes, exams)
   - Click to view event details
   - Deadline highlighting

3. **Progress Analytics**
   - Circular progress chart
   - Weekly activity bar chart
   - Learning streak tracking
   - Course completion percentage

4. **Notifications**
   - Filterable feed (All / Unread)
   - Timestamp on notifications
   - Mark as read (individual or all)
   - Unread count badge in navbar

### 👤 Account Management
1. **Profile**
   - User name and email
   - Bio/about section
   - Avatar image
   - Join date
   - Edit capability

2. **Settings**
   - Notification preferences
   - Theme selection (light/dark)
   - Accessibility options
   - Account information

3. **Authentication**
   - Secure login form
   - Registration with validation
   - Password strength meter
   - Demo credentials option
   - Remember me checkbox

### 🔍 Search & Discovery
1. **Global Search**
   - Full-text search across platform
   - Tab filters (All / Courses / Lessons / Assignments)
   - Live result counts
   - Result highlighting

2. **Filtering**
   - Filter by category
   - Filter by difficulty
   - Sort options

## 5.2 System States

Every data-driven view supports 4 states:

### State 1: Ideal (Full Content)
- All data loaded and displayed correctly
- Rich information available
- All interactions enabled

### State 2: Loading
- LoadingSpinner component visible
- Optional loading message
- Prevents interaction during load

### State 3: Empty
- EmptyState component with icon
- Descriptive message
- Action CTA button (e.g., "Browse Courses")
- Encourages user action

### State 4: Error
- Toast notification (red error variant)
- Clear error message
- Suggests recovery action
- Retry button available

---

# 6. Design System

## 6.1 Color Palette

### Primary Colors
```
Indigo-600: #4f46e5 — Primary brand color, buttons, focus outlines
Indigo-500: #6366f1 — Lighter primary
Indigo-700: #4338ca — Darker primary
```

### Status Colors
```
Success (Emerald):
  Emerald-500: #10b981 — Completed lessons, success messages
  Emerald-600: #059669 — Darker success

Warning (Amber):
  Amber-500: #f59e0b — Pending actions, warnings
  Amber-700: #d97706 — Darker warning

Error (Red):
  Red-500: #ef4444 — Errors, deletions
  Red-600: #dc2626 — Darker error

Info (Blue):
  Blue-500: #3b82f6 — Information messages
  Blue-600: #2563eb — Darker info
```

### Neutral Colors
```
Slate-50: #f8fafc — Very light backgrounds
Slate-100: #f1f5f9 — Light backgrounds
Slate-200: #e2e8f0 — Light borders
Slate-500: #64748b — Medium text, icons
Slate-700: #334155 — Dark text
Slate-800: #1e293b — Darker text
Slate-900: #0f172a — Darkest text

Gray-500: #6b7280 — Alternative neutral
Gray-900: #111827 — Alternative dark
```

### Theme Colors
```
Light Mode:
  Background: #ffffff (white)
  Foreground: #0f172a (dark blue)

Dark Mode:
  Background: #0f172a (dark blue)
  Foreground: #f8fafc (light slate)
```

## 6.2 Typography

### Font Family
- **Font**: Inter (Google Fonts)
- **Fallback**: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Weights Used**: 300, 400, 500, 600, 700, 800

### Font Sizes
```
text-xs:   12px
text-sm:   14px
text-base: 16px (default)
text-lg:   18px
text-xl:   20px
text-2xl:  24px
text-3xl:  30px
text-4xl:  36px
```

### Font Weights
- Regular: 400 (body text)
- Semibold: 600 (headings, labels, emphasis)

### Line Heights
- Tight: 1.25 (headings)
- Normal: 1.5 (body text)
- Relaxed: 1.75 (long-form content)

## 6.3 Spacing System

Uses Tailwind's spacing scale (4px base unit):
```
0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64
```

### Common Padding/Margin
- `p-2` (8px) — Small spacer
- `p-3` (12px) — Form labels
- `p-4` (16px) — Card padding, standard spacing
- `p-6` (24px) — Section spacing
- `p-8` (32px) — Large section spacing

## 6.4 Component Styles

### Buttons
- **Primary**: Indigo background, white text, rounded-lg
- **Secondary**: Slate border, slate text, rounded-lg
- **Danger**: Red background, white text, rounded-lg
- **Disabled**: Gray background, gray text, opacity-50
- **Size**: Standard 44-48px height for touch targets

### Cards
- **Background**: White (light) / Slate-800 (dark)
- **Border**: Subtle (1px solid slate-200)
- **Shadow**: sm (light drop shadow)
- **Padding**: p-4 (16px)
- **Radius**: rounded-lg (8px)

### Forms
- **Input**: White background, slate border, p-3, rounded-lg
- **Label**: Semibold (600), slate-700 text
- **Error**: Red border, red text, error icon
- **Focus**: 2px indigo outline, 2px offset

### Status Badges
- **Not Submitted**: Amber background (#fef08a), amber border, amber text
- **Submitted**: Blue background (#dbeafe), blue border, blue text
- **Graded**: Green background (#dcfce7), green border, green text

---

# 7. Task Analysis

## 7.1 Problem-Based Task Analysis

### Identified Pain Points
1. **Cluttered Navigation** → Overwhelming choice (Hick's Law violated)
2. **No Progress Visibility** → User confusion about status
3. **Unclear Assignment Status** → Ambiguous states lead to errors
4. **Buried Deadlines** → Important information hard to find
5. **Confusing Quiz Workflow** → High cognitive load
6. **Generic Errors** → Users don't know how to recover
7. **Desktop-Only Design** → Inaccessible on mobile

## 7.2 User Journey Mapping

### Learning Task Flow
```
1. Browse Courses
   ↓ (filter by difficulty, search)
2. View Course Details
   ↓ (description, objectives, instructor info)
3. Enroll in Course
   ↓ (click enroll, confirmation)
4. Access Learning Interface
   ↓ (see lesson sidebar, video/reading)
5. Complete Lesson
   ↓ (watch video or read content)
6. Mark Lesson Complete
   ↓ (checkbox, immediately shows progress)
7. View Progress Update
   ↓ (progress bar updates in real-time)
8. Navigate to Next Lesson
   ↓ (via sidebar or Previous/Next buttons)
9. Track Course Progress
   ↓ (percentage visible on dashboard)
```

### Assessment Task Flow
```
1. View Assignment/Quiz List
   ↓ (see due date, status, course)
2. Click Assignment/Quiz
   ↓ (navigate to detail page)
3. Read Instructions
   ↓ (full instructions displayed)
4. Complete Work
   ↓ (answer questions or upload file)
5. Review Before Submit
   ↓ (confirmation modal shows what will be submitted)
6. Submit Confirmation
   ↓ (modal with "Submit" button)
7. Receive Feedback
   ↓ (toast shows "Submitted successfully")
8. View Grade
   ↓ (grade appears in grades page)
9. View Instructor Feedback
   ↓ (detailed feedback on assignment detail)
```

### Planning Task Flow
```
1. View Dashboard
   ↓ (overview of urgent tasks)
2. See Upcoming Deadlines
   ↓ (due dates listed at top)
3. Check Calendar
   ↓ (view all events for month)
4. Navigate to Specific Item
   ↓ (click assignment/quiz on calendar)
5. Check Notifications
   ↓ (see new alerts/messages)
6. Mark As Read
   ↓ (individual or batch)
7. View Learning Analytics
   ↓ (progress charts on progress page)
8. Track Performance
   ↓ (grades page shows history)
```

## 7.3 Cognitive Task Analysis

### Task: "Enroll in a Course"

**Cognitive Steps User Must Take**:
1. **Recognize Need** — User needs to find a course
2. **Search/Browse** — Use search or browse catalog
3. **Evaluate Fit** — Read description, check difficulty, see instructor
4. **Make Decision** — Decide to enroll
5. **Execute Action** — Click enroll button
6. **Confirm Success** — See confirmation (toast notification)

**Design Solutions Applied**:
- ✅ Clear course cards (all essential info visible)
- ✅ Difficulty badges (instant evaluation)
- ✅ Instructor photos (social proof)
- ✅ Prominent "Enroll" button (clear CTA)
- ✅ Confirmation feedback (success toast)
- ✅ Appears in "My Learning" (visual confirmation)

### Task: "Submit an Assignment"

**Cognitive Steps User Must Take**:
1. **Locate Assignment** — Find in assignments list or dashboard
2. **Read Instructions** — Understand requirements
3. **Complete Work** — Do the assignment
4. **Review Before Submit** — Check work is correct
5. **Confirm Submission** — Agree to submit
6. **Verify Status Change** — Confirm status is now "Submitted"

**Design Solutions Applied**:
- ✅ Sticky navbar (easy navigation to assignments)
- ✅ Clear instructions (full text, not truncated)
- ✅ Confirmation modal (prevents accidental submit)
- ✅ File name shown in modal (user knows what uploading)
- ✅ Toast notification (immediate feedback)
- ✅ Status badge updates (visual confirmation)

## 7.4 Error Analysis (Common Mistakes)

### Error 1: Missing Assignment Deadline

**Scenario**: Student forgets when assignment is due  
**Consequence**: Missed deadline, zero grade  
**Prevention Applied**:
- ✅ Due date on dashboard
- ✅ Due date on assignment card
- ✅ Calendar event shows deadline
- ✅ Notifications alert about due dates
- ✅ Overdue assignments marked in RED (high visibility)

### Error 2: Confusion About Assignment Status

**Scenario**: Student doesn't know if assignment was submitted  
**Consequence**: Resubmits or assumes submitted when not  
**Prevention Applied**:
- ✅ Color-coded status badges (amber/blue/green)
- ✅ Status visible on card AND detail page
- ✅ Timestamp of submission shown
- ✅ Confirmation modal before submit (no accidental submit)
- ✅ Toast confirms "Submitted successfully"

### Error 3: Taking Quiz When Unprepared

**Scenario**: Student starts quiz without reviewing material  
**Consequence**: Low score, wasted time  
**Prevention Applied**:
- ✅ Prerequisites info in course description
- ✅ Lesson completion status visible
- ✅ Ability to review course before quiz
- ✅ Quiz instructions shown before starting
- ✅ Quiz can be reviewed before final submit

### Error 4: Lost in Course Navigation

**Scenario**: Student doesn't know where they are in course  
**Consequence**: Wasted time navigating, skipped lessons  
**Prevention Applied**:
- ✅ Breadcrumbs show path (Home > Course > Lesson)
- ✅ Course sidebar always visible (structure clear)
- ✅ Active lesson highlighted
- ✅ Progress bar shows completion %
- ✅ Module accordion shows completed lessons

## 7.5 State-Based Task Analysis

### Task: "View My Grades"

| State | User Experience | Design |
|-------|-----------------|--------|
| **Ideal** | All grades displayed with details | Full grades table with scores, dates, feedback |
| **Loading** | Waiting for data | LoadingSpinner with "Loading grades..." |
| **Empty** | No grades yet | EmptyState: "No grades yet" + "Take a Quiz" CTA |
| **Error** | Can't load grades | Toast: "Failed to load grades" + Retry button |

---

# 8. Testing Strategy

## 8.1 Current Testing Approach

### Manual Testing (Currently Implemented)
- ✅ Demo account testing (alex.johnson@university.edu)
- ✅ User workflow validation (complete courses, quizzes, etc.)
- ✅ Responsive design verification (mobile/tablet/desktop)
- ✅ Accessibility audits (keyboard nav, screen readers)
- ✅ Cross-browser testing (Chrome, Firefox, Safari)

### Heuristic Evaluation (Currently Implemented)
- ✅ Against Nielsen's 10 heuristics
- ✅ HCI principles review
- ✅ Usability expert assessment
- ✅ Design pattern consistency

### Accessibility Testing (Currently Implemented)
- ✅ Manual keyboard navigation (Tab, Enter, Escape)
- ✅ Screen reader testing (NVDA, JAWS, VoiceOver)
- ✅ WAVE validator (automated accessibility check)
- ✅ Lighthouse audit (performance + accessibility)
- ✅ Color contrast checker (4.5:1 standard)

## 8.2 Recommended Testing (Not Yet Implemented)

### Unit Tests
**Framework**: Vitest + Jest

**Test Utilities**:
```typescript
- formatDate() function
- formatRelativeDate() function
- formatTime() function
- emailValidation regex
- passwordStrengthCalculation
```

**Setup**:
```bash
npm install -D vitest @vitest/ui testing-library/react
```

### Component Tests
**Framework**: Vitest + React Testing Library

**Test Components**:
```
- CourseCard rendering
- AssignmentCard status badges
- Modal open/close
- Login form validation
- ProgressBar accessibility
- EmptyState messages
- Toast notifications
```

### Accessibility Automation
**Framework**: axe-core, jest-axe

**Automated Checks**:
```typescript
- ARIA role correctness
- Color contrast validation
- Focus management
- Form label association
- Keyboard navigation
```

### End-to-End Tests
**Framework**: Playwright

**Test User Journeys**:
```
1. Login → Dashboard → Enroll Course → Learn Lesson
2. View Assignment → Submit File → Check Status
3. Start Quiz → Answer Questions → View Results
4. Check Calendar → See Deadlines → View Notifications
5. Search Courses → Filter by Difficulty → Enroll
```

### Visual Regression Tests
**Framework**: Percy or Chromatic

**Monitor**:
- Component visual changes
- Responsive breakpoint layouts
- Theme changes (light/dark)
- Hover/focus states

## 8.3 Testing Checklist

### Functional Testing
- [ ] All 19 pages load correctly
- [ ] Navigation works on all pages
- [ ] Forms submit and validate
- [ ] Data displays correctly
- [ ] Filters work as expected
- [ ] Search returns correct results
- [ ] Modals open/close properly
- [ ] State updates correctly

### Accessibility Testing
- [ ] Keyboard navigation works (Tab, Shift+Tab)
- [ ] All buttons/links activatable with Enter
- [ ] Modals closable with Escape
- [ ] Focus indicators visible
- [ ] Color contrast ≥ 4.5:1
- [ ] All images have alt text
- [ ] Form labels associated with inputs
- [ ] Screen reader compatible

### Responsive Testing
- [ ] Mobile layout (< 640px) displays correctly
- [ ] Tablet layout (640-1024px) displays correctly
- [ ] Desktop layout (> 1024px) displays correctly
- [ ] Touch targets ≥ 44×44px
- [ ] Text readable on small screens
- [ ] Images scale appropriately

### Performance Testing
- [ ] Page load time < 3 seconds
- [ ] Lighthouse score ≥ 80
- [ ] No console errors
- [ ] Smooth animations (60fps)
- [ ] No memory leaks

---

# 9. Customization Guide

## 9.1 Changing Colors

### Global Background Color

**File**: `src/app/globals.css`

**Current Code**:
```css
:root {
  --background: #ffffff;
  --foreground: #0f172a;
  --primary: #4f46e5;
  --primary-foreground: #ffffff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f172a;
    --foreground: #f8fafc;
  }
}
```

**To Change**:

1. **Light mode background** (white to your color):
```css
:root {
  --background: #f3f4f6;  /* Light gray */
  /* Or: #0f172a dark blue, #e8f5e9 light green, #fef3c7 light yellow */
}
```

2. **Dark mode background** (dark blue to your color):
```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: #ff8c00;  /* Orange example */
  }
}
```

**Browser Reloads**: Changes auto-reload in dev server

### Primary Color (Indigo to Another Color)

**Option 1**: Edit globals.css
```css
:root {
  --primary: #06b6d4;  /* Cyan */
  /* Or: #8b5cf6 purple, #10b981 green, #f59e0b amber */
}
```

**Option 2**: Find and Replace in Components

Search for: `indigo-600`  
Replace with: `blue-600` (or your Tailwind color)

Files to update:
- `src/components/layout/Navbar.tsx`
- `src/components/layout/CourseSidebar.tsx`
- `src/components/ui/*.tsx`
- `src/app/globals.css` (:focus-visible outline)

### Status Badge Colors

**File**: `src/components/ui/AssignmentCard.tsx`

```typescript
const statusStyles = {
  not_submitted: {
    className: "bg-amber-50 text-amber-700 border-amber-200"  // Change these
  },
  submitted: {
    className: "bg-blue-50 text-blue-700 border-blue-200"
  },
  graded: {
    className: "bg-green-50 text-green-700 border-green-200"
  }
}
```

**Example**: Change "submitted" from blue to purple:
```typescript
submitted: {
  className: "bg-purple-50 text-purple-700 border-purple-200"
}
```

## 9.2 Changing Fonts

### Currently Using
- Font: Inter (Google Fonts)
- Import: `src/app/globals.css`

### To Change Font

**Step 1**: Import new font in `globals.css`
```css
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;600&display=swap');
```

**Step 2**: Update font-family
```css
body {
  font-family: 'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}
```

**Other Font Options**:
- Poppins
- Open Sans
- Lato
- Playfair Display

## 9.3 Adding New Pages/Routes

### File-Based Routing (Next.js App Router)

**To Add New Page**:

1. Create folder in `src/app/`:
```
src/app/new-feature/page.tsx
```

2. Add component:
```typescript
export default function NewFeaturePage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-semibold mb-4">New Feature</h1>
      {/* Your content here */}
    </main>
  );
}
```

3. Route automatically available at `/new-feature`

### Adding Dynamic Routes

**To Add Route with Parameter**:

1. Create folder: `src/app/items/[id]/page.tsx`

2. Add component:
```typescript
export default function ItemDetailPage({ params }: { params: { id: string } }) {
  return (
    <main>
      <h1>Item {params.id}</h1>
    </main>
  );
}
```

3. Accessible at `/items/123`, `/items/abc`, etc.

## 9.4 Adding New Components

### Creating a Reusable Component

**Location**: `src/components/ui/NewComponent.tsx`

**Template**:
```typescript
import React from 'react';
import { cn } from '@/lib/utils';

interface NewComponentProps {
  title: string;
  description?: string;
  className?: string;
}

export default function NewComponent({
  title,
  description,
  className
}: NewComponentProps) {
  return (
    <div className={cn("p-4 bg-white rounded-lg border", className)}>
      <h2 className="font-semibold text-lg">{title}</h2>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}
```

**Usage**:
```typescript
import NewComponent from '@/components/ui/NewComponent';

<NewComponent 
  title="My Component"
  description="This is a new component"
/>
```

## 9.5 Modifying Mock Data

**File**: `src/data/mock-data.ts`

**To Add Course**:
```typescript
{
  id: 'course-9',
  title: 'Your New Course',
  instructor: { /* instructor data */ },
  description: 'Course description',
  shortDescription: 'Short desc',
  category: 'Technology',
  difficulty: 'Beginner',
  duration: '4 weeks',
  rating: 4.8,
  reviewCount: 245,
  students: 1200,
  image: '/course-image.jpg',
  tags: ['tag1', 'tag2'],
  objectives: ['Learn this', 'Learn that'],
  modules: [ /* modules */ ],
  price: '$49.99',
  color: 'from-blue-500 to-blue-600'
}
```

---

# 10. Development Workflow

## 10.1 Prerequisites

```bash
Node.js 18+ (check: node --version)
npm or yarn (check: npm --version)
Git (optional, for version control)
```

## 10.2 Installation

```bash
# 1. Navigate to project
cd learnease

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser
http://localhost:3000
```

## 10.3 Available Commands

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Create production build
npm start        # Start production server
npm run lint     # Run ESLint code quality check
```

## 10.4 Development Tips

### TypeScript
- Catch type errors at compile time
- Hover over variables to see types
- Use IntelliSense for autocomplete

### Tailwind CSS
- Use utility classes for styling
- Hot-reload: changes appear instantly
- No need to write CSS files
- Responsive: `md:`, `lg:`, `xl:` prefixes

### Browser DevTools
- React DevTools extension (view component tree)
- Network tab (check API calls)
- Console (see errors and logs)
- Lighthouse (performance audit)

### File Structure
- Put components in `src/components/`
- Put pages in `src/app/`
- Put utilities in `src/lib/`
- Put types in `src/types/`
- Put data in `src/data/`

## 10.5 Editing Files

### CSS Changes
- Edit: `src/app/globals.css` or component className
- Result: Instant browser reload
- No build step needed

### Component Changes
- Edit: `src/components/*.tsx`
- Result: Instant browser reload
- TypeScript errors shown in terminal

### Type Changes
- Edit: `src/types/index.ts`
- Update all files that import changed type
- TypeScript shows errors in IDE

### Mock Data Changes
- Edit: `src/data/mock-data.ts`
- Result: Instant browser reload
- No database needed

---

# 11. Appendices

## Appendix A: Complete Color Reference

### All Tailwind Colors Used

```
Indigo:
  indigo-50:  #eef2ff
  indigo-100: #e0e7ff
  indigo-200: #c7d2fe
  indigo-300: #a5b4fc
  indigo-400: #818cf8
  indigo-500: #6366f1
  indigo-600: #4f46e5 (PRIMARY)
  indigo-700: #4338ca
  indigo-800: #3730a3
  indigo-900: #312e81

Slate:
  slate-50:   #f8fafc
  slate-100:  #f1f5f9
  slate-200:  #e2e8f0 (BORDER)
  slate-300:  #cbd5e1
  slate-400:  #94a3b8
  slate-500:  #64748b (TEXT)
  slate-600:  #475569
  slate-700:  #334155
  slate-800:  #1e293b
  slate-900:  #0f172a

Emerald (Success):
  emerald-50:  #f0fdf4
  emerald-100: #dcfce7
  emerald-500: #10b981 (SUCCESS)
  emerald-600: #059669

Amber (Warning):
  amber-50:   #fffbeb
  amber-100:  #fef3c7
  amber-500:  #f59e0b (WARNING)
  amber-700:  #d97706

Red (Error):
  red-50:    #fef2f2
  red-100:   #fee2e2
  red-500:   #ef4444 (ERROR)
  red-600:   #dc2626

Green (Success alternative):
  green-50:  #f0fdf4
  green-100: #dcfce7
  green-500: #22c55e
  green-600: #16a34a

Blue (Info):
  blue-50:   #eff6ff
  blue-100:  #dbeafe
  blue-500:  #3b82f6 (INFO)
  blue-600:  #2563eb

Gray (Neutral):
  gray-50:   #f9fafb
  gray-100:  #f3f4f6
  gray-500:  #6b7280
  gray-900:  #111827
```

## Appendix B: Component Props Reference

### CourseCard
```typescript
interface CourseCardProps {
  course: Course;
  showProgress?: boolean;
  isEnrolled?: boolean;
  onClick?: () => void;
}
```

### AssignmentCard
```typescript
interface AssignmentCardProps {
  assignment: Assignment;
  onSubmit?: (id: string) => void;
  showCourse?: boolean;
}
```

### ProgressBar
```typescript
interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}
```

### EmptyState
```typescript
interface EmptyStateProps {
  icon: React.ComponentType;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
  };
}
```

### Toast
```typescript
toast.success(message: string);
toast.error(message: string);
toast.info(message: string);
toast.dismiss(id?: string);
```

## Appendix C: Keyboard Shortcuts

### Navigation
- `Tab` — Move to next interactive element
- `Shift+Tab` — Move to previous element
- `Enter` — Activate button/link
- `Space` — Toggle checkbox/button

### Modals/Dialogs
- `Escape` — Close modal
- `Enter` — Submit form
- `Tab` — Focus trap (within modal)

### Forms
- `Tab` — Move between fields
- `Arrow Keys` — Select radio/select options
- `Enter` — Submit form
- `Space` — Toggle checkbox

### Accessibility
- `Alt + /` — Many browsers' search keyboard
- Screen Reader: `Alt + Up/Down` (Windows) or `Option + Up/Down` (Mac)

## Appendix D: Troubleshooting

### Issue: npm install fails

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Issue: TypeScript errors

**Solution**:
```bash
# Generate types
npm run dev

# Check tsconfig.json for strict mode settings
```

### Issue: Tailwind classes not applying

**Solution**:
1. Ensure class name is complete (no string concatenation)
2. Restart dev server
3. Check tailwind.config.mjs `content` array

### Issue: Page not found (404)

**Solution**:
1. Check file is in `src/app/` folder
2. Filename should be `page.tsx`
3. Restart dev server
4. Clear browser cache

### Issue: Dark mode not working

**Solution**:
1. Check `next-themes` provider in `layout.tsx`
2. Ensure `prefers-color-scheme` media query in globals.css
3. Use `class` strategy in Tailwind (not `media`)

## Appendix E: Resources & References

### HCI & Usability
- Nielsen, J. (1994). *10 Usability Heuristics*
- Norman, D. (2013). *The Design of Everyday Things*
- Fitts, P. (1954). *The information capacity of the human motor system*
- Hick, W. E. (1952). *On the rate of gain of information*
- WCAG 2.1 AA Standards: https://www.w3.org/WAI/WCAG21/quickref/

### Technologies
- Next.js Documentation: https://nextjs.org/docs
- React Documentation: https://react.dev
- TypeScript Documentation: https://www.typescriptlang.org/docs
- Tailwind CSS: https://tailwindcss.com/docs
- Radix UI: https://www.radix-ui.com

### Tools
- ESLint: https://eslint.org
- Lighthouse: https://developers.google.com/web/tools/lighthouse
- WAVE Validator: https://wave.webaim.org
- axe DevTools: https://www.deque.com/axe/devtools/

---

# Document Summary

This document comprehensively covers:
- ✅ Project overview and goals
- ✅ Complete technical architecture
- ✅ All HCI principles applied
- ✅ Detailed requirements analysis
- ✅ Complete feature inventory
- ✅ Design system specifications
- ✅ Task analysis methodology
- ✅ Testing strategies
- ✅ Customization and development guide
- ✅ Troubleshooting and resources

**For additional information**, refer to:
- `README.md` — Quick start guide
- `HCI_IMPLEMENTATION.md` — Detailed HCI decisions
- `PROJECT_PRESENTATION.md` — 33-slide presentation
- Code comments in `src/` folder

---

**Document Generated**: 2026-09-01  
**Project Status**: Production-Ready  
**Last Updated**: 2026-09-01

