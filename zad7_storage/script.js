
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
    });


const noteInput = document.getElementById('noteInput');
const notesList = document.getElementById('notesList');


document.addEventListener('DOMContentLoaded', displayNotes);

function addNote() {
    const noteText = noteInput.value.trim();
    if (noteText === '') return;

    let notes = localStorage.getItem('myNotes') ? JSON.parse(localStorage.getItem('myNotes')) : [];
    notes.push(noteText);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    
    noteInput.value = '';
    displayNotes();
}

function displayNotes() {
    notesList.innerHTML = '';
    let notes = localStorage.getItem('myNotes') ? JSON.parse(localStorage.getItem('myNotes')) : [];
    
    notes.forEach((note, index) => {
        let li = document.createElement('li');
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.marginBottom = '10px';
        li.innerHTML = `
            <span>${note}</span>
            <button onclick="deleteNote(${index})" style="background: #e74c3c; color: white; border: none; padding: 2px 10px; cursor: pointer; border-radius: 5px;">Usuń</button>
        `;
        notesList.appendChild(li);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('myNotes'));
    notes.splice(index, 1);
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
   
    document.getElementById('successMsg').style.display = 'block';
});
