ekoodi.customers = function() {
    var customers = [];

    function addNewCustomer(customer) {
        customers.push(customer)
    }

    function getAllCustomers(bankId) {
        var result = customers.filter(function( obj ) {
            return obj.bankId == bankId;
        });

        return result;
    }

    function editCustomer(firstName, lastName, customerId) {
        var result = customers.filter(function( obj ) {
            return obj.id == customerId;
        });

        result[0].firstName = firstName;
        result[0].lastName = lastName;
    }

    function deleteCustomer(customerId) {
        var result =  customers.filter(function( obj ) {
            return obj.id == customerId;
        });

        delete result[0].firstName;
        delete result[0].lastName;
        delete result[0].bankId;
        delete result[0].id;
        delete result[0];

        console.log(result);
    }

    return {
        addCustomer: addNewCustomer,
        getCustomers: getAllCustomers,
        editCustomer: editCustomer,
        deleteCustomer: deleteCustomer
    }
};

ekoodi.customer = function (firstName, lastName, bankId) {
    var firstName = firstName;
    var lastName = lastName;
    var bankId = bankId;
    var id = parseInt(document.getElementById('customerId').value) + 1;
    document.getElementById('customerId').value = id;

    return {
        firstName: firstName,
        lastName: lastName,
        bankId: bankId,
        id: id
    }
};