ekoodi.bank = function (name, bicCode) {

    var name = name;
    var bicCode = bicCode;
    var customers = [];

    function addCustomerToBank(customer) {
        customers.push(customer);
    }

    function getCustomers() {
        return customers;
    }

    return {
        name: name,
        bicCode: bicCode,
        getCustomers: customers,
        addCustomer: addCustomerToBank
    }
};