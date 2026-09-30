// ==============================
// Student Portal
// ==============================

/*
 * TODO:
 * Replace mock data functions with
 * Servlet API calls in Phase 2.
 */


// ==============================
// Student Data
// ==============================

function getStudentDashboard() {
  return {
    badges: 6,
    completed: 8,
    verified: 6,
    inProgress: 2
  };
}


function getStudentBadges() {
  return VeriflyData.badges.filter(
    badge => badge.studentId === 'STU001'
  );
}


function getModules() {
  return VeriflyData.modules;
}


// ==============================
// Render Student Pages
// ==============================

function renderStudent() {
  const badges = getStudentBadges();
  const modules = getModules();
  const user = VeriflyData.currentStudent;


  // ==============================
  // Dashboard
  // ==============================

  if (page === 'dashboard') {
    shell(
      'student',

      heading(
        'Good morning, Sarthak 👋',
        'Track your skills and verified credentials.'
      )

      + `

        <div class="stats">

          ${stat('06', 'Badges earned', '◈')}
          ${stat('08', 'Modules completed', '▦')}
          ${stat('06', 'Verified skills', '✓')}
          ${stat('02', 'In progress', '↗')}

        </div>


        <div class="content-grid">

          <section class="panel">

            <div class="panel-title">
              <h2>Recent badges</h2>

              <a
                class="text-link"
                href="${root}student/badges.html"
              >
                View wallet →
              </a>
            </div>

            <div class="badge-grid">
              ${badges
                .slice(0, 3)
                .map(badgeCard)
                .join('')}
            </div>

          </section>


          <section class="panel">

            <div class="panel-title">
              <h2>Continue learning</h2>

              <a
                class="text-link"
                href="${root}student/modules.html"
              >
                All modules →
              </a>
            </div>

            ${modules
              .filter(module => module.status === 'In Progress')
              .map(moduleRow)
              .join('')}

          </section>

        </div>

      `,

      'Dashboard'
    );
  }


  // ==============================
  // My Badges
  // ==============================

  if (page === 'badges') {
    shell(
      'student',

      heading(
        'My badges',
        'A verified wallet of skills you can share with confidence.',
        `
          <a
            class="btn btn-primary"
            href="${root}verify.html"
          >
            Verify a badge
          </a>
        `
      )

      + `

        <div class="toolbar">

          <button
            class="btn btn-dark btn-small filter active"
            data-filter="all"
          >
            All (${badges.length})
          </button>

          <button
            class="btn btn-light btn-small filter"
            data-filter="verified"
          >
            Verified
          </button>

          <button
            class="btn btn-light btn-small filter"
            data-filter="recent"
          >
            Recent
          </button>

        </div>


        <div class="badge-grid wallet-grid">

          ${badges
            .map(badgeCard)
            .join('')}

        </div>

      `,

      'My Badges'
    );


    // Badge filters
    document
      .querySelectorAll('.filter')
      .forEach(button => {

        button.onclick = () => {

          document
            .querySelectorAll('.filter')
            .forEach(filterButton => {
              filterButton.className =
                'btn btn-light btn-small filter';
            });


          button.className =
            'btn btn-dark btn-small filter';


          document
            .querySelectorAll('.wallet-grid .badge-card')
            .forEach((card, index) => {

              const showRecent =
                button.dataset.filter === 'recent' &&
                index > 2;

              card.classList.toggle(
                'hidden',
                showRecent
              );

            });

        };

      });
  }


  // ==============================
  // Modules
  // ==============================

  if (page === 'modules') {
    shell(
      'student',

      heading(
        'Modules',
        'Build your verified skill portfolio one focused module at a time.'
      )

      + `

        <div class="badge-grid">

          ${modules
            .map(module => `

              <article class="badge-card">

                <div
                  class="badge-art ${
                    module.status === 'Completed'
                      ? 'gold'
                      : 'silver'
                  }"
                >
                  ${module.name.charAt(0)}
                </div>


                <h3>${module.name}</h3>

                <p>
                  ${module.unit} · ${module.category}
                </p>


                <p
                  style="
                    margin-top: 12px;
                    line-height: 1.55;
                  "
                >
                  ${module.description}
                </p>


                <div class="badge-footer">

                  ${status(
                    module.status,
                    module.status === 'Completed'
                      ? 'completed'
                      : 'progress'
                  )}


                  <button class="btn btn-light btn-small">
                    ${
                      module.status === 'Completed'
                        ? 'View Badge'
                        : 'Continue'
                    }
                  </button>

                </div>


                ${
                  module.status !== 'Completed'
                    ? `
                      <div class="progressbar">
                        <i
                          style="width: ${module.progress}%"
                        ></i>
                      </div>
                    `
                    : ''
                }

              </article>

            `)
            .join('')}

        </div>

      `,

      'Modules'
    );
  }


  // ==============================
  // Badge Details
  // ==============================

  if (page === 'badge-details') {
    const id =
      new URLSearchParams(location.search).get('id');

    const badge =
      badges.find(item => item.id === id) ||
      badges[0];


    shell(
      'student',

      heading(
        'Credential details',
        'A portable record of your completed skill module.',
        `
          <a
            class="btn btn-light"
            href="${root}student/badges.html"
          >
            ← Back to wallet
          </a>
        `
      )

      + `

        <div class="content-grid">

          <section
            class="panel"
            style="
              text-align: center;
              padding: 38px;
            "
          >

            <div class="eyebrow">
              Verified badge
            </div>


            <div
              class="badge-art ${badge.tier}"
              style="
                width: 130px;
                height: 130px;
                border-radius: 40px;
                font-size: 60px;
                margin: 24px auto;
              "
            >
              ${badge.icon}
            </div>


            <h2
              style="
                letter-spacing: -.06em;
                margin: 0;
              "
            >
              ${badge.moduleName}
            </h2>


            <p style="color: var(--muted)">
              ${badge.category}
            </p>


            ${status('Verified credential')}

          </section>


          <section class="panel">

            <div class="panel-title">

              <h2>Credential record</h2>

              ${status('Verified')}

            </div>


            <div
              class="result-details"
              style="padding: 0"
            >

              <div>
                <span>AWARDED TO</span>
                <strong>${badge.studentName}</strong>
              </div>


              <div>
                <span>MODULE</span>
                <strong>${badge.moduleName}</strong>
              </div>


              <div>
                <span>ISSUED</span>
                <strong>
                  ${formatDate(badge.issuedAt)}
                </strong>
              </div>


              <div>
                <span>VERIFICATION CODE</span>
                <strong class="mono">
                  ${badge.verificationCode}
                </strong>
              </div>

            </div>


            <div
              style="
                display: flex;
                gap: 9px;
                flex-wrap: wrap;
                margin-top: 21px;
              "
            >

              <button
                id="copy-code"
                class="btn btn-primary"
              >
                Copy verification code
              </button>


              <a
                class="btn btn-light"
                href="${root}verify.html?code=${badge.verificationCode}"
              >
                Verify badge
              </a>


              <button
                id="share"
                class="btn btn-light"
              >
                Share credential
              </button>

            </div>


            <div
              class="notice"
              style="margin-top: 20px"
            >
              <b>About this credential:</b>
              Demonstrates completion of the
              ${badge.moduleName} module.
            </div>

          </section>

        </div>

      `,

      'Badge Details'
    );


    // Copy verification code
    document.querySelector('#copy-code').onclick = () => {

      navigator.clipboard
        ?.writeText(badge.verificationCode)
        .then(() => {
          toast('Verification code copied');
        });

    };


    // Share credential
    document.querySelector('#share').onclick = () => {
      toast('Share link prepared (mock)');
    };
  }


  // ==============================
  // Profile
  // ==============================

  if (page === 'profile') {
    shell(
      'student',

      heading(
        'Your profile',
        'The learner identity shown on your credentials.'
      )

      + `

        <div class="content-grid">

          <section class="panel">

            <div
              style="
                display: flex;
                align-items: center;
                gap: 16px;
              "
            >

              <span
                class="avatar"
                style="
                  width: 62px;
                  height: 62px;
                  font-size: 1rem;
                "
              >
                SB
              </span>


              <div>

                <h2 style="margin: 0">
                  ${user.name}
                </h2>

                <p
                  style="
                    color: var(--muted);
                    margin: 4px 0;
                  "
                >
                  ${user.program}
                </p>

              </div>

            </div>


            <div
              class="result-details"
              style="
                padding: 17px 0 0;
                margin-top: 15px;
              "
            >

              <div>
                <span>STUDENT ID</span>
                <strong>${user.id}</strong>
              </div>


              <div>
                <span>EMAIL</span>
                <strong>${user.email}</strong>
              </div>


              <div>
                <span>MEMBER SINCE</span>
                <strong>${user.joined}</strong>
              </div>


              <div>
                <span>WALLET STATUS</span>
                <strong>Active</strong>
              </div>

            </div>

          </section>


          <section class="panel">

            <div class="panel-title">
              <h2>Profile note</h2>
            </div>


            <p
              style="
                color: var(--muted);
                line-height: 1.75;
              "
            >
              This is a frontend profile preview.
              In Phase 2, the student record will be
              loaded securely from the Servlet + MySQL backend.
            </p>


            <div class="notice">
              No real personal data is saved in this
              Phase 1 demo.
            </div>

          </section>

        </div>

      `,

      'Profile'
    );
  }
}


// ==============================
// Initialize Student Portal
// ==============================

const studentPages = [
  'dashboard',
  'badges',
  'modules',
  'badge-details',
  'profile'
];

if (studentPages.includes(page)) {
  renderStudent();
}


// ==============================
// Module Button Actions
// ==============================

document.addEventListener('click', event => {

  const button = event.target.closest('button');

  if (!button) {
    return;
  }


  const buttonText = button.textContent.trim();

  if (!['View Badge', 'Continue'].includes(buttonText)) {
    return;
  }


  if (buttonText === 'Continue') {
    toast(
      'Module preview is a planned Phase 2 learning feature.'
    );

    return;
  }


  toast(
    'Opening a badge is available from your wallet.'
  );
});