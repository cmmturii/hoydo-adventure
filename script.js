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
  if (!form) { console.error('Form not found'); return; }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('.btn-submit');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    var formData = new FormData(form);

    // Send to Formspree using FormData (most reliable method)
    fetch('https://formspree.io/f/mrealojj', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
    .then(function(res) {
      if (res.ok) {
        // Also send to Google Sheets
        var data = {};
        formData.forEach(function(value, key) { data[key] = value; });
        fetch('https://script.google.com/macros/s/AKfycbzt5bZCCWLwZkAHg-u6JnPF42cHO4iRyEzmvTXjNs5REYGTEQ7pqX3ymhKKKd134iqS/exec', {
          method: 'POST',
          mode: 'no-cors',
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
      } else {
        throw new Error('Formspree error');
      }
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