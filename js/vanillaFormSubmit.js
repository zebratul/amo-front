document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('download-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        var data = {
            email_user: form.elements['email_user'].value,
            tel: form.elements['tel'].value
        };

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://amo-back.onrender.com/send-email', true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function() {
            var alertBox = document.getElementById('download-form-alert');
            var alertText = document.querySelector('.download-form-alert-txt');
            if (xhr.status === 200) {
                alertText.textContent = 'Спасибо, мы скоро свяжемся с Вами!';
                alertBox.classList.add('download-form-alert-visible');
            } else {
                alertText.textContent = 'К сожалению, возникла ошибка';
                alertBox.classList.add('download-form-alert-visible');
            }
        };

        xhr.onerror = function() {
            var alertBox = document.getElementById('download-form-alert');
            document.querySelector('.download-form-alert-txt').textContent = 'К сожалению, возникла ошибка';
            alertBox.classList.add('download-form-alert-visible');
        };

        xhr.send(JSON.stringify(data));
    });
});

function toggleAlert() {
    var alertBox = document.getElementById('download-form-alert');
    alertBox.classList.remove('download-form-alert-visible');
}
