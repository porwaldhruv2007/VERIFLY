// ==============================
// Badge Verification
// ==============================

/**
 * Verify a badge using the real Java Servlet API.
 */
async function verifyBadge(code) {

  if (!code) {
    return null;
  }

  try {

    const verificationEndpoint =
      window.VERIFLY_VERIFY_ENDPOINT || '/cgi-bin/verify.py';

    const response = await fetch(
      `${verificationEndpoint}?code=${encodeURIComponent(code.trim())}`
    );

    const data = await response.json();

    return data;

  } catch (error) {

    console.error('Verification API error:', error);

    return {
      valid: false,
      message: 'Unable to connect to verification server'
    };
  }
}


/**
 * Render the verification result.
 */
function renderVerificationResult(data) {

  const result = document.querySelector('#verify-result');

  if (!result) {
    return;
  }


  // Invalid badge
  if (!data || !data.valid) {

    result.innerHTML = `
      <article class="result-card">

        <div class="result-head invalid">

          <span class="result-symbol">×</span>

          <div>
            BADGE NOT FOUND

            <small style="display: block; font-weight: 600;">
              Verification unsuccessful
            </small>
          </div>

        </div>

        <div class="invalid-body">
          ${data?.message || 'The verification code could not be matched with a credential. Check the code and try again.'}
        </div>

      </article>
    `;

    return;
  }


  // Valid badge
  result.innerHTML = `
    <article class="result-card">

      <div class="result-head">

        <span class="result-symbol">✓</span>

        <div>
          VERIFIED CREDENTIAL

          <small style="display: block; font-weight: 600;">
            This badge has been verified against the VERIFLY database.
          </small>
        </div>

      </div>


      <div class="result-details">

        <div>
          <span>STUDENT</span>
          <strong>${data.student}</strong>
        </div>

        <div>
          <span>BADGE</span>
          <strong>${data.badge}</strong>
        </div>

        <div>
          <span>MODULE</span>
          <strong>${data.moduleId}</strong>
        </div>

        <div>
          <span>ISSUED</span>
          <strong>${formatDate(data.issuedAt)}</strong>
        </div>

        <div>
          <span>VERIFICATION CODE</span>
          <strong class="mono">
            ${data.verificationCode}
          </strong>
        </div>

        <div>
          <span>STATUS</span>
          <strong>
            ${status('Verified')}
          </strong>
        </div>

      </div>

    </article>
  `;
}


/**
 * Initialize the verification page.
 */
function initVerification() {

  const form = document.querySelector('#verify-form');
  const input = document.querySelector('#verify-code');

  if (!form || !input) {
    return;
  }


  // Check if a verification code was provided in the URL.
  const codeFromUrl =
    new URLSearchParams(location.search).get('code');

  if (codeFromUrl) {

    input.value = codeFromUrl;

    verifyBadge(codeFromUrl)
      .then(renderVerificationResult);
  }


  // Handle verification form submission.
  form.onsubmit = async event => {

    event.preventDefault();

    const code = input.value.trim();

    const result = await verifyBadge(code);

    renderVerificationResult(result);
  };
}


// ==============================
// Start Verification
// ==============================

initVerification();
