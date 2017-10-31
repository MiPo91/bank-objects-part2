// Pankien lisäys. name, bic, id
var bank = ekoodi.bank('Osuuspankki', 'OKOYFIH',0);
var bank2 = ekoodi.bank('Nordea', 'OKOYFIH',1);

var banks =  ekoodi.banks();
banks.addBank(bank);
banks.addBank(bank2);
//console.log(banks.getBanks());

// Asiakkaiden lisäys. firstName, lastName, bankId, id
var customer1 = ekoodi.customer('Matti', 'Meikäläinen', 0);
var customer2 = ekoodi.customer('Leppä', 'Kerttu', 0);
var customer3 = ekoodi.customer('Mikko', 'Mallikas', 1);

var customers = ekoodi.customers();
customers.addCustomer(customer1);
customers.addCustomer(customer2);
customers.addCustomer(customer3);
//console.log(customers.getCustomers(1));

// Accounttien lisäys. iban, name, balance, customerId
var account1 = ekoodi.bankAccount('FI8645441233123','Saastotili','452',1);
var account2 = ekoodi.bankAccount('FI5435441233111','Kayttotili','2525',1);
var account3 = ekoodi.bankAccount('FI4735441233555','Kayttotili','675',0);

var bankAccounts = ekoodi.bankAccounts();
bankAccounts.addAccount(account1);
bankAccounts.addAccount(account2);
bankAccounts.addAccount(account3);
//console.log(bankAccounts.getAccounts(1));

// Osto tapahtumien lisäys. iban, amount, timestamp
var transaction1 = ekoodi.bankAccountTransaction('FI8645441233123','15','15-06-2017');
var transaction2 = ekoodi.bankAccountTransaction('FI8645441233123','225','14-06-2017');

var accountTransactions = ekoodi.bankAccountTransactions();
accountTransactions.addTransaction(transaction1);
accountTransactions.addTransaction(transaction2);
//console.log(accountTransactions.getTransactions());

// Sisältö kohteet
var banksField = document.getElementById('content-banks');
var customersField = document.getElementById('content-customers');
var accountsField = document.getElementById('content-accounts');
var transactionsField = document.getElementById('content-transactions');
var popup = document.getElementById('content-popup');


// Listaus funktionit
function listBanks () {
    var result = banks.getBanks();

    var html = '<h2 class="mdc-typography--title">Banks</h2><ul class="mdc-list mdc-list--dense">';
    for(i = 0; i < result.length; i++) {
        var bankName = result[i].name;
        var bic = result[i].bicCode;
        var id = result[i].id;
        html += '<li class="mdc-list-item"><span>' + bankName + ', ' + bic + '</span>' +
            '<button onclick="listCustomers(\'' + id + '\')" class="mdc-button mdc-button--raised">Show Customers</button>' +
            '<button onclick="newCustomer(\'' + id + '\')" class="mdc-button mdc-button--raised">Add New Customer</button>' +
            '</li>';
    }
    html += '</ul>';

    // Tyhjennetään kentät
    customersField.innerHTML = '';
    accountsField.innerHTML = '';
    transactionsField.innerHTML = '';
    popup.innerHTML = '';

    banksField.innerHTML = html;
}

function listCustomers (bankId) {
    var result = customers.getCustomers(bankId);

    var html = '<h2 class="mdc-typography--title">Customers</h2><ul class="mdc-list mdc-list--dense">';
    if(result.length > 0) {
        for(i = 0; i < result.length; i++) {
            var firstName = result[i].firstName;
            var lastName = result[i].lastName;
            var id = result[i].id;


            html += '<li class="mdc-list-item"><span class="whole-name">' + firstName + ' ' + lastName+ '</span>';
            html += '<button onclick="listAccounts(\'' + id + '\')" class="mdc-button mdc-button--raised">Show Bank Accounts</button>';
            html += '<button onclick="newAccount(\'' + id + '\')" class="mdc-button mdc-button--raised">Add New Bank Account</button>';
            html += '<button onclick="editUser('+'\''+id+'\''+ ',' + '\''+firstName+'\''+ ',' + '\''+lastName+'\''+ ',' +' this)" class="mdc-button mdc-button--raised">Edit Customer</button>';
            html += '<button onclick="deleteUser('+'\''+id+'\''+ ',' +' this)" class="mdc-button mdc-button--raised">Delete Customer</button>';
            html += '</li>';
        }
    } else {
        html += '<li class="mdc-list-item">No Customers found for this Bank</li>';
    }
    html += '</ul>';

    // Tyhjennetään kentät
    accountsField.innerHTML = '';
    transactionsField.innerHTML = '';
    popup.innerHTML = '';

    customersField.innerHTML = html;
}

