var botonIngresar = document.getElementById('Subtitle');
var botonAdd = document.getElementById('addDis');
var divAlert = document.createElement('div');
var labelAlert = document.createElement('label');
var boton1 = document.createElement('button');
var boton2 = document.createElement('button');
var selecto = document.getElementById("lista");

botonAdd.onclick = function(){
	AddDevice();
	console.log("Dispositivo Añadido");
}

selecto.onclick = function(){
	lecturaf();
}

function DispBorrar(n){
	var remover = document.getElementById('Disp'+n);
	document.getElementById("AddDevice").removeChild(remover);
}

function On(n){
	document.getElementById("divOnOff"+n).setAttribute("style","background: linear-gradient(90deg, rgba(255,183,0,1) 13%, rgba(0,0,0,1) 50%); transition: 1s;");
	var CambioE = firebase.database().ref('Disp'+n).update({
		Estado: 1
	});
}

function Off(n){
	document.getElementById("divOnOff"+n).setAttribute("style","background: linear-gradient(90deg, rgba(0,0,0,1) 50%, rgba(255,183,0,1) 80%); transition: 1s;");
	var CambioE = firebase.database().ref('Disp'+n).update({
		Estado: 0
	});
}

function GPIO(n){
	var valorGPIO = firebase.database().ref("Disp"+n).update({
		GPIO: document.getElementById("ChatBoton"+n).value
	});
}

function ModNombre(n){
	var ModificarNombre = firebase.database().ref("Disp"+n).update({
		Nombre: document.getElementById("inputNombre"+n).value
	});
	alert("Se ha guardado el Dispositivo "+document.getElementById("inputNombre"+n).value)
}

function DivAlerta(n){
	divAlert.setAttribute("class", "divAlert");
	divAlert.setAttribute("id", "divAlert"+n);
	labelAlert.setAttribute("id", "labelAlert");

	labelAlert.innerHTML = "¿Estas seguro que quieres eliminarlo?";
	divAlert.appendChild(labelAlert);

	document.body.appendChild(divAlert);
	divAlert.setAttribute("style", "opacity: 1; z-index: 999; transition: 0.5s;");
	document.getElementById('cuerpo').setAttribute("style", "opacity: 0.5");

	boton1.setAttribute("class", "Aceptar");
	boton1.setAttribute("id", "Aceptar"+n);
	boton1.setAttribute("onclick", 'FuncionAceptar('+n+')');
	boton1.innerHTML = "Aceptar";
	boton2.setAttribute("class", "Cancelar");
	boton2.setAttribute("id", "Cancelar");
	boton2.setAttribute("onclick", 'FuncionCancelar('+n+')');
	boton2.innerHTML = "Cancelar";

	divAlert.appendChild(boton1);
	divAlert.appendChild(boton2);
}

function FuncionAceptar(n) {
	DispBorrar(n);
	DelDevice(n);
	console.log(n);
	document.getElementById('divAlert'+n).setAttribute("style", "opacity: 0; z-index: -999; transition: 0.5s;");
	document.getElementById('cuerpo').setAttribute("style", "opacity: 1;");
}

function FuncionCancelar(n) {
	document.getElementById('divAlert'+n).setAttribute("style", "opacity: 0; z-index: -999; transition: 0.5s;");
	document.getElementById('cuerpo').setAttribute("style", "opacity: 1;");
}