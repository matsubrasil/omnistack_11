const connection = require('./../database/connection');

/**
 * Lista todos o casos de uma ONG com paginacao de 5
 */
const index = async (req, res) => {
  const { page = 1 } = req.query;

  const [count] = await connection('incidents').count();

  const incidents = await connection('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((page - 1) * 5)
    .select([
      'incidents.id',
      'incidents.title',
      'incidents.description',
      'incidents.value',
      'incidents.ong_id',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf',
    ])
    .orderBy('incidents.id', 'asc');

  // manda o Toal de incidents no headers da mensagem
  res.header('X-Total-Count', count['count(*)']);

  return res.json(incidents);
};

/**
 * Cria um incident para uma ONG
 */
const create = async (req, res) => {
  const { title, description, value } = req.body;
  const ong_id = req.headers.authorization;

  const [id] = await connection('incidents').insert({
    title,
    description,
    value,
    ong_id,
  });

  return res.json({
    id,
  });
};

/**
 * Excluir um caso
 */
const excluir = async (req, res) => {
  try {
    const { id } = req.params;
    const ong_id = req.headers.authorization;
    console.log('ong_id', ong_id);

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();
    console.log('incident', incident);

    // se nao encontrou o incidente
    if (!incident) {
      return res.status(401).json({ error: 'Operation not allowed' });
    }

    // se encontrou o incidente, mas nao pertence a ONG que deseja excluir
    if (incident.ong_id !== ong_id) {
      // HTTP 401 Unauthorized
      return res.status(401).json({ error: 'Operation not allowed' });
    }

    await connection('incidents')
      .where('id', id)
      .delete();

    // HTTP 204 No Content
    return res.status(204).json();

    //
  } catch (err) {
    console.log('error', err);
    return res.status(500).json({ error: err.message });
  }
};
module.exports = {
  index,
  create,
  delete: excluir,
};
