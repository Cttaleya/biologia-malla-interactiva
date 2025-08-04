let materiasAprobadas = new Set();

async function cargarMalla() {
  try {
    const res = await fetch('data/malla.json');
    if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
    const data = await res.json();
    renderizarMalla(data.semestres);
  } catch (error) {
    console.error('Error cargando la malla:', error);
    const contenedor = document.getElementById('malla');
    contenedor.innerHTML = `<p style="color:red;">Error al cargar la malla. Verifica la ruta del archivo JSON.</p>`;
  }
}

function renderizarMalla(semestres) {
  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = '';

  semestres.forEach((sem, i) => {
    const divSemestre = document.createElement('div');
    divSemestre.className = 'semestre';
    divSemestre.innerHTML = `<h2>Semestre ${i + 1}</h2>`;

    sem.materias.forEach(materia => {
      const divMateria = document.createElement('div');
      divMateria.className = 'materia';
      divMateria.id = `materia-${materia.codigo}`;

      const requisitos = materia.requisitos || [];

      divMateria.innerHTML = `
        <h3>${materia.nombre}</h3>
        <p><strong>Código:</strong> ${materia.codigo}</p>
        <p><strong>Créditos:</strong> ${materia.creditos}</p>
        <p><strong>Tipología:</strong> ${materia.tipologia || 'Por definir'}</p>
        <p><strong>Requisitos:</strong> ${requisitos.length > 0 ? requisitos.join(', ') : 'Ninguno'}</p>
        <button onclick="aprobarMateria('${materia.codigo}')" id="btn-${materia.codigo}">
          Aprobar materia
        </button>
      `;

      divSemestre.appendChild(divMateria);
    });

    contenedor.appendChild(divSemestre);
  });

  actualizarBotones(semestres);
}

function aprobarMateria(codigo) {
  materiasAprobadas.add(codigo);

  const div = document.getElementById(`materia-${codigo}`);
  div.classList.add('aprobada');

  const btn = document.getElementById(`btn-${codigo}`);
  btn.disabled = true;
  btn.textContent = 'Aprobada ✅';

  fetch('data/malla.json')
    .then(res => res.json())
    .then(data => actualizarBotones(data.semestres));
}

function actualizarBotones(semestres) {
  semestres.forEach(sem => {
    sem.materias.forEach(materia => {
      const btn = document.getElementById(`btn-${materia.codigo}`);
      if (!btn) return;

      const requisitos = materia.requisitos || [];
      const habilitada = requisitos.every(req => materiasAprobadas.has(req));

      if (materiasAprobadas.has(materia.codigo)) {
        btn.disabled = true;
        btn.textContent = 'Aprobada ✅';
        document.getElementById(`materia-${materia.codigo}`).classList.add('aprobada');
      } else {
        btn.disabled = !habilitada;
        btn.textContent = habilitada ? 'Aprobar materia' : 'Requiere otros cursos';
      }
    });
  });
}

// Cargar al inicio cuando se abre la página
document.addEventListener('DOMContentLoaded', cargarMalla);


