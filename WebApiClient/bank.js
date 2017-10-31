ekoodi.banks = function() {
    var banks = [];

    function addNewBank(bank) {
        //banks.push(bank)
    }

    function getAllBanks() {
        //return banks;
        var xhr = new XMLHttpRequest();
        xhr.open('GET', "http://localhost:49698/api/bank", true);
        xhr.send();

        var response = xhr.responseText;
        alert(response);

        return response;
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