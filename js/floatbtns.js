// Add this script to your main page's <script> tag

// Dynamically load floating buttons
document.addEventListener("DOMContentLoaded", function() {
    fetch('floatbtns.html')
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(html => {
            document.getElementById('float-buttons-container').innerHTML = html;
        })
        .catch(error => console.warn('Could not load floating buttons:', error));
});