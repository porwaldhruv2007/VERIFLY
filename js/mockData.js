/* Centralised Phase 1 data — replace these objects with API responses in Phase 2. */
const VeriflyData = {
  currentStudent: { id: 'STU001', name: 'Sarthak Borse', email: 'sarthak.borse@woxsen.edu.in', program: 'B.Tech Computer Science', joined: 'August 2025', initials: 'SB' },
  students: [
    { id: 'STU001', name: 'Sarthak Borse', email: 'sarthak.borse@woxsen.edu.in', badges: 6, status: 'Active' },
    { id: 'STU002', name: 'Rahul Sharma', email: 'rahul.sharma@woxsen.edu.in', badges: 4, status: 'Active' },
    { id: 'STU003', name: 'Priya Shah', email: 'priya.shah@woxsen.edu.in', badges: 5, status: 'Active' },
    { id: 'STU004', name: 'Ananya Reddy', email: 'ananya.reddy@woxsen.edu.in', badges: 3, status: 'Pending' }
  ],
  modules: [
    { id: 'MOD001', name: 'Servlet Fundamentals', unit: 'Unit 04', description: 'Build dynamic Java web applications with the Servlet lifecycle.', status: 'Completed', progress: 100, category: 'Java Web', completions: 294, issued: 279 },
    { id: 'MOD002', name: 'JDBC Basics', unit: 'Unit 05', description: 'Connect Java applications to relational databases safely.', status: 'Completed', progress: 100, category: 'Database', completions: 238, issued: 225 },
    { id: 'MOD003', name: 'Java OOP', unit: 'Unit 02', description: 'Use classes, objects and clean object-oriented design.', status: 'In Progress', progress: 72, category: 'Java', completions: 318, issued: 303 },
    { id: 'MOD004', name: 'HTML & CSS', unit: 'Unit 01', description: 'Create responsive, accessible interfaces for the web.', status: 'Completed', progress: 100, category: 'Web Design', completions: 412, issued: 398 },
    { id: 'MOD005', name: 'JavaScript Essentials', unit: 'Unit 03', description: 'Add interactive behavior using modern JavaScript.', status: 'In Progress', progress: 38, category: 'Web Development', completions: 301, issued: 289 }
  ],
  badges: [
    { id: 'BADGE001', studentId: 'STU001', studentName: 'Sarthak Borse', moduleId: 'MOD001', moduleName: 'Servlet Fundamentals', category: 'Java Web', verificationCode: 'WX-SRV-8A29K', status: 'verified', issuedAt: '2026-09-13', tier: 'gold', icon: '◈' },
    { id: 'BADGE002', studentId: 'STU001', studentName: 'Sarthak Borse', moduleId: 'MOD002', moduleName: 'JDBC Basics', category: 'Database', verificationCode: 'WX-JDBC-71PQ', status: 'verified', issuedAt: '2026-08-28', tier: 'silver', icon: '⌘' },
    { id: 'BADGE003', studentId: 'STU001', studentName: 'Sarthak Borse', moduleId: 'MOD004', moduleName: 'HTML & CSS', category: 'Web Design', verificationCode: 'WX-WEB-40LM', status: 'verified', issuedAt: '2026-08-15', tier: 'bronze', icon: '✦' },
    { id: 'BADGE004', studentId: 'STU001', studentName: 'Sarthak Borse', moduleId: 'MOD003', moduleName: 'Java OOP', category: 'Java', verificationCode: 'WX-JAVA-92RD', status: 'verified', issuedAt: '2026-07-30', tier: 'gold', icon: '◉' },
    { id: 'BADGE005', studentId: 'STU001', studentName: 'Sarthak Borse', moduleId: 'MOD005', moduleName: 'JavaScript Essentials', category: 'Web Development', verificationCode: 'WX-JS-19NX', status: 'verified', issuedAt: '2026-07-09', tier: 'silver', icon: '⚡' },
    { id: 'BADGE006', studentId: 'STU001', studentName: 'Sarthak Borse', moduleId: 'MOD006', moduleName: 'Git Collaboration', category: 'Tools', verificationCode: 'WX-GIT-56RV', status: 'verified', issuedAt: '2026-06-21', tier: 'bronze', icon: '◆' }
  ],
  verificationRecords: [
    { code: 'WX-SRV-8A29K', badge: 'Servlet Fundamentals', status: 'Valid', time: '10:42 AM', method: 'Servlet' },
    { code: 'WX-JDBC-71PQ', badge: 'JDBC Basics', status: 'Valid', time: '10:44 AM', method: 'CGI' },
    { code: 'WX-WEB-40LM', badge: 'HTML & CSS', status: 'Valid', time: '10:51 AM', method: 'Servlet' },
    { code: 'WX-TEST-0000', badge: '—', status: 'Not found', time: '11:03 AM', method: 'CGI' }
  ]
};
