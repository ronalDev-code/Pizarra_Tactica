// Estado de la aplicación
let currentTool = 'move';
let selectedTeam = 'home';
let isDrawing = false;
let startX = 0;
let startY = 0;
let annotations = [];

// Jugadores iniciales
const players = {
    home: [
        { id: 'h1', name: 'Jugador 1', number: '1', x: 90, y: 250 },
        { id: 'h2', name: 'Jugador 2', number: '2', x: 220, y: 150 },
        { id: 'h3', name: 'Jugador 3', number: '3', x: 220, y: 210 },
        { id: 'h4', name: 'Jugador 4', number: '4', x: 220, y: 290 },
        { id: 'h5', name: 'Jugador 5', number: '5', x: 220, y: 350 },
        { id: 'h6', name: 'Jugador 6', number: '6', x: 380, y: 180 },
        { id: 'h7', name: 'Jugador 7', number: '7', x: 380, y: 250 },
        { id: 'h8', name: 'Jugador 8', number: '8', x: 380, y: 320 },
        { id: 'h9', name: 'Jugador 9', number: '9', x: 520, y: 200 },
        { id: 'h10', name: 'Jugador 10', number: '10', x: 520, y: 250 },
        { id: 'h11', name: 'Jugador 11', number: '11', x: 520, y: 300 },
    ],
    away: [
        { id: 'a1', name: 'Jugador 1', number: '1', x: 1110, y: 250 },
        { id: 'a2', name: 'Jugador 2', number: '2', x: 980, y: 150 },
        { id: 'a3', name: 'Jugador 3', number: '3', x: 980, y: 210 },
        { id: 'a4', name: 'Jugador 4', number: '4', x: 980, y: 290 },
        { id: 'a5', name: 'Jugador 5', number: '5', x: 980, y: 350 },
        { id: 'a6', name: 'Jugador 6', number: '6', x: 820, y: 180 },
        { id: 'a7', name: 'Jugador 7', number: '7', x: 820, y: 250 },
        { id: 'a8', name: 'Jugador 8', number: '8', x: 820, y: 320 },
        { id: 'a9', name: 'Jugador 9', number: '9', x: 680, y: 200 },
        { id: 'a10', name: 'Jugador 10', number: '10', x: 680, y: 250 },
        { id: 'a11', name: 'Jugador 11', number: '11', x: 680, y: 300 },
    ]
};

