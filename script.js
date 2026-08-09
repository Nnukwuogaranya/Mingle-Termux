import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signOut
} from "./firebase.js";


/* =========================================================
   MINGLE AUTHENTICATION SYSTEM
   Empire → Login → Verification → Profile → Mingle
   ========================================================= */


/* =========================================================
   ELEMENTS
   ========================================================= */

const loginTab =
  document.getElementById("login-tab");

const signupTab =
  document.getElementById("signup-tab");

const loginForm =
  document.getElementById("login-form");

const emailInput =
  document.getElementById("email");

const passwordInput =
  document.getElementById("password");

const showPasswordBtn =
  document.getElementById("show-password");

const rememberMe =
  document.getElementById("remember-me");

const forgotPassword =
  document.getElementById("forgot-password");

const loginBtn =
  document.getElementById("login-btn");

const footerSignup =
  document.getElementById("footer-signup");

const errorEl =
  document.getElementById("auth-error");


/* =========================================================
   STATE
   ========================================================= */

let isSignupMode = false;

let signupNameInput = null;

let confirmPasswordInput = null;


/* =========================================================
   FIREBASE PERSISTENCE
   ========================================================= */

setPersistence(
  auth,
  browserLocalPersistence
).catch((error) => {
  console.warn(
    "Firebase persistence could not be enabled:",
    error
  );
});


/* =========================================================
   HELPERS
   ========================================================= */

function showError(message) {

  if (!errorEl) return;

  errorEl.textContent = message;

  errorEl.style.display = "block";

}


function clearError() {

  if (!errorEl) return;

  errorEl.textContent = "";

  errorEl.style.display = "none";

}


function setButtonLoading(loading, text = "") {

  if (!loginBtn) return;

  loginBtn.disabled = loading;

  const span =
    loginBtn.querySelector("span");

  if (span) {

    span.textContent =
      loading
        ? text
        : isSignupMode
          ? "Create Mingle Account"
          : "Login to Mingle";

  } else {

    loginBtn.textContent =
      loading
        ? text
        : isSignupMode
          ? "Create Mingle Account"
          : "Login to Mingle";

  }

}


function getErrorMessage(error) {

  const code =
    error?.code || "";

  switch (code) {

    case "auth/invalid-email":
      return "Please enter a valid email address.";

    case "auth/missing-password":
      return "Please enter your password.";

    case "auth/weak-password":
      return "Password must be at least 6 characters.";

    case "auth/email-already-in-use":
      return "An account already exists with this email.";

    case "auth/invalid-credential":
    case "auth/wrong-password":
    case "auth/user-not-found":
      return "Incorrect email or password.";

    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";

    case "auth/network-request-failed":
      return "Network error. Check your internet connection.";

    case "auth/user-disabled":
      return "This account has been disabled.";

    default:
      return (
        error?.message ||
        "Something went wrong. Please try again."
      );

  }

}


/* =========================================================
   PROFILE CHECK
   ========================================================= */

function profileIsComplete() {

  return (
    localStorage.getItem(
      "mingle_profile_complete"
    ) === "true"
  );

}


function continueAfterAuthentication(user) {

  if (!user) return;

  if (!user.emailVerified) {

    showError(
      "Please verify your email before entering Mingle."
    );

    return;

  }

  if (profileIsComplete()) {

    window.location.href = "home.html";

  } else {

    window.location.href = "profile.html";

  }

}


/* =========================================================
   CREATE SIGNUP FIELDS
   ========================================================= */

