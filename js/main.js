let tablebody = document.getElementById("pbody");

let alumnos = []; 
fetch('http://localhost:3000/api/alumnos')
  .then(response => response.json())
  .then(alumnosResponse => {
    alumnos = alumnosResponse;
    if (alumnos.length>0){
      for (i=0 ; i<alumnos.length ; i++){
        let tr = `<tr>
        <td>`+alumnos[i].id+`</td>
        <td>`+alumnos[i].nombre+`</td>
        <td>`+alumnos[i].apellido+`</td>
        <td>`+alumnos[i].dni+`</td>
        <td><i onclick="modalEditar(`+alumnos[i].id+`)" class="fa-solid fa-pen-to-square"></i><i onclick="funcionEliminar(`+alumnos[i].id+`)" class="fa-solid fa-trash m-2"></i></td>
        </tr>`;
        tablebody.innerHTML+=tr;
      }
    }
  })
  .catch(error => console.error('Error al obtener alumno:', error));


function funcionAgregar(){
  // Agregar un nuevo alumno
fetch('http://localhost:3000/api/alumnos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    nombre: $("#nombre").val(),
    apellido: $("#apellido").val(),
    dni: $("#dni").val()
  })
})
  .then(response => response.json())
  .then(newalumno => {
  cerrarModal();
  })
  .catch(error => console.error('Error al agregar alumno:', error));

}

function cerrarModal(){
  let instanciaModal = document.querySelector("#exampleModal");
  let modal = bootstrap.Modal.getInstance(instanciaModal);
  modal.hide();
}

function funcionEditar(){
  fetch('http://localhost:3000/api/alumnos/'+$("#id").val(), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nombre: $("#nombre").val(),
      apellido: $("#apellido").val(),
      dni: $("#dni").val()
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error al actualizar alumno.');
      }
    })
    .then(updatedalumno => {
    cerrarModal();
    })
    .catch(error => console.error('Error al actualizar alumno:', error));
  
}

function modalAgregar(){
  document.getElementById("exampleModalLabel").innerHTML = "Agregar alumno";
  $("#nombre").val("");
  $("#apellido").val("");
  $("#dni").val("");
  $("#botonEditar").hide();
  $("#botonAgregar").show();
}

function modalEditar(id){
  document.getElementById("exampleModalLabel").innerHTML = "Editar alumno";
  let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('exampleModal'));
  modal.show();

  fetch('http://localhost:3000/api/alumnos/'+id)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Error al obtener alumno.');
    }
  })
  .then(alumno => {
    $("#id").val(alumno.id);
    $("#nombre").val(alumno.nombre);
    $("#apellido").val(alumno.apellido);
    $("#dni").val(alumno.dni);
  })
  .catch(error => console.error('Error al obtener alumno:', error));

  $("#botonEditar").show();
  $("#botonAgregar").hide();
}

function funcionEliminar(id){
  fetch('http://localhost:3000/api/alumnos/'+id, {
  method: 'DELETE'
})
  .then(response => {
    if (response.ok) {
      console.log('A eliminado.');
    } else {
      throw new Error('Error al eliminar alumno.');
    }
  })
  .catch(error => console.error('Error al eliminar alumno:', error));
}