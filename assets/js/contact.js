export function init() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const loading = document.getElementById('form-loading');
            const errorMessage = document.getElementById('form-error');
            const sentMessage = document.getElementById('form-success');
            const submitBtn = document.getElementById('submit-btn');

            loading.style.display = 'block';
            errorMessage.style.display = 'none';
            sentMessage.style.display = 'none';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);
            const object = Object.fromEntries(formData);
            object.access_key = atob('YTJmZjY1ZDktOTE3My00MTVmLWIwNDAtYzRhOWZmMGZmNjZl');
            const json = JSON.stringify(object);

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        loading.style.display = 'none';
                        sentMessage.style.display = 'block';
                        contactForm.reset();
                    } else {
                            loading.style.display = 'none';
                        errorMessage.textContent = json.message || 'Something went wrong. Please try again.';
                        errorMessage.style.display = 'block';
                    }
                })
                .catch(error => {
                    loading.style.display = 'none';
                    errorMessage.style.display = 'block';
                })
                .then(function () {
                    submitBtn.disabled = false;
                    setTimeout(() => {
                        sentMessage.style.display = 'none';
                        errorMessage.style.display = 'none';
                    }, 5000);
                });
        });
    }


}
