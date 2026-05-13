# Hospital Backend

Backend del sistema de gestión hospitalaria desarrollado para la materia 
Diseño y Arquitectura de Software - Universidad de La Sabana.

## ¿Qué hay creado hasta ahora?

### Persona 1 — Base de datos y modelos ✅
- Conexión a PostgreSQL configurada con Sequelize ORM
- 9 modelos creados con sus reglas de negocio y asociaciones:
  - Paciente, Medico, Cama, Ingreso, HistoriaClinica, NotaMedica, Cita, Receta, Alta
- 9 migraciones listas para crear las tablas en cualquier máquina
- Seeds de prueba: 2 pacientes, 2 médicos y 3 camas

### Persona 5 — Infraestructura y notificaciones ✅
- Servidor Express corriendo con PM2
- Health check en `http://localhost:3000/health`
- Servicio de notificaciones con Nodemailer
- Cola de notificaciones asíncrona con Bull/Redis
- Dockerfile y docker-compose.yml listos

### Persona 2 — Servicios del dominio 🔄 En progreso
Pendiente por implementar.

### Persona 3 — API REST y seguridad 🔄 En progreso
Pendiente por implementar.

### Persona 4 — Frontend 🔄 En progreso
Pendiente por implementar.

---

## Stack tecnológico

- Node.js + Express.js
- PostgreSQL + Sequelize ORM
- PM2
- Nodemailer + Bull + Redis
- React.js + Tailwind CSS (frontend — repositorio separado)
- Docker + docker-compose

---

## Estructura del proyecto

```
hospital-backend/
  src/
    app.js                        ← servidor Express principal
    infrastructure/
      database/
        models/                   ← modelos Sequelize (uno por entidad)
        migrations/               ← migraciones para crear las tablas
        seeders/                  ← datos de prueba
        config.js                 ← configuración de conexión a PostgreSQL
      notifications/
        NotificacionService.js    ← envío de emails con Nodemailer
        NotificacionQueue.js      ← cola asíncrona con Bull/Redis
  .sequelizerc                    ← configuración de rutas para Sequelize
  ecosystem.config.js             ← configuración de PM2
  Dockerfile                      ← imagen Docker del proyecto
  docker-compose.yml              ← orquestación de servicios
  package.json
```

---

