//Creo un objeto constructor para sistema de estudiantes - OK
class sistemaEstudiantes {
  constructor(id, dni, nombre, apellido, edad) {
    this.id = id;
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
  }
}

//CAPTURO DATOS DEL DOM
let guardarEstudiante = document.getElementById("registrarEstudianteBtn");
let buscarPorDocumento = document.getElementById("buscarDNIBtn");
let estudiantesDiv = document.getElementById("estudiantes");
let mostrarRegistro = document.getElementById("btnMostrarRegistro");
let btnVaciarRegistro = document.getElementById("btnEliminarRegistro");
let btnModoOscuro = document.getElementById("btnCambiarModoOscuro");
let btnModoClaro = document.getElementById("btnCambiarModoClaro");
let idDarkMode = document.getElementById("darkMode");
let btnJSON = document.getElementById("cargoJSON");
let estudiantesHP = document.getElementById("estudiantesHP");
//Variables
let arrayProcessed = false;

//Leo archivo .JSON con Async Await y aplico en DOM

const arrayHP = async () => {
  const response = await fetch("harryPotterCharacters.json");
  const data = await response.json();
  for (let elem of data) {
    let nuevoEstudianteDiv = document.createElement("div");
    nuevoEstudianteDiv.className = "col-12 col-md-6 col-lg-4 my-3";
    nuevoEstudianteDiv.innerHTML = `
            <div id="${elem.id}" class="card" style="width: 21rem;">
                    <h4 class="card-title" style = "text-align: center;">Información del estudiante ${elem.id}</h4>
                    <img class="card-img-top" height="300px" src="${elem.image}" alt="">
                    <p style = "margin-left: 20px" class=""><strong>Informacion importada de archivo .JSON</strong></p>
                    <p style = "margin-left: 20px"><strong>Nombre: </strong> ${elem.name}</p>
                    <p style = "margin-left: 20px"><strong>Apellido: </strong>${elem.lastName}</p>
                    <p style = "margin-left: 20px" class=""><strong>Año de nacimiento: </strong>${elem.yearOfBirth}</p>
                    <p style = "margin-left: 20px" class=""><strong>Edad: </strong>${elem.age}</p>
                    <p style = "margin-left: 20px" class=""><strong>Casa: </strong>${elem.house}</p>
                </div>
            </div> 
            `;
    estudiantesHP.appendChild(nuevoEstudianteDiv);
  }
  arrayProcessed = true;
};

//Creo funcion para cargar estudiantes
function registrarEstudiantes(array) {
  let inputNombre = document.getElementById("nombreInput");
  let inputApellido = document.getElementById("apellidoInput");
  let inputDNI = document.getElementById("dniInput");
  let inputEdad = document.getElementById("edadInput");
  const nuevoEstudiante = new sistemaEstudiantes(
    array.length + 1,
    inputDNI.value,
    inputNombre.value,
    inputApellido.value,
    inputEdad.value
  );
  array.push(nuevoEstudiante);
  localStorage.setItem("estudiantes", JSON.stringify(array));
  let formAgregarEstudiante = document.getElementById("formAgregarEstudiante");
  formAgregarEstudiante.reset();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Registro guardado con éxito",
    showConfirmButton: false,
    timer: 1500,
    width: "25%",
  });
}

//Funcion para buscar por DNI.
function buscoPorDocumento(array) {
  let dniIngresado = document.getElementById("dniBuscadoInput");
  let busqueda = array.filter(
    (elemento) => elemento.dni == parseInt(dniIngresado.value)
  );
  if (busqueda.length === 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "No se encontró un resultado para el DNI ingresado",
    });
  } else {
    busqueda = JSON.stringify(busqueda);
    Swal.fire({
      text: `${busqueda}`,
    });
  }
}

//Funcion que imprime el registro cargado.

function verRegistro(array) {
  estudiantesDiv.innerHTML = "";
  for (let estudiante of array) {
    let nuevoEstudianteDiv = document.createElement("div");
    nuevoEstudianteDiv.className = "col-12 col-md-6 col-lg-4 my-3";
    nuevoEstudianteDiv.innerHTML = `
          <div id="${estudiante.id}" class="card" style="width: 21rem;">
                  <h4 class="card-title" style = "text-align: center;">Información del estudiante ${estudiante.id}</h4>
                  <p style = "margin-left: 20px"><strong>Nombre: </strong> ${estudiante.nombre}</p>
                  <p style = "margin-left: 20px"><strong>Apellido: </strong>${estudiante.apellido}</p>
                  <p style = "margin-left: 20px" class=""><strong>Documento: </strong>${estudiante.dni}</p>
                  <p style = "margin-left: 20px" class=""><strong>Edad: </strong>${estudiante.edad}</p>
              </div>
          </div> 
          `;
    estudiantesDiv.appendChild(nuevoEstudianteDiv);
  }
}

//Funcion que vacia todos los datos del registro
function borroRegistro() {
  estudiantesDiv.remove();
  estudiantesHP.innerHTML = " ";
  arrayProcessed = false;
  localStorage.removeItem("estudiantes");
}
//verifico storage y aplico modo oscuro o claro
let modoOscuroStorage = JSON.parse(localStorage.getItem("modoOscuro"));
if (modoOscuroStorage == true) {
  idDarkMode.attributes[2].textContent = "dark";
  btnModoOscuro.classList.add("invisible");
} else {
  idDarkMode.attributes[2].textContent = "light";
  btnModoClaro.classList.add("invisible");
}

//---------------------------------------------------HASTA ACÁ FUNCIONES---------------------------------------------------------//
const estudiantes = [];

//Botones modo oscuro y claro
btnModoOscuro.addEventListener("click", () => {
  idDarkMode.attributes[2].textContent = "dark";
  localStorage.setItem("modoOscuro", true);
  btnModoOscuro.classList.add("invisible");
  btnModoClaro.classList.remove("invisible");
});
btnModoClaro.addEventListener("click", () => {
  idDarkMode.attributes[2].textContent = "light";
  localStorage.setItem("modoOscuro", false);
  btnModoClaro.classList.add("invisible");
  btnModoOscuro.classList.remove("invisible");
});

guardarEstudiante.addEventListener("click", () => {
  registrarEstudiantes(estudiantes);
});

buscarPorDocumento.addEventListener("click", () => {
  buscoPorDocumento(estudiantes);
});

mostrarRegistro.addEventListener("click", () => {
  verRegistro(estudiantes);
});

btnVaciarRegistro.addEventListener("click", () => {
  Swal.fire({
    title: "¿Estas seguro/a que deseas vaciar el registro de estudiantes?",
    text: "Esta accion no puede ser revertida",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, borralo!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Borrado!",
        "El registro ha sido borrado con exito.",
        "success",
        borroRegistro(),
        verRegistro(estudiantes)
      );
    }
  });
});

btnJSON.addEventListener("click", () => {
  if (!arrayProcessed) {
    arrayHP();
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "La información ya fue registrada en el sistema. No es posible cargarla más de una vez",
    });
  }
});
