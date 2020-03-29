const generateUniqueId = require('./../utils/generateUniqueId');

const connection = require('./../database/connection');

/**
 * Lista as ongs
 */
const index = async (req, res) => {
  const ongs = await connection('ongs')
    .select('id', 'name', 'email', 'whatsapp', 'city', 'uf')
    .orderBy('name', 'asc');

  return res.json(ongs);
};

/**
 * Cadastra uma ONG
 */
const create = async (req, res) => {
  const { name, email, whatsapp, city, uf } = req.body;

  const id = generateUniqueId();

  await connection('ongs').insert({
    id,
    name,
    email,
    whatsapp,
    city,
    uf,
  });

  return res.status(200).json({ id });
};

module.exports = {
  index,
  create,
};
