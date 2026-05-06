
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const sList = document.getElementById('lista-umiejetnosci');
        const pList = document.getElementById('lista-projektow');
        if (sList) data.umiejetnosci.forEach(s => {
            let li = document.createElement('li');
            li.textContent = s;
            sList.appendChild(li);
        });
        if (pList) data.projekty.forEach(p => {
            let li = document.createElement('li');
            li.textContent = p;
            pList.appendChild(li);
        });
    });


function addNote() {
    const input = document.getElementById('noteInput');
    const text = input.value.trim();
    if (!text) return;
    let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    notes.push(text);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    input.value = '';
    displayNotes();
}

function displayNotes() {
    const list = document.getElementById('notesList');
    list.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    notes.forEach((n, i) => {
        const li = document.createElement('li');
        li.style = "background: #fdfdfd; padding: 10px; margin-bottom: 8px; border-left: 5px solid #333; display: flex; justify-content: space-between; align-items: center; border: 1px solid #ddd;";
        li.innerHTML = `<span>${n}</span> <button onclick="deleteNote(${i})" style="color:red; border:none; background:none; cursor:pointer; font-weight:bold;">[Usuń]</button>`;
        list.appendChild(li);
    });
}
function deleteNote(i) {
    let notes = JSON.parse(localStorage.getItem('myNotes'));
    notes.splice(i, 1);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    displayNotes();
}
document.addEventListener('DOMContentLoaded', displayNotes);


function toggleTheme() {
    let t = document.getElementById('theme-style');
    t.getAttribute('href') === 'red.css' ? t.setAttribute('href', 'green.css') : t.setAttribute('href', 'red.css');
}
function toggleSection() {
    let s = document.getElementById('umiejetnosci-container');
    s.style.display = (s.style.display === 'none') ? 'block' : 'none';
}


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

   
    document.querySelectorAll('.error-msg').forEach(el => el.textContent = '');
    document.getElementById('successMsg').style.display = 'none';

    const fName = document.getElementById('firstName').value.trim();
    const lName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const comment = document.getElementById('comment').value.trim();
    
    let isValid = true;
    const hasDigits = /\d/; 

    
    if (fName === "") {
        document.getElementById('firstNameError').textContent = "Imię nie może być puste.";
        isValid = false;
    } else if (hasDigits.test(fName)) {
        document.getElementById('firstNameError').textContent = "Imię nie może zawierać cyfr!";
        isValid = false;
    }

    
    if (lName === "") {
        document.getElementById('lastNameError').textContent = "Nazwisko nie może być puste.";
        isValid = false;
    } else if (hasDigits.test(lName)) {
        document.getElementById('lastNameError').textContent = "Nazwisko nie może zawierać cyfr!";
        isValid = false;
    }

    
    if (!email.includes('@')) {
        document.getElementById('emailError').textContent = "Wpisz poprawny e-mail.";
        isValid = false;
    }

   
    if (comment.length < 5) {
        document.getElementById('commentError').textContent = "Komentarz musi mieć co najmniej 5 znaków.";
        isValid = false;
    }

    if (isValid) {
        document.getElementById('successMsg').style.display = 'block';
        this.reset();
    }
});
