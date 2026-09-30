/* Shared UI helpers for the static pages. */

const app = document.getElementById('app');
const page = document.body.dataset.page;
const root = document.body.dataset.root || './';


// ==============================
// Navigation
// ==============================

const studentLinks = [
  ['dashboard', '⌂', 'Dashboard'],
  ['badges', '◈', 'My Badges'],
  ['modules', '▦', 'Modules'],
  ['verify', '✓', 'Verify Badge'],
  ['profile', '◎', 'Profile']
];

const adminLinks = [
  ['dashboard', '⌂', 'Dashboard'],
  ['students', '♙', 'Students'],
  ['modules', '▦', 'Modules'],
  ['badges', '◈', 'Badges'],
  ['verification', '✓', 'Verification'],
  ['benchmark', '↯', 'Benchmark']
];


// ==============================
// Utility Functions
// ==============================

const formatDate = date =>
  new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date(date));


function toast(message) {
  let toastElement = document.querySelector('.toast');

  if (!toastElement) {
    toastElement = document.createElement('div');
    toastElement.className = 'toast';
    document.body.append(toastElement);
  }

  toastElement.textContent = message;
  toastElement.classList.add('show');

  setTimeout(() => {
    toastElement.classList.remove('show');
  }, 2600);
}


function status(text, type = 'verified') {
  const showCheck =
    type === 'verified' ||
    type === 'valid' ||
    type === 'completed';

  return `
    <span class="status ${type}">
      ${showCheck ? '✓ ' : ''}${text}
    </span>
  `;
}


// ==============================
// Application Shell
// ==============================

function shell(type, content, title) {
  const links = type === 'student'
    ? studentLinks
    : adminLinks;

  const href = link =>
    type === 'student' && link[0] === 'verify'
      ? root + 'verify.html'
      : root + type + '/' + link[0] + '.html';

  app.innerHTML = `
    <div class="app-layout">

      <aside class="sidebar">

        <a class="logo" href="${root}index.html">
          <i class="logo-mark">✓</i>
          <span>VERIFLY</span>
        </a>

        <div class="nav-label">
          ${type === 'student' ? 'Student space' : 'Admin console'}
        </div>

        ${links.map(link => `
          <a
            class="nav-link ${page === link[0] ? 'active' : ''}"
            href="${href(link)}"
          >
            <b class="nicon">${link[1]}</b>
            <span>${link[2]}</span>
          </a>
        `).join('')}

        <div class="sidebar-bottom">
          <a
            class="nav-link"
            href="${root}${type}/login.html"
          >
            <b class="nicon">↗</b>
            <span>Logout</span>
          </a>
        </div>

      </aside>


      <main class="main">

        <header class="topbar">

          <span class="crumb">
            VERIFLY /
            ${type === 'student' ? 'Student portal' : 'Administration'}
            / ${title}
          </span>

          <div class="top-right">
            <span class="mock-pill">
              PHASE 1 · MOCK DATA
            </span>

            <span class="avatar">
              ${type === 'student' ? 'SB' : 'AD'}
            </span>
          </div>

        </header>


        <section class="page">
          ${content}
        </section>

      </main>

    </div>


    <nav class="mobile-nav">

      ${links.slice(0, 4).map(link => `
        <a
          class="${page === link[0] ? 'active' : ''}"
          href="${href(link)}"
        >
          <b>${link[1]}</b>
          ${link[2]}
        </a>
      `).join('')}

    </nav>
  `;
}


// ==============================
// Page Heading
// ==============================

function heading(title, text, action = '') {
  return `
    <div class="page-heading">

      <div>
        <div class="eyebrow">
          ${page === 'benchmark'
            ? 'Future architecture'
            : 'Phase 1 workspace'}
        </div>

        <h1>${title}</h1>

        <p>${text}</p>
      </div>

      ${action}

    </div>
  `;
}


// ==============================
// Statistics Card
// ==============================

function stat(value, label, icon) {
  return `
    <article class="stat-card">

      <i class="stat-icon">${icon}</i>

      <span>${label}</span>

      <strong>${value}</strong>

    </article>
  `;
}


// ==============================
// Badge Card
// ==============================

function badgeCard(b) {
  return `
    <article class="badge-card">

      <div class="badge-art ${b.tier}">
        ${b.icon}
      </div>

      <h3>${b.moduleName}</h3>

      <p>${b.category}</p>

      <div class="badge-footer">

        ${status('Verified')}

        <a
          class="btn btn-light btn-small"
          href="${root}student/badge-details.html?id=${b.id}"
        >
          View
        </a>

      </div>

    </article>
  `;
}


// ==============================
// Module Row
// ==============================

function moduleRow(m) {
  return `
    <div class="module-row">

      <b class="module-icon">
        ${m.name.charAt(0)}
      </b>

      <div>
        <strong>${m.name}</strong>
        <span>${m.unit} · ${m.category}</span>
      </div>

      <div class="right">

        ${status(
          m.status,
          m.status === 'Completed'
            ? 'completed'
            : 'progress'
        )}

        ${m.status !== 'Completed'
          ? `
            <div class="progressbar">
              <i style="width: ${m.progress}%"></i>
            </div>
          `
          : ''
        }

      </div>

    </div>
  `;
}