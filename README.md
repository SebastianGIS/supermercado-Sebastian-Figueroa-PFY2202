# Semana 3 - Desarrollo Frontend II 
# Sistema de Gestión de Inventario - Supermercado


App construida con React que simula la gestión de inventario y el carrito de compras de un supermercado, aplicando arquitectura modular, buenas prácticas de enrutamiento y manejo avanzado del estado global.

🔗 **[Ver la aplicación en vivo aquí](https://sebastiangis.github.io/)**


## Tecnologías Utilizadas

* **Librería Principal:** React.js (Componentes Funcionales y Hooks)
* **Navegación:** React Router DOM v6
* **Estilos:** Tailwind CSS v3 (con PostCSS y Autoprefixer)
* **Despliegue:** GitHub Pages (`gh-pages`)

## Estructura del Proyecto

El proyecto sigue una estructura de carpetas basada en buenas prácticas para facilitar la escalabilidad:

```text
src/
 ├── components/    # Fragmentos de UI reutilizables
 ├── context/       # Estado global (SupermercadoContext con useReducer)
 ├── layouts/       # Plantillas maestras (Menú de navegación y Footer)
 ├── pages/         # Vistas completas (Inventario, Carrito, Detalles, Ingreso)
 ├── routes/        # Centralización de navegación y rutas (AppRoutes)
 ├── App.js         # Punto de ensamblaje (Provider + Routes)
 └── index.css      # Directivas de Tailwind y clases reutilizables (@apply)
```

## Instalación y Ejecución Local

Para correr el proyecto en un entorno local:

1. Clona este repositorio:
   ```bash
   git clone https://github.com/SebastianGIS/supermercado-Sebastian-Figueroa-PFY2202
   ```
2. Entra a la carpeta del proyecto:
   ```bash
   cd supermercado-Sebastian-Figueroa-PFY2202
   ```
3. Instala las dependencias necesarias:
   ```bash
   npm install
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm start
   ```
5. Abre [http://localhost:3000](http://localhost:3000) para ver la aplicación en tu navegador.