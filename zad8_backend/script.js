
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const sList = document.getElementById('lista-umiejetnosci');
        const pList = document.getElementById('lista-projektow');
        if (sList && data.umiejetnosci) {
            sList.innerHTML = ''; 
            data.umiejetnosci.forEach(s => {
                let li = document.createElement('li');
                li.textContent = s;
                sList.appendChild(li);
            });
        }
        if (pList && data.projekty) {
            pList.innerHTML = '';
            data.projekty.forEach(p => {
                let li = document.createElement('li');
                li.textContent = p;
                pList.appendChild(li);
            });
        }
    }).catch(e => console.log("JSON error or file missing"));


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
        li.style = "background: #fff; padding: 10px; margin-bottom: 5px; border: 1px solid #ccc; display: flex; justify-content: space-between;";
        li.innerHTML = `<span>${n}</span> <button onclick="deleteNote(${i})" style="color:red; border:none; background:none; cursor:pointer;">[Usuń]</button>`;
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
    if (!t) return;
    t.getAttribute('href') === 'red.css' ? t.setAttribute('href', 'green.css') : t.setAttribute('href', 'red.css');
}

function toggleSection() {
    let s = document.getElementById('umiejetnosci-container');
    if (s) s.style.display = (s.style.display === 'none') ? 'block' : 'none';
}

// 4. ВАЛІДАЦІЯ ТА BACKEND (ФОРМА)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Скидаємо помилки
        document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
        const successMsg = document.getElementById('successMsg');
        if(successMsg) successMsg.style.display = 'none';

        const fName = document.getElementById('firstName').value.trim();
        const lName = document.getElementById('lastName').value.trim();
        const email = document.getElementById('email').value.trim();
        const comment = document.getElementById('comment').value.trim();
        const hasDigits = /\d/;

        let isValid = true;
        if (!fName || hasDigits.test(fName)) { document.getElementById('firstNameError').textContent = "Błąd imienia!"; isValid = false; }
        if (!lName || hasDigits.test(lName)) { document.getElementById('lastNameError').textContent = "Błąd nazwiska!"; isValid = false; }
        if (!email.includes('@')) { document.getElementById('emailError').textContent = "Błędny email!"; isValid = false; }
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
                    if(successMsg) successMsg.style.display = 'block';
                    this.reset();
                } else {
                    alert("Błąd serwera. Sprawdź czy aktywowałeś formę w emailu.");
                }
            } catch (error) {
                alert("Błąd połączenia. Spróbuj później.");
            }
        }
    });
}

// Запуск при завантаженні
document.addEventListener('DOMContentLoaded', displayNotes);
