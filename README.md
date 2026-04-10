# Sistema de Gestión de Gimnasios - Frontend 🏋️‍♂️

Interfaz de usuario para la solución integral B2B de administración financiera de centros deportivos.

> 🔗 **Nota:** Este repositorio contiene únicamente el Frontend. El código del Backend se encuentra en [app-gimnasio-pagos-backend](https://github.com/roberrrrrr/app-gimnasio-pagos-backend.git).

## ✨ Características

- **Panel Administrativo Responsivo:** Diseño optimizado ("Mobile First") para uso ágil por parte del personal.
- **Gestión Visual:** Interfaces claras para control de mensualidades, estados de cuenta y detección de duplicados.
- **Dashboards:** Visualización de recaudación acumulada de forma amigable.

## 🛠️ Stack Tecnológico

- **Framework:** React.js 19
- **Styling:** Tailwind CSS 4
- **Bundler:** Vite 8
- **Despliegue:** Vercel (CI/CD configurado)

## 🚀 Getting Started

### Requisitos Previos

- Node.js 18+
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/roberrrrrr/app-gimnasio-pagos-frontend.git
cd app-gimnasio-pagos-frontend

# Instalar dependencias
npm install

# Crear archivo de variables de entorno
cp .env.example .env.local
```

### Variables de Entorno

```env
VITE_API_URL=http://localhost:3001/api
```

### Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera build de producción |
| `npm run preview` | Previsualiza el build de producción |
| `npm run lint` | Ejecuta el linter |

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── pages/          # Vistas de la aplicación
├── hooks/          # Custom hooks
├── services/       # Llamadas a la API
└── types/          # Definiciones de TypeScript
```

## 🎯 Desafíos Técnicos

- Optimización del rendimiento en la carga de listas grandes de socios.
- Diseño de una experiencia de usuario (UX) fluida para operaciones administrativas rápidas.

## 📄 Licencia

MIT
