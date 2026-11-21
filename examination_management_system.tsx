import React, { useState, useEffect, useContext, createContext, useMemo, useRef } from 'react';
import {
  ShieldCheck,
  GraduationCap,
  Shield,
  BookOpen,
  Users,
  Award,
  AlertTriangle,
  Plus,
  Trash2,
  Edit3,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  LogOut,
  LogIn,
  UserPlus,
  Radio,
  Send,
  FileText,
  Download,
  Moon,
  Sun,
  ChevronRight,
  ChevronLeft,
  Flag,
  Eye,
  Code,
  Database,
  Server,
  Layers,
  Terminal,
  Bell,
  Play,
  BarChart2,
  Copy,
  Check,
  X,
  Lock,
  Sparkles,
  RefreshCw,
  CheckSquare
} from 'lucide-react';

// ============================================================================
// 1. INITIAL SEED DATA & LOCALSTORAGE KEYS
// ============================================================================

const STORAGE_KEYS = {
  USER: 'exampulse_v2_current_user',
  USERS: 'exampulse_v2_users',
  EXAMS: 'exampulse_v2_exams',
  SUBMISSIONS: 'exampulse_v2_submissions',
  THEME: 'exampulse_v2_theme'
};

const SEED_USERS = [
  {
    id: 'usr-admin-1',
    name: 'Dr. Kavita Nair',
    email: 'admin@exampulse.edu',
    password: 'Password123',
    role: 'admin',
    department: 'Department of Computer Science'
  },
  {
    id: 'usr-student-1',
    name: 'Aarav Sharma',
    email: 'student@exampulse.edu',
    password: 'Password123',
    role: 'student',
    rollNo: 'CS2026-104'
  },
  {
    id: 'usr-student-2',
    name: 'Priya Deshmukh',
    email: 'priya@exampulse.edu',
    password: 'Password123',
    role: 'student',
    rollNo: 'CS2026-118'
  }
];

const SEED_EXAMS = [
  {
    id: 'exam-101',
    title: 'Full-Stack Web Engineering Midterm',
    subject: 'Computer Science',
    description: 'Evaluates React Hooks, RESTful API status codes, MongoDB Mongoose population, and JWT authentication.',
    durationMinutes: 15,
    passPercentage: 60,
    isPublished: true,
    createdAt: '2026-11-18',
    questions: [
      {
        id: 'q-101-1',
        prompt: 'Which HTTP status code should a RESTful API return when a POST request successfully creates a new resource?',
        options: ['200 OK', '201 Created', '204 No Content', '403 Forbidden'],
        correctIndex: 1,
        marks: 10,
        explanation: '201 Created indicates that the request has been fulfilled and resulted in a new resource being created.'
      },
      {
        id: 'q-101-2',
        prompt: 'Why is a cleanup function returned inside React’s useEffect hook?',
        options: [
          'To force an immediate synchronous re-render',
          'To clear active timers, subscriptions, or WebSocket listeners on unmount',
          'To replace Context API providers',
          'To compile Tailwind utility classes'
        ],
        correctIndex: 1,
        marks: 10,
        explanation: 'Cleanup functions run before the component unmounts or before re-running the effect, preventing memory leaks.'
      },
      {
        id: 'q-101-3',
        prompt: 'Which Mongoose method automatically replaces referenced ObjectIds with full documents from another collection?',
        options: ['.aggregate()', '.populate()', '.lean()', '.validate()'],
        correctIndex: 1,
        marks: 10,
        explanation: 'Mongoose .populate() resolves ObjectId references defined via ref in a schema.'
      },
      {
        id: 'q-101-4',
        prompt: 'Why is bcrypt preferred over plain SHA-256 for storing user passwords in MongoDB?',
        options: [
          'bcrypt encrypts passwords reversibly for admin recovery',
          'bcrypt incorporates automatic per-password salting and a configurable work factor to resist brute-force attacks',
          'SHA-256 is deprecated in Node.js',
          'bcrypt reduces index size in MongoDB'
        ],
        correctIndex: 1,
        marks: 10,
        explanation: 'bcrypt is an adaptive hashing algorithm with built-in salt generation and tunable computational cost.'
      },
      {
        id: 'q-101-5',
        prompt: 'What is the primary purpose of a .dockerignore file when building a container image?',
        options: [
          'To encrypt .env secrets inside the container',
          'To exclude local artifacts like node_modules and .git from the Docker build context',
          'To expose container ports automatically',
          'To configure GitHub Actions runners'
        ],
        correctIndex: 1,
        marks: 10,
        explanation: '.dockerignore keeps container images small and prevents host-specific dependencies from overwriting container installs.'
      }
    ]
  },
  {
    id: 'exam-102',
    title: 'Database Systems & Normalization Quiz',
    subject: 'Data Engineering',
    description: 'Covers ACID transaction properties, B+ Tree indexing, and Third Normal Form (3NF) decomposition.',
    durationMinutes: 10,
    passPercentage: 50,
    isPublished: true,
    createdAt: '2026-11-19',
    questions: [
      {
        id: 'q-102-1',
        prompt: 'Which ACID property guarantees that once a transaction is committed, its changes survive power failures?',
        options: ['Atomicity', 'Consistency', 'Isolation', 'Durability'],
        correctIndex: 3,
        marks: 10,
        explanation: 'Durability ensures committed data is written to non-volatile storage.'
      },
      {
        id: 'q-102-2',
        prompt: 'What data structure is most widely used by database engines for standard range and equality indexes?',
        options: ['LIFO Stack', 'B-Tree / B+ Tree', 'Circular Queue', 'Adjacency List'],
        correctIndex: 1,
        marks: 10,
        explanation: 'B+ Trees maintain sorted data and allow O(log n) searches, sequential scans, insertions, and deletions.'
      },
      {
        id: 'q-102-3',
        prompt: 'A table in Second Normal Form (2NF) is also in Third Normal Form (3NF) if it contains no:',
        options: ['Composite primary keys', 'Transitive functional dependencies', 'Foreign key constraints', 'Nullable columns'],
        correctIndex: 1,
        marks: 10,
        explanation: '3NF eliminates transitive dependencies where non-prime attributes depend on other non-prime attributes.'
      }
    ]
  },
  {
    id: 'exam-103',
    title: 'Cloud Architecture & DevOps Final',
    subject: 'Cloud Computing',
    description: 'Draft exam covering multi-stage Docker builds, Kubernetes pods, and GitHub Actions CI/CD workflows.',
    durationMinutes: 25,
    passPercentage: 70,
    isPublished: false,
    createdAt: '2026-11-21',
    questions: [
      {
        id: 'q-103-1',
        prompt: 'In GitHub Actions, which property specifies the runner operating system for a job?',
        options: ['runs-on', 'uses', 'needs', 'strategy'],
        correctIndex: 0,
        marks: 10,
        explanation: 'runs-on defines the virtual environment (e.g., ubuntu-latest) that executes the job steps.'
      }
    ]
  }
];

const SEED_SUBMISSIONS = [
  {
    id: 'sub-501',
    examId: 'exam-101',
    examTitle: 'Full-Stack Web Engineering Midterm',
    studentId: 'usr-student-2',
    studentName: 'Priya Deshmukh',
    rollNo: 'CS2026-118',
    score: 40,
    totalMarks: 50,
    percentage: 80,
    passed: true,
    tabSwitches: 0,
    submittedAt: '2026-11-20 11:15 AM',
    answers: {
      'q-101-1': 1,
      'q-101-2': 1,
      'q-101-3': 0,
      'q-101-4': 1,
      'q-101-5': 1
    }
  }
];

const SEED_LIVE_CANDIDATES = [
  {
    id: 'cand-1',
    studentName: 'Priya Deshmukh',
    rollNo: 'CS2026-118',
    examTitle: 'Full-Stack Web Engineering Midterm',
    progress: '5/5',
    warnings: 0,
    status: 'Submitted',
    lastActive: '2m ago'
  },
  {
    id: 'cand-2',
    studentName: 'Rohan Kulkarni',
    rollNo: 'CS2026-132',
    examTitle: 'Full-Stack Web Engineering Midterm',
    progress: '3/5',
    warnings: 1,
    status: 'In Progress',
    lastActive: 'Live now'
  },
  {
    id: 'cand-3',
    studentName: 'Ananya Verma',
    rollNo: 'CS2026-145',
    examTitle: 'Database Systems & Normalization Quiz',
    progress: '2/3',
    warnings: 0,
    status: 'In Progress',
    lastActive: 'Live now'
  }
];

