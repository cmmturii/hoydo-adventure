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

// Close sidebar on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeSidebar();
});

// Booking form submission
function handleSubmit(e) {
  e.preventDefault();
  alert("Thank you! We'll be in touch within 24 hours to confirm your adventure. 🏔️");
  e.target.reset();
}
