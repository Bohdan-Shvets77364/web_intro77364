
function toggleTheme() {
    let theme = document.getElementById('theme-style');
    if (theme.getAttribute('href') === 'red.css') {
        theme.setAttribute('href', 'green.css');
    } else {
        theme.setAttribute('href', 'red.css');
    }
}

function toggleSection() {
    let section = document.getElementById('umiejetnosci');
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    document.querySelectorAll('[id$="Error"]').forEach(el => el.textContent = '');
    document.getElementById('successMsg').style.display = 'none';

    let isValid = true;

    const fName = document.getElementById('firstName').value;
    if (fName.trim() === '') {
        document.getElementById('firstNameError').textContent = 'Imię jest wymagane.';
        isValid = false;
    } else if (/\d/.test(fName)) {
        document.getElementById('firstNameError').textContent = 'Imię nie może zawierać cyfr.';
        isValid = false;
    }


    const lName = document.getElementById('lastName').value;
    if (lName.trim() === '') {
        document.getElementById('lastNameError').textContent = 'Nazwisko jest wymagane.';
        isValid = false;
    } else if (/\d/.test(lName)) {
        document.getElementById('lastNameError').textContent = 'Nazwisko nie może zawierać cyfr.';
        isValid = false;
    }

  
    const email = document.getElementById('email').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Wprowadź poprawny email.';
        isValid = false;
    }

    if (isValid) {
        document.getElementById('successMsg').style.display = 'block';
        document.getElementById('contactForm').reset();
    }
});