// Formaciones predefinidas
const formations = {
    '4-4-2': {
        home: [
            { x: 90, y: 250 },
            { x: 220, y: 140 }, { x: 220, y: 200 }, { x: 220, y: 300 }, { x: 220, y: 360 },
            { x: 380, y: 160 }, { x: 380, y: 220 }, { x: 380, y: 280 }, { x: 380, y: 340 },
            { x: 520, y: 200 }, { x: 520, y: 300 }
        ],
        away: [
            { x: 1110, y: 250 },
            { x: 980, y: 140 }, { x: 980, y: 200 }, { x: 980, y: 300 }, { x: 980, y: 360 },
            { x: 820, y: 160 }, { x: 820, y: 220 }, { x: 820, y: 280 }, { x: 820, y: 340 },
            { x: 680, y: 200 }, { x: 680, y: 300 }
        ]
    },
    '4-3-3': {
        home: [
            { x: 90, y: 250 },
            { x: 220, y: 140 }, { x: 220, y: 200 }, { x: 220, y: 300 }, { x: 220, y: 360 },
            { x: 380, y: 180 }, { x: 380, y: 250 }, { x: 380, y: 320 },
            { x: 520, y: 150 }, { x: 520, y: 250 }, { x: 520, y: 350 }
        ],
        away: [
            { x: 1110, y: 250 },
            { x: 980, y: 140 }, { x: 980, y: 200 }, { x: 980, y: 300 }, { x: 980, y: 360 },
            { x: 820, y: 180 }, { x: 820, y: 250 }, { x: 820, y: 320 },
            { x: 680, y: 150 }, { x: 680, y: 250 }, { x: 680, y: 350 }
        ]
    },
    '3-5-2': {
        home: [
            { x: 90, y: 250 },
            { x: 220, y: 170 }, { x: 220, y: 250 }, { x: 220, y: 330 },
            { x: 380, y: 140 }, { x: 380, y: 200 }, { x: 380, y: 250 }, { x: 380, y: 300 }, { x: 380, y: 360 },
            { x: 520, y: 220 }, { x: 520, y: 280 }
        ],
        away: [
            { x: 1110, y: 250 },
            { x: 980, y: 170 }, { x: 980, y: 250 }, { x: 980, y: 330 },
            { x: 820, y: 140 }, { x: 820, y: 200 }, { x: 820, y: 250 }, { x: 820, y: 300 }, { x: 820, y: 360 },
            { x: 680, y: 220 }, { x: 680, y: 280 }
        ]
    },
    '5-3-2': {
        home: [
            { x: 90, y: 250 },
            { x: 220, y: 120 }, { x: 220, y: 180 }, { x: 220, y: 250 }, { x: 220, y: 320 }, { x: 220, y: 380 },
            { x: 380, y: 180 }, { x: 380, y: 250 }, { x: 380, y: 320 },
            { x: 520, y: 200 }, { x: 520, y: 300 }
        ],
        away: [
            { x: 1110, y: 250 },
            { x: 980, y: 120 }, { x: 980, y: 180 }, { x: 980, y: 250 }, { x: 980, y: 320 }, { x: 980, y: 380 },
            { x: 820, y: 180 }, { x: 820, y: 250 }, { x: 820, y: 320 },
            { x: 680, y: 200 }, { x: 680, y: 300 }
        ]
    },
    '4-2-3-1': {
        home: [
            { x: 90, y: 250 },
            { x: 220, y: 140 }, { x: 220, y: 200 }, { x: 220, y: 300 }, { x: 220, y: 360 },
            { x: 380, y: 220 }, { x: 380, y: 280 },
            { x: 520, y: 160 }, { x: 520, y: 250 }, { x: 520, y: 340 },
            { x: 680, y: 250 }
        ],
        away: [
            { x: 1110, y: 250 },
            { x: 980, y: 140 }, { x: 980, y: 200 }, { x: 980, y: 300 }, { x: 980, y: 360 },
            { x: 820, y: 220 }, { x: 820, y: 280 },
            { x: 680, y: 160 }, { x: 680, y: 250 }, { x: 680, y: 340 },
            { x: 520, y: 250 }
        ]
    }
};

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    updateColors();
    renderPlayers();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentTool = this.getAttribute('data-tool');
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const field = document.getElementById('field');
            field.style.cursor = currentTool === 'move' ? 'default' : 'crosshair';
        });
    });

    document.querySelectorAll('.team-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectedTeam = this.getAttribute('data-team');
            document.querySelectorAll('.team-btn').forEach(b => {
                b.classList.remove('active');
                b.classList.add('inactive');
            });
            this.classList.remove('inactive');
            this.classList.add('active');
        });
    });

    document.getElementById('formation-select').addEventListener('change', function() {
        if (this.value) applyFormation(this.value);
    });

    document.getElementById('home-color').addEventListener('change', updateColors);
    document.getElementById('away-color').addEventListener('change', updateColors);

    const field = document.getElementById('field');
    // Mouse
    field.addEventListener('mousedown', handleMouseDown);
    field.addEventListener('mousemove', handleMouseMove);
    field.addEventListener('mouseup', handleMouseUp);
    field.addEventListener('mouseleave', handleMouseUp);
    // Touch
    field.addEventListener('touchstart', handleTouchStart);
    field.addEventListener('touchmove', handleTouchMove);
    field.addEventListener('touchend', handleTouchEnd);
}

// Renderizar jugadores
function renderPlayers() {
    const container = document.getElementById('players-container');
    container.innerHTML = '';

    ['home', 'away'].forEach(team => {
        players[team].forEach(player => {
            const playerEl = document.createElement('div');
            playerEl.className = `player`;
            playerEl.style.left = `${(player.x / 1200) * 100}%`;
            playerEl.style.top = `${(player.y / 500) * 100}%`;
            playerEl.style.backgroundColor = team === 'home' ? 
                document.getElementById('home-color').value : 
                document.getElementById('away-color').value;
            playerEl.textContent = player.number;
            playerEl.setAttribute('data-team', team);
            playerEl.setAttribute('data-id', player.id);

            const nameEl = document.createElement('div');
            nameEl.className = 'player-name';
            nameEl.textContent = player.name;
            playerEl.appendChild(nameEl);

            enablePlayerDrag(playerEl, player);
            container.appendChild(playerEl);
        });
    });
}

// Arrastre (mouse + touch) + doble click/tap para editar nombre
function enablePlayerDrag(playerEl, player) {
    let isDragging = false;
    let lastTap = 0; // para detectar doble toque en móviles

    // Doble click en PC
    playerEl.addEventListener('dblclick', function(e) {
        e.preventDefault();
        e.stopPropagation();
        editPlayerName(player);
    });

    // Doble tap en móvil
    playerEl.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) { 
            e.preventDefault();
            editPlayerName(player);
        }
        lastTap = currentTime;
    });

    // Mouse arrastre
    playerEl.addEventListener('mousedown', function(e) {
        if (currentTool !== 'move') return;
        isDragging = true;
        e.preventDefault();
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        const rect = document.getElementById('field').getBoundingClientRect();
        updatePlayerPositionAbsolute(player, playerEl, rect, e.clientX, e.clientY);
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    // Touch arrastre
    playerEl.addEventListener('touchstart', function(e) {
        if (currentTool !== 'move') return;
        isDragging = true;
        e.preventDefault();
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);
    });

    function onTouchMove(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        const rect = document.getElementById('field').getBoundingClientRect();
        updatePlayerPositionAbsolute(player, playerEl, rect, touch.clientX, touch.clientY);
    }

    function onTouchEnd() {
        isDragging = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
    }
}

