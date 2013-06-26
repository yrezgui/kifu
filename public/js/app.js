var getPaymentToken = function getPaymentToken(token, amount){

  // We're simulating a form with the new FormData HTML5 Object
  var formObject = new FormData();
  // We append payment data
  formObject.append('stripe_token', token.id);  
  formObject.append('amount', amount);  

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function onreadystatechange() {
    if (this.readyState === 4) {
      // If the payment is done, we display a success message
      if (this.status === 200) {
        document.getElementById('result-success').style.display = 'block';
        document.getElementById('result-error').style.display   = 'none';
      }
      // If the payment has been failed, we display an error message
      else {
        document.getElementById('result-success').style.display = 'none';
        document.getElementById('result-error').style.display   = 'block';
      }
    }
  };

  xhr.open('POST', '/donate');
  xhr.send(formObject);
};

var donateClick = function donateClick(event, b, c) {
  var elem = this;
  
  // Open Modal Stripe payment
  StripeCheckout.open({
    key:         STRIPE_PUBLIC_KEY,
    amount:      elem.dataset.amount + '00',
    currency:    STRIPE_CURRENCY,
    name:        'Donation of ' + elem.dataset.amount + '$',
    description: elem.dataset.description,
    panelLabel:  'Donate',
    token:       function(token) {
      getPaymentToken(token, elem.dataset.amount + '00');
    }
  });

  return false;
};

var buttons = document.getElementsByClassName('donate');

for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', donateClick, false);
}