// ============================================================================
// 2. CUSTOM HOOKS & AUTH CONTEXT
// ============================================================================

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}

/**
 * Custom Hook: useExamTimer
 * Manages a second-by-second countdown with proper useEffect cleanup and auto-submission trigger.
 */
function useExamTimer(durationSeconds, isActive, onExpire) {
  const [secondsLeft, setSecondsLeft] = useState(durationSeconds);
  const onExpireRef = useRef(onExpire);

  useEffect(() => {
    onExpireRef.current = onExpire;
  }, [onExpire]);

  useEffect(() => {
    setSecondsLeft(durationSeconds);
  }, [durationSeconds]);

  useEffect(() => {
    if (!isActive) return;

    const intervalId = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);
          onExpireRef.current?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isActive]);

  const formatted = useMemo(() => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [secondsLeft]);

  return { secondsLeft, formatted };
}

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

// ============================================================================
// 3. MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Theme state persisted in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.THEME) === 'dark';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Users & Current Authenticated User (persisted in localStorage)
  const [users, setUsers] = useState(() => loadFromStorage(STORAGE_KEYS.USERS, SEED_USERS));
  const [currentUser, setCurrentUser] = useState(() => loadFromStorage(STORAGE_KEYS.USER, null));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  // Exams & Submissions persisted in localStorage
  const [exams, setExams] = useState(() => loadFromStorage(STORAGE_KEYS.EXAMS, SEED_EXAMS));
  const [submissions, setSubmissions] = useState(() =>
    loadFromStorage(STORAGE_KEYS.SUBMISSIONS, SEED_SUBMISSIONS)
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXAMS, JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUBMISSIONS, JSON.stringify(submissions));
  }, [submissions]);

  // Real-Time Proctoring & Broadcast Simulation State
  const [liveCandidates, setLiveCandidates] = useState(SEED_LIVE_CANDIDATES);
  const [proctorAlerts, setProctorAlerts] = useState([
    {
      id: 'al-1',
      message: 'Tab-switch focus loss detected for Rohan Kulkarni (Warning #1)',
      timestamp: '10:42 AM'
    }
  ]);
  const [announcements, setAnnouncements] = useState([
    {
      id: 'ann-1',
      text: 'Welcome to ExamPulse Fall 2026 Portal. Ensure a stable browser session before launching an exam.',
      sender: 'Dr. Kavita Nair',
      timestamp: '09:30 AM'
    }
  ]);

  // Navigation, Toast & Active Session States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [activeExamId, setActiveExamId] = useState(null);
  const [inspectSubmissionId, setInspectSubmissionId] = useState(null);
  const [toasts, setToasts] = useState([]);

  // BroadcastChannel for cross-tab real-time sync if user opens 2 tabs!
  const channelRef = useRef(null);

  const notify = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4200);
  };

  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('exampulse_realtime_ws');
      channelRef.current = bc;
      bc.onmessage = (event) => {
        const { type, payload } = event.data || {};
        if (type === 'BROADCAST_ANNOUNCEMENT') {
          setAnnouncements((prev) => [payload, ...prev]);
          notify(`Live Notice: ${payload.text}`, 'info');
        } else if (type === 'PROCTOR_VIOLATION') {
          setProctorAlerts((prev) => [payload.alert, ...prev]);
          setLiveCandidates((prev) =>
            prev.map((c) =>
              c.studentName === payload.studentName
                ? { ...c, warnings: payload.warnings, lastActive: 'Alert just now' }
                : c
            )
          );
        }
      };
      return () => bc.close();
    }
  }, []);

  // Simulated WebSocket background progress heartbeat
  useEffect(() => {
    const timer = setInterval(() => {
      setLiveCandidates((prev) =>
        prev.map((cand) => {
          if (cand.status === 'In Progress' && Math.random() > 0.65) {
            const [curr, total] = cand.progress.split('/').map(Number);
            if (curr < total) {
              return { ...cand, progress: `${curr + 1}/${total}`, lastActive: 'Live now' };
            }
          }
          return cand;
        })
      );
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  // Auth Methods
  const login = (email, password) => {
    const matched = users.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );
    if (!matched) {
      throw new Error('No account found with that email address.');
    }
    if (password && matched.password !== password) {
      throw new Error('Invalid credentials. Use Password123 for demo accounts.');
    }
    setCurrentUser(matched);
    setActiveTab('dashboard');
    setActiveExamId(null);
    setInspectSubmissionId(null);
    notify(`Signed in as ${matched.name} (${matched.role.toUpperCase()})`, 'success');
    return matched;
  };

  const register = ({ name, email, password, role, rollNo }) => {
    if (users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const createdUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      role: role === 'admin' ? 'admin' : 'student',
      rollNo:
        role === 'student'
          ? rollNo?.trim() || `CS2026-${Math.floor(150 + Math.random() * 800)}`
          : undefined,
      department: role === 'admin' ? 'Faculty of Engineering' : undefined
    };
    setUsers((prev) => [...prev, createdUser]);
    setCurrentUser(createdUser);
    setActiveTab('dashboard');
    setActiveExamId(null);
    setInspectSubmissionId(null);
    notify(`Account registered! Welcome, ${createdUser.name}.`, 'success');
    return createdUser;
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveExamId(null);
    setInspectSubmissionId(null);
    setActiveTab('dashboard');
    notify('Logged out securely.', 'info');
  };

  // Exam CRUD Handlers
  const saveExam = (examPayload) => {
    if (examPayload.id) {
      setExams((prev) => prev.map((ex) => (ex.id === examPayload.id ? examPayload : ex)));
      notify(`Updated assessment "${examPayload.title}"`, 'success');
    } else {
      const created = {
        ...examPayload,
        id: `exam-${Date.now()}`,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setExams((prev) => [created, ...prev]);
      notify(`Created assessment "${created.title}"`, 'success');
    }
  };

  const togglePublishExam = (examId) => {
    setExams((prev) =>
      prev.map((ex) => (ex.id === examId ? { ...ex, isPublished: !ex.isPublished } : ex))
    );
    notify('Exam visibility status updated.', 'info');
  };

  const deleteExam = (examId) => {
    setExams((prev) => prev.filter((ex) => ex.id !== examId));
    notify('Assessment deleted.', 'info');
  };

  // Proctoring & Broadcast Handlers
  const broadcastAnnouncement = (text) => {
    if (!text.trim()) return;
    const notice = {
      id: `ann-${Date.now()}`,
      text: text.trim(),
      sender: currentUser?.name || 'Proctor Admin',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAnnouncements((prev) => [notice, ...prev]);
    channelRef.current?.postMessage({ type: 'BROADCAST_ANNOUNCEMENT', payload: notice });
    notify('Live announcement broadcasted to all candidates!', 'success');
  };

  const recordViolation = (studentName, rollNo, examTitle, warningsCount) => {
    const alertObj = {
      id: `al-${Date.now()}`,
      message: `Tab-switch focus loss detected for ${studentName} (${rollNo}) — Warning #${warningsCount}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setProctorAlerts((prev) => [alertObj, ...prev]);
    setLiveCandidates((prev) => {
      const exists = prev.some((c) => c.studentName === studentName && c.examTitle === examTitle);
      if (exists) {
        return prev.map((c) =>
          c.studentName === studentName && c.examTitle === examTitle
            ? { ...c, warnings: warningsCount, lastActive: 'Violation logged' }
            : c
        );
      }
      return [
        {
          id: `cand-${Date.now()}`,
          studentName,
          rollNo,
          examTitle,
          progress: 'In Progress',
          warnings: warningsCount,
          status: 'In Progress',
          lastActive: 'Violation logged'
        },
        ...prev
      ];
    });
    channelRef.current?.postMessage({
      type: 'PROCTOR_VIOLATION',
      payload: { studentName, warnings: warningsCount, alert: alertObj }
    });
  };

  // Student Exam Start & Submit Handlers
  const handleStartExam = (exam) => {
    setActiveExamId(exam.id);
    setLiveCandidates((prev) => [
      {
        id: `cand-${Date.now()}`,
        studentName: currentUser.name,
        rollNo: currentUser.rollNo || 'N/A',
        examTitle: exam.title,
        progress: `1/${exam.questions.length}`,
        warnings: 0,
        status: 'In Progress',
        lastActive: 'Live now'
      },
      ...prev.filter((c) => !(c.studentName === currentUser.name && c.examTitle === exam.title))
    ]);
  };

  const handleSubmitExam = (exam, answers, tabSwitches) => {
    let score = 0;
    let totalMarks = 0;
    exam.questions.forEach((q) => {
      const qMarks = q.marks || 10;
      totalMarks += qMarks;
      if (answers[q.id] === q.correctIndex) {
        score += qMarks;
      }
    });
    const percentage = totalMarks > 0 ? Math.round((score / totalMarks) * 100) : 0;
    const passed = percentage >= exam.passPercentage;

    const submissionRecord = {
      id: `sub-${Date.now()}`,
      examId: exam.id,
      examTitle: exam.title,
      studentId: currentUser.id,
      studentName: currentUser.name,
      rollNo: currentUser.rollNo || 'N/A',
      score,
      totalMarks,
      percentage,
      passed,
      tabSwitches,
      submittedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      answers
    };

    setSubmissions((prev) => [submissionRecord, ...prev]);
    setLiveCandidates((prev) =>
      prev.map((c) =>
        c.studentName === currentUser.name && c.examTitle === exam.title
          ? {
              ...c,
              progress: `${exam.questions.length}/${exam.questions.length}`,
              warnings: tabSwitches,
              status: 'Submitted',
              lastActive: 'Just now'
            }
          : c
      )
    );

    setActiveExamId(null);
    setInspectSubmissionId(submissionRecord.id);
    notify(
      passed
        ? `Exam submitted! You scored ${percentage}% (PASSED).`
        : `Exam submitted. You scored ${percentage}% (Below ${exam.passPercentage}% cutoff).`,
      passed ? 'success' : 'warning'
    );
  };

  const resetDemoData = () => {
    setUsers(SEED_USERS);
    setExams(SEED_EXAMS);
    setSubmissions(SEED_SUBMISSIONS);
    setLiveCandidates(SEED_LIVE_CANDIDATES);
    notify('Demo database reset to initial state.', 'info');
  };

  const authContextValue = {
    user: currentUser,
    users,
    login,
    register,
    logout,
    darkMode,
    setDarkMode
  };

  const activeExam = exams.find((e) => e.id === activeExamId);
  const inspectedSubmission = submissions.find((s) => s.id === inspectSubmissionId);

  return (
    <AuthContext.Provider value={authContextValue}>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200 flex flex-col">
          {/* ============================================================== */}
          {/* TOP RESPONSIVE NAVIGATION BAR                                  */}
          {/* ============================================================== */}
          <header className="sticky top-0 z-40 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
              {/* Brand */}
              <div
                onClick={() => {
                  if (!activeExam) {
                    setInspectSubmissionId(null);
                    setActiveTab('dashboard');
                  }
                }}
                className="flex items-center gap-2.5 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-bold text-lg tracking-tight">
                    Exam<span className="text-indigo-600 dark:text-indigo-400">Pulse</span>
                  </span>
                  <span className="hidden sm:inline-block ml-2 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200/70 dark:border-indigo-800">
                    Full-Stack v2.0
                  </span>
                </div>
              </div>

              {/* Right Action Controls */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  aria-label="Toggle Dark/Light Theme"
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                >
                  {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
                </button>

                {currentUser ? (
                  <>
                    {/* Role Badge */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {currentUser.role === 'admin' ? (
                        <Shield className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                      ) : (
                        <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      )}
                      <div className="text-left">
                        <div className="text-xs font-bold leading-tight">{currentUser.name}</div>
                        <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          {currentUser.role === 'admin'
                            ? 'Faculty Admin'
                            : `Student • ${currentUser.rollNo}`}
                        </div>
                      </div>
                    </div>

                    {/* Quick Role Switcher for Demo Testing */}
                    {!activeExam && (
                      <button
                        onClick={() =>
                          login(
                            currentUser.role === 'admin'
                              ? 'student@exampulse.edu'
                              : 'admin@exampulse.edu',
                            'Password123'
                          )
                        }
                        className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100 transition-colors"
                        title="Switch between Admin and Student view"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Switch to {currentUser.role === 'admin' ? 'Student' : 'Admin'}
                      </button>
                    )}

                    {/* Logout Button */}
                    <button
                      onClick={logout}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setActiveTab(activeTab === 'blueprint' ? 'dashboard' : 'blueprint')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <Code className="w-3.5 h-3.5 text-indigo-600" />
                    {activeTab === 'blueprint' ? 'Back to Login' : 'System Blueprint'}
                  </button>
                )}
              </div>
            </div>

            {/* Sub-Navigation Bar when Authenticated and NOT in an active exam */}
            {currentUser && !activeExam && (
              <nav className="border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between overflow-x-auto">
                  <div className="flex items-center gap-1.5 py-2">
                    {currentUser.role === 'admin' ? (
                      <>
                        <NavPill
                          active={activeTab === 'dashboard' && !inspectSubmissionId}
                          onClick={() => {
                            setInspectSubmissionId(null);
                            setActiveTab('dashboard');
                          }}
                          icon={<BarChart2 className="w-4 h-4" />}
                          label="Overview"
                        />
                        <NavPill
                          active={activeTab === 'exams' && !inspectSubmissionId}
                          onClick={() => {
                            setInspectSubmissionId(null);
                            setActiveTab('exams');
                          }}
                          icon={<BookOpen className="w-4 h-4" />}
                          label="Exams & Question Bank"
                        />
                        <NavPill
                          active={activeTab === 'proctor' && !inspectSubmissionId}
                          onClick={() => {
                            setInspectSubmissionId(null);
                            setActiveTab('proctor');
                          }}
                          icon={<Radio className="w-4 h-4 text-emerald-500" />}
                          label="Live Proctoring (WS)"
                          badge={liveCandidates.filter((c) => c.status === 'In Progress').length}
                        />
                        <NavPill
                          active={activeTab === 'results' || !!inspectSubmissionId}
                          onClick={() => {
                            setInspectSubmissionId(null);
                            setActiveTab('results');
                          }}
                          icon={<Award className="w-4 h-4" />}
                          label="Results & Gradebook"
                        />
                      </>
                    ) : (
                      <>
                        <NavPill
                          active={activeTab === 'dashboard' && !inspectSubmissionId}
                          onClick={() => {
                            setInspectSubmissionId(null);
                            setActiveTab('dashboard');
                          }}
                          icon={<BookOpen className="w-4 h-4" />}
                          label="Available Exams"
                        />
                        <NavPill
                          active={activeTab === 'results' || !!inspectSubmissionId}
                          onClick={() => {
                            setInspectSubmissionId(null);
                            setActiveTab('results');
                          }}
                          icon={<Award className="w-4 h-4" />}
                          label="My Scorecards"
                        />
                      </>
                    )}

                    <NavPill
                      active={activeTab === 'blueprint'}
                      onClick={() => {
                        setInspectSubmissionId(null);
                        setActiveTab('blueprint');
                      }}
                      icon={<Code className="w-4 h-4" />}
                      label="System Blueprint & Checklist"
                    />
                  </div>
                </div>
              </nav>
            )}
          </header>

          {/* ============================================================== */}
          {/* LIVE ANNOUNCEMENT BANNER (Simulated WebSocket Broadcast)       */}
          {/* ============================================================== */}
          {currentUser && announcements.length > 0 && (
            <div className="bg-indigo-600 dark:bg-indigo-950 text-white border-b border-indigo-500/40">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/15 font-bold text-[10px] uppercase tracking-wider shrink-0">
                    <Bell className="w-3 h-3 animate-pulse" /> Live Notice
                  </span>
                  <p className="truncate font-medium">{announcements[0].text}</p>
                </div>
                <span className="text-[11px] text-indigo-200 shrink-0 hidden sm:inline">
                  {announcements[0].timestamp} • {announcements[0].sender}
                </span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* MAIN CONTENT ROUTER                                            */}
          {/* ============================================================== */}
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {!currentUser ? (
              activeTab === 'blueprint' ? (
                <SystemBlueprintView notify={notify} />
              ) : (
                <AuthScreen
                  onLogin={login}
                  onRegister={register}
                  onOpenBlueprint={() => setActiveTab('blueprint')}
                />
              )
            ) : activeExam ? (
              <LiveExamRoom
                exam={activeExam}
                student={currentUser}
                onProgress={(qNum) => {
                  setLiveCandidates((prev) =>
                    prev.map((c) =>
                      c.studentName === currentUser.name && c.examTitle === activeExam.title
                        ? { ...c, progress: `${qNum}/${activeExam.questions.length}` }
                        : c
                    )
                  );
                }}
                onViolation={(count) =>
                  recordViolation(
                    currentUser.name,
                    currentUser.rollNo || 'N/A',
                    activeExam.title,
                    count
                  )
                }
                onSubmit={handleSubmitExam}
                onExit={() => {
                  setActiveExamId(null);
                  notify('Exited exam room without submitting.', 'warning');
                }}
              />
            ) : inspectedSubmission ? (
              <ScorecardReviewView
                submission={inspectedSubmission}
                exam={exams.find((e) => e.id === inspectedSubmission.examId)}
                onBack={() => setInspectSubmissionId(null)}
              />
            ) : activeTab === 'blueprint' ? (
              <SystemBlueprintView notify={notify} />
            ) : currentUser.role === 'admin' ? (
              <>
                {activeTab === 'dashboard' && (
                  <AdminOverview
                    exams={exams}
                    submissions={submissions}
                    liveCandidates={liveCandidates}
                    onNavigate={setActiveTab}
                    onBroadcast={broadcastAnnouncement}
                    onResetDemo={resetDemoData}
                  />
                )}
                {activeTab === 'exams' && (
                  <AdminExamManager
                    exams={exams}
                    onSaveExam={saveExam}
                    onTogglePublish={togglePublishExam}
                    onDeleteExam={deleteExam}
                  />
                )}
                {activeTab === 'proctor' && (
                  <AdminProctorRoom
                    liveCandidates={liveCandidates}
                    alerts={proctorAlerts}
                    announcements={announcements}
                    onBroadcast={broadcastAnnouncement}
                    onSimulateViolation={() => {
                      const target = liveCandidates.find((c) => c.status === 'In Progress') || liveCandidates[0];
                      if (target) {
                        recordViolation(
                          target.studentName,
                          target.rollNo,
                          target.examTitle,
                          target.warnings + 1
                        );
                        notify(`Simulated tab-switch alert for ${target.studentName}!`, 'warning');
                      }
                    }}
                  />
                )}
                {activeTab === 'results' && (
                  <AdminGradebook
                    exams={exams}
                    submissions={submissions}
                    onInspect={(subId) => setInspectSubmissionId(subId)}
                    notify={notify}
                  />
                )}
              </>
            ) : (
              <>
                {activeTab === 'dashboard' && (
                  <StudentDashboard
                    exams={exams.filter((e) => e.isPublished)}
                    submissions={submissions.filter((s) => s.studentId === currentUser.id)}
                    student={currentUser}
                    onStartExam={handleStartExam}
                    onViewScorecard={(subId) => setInspectSubmissionId(subId)}
                  />
                )}
                {activeTab === 'results' && (
                  <StudentScorecardsList
                    submissions={submissions.filter((s) => s.studentId === currentUser.id)}
                    onViewScorecard={(subId) => setInspectSubmissionId(subId)}
                  />
                )}
              </>
            )}
          </main>

          {/* ============================================================== */}
          {/* FOOTER                                                         */}
          {/* ============================================================== */}
          <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
              <span>ExamPulse — Full-Stack Examination & Live Proctoring System</span>
              <span>React + Tailwind CSS • Context API • JWT RBAC • Socket.IO Ready</span>
            </div>
          </footer>

          {/* ============================================================== */}
          {/* TOAST NOTIFICATION STACK                                       */}
          {/* ============================================================== */}
          <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
            {toasts.map((t) => (
              <div
                key={t.id}
                className={`pointer-events-auto flex items-start gap-2.5 p-3.5 rounded-xl shadow-lg border text-xs sm:text-sm font-medium transition-all ${
                  t.type === 'success'
                    ? 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                    : t.type === 'error'
                    ? 'bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-100'
                    : t.type === 'warning'
                    ? 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100'
                    : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                }`}
              >
                {t.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                {t.type === 'error' && <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />}
                {t.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
                {t.type === 'info' && <Bell className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />}
                <span className="flex-1 leading-snug">{t.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

function NavPill({ active, onClick, icon, label, badge }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
        active
          ? 'bg-indigo-600 text-white shadow-sm'
          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-800'
      }`}
    >
      {icon}
      <span>{label}</span>
      {badge > 0 && (
        <span
          className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
            active
              ? 'bg-white text-indigo-600'
              : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

// ============================================================================
// 4. AUTHENTICATION SCREEN (LOGIN, REGISTER & ONE-CLICK DEMO ACCESS)
// ============================================================================

function AuthScreen({ onLogin, onRegister, onOpenBlueprint }) {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@exampulse.edu');
  const [password, setPassword] = useState('Password123');
  const [role, setRole] = useState('student');
  const [rollNo, setRollNo] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        if (!name.trim()) throw new Error('Full name is required.');
        if (password.length < 6) throw new Error('Password must be at least 6 characters.');
        onRegister({ name, email, password, role, rollNo });
      } else {
        onLogin(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-4 sm:py-8">
      {/* Left Hero & Problem Overview */}
      <div className="lg:col-span-7 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" /> Role-Based Online Assessment & Live Proctoring Platform
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
          Secure, Real-Time <span className="text-indigo-600 dark:text-indigo-400">Examination Management</span> System
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
          Built with React, Tailwind CSS, Context API, custom hooks, and real-time proctoring telemetry. Launch the Faculty Command Center or Candidate Exam Portal instantly using the one-click demo logins.
        </p>

        {/* One-Click Demo Launch Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <button
            type="button"
            onClick={() => onLogin('admin@exampulse.edu', 'Password123')}
            className="text-left p-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-900 bg-white dark:bg-slate-900 hover:border-indigo-600 dark:hover:border-indigo-500 transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                <Shield className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Launch Admin <ChevronRight className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 font-bold text-base">Faculty / Admin Demo</div>
            <div className="text-xs text-slate-500 mt-0.5">admin@exampulse.edu</div>
          </button>

          <button
            type="button"
            onClick={() => onLogin('student@exampulse.edu', 'Password123')}
            className="text-left p-4 rounded-2xl border-2 border-emerald-200 dark:border-emerald-900 bg-white dark:bg-slate-900 hover:border-emerald-600 dark:hover:border-emerald-500 transition-all shadow-sm group"
          >
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                <GraduationCap className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                Launch Student <ChevronRight className="w-4 h-4" />
              </span>
            </div>
            <div className="mt-3 font-bold text-base">Student / Candidate Demo</div>
            <div className="text-xs text-slate-500 mt-0.5">student@exampulse.edu</div>
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={onOpenBlueprint}
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <FileText className="w-4 h-4" /> View Complete Problem Analysis, Wireframes & Full-Stack Architecture →
          </button>
        </div>
      </div>

      {/* Right Authentication Card */}
      <div className="lg:col-span-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-lg">
          <div className="flex gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 mb-6">
            <button
              type="button"
              onClick={() => {
                setIsRegister(false);
                setError('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                !isRegister
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              Sign In (JWT)
            </button>
            <button
              type="button"
              onClick={() => {
                setIsRegister(true);
                setEmail('');
                setError('');
              }}
              className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
                isRegister
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              Register Account
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-200 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Siddharth Kulkarni"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                Institutional Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@exampulse.edu"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {isRegister && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                  >
                    <option value="student">Student / Candidate</option>
                    <option value="admin">Faculty / Admin</option>
                  </select>
                </div>
                {role === 'student' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-500 mb-1">
                      Roll Number
                    </label>
                    <input
                      type="text"
                      value={rollNo}
                      onChange={(e) => setRollNo(e.target.value)}
                      placeholder="CS2026-205"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
                    />
                  </div>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              {isRegister ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
              {isRegister ? 'Create Account & Sign In' : 'Authenticate Session'}
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-emerald-500" /> bcrypt + JWT RBAC
            </span>
            <span>Password: Password123</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 5. FACULTY / ADMIN DASHBOARD VIEWS
// ============================================================================

function AdminOverview({
  exams,
  submissions,
  liveCandidates,
  onNavigate,
  onBroadcast,
  onResetDemo
}) {
  const [noticeText, setNoticeText] = useState('');

  const publishedCount = exams.filter((e) => e.isPublished).length;
  const passRate = useMemo(() => {
    if (submissions.length === 0) return 0;
    const passedCount = submissions.filter((s) => s.passed).length;
    return Math.round((passedCount / submissions.length) * 100);
  }, [submissions]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Faculty Command Center</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Monitor live examination sessions, manage question banks, and inspect candidate gradebooks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onResetDemo}
            className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Reset Demo Data
          </button>
          <button
            onClick={() => onNavigate('exams')}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-sm"
          >
            <Plus className="w-4 h-4" /> Create / Edit Exams
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Assessments"
          value={exams.length}
          sub={`${publishedCount} Published Live`}
          icon={<BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />}
        />
        <KpiCard
          title="Published Exams"
          value={publishedCount}
          sub={`${exams.length - publishedCount} Drafts`}
          icon={<CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
        />
        <KpiCard
          title="Total Submissions"
          value={submissions.length}
          sub="Auto-graded scripts"
          icon={<Users className="w-5 h-5 text-sky-600 dark:text-sky-400" />}
        />
        <KpiCard
          title="Average Pass Rate"
          value={`${passRate}%`}
          sub="Across evaluated attempts"
          icon={<Award className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
        />
      </div>

      {/* Two-column Operational Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h2 className="font-bold text-base">Live Candidate Telemetry</h2>
            </div>
            <button
              onClick={() => onNavigate('proctor')}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Open Proctoring Room <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                  <th className="py-2.5 font-semibold">Candidate</th>
                  <th className="py-2.5 font-semibold">Assessment</th>
                  <th className="py-2.5 font-semibold">Progress</th>
                  <th className="py-2.5 font-semibold">Integrity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {liveCandidates.map((cand) => (
                  <tr key={cand.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3">
                      <div className="font-semibold">{cand.studentName}</div>
                      <div className="text-xs text-slate-500 font-mono">{cand.rollNo}</div>
                    </td>
                    <td className="py-3 text-xs text-slate-600 dark:text-slate-300 max-w-[180px] truncate">
                      {cand.examTitle}
                    </td>
                    <td className="py-3 font-mono text-xs font-bold">{cand.progress}</td>
                    <td className="py-3">
                      {cand.warnings > 0 ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          <AlertTriangle className="w-3 h-3" /> {cand.warnings} Warning
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          {cand.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Broadcast Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Radio className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h2 className="font-bold text-base">Broadcast Live Notice</h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Send real-time instructions or errata directly to all active exam sessions.
            </p>
            <textarea
              rows={3}
              value={noticeText}
              onChange={(e) => setNoticeText(e.target.value)}
              placeholder="e.g., Clarification: Question 2 refers to React 18+ strict mode..."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={() => {
              onBroadcast(noticeText);
              setNoticeText('');
            }}
            disabled={!noticeText.trim()}
            className="mt-4 w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" /> Send Live Announcement
          </button>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ title, value, sub, icon }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{title}</span>
        <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800">{icon}</div>
      </div>
      <div className="mt-3 text-2xl sm:text-3xl font-extrabold">{value}</div>
      <div className="mt-1 text-xs text-slate-500">{sub}</div>
    </div>
  );
}

function AdminExamManager({ exams, onSaveExam, onTogglePublish, onDeleteExam }) {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalExam, setModalExam] = useState(null); // null | 'new' | examObject

  const filtered = useMemo(() => {
    return exams.filter((ex) => {
      const matchSearch =
        ex.title.toLowerCase().includes(search.toLowerCase()) ||
        ex.subject.toLowerCase().includes(search.toLowerCase());
      const matchStatus =
        statusFilter === 'all' ||
        (statusFilter === 'published' && ex.isPublished) ||
        (statusFilter === 'draft' && !ex.isPublished);
      return matchSearch && matchStatus;
    });
  }, [exams, search, statusFilter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exams & Question Bank Manager</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Author new assessments, manage multiple-choice question banks, and toggle student visibility.
          </p>
        </div>
        <button
          onClick={() => setModalExam('new')}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-sm"
        >
          <Plus className="w-4 h-4" /> Create New Exam
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by exam title or subject..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published Only</option>
          <option value="draft">Drafts Only</option>
        </select>
      </div>

      {/* Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((exam) => (
          <div
            key={exam.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {exam.subject}
                  </span>
                  <h3 className="text-lg font-bold mt-0.5">{exam.title}</h3>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 ${
                    exam.isPublished
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                  }`}
                >
                  {exam.isPublished ? 'Published' : 'Draft'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{exam.description}</p>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block">Questions</span>
                  <span className="font-bold">{exam.questions.length} MCQs</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Duration</span>
                  <span className="font-bold">{exam.durationMinutes} mins</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Pass Cutoff</span>
                  <span className="font-bold">{exam.passPercentage}%</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setModalExam(exam)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:hover:bg-indigo-900/70 text-indigo-700 dark:text-indigo-300 text-xs font-bold transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit Exam & Questions
              </button>
              <button
                onClick={() => onTogglePublish(exam.id)}
                className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold"
              >
                {exam.isPublished ? 'Unpublish' : 'Publish'}
              </button>
              <button
                onClick={() => onDeleteExam(exam.id)}
                className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50"
                title="Delete Assessment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Exam & Question Builder Modal */}
      {modalExam && (
        <ExamBuilderModal
          initialExam={modalExam === 'new' ? null : modalExam}
          onClose={() => setModalExam(null)}
          onSave={(savedData) => {
            onSaveExam(savedData);
            setModalExam(null);
          }}
        />
      )}
    </div>
  );
}

function ExamBuilderModal({ initialExam, onClose, onSave }) {
  const [title, setTitle] = useState(initialExam?.title || '');
  const [subject, setSubject] = useState(initialExam?.subject || '');
  const [description, setDescription] = useState(initialExam?.description || '');
  const [durationMinutes, setDurationMinutes] = useState(initialExam?.durationMinutes || 15);
  const [passPercentage, setPassPercentage] = useState(initialExam?.passPercentage || 60);
  const [isPublished, setIsPublished] = useState(initialExam?.isPublished ?? true);
  const [questions, setQuestions] = useState(
    initialExam?.questions || [
      {
        id: `q-${Date.now()}`,
        prompt: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        marks: 10,
        explanation: ''
      }
    ]
  );
  const [error, setError] = useState('');

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: `q-${Date.now()}-${Math.random()}`,
        prompt: '',
        options: ['', '', '', ''],
        correctIndex: 0,
        marks: 10,
        explanation: ''
      }
    ]);
  };

  const removeQuestion = (idx) => {
    if (questions.length <= 1) {
      setError('An assessment must contain at least one question.');
      return;
    }
    setQuestions((prev) => prev.filter((_, i) => i !== idx));
  };

  const updateQuestion = (idx, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === idx ? { ...q, [field]: value } : q))
    );
  };

  const updateOption = (qIdx, optIdx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIdx) return q;
        const copy = [...q.options];
        copy[optIdx] = value;
        return { ...q, options: copy };
      })
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!title.trim() || !subject.trim()) {
      setError('Title and Subject are required.');
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].prompt.trim()) {
        setError(`Question ${i + 1} is missing its prompt.`);
        return;
      }
      if (questions[i].options.some((o) => !o.trim())) {
        setError(`All 4 options must be filled out for Question ${i + 1}.`);
        return;
      }
    }

    onSave({
      id: initialExam?.id,
      title: title.trim(),
      subject: subject.trim(),
      description: description.trim() || 'Standardized online assessment.',
      durationMinutes: Number(durationMinutes) || 15,
      passPercentage: Number(passPercentage) || 60,
      isPublished,
      questions
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold">
            {initialExam ? 'Edit Assessment & Question Bank' : 'Create New Assessment'}
          </h3>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-200 text-xs font-semibold">
              {error}
            </div>
          )}

          {/* Exam Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Exam Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Operating Systems End-Sem"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Subject *</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Computer Science"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                min={1}
                max={180}
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
                Passing Cutoff (%)
              </label>
              <input
                type="number"
                min={1}
                max={100}
                value={passPercentage}
                onChange={(e) => setPassPercentage(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief syllabus description or instructions..."
              className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm"
            />
            <label className="inline-flex items-center gap-2 text-xs font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded"
              />
              Publish Immediately
            </label>
          </div>

          {/* Questions List */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm">Question Bank ({questions.length} MCQs)</h4>
              <button
                type="button"
                onClick={addQuestion}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100"
              >
                <Plus className="w-3.5 h-3.5" /> Add Question
              </button>
            </div>

            {questions.map((q, qIdx) => (
              <div
                key={q.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-indigo-600 dark:text-indigo-400">
                    Question #{qIdx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeQuestion(qIdx)}
                    className="text-rose-600 hover:text-rose-700 p-1"
                    title="Remove Question"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <input
                  type="text"
                  value={q.prompt}
                  onChange={(e) => updateQuestion(qIdx, 'prompt', e.target.value)}
                  placeholder="Enter question statement..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={`correct-${q.id}`}
                        checked={q.correctIndex === optIdx}
                        onChange={() => updateQuestion(qIdx, 'correctIndex', optIdx)}
                        className="accent-emerald-600 w-4 h-4 shrink-0"
                        title="Mark as correct option"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => updateOption(qIdx, optIdx, e.target.value)}
                        placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                      />
                    </div>
                  ))}
                </div>

                <input
                  type="text"
                  value={q.explanation || ''}
                  onChange={(e) => updateQuestion(qIdx, 'explanation', e.target.value)}
                  placeholder="Solution explanation shown to students after submission..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-600 dark:text-slate-300"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
            >
              Save Assessment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AdminProctorRoom({
  liveCandidates,
  alerts,
  announcements,
  onBroadcast,
  onSimulateViolation
}) {
  const [msg, setMsg] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h1 className="text-2xl font-bold tracking-tight">Live Real-Time Proctoring Room</h1>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Bi-directional telemetry stream monitoring candidate progress, browser focus violations, and live broadcasts.
          </p>
        </div>

        <button
          onClick={onSimulateViolation}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold hover:bg-amber-100"
        >
          <AlertTriangle className="w-4 h-4" /> Simulate Candidate Tab-Switch Violation
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Candidate Feed */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="font-bold text-sm">Connected Candidates ({liveCandidates.length})</span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
              CHANNEL: CONNECTED
            </span>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {liveCandidates.map((cand) => (
              <div
                key={cand.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">{cand.studentName}</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono">
                      {cand.rollNo}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{cand.examTitle}</div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs font-bold">Progress: {cand.progress}</div>
                    <div className="text-[11px] text-slate-400">{cand.lastActive}</div>
                  </div>
                  {cand.warnings > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold">
                      <AlertTriangle className="w-3.5 h-3.5" /> {cand.warnings} Warnings
                    </span>
                  )}
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      cand.status === 'In Progress'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {cand.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Broadcast Log */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <Send className="w-4 h-4 text-indigo-600" /> Broadcast Live Announcement
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onBroadcast(msg);
                setMsg('');
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Type announcement..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs"
              />
              <button
                type="submit"
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold"
              >
                Send
              </button>
            </form>
            <div className="space-y-2 max-h-36 overflow-y-auto pt-1">
              {announcements.map((a) => (
                <div
                  key={a.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 text-xs"
                >
                  <p className="font-medium">{a.text}</p>
                  <span className="text-[10px] text-slate-400">{a.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3">
            <h3 className="font-bold text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Real-Time Violation Feed
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {alerts.map((al) => (
                <div
                  key={al.id}
                  className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs"
                >
                  <p className="font-semibold text-rose-800 dark:text-rose-200">{al.message}</p>
                  <span className="text-[10px] text-rose-500 mt-1 block">{al.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminGradebook({ exams, submissions, onInspect, notify }) {
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('all');

  const filtered = useMemo(() => {
    return submissions.filter((s) => {
      const matchExam = examFilter === 'all' || s.examId === examFilter;
      const matchSearch =
        s.studentName.toLowerCase().includes(search.toLowerCase()) ||
        s.rollNo.toLowerCase().includes(search.toLowerCase());
      return matchExam && matchSearch;
    });
  }, [submissions, examFilter, search]);

  const handleExportCSV = () => {
    const header = [
      'Student Name,Roll No,Exam Title,Score,Total Marks,Percentage,Status,Tab Switches,Submitted At'
    ];
    const rows = filtered.map(
      (s) =>
        `"${s.studentName}","${s.rollNo}","${s.examTitle}",${s.score},${s.totalMarks},${
          s.percentage
        }%,${s.passed ? 'PASSED' : 'FAILED'},${s.tabSwitches},"${s.submittedAt}"`
    );
    const blob = new Blob([header.concat(rows).join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exampulse_gradebook_export.csv';
    a.click();
    URL.revokeObjectURL(url);
    notify('Gradebook exported to CSV!', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Results & Gradebook</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Audit candidate performance, inspect answer scripts, and download CSV reports.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm"
        >
          <Download className="w-4 h-4" /> Export CSV Report
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by student name or roll number..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm"
          />
        </div>
        <select
          value={examFilter}
          onChange={(e) => setExamFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium"
        >
          <option value="all">All Assessments</option>
          {exams.map((ex) => (
            <option key={ex.id} value={ex.id}>
              {ex.title}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500">
                <th className="py-3.5 px-4 font-semibold">Candidate</th>
                <th className="py-3.5 px-4 font-semibold">Assessment</th>
                <th className="py-3.5 px-4 font-semibold">Score</th>
                <th className="py-3.5 px-4 font-semibold">Outcome</th>
                <th className="py-3.5 px-4 font-semibold">Tab Switches</th>
                <th className="py-3.5 px-4 font-semibold text-right">Script</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-3.5 px-4">
                    <div className="font-bold">{sub.studentName}</div>
                    <div className="text-xs text-slate-500 font-mono">{sub.rollNo}</div>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-medium">{sub.examTitle}</td>
                  <td className="py-3.5 px-4 font-mono font-bold">
                    {sub.score}/{sub.totalMarks} ({sub.percentage}%)
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        sub.passed
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {sub.passed ? 'PASSED' : 'FAILED'}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-xs font-semibold">
                    {sub.tabSwitches === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400">0 (Clean)</span>
                    ) : (
                      <span className="text-amber-600">{sub.tabSwitches} Flags</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onInspect(sub.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100"
                    >
                      <Eye className="w-3.5 h-3.5" /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 6. STUDENT PORTAL & LIVE EXAM ROOM
// ============================================================================

function StudentDashboard({ exams, submissions, student, onStartExam, onViewScorecard }) {
  const [subjectFilter, setSubjectFilter] = useState('all');

  const subjects = useMemo(() => {
    const unique = Array.from(new Set(exams.map((e) => e.subject)));
    return ['all', ...unique];
  }, [exams]);

  const filteredExams = exams.filter(
    (e) => subjectFilter === 'all' || e.subject === subjectFilter
  );

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-1 rounded-full">
            Candidate Portal • {student.rollNo}
          </span>
          <h1 className="text-2xl font-bold mt-2">Welcome, {student.name}</h1>
          <p className="text-sm text-indigo-100 mt-1">
            Select a published examination below to enter the timed proctored exam room.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-right shrink-0">
          <div className="text-xs text-indigo-100">Completed Attempts</div>
          <div className="text-2xl font-extrabold">{submissions.length}</div>
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-slate-400 shrink-0" />
        {subjects.map((subj) => (
          <button
            key={subj}
            onClick={() => setSubjectFilter(subj)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize whitespace-nowrap transition-colors ${
              subjectFilter === subj
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            {subj === 'all' ? 'All Subjects' : subj}
          </button>
        ))}
      </div>

      {/* Available Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredExams.map((exam) => {
          const pastSub = submissions.find((s) => s.examId === exam.id);
          return (
            <div
              key={exam.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {exam.subject}
                  </span>
                  {pastSub ? (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300">
                      Attempted • {pastSub.percentage}%
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold mt-1.5">{exam.title}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{exam.description}</p>

                <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-500" /> {exam.durationMinutes} Mins
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-indigo-500" /> {exam.questions.length} MCQs
                  </span>
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-indigo-500" /> Pass: {exam.passPercentage}%
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                {pastSub && (
                  <button
                    onClick={() => onViewScorecard(pastSub.id)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold flex items-center justify-center gap-1.5"
                  >
                    <Eye className="w-4 h-4" /> View Scorecard
                  </button>
                )}
                <button
                  onClick={() => onStartExam(exam)}
                  className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Play className="w-4 h-4" /> {pastSub ? 'Retake Exam' : 'Start Exam'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StudentScorecardsList({ submissions, onViewScorecard }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Examination Scorecards</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Review your graded attempts and question-by-question answer explanations.
        </p>
      </div>

      {submissions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center">
          <Award className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="font-bold text-base">No Attempts Recorded Yet</h3>
          <p className="text-xs text-slate-500 mt-1">
            Start any available exam from the dashboard to generate an instant scorecard.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {submissions.map((sub) => (
            <div
              key={sub.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex items-center justify-between gap-4"
            >
              <div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    sub.passed
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  }`}
                >
                  {sub.passed ? 'PASSED' : 'FAILED'}
                </span>
                <h3 className="font-bold text-base mt-1.5">{sub.examTitle}</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Score: <strong>{sub.score}/{sub.totalMarks}</strong> ({sub.percentage}%) • {sub.submittedAt}
                </p>
              </div>
              <button
                onClick={() => onViewScorecard(sub.id)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shrink-0"
              >
                Review
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LiveExamRoom({ exam, onProgress, onViolation, onSubmit, onExit }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [markedReview, setMarkedReview] = useState({});
  const [tabSwitches, setTabSwitches] = useState(0);
  const [warningBanner, setWarningBanner] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const currentQuestion = exam.questions[currentIdx];

  // Custom Countdown Timer Hook with auto-submit on expiration
  const { secondsLeft, formatted } = useExamTimer(exam.durationMinutes * 60, true, () => {
    onSubmit(exam, answers, tabSwitches);
  });

  const triggerTabViolation = () => {
    setTabSwitches((prev) => {
      const next = prev + 1;
      onViolation(next);
      return next;
    });
    setWarningBanner(true);
  };

  // Real browser visibilitychange anti-cheat listener
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        triggerTabViolation();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  const goToQuestion = (index) => {
    setCurrentIdx(index);
    onProgress(index + 1);
  };

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-5">
      {/* Proctoring Warning Alert */}
      {warningBanner && (
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/90 border border-amber-300 dark:border-amber-700 flex items-center justify-between gap-3 text-amber-900 dark:text-amber-100">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Anti-Cheat Alert: Browser focus loss / tab switch recorded ({tabSwitches} warning{tabSwitches > 1 ? 's' : ''}). Logged to live invigilator feed.
            </span>
          </div>
          <button
            onClick={() => setWarningBanner(false)}
            className="text-xs font-bold underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Exam Header Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{exam.subject}</span>
          <h2 className="text-base sm:text-lg font-bold">{exam.title}</h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Test button to simulate tab switch easily */}
          <button
            type="button"
            onClick={triggerTabViolation}
            className="px-3 py-2 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-xs font-bold hover:bg-amber-100"
            title="Test anti-cheat tab-switch detection"
          >
            Simulate Tab Switch ({tabSwitches})
          </button>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-sm border ${
              secondsLeft < 60
                ? 'bg-rose-50 dark:bg-rose-950 border-rose-300 dark:border-rose-800 text-rose-600 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{formatted}</span>
          </div>

          <button
            onClick={() => setConfirmModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-sm"
          >
            Submit Exam
          </button>
        </div>
      </div>

      {/* Question Area + Palette */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between min-h-[380px]">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Question {currentIdx + 1} of {exam.questions.length}
              </span>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  +{currentQuestion.marks || 10} Marks
                </span>
                <button
                  onClick={() =>
                    setMarkedReview((prev) => ({
                      ...prev,
                      [currentQuestion.id]: !prev[currentQuestion.id]
                    }))
                  }
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                    markedReview[currentQuestion.id]
                      ? 'bg-amber-100 border-amber-300 text-amber-800 dark:bg-amber-950 dark:border-amber-700 dark:text-amber-300'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  {markedReview[currentQuestion.id] ? 'Marked' : 'Mark Review'}
                </button>
              </div>
            </div>

            <p className="mt-5 text-base sm:text-lg font-bold leading-relaxed">
              {currentQuestion.prompt}
            </p>

            <div className="mt-6 space-y-3">
              {currentQuestion.options.map((opt, idx) => {
                const selected = answers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setAnswers({ ...answers, [currentQuestion.id]: idx })}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center gap-3.5 ${
                      selected
                        ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/60 dark:border-indigo-500 ring-1 ring-indigo-600'
                        : 'border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        selected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              onClick={() => goToQuestion(Math.max(0, currentIdx - 1))}
              disabled={currentIdx === 0}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>

            <button
              onClick={() => {
                const copy = { ...answers };
                delete copy[currentQuestion.id];
                setAnswers(copy);
              }}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
            >
              Clear Answer
            </button>

            <button
              onClick={() => goToQuestion(Math.min(exam.questions.length - 1, currentIdx + 1))}
              disabled={currentIdx === exam.questions.length - 1}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold disabled:opacity-40"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Question Palette */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm">Question Palette</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">
              {answeredCount} of {exam.questions.length} answered
            </p>

            <div className="grid grid-cols-5 gap-2">
              {exam.questions.map((q, idx) => {
                const isAnswered = answers[q.id] !== undefined;
                const isMarked = markedReview[q.id];
                const isCurrent = idx === currentIdx;

                let style = 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300';
                if (isMarked) style = 'bg-amber-400 text-slate-950 font-bold';
                else if (isAnswered) style = 'bg-emerald-600 text-white font-bold';

                return (
                  <button
                    key={q.id}
                    onClick={() => goToQuestion(idx)}
                    className={`h-9 rounded-lg text-xs font-bold transition-all ${style} ${
                      isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-900' : ''
                    }`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-amber-400 inline-block" /> Marked for Review
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-slate-200 dark:bg-slate-800 inline-block" /> Unvisited
              </div>
            </div>
          </div>

          <button
            onClick={onExit}
            className="mt-6 w-full py-2 rounded-xl border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/40"
          >
            Exit Exam Room
          </button>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {confirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-md w-full p-6 shadow-xl">
            <h3 className="text-lg font-bold">Confirm Exam Submission</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              You have answered <strong>{answeredCount}</strong> of{' '}
              <strong>{exam.questions.length}</strong> questions. Your score and detailed answer key will be generated immediately.
            </p>
            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setConfirmModal(false)}
                className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold"
              >
                Continue Exam
              </button>
              <button
                onClick={() => onSubmit(exam, answers, tabSwitches)}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
              >
                Submit & Grade Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ScorecardReviewView({ submission, exam, onBack }) {
  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
      </button>

      {/* Scorecard Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              submission.passed
                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                : 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
            }`}
          >
            {submission.passed ? 'QUALIFIED / PASSED' : 'BELOW PASSING CUTOFF'}
          </span>
          <h1 className="text-2xl font-bold mt-2">{submission.examTitle}</h1>
          <p className="text-xs text-slate-500 mt-1">
            Candidate: {submission.studentName} ({submission.rollNo}) • Submitted: {submission.submittedAt}
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="text-center">
            <div className="text-xs text-slate-500">Marks</div>
            <div className="text-xl font-extrabold">
              {submission.score}/{submission.totalMarks}
            </div>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div className="text-center">
            <div className="text-xs text-slate-500">Percentage</div>
            <div className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {submission.percentage}%
            </div>
          </div>
        </div>
      </div>

      {/* Question-by-Question Solution Breakdown */}
      {exam && (
        <div className="space-y-4">
          <h2 className="font-bold text-base">Detailed Solution & Explanation Review</h2>
          {exam.questions.map((q, idx) => {
            const chosenIdx = submission.answers[q.id];
            const isCorrect = chosenIdx === q.correctIndex;
            return (
              <div
                key={q.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-sm sm:text-base">
                    Q{idx + 1}. {q.prompt}
                  </h3>
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 shrink-0">
                      <CheckCircle className="w-4 h-4" /> +{q.marks || 10} Marks
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600 shrink-0">
                      <XCircle className="w-4 h-4" /> 0 Marks
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, oIdx) => {
                    const isRight = oIdx === q.correctIndex;
                    const isPicked = oIdx === chosenIdx;
                    let cls = 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800';
                    if (isRight) {
                      cls =
                        'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-400 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isPicked && !isRight) {
                      cls =
                        'bg-rose-50 dark:bg-rose-950/70 border-rose-400 text-rose-900 dark:text-rose-200 font-bold';
                    }
                    return (
                      <div key={oIdx} className={`p-3 rounded-xl border ${cls}`}>
                        {String.fromCharCode(65 + oIdx)}. {opt}
                        {isRight && ' ✓ (Correct Answer)'}
                        {isPicked && !isRight && ' ✗ (Your Selection)'}
                      </div>
                    );
                  })}
                </div>

                {q.explanation && (
                  <div className="p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 text-xs text-slate-700 dark:text-slate-300">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ============================================================================
// 7. SYSTEM BLUEPRINT & FULL-STACK CHECKLIST REFERENCE VIEW
// ============================================================================

function SystemBlueprintView({ notify }) {
  const [subTab, setSubTab] = useState('analysis');
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, content) => {
    navigator.clipboard?.writeText(content);
    setCopiedId(id);
    notify('Copied snippet to clipboard!', 'success');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const schemaSnippet = `// server/models/Exam.js & Submission.js (MongoDB + Mongoose)
const ExamSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  subject: { type: String, required: true },
  durationMinutes: { type: Number, required: true, min: 1 },
  passPercentage: { type: Number, default: 60 },
  isPublished: { type: Boolean, default: false, index: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [{
    prompt: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctIndex: { type: Number, required: true },
    explanation: String
  }]
}, { timestamps: true });

const SubmissionSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true, index: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  score: Number,
  percentage: Number,
  passed: Boolean,
  tabSwitches: { type: Number, default: 0 }
}, { timestamps: true });`;

  const devopsSnippet = `# Dockerfile (Multi-Stage Production Build)
FROM node:20-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM node:20-alpine
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci --omit=dev
COPY server/ ./
COPY --from=client-builder /app/client/dist ./public
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "index.js"]`;

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Academic Problem Analysis & Full-Stack Deliverables
        </span>
        <h1 className="text-2xl font-bold tracking-tight mt-1">
          System Blueprint, UI Wireframes & Architecture Reference
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete documentation covering Aim, Problem Statement, Target Users, UI Wireframes, Mongoose Schemas, REST/Socket.IO endpoints, and Docker CI/CD.
        </p>
      </div>

      {/* Sub-navigation */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: 'analysis', label: '1. Aim, Problem & Users', icon: <Layers className="w-4 h-4" /> },
          { id: 'wireframes', label: '2. UI Wireframes', icon: <Eye className="w-4 h-4" /> },
          { id: 'schemas', label: '3. Mongoose Schemas', icon: <Database className="w-4 h-4" /> },
          { id: 'api', label: '4. REST & Socket.IO API', icon: <Server className="w-4 h-4" /> },
          { id: 'devops', label: '5. Docker & CI/CD', icon: <Terminal className="w-4 h-4" /> }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setSubTab(t.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              subTab === t.id
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {subTab === 'analysis' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <h3 className="font-bold text-base text-indigo-600 dark:text-indigo-400">
              Aim & Problem Statement
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Aim:</strong> To analyze the inefficiencies of manual examination workflows, identify functional and security requirements, and architect a responsive full-stack web application (<strong>ExamPulse</strong>) prior to deployment.
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              <strong>Problem Statement:</strong> Institutions need a unified platform where faculty can create timed assessments, proctor candidates in real time via WebSockets, and auto-grade scripts, while students can attempt tests across devices and review instant scorecards.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-3">
            <h3 className="font-bold text-base text-indigo-600 dark:text-indigo-400">
              Target Users & Modules
            </h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>
                <strong>1. Faculty / Admin Role:</strong> Full CRUD on Exams & MCQ Question Banks, Publish/Draft controls, Live WebSocket Proctoring Room, and CSV Gradebook export.
              </li>
              <li>
                <strong>2. Student / Candidate Role:</strong> Protected student dashboard, countdown-enforced Exam Room with anti-cheat focus detection, and post-submission answer review.
              </li>
              <li>
                <strong>3. Core Technical Stack:</strong> React + Tailwind CSS, Context API + Custom Hooks (`useAuth`, `useExamTimer`), Express REST API, MongoDB + Mongoose, JWT + bcrypt, Socket.IO, and Docker.
              </li>
            </ul>
          </div>
        </div>
      )}

      {subTab === 'wireframes' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-2">
            <h3 className="font-bold text-sm">Wireframe 1: Faculty Command Center</h3>
            <pre className="p-4 rounded-xl bg-slate-950 text-emerald-400 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`+-------------------------------------------------------------------+
| [ExamPulse]  [Overview] [Exams] [Live Proctor] [Results] [Theme]  |
+-------------------------------------------------------------------+
| [Total Exams: 3] [Published: 2] [Submissions: 1] [Pass Rate: 100%]|
+-----------------------------------------+-------------------------+
| LIVE CANDIDATE TELEMETRY                | BROADCAST LIVE NOTICE   |
| - Rohan K. | Midterm | 3/5 | 1 Warning  | [Textarea: Notice...]   |
| - Ananya V.| DBMS    | 2/3 | Clean      | [Send Live Announcement]|
+-----------------------------------------+-------------------------+`}
            </pre>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-2">
            <h3 className="font-bold text-sm">Wireframe 2: Student Live Exam Interface</h3>
            <pre className="p-4 rounded-xl bg-slate-950 text-sky-400 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`+-------------------------------------------------------------------+
| [!] ANTI-CHEAT ALERT: Browser tab switch logged (1 warning)       |
+-------------------------------------------------------------------+
| Full-Stack Web Midterm         [Tab Warnings: 1] [14:48] [Submit] |
+-----------------------------------------------+-------------------+
| Question 1 of 5                 [+10M] [Flag] | QUESTION PALETTE  |
| Which HTTP status code indicates creation?    | [1] [2] [3] [4]   |
|  (A) 200 OK                                   | [5]               |
|  (B) 201 Created  <-- Selected                |                   |
|  (C) 204 No Content                           | ■ Answered        |
| [< Prev]       [Clear Answer]       [Next >]  | ■ Marked Review   |
+-----------------------------------------------+-------------------+`}
            </pre>
          </div>
        </div>
      )}

      {subTab === 'schemas' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm">MongoDB + Mongoose Data Models</h3>
            <button
              onClick={() => handleCopy('schema', schemaSnippet)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
            >
              {copiedId === 'schema' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              Copy Schema
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
            {schemaSnippet}
          </pre>
        </div>
      )}

      {subTab === 'api' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 font-bold text-sm">
            RESTful API Endpoints & Socket.IO Events
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/70 border-b border-slate-200 dark:border-slate-800 uppercase text-slate-500">
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Route / Event</th>
                  <th className="py-3 px-4">Guard</th>
                  <th className="py-3 px-4">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                <tr>
                  <td className="py-3 px-4 text-emerald-600 font-bold">POST</td>
                  <td className="py-3 px-4">/api/auth/register & /login</td>
                  <td className="py-3 px-4 font-sans">Public</td>
                  <td className="py-3 px-4 font-sans">Hashes password with bcrypt and signs JWT</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-sky-600 font-bold">GET</td>
                  <td className="py-3 px-4">/api/exams</td>
                  <td className="py-3 px-4 font-sans">JWT</td>
                  <td className="py-3 px-4 font-sans">Lists exams (hides correctIndex for students)</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-emerald-600 font-bold">POST</td>
                  <td className="py-3 px-4">/api/exams</td>
                  <td className="py-3 px-4 font-sans">Admin</td>
                  <td className="py-3 px-4 font-sans">Creates assessment & question bank</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-emerald-600 font-bold">POST</td>
                  <td className="py-3 px-4">/api/submissions</td>
                  <td className="py-3 px-4 font-sans">Student</td>
                  <td className="py-3 px-4 font-sans">Auto-grades attempt and stores scorecard</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-purple-600 font-bold">WS</td>
                  <td className="py-3 px-4">proctor:violation / broadcast</td>
                  <td className="py-3 px-4 font-sans">Socket.IO</td>
                  <td className="py-3 px-4 font-sans">Real-time tab-switch alerts & live notices</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {subTab === 'devops' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm">Multi-Stage Production Dockerfile</h3>
            <button
              onClick={() => handleCopy('devops', devopsSnippet)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold"
            >
              {copiedId === 'devops' ? (
                <Check className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              Copy Dockerfile
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-slate-950 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
            {devopsSnippet}
          </pre>
        </div>
      )}
    </div>
  );
}