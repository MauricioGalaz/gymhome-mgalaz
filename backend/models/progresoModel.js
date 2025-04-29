const pool = require('../config/db')

const ProgresoModel = {
  obtenerPorUsuario: async (usuario_id) => {
    const res = await pool.query(
      'SELECT * FROM "progresousuario" WHERE usuario_id = $1 ORDER BY fecha DESC',
      [usuario_id]
    )
    return res.rows
  },

  crear: async ({ usuario_id, plan_id, avance, fecha }) => {
    const res = await pool.query(
      `INSERT INTO "progresousuario" (usuario_id, plan_id, avance, fecha)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [usuario_id, plan_id, avance, fecha]
    )
    return res.rows[0]
  }
}

module.exports = ProgresoModel
