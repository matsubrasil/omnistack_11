const connection = require('./../database/connection');
/**
 * Lista todos o casos de uma ONG
 */
const create = async (req, res) => {
  const { id } = req.body;

  const ong = await connection('ongs')
    .where('id', id)
    .select('name')
    .first();

  if (!ong) {
    return res.status(404).json({ error: 'ONG not found' });
  }

  return res.json(ong);
};

module.exports = {
  create,
};
