# 🌐 Guía de Despliegue en Web - COMPURSATIL

## Opción 1: GitHub Pages (Recomendado - Gratis y Automático)

GitHub Pages publicará automáticamente tu aplicación en cada push a `main`.

### Pasos:

#### 1. Habilitar GitHub Pages en el Repositorio

1. Ve a tu repositorio: https://github.com/crispand03/compursatil-app02
2. Haz clic en **Settings**
3. En la sección izquierda, busca **Pages**
4. En **Source**, asegúrate de que esté seleccionado **GitHub Actions**
5. Guarda los cambios

#### 2. Push a GitHub (Dispara la construcción automática)

```bash
# Desde la raíz del proyecto
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

#### 3. Espera a que se complete la acción

- Ve a **Actions** en tu repositorio
- Espera a que el workflow "Build and Deploy to GitHub Pages" se complete (verde ✅)
- Esto toma ~2-5 minutos

#### 4. Accede tu aplicación

Tu sitio estará disponible en:
```
https://crispand03.github.io/compursatil-app02/
```

**Nota importante:** Esta versión será **estática** (solo interfaz, sin backend API). Los datos de prueba se incluirán en el frontend.

---

## Opción 2: GitHub Pages + Backend en Render o Railway

Si necesitas que **la API funcione en tiempo real**, desplegar el backend también.

### Pasos para el Backend (usando Render.com):

#### 1. Preparar el Backend

Crea un archivo `Procfile` en la carpeta `server/`:

```
web: node server.js
```

#### 2. Crear cuenta en Render

1. Ve a https://render.com
2. Crea una cuenta con GitHub
3. Ve a **Dashboard** → **New Web Service**

#### 3. Conectar el repositorio

1. Selecciona tu repositorio `compursatil-app02`
2. Configura lo siguiente:

   **Name:** `compursatil-api`  
   **Root Directory:** `server`  
   **Build Command:** `npm install`  
   **Start Command:** `npm start`  

#### 4. Configurar variables de entorno

Agregua en la sección **Environment**:

```
DB_HOST=tu_host_mysql
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=compursatil
PORT=3001
JWT_SECRET=tu_secreto_jwt
```

#### 5. Deploy

Haz click en **Deploy**. Tu API estará disponible en:
```
https://compursatil-api.onrender.com
```

#### 6. Actualizar el Frontend

En `src/App.jsx`, cambia la URL de API:

```javascript
// Cambia esto:
const API_URL = 'http://localhost:3001/api';

// Por esto:
const API_URL = 'https://compursatil-api.onrender.com/api';
```

Luego: `git push origin main` para redeployar el frontend.

---

## Opción 3: Vercel (Mejor para React)

Vercel es la plataforma oficial recomendada para Vite + React.

### Pasos:

#### 1. Crear cuenta en Vercel

1. Ve a https://vercel.com
2. Crea una cuenta con GitHub
3. Importa tu repositorio `compursatil-app02`

#### 2. Configurar proyecto

- **Framework Preset:** Vite
- **Build Command:** `npm run build` (debe estar preconfigurado)
- **Output Directory:** `dist`

#### 3. Deploy

Vercel deployará automáticamente en:
```
https://compursatil-app02.vercel.app
```

Y auto-deployará con cada push a `main`.

---

## Opción 4: Netlify (Alternativa a Vercel)

Similar a Vercel, buena opción si prefieres.

### Pasos:

1. Ve a https://netlify.com
2. Conecta con GitHub
3. Importa repositorio `compursatil-app02`
4. Deja los settings por defecto
5. Netlify se encargará del resto

Tu sitio estará en: `https://compursatil-app02.netlify.app`

---

## Comparativa de Opciones

| Opción | Frontend | Backend | Costo | Tiempo | Automatización |
|--------|----------|---------|-------|--------|---|
| **GitHub Pages** | ✅ | ❌ | Gratis | 5 min | Automática |
| **GitHub Pages + Render** | ✅ | ✅ | Gratis | 15 min | Automática |
| **Vercel** | ✅ | ❌ | Gratis | 5 min | Automática |
| **Vercel + Render** | ✅ | ✅ | Gratis | 15 min | Automática |
| **Netlify** | ✅ | ❌ | Gratis | 5 min | Automática |
| **DigitalOcean** | ✅ | ✅ | $5/mes | 30 min | Manual |

---

## Estado Actual

✅ Vite configurado con `base: "/compursatil-app02/"`  
✅ GitHub Actions workflow creado  
✅ package.json con scripts de build  
✅ Proyecto en GitHub: https://github.com/crispand03/compursatil-app02

## Próximos Pasos Recomendados

### Alternativa A (Más rápida - Solo Frontend):
```bash
# 1. Ve a Settings → Pages → Source: GitHub Actions
# 2. Espera 5 minutos
# 3. Accede: https://crispand03.github.io/compursatil-app02/
```

### Alternativa B (Completa - Frontend + Backend):
```bash
# 1. Deploy frontend a GitHub Pages (Paso A)
# 2. Deploy backend a Render (explicado arriba)
# 3. Actualiza API_URL en src/App.jsx
# 4. git push para redeployar frontend
```

---

## Verificación de Despliegue

Una vez desplegado, verifica que:

1. **Página carga:** Accede a tu URL
2. **Estilos se ven:** CSS debe estar presente
3. **Pantalla de login:** Debe mostrar credenciales
4. **Responsivo:** Funciona en mobile y desktop

---

## Troubleshooting

### ❌ "Page Not Found" en GitHub Pages
- Verifica que GitHub Pages está habilitado
- Verifica que el workflow se completó (Actions → verde ✅)
- Verifica la URL (case-sensitive): `compursatil-app02`

### ❌ Estilos no se ven
- GitHub Pages ya configura la base correctamente
- Si persiste, limpia caché del navegador

### ❌ API no funciona
- Si usas GitHub Pages solo, la API no estará disponible
- Deploy el backend a Render/Railway

### ❌ Workflow falla
- Revisa el log en **Actions**
- Verifica que tienes `npm run build` en package.json
- Asegúrate de no tener errores en el código

---

## URL Final

Una vez completado:

```
🌐 Frontend: https://crispand03.github.io/compursatil-app02/
📱 Dashboard: Login requerido (ver credenciales en README.md)
🔗 Repositorio: https://github.com/crispand03/compursatil-app02
```

**¡Tu aplicación estará publicada y accesible desde cualquier lugar! 🚀**
