
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const sList = document.getElementById('lista-umiejetnosci');
        const pList = document.getElementById('lista-projektow');
        
        if (sList && data.umiejetnosci) {
            data.umiejetnosci.forEach(s => {
                let li = document.createElement('li');
                li.textContent = s;
                sList.appendChild(li);
            });
        }
        
        if (pList && data.projekty) {
            data.projekty.forEach(p => {
                let li = document.createElement('li');
                li.textContent = p;
                pList.appendChild(li);
            });
        }
    })
    .catch(err => console.log("Błąd ładowania JSON:", err));

function toggleTheme() {
    const themeLink = document.getElementById('theme-style');
    const currentTheme = themeLink.getAttribute('href');
    
    if (currentTheme === 'red.css') {
        themeLink.setAttribute('href', 'green.css');
    } else {
        themeLink.setAttribute('href', 'red.css');
    }
}


function toggleSection() {
    const section = document.getElementById('umiejetnosci-container');
    if (section) {
        section.style.display = (section.style.display === 'none') ? 'block' : 'none';
    }
}


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
    if (!list) return;
    
    list.innerHTML = '';
    let notes = JSON.parse(localStorage.getItem('myNotes') || '[]');
    
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.style = "background: #fff; padding: 10px; margin-bottom: 5px; border-left: 5px solid #333; display: flex; justify-content: space-between; align-items: center;";
        li.innerHTML = `<span>${note}</span> <button onclick="deleteNote(${index})" style="color:red; border:none; background:none; cursor:pointer;">[Usuń]</button>`;
        list.appendChild(li);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem('myNotes'));
    notes.splice(index, 1);
    localStorage.setItem('myNotes', JSON.stringify(notes));
    displayNotes();
}


document.addEventListener('DOMContentLoaded', displayNotes);
