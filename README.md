# Hospital Backend

Backend del sistema de gestión hospitalaria desarrollado para la materia Diseño y Arquitectura de Software - Universidad de La Sabana.

## ¿Qué hay creado hasta ahora?

La base del proyecto está lista. Esto incluye:

- Conexión a PostgreSQL configurada con Sequelize ORM
- 9 modelos creados con sus reglas de negocio y asociaciones:
  - Paciente
  - Medico
  - Cama
  - Ingreso
  - HistoriaClinica
  - NotaMedica
  - Cita
  - Receta
  - Alta
- 9 migraciones listas para crear las tablas en cualquier máquina
- Seeds de prueba con datos iniciales: 2 pacientes, 2 médicos y 3 camas

## Stack tecnológico

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM

## Requisitos previos

Antes de empezar, asegúrate de tener instalado en tu computador:

- [Node.js LTS](https://nodejs.org)
- [PostgreSQL](https://www.postgresql.org/download/)
- [Git](https://git-scm.com)

## Paso a paso para configurar el proyecto

### 1 — Clonar el repositorio

```bash
git clone https://github.com/tefiii1717/Hospital.git
cd Hospital
```

### 2 — Instalar dependencias

```bash
npm install
```

### 3 — Crear la base de datos en PostgreSQL

Abre la terminal y conéctate a PostgreSQL:

```bash
psql -U postgres
```

Crea la base de datos:

```sql
CREATE DATABASE hospital_db;
```

Sal de PostgreSQL:

```sql
\q
```

### 4 — Configurar la conexión a la base de datos

Abre el archivo `src/infrastructure/database/config.js` y reemplaza 
`tu_password` con la contraseña de tu PostgreSQL local:

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

### 5 — Crear las tablas

```bash
npx sequelize-cli db:migrate
```

Debes ver una línea por cada tabla creada. En total deben aparecer 9 tablas.

### 6 — Cargar los datos de prueba

```bash
npx sequelize-cli db:seed:all
```

### 7 — Verificar que todo funciona

Conéctate a PostgreSQL y verifica que las tablas tienen datos:

```bash
psql -U postgres -d hospital_db
```

```sql
SELECT * FROM "Pacientes";
SELECT * FROM "Medicos";
SELECT * FROM "Camas";
```

Si ves los datos, el proyecto está listo para trabajar.

## Estructura del proyecto
hospital-backend/
src/
infrastructure/
database/
models/        ← modelos Sequelize (uno por entidad)
migrations/    ← migraciones para crear las tablas
seeders/       ← datos de prueba
config.js      ← configuración de conexión a PostgreSQL
.sequelizerc         ← configuración de rutas para Sequelize
package.json

## Comandos útiles

| Comando | Qué hace |
|---|---|
| `npx sequelize-cli db:migrate` | Crea las tablas en la BD |
| `npx sequelize-cli db:migrate:undo` | Revierte la última migración |
| `npx sequelize-cli db:seed:all` | Carga los datos de prueba |
| `npx sequelize-cli db:seed:undo:all` | Borra los datos de prueba |

## Problemas frecuentes

**psql no se reconoce como comando:**
Agrega `C:\Program Files\PostgreSQL\17\bin` a las variables de entorno 
de Windows y reinicia la terminal.

**Error de contraseña en PostgreSQL:**
Abre `src/infrastructure/database/config.js` y verifica que la 
contraseña coincide con la de tu instalación local de PostgreSQL.

**Error de sintaxis en mkdir:**
En Windows usa `\` en lugar de `/` al crear carpetas desde CMD.

## Instrucciones por persona

### Persona 1 — Base de datos y modelos
Ya está completo. Es quien configuró este repositorio.

---

### Persona 2 — Servicios del dominio
Tu trabajo vive en:
src/
domain/
services/
Crea esta carpeta y dentro implementa los servicios:
- `CitaService.js`
- `HistoriaClinicaService.js`
- `AdmisionService.js`
- `AltaService.js`
- `RecetaService.js`

Cada servicio importa los modelos así:
```js
const { Cita } = require('../../infrastructure/database/models');
```

Reglas que debes implementar en los servicios:
- **RN5:** Un médico no puede tener dos citas en el mismo horario
- **RN6:** Una cita debe estar asociada a un paciente y médico válidos
- **RN9:** Todo récipe debe estar ligado a una historia clínica existente
- **RN10:** Los módulos solo interactúan a través de servicios, nunca accediendo directamente a repositorios de otros módulos

---

### Persona 3 — API REST y seguridad
Tu trabajo vive en:
src/
application/
controllers/
middlewares/
Crea esas carpetas y dentro implementa:
- `AuthController.js`
- `PacienteController.js`
- `CitaController.js`
- `HistoriaClinicaController.js`
- `RecetaController.js`
- `AdmisionController.js`
- `AltaController.js`
- `AuthMiddleware.js` ← el más crítico, va primero

Instala las dependencias que necesitas:
```bash
npm install express jsonwebtoken bcryptjs
```

El `AuthMiddleware.js` debe interceptar todos los requests antes 
de que lleguen a cualquier controlador y validar el JWT.

Reglas que debes implementar:
- **RN1:** Solo usuarios autenticados pueden acceder al sistema
- **RN2:** El acceso depende del rol (Médico, Enfermero, Admin)
- **RN4:** Toda modificación de historia clínica debe quedar registrada

---

### Persona 4 — Frontend
Tu trabajo es un proyecto React separado. Crea una carpeta nueva 
llamada `hospital-frontend` fuera de este repositorio y ejecuta:
```bash
npm create vite@latest hospital-frontend -- --template react
cd hospital-frontend
npm install
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Pantallas que debes construir:
- Dashboard del médico
- Historia clínica del paciente
- Agendamiento de citas
- Prescripción de recetas
- Admisión y alta de pacientes

Mientras Persona 3 termina la API, trabaja con datos 
mockeados en cada pantalla para no bloquearte.

---

### Persona 5 — Infraestructura y notificaciones
Tu trabajo vive en:
src/
infrastructure/
notifications/

Instala las dependencias que necesitas:
```bash
npm install nodemailer bull ioredis
npm install -g pm2
```

Tareas:
1. Crea el `Dockerfile` y `docker-compose.yml` en la raíz del proyecto
2. Implementa `NotificacionService.js` con Nodemailer
3. Configura PM2 para que Node.js se reinicie automáticamente si falla
4. Agrega un endpoint `/health` que devuelva el estado del servidor
5. Configura Bull con Redis para la cola de notificaciones asíncronas

El `docker-compose.yml` debe levantar dos servicios:
- El servidor Node.js
- PostgreSQL

Para que todos puedan levantar el proyecto con un solo comando:
```bash
docker-compose up
```Sonnet 4.6