// Actualizar posición de un jugador
function updatePlayerPositionAbsolute(player, playerEl, rect, clientX, clientY) {
    const newX = ((clientX - rect.left) / rect.width) * 1200;
    const newY = ((clientY - rect.top) / rect.height) * 500;

    player.x = Math.max(40, Math.min(1160, newX));
    player.y = Math.max(40, Math.min(460, newY));

    playerEl.style.left = `${(player.x / 1200) * 100}%`;
    playerEl.style.top = `${(player.y / 500) * 100}%`;
}

// Editar nombre del jugador
function editPlayerName(player) {
    const currentName = player.name;
    const newName = prompt(`Cambiar nombre del jugador #${player.number}:`, currentName);
    if (newName !== null && newName.trim() !== '') {
        player.name = newName.trim();
        renderPlayers();
    }
}

// Aplicar formación solo al equipo seleccionado
function applyFormation(formationName) {
    const formation = formations[formationName];
    if (!formation) return;

    formation[selectedTeam].forEach((pos, index) => {
        if (players[selectedTeam][index]) {
            players[selectedTeam][index].x = pos.x;
            players[selectedTeam][index].y = pos.y;
        }
    });

    renderPlayers();
}

// Actualizar colores
function updateColors() {
    const homeColor = document.getElementById('home-color').value;
    const awayColor = document.getElementById('away-color').value;
    document.querySelectorAll('.player').forEach(player => {
        const team = player.getAttribute('data-team');
        player.style.backgroundColor = team === 'home' ? homeColor : awayColor;
    });
}

/* =======================
   EVENTOS DE DIBUJO
   ======================= */
function handleMouseDown(e) {
    if (currentTool === 'move') return;
    isDrawing = true;
    const rect = e.currentTarget.getBoundingClientRect();
    startX = ((e.clientX - rect.left) / rect.width) * 1200;
    startY = ((e.clientY - rect.top) / rect.height) * 500;
}
function handleMouseMove() {}
function handleMouseUp(e) {
    if (!isDrawing || currentTool === 'move') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const endX = ((e.clientX - rect.left) / rect.width) * 1200;
    const endY = ((e.clientY - rect.top) / rect.height) * 500;
    addAnnotation(startX, startY, endX, endY, currentTool);
    isDrawing = false;
}
function handleTouchStart(e) {
    if (currentTool === 'move') return;
    isDrawing = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    startX = ((touch.clientX - rect.left) / rect.width) * 1200;
    startY = ((touch.clientY - rect.top) / rect.height) * 500;
}
function handleTouchMove() {}
function handleTouchEnd(e) {
    if (!isDrawing || currentTool === 'move') return;
    const rect = document.getElementById('field').getBoundingClientRect();
    const touch = e.changedTouches[0];
    const endX = ((touch.clientX - rect.left) / rect.width) * 1200;
    const endY = ((touch.clientY - rect.top) / rect.height) * 500;
    addAnnotation(startX, startY, endX, endY, currentTool);
    isDrawing = false;
}

// Agregar anotación
function addAnnotation(x1, y1, x2, y2, type) {
    const annotation = { id: Date.now(), x1, y1, x2, y2, type };
    annotations.push(annotation);
    renderAnnotations();
}

// Renderizar anotaciones
function renderAnnotations() {
    const svg = document.getElementById('annotations');
    svg.querySelectorAll('.annotation').forEach(el => el.remove());

    annotations.forEach(annotation => {
        let element;
        if (annotation.type === 'line' || annotation.type === 'arrow') {
            element = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            element.setAttribute('x1', annotation.x1);
            element.setAttribute('y1', annotation.y1);
            element.setAttribute('x2', annotation.x2);
            element.setAttribute('y2', annotation.y2);
            element.setAttribute('stroke', 'yellow');
            element.setAttribute('stroke-width', '3');
            if (annotation.type === 'arrow') {
                element.setAttribute('marker-end', 'url(#arrowhead)');
            }
        } else if (annotation.type === 'circle') {
            element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const cx = (annotation.x1 + annotation.x2) / 2;
            const cy = (annotation.y1 + annotation.y2) / 2;
            const r = Math.abs(annotation.x2 - annotation.x1) / 2;
            element.setAttribute('cx', cx);
            element.setAttribute('cy', cy);
            element.setAttribute('r', r);
            element.setAttribute('stroke', 'yellow');
            element.setAttribute('stroke-width', '3');
            element.setAttribute('fill', 'none');
        }
        if (element) {
            element.classList.add('annotation');
            svg.appendChild(element);
        }
    });
}

// Reset del campo
function resetField() {
    annotations = [];
    renderAnnotations();
    applyFormation('4-4-2');
}

// Exportar imagen
function exportField() {
    const field = document.getElementById('field');
    html2canvas(field, {
        backgroundColor: null,
        scale: 2,
        logging: false,
        useCORS: true
    }).then(function(canvas) {
        const link = document.createElement('a');
        link.download = 'formacion-tactica-ronaldev.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }).catch(function(error) {
        console.error('Error al exportar:', error);
        alert('Error al exportar la imagen. Intenta de nuevo.');
    });
}
