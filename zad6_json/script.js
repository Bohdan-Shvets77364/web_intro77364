
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const sList = document.getElementById('lista-umiejetnosci');
        data.umiejetnosci.forEach(s => {
            let li = document.createElement('li');
            li.textContent = s;
            sList.appendChild(li);
        });
        const pList = document.getElementById('lista-projektow');
        data.projekty.forEach(p => {
            let li = document.createElement('li');
            li.textContent = p;
            pList.appendChild(li);
        });
    })
    .catch(err => console.error("Błąd fetch:", err));


function toggleTheme() {
    let t = document.getElementById('theme-style');
    let current = t.getAttribute('href');
    t.setAttribute('href', current === 'red.css' ? 'green.css' : 'red.css');
}


function toggleSection() {
    let s = document.getElementById('umiejetnosci-container');
    s.style.display = (s.style.display === 'none') ? 'block' : 'none';
}


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.getElementById('successMsg').style.display = 'none';

    let isValid = true;
    const fName = document.getElementById('firstName').value.trim();
    const lName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();

    if (fName === '' || /\d/.test(fName)) {
        document.getElementById('firstNameError').textContent = 'Wpisz poprawne imię (bez cyfr).';
        isValid = false;
    }
    if (lName === '' || /\d/.test(lName)) {
        document.getElementById('lastNameError').textContent = 'Wpisz poprawne nazwisko (bez cyfr).';
        isValid = false;
    }
    if (!email.includes('@') || email.length < 5) {
        document.getElementById('emailError').textContent = 'Wpisz poprawny adres e-mail.';
        isValid = false;
    }

    if (isValid) {
        document.getElementById('successMsg').style.display = 'block';
        this.reset();
    }
});
