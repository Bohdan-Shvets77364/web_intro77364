
fetch('data.json').then(res => res.json()).then(data => {
    const sList = document.getElementById('lista-umiejetnosci');
    data.umiejetnosci.forEach(s => { let li = document.createElement('li'); li.textContent = s; sList.appendChild(li); });
});


const form = document.getElementById('contactForm');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    

    const fName = document.getElementById('firstName').value.trim();
    const lName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();
    const hasDigits = /\d/;

    let isValid = true;
    if (fName === "" || hasDigits.test(fName)) { document.getElementById('firstNameError').textContent = "Błędne imię!"; isValid = false; }
    if (lName === "" || hasDigits.test(lName)) { document.getElementById('lastNameError').textContent = "Błędne nazwisko!"; isValid = false; }
    if (!email.includes('@')) { document.getElementById('emailError').textContent = "Błędny e-mail!"; isValid = false; }
    if (comment.length < 5) { document.getElementById('commentError').textContent = "Min. 5 znaków!"; isValid = false; }

    if (isValid) {
        
        const formData = new FormData(this);
        
        try {
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                document.getElementById('successMsg').style.display = 'block';
                form.reset();
            } else {
                alert("Błąd serwera. Spróbuj później.");
            }
        } catch (error) {
            alert("Błąd połączenia z backendem.");
        }
    }
});

// Функції тем та нотаток копіюємо з Завдання 7
