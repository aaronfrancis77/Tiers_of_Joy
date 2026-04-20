// Tiers of Joy — order.js
// Initialises the Formspree Ajax integration for the order form.
// Must be loaded before (or alongside) the @formspree/ajax CDN script.
// The queue pattern (formspree.q) ensures the init call is held until
// the CDN library is ready, regardless of load order.

window.formspree = window.formspree || function () {
  (formspree.q = formspree.q || []).push(arguments);
};

formspree('initForm', { formElement: '#order-form', formId: 'mqewldyk' });
