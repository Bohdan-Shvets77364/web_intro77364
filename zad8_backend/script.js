
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const sList = document.getElementById('lista-umiejetnosci');
        const pList = document.getElementById('lista-projektow');
        if (sList) data.umiejetnosci.forEach(s => { let li = document.createElement('li'); li.textContent = s; sList.appendChild(li); });
        if (pList) data.projekty.forEach(p => { let li = document.createElement('li'); li.textContent = p; pList.appendChild(li); });
    }).catch(e => console.log("JSON loading skipped"));


function addNote() {
    const input = document.getElementById('noteInput');
    if (!input || !input.value.trim()) return;
    let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    notes.push(input.value.trim());
    localStorage.setItem('myNotes', JSON.stringify(notes));
    input.value = '';
    displayNotes();
}
function displayNotes() {
    const list = document.getElementById('notesList');
    if (!list) return;
    list.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    notes.forEach((n, i) => {
        const li = document.createElement('li');
        li.innerHTML = `${n} <button onclick="deleteNote(${i})" style="color:red; border:none; background:none; cursor:pointer;">[Usuń]</button>`;
        list.appendChild(li);
    });
}
function deleteNote(i) {
    let notes = JSON.parse(localStorage.getItem('myNotes'));
    notes.splice(i, 1);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    displayNotes();
}


function toggleTheme() {
    let t = document.getElementById('theme-style');
    if (t) t.getAttribute('href') === 'red.css' ? t.setAttribute('href', 'green.css') : t.setAttribute('href', 'red.css');
}
function toggleSection() {
    let s = document.getElementById('umiejetnosci-container');
    if (s) s.style.display = (s.style.display === 'none') ? 'block' : 'none';
}


const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        const successMsg = document.getElementById('successMsg');
        if(successMsg) successMsg.style.display = 'none';

        const fName = document.getElementById('firstName').value.trim();
        const lName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const comment = document.getElementById('comment').value.trim();

        let isValid = true;
        if (!fName || /\d/.test(fName)) { document.getElementById('firstNameError').textContent = "Błąd imienia!"; isValid = false; }
        if (!lName || /\d/.test(lName)) { document.getElementById('lastNameError').textContent = "Błąd nazwiska!"; isValid = false; }
        if (!email.includes('@')) { document.getElementById('emailError').textContent = "Błędny email!"; isValid = false; }
        if (comment.length < 5) { document.getElementById('commentError').textContent = "Min. 5 znaków!"; isValid = false; }

        if (isValid) {
            const formData = new FormData(this);
            const btn = this.querySelector('button');
            btn.disabled = true;
            btn.textContent = "Wysyłanie...";

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if(successMsg) successMsg.style.display = 'block';
                    this.reset();
                } else {
                    // Якщо Formspree все ще вередує, виведемо деталі в консоль
                    const errorData = await response.json();
                    console.error("Formspree error:", errorData);
                    alert("Serwer Formspree odrzucił żądanie. Sprawdź status formy.");
                }
            } catch (err) {
                alert("Błąd połączenia. Spróbuj za chwilę.");
            } finally {
                btn.disabled = false;
                btn.textContent = "Wyślij wiadomość na serwer";
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', displayNotes);
