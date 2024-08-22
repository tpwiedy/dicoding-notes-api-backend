const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/InvariantError');

const TokenManager = {
  generateAccessToken: (payload) =>
    Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),

  generateRefreshToken: (payload) =>
    Jwt.token.generate(payload, process.env.REFRESH_TOKEN_KEY),

  verifyRefreshToken: (refreshToken) => {
    try {
      const artifacts = Jwt.token.decode(refreshToken);

      //Fungsi verifySignature ini akan mengecek apakah refresh token memiliki signature yang sesuai atau tidak.
      Jwt.token.verifySignature(artifacts, process.env.REFRESH_TOKEN_KEY);

      //mengembalikan fungsi dengan nilai payload yang di dapat dari artifacts.decoded
      //Nilai payload tersebut nantinya akan digunakan dalam membuat akses token baru.
      const { payload } = artifacts.decoded;
      return payload;
    } catch (error) {
      throw new InvariantError('Refresh token tidak valid');
    }
  },
};

module.exports = TokenManager;
