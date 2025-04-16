PokeRepo
PokeRepo es una aplicación web desarrollada con Vue 3 que permite explorar y gestionar una lista de Pokémon utilizando datos de la API pública de PokéAPI. Este proyecto fue concebido como una prueba técnica para demostrar habilidades en desarrollo frontend moderno.

🧠 Decisiones Técnicas y Tecnologías Utilizadas
Vue 3 + Composition API: Para una estructura más limpia y reutilizable entre componentes.

Pinia: Gestión de estado global moderna, simple y nativa para Vue 3.

Axios: Cliente HTTP robusto para interactuar con la PokéAPI.

Vue Router: Navegación dinámica entre vistas.

Tailwind CSS v4: Utilidades CSS para un diseño rápido, moderno y responsive.

⚙️ Funcionalidades
✅ Listado dinámico de Pokémon desde la PokéAPI.

🔍 Modal con detalle completo al hacer clic en un Pokémon.

⭐ Marcar y desmarcar favoritos (con persistencia local).

📋 Copiar los datos de un Pokémon al portapapeles.

🔄 Carga de datos controlada desde el store con cacheo inteligente.

📱 Estilo responsive gracias a Tailwind.

📁 Estructura del Proyecto
bash
Copiar
Editar
src/
├── assets/             # Imágenes como íconos
├── components/         # Componentes reutilizables (cards, modal, etc.)
├── router/
│   └── index.js        # Definición de rutas con Vue Router
├── store/
│   └── PokemonStore.js # Estado global con Pinia
├── views/
│   ├── Home.vue        # Vista principal
│   └── List.vue        # Vista de listado completo
├── main.js             # Entrada principal de la app
└── style.css           # Estilos globales (Tailwind incluido)
📸 Capturas de Pantalla
💡 Podés agregar capturas reales aquí. De momento te dejo un formato para que lo completes más adelante:


Home	Modal Detalle Pokémon
🔮 Futuras Mejoras
🔐 Autenticación para guardar favoritos en una cuenta real.

📈 Paginación o carga infinita en el listado de Pokémon.

🎨 Modo oscuro / claro.

🌍 Multilenguaje (i18n).

🧪 Pruebas unitarias con Vitest o Jest.

🚀 Cómo Ejecutar el Proyecto
bash
Copiar
Editar
# Cloná el repo
git clone https://github.com/Lukezet/PokeRepo.git
cd PokeRepo

# Instalá dependencias
npm install

# Iniciá el servidor
npm run dev

# Abrí en el navegador
http://localhost:5173
💬 Contribuciones
Este proyecto es parte de una prueba técnica, pero cualquier sugerencia o mejora es bienvenida. Podés abrir un issue o hacer un pull request si querés colaborar.