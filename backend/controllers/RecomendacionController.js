import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// Crear instancia de OpenAI, que lee la API Key desde process.env automáticamente
const openai = new OpenAI();

const obtenerRecomendaciones = async (req, res) => {
  const { id } = req.params;

  // Datos simulados de progreso usuario (puedes reemplazar con datos reales)
  const progresoUsuario = {
    avance: 80,
    dificultad: 'intermedio'
  };

  const prompt = `Usuario con ID ${id} ha alcanzado un progreso de ${progresoUsuario.avance}% en un plan ${progresoUsuario.dificultad}. ¿Qué recomendaciones de ejercicio, alimentación y motivación puedes ofrecer?`;

  try {
    // Usamos el método completions.create para el modelo text-davinci-003
    const completion = await openai.completions.create({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150
    });

    // Retornamos la respuesta generada
    res.json({ recomendaciones: completion.choices[0].text.trim() });
  } catch (error) {
    console.error('Error en OpenAI:', error);
    res.status(500).json({ mensaje: 'Error al obtener recomendaciones IA' });
  }
};

export default obtenerRecomendaciones;
