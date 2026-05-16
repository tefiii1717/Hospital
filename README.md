# Hospital Backend

Backend del sistema de gestión hospitalaria desarrollado para la materia
Diseño y Arquitectura de Software - Universidad de La Sabana.

## Estado actual del proyecto

### Persona 1 — Base de datos y modelos ✅
- Conexión a PostgreSQL configurada con Sequelize ORM
- 9 modelos con reglas de negocio y asociaciones:
  - Paciente, Medico, Cama, Ingreso, HistoriaClinica, NotaMedica, Cita, Receta, Alta
- 9 migraciones listas para crear las tablas
- Seeds de prueba: 2 pacientes, 2 médicos y 3 camas

### Persona 5 — Infraestructura y notificaciones ✅
- Servidor Express corriendo con PM2
- Health check en `http://localhost:3000/health`
- Servicio de notificaciones con Nodemailer
- Cola asíncrona con Bull/Redis
- Dockerfile y docker-compose.yml listos

### Persona 2 — Servicios del dominio ✅
- CitaService.js con RN5 y RN6
- HistoriaClinicaService.js
- AdmisionService.js con RN7
- AltaService.js
- RecetaService.js con RN9
- RN10: todos los servicios se comunican solo a través de interfaces, nunca acceden a repositorios de otros módulos directamente

### Persona 3 — API REST y seguridad ✅
- Autenticación JWT firmada con RS256 (llaves asimétricas)
- Middleware de autorización con RBAC (roles: Admin, Medico, Enfermero)
- 7 controladores REST conectados a los servicios del dominio
- Rutas protegidas por rol según requerimientos del sistema
- `index.js` de modelos Sequelize creado en `infrastructure/database/models/`

---

## Stack tecnológico

- Node.js + Express.js 4
- PostgreSQL + Sequelize ORM
- PM2
- Nodemailer + Bull + Redis
- Docker + docker-compose
- jsonwebtoken (RS256) + bcryptjs

---

## Estructura del proyecto

```
hospital-backend/
  src/
    app.js
    domain/
      services/
        CitaService.js
        HistoriaClinicaService.js
        AdmisionService.js
        AltaService.js
        RecetaService.js
    application/
      controllers/
        authController.js
        pacienteController.js
        citaController.js
        historiaClinicaController.js
        recetaController.js
        admisionController.js
        altaController.js
      middlewares/
        authMiddleware.js
      routes/
        apiRoutes.js
        authRoutes.js
    infrastructure/
      database/
        models/
          index.js         ← generado por Persona 3
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

## Endpoints disponibles

| Método | Ruta | Roles permitidos | Descripción |
|--------|------|-----------------|-------------|
| POST | `/api/v1/auth/login` | Público | Obtener token JWT |
| GET | `/api/v1/pacientes` | Admin, Medico, Enfermero | Listar pacientes |
| GET | `/api/v1/pacientes/:id` | Admin, Medico, Enfermero | Ver paciente |
| POST | `/api/v1/historias` | Admin, Medico | Crear historia clínica |
| GET | `/api/v1/historias/paciente/:pacienteId` | Admin, Medico | Ver historia clínica |
| POST | `/api/v1/historias/:id/notas` | Medico | Añadir nota médica |
| POST | `/api/v1/citas` | Admin, Medico | Agendar cita |
| GET | `/api/v1/citas/medico/:medicoId` | Admin, Medico, Enfermero | Citas por médico |
| GET | `/api/v1/citas/paciente/:pacienteId` | Admin, Medico, Enfermero | Citas por paciente |
| PUT | `/api/v1/citas/:id/cancelar` | Admin, Medico | Cancelar cita |
| POST | `/api/v1/admisiones` | Admin, Enfermero | Registrar ingreso |
| POST | `/api/v1/altas` | Admin, Medico | Registrar alta |
| POST | `/api/v1/recetas` | Medico | Crear receta |
| GET | `/api/v1/recetas/historia/:historiaClinicaId` | Admin, Medico, Enfermero | Recetas por historia |

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

> **Importante:** el proyecto requiere Express 4. Si ves errores de compatibilidad corre:
> ```bash
> npm install express@4.21.2
> ```

### 3 — Crear la base de datos

```bash
psql -U postgres
```

```sql
CREATE DATABASE hospital_db;
\q
```

### 4 — Configurar contraseña de PostgreSQL

Abre `src/infrastructure/database/config.js` y reemplaza `tu_password`:

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
JWT_PRIVATE_KEY="...llave privada RSA..."
JWT_PUBLIC_KEY="...llave pública RSA..."
```

