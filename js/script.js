let body = document.body;

let profile = document.querySelector('.header .flex .profile');

document.querySelector('#user-btn').onclick = () =>{
    profile.classList.toggle('active');
    searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    profile.classList.remove('active');

}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
    sideBar.classList.toggle('active');
    body.classList.toggle('active')

}

document.querySelector('.side-bar .close-side-bar').onclick = () =>{
    sideBar.classList.remove('active');
 body.classList.remove('active');

}

window.onscroll = () =>{
    profile.classList.remove('active');
    searchForm.classList.remove('active');

    if(window.innerWidth < 1200){
        sideBar.classList.remove('active');
        body.classList.remove('active');

    }
}

let toggleBtn = document.querySelector('#toggle-btn');
let darkMode = localStorage.getItem('dark-mode');

const enabelDarkMode = () => {
    toggleBtn.classList.replace('fa-sun', 'fa-moon')
    body.classList.add('dark')
    localStorage.setItem('dark-mode', 'enabled')
}

const disableDarkMode = () => {
    toggleBtn.classList.replace('fa-moon', 'fa-sun')
    body.classList.remove('dark')
    localStorage.setItem('dark-mode', 'disabled')
}

if(darkMode === 'enabled'){
    enabelDarkMode();
}

toggleBtn.onclick = (e) =>{
    let darkMode = localStorage.getItem('dark-mode')
    if(darkMode === 'disabled'){
        enabelDarkMode();
    }else{
        disableDarkMode();
    }
}


// validation of login form

  const form = document.getElementById('loginForm');
  const emailInput = form.elements['email'];
  const passInput = form.elements['pass'];
  const errorElements = form.querySelectorAll('.error');

  form.addEventListener('submit', function (e) {
    let valid = true;

    // Clear old errors
    errorElements.forEach(error => error.textContent = '');

    // Validate email
    const emailValue = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      errorElements[0].textContent = "Enter a valid email address.";
      valid = false;
    }

    // Validate password
    const passValue = passInput.value.trim();
    if (passValue.length < 6) {
      errorElements[1].textContent = "Password must be at least 6 characters.";
      valid = false;
    }

    if (!valid) {
      e.preventDefault(); // Stop form submission
    }
  });


//   Validation of register form
form.addEventListener('submit', (e) => {

    let messages = []

    if (password.value.length <= 6) {
        messages.push('Password must be longer than 6 characters')
    }
})


