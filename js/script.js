const materias = [
  // Semestre I
  { codigo: "2017777", nombre: "Ecología", creditos: 4, semestre: 1, requisitos: [] },
  { codigo: "2017776", nombre: "Ciencias de la Tierra", creditos: 4, semestre: 1, requisitos: [] },
  { codigo: "1000024", nombre: "Principios de Química", creditos: 3, semestre: 1, requisitos: [] },
  { codigo: "1000025", nombre: "Laboratorio Principio de química", creditos: 3, semestre: 1, requisitos: ["1000024"] },
  { codigo: "1000001-B", nombre: "Matemáticas Básicas", creditos: 4, semestre: 1, requisitos: [] },

  // Semestre II
  { codigo: "2015877", nombre: "Biología de Plantas", creditos: 4, semestre: 2, requisitos: [] },
  { codigo: "2017774", nombre: "Biología Evolutiva", creditos: 4, semestre: 2, requisitos: [] },
  { codigo: "1000030", nombre: "Química Orgánica", creditos: 3, semestre: 2, requisitos: ["1000024"] },
  { codigo: "1000031", nombre: "Lab. Principio Orgánica", creditos: 3, semestre: 2, requisitos: ["1000030"] },

  // Semestre III
  { codigo: "2017772", nombre: "Biología Animal", creditos: 4, semestre: 3, requisitos: [] },
  { codigo: "2017773", nombre: "Biología de Microorganismos", creditos: 4, semestre: 3, requisitos: [] },
  { codigo: "2023214", nombre: "Principios Bioquímicos", creditos: 4, semestre: 3, requisitos: ["1000030"] },
  { codigo: "2017010", nombre: "Lab. Bioquímica", creditos: 2, semestre: 3, requisitos: ["2023214"] },

  // Semestre IV
  { codigo: "2017775", nombre: "Biomolecular Celular", creditos: 4, semestre: 4, requisitos: ["2023214"] },
  { codigo: "2017778", nombre: "Fundamentación de Investigación", creditos: 4, semestre: 4, requisitos: [] },
  { codigo: "1000004", nombre: "Cálculo Diferencial", creditos: 4, semestre: 4, requisitos: ["1000001-B"] },
  { codigo: "1000023-B", nombre: "Mecánica y Ondas", creditos: 4, semestre: 4, requisitos: ["1000001-B"] },

  // Semestre V
  { codigo: "2017779", nombre: "Genética", creditos: 4, semestre: 5, requisitos: ["2017775"] },
  { codigo: "1000012", nombre: "Bioestadística Fundamental", creditos: 3, semestre: 5, requisitos: ["1000001-B"] },
  { codigo: "OPT-F-1", nombre: "Optativa Fundamental (por definir)", creditos: 4, semestre: 5, requisitos: [] },
  { codigo: "DISC-1", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 5, requisitos: [] },

  // Semestre VI
  { codigo: "OPT-F-2", nombre: "Optativa Fundamental (por definir)", creditos: 4, semestre: 6, requisitos: [] },
  { codigo: "DISC-2", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 6, requisitos: [] },
  { codigo: "DISC-3", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 6, requisitos: [] },
  { codigo: "DISC-4", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 6, requisitos: [] },

  // Semestre VII
  { codigo: "DISC-5", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 7, requisitos: [] },
  { codigo: "DISC-6", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 7, requisitos: [] },
  { codigo: "DISC-7", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 7, requisitos: [] },
  { codigo: "LIBRE-1", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 7, requisitos: [] },

  // Semestre VIII
  { codigo: "DISC-8", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 8, requisitos: [] },
  { codigo: "DISC-9", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 8, requisitos: [] },
  { codigo: "LIBRE-2", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 8, requisitos: [] },
  { codigo: "LIBRE-3", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 8, requisitos: [] },
  { codigo: "LIBRE-4", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 8, requisitos: [] },

  // Semestre IX
  { codigo: "DISC-10", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 9, requisitos: [] },
  { codigo: "DISC-11", nombre: "Disciplinar (por definir)", creditos: 4, semestre: 9, requisitos: [] },
  { codigo: "LIBRE-5", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 9, requisitos: [] },
  { codigo: "LIBRE-6", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 9, requisitos: [] },
  { codigo: "LIBRE-7", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 9, requisitos: [] },

  // Semestre X
  { codigo: "2023028", nombre: "Trabajo de Grado", creditos: 6, semestre: 10, requisitos: [] }, // Validación por créditos puede añadirse
  { codigo: "LIBRE-8", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 10, requisitos: [] },
  { codigo: "LIBRE-9", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 10, requisitos: [] },
  { codigo: "LIBRE-10", nombre: "Libre Elección (por definir)", creditos: 2, semestre: 10, requisitos: [] },
];

let aprobadas = new Set();

function crearMalla() {
  const contenedor = document.getElementById("malla");
  contenedor.innerHTML = "";

  const semestres = {};
  materias.forEach((m) => {
    if (!semestres[m.semestre]) semestres[m.semestre] = [];
    semestres[m.semestre].push(m);
  });

  for (const semestre of Object.keys(semestres).sort((a, b) => a - b)) {
    const div = document.createElement("div");
    div.className = "semestre";
    div.innerHTML = `<h2>Semestre ${semestre}</h2>`;

    semestres[semestre].forEach((ramo) => {
      const divRamo = document.createElement("div");
      divRamo.className = "ramo";
      divRamo.dataset.codigo = ramo.codigo;
      divRamo.innerHTML = `
        <strong>${ramo.nombre}</strong><br />
        Código: ${ramo.codigo}<br />
        Créditos: ${ramo.creditos}
      `;

      const requisitosCumplidos = ramo.requisitos.every((cod) =>
        aprobadas.has(cod)
      );

      if (!requisitosCumplidos && ramo.requisitos.length > 0) {
        divRamo.classList.add("bloqueado");
      }

      if (aprobadas.has(ramo.codigo)) {
        divRamo.classList.add("aprobado");
      }

      divRamo.addEventListener("click", () => {
        if (!divRamo.classList.contains("bloqueado")) {
          if (aprobadas.has(ramo.codigo)) {
            aprobadas.delete(ramo.codigo);
          } else {
            aprobadas.add(ramo.codigo);
          }
          crearMalla(); // volver a renderizar
        }
      });

      div.appendChild(divRamo);
    });

    contenedor.appendChild(div);
  }
}

window.onload = crearMalla;
