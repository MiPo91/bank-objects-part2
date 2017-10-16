var bank = ekoodi.bank('Osuuspankki', 'OKOYFIH');
var firstCustomer = ekoodi.customer('Etunimi','Sukunimi');
var secondCustomer = ekoodi.customer('Joku','Jostain');

bank.addCustomer(firstCustomer);
bank.addCustomer(secondCustomer);

var contentField = document.getElementById('content-listed');
console.log(bank.getCustomers)
//ekoodi.bank.listBanks();
//contentField.textContent =