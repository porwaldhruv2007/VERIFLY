// ==============================
// Admin Portal
// ==============================

/*
 * TODO:
 * Replace mock query functions with
 * protected Servlet API calls in Phase 2.
 */


// ==============================
// Admin Dashboard Data
// ==============================

function getAdminDashboard() {
  return {
    students: 1248,
    badges: 3842,
    modules: 18,
    requests: 7421
  };
}


// ==============================
// Badge Issuance
// ==============================

function issueBadge(studentId, moduleId) {

  /*
   * TODO:
   * POST /admin/badge/issue
   *
   * The real backend will generate the
   * verification code and save the badge
   * into MySQL.
   */

  const existing = VeriflyData.badges.find(
    badge =>
      badge.studentId === studentId &&
      badge.moduleId === moduleId
  );

  if (existing) {
    return existing;
  }

  const student = VeriflyData.students.find(
    item => item.id === studentId
  );

  const module = VeriflyData.modules.find(
    item => item.id === moduleId
  );

  if (!student || !module) {
    return null;
  }

  return {
    studentName: student.name,
    moduleName: module.name,
    verificationCode: `WX-${module.id.slice(-3)}-DEMO`,
    status: 'prepared'
  };
}


// ==============================
// Benchmark
// ==============================

function getBenchmarkResults() {
  // Results intentionally unavailable in Phase 1.
  return null;
}


// ==============================
// Admin Page Rendering
// ==============================

