function toggleTheme() {
    let theme = document.getElementById('theme-style');
    
    
    if (theme.getAttribute('href') === 'red.css') {
        theme.setAttribute('href', 'green.css');
    } else {
        theme.setAttribute('href', 'red.css');
    }
}

function toggleSection() {
    let section = document.getElementById('umiejetnosci');
    
    
    if (section.style.display === 'none') {
        section.style.display = 'block';
    } else {
        section.style.display = 'none';
    }
}
