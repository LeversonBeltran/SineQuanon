var divContenedor = document.createElement('div'); //Div contenedor del chat
var divChat = document.createElement('div'); //Espacio de texto del chat
var divVenChat = document.createElement('div'); //Ventana de visualización de texto del chat
var BotonChatEnviar = document.createElement('button'); //Boton para enviar el chat
var SalirChat = document.createElement('div'); //Boton para salir el chat
var imgSalir = document.createElement('img');

divContenedor.setAttribute("id", "divContenedor");
divContenedor.setAttribute("class", "divContenedor");
divVenChat.setAttribute("class", "divVenChat");
BotonChatEnviar.setAttribute("class", "BotonChatEnviar");
divChat.setAttribute("class", "divChat");
SalirChat.setAttribute("class", "SalirChat");
SalirChat.setAttribute("id", "SalirChat");
imgSalir.setAttribute("id", "imgSalir");
imgSalir.setAttribute("class", "imgSalir");
imgSalir.setAttribute('src',"delete.png"); //Cambiar
imgSalir.setAttribute("onclick", "salir()");

function VentanaChat(n) {
	divVenChat.setAttribute("id", "divVenChat"+n);
	divChat.setAttribute("id", "divChat"+n);
	BotonChatEnviar.setAttribute("id", "BotonChatEnviar"+n);

	document.body.appendChild(divContenedor);
	divContenedor.appendChild(divVenChat);
	divVenChat.appendChild(divChat);
	divVenChat.appendChild(BotonChatEnviar);

	divContenedor.setAttribute("style", "opacity: 1; z-index: 999; transition: 0.5s;");
	document.getElementById('cuerpo').setAttribute("style", "opacity: 0.5");

	SalirChat.appendChild(imgSalir);
	divVenChat.appendChild(SalirChat);

}

function salir(){
	divContenedor.setAttribute("style", "opacity: 0; z-index: -999; transition: 0.5s;");
	document.getElementById('cuerpo').setAttribute("style", "opacity: 1");
}