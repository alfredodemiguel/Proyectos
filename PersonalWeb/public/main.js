document.getElementById("mostrarFichero").addEventListener("change", mostrarFichero);

function mostrarFichero(){
    var nombreFichero = document.getElementById("mostrarFichero").value;
    document.getElementById("ficheroSeleccionado").innerHTML = nombreFichero.substring(12,);
}

