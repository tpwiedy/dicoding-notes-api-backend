const Joi = require('joi');

const ImageHeadersSchema = Joi.object({
  'content-type': Joi.string()
    .valid(
      'image/apng',
      'image/avif',
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/webp'
    )
    .required(),
}).unknown(); //merupakan fungsi untuk membuat objek bersifat tidak diketahui atau objek dapat meiliki properti apa pun

module.exports = { ImageHeadersSchema };
