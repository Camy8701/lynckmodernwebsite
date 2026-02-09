// Contact Page Form Handler
(function () {
  'use strict';

  function isGermanPath(pathname) {
    return pathname.includes('/de/');
  }

  function getThankYouPath(pathname) {
    return isGermanPath(pathname) ? '/de/thank-you.html' : '/thank-you.html';
  }

  const contactForm = document.getElementById('contactForm');
  if (!contactForm) {
    return;
  }

  const redirectField = document.getElementById('redirectField');
  if (redirectField) {
    redirectField.value = getThankYouPath(window.location.pathname);
  }

  contactForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const isGerman = isGermanPath(window.location.pathname);
    const copy = isGerman
      ? {
          firstNameRequired: 'Vorname ist erforderlich',
          lastNameRequired: 'Nachname ist erforderlich',
          emailRequired: 'E-Mail-Adresse ist erforderlich',
          emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
          sendingLabel: 'Wird gesendet...',
          submitError: 'Beim Senden ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.'
        }
      : {
          firstNameRequired: 'First name is required',
          lastNameRequired: 'Last name is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Please enter a valid email address',
          sendingLabel: 'Sending...',
          submitError: 'There was an issue submitting the form. Please try again.'
        };

    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');

    const firstNameError = document.getElementById('firstNameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');

    if (firstNameError) firstNameError.textContent = '';
    if (lastNameError) lastNameError.textContent = '';
    if (emailError) emailError.textContent = '';

    let hasErrors = false;

    if (!firstName || firstName.value.trim() === '') {
      if (firstNameError) firstNameError.textContent = copy.firstNameRequired;
      hasErrors = true;
    }

    if (!lastName || lastName.value.trim() === '') {
      if (lastNameError) lastNameError.textContent = copy.lastNameRequired;
      hasErrors = true;
    }

    const emailValue = email ? email.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailValue) {
      if (emailError) emailError.textContent = copy.emailRequired;
      hasErrors = true;
    } else if (!emailRegex.test(emailValue)) {
      if (emailError) emailError.textContent = copy.emailInvalid;
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    const submitBtn = document.getElementById('submitBtn');
    const originalLabel = submitBtn ? submitBtn.dataset.originalLabel || submitBtn.innerHTML : '';

    if (submitBtn) {
      submitBtn.dataset.originalLabel = originalLabel;
      submitBtn.innerHTML = `<span>${copy.sendingLabel}</span>`;
      submitBtn.disabled = true;
    }

    const formData = new FormData(contactForm);
    const payload = {};
    formData.forEach((value, key) => {
      payload[key] = value;
    });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Form submission failed with status ${response.status}`);
      }

      window.location.href = getThankYouPath(window.location.pathname);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalLabel;
      }
      alert(copy.submitError);
    }
  });
})();
