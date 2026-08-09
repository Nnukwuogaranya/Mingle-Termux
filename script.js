import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged
} from "./firebase.js";

/* =========================================================
   MINGLE EMPIRE — LOGIN CONNECTION
   ========================================================= */

let activeModal = null;

/* Keep users signed in */
setPersistence(auth, browserLocalPersistence).catch(() => {});

/* =========================================================
   EMPIRE PORTALS
   ========================================================= */

function activate(type) {
  if (type === "pi") {
    openPiPortal();
  }

  if (type === "mingle") {
    window.location.href = "./login.html?v=5";
  }
}

window.activate = activate;

/* =========================================================
   PI LOGIN
   ========================================================= */

function openPiPortal() {
  closeModal();

  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <div class="modal-content pi-modal">

      <span class="close" onclick="closeModal()">&times;</span>

      <div style="
        font-size:52px;
        margin-bottom:8px;
        color:#ffffff;
        text-shadow:0 0 20px #8b5cf6;
      ">π</div>

      <h2>LOGIN WITH PI</h2>

      <p>
        Connect your Pi account to enter the Mingle Pi World.
      </p>

      <button
        class="btn pi-btn"
        onclick="piLogin()">
        Continue with Pi
      </button>

      <p class="small">
        Secure authentication through Pi Network
      </p>

      <div id="pi-error"
        style="
          color:#ff8f8f;
          font-size:13px;
          margin-top:12px;
        ">
      </div>

    </div>
  `;

  document.body.appendChild(modal);
  activeModal = modal;
}

window.openPiPortal = openPiPortal;

/* REAL PI LOGIN */

async function piLogin() {
  const errorEl = document.getElementById("pi-error");

  try {
    if (!window.Pi) {
      throw new Error("Pi Network SDK is not available.");
    }

    if (errorEl) {
      errorEl.innerText = "Connecting to Pi Network...";
    }

    window.Pi.init({
      version: "2.0",
      sandbox: true
    });

    const authResult = await window.Pi.authenticate(
      ["username"],
      function (incompletePayment) {
        console.log(
          "Incomplete Pi payment:",
          incompletePayment
        );
      }
    );

    if (!authResult || !authResult.user) {
      throw new Error("Pi authentication was not completed.");
    }

    localStorage.setItem(
      "mingle_pi_user",
      JSON.stringify(authResult.user)
    );

    localStorage.setItem(
      "mingle_login_type",
      "pi"
    );

    window.location.href = "dashboard.html";

  } catch (error) {

    console.error("Pi Login Error:", error);

    if (errorEl) {
      errorEl.innerText =
        error?.message ||
        "Unable to connect to Pi Network.";
    }
  }
}

window.piLogin = piLogin;

/* =========================================================
   MINGLE EMAIL LOGIN
   ========================================================= */

function openMinglePortal() {
  closeModal();

  const modal = document.createElement("div");
  modal.className = "modal";

  modal.innerHTML = `
    <div class="modal-content mingle-modal">

      <span class="close" onclick="closeModal()">&times;</span>

      <div style="
        font-size:48px;
        font-weight:700;
        color:#FFD700;
        text-shadow:0 0 25px rgba(255,215,0,.7);
        margin-bottom:5px;
      ">M</div>

      <h2>WELCOME TO MINGLE</h2>

      <p>
        Real People. Real Connections. Real Community.
      </p>

      <div
        id="auth-error"
        style="
          color:#ff8f8f;
          font-size:13px;
          min-height:18px;
          margin-bottom:5px;
        ">
      </div>

      <input
        type="email"
        id="email"
        placeholder="Email Address"
        autocomplete="email"
      >

      <input
        type="password"
        id="password"
        placeholder="Password"
        autocomplete="current-password"
      >

      <button
        class="btn mingle-btn"
        onclick="mingleLogin()">
        LOGIN
      </button>

      <button
        class="btn"
        onclick="mingleRegister()"
        style="
          background:rgba(255,255,255,.08);
          color:#FFD700;
          border:1px solid rgba(255,215,0,.35);
        ">
        CREATE ACCOUNT
      </button>

      <a
        href="#"
        onclick="forgotPassword(); return false;"
        style="
          display:block;
          margin-top:15px;
          color:#FFD700;
          text-decoration:none;
          font-size:13px;
        ">
        Forgot Password?
      </a>

    </div>
  `;

  document.body.appendChild(modal);
  activeModal = modal;

  setTimeout(() => {
    document.getElementById("email")?.focus();
  }, 100);
}

window.openMinglePortal = openMinglePortal;

/* =========================================================
   MINGLE LOGIN
   ========================================================= */

async function mingleLogin() {

  const email = document.getElementById("email")?.value.trim();
  const password = document.getElementById("password")?.value;
  const errorEl = document.getElementById("auth-error");
  const button = document.querySelector(".mingle-modal .btn.mingle-btn");

  if (errorEl) {
    errorEl.innerText = "";
    errorEl.style.color = "#ff8f8f";
  }

  if (!email || !password) {
    if (errorEl) {
      errorEl.innerText = "Please enter your email and password.";
    }
    return;
  }

  if (button) {
    button.disabled = true;
    button.innerText = "LOGGING IN...";
  }

  try {

    console.log("Mingle login started:", email);

    const result = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("Firebase login successful:", result.user.uid);

    localStorage.setItem("mingle_login_type", "mingle");
    localStorage.setItem(
      "mingle_email",
      result.user.email || email
    );

    if (errorEl) {
      errorEl.style.color = "#7CFF9B";
      errorEl.innerText = "Login successful. Entering Mingle...";
    }

    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 500);

  } catch (error) {

    console.error("Mingle Login Error:", error);

    if (errorEl) {

      switch (error.code) {

        case "auth/invalid-credential":
        case "auth/wrong-password":
          errorEl.innerText = "Incorrect email or password.";
          break;

        case "auth/user-not-found":
          errorEl.innerText =
            "No Mingle account exists with this email.";
          break;

        case "auth/invalid-email":
          errorEl.innerText =
            "Please enter a valid email address.";
          break;

        case "auth/too-many-requests":
          errorEl.innerText =
            "Too many login attempts. Please try again later.";
          break;

        case "auth/network-request-failed":
          errorEl.innerText =
            "Network connection failed. Check your internet.";
          break;

        default:
          errorEl.innerText =
            error.message || "Login failed.";
      }
    }

    if (button) {
      button.disabled = false;
      button.innerText = "LOGIN";
    }
  }
}

window.mingleLogin = mingleLogin;

/* =========================================================
   CREATE MINGLE ACCOUNT
   ========================================================= */

async function mingleRegister() {

  const email = document
    .getElementById("email")
    ?.value
    .trim();

  const password = document
    .getElementById("password")
    ?.value;

  const errorEl =
    document.getElementById("auth-error");

  if (errorEl) errorEl.innerText = "";

  if (!email || !password) {

    if (errorEl) {
      errorEl.innerText =
        "Enter your email and create a password.";
    }

    return;
  }

  if (password.length < 6) {

    if (errorEl) {
      errorEl.innerText =
        "Password must contain at least 6 characters.";
    }

    return;
  }

  try {

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    localStorage.setItem(
      "mingle_login_type",
      "mingle"
    );

    localStorage.setItem(
      "mingle_email",
      result.user.email || email
    );

    window.location.href = "dashboard.html";

  } catch (error) {

    console.error("Mingle Registration Error:", error);

    if (errorEl) {

      switch (error.code) {

        case "auth/email-already-in-use":
          errorEl.innerText =
            "This email already has a Mingle account. Please login.";
          break;

        case "auth/invalid-email":
          errorEl.innerText =
            "Please enter a valid email address.";
          break;

        case "auth/weak-password":
          errorEl.innerText =
            "Please choose a stronger password.";
          break;

        default:
          errorEl.innerText =
            error.message ||
            "Account creation failed.";
      }
    }
  }
}

window.mingleRegister = mingleRegister;

/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

async function forgotPassword() {

  const email =
    document.getElementById("email")?.value.trim();

  const errorEl =
    document.getElementById("auth-error");

  if (!email) {

    if (errorEl) {
      errorEl.innerText =
        "Enter your email address first.";
    }

    return;
  }

  try {

    await sendPasswordResetEmail(
      auth,
      email
    );

    if (errorEl) {
      errorEl.style.color = "#FFD700";
      errorEl.innerText =
        "Password reset email sent.";
    }

  } catch (error) {

    if (errorEl) {
      errorEl.style.color = "#ff8f8f";
      errorEl.innerText =
        error.message ||
        "Unable to send password reset email.";
    }
  }
}

window.forgotPassword = forgotPassword;

/* =========================================================
   CLOSE MODAL
   ========================================================= */

function closeModal() {

  const modal =
    document.querySelector(".modal");

  if (modal) {
    modal.remove();
  }

  activeModal = null;
}

window.closeModal = closeModal;

/* Close when clicking outside */
document.addEventListener("click", function (event) {

  const modal =
    document.querySelector(".modal");

  if (
    modal &&
    event.target === modal
  ) {
    closeModal();
  }

});

/* Close with ESC */
document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {
    closeModal();
  }

});
