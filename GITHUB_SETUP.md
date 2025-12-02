# 📤 Instrucciones para Subir a GitHub

## Paso 1: Crear Repositorio en GitHub

1. Ve a https://github.com/new
2. **Nombre del repositorio:** `compursatil-app02`
3. **Descripción:** "Sistema de Gestión de Inventarios y Ventas para COMPURSATIL"
4. **Privado/Público:** Elige según prefiera
5. **NO inicialices con README, .gitignore ni LICENSE** (ya existen en local)
6. Click en **"Create repository"**

## Paso 2: Conectar Repositorio Local a GitHub

Ejecuta estos comandos en la terminal (en la carpeta del proyecto):

```bash
# Cambiar el origin remoto a tu nuevo repositorio
git remote remove origin
git remote add origin https://github.com/crispand03/compursatil-app02.git

# Establecer la rama main como rama por defecto
git branch -M main

# Hacer push de todos los cambios
git push -u origin main
```

## Paso 3: Verificar

Abre https://github.com/crispand03/compursatil-app02 y deberías ver tu proyecto completamente subido.

## 🚀 Ejecutar desde GitHub

Otros usuarios pueden clonar y ejecutar tu proyecto:

```bash
# Clonar
git clone https://github.com/crispand03/compursatil-app02.git
cd compursatil-app02

# Instalar dependencias
npm install
cd server && npm install && cd ..

# Configurar base de datos (crear .env)
cd server
echo DB_HOST=localhost > .env
echo DB_PORT=3306 >> .env
echo DB_USER=root >> .env
echo DB_PASSWORD=root >> .env
echo DB_NAME=compursatil >> .env
echo PORT=3001 >> .env

# Inicializar BD
node init-db.js
node insert-test-data.js
cd ..

# Ejecutar
# Terminal 1:
cd server && npm start

# Terminal 2:
npm run dev
```

Luego acceder a: http://localhost:5173/compursatil-app

---

**Nota:** Asegúrate de que GitHub Desktop o git CLI está configurado en tu máquina.
