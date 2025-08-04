async function cargarMalla() {
  const res = await fetch('data/malla.json');
  const malla = await res.json();

  const contenedor = document.getElementById('malla');
  contenedor.innerHTML = `<pre>${JSON.stringify(malla, null, 2)}</pre>`;
}

cargarMalla();

      

  

