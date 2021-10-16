// Selecciona el formulario del HTML
const formulario = document.querySelector('#formulario');

//escucha el evento submit del formilaio, cancela el comportamiento por defecto del navegador
// obtiene los inputs y comprueba que existan valor, en caso no exista hvalue. muestra Alerta usando Swal
//  En caso tiene todos los datos. Muestra mensaje de correcto y limpia los campos.
// Despues de 2s redirecciona al index.html
formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  let nombre = document.querySelector('#input-1');
  let email = document.querySelector('#input-2');
  let mensaje = document.querySelector('#input-3');
  if (
    nombre.value.trim() === '' ||
    email.value.trim() === '' ||
    mensaje.value.trim() === ''
  ) {
    swal('Todos los campos son obligatorios', {
      icon: 'error',
      title: 'Error',
      button: false,
    });
  } else {
    swal('Mensaje enviado correctamente', {
      icon: 'success',
      title: 'Éxito',
      button: false,
    });
    nombre.value = '';
    email.value = '';
    mensaje.value = '';
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  }
});
