var crypto = require('crypto');

const decipherText = (cipherText, key, callback) => {
  if (!cipherText) {
      cipherText = '64+1vd0QNZM6EgIE1malcLjqV9wupA9g8LPS5CVn0BiJ0QbeymauUAFmRBbJ1jRh'
      key = 'GifBotKey'
  }

  let input = Buffer.from(cipherText, 'base64').toString('hex');

  let saltHex = input.substring(0, 32);
  let ivHex = input.substring(32, 64);
  let ctHex = input.substring(64);

  const algorithm = 'aes-256-cbc';

  const password = key;
  const salt = new Buffer.from(saltHex, 'hex');

  crypto.pbkdf2(password, salt, 10000, 32, 'sha1',
      (err, calculatedHashBytes) => {

          const key = calculatedHashBytes;
          const iv = Buffer.from(ivHex, 'hex');

          const decipher = crypto.createDecipheriv(algorithm, key, iv);

          let decrypted = '';
          decipher.on('readable', () => {
              while (null !== (chunk = decipher.read())) {
                  decrypted += chunk.toString('utf8');
              }
          });

          decipher.on('end', () => {
              callback(decrypted);
          });

          decipher.write(ctHex, 'hex');
          decipher.end();
      }
  );
}

module.exports = {
  decipherText
}