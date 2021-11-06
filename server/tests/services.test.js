const expect = require("chai").expect;
const path = require('path');

//  IMPORT SERVICES
require('../config');
const auth = require("../../server/middleware");

describe("Services tested:", () => {

    //  ENCRYPTION SERVICE UNIT TESTS
    describe("Encryption with crypto:", () => {

        it("test", () =>  {
            var a = 1
            expect(a).to.be.equal(1);
        });

        it("AES Encryption is working!", () => {
            const encr = auth.encrypt('Hello World!');
            expect(encr.split(':')).to.have.lenght(2);
        });

        it("Encryption/Decryption", () => {
            const message = "Hello World!";
            const encr = auth.encrypt(message);
            const descr = auth.decrypt(encr);
            expect(descr).to.be.equal(message);
        });

    });

});
