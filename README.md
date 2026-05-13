# Hospital Backend

Backend del sistema de gestión hospitalaria desarrollado para la materia
Diseño y Arquitectura de Software - Universidad de La Sabana.

## Estado actual del proyecto

### Persona 1 — Base de datos y modelos ✅
- Conexión a PostgreSQL configurada con Sequelize ORM
- 9 modelos con reglas de negocio y asociaciones:
  - Paciente, Medico, Cama, Ingreso, HistoriaClinica,
    NotaMedica, Cita, Receta, Alta
- 9 migraciones listas para crear las tablas
- Seeds de prueba: 2 pacientes, 2 médicos y 3 camas

### Persona 5 — Infraestructura y notificaciones ✅
- Servidor Express corriendo con PM2
- Health check en `http://localhost:3000/health`
- Servicio de notificaciones con Nodemailer
- Cola asíncrona con Bull/Redis
- Dockerfile y docker-compose.yml listos

### Persona 2 — Servicios del dominio 🔄 Pendiente
### Persona 3 — API REST y seguridad 🔄 Pendiente

---

## Stack tecnológico

- Node.js + Express.js
- PostgreSQL + Sequelize ORM
- PM2
- Nodemailer + Bull + Redis
- Docker + docker-compose

---

## Estructura del proyecto

```
hospital-backend/
  src/
    app.js
    domain/
      services/                   ← Persona 2
        CitaService.js
        HistoriaClinicaService.js
        AdmisionService.js
        AltaService.js
        RecetaService.js
    application/                  ← Persona 3
      controllers/
        AuthController.js
        PacienteController.js
        CitaController.js
        HistoriaClinicaController.js
        RecetaController.js
        AdmisionController.js
        AltaController.js
      middlewares/
        AuthMiddleware.js
    infrastructure/
      database/
        models/
        migrations/
        seeders/
        config.js
      notifications/
        NotificacionService.js
        NotificacionQueue.js
  .sequelizerc
  ecosystem.config.js
  Dockerfile
  docker-compose.yml
  package.json
```

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

### 4 — Configurar contraseña

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

Crea un archivo `.env` en la raíz con esto:

```
PORT=3000
EMAIL_USER=hospital.test@gmail.com
EMAIL_PASS=password_temporal
DB_PASSWORD=tu_password_postgres
```

### 6 — Crear tablas y cargar datos de prueba

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

Abre el navegador en:
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
| `npx sequelize-cli db:migrate` | Crea las tablas |
| `npx sequelize-cli db:migrate:undo` | Revierte la última migración |
| `npx sequelize-cli db:seed:all` | Carga datos de prueba |
| `npx sequelize-cli db:seed:undo:all` | Borra datos de prueba |
| `pm2 start ecosystem.config.js` | Inicia el servidor |
| `pm2 status` | Ver estado del servidor |
| `pm2 logs` | Ver logs del servidor |
| `pm2 restart hospital-backend` | Reiniciar el servidor |
| `docker-compose up` | Levantar todo con Docker |

---

## Instrucciones por persona

### Persona 1 ✅
Ya está completo.

---

### Persona 2 — Servicios del dominio

**Paso 1 — Crea las carpetas:**
```bash
mkdir src\domain
mkdir src\domain\services
```

**Paso 2 — Crea estos archivos en `src/domain/services/`:**
- `CitaService.js`
- `HistoriaClinicaService.js`
- `AdmisionService.js`
- `AltaService.js`
- `RecetaService.js`

**Paso 3 — Importa los modelos así en cada servicio:**
```js
const { Cita, Medico, Paciente } = require(
  '../../infrastructure/database/models'
);
```

**Paso 4 — Reglas de negocio que debes implementar:**

RN5 en `CitaService.js`:
```js
const citaExistente = await Cita.findOne({
  where: { MedicoId: medicoId, fechaHora: fechaHora }
});
if (citaExistente) {
  throw new Error('RN5: El médico ya tiene una cita en ese horario');
}
```

RN6 en `CitaService.js`:
```js
const paciente = await Paciente.findByPk(pacienteId);
const medico = await Medico.findByPk(medicoId);
if (!paciente || !medico) {
  throw new Error('RN6: Paciente o médico no válido');
}
```

RN7 en `AdmisionService.js`:
```js
const ingresoActivo = await Ingreso.findOne({
  where: { PacienteId: pacienteId, estado: 'activo' }
});
if (ingresoActivo) {
  throw new Error('RN7: El paciente ya tiene un ingreso activo');
}
```

RN9 en `RecetaService.js`:
```js
const historia = await HistoriaClinica.findByPk(historiaClinicaId);
if (!historia) {
  throw new Error('RN9: Historia clínica no encontrada');
}
```

**Paso 5 — Sube tus cambios:**
```bash
git add .
git commit -m "persona 2: servicios del dominio"
git push
```

---

### Persona 3 — API REST y seguridad

**Paso 1 — Crea las carpetas:**
```bash
mkdir src\application
mkdir src\application\controllers
mkdir src\application\middlewares
```

**Paso 2 — Instala dependencias:**
```bash
npm install jsonwebtoken bcryptjs
```

**Paso 3 — Crea `AuthMiddleware.js` en
`src/application/middlewares/`:**
```js
'use strict';
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'secret'
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
```

**Paso 4 — Crea los controladores en
`src/application/controllers/`:**
- `AuthController.js`
- `PacienteController.js`
- `CitaController.js`
- `HistoriaClinicaController.js`
- `RecetaController.js`
- `AdmisionController.js`
- `AltaController.js`

**Paso 5 — Conecta el middleware en `src/app.js`:**
```js
const authMiddleware = require(
  './application/middlewares/AuthMiddleware'
);
app.use('/api', authMiddleware);
```

**Paso 6 — Sube tus cambios:**
```bash
git add .
git commit -m "persona 3: controladores y autenticación"
git push
```

---

### Persona 5 ✅
Ya está completo.

---

## Problemas frecuentes

**psql no se reconoce como comando:**
Agrega `C:\Program Files\PostgreSQL\17\bin` a las variables de
entorno de Windows y reinicia la terminal.

**Error de contraseña en PostgreSQL:**
Verifica que la contraseña en `config.js` coincide con la de
tu instalación local.

**Error al hacer git push (rejected):**
Primero corre `git pull origin main` y luego vuelve a intentar
`git push`.
