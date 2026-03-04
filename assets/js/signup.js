// signup.js — Signup form validation and routing

// Toggle password visibility
const toggleBtn = document.getElementById('toggle-password');
const pwInput  = document.getElementById('password-input');
toggleBtn.addEventListener('click', () => {
  const isText = pwInput.type === 'text';
  pwInput.type = isText ? 'password' : 'text';
  toggleBtn.querySelector('span').textContent = isText ? 'visibility' : 'visibility_off';
});

// Form validation & submit
document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  let valid = true;

  const fullname = document.getElementById('fullname-input');
  const email    = document.getElementById('email-input');
  const password = document.getElementById('password-input');
  const confirm  = document.getElementById('confirm-password-input');
  const terms    = document.getElementById('terms');

  const fields = { fullname, email, password, confirm };
  Object.values(fields).forEach(f => f.classList.remove('form-input--error'));
  document.querySelectorAll('.form-error').forEach(e => e.classList.remove('show'));
  document.getElementById('error-message').classList.remove('show');

  if (!fullname.value.trim()) {
    document.getElementById('fullname-error').classList.add('show');
    fullname.classList.add('form-input--error');
    valid = false;
  }
  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    document.getElementById('email-error').classList.add('show');
    email.classList.add('form-input--error');
    valid = false;
  }
  if (!password.value || password.value.length < 6) {
    document.getElementById('password-error').classList.add('show');
    password.classList.add('form-input--error');
    valid = false;
  }
  if (confirm.value !== password.value) {
    document.getElementById('confirm-error').classList.add('show');
    confirm.classList.add('form-input--error');
    valid = false;
  }
  if (!terms.checked) {
    document.getElementById('terms-error').classList.add('show');
    valid = false;
  }

  if (valid) {
    window.location.href = 'dashboard.html';
  }
});
