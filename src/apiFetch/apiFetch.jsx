import Swal from "sweetalert2";

export const apiFetch=async(data, clase, metodo)=>{
    let resFinal = "";
    await fetch(
        `https://www.miropero.ar/MiRoperoApiDataGetway.php?class=${clase}&method=${metodo}`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          resFinal = data;
          if (data.result === "El producto no existe") {
            Swal.fire({
              title: 'EL PRODUCTO NO EXISTE O NO SE ENCUENTRA EN STOCK',
              icon: "info",
              confirmButtonText: "CONTINUAR",
            }).then((res) => {
              window.location.replace("https://www.miropero.ar/");
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      return resFinal;
}