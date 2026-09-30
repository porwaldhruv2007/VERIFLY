// ==============================
// Authentication
// ==============================

const loginForm = document.querySelector('#login-form');
const loginError = document.querySelector('#login-error');


// ==============================
// Login Handler
// ==============================

loginForm?.addEventListener('submit', event => {
  event.preventDefault();

  const id = loginForm.id.value.trim();
  const password = loginForm.password.value;

  const isAdmin = document.body.dataset.role === 'admin';

  const validCredentials = isAdmin
    ? id === 'ADMIN001' && password === 'admin123'
    : id === 'STU001' && password === 'demo123';


  // ==============================
  // Invalid Login
  // ==============================

  if (!validCredentials) {
    loginError.textContent = isAdmin
      ? 'Use ADMIN001 / admin123 for this demo login.'
      : 'Use STU001 / demo123 for this demo login.';

    loginError.classList.remove('hidden');

    return;
  }


  // ==============================
  // Successful Login
  // ==============================

  sessionStorage.setItem(
    'veriflyRole',
    isAdmin ? 'admin' : 'student'
  );

  location.href = 'dashboard.html';
});