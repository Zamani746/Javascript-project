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

        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registrationForm');
            const notification = document.getElementById('notification');
            const notificationIcon = document.getElementById('notification-icon');
            const notificationMessage = document.getElementById('notification-message');
            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');

            // Function to show notification
            function showNotification(type, message) {
                notification.className = `notification ${type} show`;
                notificationIcon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-triangle';
                notificationMessage.textContent = message;
                
                // Scroll to notification
                notification.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Auto hide after 5 seconds for success
                if (type === 'success') {
                    setTimeout(() => {
                        notification.classList.remove('show');
                    }, 5000);
                }
            }

            // Function to hide notification
            function hideNotification() {
                notification.classList.remove('show');
            }

            // Function to show loading state
            function setLoading(isLoading) {
                if (isLoading) {
                    submitBtn.classList.add('loading');
                    btnText.innerHTML = '<span class="spinner"></span>Registering...';
                } else {
                    submitBtn.classList.remove('loading');
                    btnText.textContent = 'register now';
                }
            }

            // Validate form
            function validateForm() {
                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('regpass').value;
                const confirmPassword = document.getElementById('c_pass').value;
                const image = document.getElementById('image').files[0];

                const errors = [];

                if (!name) {
                    errors.push('Name is required');
                }

                if (!email) {
                    errors.push('Email is required');
                } else if (!/\S+@\S+\.\S+/.test(email)) {
                    errors.push('Please enter a valid email address');
                }

                if (!password) {
                    errors.push('Password is required');
                } else if (password.length < 6) {
                    errors.push('Password must be at least 6 characters long');
                }

                if (password !== confirmPassword) {
                    errors.push('Passwords do not match');
                }

                if (!image) {
                    errors.push('Profile picture is required');
                } else {
                    // Check file size (limit to 5MB)
                    if (image.size > 5 * 1024 * 1024) {
                        errors.push('Image file size must be less than 5MB');
                    }
                    
                    // Check file type
                    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                    if (!allowedTypes.includes(image.type)) {
                        errors.push('Please select a valid image file (JPEG, PNG, or GIF)');
                    }
                }

                return errors;
            }

            // Clear notification when user starts typing
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('input', hideNotification);
            });

            // Handle form submission
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                hideNotification();
                
                // Validate form
                const errors = validateForm();
                if (errors.length > 0) {
                    showNotification('error', 'Registration failed: ' + errors.join(', '));
                    return;
                }

                setLoading(true);

                try {
                    // Create FormData object
                    const formData = new FormData(form);

                    // Send to your server endpoint
                    const response = await fetch('register_process.php', { // Replace with your actual endpoint
                        method: 'POST',
                        body: formData
                    });

                    const result = await response.json();

                    if (response.ok && result.success) {
                        showNotification('success', 'Registration successful! Welcome to Zamani\'s Concept. You can now login to your account.');
                        form.reset(); // Clear the form
                    } else {
                        const errorMessage = result.message || 'Registration failed. Please try again.';
                        showNotification('error', errorMessage);
                    }

                } catch (error) {
                    console.error('Registration error:', error);
                    showNotification('error', 'Registration failed due to a network error. Please check your connection and try again.');
                } finally {
                    setLoading(false);
                }
            });
        });


