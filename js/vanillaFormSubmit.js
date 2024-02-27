document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('download-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from submitting via the browser.

        // Construct the data object from the form fields
        var data = {
            email_user: form.elements['email_user'].value,
            tel: form.elements['tel'].value
        };

        // Create a new XMLHttpRequest
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://amo-back.onrender.com/send-email', true);
        xhr.setRequestHeader('Content-Type', 'application/json'); // Set the content type of the request

        xhr.onload = function() {
            if (xhr.status === 200) {
                // Success logic here
                toggleAlert(true);
            } else {
                // Error logic here
                toggleAlert(false);
            }
        };

        xhr.onerror = function() {
            // Network Error logic here
            toggleAlert(false);
        };

        // Send the request with the data as a JSON string
        xhr.send(JSON.stringify(data));
    });
});
