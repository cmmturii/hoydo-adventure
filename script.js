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
document.addEventListener('DOMContentLoaded', function () {

  var form = document.querySelector('.booking-form');

  if (!form) {
    console.error('Booking form not found!');
    return;
  }

  console.log('Booking form found');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    var data = {
      name:      form.querySelector('[name="name"]').value,
      phone:     form.querySelector('[name="phone"]').value,
      email:     form.querySelector('[name="email"]').value,
      date:      form.querySelector('[name="date"]').value,
      adventure: form.querySelector('[name="adventure"]').value,
      group:     form.querySelector('[name="group"]').value,
      message:   form.querySelector('[name="message"]').value
    };

    // Send to Formspree
    fetch('https://formspree.io/f/mrealojj', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    })
    .then(function(res) { return res.json(); })
    .then(function() {
      // Send to Google Sheets
      fetch('https://script.google.com/macros/s/AKfycbzt5bZCCWLwZkAHg-u6JnPF42cHO4iRyEzmvTXjNs5REYGTEQ7pqX3ymhKKKd134iqS/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      btn.textContent = 'Booking Sent!';
      btn.style.background = '#2ecc71';
      form.reset();
      setTimeout(function() {
        btn.textContent = 'Send Booking Request';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    })
    .catch(function(err) {
      console.error('Error:', err);
      btn.textContent = 'Try again';
      btn.style.background = '#e74c3c';
      btn.disabled = false;
      setTimeout(function() {
        btn.textContent = 'Send Booking Request';
        btn.style.background = '';
      }, 4000);
    });
  });
});