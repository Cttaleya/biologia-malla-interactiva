async function cargarMalla() {
  const res = await fetch('data/malla.json');
  const malla = await res.json();

  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = ''; // Limpiar

  malla.semestres.forEach(semestre => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('semestre');

    const titulo = document.createElement('h2');
    titulo.textContent = semestre.nombre;
    tarjeta.appendChild(titulo);

    const lista = document.createElement('ul');
    semestre.materias.forEach(materia => {
      const item = document.createElement('li');
      item.textContent = materia;
      lista.appendChild(item);
    });

    tarjeta.appendChild(lista);
    contenedor.appendChild(tarjeta);
  });
}

cargarMalla();

      

  

