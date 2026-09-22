// AUTONOA LABS website interactions + enquiry validation/submission.
const menu = document.querySelector('.menu');
const navLinks = document.querySelector('.nav-links');
if (menu && navLinks) {
  menu.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}

const GOOGLE_SHEETS_ENDPOINT = 'https://script.google.com/macros/s/AKfycbxv6-xTXB4nbcH2QAFgOarVQnlJLHvCkX97pwNtnE0m97ZHFwa6F1V4KYdM6gEJgzORbw/exec';
const form = document.getElementById('enquiry-form');
const success = document.getElementById('form-success');
const formError = document.getElementById('form-error');
const submitButton = form ? form.querySelector('.submit-btn') : null;
const processField = document.getElementById('process');
const processCount = document.getElementById('process-count');

const fields = {
  name: document.getElementById('name'),
  company: document.getElementById('company'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  process: document.getElementById('process'),
  systems: document.getElementById('systems')
};

function setFieldState(field, message = '') {
  if (!field) return false;
  const wrapper = field.closest('.field');
  const error = document.querySelector(`[data-error-for="${field.id}"]`);
  if (wrapper) wrapper.classList.toggle('invalid', Boolean(message));
  if (wrapper) wrapper.classList.toggle('valid', !message && field.value.trim() !== '');
  if (error) error.textContent = message;
  return !message;
}

function validateField(field) {
  if (!field) return true;
  const value = field.value.trim();
  let message = '';

  if (field.id === 'name' && value.length < 2) message = 'Please enter your name.';
  if (field.id === 'email') {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    if (!ok) message = 'Please enter a valid email address.';
  }
  if (field.id === 'phone' && value && !/^[+\d][\d\s().-]{7,18}$/.test(value)) message = 'Please enter a valid phone number.';
  if (field.id === 'process' && value.length < 15) message = 'Tell us a little more — at least 15 characters.';
  if (field.id === 'process' && value.length > 1500) message = 'Please keep this under 1500 characters.';

  return setFieldState(field, message);
}

Object.values(fields).forEach(field => {
  if (!field) return;
  field.addEventListener('blur', () => validateField(field));
  field.addEventListener('input', () => {
    if (field.id === 'process' && processCount) processCount.textContent = `${field.value.length} / 1500`;
    const wrapper = field.closest('.field');
    if (wrapper && wrapper.classList.contains('invalid')) validateField(field);
  });
});

function updateProgress() {
  if (!form) return;
  const required = [fields.name, fields.email, fields.process];
  const complete = required.filter(f => f && f.value.trim() !== '').length;
  const progress = form.querySelector('.form-progress span');
  if (progress) progress.style.width = `${Math.max(28, Math.min(100, 28 + complete * 24))}%`;
}
Object.values(fields).forEach(field => field && field.addEventListener('input', updateProgress));

if (form && success) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    success.hidden = true;
    if (formError) formError.hidden = true;

    const honeypot = document.getElementById('website');
    if (honeypot && honeypot.value.trim() !== '') return;

    const valid = [fields.name, fields.email, fields.phone, fields.process]
      .map(validateField)
      .every(Boolean);
    updateProgress();
    if (!valid) {
      const firstInvalid = form.querySelector('.field.invalid input, .field.invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const originalText = submitButton ? submitButton.querySelector('.button-text')?.textContent : '';
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.classList.add('loading');
      if (submitButton.querySelector('.button-text')) submitButton.querySelector('.button-text').textContent = 'Sending…';
    }

    const formData = new FormData(form);
    const payload = new URLSearchParams();
    payload.append('fullName', formData.get('fullName') || '');
    payload.append('businessName', formData.get('businessName') || '');
    payload.append('email', formData.get('email') || '');
    payload.append('phone', formData.get('phone') || '');
    payload.append('process', formData.get('process') || '');
    payload.append('additionalInfo', formData.get('systems') || '');

    try {
      // no-cors is intentional: Google Apps Script accepts this simple form POST.
      await fetch(GOOGLE_SHEETS_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: {'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
        body: payload.toString()
      });

      form.reset();
      Object.values(fields).forEach(field => field && setFieldState(field, ''));
      if (processCount) processCount.textContent = '0 / 1500';
      if (success) {
        success.hidden = false;
        success.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
      updateProgress();
    } catch (error) {
      console.error('Enquiry submission failed:', error);
      if (formError) {
        formError.textContent = 'We could not send the enquiry right now. Please try again or contact AUTONOA LABS directly.';
        formError.hidden = false;
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        if (submitButton.querySelector('.button-text')) submitButton.querySelector('.button-text').textContent = originalText || 'Send My Enquiry';
      }
    }
  });
}
