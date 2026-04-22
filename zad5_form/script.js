document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.getElementById('successMsg').style.display = 'none';

    let isValid = true;

    // Валідація імені
    const firstName = document.getElementById('firstName').value;
    if (firstName.trim() === '') {
        document.getElementById('firstNameError').textContent = 'Imię jest wymagane.';
        isValid = false;
    } else if (/\d/.test(firstName)) {
        document.getElementById('firstNameError').textContent = 'Imię nie może zawierać cyfr.';
        isValid = false;
    }

    // Валідація прізвища
    const lastName = document.getElementById('lastName').value;
    if (lastName.trim() === '') {
        document.getElementById('lastNameError').textContent = 'Nazwisko jest wymagane.';
        isValid = false;
    } else if (/\d/.test(lastName)) {
        document.getElementById('lastNameError').textContent = 'Nazwisko nie może zawierać cyfr.';
        isValid = false;
    }

    // Валідація імейла
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Wprowadź poprawny adres e-mail.';
        isValid = false;
    }

    // Валідація повідомлення
    const message = document.getElementById('message').value;
    if (message.trim().length < 5) {
        document.getElementById('messageError').textContent = 'Wiadomość musi mieć co najmniej 5 znaków.';
        isValid = false;
    }

    if (isValid) {
        document.getElementById('successMsg').style.display = 'block';
        document.getElementById('contactForm').reset(); // Очистити форму після успіху
    }
});
