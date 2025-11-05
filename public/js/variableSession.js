// import Swal from "sweetalert2";
let tiempo = 0;
let tiempoSession = setInterval( () => {
    tiempo++;
}, 1000);

window.onload = function(){
    setInterval(getCookie, 5000);
} 

function getCookie(){
    
    if(tiempo === 6900){
        Swal.fire({
            icon: 'info',
            title: 'Session',
            text: 'No se han detectado cambios en 115 minutos, dentro de 5 minutos expira esta session..',
            allowOutsideClick: false,
            allowEscapeKey: false,
            confirmButtonText: 'Mantener la sesion activa'
            }).then((result) => {
                if(tiempo >= 7200){
                    Swal.fire({
                    icon: 'warning',
                    title: 'Session expirada',
                    text: 'La session expiro..',
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    confirmButtonText: 'Aceptar'
                    }).then((result) => {
                        if(result.value){
                            location.reload();
                        }
                    })
                }
                if(result.value){
                    tiempo = 0;
                    fetch('/cookieSession', {
                        method: 'GET'
                    })
                    .then(res => res.json())
                    .catch(err => {
                        console.log(err);
                    })
                    .then(data => {
                        console.log(data);
                    })
                }
            })
    }
}