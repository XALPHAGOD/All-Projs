const base64url= require("base64url");
const crypto= require("crypto");
const signFunc= crypto.createSign("RSA-SHA256");
const verifyFunc = crypto.createVerify('RSA-SHA256');
const fs= require("fs");

const jwtHeader= JSON.stringify({
    alg: "RS256",
    typ: "JWT"
});

const jwtPayload= JSON.stringify({
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1516239022
});

const base64UrlHeader = base64url(jwtHeader);
const base64UrlPayload = base64url(jwtPayload);

// console.log(base64UrlHeader);
// console.log(base64UrlPayload);

signFunc.write(base64UrlHeader+"."+base64UrlPayload);
signFunc.end();

const PRIV_KEY= fs.readFileSync(__dirname+"/priv.pem", "utf-8");
const signBase64= signFunc.sign(PRIV_KEY, "base64");

const signBase64Url = base64url.fromBase64(signBase64);

// console.log(signBase64Url);

const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.POstGetfAytaZS82wHcjoTyoqhMyxXiWdR7Nn7A29DNSl0EiXLdwJ6xC6AfgZWF1bOsS_TuYI3OG85AmiExREkrS6tDfTQ2B3WXlrr-wp5AokiRbz3_oB4OxG-W9KcEEbDRcZc0nH3L7LzYptiy1PtAylQGxHTWZXtGz4ht0bAecBgmpdgXMguEIcoqPJ1n3pIWk_dUZegpqx0Lka21H6XxUTxiy8OcaarA8zdnPUnV6AmNP3ecFawIFYdvJB_cm-GvpCSbr8G8y_Mllj8f4x9nBH8pQux89_6gUY618iYv7tuPWBFfEbLxtF2pZS6YC1aSfLQxeNe8djT9YjpvRZA';

const jwtParts = JWT.split('.');

const headerInBase64UrlFormat = jwtParts[0];
const payloadInBase64UrlFormat = jwtParts[1];
const signatureInBase64UrlFormat = jwtParts[2];

// const decodeHeader= base64url.decode(headerInBase64UrlFormat);
// const decodePayload= base64url.decode(payloadInBase64UrlFormat);
// const decodeSignature= base64url.decode(signatureInBase64UrlFormat);

// console.log(decodeHeader);
// console.log(decodePayload);
// console.log(decodeSignature);

verifyFunc.write(headerInBase64UrlFormat + '.' + payloadInBase64UrlFormat);
verifyFunc.end();

const jwtSignatureBase64 = base64url.toBase64(signatureInBase64UrlFormat);

const PUB_KEY = fs.readFileSync(__dirname + '/pub.pem', 'utf8');

const signatureIsValid = verifyFunc.verify(PUB_KEY, jwtSignatureBase64, 'base64');

console.log(signatureIsValid);