function createSignupFields() {

  if (!loginForm) return;

  if (
    signupNameInput &&
    confirmPasswordInput
  ) {
    return;
  }


  const passwordField =
    passwordInput?.closest(".form-group") ||
    passwordInput?.parentElement?.parentElement ||
    passwordInput?.parentElement;


  const nameWrapper =
    document.createElement("div");

  nameWrapper.className =
    "dynamic-signup-field";


  const nameLabel =
    document.createElement("label");

  nameLabel.textContent =
    "Full Name";


  signupNameInput =
    document.createElement("input");

  signupNameInput.type = "text";

  signupNameInput.id =
    "signup-name";

  signupNameInput.name =
    "name";

  signupNameInput.placeholder =
    "Enter your full name";

  signupNameInput.autocomplete =
    "name";


  nameWrapper.appendChild(
    nameLabel
  );

  nameWrapper.appendChild(
    signupNameInput
  );


  const confirmWrapper =
    document.createElement("div");

  confirmWrapper.className =
    "dynamic-signup-field";


  const confirmLabel =
    document.createElement("label");

  confirmLabel.textContent =
    "Confirm Password";


  confirmPasswordInput =
    document.createElement("input");

  confirmPasswordInput.type =
    "password";

  confirmPasswordInput.id =
    "confirm-password";

  confirmPasswordInput.name =
    "confirm-password";

  confirmPasswordInput.placeholder =
    "Confirm your password";

  confirmPasswordInput.autocomplete =
    "new-password";


  confirmWrapper.appendChild(
    confirmLabel
  );

  confirmWrapper.appendChild(
    confirmPasswordInput
  );


  if (passwordField) {

    passwordField.before(
      nameWrapper
    );

    passwordField.after(
      confirmWrapper
    );

  } else {

    loginForm.prepend(
      nameWrapper
    );

    loginForm.appendChild(
      confirmWrapper
    );

  }


  addDynamicFieldStyles();

}


/* =========================================================
   REMOVE SIGNUP FIELDS
   ========================================================= */

function removeSignupFields() {

  document
    .querySelectorAll(
      ".dynamic-signup-field"
    )
    .forEach((element) => {
      element.remove();
    });

  signupNameInput = null;

  confirmPasswordInput = null;

}


/* =========================================================
   DYNAMIC FIELD STYLING
   ========================================================= */

function addDynamicFieldStyles() {

  if (
    document.getElementById(
      "mingle-dynamic-auth-style"
    )
  ) {
    return;
  }


  const style =
    document.createElement("style");

  style.id =
    "mingle-dynamic-auth-style";

  style.textContent = `

    .dynamic-signup-field {
      margin-bottom: 16px;
    }

    .dynamic-signup-field label {
      display: block;
      margin-bottom: 7px;
      font-size: 12px;
      font-weight: 600;
    }

    .dynamic-signup-field input {
      width: 100%;
      box-sizing: border-box;
      padding: 13px 14px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,.14);
      outline: none;
      background: rgba(255,255,255,.06);
      color: #fff;
      font: inherit;
    }

    .dynamic-signup-field input:focus {
      border-color: rgba(212,175,55,.65);
    }

  `;

  document.head.appendChild(style);

}


/* =========================================================
   SWITCH TO LOGIN
   ========================================================= */

function showLoginMode() {

  isSignupMode = false;

  clearError();

  removeSignupFields();

  if (loginTab) {

    loginTab.classList.add("active");

  }

  if (signupTab) {

    signupTab.classList.remove("active");

  }

  if (loginBtn) {

    const span =
      loginBtn.querySelector("span");

    if (span) {

      span.textContent =
        "Login to Mingle";

    } else {

      loginBtn.textContent =
        "Login to Mingle";

    }

  }

  if (footerSignup) {

    footerSignup.textContent =
      "Create your account";

  }

}


/* =========================================================
   SWITCH TO SIGNUP
   ========================================================= */

function showSignupMode() {

  isSignupMode = true;

  clearError();

  createSignupFields();

  if (loginTab) {

    loginTab.classList.remove("active");

  }

  if (signupTab) {

    signupTab.classList.add("active");

  }

  if (loginBtn) {

    const span =
      loginBtn.querySelector("span");

    if (span) {

      span.textContent =
        "Create Mingle Account";

    } else {

      loginBtn.textContent =
        "Create Mingle Account";

    }

  }

  if (footerSignup) {

    footerSignup.textContent =
      "Back to login";

  }

}


/* =========================================================
   TAB EVENTS
   ========================================================= */

loginTab?.addEventListener(
  "click",
  showLoginMode
);


signupTab?.addEventListener(
  "click",
  showSignupMode
);


footerSignup?.addEventListener(
  "click",
  (event) => {

    event.preventDefault();

    if (isSignupMode) {

      showLoginMode();

    } else {

      showSignupMode();

    }

  }
);


