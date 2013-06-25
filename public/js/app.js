var getPaymentToken = function getPaymentToken(token, amount){

  var formObject = new FormData();  
  formObject.append('stripe_token', token.id);  
  formObject.append('amount', amount);  

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function onreadystatechange() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        console.log(xhr.responseText);
      }
      else {
        console.log('There was a problem with the request.');
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