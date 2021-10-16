// Selectores del HTML que se guarda en varibales, usando querySelector selecciona partes del HTML a usar el signo # representa el id
const botonArticulos = document.querySelector('#obtener-articulos');
const botonTabla = document.querySelector('#obtener-tabla');
const toggleTabla = document.querySelector('#toggle-tabla');
const ulArticulos = document.querySelector('#ul-articulos');
const tablaDOM = document.querySelector('#tabla');
const botonSeccion1 = document.querySelector('#boton-contenido-1');
const botonSeccion2 = document.querySelector('#boton-contenido-2');
const botonSeccion3 = document.querySelector('#boton-contenido-3');

// Imprime en el HTML los titulos del articulo, Tranforma los valores del objeto a un arreglo recorre el arreglo y los imprime usando innerText
const renderizarTitulos = (data) => {
  Object.values(data).forEach((titulo, index) => {
    document.querySelector(`#section-${index + 1}`).innerText = titulo;
  });
};

// Muestra la fecha actual insetandolo como texto. Usando el objeto New date
const renderizarFecha = () => {
  document.querySelector('#fecha').innerText = new Date().toLocaleDateString();
};

// Renderiza la tabla en el HTML, con los datos enviados como parametro. Los recorre y agreaga el elemento como hija a tablaDOM
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

// Renderiza los articulos relaciondos, cre el elemento div y los agrega como HTML, usando los datos enviados como parametro. Luego lo inserta como hijo en ulArticulos
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

// Obtiene los jugadores del archivo JSON en la carpeta model y los envia a renderizarTabla
const obtenerJugadores = () => {
  fetch('./model/futbolistas.json')
    .then((response) => response.json())
    .then((data) => renderizarTabla(data.futbolistas));
};

// Obtiene los titulo del archivo JSON en la carpeta model y los envia  a renderizarTitulos
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

// Obtiene los articulos relacion de la carpeta model en formato JSON y se los envia a la función renderizarArticulos
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

// Función comun para poder realizar toggle del contenido de articulos, Alterna la clase none al elemento enviado y establece el titulo del botón en basa a la clase actual
const ToggleContenido = (contenido, boton, evento) => {
  document.querySelector(contenido).classList.toggle('none');
  boton.textContent = evento.target.textContent.includes('Ocultar')
    ? `Mostrar contenido ${contenido.at(-1)}`
    : `Ocultar contenido ${contenido.at(-1)}`;
};

// Escucha por el evento 'click' del boton de articulos, cuando es presionado ejecuta la función obtenerArticulosRelacionados y  oculta el boton usando JS
botonArticulos.addEventListener('click', () => {
  obtenerArticulosRelacionados();
  botonArticulos.classList.add('none-boton');
});

// Escucha por el evento 'click' del boton de la tabal, cuando es presionado llama a obtenerJugadores. En caso la tabal ya se presiono...
// Y el boton es presionado, manda alerta indicando que la tabla ya existe y Agregado boton para alternar la visibilidad de la tabla usando clases
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

// Boton usado para alteranar la visibilidad de la tabla, cambia dinamicamente el texto del boton
toggleTabla.addEventListener('click', () => {
  if (tablaDOM.classList.contains('none-tabla')) {
    toggleTabla.textContent = 'Presiona para ocultar la tabla';
  } else {
    toggleTabla.textContent = 'Presiona para mostrar la tabla';
  }
  tablaDOM.classList.toggle('none-tabla');
});

// Boton que esucha por el evento click, en caso es presionado ejecuta ToggleContenido basado en el contenido-1 para mostrar/ocultar
botonSeccion1.addEventListener('click', (e) =>
  ToggleContenido('#contenido-1', botonSeccion1, e)
);

// Boton que esucha por el evento click, en caso es presionado ejecuta ToggleContenido basado en el contenido-2 para mostrar/ocultar
botonSeccion2.addEventListener('click', (e) => {
  ToggleContenido('#contenido-2', botonSeccion2, e);
});

// Boton que esucha por el evento click, en caso es presionado ejecuta ToggleContenido basado en el contenido-3 para mostrar/ocultar

// En ambas funciones se utilizo la funcion ToggleContenido
botonSeccion3.addEventListener('click', (e) => {
  ToggleContenido('#contenido-3', botonSeccion3, e);
});

// Funcion pricipal. Con el mismo nombre que el archivo. Es ejecutado en cuanto el JS del html es cargado...
// Ejecuta la funcion para obtener titulos y renderiza la fecha actual
const main = () => {
  obtenerTitulos();
  renderizarFecha();
};
main();
