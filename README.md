# PokeRepo

PokeRepo es una aplicación web desarrollada con Vue 3 que permite explorar y gestionar una lista de Pokémon utilizando datos de la API pública de PokéAPI. Este proyecto fue concebido como una prueba técnica para demostrar habilidades en desarrollo frontend moderno.

## 🧠 Decisiones Técnicas y Tecnologías Utilizadas

- **Vue 3 + Composition API**:
  Opté por Vue 3 con la Composition API para aprovechar una estructura de código más modular y reutilizable. Esta elección facilita la organización lógica del componente y mejora la mantenibilidad del proyecto.
- **Pinia**: 
  Para la gestión del estado global, utilicé Pinia debido a su integración nativa con Vue 3 y su sintaxis intuitiva. Pinia permite un manejo eficiente del estado compartido, como la lista de Pokémon y   los        favoritos, mejorando la coherencia de los datos en toda la aplicación.
- **Axios**: 
  Implementé Axios para realizar solicitudes HTTP a la PokéAPI. Su capacidad para manejar peticiones y respuestas de manera sencilla lo convierte en una herramienta ideal para interactuar con APIs RESTful.
- **Vue Router**: 
  Utilicé Vue Router para gestionar la navegación entre diferentes vistas de la aplicación, como la página principal y la lista de Pokémon. Esta herramienta permite una experiencia de usuario fluida y una       
  estructura de rutas clara.
- **Tailwind CSS v4**: 
  Para el diseño y la estilización de la interfaz, elegí Tailwind CSS v4. Esta biblioteca de utilidades CSS permite un desarrollo rápido y coherente del diseño, facilitando la creación de una interfaz responsive   y moderna.

## ⚙️ Funcionalidades

- ✅ Listado dinámico de Pokémon desde la PokéAPI.
- 🔍 Modal con detalle completo al hacer clic en un Pokémon.
- ⭐ Marcar y desmarcar favoritos (con persistencia local).
- 📋 Copiar los datos de un Pokémon al portapapeles.
- 🔄 Carga de datos controlada desde el store con cacheo inteligente.
- 📱 Estilo responsive gracias a Tailwind.

## 📁 Estructura del Proyecto

```bash
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
```
## 📸 Capturas de Pantalla
![image](https://github.com/user-attachments/assets/293a3245-a715-41ba-8ade-d37dd37cb81f)

![image](https://github.com/user-attachments/assets/42e501f7-e6a6-4439-9c46-caee68a85718)

![image](https://github.com/user-attachments/assets/b0deec81-d350-4ddc-9977-ba026d307d62)

## 🚀 Cómo Ejecutar el Proyecto

```bash
# Cloná el repo
git clone https://github.com/Lukezet/PokeRepo.git
cd PokeRepo

# Instalá dependencias
npm install

# Iniciá el servidor
npm run dev

# Abrí en el navegador
http://localhost:5173
```
## 💬 Contribuciones
Este proyecto es parte de una prueba técnica, pero cualquier sugerencia o mejora es bienvenida. Podés abrir un issue o hacer un pull request si querés colaborar.
