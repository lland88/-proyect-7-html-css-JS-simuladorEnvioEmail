const email = {
  email: "",
  asunto: "",
  descripcion: "",
};

//Variables del documento
const correo = document.querySelector(`.correo`);
const asunto = document.querySelector(`.asunto`);
const descripcion = document.querySelector(`.descripcion`);
const enviar = document.querySelector(`.enviar`);
const vaciar = document.querySelector(`.vaciar`);
const spinner = document.querySelector(`#spinner`);
const formulario = document.querySelector(`.formulario`);

//registramos con blur cuando se hace click en un input y se sale de el, para correo, asunto y descripcion

correo.addEventListener(`blur`, generarAlerta);
asunto.addEventListener(`blur`, generarAlerta);
descripcion.addEventListener(`blur`, generarAlerta);

//funcion para insertar alertas
function generarAlerta(e) {
  const alerta = document.createElement(`H4`);
  // con alerta check es una variable que si la clase alerta no existe sera null y la podemos utilizar para ver si existe una alerta en ese input
  const alertacheck = e.target.parentElement.querySelector(`.alerta`);
  const ubicacionalerta = e.target.parentElement;
  // con el siguiente condicional verificamos si la clase "alerta" ya existe en el html, no hay que colocar ninguna condicion pues el if lo entiende directamente ya que es un boolean
  if (alertacheck) {
    alertacheck.remove();
  }
  //de la siguiente forma sí el input es el de correo y no está vacio enviamos a comprobar si el correo es valido, si no lo es imprimimos la alerta el correo no es valido
  if (e.target === correo && e.target.value !== "") {
    const resultado = comprobarEmail(e.target.value);
    if (resultado) {
    } else {
      alerta.textContent = `El correo no es valido`;
      ubicacionalerta.appendChild(alerta);
    }
  }
  //de la siguiente forma revisamos si el sitio donde dimos click lo dejamos vacio entonces imprimimos la alerta de campo obligatorio
  if (e.target.value.trim() === "") {
    alerta.textContent = `Este campo es obligatorio`;
    ubicacionalerta.appendChild(alerta);
  }
  alerta.classList.add(`alerta`);
  // almacenamos la informacion sumistrada por el usuario en un objeto, ya que parece conveniente tener el ticket del usuario almacenado así, el id que se usa esta en el html
  email[e.target.id] = e.target.value.trim().toLowerCase();

  habilitarBoton();
}
// Para comprobar el email se utiliza una expresion regular, estas se googlean, existen para codigos postales, emails, numeros telefonicos, etc
function comprobarEmail(email) {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  const resultado = regex.test(email);
  return resultado;
}

//tambien registramos click en los botones enviar y vaciar
enviar.addEventListener(`click`, clickEnviar);
vaciar.addEventListener(`click`, clickVaciar);

function clickVaciar(e) {
  // vaciamos los inputs
  correo.value = "";
  asunto.value = "";
  descripcion.value = "";
  //vaciamos el objeto tambien
  email.email = "";
  email.asunto = "";
  email.descripcion = "";
}

//La logica para habilitar el boton es, si no hay alertas y no hay inputs vacios habilita el boton, else mantenlo deshabilitado
function habilitarBoton() {
  const alertacheck = document.querySelector(`.alerta`);
  if (
    alertacheck === null &&
    email.email !== "" &&
    email.asunto !== "" &&
    email.descripcion !== ""
  ) {
    enviar.disabled = false;
  } else {
    enviar.disabled = true;
  }
}
//para darle click a enviar el boton tiene que estar habilitado y por lo tanto todos los inputs llenos correctamente
function clickEnviar(e) {
  spinner.classList.remove(`spinnerhidden`);
  setTimeout(() => {
    spinner.classList.add(`spinnerhidden`);
    const enviado = document.createElement(`H5`);
    enviado.textContent = `Su mensaje ha sido enviado exitosamente.`;
    formulario.appendChild(enviado);
    setTimeout(() => {
      formulario.removeChild(enviado);
      clickVaciar(e);
    }, 3000);
  }, 3000);
}
