const crypto = require('crypto');
const hash = crypto.createHash('sha256');
const fs = require('fs');
const encrypt = require('./encrypt');
const decrypt = require('./decrypt');

const data = {
    firstName: 'Rock',
    lastName: 'Star',
    socialSecurityNumber: 'NO NO NO.  Never put personal info in a digitally signed message since this form of cryptography does not hide the data!'
};

// String version of our data that can be hashed
const jsonData = JSON.stringify(data);

// Sets the value on the hash object: requires string format, so we must convert our object
const hashUpd= hash.update(jsonData);

// Hashed data in Hexidecimal format
const hashedData = hash.digest('hex');
console.log(hashedData);

const senderPrivateKey = fs.readFileSync(__dirname + '/id_rsa_priv.pem', 'utf8');

const signedMessage = encrypt.encryptWithPrivateKey(senderPrivateKey, hashedData);
// console.log(signedMessage);

const packageOfDataToSend = {
    algorithm: 'sha256',
    originalData: data,
    signedAndEncryptedData: signedMessage
};

module.exports.packageOfDataToSend = packageOfDataToSend;