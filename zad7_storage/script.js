
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const container = document.getElementById('dynamic-content');
        let html = "<h3>Umiejętności:</h3><ul>";
        data.umiejetnosci.forEach(s => html += `<li>${s}</li>`);
        html += "</ul><h3>Projekty:</h3><ol>";
        data.projekty.forEach(p => html += `<li>${p}</li>`);
        html += "</ol>";
        container.innerHTML = html;
    });


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
        li.style = "background: #f9f9f9; padding: 10px; margin-bottom: 5px; border-left: 4px solid #333; display: flex; justify-content: space-between;";
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
    let s = document.getElementById('json-data-container');
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
