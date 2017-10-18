ekoodi.banks = function() {
    var banks = [];

    function addNewBank(bank) {
        banks.push(bank)
    }

    function getAllBanks() {
        return banks;
    }

    return {
        addBank: addNewBank,
        getBanks: getAllBanks
    }
};

ekoodi.bank = function (name, bicCode, id) {
    var name = name;
    var bicCode = bicCode;
    var id = id;

    return {
        name: name,
        bicCode: bicCode,
        id: id
    }
};