function listAccounts(customerId) {
    var result = bankAccounts.getAccounts(customerId);
    var html = '<h2 class="mdc-typography--title">Customer Accounts</h2><ul class="mdc-list mdc-list--dense">';
    if(result.length > 0) {

        for (i = 0; i < result.length; i++) {
            var iban = result[i].iban;
            var name = result[i].name;
            var balance = result[i].balance;
            html += '<li class="mdc-list-item"><span>'+name+'</span><span>'+ iban +'</span><span>Balance: '+balance+'</span>' +
                '<button onclick="listTransactions(\'' + iban + '\')" class="mdc-button mdc-button--raised">Show Transactions</button>' +
                '<button onclick="newTransaction(\'' + iban + '\')" class="mdc-button mdc-button--raised">Add New Transactions</button>' +
                '<button onclick="editAccount('+'\''+iban+'\''+ ',' + '\''+name+'\''+',' +' this)" class="mdc-button mdc-button--raised">Edit Account</button>' +
                '<button onclick="deleteAccount('+'\''+iban+'\''+ ',' +' this)" class="mdc-button mdc-button--raised">Delete Account</button>' +
                '</li>';
        }

    } else {
        html += '<li class="mdc-list-item">No Accounts found for this Customer</li>';
    }
    html += '</ul>';

    // Tyhjennetään kentät
    transactionsField.innerHTML = '';
    popup.innerHTML = '';

    accountsField.innerHTML = html;
}

function listTransactions(iban) {
    var result = accountTransactions.getTransactions(iban);
    var html = '<h2 class="mdc-typography--title">Account Transactions</h2><ul class="mdc-list mdc-list--dense">';

    if(result.length > 0) {

        for (i = 0; i < result.length; i++) {//iban, name, balance, customerId
            var iban = result[i].iban;
            var amount = result[i].amount;
            var timestamp = result[i].timestamp;
            html += '<li class="mdc-list-item">IBAN: ' + iban + ', Amount: ' + amount + ', Date: ' + timestamp + '</li>';
        }

    } else {
        html += '<li class="mdc-list-item">No transactions found for this Account</li>';
    }

    html += '</ul>';

    // Tyhjennetään kentät
    popup.innerHTML = '';

    transactionsField.innerHTML = html;
}

// Lisäys funktiot
function newCustomer(bankId) {
    //firstName, lastName, bankId, customerId
    var html ='<h3 class="mdc-typography--title">Add new Customer</h3>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="first-name" value="" placeholder="insert First name..." class="mdc-textfield__input" /></div>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="last-name" value="" placeholder="insert Last name..." class="mdc-textfield__input" /></div>';
    html += '<input type="hidden" id="bank-id" value="'+bankId+'"  />';

    html += '<button onclick="newCustomerSave()" class="mdc-button mdc-button--raised">Save</button>';
    html += '<button onclick="cancelAction()" class="mdc-button mdc-button--raised">Cancel</button>';

    popup.className = 'show';
    popup.innerHTML = html;

}

function newCustomerSave() {
    var firstName = document.getElementById('first-name').value;
    var lastName = document.getElementById('last-name').value;
    var bankId = document.getElementById('bank-id').value;

    var newCustomer = ekoodi.customer(firstName, lastName, bankId);
    customers.addCustomer(newCustomer);

    popup.className = '';
    listCustomers(bankId);
}

function newAccount(customerId) {
    var html = '<h3 class="mdc-typography--title">Add new Account</h3>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="iban" value="" placeholder="insert IBAN. ex: FI50423432342" class="mdc-textfield__input" /></div>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="name" value="" placeholder="insert name. ex: Käyttötili" class="mdc-textfield__input" /></div>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="balance" value="" placeholder="insert balance. ex: 0" class="mdc-textfield__input" /></div>';
    html += '<input type="hidden" id="customer-id" value="'+customerId+'"  />';

    html += '<button onclick="newAccountSave()" class="mdc-button mdc-button--raised">Save</button>';
    html += '<button onclick="cancelAction()" class="mdc-button mdc-button--raised">Cancel</button>';
    popup.className = 'show';
    popup.innerHTML = html;
}