function renderAdmin() {

  // ==============================
  // Dashboard
  // ==============================

  if (page === 'dashboard') {

    shell(
      'admin',

      heading(
        'Admin overview',
        'A demonstration view using illustrative mock values.'
      )

      + `

        <div
          class="notice"
          style="margin-bottom: 20px"
        >
          These figures are mock data for the Phase 1
          UI demonstration, not live project statistics.
        </div>


        <div class="stats">

          ${stat('1,248', 'Total students', '♙')}
          ${stat('3,842', 'Badges issued', '◈')}
          ${stat('18', 'Modules', '▦')}
          ${stat('7,421', 'Verification requests', '✓')}

        </div>


        <div class="content-grid">

          <section class="panel">

            <div class="panel-title">

              <h2>Recent badge activity</h2>

              <a
                class="text-link"
                href="${root}admin/badges.html"
              >
                Issue badge →
              </a>

            </div>


            ${[
              [
                'Sarthak Borse',
                'Servlet Fundamentals badge issued'
              ],
              [
                'Rahul Sharma',
                'JDBC Basics badge issued'
              ],
              [
                'Priya Shah',
                'Java OOP badge issued'
              ]
            ]
              .map(
                activity => `
                  <div class="module-row">

                    <b class="module-icon">✓</b>

                    <div>
                      <strong>${activity[0]}</strong>
                      <span>${activity[1]}</span>
                    </div>

                    <span
                      class="right"
                      style="
                        color: var(--muted);
                        font-size: .7rem;
                      "
                    >
                      Today
                    </span>

                  </div>
                `
              )
              .join('')}

          </section>


          <section class="panel">

            <div class="panel-title">
              <h2>Quick actions</h2>
            </div>


            <div class="form-grid">

              <a
                href="${root}admin/modules.html"
                class="btn btn-light"
              >
                + Create module
              </a>

              <a
                href="${root}admin/badges.html"
                class="btn btn-primary"
              >
                + Issue badge
              </a>

              <a
                href="${root}admin/verification.html"
                class="btn btn-light"
              >
                View verification
              </a>

            </div>

          </section>

        </div>

      `,

      'Dashboard'
    );
  }


  // ==============================
  // Students
  // ==============================

  if (page === 'students') {

    const rows = VeriflyData.students;

    shell(
      'admin',

      heading(
        'Students',
        'Manage the mock student directory for this demonstration.',
        `
          <button
            class="btn btn-primary"
            id="add-student"
          >
            + Add student
          </button>
        `
      )

      + `

        <div class="toolbar">

          <input
            class="input"
            id="student-search"
            placeholder="Search by student or email"
          >

          <select class="select">

            <option>All statuses</option>
            <option>Active</option>
            <option>Pending</option>

          </select>

        </div>


        <div class="table-wrap">

          <table>

            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Badges</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>


            <tbody>

              ${rows
                .map(
                  student => `
                    <tr>

                      <td class="mono">
                        ${student.id}
                      </td>

                      <td>
                        ${student.name}
                      </td>

                      <td>
                        ${student.email}
                      </td>

                      <td>
                        ${student.badges}
                      </td>

                      <td>
                        ${status(
                          student.status,
                          student.status === 'Active'
                            ? 'valid'
                            : 'pending'
                        )}
                      </td>

                      <td>
                        <button
                          class="btn btn-light btn-small"
                        >
                          View
                        </button>
                      </td>

                    </tr>
                  `
                )
                .join('')}

            </tbody>

          </table>

        </div>

      `,

      'Students'
    );


    document.querySelector('#add-student').onclick = () =>
      toast(
        'Student creation is a Phase 2 backend action'
      );


    document.querySelector('#student-search').oninput = event => {

      document
        .querySelectorAll('tbody tr')
        .forEach(row => {

          row.classList.toggle(
            'hidden',
            !row.textContent
              .toLowerCase()
              .includes(
                event.target.value.toLowerCase()
              )
          );

        });

    };
  }


  // ==============================
  // Modules
  // ==============================

  if (page === 'modules') {

    shell(
      'admin',

      heading(
        'Module management',
        'Configure modules ready for future badge issuance.',
        `
          <button
            id="add-module"
            class="btn btn-primary"
          >
            + Add module
          </button>
        `
      )

      + `

        <div class="table-wrap">

          <table>

            <thead>

              <tr>
                <th>Module ID</th>
                <th>Module name</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Students completed</th>
                <th>Badges issued</th>
                <th>Action</th>
              </tr>

            </thead>


            <tbody>

              ${VeriflyData.modules
                .map(
                  module => `
                    <tr>

                      <td class="mono">
                        ${module.id}
                      </td>

                      <td>
                        ${module.name}
                      </td>

                      <td>
                        ${module.unit}
                      </td>

                      <td>
                        ${status(
                          module.status,
                          module.status === 'Completed'
                            ? 'completed'
                            : 'progress'
                        )}
                      </td>

                      <td>
                        ${module.completions}
                      </td>

                      <td>
                        ${module.issued}
                      </td>

                      <td>

                        <button
                          class="btn btn-light btn-small"
                        >
                          Edit
                        </button>

                      </td>

                    </tr>
                  `
                )
                .join('')}

            </tbody>

          </table>

        </div>

      `,

      'Modules'
    );


    document.querySelector('#add-module').onclick = () =>
      toast(
        'Module creation is a Phase 2 backend action'
      );
  }


  // ==============================
// Badge Issuance
// ==============================

if (page === 'badges') {

  shell(
    'admin',

    heading(
      'Issue new badge',
      'Create a verified digital credential for a completed module.'
    )

    + `

      <div class="content-grid">

        <form
          id="issue-form"
          class="panel form-grid"
        >

          <div>
            <div class="eyebrow">STEP 01</div>

            <label>
              Student

              <select
                class="select"
                name="student"
              >

                ${VeriflyData.students
                  .map(
                    student => `
                      <option value="${student.id}">
                        ${student.name} · ${student.id}
                      </option>
                    `
                  )
                  .join('')}

              </select>

            </label>
          </div>


          <div>
            <div class="eyebrow">STEP 02</div>

            <label>
              Completed module

              <select
                class="select"
                name="module"
              >

                ${VeriflyData.modules
                  .filter(
                    module =>
                      module.status === 'Completed'
                  )
                  .map(
                    module => `
                      <option value="${module.id}">
                        ${module.name}
                      </option>
                    `
                  )
                  .join('')}

              </select>

            </label>
          </div>


          <button
            type="submit"
            class="btn btn-primary"
          >
            Issue Badge
          </button>


          <div class="notice">
            <strong>Credential workflow</strong><br>
            Select a student and completed module.
            A unique verification code will be generated
            by the backend.
          </div>

        </form>


        <aside
          id="issue-result"
          class="panel"
        >

          <div class="empty">

            <span class="empty-icon">◈</span>

            <b>Ready to issue</b>

            <p>
              Select a student and module to prepare
              a digital skill badge.
            </p>

          </div>

        </aside>

      </div>

    `,

    'Badge Issuance'
  );


  // Connect Badge Issuance form to the real backend
  const issueForm = document.querySelector('#issue-form');
  const issueResult = document.querySelector('#issue-result');

  if (issueForm && issueResult) {

    issueForm.onsubmit = async event => {

      event.preventDefault();

      const studentId =
        issueForm.elements.student.value;

      const moduleId =
        issueForm.elements.module.value;

      issueResult.innerHTML = `
        <div class="empty">
          <span class="empty-icon">◌</span>
          <b>Issuing badge...</b>
          <p>Please wait while the backend creates the credential.</p>
        </div>
      `;

      try {

        const body = new URLSearchParams();

        body.append('studentId', studentId);
        body.append('moduleId', moduleId);

        const response = await fetch(
          'http://localhost:8080/verifly-backend/api/badges/issue',
          {
            method: 'POST',

            headers: {
              'Content-Type':
                'application/x-www-form-urlencoded'
            },

            body: body.toString()
          }
        );

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message || 'Badge issuance failed'
          );
        }

        issueResult.innerHTML = `
          <div class="empty">

            <span class="empty-icon">✓</span>

            <b>Badge issued successfully</b>

            <p>
              The credential has been stored in the
              VERIFLY database.
            </p>

            <div style="margin-top: 20px;">

              <div>
                <strong>Student:</strong>
                ${data.studentId}
              </div>

              <div style="margin-top: 8px;">
                <strong>Module:</strong>
                ${data.moduleId}
              </div>

              <div style="margin-top: 8px;">
                <strong>Verification Code:</strong>
                <span class="mono">
                  ${data.verificationCode}
                </span>
              </div>

            </div>

          </div>
        `;

      } catch (error) {

        console.error(
          'Badge issuance error:',
          error
        );

        issueResult.innerHTML = `
          <div class="empty">

            <span class="empty-icon">×</span>

            <b>Badge issuance failed</b>

            <p>
              ${error.message}
            </p>

          </div>
        `;
      }
    };
  }
}



  // ==============================
  // Verification
  // ==============================

  if (page === 'verification') {

    shell(
      'admin',

      heading(
        'Verification log',
        'Illustrative verification records for the future lookup services.'
      )

      + `

        <div
          class="notice"
          style="margin-bottom: 20px"
        >
          These are illustrative mock records only;
          no CGI or Servlet verification service is
          running yet.
        </div>


        <div class="table-wrap">

          <table>

            <thead>

              <tr>
                <th>Code</th>
                <th>Badge</th>
                <th>Status</th>
                <th>Verified at</th>
                <th>Method</th>
              </tr>

            </thead>


            <tbody>

              ${VeriflyData.verificationRecords
                .map(
                  record => `
                    <tr>

                      <td class="mono">
                        ${record.code}
                      </td>

                      <td>
                        ${record.badge}
                      </td>

                      <td>
                        ${status(
                          record.status,
                          record.status === 'Valid'
                            ? 'valid'
                            : 'pending'
                        )}
                      </td>

                      <td>
                        ${record.time}
                      </td>

                      <td>
                        ${record.method}
                      </td>

                    </tr>
                  `
                )
                .join('')}

            </tbody>

          </table>

        </div>

      `,

      'Verification'
    );
  }


  // ==============================
  // Benchmark
  // ==============================

  if (page === 'benchmark') {

    shell(
      'admin',

      heading(
        'CGI vs Servlet benchmark',
        'Measured comparison of the same verification lookup implementation.'
      )

      + `

        <div class="content-grid">

          <section class="panel">

            <div class="panel-title">

              <h2>Test configuration</h2>

              <span class="mock-pill">
                COMPLETED
              </span>

            </div>


            <div
              class="badge-grid"
              style="margin-bottom: 21px"
            >

              <div class="badge-card">

                <div class="badge-art bronze">
                  C
                </div>

                <h3>CGI</h3>

                <p>
                  Verification implementation
                </p>

              </div>


              <div class="badge-card">

                <div class="badge-art silver">
                  S
                </div>

                <h3>Servlet</h3>

                <p>
                  Verification implementation
                </p>

              </div>

            </div>


            <div class="form-grid">

              <label>

                Number of requests

                <input
  id="benchmark-requests"
  class="input"
  type="number"
  value="10"
>

              </label>


              <label>

                Concurrent requests

                <input
  id="benchmark-concurrency"
  class="input"
  type="number"
  value="2"
>cs

              </label>


              <button
                id="run-benchmark"
                class="btn btn-primary"
              >
                Run benchmark
              </button>

            </div>

          </section>


          <section id="benchmark-comparison" class="panel">

            <div class="panel-title">
              <h2>Comparison results</h2>
            </div>


            <div class="benchmark-results">

  <div class="benchmark-result-card">
    <h3>Servlet</h3>
    <p>10 requests</p>
    <strong>0.212 s</strong>
    <small>Total time</small>
    <small>0.0212 s/request</small>
  </div>

  <div class="benchmark-result-card">
    <h3>CGI</h3>
    <p>10 requests</p>
    <strong>0.989 s</strong>
    <small>Total time</small>
    <small>0.0989 s/request</small>
  </div>

</div>
          </section>

        </div>


        <div
          class="stats"
          style="margin-top: 20px"
        >

          ${stat(
  '0.06005 s',
  'Average response time',
  '◷'
)}

${stat(
  '0.0212 s',
  'Servlet average',
  '↓'
)}

${stat(
  '0.0989 s',
  'CGI average',
  '↑'
)}

${stat(
  '10',
  'Requests tested',
  '▦'
)}

        </div>

      `,

      'Benchmark'
    );


    document.querySelector('#run-benchmark').onclick = () =>
  toast(
    'Benchmark results shown are from the completed 10-request local test'
  );
  }
}



// ==============================
// Initialize Admin Portal
// ==============================

if (
  [
    'dashboard',
    'students',
    'modules',
    'badges',
    'verification',
    'benchmark'
  ].includes(page) &&
  document.body.dataset.portal === 'admin'
) {
  renderAdmin();
}


// ==============================
// Admin Button Actions
// ==============================

document.addEventListener('click', event => {

  const button = event.target.closest('button');

  if (
    !button ||
    !['View', 'Edit'].includes(
      button.textContent.trim()
    )
  ) {
    return;
  }

  toast(
    `${button.textContent.trim()} is a Phase 1 mock action.`
  );
});
