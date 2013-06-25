var getPaymentToken = function getPaymentToken(token){
  console.log(token);
};

var donateClick = function donateClick(event, b, c) {
  console.log(this, this.dataset.amount, this.dataset, event, b, c);
  //elem.dataset;
  StripeCheckout.open({
    key:         STRIPE_PUBLIC_KEY,
    amount:      this.dataset.amount + '00',
    currency:    STRIPE_CURRENCY,
    name:        'Donation of ' + this.dataset.amount + '$',
    description: this.dataset.description,
    panelLabel:  'Donate',
    token:       getPaymentToken
  });

  return false;
};

var buttons = document.getElementsByClassName('donate');

for(var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', donateClick, false);
}