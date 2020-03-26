const connection = require('./../database/connection');

/**
 * Lista todos o casos de uma ONG
 */
const index = async (req, res) => {
  const ong_id = req.headers.authorization;

  const incidents = await connection('incidents')
    .where({ ong_id: ong_id })
    .select('id', 'title', 'description', 'value', 'ong_id')
    .orderBy('id', 'asc');

  return res.json(incidents);
};

module.exports = {
  index,
};
