const botonArticulos = document.querySelector('#obtener-articulos');
const botonTabla = document.querySelector('#obtener-tabla');
const toggleTabla = document.querySelector('#toggle-tabla');
const ulArticulos = document.querySelector('#ul-articulos');
const tablaDOM = document.querySelector('#tabla');
const botonSeccion1 = document.querySelector('#boton-contenido-1');
const botonSeccion2 = document.querySelector('#boton-contenido-2');
const botonSeccion3 = document.querySelector('#boton-contenido-3');

const renderizarTitulos = (data) => {
  Object.values(data).forEach((titulo, index) => {
    document.querySelector(`#section-${index + 1}`).innerText = titulo;
  });
};

const renderizarFecha = () => {
  document.querySelector('#fecha').innerText = new Date().toLocaleDateString();
};

const renderizarTabla = (datos) => {
  let tablaSelector = document.querySelector('#datos-tabla');
  let tablaElement = document.createElement('table');
  let tablaDOM = document.querySelector('#tabla');
  tablaSelector = '';
  datos.forEach((jugador) => {
    tablaSelector += `
    <tr>
    <td>${jugador.nombre}</td>
    <td>${jugador.edad} años</td>
    <td>$ ${jugador.ganancia.salario} Millones</td>
    <td>$ ${jugador.ganancia.patrocinadores} Millones</td>
    <td>$ ${
      jugador.ganancia.salario + jugador.ganancia.patrocinadores
    } Millones</td>
    <td>${jugador.equipo}</td>
    </tr>
    `;
  });
  tablaElement.innerHTML = tablaSelector;
  tablaDOM.appendChild(tablaElement);
};

const renderizarArticulos = (datos) => {
  let html = '';
  const div = document.createElement('div');
  datos.articulos.forEach((dato) => {
    html += `
    <li class="post-recomendado">
        <img
          src="img/${dato.img} "
          alt="${dato.alt}"
          title="${dato.titulo} "
          width="75"
          width="75"
        />
        <div>
          <a href="#" class="link-recomendado"
            >${dato.titulo}</a
          >
          <p class="autor-recomendado">Escrito por ${dato.autor}</p>
        </div>
    </li>
    
    `;
  });
  div.innerHTML = html;
  ulArticulos.appendChild(div);
};

const obtenerJugadores = () => {
  fetch('./model/futbolistas.json')
    .then((response) => response.json())
    .then((data) => renderizarTabla(data.futbolistas));
};

const obtenerTitulos = () => {
  fetch('./model/titulos.json')
    .then((response) => response.json())
    .then((data) => renderizarTitulos(data))
    .catch((error) =>
      swal('Ocurrió un error obteniendos los titulos.' + error, {
        icon: 'error',
        titulo: 'Error',
      })
    );
};

const obtenerArticulosRelacionados = () => {
  fetch('./model/articulos.json')
    .then((response) => response.json())
    .then((data) => renderizarArticulos(data))
    .catch((error) =>
      swal('Ocurrió un error obteniendos los articulos relacionados.' + error, {
        icon: 'error',
        titulo: 'Error',
      })
    );
};

const ToggleContenido = (contenido, boton, evento) => {
  document.querySelector(contenido).classList.toggle('none');
  boton.textContent = evento.target.textContent.includes('Ocultar')
    ? `Mostrar contenido ${contenido.at(-1)}`
    : `Ocultar contenido ${contenido.at(-1)}`;
};

botonArticulos.addEventListener('click', () => {
  obtenerArticulosRelacionados();
  botonArticulos.classList.add('none-boton');
});

botonTabla.addEventListener('click', () => {
  if (document.querySelector('td')) {
    swal('La tabla ya se agrego', {
      icon: 'warning',
      title: 'Validación',
      button: false,
    });
    botonTabla.classList.add('none-boton');
    toggleTabla.classList.remove('none-boton');
    toggleTabla.textContent = 'Presiona para ocultar/mostrar la tabla';
    toggleTabla.classList.add('boton-agregar', 'boton-secundario');
    return;
  }
  obtenerJugadores();
});

toggleTabla.addEventListener('click', () => {
  if (tablaDOM.classList.contains('none-tabla')) {
    toggleTabla.textContent = 'Presiona para ocultar la tabla';
  } else {
    toggleTabla.textContent = 'Presiona para mostrar la tabla';
  }
  tablaDOM.classList.toggle('none-tabla');
});

botonSeccion1.addEventListener('click', (e) =>
  ToggleContenido('#contenido-1', botonSeccion1, e)
);

botonSeccion2.addEventListener('click', (e) => {
  ToggleContenido('#contenido-2', botonSeccion2, e);
});

botonSeccion3.addEventListener('click', (e) => {
  ToggleContenido('#contenido-3', botonSeccion3, e);
});

const main = () => {
  obtenerTitulos();
  renderizarFecha();
};
main();
