ekoodi.bankAccounts = function() {
    var bankAccounts = [];

    function addNewAccount(account) {
        bankAccounts.push(account)
    }

    function getAllAccounts(customerId) {
        var result = bankAccounts.filter(function( obj ) {
            return obj.customerId == customerId;
        });

        return result;
    }

    function editAccount(name, iban) {
        var result = bankAccounts.filter(function( obj ) {
            return obj.iban == iban;
        });

        result[0].name = name;
    }

    function deleteAccount(iban) {
        var result =  bankAccounts.filter(function( obj ) {
            return obj.iban == iban;
        });

        delete result[0].iban;
        delete result[0].name;
        delete result[0].balance;
        delete result[0].customerId;
        delete result[0];
    }

    return {
        addAccount: addNewAccount,
        getAccounts: getAllAccounts,
        editAccount: editAccount,
        deleteAccount: deleteAccount
    }
};

ekoodi.bankAccount = function(iban, name, balance, customerId) {
    var iban = iban;
    var name = name;
    var balance = balance;
    var customerId = customerId;

    return {
        iban: iban,
        name: name,
        balance: balance,
        customerId: customerId
    }
};