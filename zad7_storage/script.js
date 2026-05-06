
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
    .catch(err => console.error("Błąd ładowania JSON:", err));


const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');

document.addEventListener('DOMContentLoaded', displayNotes);

function addNote() {
    const text = noteInput.value.trim();
    if (!text) return;
    let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    notes.push(text);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    noteInput.value = '';
    displayNotes();
}

function displayNotes() {
    notesList.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    notes.forEach((n, i) => {
        const li = document.createElement('li');
        li.style = "background: #fdfdfd; padding: 10px; margin-bottom: 8px; border-left: 5px solid #333; display: flex; justify-content: space-between; align-items: center;";
        li.innerHTML = `<span>${n}</span> <button onclick="deleteNote(${i})" style="color:red; border:none; background:none; cursor:pointer;">[Usuń]</button>`;
        notesList.appendChild(li);
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
    t.getAttribute('href') === 'red.css' ? t.setAttribute('href', 'green.css') : t.setAttribute('href', 'red.css');
}

function toggleSection() {
    let s = document.getElementById('umiejetnosci-container');
    s.style.display = (s.style.display === 'none') ? 'block' : 'none';
}


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const comment = document.getElementById('comment').value;
    
    if(name.length > 2 && comment.length > 5) {
        document.getElementById('successMsg').style.display = 'block';
        this.reset();
    }
});