> **Nota:** Las llaves JWT no se suben al repositorio por seguridad.
> Pídeselas a la Persona 3 del equipo para agregarlas a tu `.env` local.

### 6 — Crear tablas y cargar datos de prueba

```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 7 — Iniciar el servidor

```bash
node src/app.js
```

Para producción con PM2:
```bash
npm install -g pm2
pm2 start ecosystem.config.js
```

### 8 — Verificar que funciona

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

## Cómo probar la API (Postman)

### Paso 1 — Obtener token

```
POST http://localhost:3000/api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@hospital.com",
  "password": "123456"
}
```

Usuarios de prueba disponibles:

| Email | Password | Rol |
|-------|----------|-----|
| admin@hospital.com | 123456 | Admin |
| medico@hospital.com | 123456 | Medico |
| enfermero@hospital.com | 123456 | Enfermero |

### Paso 2 — Usar el token

En cada request agrega el header:
```
Authorization: Bearer <token recibido>
```

### Paso 3 — Flujo de prueba recomendado

1. Login como Admin → obtener token
2. `GET /api/v1/pacientes` → ver pacientes del seed
3. Login como Medico → obtener token de médico
4. `POST /api/v1/historias` con `{"pacienteId": 1}` → crear historia
5. `POST /api/v1/citas` con `{"pacienteId": 1, "medicoId": 1, "fechaHora": "2026-06-01T10:00:00"}`
6. `POST /api/v1/admisiones` con `{"pacienteId": 1, "camaId": 1, "motivoIngreso": "Fiebre"}`

---

## Comandos útiles

| Comando | Qué hace |
|---------|----------|
| `npx sequelize-cli db:migrate` | Crea las tablas |
| `npx sequelize-cli db:migrate:undo` | Revierte la última migración |
| `npx sequelize-cli db:seed:all` | Carga datos de prueba |
| `npx sequelize-cli db:seed:undo:all` | Borra datos de prueba |
| `node src/app.js` | Inicia el servidor en desarrollo |
| `pm2 start ecosystem.config.js` | Inicia con PM2 |
| `pm2 status` | Ver estado del servidor |
| `pm2 logs` | Ver logs del servidor |
| `pm2 restart hospital-backend` | Reiniciar el servidor |
| `docker-compose up` | Levantar todo con Docker |

---

## Problemas frecuentes

**psql no se reconoce como comando:**
Agrega `C:\Program Files\PostgreSQL\17\bin` a las variables de entorno de Windows y reinicia la terminal.

**Error de contraseña en PostgreSQL:**
Verifica que la contraseña en `config.js` coincide con la de tu instalación local.

**Error al hacer git push (rejected):**
Primero corre `git pull origin main` y luego vuelve a intentar `git push`.

**Error `Cannot find module '../../infrastructure/database/models'`:**
Verifica que existe el archivo `src/infrastructure/database/models/index.js`. Si no existe, pídeselo a la Persona 3.

**Error de compatibilidad con Express:**
El proyecto usa Express 4. Si tienes Express 5 instalado corre `npm install express@4.21.2`.

**Token inválido o expirado:**
Los tokens duran 8 horas. Haz login de nuevo para obtener uno nuevo.