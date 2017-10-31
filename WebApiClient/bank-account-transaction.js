ekoodi.bankAccountTransactions = function() {
    var transactions = [];

    function addNewTransaction(transaction) {
        transactions.push(transaction)
    }

    function getAllTransactions(iban) {
        var result = transactions.filter(function( obj ) {
            return obj.iban == iban;
        });

        return result;
    }

    return {
        addTransaction: addNewTransaction,
        getTransactions: getAllTransactions
    }
};

ekoodi.bankAccountTransaction = function(iban, amount, timestamp) {
    iban = iban;
    amount = amount;
    timestamp = timestamp;

    return {
       iban: iban,
       amount: amount,
       timestamp: timestamp
    }
}