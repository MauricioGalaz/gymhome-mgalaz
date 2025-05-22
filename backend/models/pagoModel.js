import db from '../config/db.js';

const pagoModel = {
  obtenerTodos: async () => {
    const query = `
      SELECT p.*, u.nombre AS nombre_usuario 
      FROM pagos p
      JOIN usuarios u ON p.id_usuario = u.id_usuarios
      ORDER BY p.id_pagos ASC
    `;
    const [rows] = await db.execute(query);
    return rows;
  },

  obtenerPorUsuario: async (id_usuarios) => {
    const query = `
      SELECT * FROM pagos WHERE id_usuario = ?
    `;
    const [rows] = await db.execute(query, [id_usuarios]);
    return rows;
  },

  registrar: async (pago) => {
    const query = `
      INSERT INTO pagos (monto, id_usuario, fecha, estado)
      VALUES (?, ?, ?, ?)
    `;
    const { monto, id_usuario, fecha, estado } = pago;
    const [result] = await db.execute(query, [monto, id_usuario, fecha, estado]);
    
    // Devuelve el pago insertado con id generado y nombre_usuario
    const [rows] = await db.execute(`
      SELECT p.*, u.nombre AS nombre_usuario 
      FROM pagos p
      JOIN usuarios u ON p.id_usuario = u.id_usuarios
      WHERE p.id_pagos = ?
    `, [result.insertId]);

    return rows[0];
  },

  actualizarEstado: async (id_pagos, estado) => {
    const query = `UPDATE pagos SET estado = ? WHERE id_pagos = ?`;
    const [result] = await db.execute(query, [estado, id_pagos]);
    if (result.affectedRows === 0) return null;

    const [rows] = await db.execute(`
      SELECT p.*, u.nombre AS nombre_usuario 
      FROM pagos p
      JOIN usuarios u ON p.id_usuario = u.id_usuarios
      WHERE p.id_pagos = ?
    `, [id_pagos]);
    return rows[0];
  },

 eliminar: async (id_pagos) => {
  console.log('Eliminando pago con ID:', id_pagos); 
  const [resultado] = await db.execute('DELETE FROM pagos WHERE id_pagos = ?', [id_pagos]);
  console.log('Resultado MySQL:', resultado); 
  return resultado.affectedRows > 0;
}



};

export default pagoModel;
