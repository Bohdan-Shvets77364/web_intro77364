
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const skillsList = document.getElementById('lista-umiejetnosci');
        data.umiejetnosci.forEach(skill => {
            let li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });

        const projectsList = document.getElementById('lista-projektow');
        data.projekty.forEach(project => {
            let li = document.createElement('li');
            li.textContent = project;
            projectsList.appendChild(li);
        });
    })
    .catch(error => console.error('Błąd ładowania JSON:', error));


function toggleTheme() {
    let theme = document.getElementById('theme-style');
    theme.getAttribute('href') === 'red.css' ? theme.setAttribute('href', 'green.css') : theme.setAttribute('href', 'red.css');
}


function toggleSection() {
    let s = document.getElementById('umiejetnosci-container');
    s.style.display = (s.style.display === 'none') ? 'block' : 'none';
}


document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let name = document.getElementById('firstName').value;
    let isValid = name.trim() !== "" && !/\d/.test(name);
    
    document.getElementById('firstNameError').textContent = isValid ? "" : "Błędne imię!";
    if(isValid) document.getElementById('successMsg').style.display = 'block';
});
