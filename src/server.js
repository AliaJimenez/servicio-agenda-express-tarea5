import express from "express";

const AGENDA_URL = "http://www.raydelto.org/agenda.php";
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// GET /contactos -> lista los contactos del servicio remoto.
app.get("/contactos", async (req, res) => {
  try {
    const respuesta = await fetch(AGENDA_URL);
    if (!respuesta.ok) {
      return res
        .status(502)
        .json({ error: "El servicio de agenda respondió HTTP " + respuesta.status });
    }
    const contactos = await respuesta.json();
    res.json(contactos);
  } catch (err) {
    res.status(502).json({ error: "No se pudo consultar la agenda: " + err.message });
  }
});

// POST /contactos -> almacena un contacto en el servicio remoto.
// Cuerpo esperado: { "nombre": "...", "apellido": "...", "telefono": "..." }
app.post("/contactos", async (req, res) => {
  const { nombre, apellido, telefono } = req.body ?? {};
  const contacto = {
    nombre: String(nombre ?? "").trim(),
    apellido: String(apellido ?? "").trim(),
    telefono: String(telefono ?? "").trim(),
  };

  if (!contacto.nombre || !contacto.apellido || !contacto.telefono) {
    return res
      .status(400)
      .json({ error: "Los campos nombre, apellido y telefono son obligatorios." });
  }

  try {
    const respuesta = await fetch(AGENDA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contacto),
    });
    if (!respuesta.ok) {
      return res
        .status(502)
        .json({ error: "El servicio de agenda respondió HTTP " + respuesta.status });
    }
    res.status(201).json(contacto);
  } catch (err) {
    res.status(502).json({ error: "No se pudo guardar el contacto: " + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servicio de agenda escuchando en http://localhost:${PORT}`);
});
