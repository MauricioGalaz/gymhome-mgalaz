// RecomendacionController.js
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const obtenerRecomendaciones = async (req, res) => {
  const { id } = req.params;

  const progresoUsuario = {
    avance: 80,
    dificultad: 'intermedio'
  };

  const prompt = `Usuario con ID ${id} ha alcanzado un progreso de ${progresoUsuario.avance}% en un plan ${progresoUsuario.dificultad}. ¿Qué recomendaciones de ejercicio, alimentación y motivación puedes ofrecer?`;

  try {
    const completion = await openai.completions.create({
      model: 'text-davinci-003',
      prompt,
      max_tokens: 150
    });
    res.json({ recomendaciones: completion.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener recomendaciones IA' });
  }
};

export default obtenerRecomendaciones;
