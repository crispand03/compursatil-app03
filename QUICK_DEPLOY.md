# GUÍA RÁPIDA: Desplegar tu aplicación completa a la nube

## 🎯 Lo que ya está hecho:
✅ Frontend deployado en GitHub Pages: https://crispand03.github.io/compursatil-app03
✅ Código configurado para conectarse a un backend en producción
✅ Archivos de configuración listos

## 📋 Lo que necesitas hacer (3 pasos):

### PASO 1: Crear cuenta en Render (2 minutos)
1. Ve a https://render.com
2. Click en "Sign Up"
3. Usa tu cuenta de GitHub para registrarte (haz clic en "GitHub")
4. Autoriza a Render

### PASO 2: Desplegar el Backend (5 minutos)
1. En Render, click en "New" → "Web Service"
2. Conectar repositorio:
   - Click "Connect repository"
   - Busca y selecciona: `crispand03/compursatil-app03`
3. Configurar servicio:
   - **Name**: `compursatil-api`
   - **Root Directory**: `server`
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
4. Click "Create Web Service"

### PASO 3: Configurar variables de entorno (5 minutos)
1. En tu servicio de Render, ve a "Environment"
2. Agrega estas variables:

```
DB_HOST=your_mysql_host
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_PORT=3306
DB_NAME=compursatil
JWT_SECRET=compursatil_secret_key_2025_segura
NODE_ENV=production
```

**¿De dónde obtener los valores?**

#### Opción A: JawsDB (RECOMENDADO - Gratis)
1. Ve a https://www.jawsdb.com
2. Regístrate con GitHub
3. Click en "Create New" → "MySQL"
4. Obtendrás una URL como: `mysql://user:pass@host:3306/dbname`
5. Extrae los valores de esa URL

#### Opción B: PlanetScale (Alternativa)
1. Ve a https://planetscale.com
2. Regístrate
3. Crea una base de datos
4. Obtén la cadena de conexión

#### Opción C: Tu MySQL local (solo para pruebas)
- Host: tu dirección IP pública o localhost
- User: root
- Password: root (o tu contraseña)
- Database: compursatil

### PASO 4: Verificar que funciona (2 minutos)
1. Espera a que Render termine de desplegar (unos 2-3 minutos)
2. Verás una URL como: `https://compursatil-api-xxxx.onrender.com`
3. Abre en tu navegador: `https://compursatil-api-xxxx.onrender.com/api/health`
4. Deberías ver algo como: `{"status":"API working"}`

### PASO 5: Actualizar URL del frontend (2 minutos)
1. En tu repositorio local, abre `.env.production`
2. Cambia la URL a la que obtuviste en Render:
   ```
   VITE_API_URL=https://compursatil-api-xxxx.onrender.com/api
   ```
3. Ejecuta en terminal:
   ```
   npm run deploy
   ```

## 🚀 ¡Listo!
Tu aplicación debe funcionar completamente en:
https://crispand03.github.io/compursatil-app03

Prueba con:
- Usuario: `admin`
- Contraseña: `admin123`

## ⚠️ Notas importantes:

- **Render gratis**: Se pausa después de 15 minutos de inactividad. La primera solicitud tarda ~30s.
- **Base de datos**: Mantén seguras tus credenciales de BD
- **API URL**: Reemplaza `xxxx` con el nombre real de tu servicio en Render

## 🆘 Si algo no funciona:

1. Verifica que el servicio en Render esté "Running" (verde)
2. Revisa los logs en Render (pestaña "Logs")
3. Confirma que la URL en `.env.production` es correcta
4. Comprueba que las variables de entorno están todas configuradas

## 📚 Archivos de referencia:
- `DEPLOYMENT_GUIDE.md` - Guía detallada
- `.env.production` - Configuración de producción
- `server/.env.example` - Ejemplo de variables del servidor
