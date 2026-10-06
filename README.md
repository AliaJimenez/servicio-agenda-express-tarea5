# Servicio web de agenda (Express)

Tarea 5 de Programación Web (PWEB). Servicio web hecho con [Express](https://expressjs.com/) de Node.js que realiza las dos operaciones básicas, listar y almacenar contactos, apoyándose en el servicio `http://www.raydelto.org/agenda.php` usado en las tareas anteriores.

## Endpoints

| Método | Ruta         | Descripción                                   |
| ------ | ------------ | --------------------------------------------- |
| GET    | `/contactos` | Lista los contactos de la agenda.             |
| POST   | `/contactos` | Almacena un contacto nuevo en la agenda.      |

### GET /contactos

```bash
curl http://localhost:3000/contactos
```

Respuesta `200`:

```json
[
  { "nombre": "Raydelto", "apellido": "Hernández", "telefono": "809-555-2222" }
]
```

### POST /contactos

Cuerpo JSON con los tres campos obligatorios:

```bash
curl -X POST http://localhost:3000/contactos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Ana","apellido":"Pérez","telefono":"809-111-2222"}'
```

Respuestas:

- `201`: contacto almacenado (devuelve el contacto).
- `400`: falta alguno de los campos `nombre`, `apellido` o `telefono`.
- `502`: el servicio remoto no respondió o devolvió un error.

## Cómo ejecutarlo

Requiere [Node.js](https://nodejs.org/) 18 o superior (usa `fetch` nativo).

```bash
npm install
npm start
```

El servicio queda en `http://localhost:3000`. Se puede cambiar el puerto con la variable de entorno `PORT`.

## Estructura

```
src/
└── server.js   # Servidor Express con las rutas GET y POST /contactos
```
