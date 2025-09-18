// Estado de la aplicación
let currentTool = "move";
let selectedTeam = "home";
let isDrawing = false;
let startX = 0;
let startY = 0;
let annotations = [];
let draggedPlayer = null;

// Jugadores iniciales
const players = {
  home: [
    { id: "h1", name: "Jugador 1", number: "1", x: 90, y: 250 },
    { id: "h2", name: "Jugador 2", number: "2", x: 220, y: 150 },
    { id: "h3", name: "Jugador 3", number: "3", x: 220, y: 210 },
    { id: "h4", name: "Jugador 4", number: "4", x: 220, y: 290 },
    { id: "h5", name: "Jugador 5", number: "5", x: 220, y: 350 },
    { id: "h6", name: "Jugador 6", number: "6", x: 380, y: 180 },
    { id: "h7", name: "Jugador 7", number: "7", x: 380, y: 250 },
    { id: "h8", name: "Jugador 8", number: "8", x: 380, y: 320 },
    { id: "h9", name: "Jugador 9", number: "9", x: 520, y: 200 },
    { id: "h10", name: "Jugador 10", number: "10", x: 520, y: 250 },
    { id: "h11", name: "Jugador 11", number: "11", x: 520, y: 300 },
  ],
  away: [
    { id: "a1", name: "Jugador 1", number: "1", x: 1110, y: 250 },
    { id: "a2", name: "Jugador 2", number: "2", x: 980, y: 150 },
    { id: "a3", name: "Jugador 3", number: "3", x: 980, y: 210 },
    { id: "a4", name: "Jugador 4", number: "4", x: 980, y: 290 },
    { id: "a5", name: "Jugador 5", number: "5", x: 980, y: 350 },
    { id: "a6", name: "Jugador 6", number: "6", x: 820, y: 180 },
    { id: "a7", name: "Jugador 7", number: "7", x: 820, y: 250 },
    { id: "a8", name: "Jugador 8", number: "8", x: 820, y: 320 },
    { id: "a9", name: "Jugador 9", number: "9", x: 680, y: 200 },
    { id: "a10", name: "Jugador 10", number: "10", x: 680, y: 250 },
    { id: "a11", name: "Jugador 11", number: "11", x: 680, y: 300 },
  ],
};

// Formaciones predefinidas
const formations = {
  "4-4-2": {
    home: [
      { x: 90, y: 250 },
      { x: 220, y: 140 },
      { x: 220, y: 200 },
      { x: 220, y: 300 },
      { x: 220, y: 360 },
      { x: 380, y: 160 },
      { x: 380, y: 220 },
      { x: 380, y: 280 },
      { x: 380, y: 340 },
      { x: 520, y: 200 },
      { x: 520, y: 300 },
    ],
    away: [
      { x: 1110, y: 250 },
      { x: 980, y: 140 },
      { x: 980, y: 200 },
      { x: 980, y: 300 },
      { x: 980, y: 360 },
      { x: 820, y: 160 },
      { x: 820, y: 220 },
      { x: 820, y: 280 },
      { x: 820, y: 340 },
      { x: 680, y: 200 },
      { x: 680, y: 300 },
    ],
  },
  "4-3-3": {
    home: [
      { x: 90, y: 250 },
      { x: 220, y: 140 },
      { x: 220, y: 200 },
      { x: 220, y: 300 },
      { x: 220, y: 360 },
      { x: 380, y: 180 },
      { x: 380, y: 250 },
      { x: 380, y: 320 },
      { x: 520, y: 150 },
      { x: 520, y: 250 },
      { x: 520, y: 350 },
    ],
    away: [
      { x: 1110, y: 250 },
      { x: 980, y: 140 },
      { x: 980, y: 200 },
      { x: 980, y: 300 },
      { x: 980, y: 360 },
      { x: 820, y: 180 },
      { x: 820, y: 250 },
      { x: 820, y: 320 },
      { x: 680, y: 150 },
      { x: 680, y: 250 },
      { x: 680, y: 350 },
    ],
  },
};

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", function () {
  updateColors();
  renderPlayers();
  setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
  // Herramientas
  document.querySelectorAll(".tool-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      currentTool = this.getAttribute("data-tool");
      document
        .querySelectorAll(".tool-btn")
        .forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const field = document.getElementById("field");
      field.style.cursor = currentTool === "move" ? "default" : "crosshair";
    });
  });

  // Equipos
  document.querySelectorAll(".team-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      selectedTeam = this.getAttribute("data-team");
      document.querySelectorAll(".team-btn").forEach((b) => {
        b.classList.remove("active");
        b.classList.add("inactive");
      });
      this.classList.remove("inactive");
      this.classList.add("active");
    });
  });

  // Formaciones
  document
    .getElementById("formation-select")
    .addEventListener("change", function () {
      if (this.value) {
        applyFormation(this.value);
      }
    });

  // Colores
  document
    .getElementById("home-color")
    .addEventListener("change", updateColors);
  document
    .getElementById("away-color")
    .addEventListener("change", updateColors);

  // Campo - eventos de dibujo
  const field = document.getElementById("field");
  field.addEventListener("mousedown", handleMouseDown);
  field.addEventListener("mousemove", handleMouseMove);
  field.addEventListener("mouseup", handleMouseUp);
  field.addEventListener("mouseleave", handleMouseUp);
}