function newAccountSave() {
    var iban = document.getElementById('iban').value;
    var name = document.getElementById('name').value;
    var balance = document.getElementById('balance').value;
    var customerId = document.getElementById('customer-id').value;

    var newAccount = ekoodi.bankAccount(iban,name,balance,customerId);
    bankAccounts.addAccount(newAccount);

    popup.className = '';
    listAccounts(customerId);
}

function newTransaction(iban) {
    var html = '<h3 class="mdc-typography--title">Add new Transaction</h3><input type="hidden" id="iban" value="'+iban+'" />';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="amount" value="" placeholder="insert amount. ex: 255" class="mdc-textfield__input" /></div>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="date" id="timestamp" value="" placeholder="insert date. ex: 24-05-2017" class="mdc-textfield__input"/></div>';
    html += '<button onclick="newTransactionSave()" class="mdc-button mdc-button--raised">Save</button>';
    html += '<button onclick="cancelAction()" class="mdc-button mdc-button--raised">Cancel</button>';

    popup.className = 'show';
    popup.innerHTML = html;
}

function newTransactionSave() {
    var iban = document.getElementById('iban').value;
    var amount = document.getElementById('amount').value;
    var timestamp = document.getElementById('timestamp').value;

    var newTransaction = ekoodi.bankAccountTransaction(iban,amount,timestamp);
    accountTransactions.addTransaction(newTransaction);

    popup.className = '';
    listTransactions(iban);
}


// Muokkaus funktiot
function editUser(userId, firstName, lastName, parentElement) {
    var elements = document.getElementsByClassName('currently-editing');
    while(elements.length > 0){
        elements[0].classList.remove('currently-editing');
    }

    var parentElement = parentElement.parentNode.firstChild;
    parentElement.className = 'currently-editing';

    var html = '<h3 class="mdc-typography--title">Edit Customer - '+firstName+' '+lastName+'</h3><input type="hidden" id="userId" value="'+userId+'" />';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="firstName" value="'+firstName+'" class="mdc-textfield__input" /></div>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="lastName" value="'+lastName+'" class="mdc-textfield__input" /></div>';
    html += '<button onclick="editUserSave()" class="mdc-button mdc-button--raised">Save</button>';
    html += '<button onclick="cancelAction()" class="mdc-button mdc-button--raised">Cancel</button>';

    popup.className = 'show';
    popup.innerHTML = html;
}

function editUserSave() {
    var userId = document.getElementById('userId').value;
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    customers.editCustomer(firstName, lastName, userId);

    parentElement = document.getElementsByClassName('currently-editing');
    parentElement[0].innerHTML = firstName + ' ' + lastName;

    popup.className = '';
    popup.innerHTML = '';
}

function editAccount(iban, name, parentElement) {
    var elements = document.getElementsByClassName('currently-editing');
    while(elements.length > 0){
        elements[0].classList.remove('currently-editing');
    }

    var parentElement = parentElement.parentNode.firstChild;
    parentElement.className = 'currently-editing';

    var html = '<h3 class="mdc-typography--title">Edit Account - '+iban+'</h3>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="hidden" id="account-iban" value="'+iban+'" class="mdc-textfield__input" /></div>';
    html += '<div class="mdc-textfield mdc-textfield--box"><input type="text" id="account-name" value="'+name+'" class="mdc-textfield__input" /></div>';
    html += '<button onclick="editAccountSave()" class="mdc-button mdc-button--raised">Save</button>';
    html += '<button onclick="cancelAction()" class="mdc-button mdc-button--raised">Cancel</button>';

    popup.className = 'show';
    popup.innerHTML = html;
}

function editAccountSave() {
    var iban = document.getElementById('account-iban').value;
    var name = document.getElementById('account-name').value;

    bankAccounts.editAccount(name, iban);

    parentElement = document.getElementsByClassName('currently-editing');
    parentElement[0].innerHTML = name;

    popup.className = '';
    popup.innerHTML = '';
}

// Poisto funktiot
function deleteUser(userId, elem) {
    var result = confirm("Are you sure you want Delete this User?");
    if (result) {
        var parent = elem.parentNode;
        parent.outerHTML = "";
        delete parent;
        customers.deleteCustomer(userId);

        cancelAction();
    }
}
function deleteAccount(iban, elem) {
    var result = confirm("Are you sure you want Delete this User?");
    if (result) {
        var parent = elem.parentNode;
        parent.outerHTML = "";
        delete parent;
        bankAccounts.deleteAccount(iban);

        cancelAction();
    }
}

function cancelAction() {
    popup.className = '';
    popup.innerHTML = '';
}