/* =========================================================
   SHOW / HIDE PASSWORD
   ========================================================= */

showPasswordBtn?.addEventListener(
  "click",
  () => {

    if (!passwordInput) return;

    const showing =
      passwordInput.type === "text";

    passwordInput.type =
      showing
        ? "password"
        : "text";

    showPasswordBtn.textContent =
      showing
        ? "◉"
        : "◎";

  }
);


/* =========================================================
   FORGOT PASSWORD
   ========================================================= */

forgotPassword?.addEventListener(
  "click",
  async (event) => {

    event.preventDefault();

    clearError();

    const email =
      emailInput?.value.trim();

    if (!email) {

      showError(
        "Enter your email address first."
      );

      emailInput?.focus();

      return;

    }

    try {

      await sendPasswordResetEmail(
        auth,
        email
      );

      showError(
        "Password reset email sent. Check your inbox."
      );

    } catch (error) {

      showError(
        getErrorMessage(error)
      );

    }

  }
);


/* =========================================================
   LOGIN
   ========================================================= */

async function loginUser() {

  clearError();

  const email =
    emailInput?.value.trim();

  const password =
    passwordInput?.value || "";


  if (!email) {

    showError(
      "Please enter your email address."
    );

    emailInput?.focus();

    return;

  }


  if (!password) {

    showError(
      "Please enter your password."
    );

    passwordInput?.focus();

    return;

  }


  setButtonLoading(
    true,
    "Signing in..."
  );


  try {

    const result =
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


    const user =
      result.user;


    if (!user.emailVerified) {

      showError(
        "Your email has not been verified yet. Please check your inbox."
      );

      try {

        await sendEmailVerification(
          user
        );

      } catch (_) {}

      return;

    }


    continueAfterAuthentication(
      user
    );


  } catch (error) {

    showError(
      getErrorMessage(error)
    );

  } finally {

    setButtonLoading(
      false
    );

  }

}


/* =========================================================
   CREATE ACCOUNT
   ========================================================= */

async function createAccount() {

  clearError();

  const name =
    signupNameInput?.value.trim() || "";

  const email =
    emailInput?.value.trim();

  const password =
    passwordInput?.value || "";

  const confirmPassword =
    confirmPasswordInput?.value || "";


  if (name.length < 2) {

    showError(
      "Please enter your full name."
    );

    signupNameInput?.focus();

    return;

  }


  if (!email) {

    showError(
      "Please enter your email address."
    );

    emailInput?.focus();

    return;

  }


  if (password.length < 6) {

    showError(
      "Password must be at least 6 characters."
    );

    passwordInput?.focus();

    return;

  }


  if (password !== confirmPassword) {

    showError(
      "Your passwords do not match."
    );

    confirmPasswordInput?.focus();

    return;

  }


  setButtonLoading(
    true,
    "Creating account..."
  );


  try {

    const result =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


    const user =
      result.user;


    await sendEmailVerification(
      user
    );


    localStorage.setItem(
      "mingle_pending_name",
      name
    );


    showError(
      "Account created! A verification email has been sent to " +
      email +
      ". Please verify your email, then return here and log in."
    );


    await signOut(auth);


  } catch (error) {

    showError(
      getErrorMessage(error)
    );

  } finally {

    setButtonLoading(
      false
    );

  }

}


/* =========================================================
   FORM SUBMISSION
   ========================================================= */

loginForm?.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();

    if (isSignupMode) {

      await createAccount();

    } else {

      await loginUser();

    }

  }
);


/* =========================================================
   LOGIN BUTTON
   ========================================================= */

loginBtn?.addEventListener(
  "click",
  async (event) => {

    event.preventDefault();

    if (isSignupMode) {

      await createAccount();

    } else {

      await loginUser();

    }

  }
);


/* =========================================================
   AUTH STATE
   ========================================================= */

onAuthStateChanged(
  auth,
  (user) => {

    if (!user) return;

    if (!user.emailVerified) return;

    continueAfterAuthentication(
      user
    );

  }
);


/* =========================================================
   INITIAL MODE
   ========================================================= */

showLoginMode();

