// Dynamically load footer.html and apply footer.css
(function() {
  // Add footer.css if not already present
  if (!document.querySelector('link[href$="footer.css"]')) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'footer.css';
    document.head.appendChild(link);
  }

  // Create footer placeholder if not present
  var placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) {
    placeholder = document.createElement('div');
    placeholder.id = 'footer-placeholder';
    document.body.appendChild(placeholder);
  }

  // Load footer.html into placeholder
  fetch('footer.html')
    .then(function(response) { return response.text(); })
    .then(function(html) {
      placeholder.innerHTML = html;
    })
    .catch(function(err) {
      placeholder.innerHTML = '<p>Error loading footer.</p>';
      console.error('Footer load error:', err);
    });
})();