// Renderizar jugadores
function renderPlayers() {
  const container = document.getElementById("players-container");
  container.innerHTML = "";

  ["home", "away"].forEach((team) => {
    players[team].forEach((player) => {
      const playerEl = document.createElement("div");
      playerEl.className = `player`;
      playerEl.style.left = `${(player.x / 1200) * 100}%`;
      playerEl.style.top = `${(player.y / 500) * 100}%`;
      playerEl.style.backgroundColor =
        team === "home"
          ? document.getElementById("home-color").value
          : document.getElementById("away-color").value;
      playerEl.textContent = player.number;
      playerEl.setAttribute("data-team", team);
      playerEl.setAttribute("data-id", player.id);

      const nameEl = document.createElement("div");
      nameEl.className = "player-name";
      nameEl.textContent = player.name;
      playerEl.appendChild(nameEl);

      // Eventos de mouse para arrastre
      let isDragging = false;
      let startMouseX, startMouseY, startPlayerX, startPlayerY;

      // Doble click para cambiar nombre
      playerEl.addEventListener("dblclick", function (e) {
        e.preventDefault();
        e.stopPropagation();
        editPlayerName(player, team);
      });

      playerEl.addEventListener("mousedown", function (e) {
        if (currentTool !== "move") return;

        isDragging = true;
        startMouseX = e.clientX;
        startMouseY = e.clientY;
        startPlayerX = player.x;
        startPlayerY = player.y;

        e.preventDefault();
        e.stopPropagation();

        document.addEventListener("mousemove", handlePlayerDrag);
        document.addEventListener("mouseup", handlePlayerDragEnd);
      });

      function handlePlayerDrag(e) {
        if (!isDragging) return;

        const rect = document.getElementById("field").getBoundingClientRect();
        const deltaX = e.clientX - startMouseX;
        const deltaY = e.clientY - startMouseY;

        const newX = startPlayerX + (deltaX / rect.width) * 1200;
        const newY = startPlayerY + (deltaY / rect.height) * 500;

        player.x = Math.max(40, Math.min(1160, newX));
        player.y = Math.max(40, Math.min(460, newY));

        playerEl.style.left = `${(player.x / 1200) * 100}%`;
        playerEl.style.top = `${(player.y / 500) * 100}%`;
      }

      function handlePlayerDragEnd() {
        isDragging = false;
        document.removeEventListener("mousemove", handlePlayerDrag);
        document.removeEventListener("mouseup", handlePlayerDragEnd);
      }

      container.appendChild(playerEl);
    });
  });
}

// Editar nombre del jugador
function editPlayerName(player, team) {
  const currentName = player.name;
  const newName = prompt(
    `Cambiar nombre del jugador #${player.number}:`,
    currentName
  );

  if (newName !== null && newName.trim() !== "") {
    player.name = newName.trim();
    renderPlayers();
  }
}