## Requisitos previos
Tener instalado:
- [Node.js LTS](https://nodejs.org)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com)

---

## Configuración inicial (solo la primera vez)

### 1 — Clonar el repositorio

```bash
git clone https://github.com/tefiii1717/Hospital.git
cd Hospital
```

### 2 — Instalar dependencias

```bash
npm install
```

### 3 — Crear la base de datos

```bash
psql -U postgres
```

```sql
CREATE DATABASE hospital_db;
\q
```

### 4 — Configurar la contraseña

Abre `src/infrastructure/database/config.js` y reemplaza 
`tu_password` por tu contraseña de PostgreSQL:

```js
module.exports = {
  development: {
    username: "postgres",
    password: "tu_password",
    database: "hospital_db",
    host: "127.0.0.1",
    dialect: "postgres"
  }
};
```

### 5 — Crear el archivo .env

Crea un archivo `.env` en la raíz del proyecto con esto:

```
PORT=3000
EMAIL_USER=hospital.test@gmail.com
EMAIL_PASS=password_temporal
DB_PASSWORD=tu_password_postgres
```

### 6 — Crear las tablas y cargar datos de prueba

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 7 — Iniciar el servidor

```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

### 8 — Verificar que funciona

Abre el navegador y entra a:
```
http://localhost:3000/health
```

Debes ver:
```json
{
  "status": "OK",
  "timestamp": "...",
  "servicio": "Hospital Backend"
}
```

---

## Comandos útiles

| Comando | Qué hace |
|---|---|
| `npx sequelize-cli db:migrate` | Crea las tablas en la BD |
| `npx sequelize-cli db:migrate:undo` | Revierte la última migración |
| `npx sequelize-cli db:seed:all` | Carga los datos de prueba |
| `npx sequelize-cli db:seed:undo:all` | Borra los datos de prueba |
| `pm2 start ecosystem.config.js` | Inicia el servidor con PM2 |
| `pm2 status` | Ver estado del servidor |
| `pm2 logs` | Ver logs del servidor |
| `pm2 restart hospital-backend` | Reiniciar el servidor |
| `docker-compose up` | Levantar todo con Docker |

---

## Instrucciones por persona

### Persona 1 — Base de datos y modelos ✅
Ya está completo.

---

### Persona 2 — Servicios del dominio
Tu trabajo vive en:
```
src/
  domain/
    services/
```

**Paso 1 — Crea las carpetas:**
```bash
mkdir src\domain
mkdir src\domain\services
```

**Paso 2 — Crea estos archivos dentro de `src/domain/services/`:**
- `CitaService.js`
- `HistoriaClinicaService.js`
- `AdmisionService.js`
- `AltaService.js`
- `RecetaService.js`

**Paso 3 — Importa los modelos así en cada servicio:**
```js
const { Cita, Medico, Paciente } = require('../../infrastructure/database/models');
```

**Paso 4 — Reglas de negocio que debes implementar:**

- **RN5** en `CitaService.js`: un médico no puede tener dos citas 
en el mismo horario
```js
const citaExistente = await Cita.findOne({
  where: { MedicoId: medicoId, fechaHora: fechaHora }
});
if (citaExistente) throw new Error('RN5: El médico ya tiene una cita en ese horario');
```

- **RN6** en `CitaService.js`: la cita debe estar asociada a un 
paciente y médico válidos
```js
const paciente = await Paciente.findByPk(pacienteId);
const medico = await Medico.findByPk(medicoId);
if (!paciente || !medico) throw new Error('RN6: Paciente o médico no válido');
```

- **RN7** en `AdmisionService.js`: un paciente solo puede tener 
un ingreso activo
```js
const ingresoActivo = await Ingreso.findOne({
  where: { PacienteId: pacienteId, estado: 'activo' }
});
if (ingresoActivo) throw new Error('RN7: El paciente ya tiene un ingreso activo');
```

- **RN9** en `RecetaService.js`: todo récipe debe estar ligado 
a una historia clínica existente
```js
const historia = await HistoriaClinica.findByPk(historiaClinicaId);
if (!historia) throw new Error('RN9: Historia clínica no encontrada');
```

- **RN10**: los servicios nunca importan repositorios de otros 
módulos directamente. Solo usan modelos de 
`infrastructure/database/models`.

**Paso 5 — Cuando termines sube tus cambios:**
```bash
git add .
git commit -m "persona 2: servicios del dominio"
git push
```

---

### Persona 3 — API REST y seguridad
Tu trabajo vive en:
```
src/
  application/
    controllers/
    middlewares/
```

**Paso 1 — Crea las carpetas:**
```bash
mkdir src\application
mkdir src\application\controllers
mkdir src\application\middlewares
```

**Paso 2 — Instala las dependencias:**
```bash
npm install jsonwebtoken bcryptjs
```

**Paso 3 — Crea `AuthMiddleware.js` primero**, dentro de 
`src/application/middlewares/`:
```js
'use strict';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
```

**Paso 4 — Crea los controladores** dentro de 
`src/application/controllers/`:
- `AuthController.js`
- `PacienteController.js`
- `CitaController.js`
- `HistoriaClinicaController.js`
- `RecetaController.js`
- `AdmisionController.js`
- `AltaController.js`

**Paso 5 — Conecta los controladores en `src/app.js`:**
```js
const authMiddleware = require('./application/middlewares/AuthMiddleware');
app.use('/api', authMiddleware);
```

**Paso 6 — Reglas que debes implementar:**
- **RN1:** solo usuarios autenticados acceden al sistema (AuthMiddleware)
- **RN2:** acceso según rol (Médico, Enfermero, Admin)
- **RN4:** toda modificación de historia clínica queda registrada

**Paso 7 — Cuando termines sube tus cambios:**
```bash
git add .
git commit -m "persona 3: controladores y autenticación"
git push
```

---

### Persona 4 — Frontend
Tu trabajo es un proyecto React **separado**. Crea una carpeta nueva 
fuera de este repositorio.

**Paso 1 — Crea el proyecto React:**
```bash
npm create vite@latest hospital-frontend -- --template react
cd hospital-frontend
npm install
```

**Paso 2 — Instala las dependencias:**
```bash
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Paso 3 — Pantallas que debes construir:**
- Dashboard del médico
- Historia clínica del paciente
- Agendamiento de citas
- Prescripción de recetas
- Admisión y alta de pacientes

**Paso 4 — Mientras Persona 3 termina la API**, trabaja con 
datos mockeados. Ejemplo:
```js
// datos mock temporales hasta que la API esté lista
const pacientes = [
  { id: 1, nombre: 'Carlos', apellido: 'Perez' },
  { id: 2, nombre: 'Maria', apellido: 'Lopez' }
];
```

**Paso 5 — Cuando la API esté lista**, conecta con axios así:
```js
import axios from 'axios';
const API = 'http://localhost:3000/api';

const getPacientes = async () => {
  const response = await axios.get(`${API}/pacientes`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};
```

**Paso 6 — Cuando termines sube tus cambios a un repositorio 
separado** llamado `hospital-frontend`.

---

### Persona 5 — Infraestructura y notificaciones ✅
Ya está completo.

---

## Problemas frecuentes

**psql no se reconoce como comando:**
Agrega `C:\Program Files\PostgreSQL\17\bin` a las variables de 
entorno de Windows y reinicia la terminal.

**Error de contraseña en PostgreSQL:**
Abre `src/infrastructure/database/config.js` y verifica que la 
contraseña coincide con la de tu instalación local.

**Error al hacer git push (rejected):**
Primero haz `git pull origin main` y luego vuelve a intentar 
`git push`.
````

---

Cuando lo pegues haz clic en **Commit changes** para guardarlo.
