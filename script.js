// ── SIDEBAR ──
function openSidebar() {
  document.getElementById('sidebar').classList.add('open');
  document.getElementById('sbOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sbOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSidebar();
});

// ── BOOKING FORM ──
const FORMSPREE_URL = 'https://formspree.io/f/mrealojj';
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbzt5bZCCWLwZkAHg-u6JnPF42cHO4iRyEzmvTXjNs5REYGTEQ7pqX3ymhKKKd134iqS/exec'; // paste your URL here later

async function handleSubmit(e) {
  e.preventDefault();

  const form = document.getElementById('bookingForm');
  const btn  = form.querySelector('.btn-submit');

  // Get form data
  const data = {
    name:      form.querySelector('[name="name"]').value,
    phone:     form.querySelector('[name="phone"]').value,
    email:     form.querySelector('[name="email"]').value,
    date:      form.querySelector('[name="date"]').value,
    adventure: form.querySelector('[name="adventure"]').value,
    group:     form.querySelector('[name="group"]').value,
    message:   form.querySelector('[name="message"]').value,
  };

  // Show loading state
  btn.textContent = 'Sending…';
  btn.disabled = true;

  try {
    // 1️⃣ Send to Formspree (email to hoydoriydi@gmail.com)
    await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });

    // 2️⃣ Send to Google Sheets (if URL is set)
    if (GOOGLE_SHEET_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
    }

    // Success
    btn.textContent = '✅ Booking Sent!';
    btn.style.background = '#2ecc71';
    form.reset();

    setTimeout(() => {
      btn.textContent = 'Send Booking Request';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);

  } catch (err) {
    btn.textContent = '❌ Something went wrong. Try again.';
    btn.style.background = '#e74c3c';
    btn.disabled = false;
    setTimeout(() => {
      btn.textContent = 'Send Booking Request';
      btn.style.background = '';
    }, 4000);
  }
}