// Aplicar formación
function applyFormation(formationName) {
  const formation = formations[formationName];
  if (!formation) return;

  ["home", "away"].forEach((team) => {
    formation[team].forEach((pos, index) => {
      if (players[team][index]) {
        players[team][index].x = pos.x;
        players[team][index].y = pos.y;
      }
    });
  });

  renderPlayers();
}

// Actualizar colores
function updateColors() {
  const homeColor = document.getElementById("home-color").value;
  const awayColor = document.getElementById("away-color").value;

  document.querySelectorAll(".player").forEach((player) => {
    const team = player.getAttribute("data-team");
    if (team === "home") {
      player.style.backgroundColor = homeColor;
    } else if (team === "away") {
      player.style.backgroundColor = awayColor;
    }
  });
}

// Manejo de eventos de dibujo
function handleMouseDown(e) {
  if (currentTool === "move") return;

  isDrawing = true;
  const rect = e.currentTarget.getBoundingClientRect();
  startX = ((e.clientX - rect.left) / rect.width) * 1200;
  startY = ((e.clientY - rect.top) / rect.height) * 500;
}

function handleMouseMove() {
  if (!isDrawing || currentTool === "move") return;
  // Aquí podrías agregar una vista previa del dibujo
}

function handleMouseUp(e) {
  if (!isDrawing || currentTool === "move") return;

  const rect = e.currentTarget.getBoundingClientRect();
  const endX = ((e.clientX - rect.left) / rect.width) * 1200;
  const endY = ((e.clientY - rect.top) / rect.height) * 500;

  addAnnotation(startX, startY, endX, endY, currentTool);
  isDrawing = false;
}

// Agregar anotación
function addAnnotation(x1, y1, x2, y2, type) {
  const annotation = {
    id: Date.now(),
    x1,
    y1,
    x2,
    y2,
    type,
  };

  annotations.push(annotation);
  renderAnnotations();
}

// Renderizar anotaciones
function renderAnnotations() {
  const svg = document.getElementById("annotations");
  const existingAnnotations = svg.querySelectorAll(".annotation");
  existingAnnotations.forEach((el) => el.remove());

  annotations.forEach((annotation) => {
    let element;

    if (annotation.type === "line") {
      element = document.createElementNS("http://www.w3.org/2000/svg", "line");
      element.setAttribute("x1", annotation.x1);
      element.setAttribute("y1", annotation.y1);
      element.setAttribute("x2", annotation.x2);
      element.setAttribute("y2", annotation.y2);
      element.setAttribute("stroke", "yellow");
      element.setAttribute("stroke-width", "3");
    } else if (annotation.type === "arrow") {
      element = document.createElementNS("http://www.w3.org/2000/svg", "line");
      element.setAttribute("x1", annotation.x1);
      element.setAttribute("y1", annotation.y1);
      element.setAttribute("x2", annotation.x2);
      element.setAttribute("y2", annotation.y2);
      element.setAttribute("stroke", "yellow");
      element.setAttribute("stroke-width", "3");
      element.setAttribute("marker-end", "url(#arrowhead)");
    } else if (annotation.type === "circle") {
      element = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "circle"
      );
      const cx = (annotation.x1 + annotation.x2) / 2;
      const cy = (annotation.y1 + annotation.y2) / 2;
      const r = Math.abs(annotation.x2 - annotation.x1) / 2;
      element.setAttribute("cx", cx);
      element.setAttribute("cy", cy);
      element.setAttribute("r", r);
      element.setAttribute("stroke", "yellow");
      element.setAttribute("stroke-width", "3");
      element.setAttribute("fill", "none");
    }

    if (element) {
      element.classList.add("annotation");
      svg.appendChild(element);
    }
  });
}

// Reset del campo
function resetField() {
  annotations = [];
  renderAnnotations();
  applyFormation("4-4-2");
}

// Exportar imagen
function exportField() {
  const field = document.getElementById("field");
  html2canvas(field, {
    backgroundColor: null,
    scale: 2,
    logging: false,
    useCORS: true,
  })
    .then(function (canvas) {
      const link = document.createElement("a");
      link.download = "formacion-tactica-ronaldev.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    })
    .catch(function (error) {
      console.error("Error al exportar:", error);
      alert("Error al exportar la imagen. Intenta de nuevo.");
    });
}
