
document.getElementById(`btnBuscar`).addEventListener(`click`, function () {

    let busqueda = document.getElementById(`inputBuscar`).value;

    if (busqueda) {

        buscarImagenes(busqueda);

    } else {

        alert("Debes completar el campo de texto");

    }

});


function buscarImagenes(busqueda) {

    let url = `https://images-api.nasa.gov/search?q=${busqueda}`;

    fetch(url)

        .then(response => response.json())
        .then(data => {
            mostrarResultados(data.collection.items);
        })

        .catch(error => {
            console.error("Error al buscar imágen:", error);
        });

}

function mostrarResultados(items) {

    let contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = '';

    if (items.length === 0) {
        contenedor.innerHTML = '<p>No se encontraron resultados.</p>';
        return;
    }

    // div con clase 'row' para alinear las tarjetas en filas
    const row = document.createElement('div');
    row.classList.add('row');

    items.forEach(item => {

        const { title, description, date_created } = item.data[0];
        const imageUrl = item.links ? item.links[0].href : '';  // Verifica si hay una imagen disponible

        // Acá se crea la tarjeta, se le da una altura máxima al cuerpo y si esta se excede por mucha info, se le agrega una barra
        // de desplazamineto (overflow-y: auto) 
        const card = `
       <div class="col-md-4 mb-3">
           <div class="card h-100">
               <img src="${imageUrl}" class="card-img-top" alt="${title}">
               <div class="card-body" style="max-height: 250px; overflow-y: auto;">  <!-- Fijamos altura máxima con desplazamiento -->
                   <h5 class="card-title">${title}</h5>
                   <p class="card-text">${description ? description : 'Descripción no disponible'}</p>
               </div>
               <div class="card-footer">
                   <small class="text-muted">${new Date(date_created).toLocaleDateString()}</small>
               </div>
           </div>
       </div>
   `;


        row.innerHTML += card;
    });


    contenedor.appendChild(row);
}
