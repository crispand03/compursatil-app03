# Instrucciones para desplegar el Backend a Render

## Opción 1: Desplegar a Render (RECOMENDADO)

### Paso 1: Crear cuenta en Render
1. Ve a https://render.com
2. Crea una cuenta gratuita con tu GitHub

### Paso 2: Preparar el backend
El backend ya está configurado. Solo necesitas:
- El archivo `server/server.js`
- El archivo `server/package.json`
- Las variables de entorno (.env)

### Paso 3: Crear un servicio Web en Render
1. Dashboard de Render → New → Web Service
2. Conectar repositorio GitHub: `crispand03/compursatil-app03`
3. Configurar:
   - **Name**: `compursatil-api`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

### Paso 4: Agregar variables de entorno
En Render Dashboard, ve a tu servicio → Environment:
```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_PORT=3306
DB_NAME=compursatil
JWT_SECRET=compursatil_secret_key_2025_segura
NODE_ENV=production
```

### Paso 5: Deploy
- Render desplegará automáticamente
- Tu URL será algo como: `https://compursatil-api.onrender.com`

### Paso 6: Actualizar frontend
Una vez que tengas la URL de Render:
1. Actualiza `.env.production` en la raíz con la URL correcta
2. Ejecuta: `npm run deploy`

## Opción 2: Base de datos en la nube

Para que el backend funcione, necesitas una base de datos MySQL accesible desde internet.

### Alternativa A: JawsDB (MySQL como servicio)
1. Ve a https://www.jawsdb.com
2. Crea cuenta gratuita
3. Crea una base de datos MySQL
4. Obtén las credenciales (host, user, password, database)
5. Usa esas credenciales en las variables de entorno de Render

### Alternativa B: PlanetScale (MySQL compatible)
1. Ve a https://planetscale.com
2. Crea cuenta gratuita
3. Crea una rama main de base de datos
4. Obtén la cadena de conexión
5. Configura en Render

### Alternativa C: Usar tu MySQL local (no recomendado para producción)
Si tienes MySQL corriendo localmente, podrías:
- Configurar port forwarding en tu router
- Usar un túnel como ngrok
- Aunque esto no es seguro para producción

## Pasos finales después del deploy

1. Verifica que el backend funciona:
   - Abre: `https://compursatil-api.onrender.com/api/health`
   - Deberías ver: `{"status":"API working","timestamp":"..."}`

2. Tu aplicación en GitHub Pages ahora funcionará:
   - URL: https://crispand03.github.io/compursatil-app03

3. Prueba login con:
   - Usuario: admin
   - Contraseña: admin123

## Solución de problemas

Si ves "Error de conexión: Backend en puerto 3001 no disponible":

1. Verifica que el backend en Render está corriendo
2. Confirma que la URL en `.env.production` es correcta
3. Comprueba que las variables de entorno en Render están configuradas
4. Verifica que tu base de datos está accesible desde Render

## Comandos útiles

```bash
# Desplegar cambios al frontend
npm run deploy

# Ver logs de Render
# (Desde el dashboard de Render)

# Probar backend localmente
cd server
npm install
node server.js
```

---
**Nota**: El archivo `.env` es privado y no se debe compartir en GitHub.
El archivo `.env.example` muestra qué variables se necesitan.
