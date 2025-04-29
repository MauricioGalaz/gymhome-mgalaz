import { OpenAI } from "openai";

// Configuración de OpenAI
const openai = new OpenAI({
  apiKey: 'your-openai-api-key', // Reemplaza con tu clave API de OpenAI
});

// Función para obtener recomendaciones personalizadas
export const obtenerRecomendaciones = async (req, res) => {
  const { id } = req.params;
  
  // progreso del usuario desde la base de datos
  const progresoUsuario = {
    avance: 75,
    dificultad: 'intermedio',
    plan_id: 1,
  };
  
  // Crear un prompt personalizado basado en el progreso del usuario
  const prompt = `Usuario con ID ${id} ha completado un progreso de ${progresoUsuario.avance}% en su plan de entrenamiento de dificultad ${progresoUsuario.dificultad}. ¿Qué recomendaciones de ejercicios, alimentación o motivación le podrías dar?`;

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003', 
      prompt: prompt,
      max_tokens: 150,
    });
    
    // Responder al frontend con las recomendaciones de IA
    res.json({ recomendaciones: response.choices[0].text.trim() });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener recomendaciones' });
  }
};

// listar el progreso por usuario
export const listarPorUsuario = (req, res) => {
  // lógica para obtener el progreso desde la base de datos
  res.json({ mensaje: 'Progreso del usuario' });
};

// Función para registrar el progreso
export const registrar = (req, res) => {
  // lógica para guardar el progreso en la base de datos
  res.json({ mensaje: 'Progreso registrado correctamente' });
};
