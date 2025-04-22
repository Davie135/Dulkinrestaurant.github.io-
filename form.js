document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            let isValid = true;
            
            // Validate name
            if (name === '') {
                document.getElementById('name-error').textContent = 'Name is required';
                document.getElementById('name-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                document.getElementById('email-error').textContent = 'Email is required';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email';
                document.getElementById('email-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate subject
            if (subject === '') {
                document.getElementById('subject-error').textContent = 'Subject is required';
                document.getElementById('subject-error').style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                document.getElementById('message-error').textContent = 'Message is required';
                document.getElementById('message-error').style.display = 'block';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const responseDiv = document.getElementById('form-response');
                responseDiv.innerHTML = `
                    <h3>Thank you for your message, ${name}!</h3>
                    <p>We've received your inquiry about "${subject}" and will get back to you soon at ${email}.</p>
                    <p>Your message: "${message}"</p>
                `;
                responseDiv.classList.add('success');
                responseDiv.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide response after 5 seconds
                setTimeout(() => {
                    responseDiv.style.display = 'none';
                }, 10000);
            }
        });
    }
    
    // Reservation Form Validation
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('res-name').value.trim();
            const email = document.getElementById('res-email').value.trim();
            const date = document.getElementById('res-date').value;
            const time = document.getElementById('res-time').value;
            const guests = document.getElementById('res-guests').value;
            const notes = document.getElementById('res-notes').value.trim();
            
            // Simulate form submission
            const responseDiv = document.getElementById('reservation-response');
            responseDiv.innerHTML = `
                <h3>Reservation Confirmed!</h3>
                <p>Thank you, ${name}. Your table for ${guests} has been booked for ${formatDate(date)} at ${time}.</p>
                ${notes ? `<p>Your special requests: "${notes}"</p>` : ''}
                <p>A confirmation has been sent to ${email}.</p>
            `;
            responseDiv.classList.add('success');
            responseDiv.style.display = 'block';
            
            // Reset form
            reservationForm.reset();
            
            // Hide response after 5 seconds
            setTimeout(() => {
                responseDiv.style.display = 'none';
            }, 10000);
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }
});