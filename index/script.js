document.addEventListener("DOMContentLoaded", () => {
  console.log("Página cargada");
});
const images = [
  "assets/gal1.png",
  "assets/gal2.png",
  "assets/gal3.png",
  "assets/gal4.png",
];
const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");
  if (menuToggle && menu) {
    // Agregar evento de clic para alternar el menú
    menuToggle.addEventListener("click", () => {
      menu.classList.toggle("show"); // Alternar clase "show"

      // Cambiar el ícono del botón
      if (menu.classList.contains("show")) {
        menuToggle.textContent = "✖"; // Cambiar a "X" para cerrar
      } else {
        menuToggle.textContent = "☰"; // Cambiar a hamburguesa
      }
    });
  } else {
    console.error("No se encontraron los elementos del menú.");
  }

function toggleAccordion(element) {
  const content = element.nextElementSibling; // Obtiene el contenido asociado
  const isOpen = content.style.display === "block";

  // Cierra todos los contenidos
  document.querySelectorAll(".accordion-content").forEach((item) => {
    item.style.display = "none";
    item.previousElementSibling.querySelector(".accordion-toggle").textContent =
      "+";
  });

  // Abre o cierra el contenido seleccionado
  if (!isOpen) {
    content.style.display = "block";
    element.querySelector(".accordion-toggle").textContent = "-";
  }
}

let currentIndex = 0;

const modal = document.getElementById("appointment-modal");
const closeModalButton = document.getElementById("close-modal");
const bookButtons = document.querySelectorAll(".book-button");
const galleryImage = document.getElementById("gallery-image");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

function showImage(index) {
  currentIndex = (index + images.length) % images.length; // Asegura el bucle infinito
  galleryImage.src = images[currentIndex];
}

prevButton.addEventListener("click", () => showImage(currentIndex - 1));
nextButton.addEventListener("click", () => showImage(currentIndex + 1));

// Maneja la respuesta del login
function handleCredentialResponse(response) {
  console.log("Token ID:", response.credential);

  // Habilitar botón de agendamiento tras iniciar sesión
  document.getElementById("scheduleButton").disabled = false;
  alert("Inicio de sesión exitoso. Ahora puedes agendar una cita.");
}

// Configuración inicial
document.getElementById("scheduleButton").addEventListener("click", () => {
  alert("Aquí iría la funcionalidad de agendar citas.");
});

// Mostrar el modal al hacer clic en un botón de reserva
bookButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });
});

// Cerrar el modal al hacer clic en el botón de cerrar
closeModalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// También puedes cerrar el modal al hacer clic fuera de él
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// Manejar el envío del formulario
document
  .getElementById("appointment-form")
  .addEventListener("submit", (event) => {
    event.preventDefault(); // Evita que la página se recargue

    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    // Formatear la fecha y hora
    const startDateTime = new Date(`${date}T${time}:00`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // +30 minutos

    // Llamar a la función para crear el evento
    createCalendarEvent(startDateTime, endDateTime);
  });

// Crear un evento en Google Calendar
function createCalendarEvent(startDateTime, endDateTime) {
  if (!gapi.client || !gapi.client.calendar) {
    alert("Google Calendar API no está inicializada.");
    return;
  }

  const event = {
    summary: "Cita con Mauricio Esteban",
    description: "Consulta agendada.",
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: "America/New_York", // Ajusta según tu zona horaria
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: "America/New_York",
    },
  };

  gapi.client.calendar.events
    .insert({
      calendarId: "primary", // Usa el calendario principal del usuario
      resource: event,
    })
    .then((response) => {
      alert("Cita creada exitosamente en Google Calendar.");
      console.log("Evento creado:", response);
      modal.classList.add("hidden"); // Cierra el modal después de crear el evento
    })
    .catch((error) => {
      console.error("Error al crear el evento:", error);
      alert("Hubo un problema al crear la cita.");
    });
}
function initializeGoogleCalendarAPI() {
  gapi.load("client", () => {
    gapi.client
      .init({
        apiKey: "AIzaSyD0UU97jFQwBEuTFlv8T9unI6FM8-k8AsE", // Reemplaza con tu API Key de Google
        clientId:
          "897170356005-0gfkpot37f8trhks2s1gps1iif6j4boo.apps.googleusercontent.com", // Reemplaza con tu Client ID de Google
        discoveryDocs: [
          "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
        ],
        scope: "https://www.googleapis.com/auth/calendar.events",
      })
      .then(() => {
        console.log("Google Calendar API inicializada.");
      })
      .catch((error) => {
        console.error("Error al inicializar la API:", error);
      });
  });
}
// Llamar a la función de inicialización al cargar la página
document.addEventListener("DOMContentLoaded", initializeGoogleCalendarAPI);
