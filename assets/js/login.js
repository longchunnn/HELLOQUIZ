// login.js — Login form validation and routing

// Toggle password visibility
const toggleBtn = document.getElementById('toggle-password');
const pwInput  = document.getElementById('password-input');
toggleBtn.addEventListener('click', () => {
  const isText = pwInput.type === 'text';
  pwInput.type = isText ? 'password' : 'text';
  toggleBtn.querySelector('span').textContent = isText ? 'visibility' : 'visibility_off';
});

// Form validation & submit
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const email = document.getElementById('email-input');
  const password = document.getElementById('password-input');
  const emailErr = document.getElementById('email-error');
  const pwErr    = document.getElementById('password-error');
  const errMsg   = document.getElementById('error-message');

  // Reset
  emailErr.classList.remove('show');
  pwErr.classList.remove('show');
  errMsg.classList.remove('show');
  email.classList.remove('form-input--error');
  password.classList.remove('form-input--error');

  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailErr.classList.add('show');
    email.classList.add('form-input--error');
    valid = false;
  }
  if (!password.value || password.value.length < 6) {
    pwErr.textContent = 'Mật khẩu phải có ít nhất 6 ký tự.';
    pwErr.classList.add('show');
    password.classList.add('form-input--error');
    valid = false;
  }

  if (!valid) return;

  // Giả lập đăng nhập — chuyển hướng theo role
  if (email.value === 'admin@helloquizz.com') {
    window.location.href = 'admin-dashboard.html';
  } else {
    window.location.href = 'dashboard.html';
  }
});
