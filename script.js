document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const messageEl = document.getElementById('formMessage');
    
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    messageEl.textContent = '';
    messageEl.className = 'message';

    // Collect form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // NOTE: You need to create a Google Apps Script and deploy it as a Web App to get this URL.
    // Replace 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL' with your actual Google Script URL.
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzuUiPD-JRnaLKaZ2z71e4wXM6c24pDRnP-Q-5XgnGCKP4b2MypQXAIuYW11EUljw_y1A/exec';
    
    if (scriptURL === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        messageEl.textContent = 'Please configure the Google Apps Script URL in script.js to submit to a spreadsheet.';
        messageEl.className = 'message error';
        submitBtn.textContent = 'Register Team';
        submitBtn.disabled = false;
        return;
    }

    // Using fetch to post to Google Apps Script
    fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
            messageEl.textContent = 'Registration Successful! Your details have been recorded.';
            messageEl.className = 'message success';
            document.getElementById('registrationForm').reset();
            submitBtn.textContent = 'Register Team';
            submitBtn.disabled = false;
        })
        .catch(error => {
            console.error('Error!', error.message);
            messageEl.textContent = 'Error submitting the form. Please try again.';
            messageEl.className = 'message error';
            submitBtn.textContent = 'Register Team';
            submitBtn.disabled = false;
        });
});
