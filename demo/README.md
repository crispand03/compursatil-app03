# COMPURSATIL - Versión DEMO

## 📋 Descripción

Esta es una versión de demostración de COMPURSATIL que funciona **sin conexión a base de datos**. Todos los datos se almacenan en memoria (en el navegador) usando JavaScript puro.

## 🎯 Características

- ✅ **Dashboard** con métricas en tiempo real
- ✅ **Gestión de Inventario** - Agregar, editar y eliminar productos
- ✅ **Registro de Ventas** - Registrar ventas y gestionar clientes
- ✅ **Gestión de Clientes** - Agregar y administrar clientes
- ✅ **Reportes** - Top productos, análisis de stock
- ✅ **Estilos completos** - Responsive design con Tailwind CSS
- ✅ **Sin necesidad de servidor** - Funciona totalmente en el navegador

## 🚀 Cómo ejecutar

### Opción 1: Abrir directamente en el navegador
```bash
# Simplemente abre el archivo index.html en tu navegador
# O desde VS Code, haz clic derecho y "Open with Live Server"
```

### Opción 2: Usar el servidor Node.js incluido
```bash
# En la carpeta demo/
node server.js

# Luego abre: http://localhost:3002
```

## ⚠️ Limitaciones

- **Datos en memoria**: Los datos se pierden al recargar la página
- **Sin persistencia**: No hay base de datos
- **Navegador solo**: Todo se ejecuta en el cliente
- **Sin autenticación**: No hay login (es demo)

## 📊 Datos de Ejemplo

La aplicación viene con datos de ejemplo:
- 2 productos preconfigurados (Dell Inspiron, HP Pavilion)
- 1 cliente de ejemplo (Juan García)
- 1 venta de ejemplo

Puedes agregar más desde la interfaz.

## 🎨 Funcionalidades Principales

### Dashboard
- Total de productos en stock
- Total de ventas registradas
- Número de clientes
- Ingresos del mes

### Inventario
- Tabla de productos con todos los detalles
- Agregar nuevos productos
- Editar productos existentes
- Eliminar productos

### Ventas
- Registrar nuevas ventas
- Seleccionar producto de inventario
- Calcular automáticamente totales
- Historial de ventas

### Clientes
- Lista de clientes
- Datos de contacto
- Número de compras
- Total gastado

### Reportes
- Top 5 productos más vendidos
- Análisis de stock
- Indicadores de disponibilidad

## 💻 Tecnologías

- **Frontend**: HTML5 + CSS3 + JavaScript puro
- **Estilos**: Tailwind CSS (CDN)
- **Iconos**: Lucide (CDN)
- **Servidor opcional**: Node.js

## 🔄 Datos Iniciales en el Código

Puedes modificar los datos iniciales en la sección `const store` del archivo HTML:

```javascript
const store = {
    productos: [
        // Agrega/modifica productos aquí
    ],
    clientes: [
        // Agrega/modifica clientes aquí
    ],
    ventas: [
        // Agrega/modifica ventas aquí
    ]
};
```

## 📝 Notas

- Esta versión es ideal para **demostraciones**, **pruebas de UI** y **capacitación**
- No afecta la versión de producción con base de datos
- Puedes usar esta como punto de partida para un prototipo
- Los estilos son idénticos a la versión con BD

## 🔗 Archivos

- `index.html` - Aplicación completa HTML + CSS + JS
- `server.js` - Servidor Node.js opcional
- `README.md` - Este archivo

## 📞 Uso en Producción

Para una versión con persistencia de datos:
1. Usa la versión completa: https://github.com/crispand03/compursatil-app03
2. Conecta a una base de datos real
3. Despliega en Render o tu servidor preferido

---

**Versión**: Demo v1.0  
**Última actualización**: Diciembre 2025  
**Estado**: 100% funcional sin BD
