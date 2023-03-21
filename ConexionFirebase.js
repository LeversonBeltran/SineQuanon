var incremento = 0;
var decremento = 0;
var firebaseconfig;
var WESP = [];
var seleccion;

WESP[0] = { //ESP8266 - Witty ESP-12F
	  GPIO0: 0, GPIO1: 1, GPIO2: 2, GPIO3: 3, GPIO4: 4,
	  GPIO5: 5, GPIO12: 12, GPIO13: 13, GPIO14: 14,
	  GPIO15: 15, GPIO16: 16, GPIOA0: 'A0'
	}

WESP[1] = { //ESP8266 - NodeMCU
	  GPIO1: 1, GPIO2: 2, GPIO3: 3, GPIO4: 4
	}

if(!!localStorage.getItem("ConFirebase")){
	procesoR(localStorage.getItem("ConFirebase"));
}

function procesoR(fire){
seleccion = 0; //document.getElementById("lista").value;
firebaseconfig = fire;
firebaseconfig = firebaseconfig.replaceAll("\n","");
firebaseconfig = JSON.parse(firebaseconfig);

/*
var firebaseconfig = {
  "apiKey": "AIzaSyARt76OGmsErvq98lC6WgtPNPjmRwEYGvc",
  "authDomain": "espiot-c42bc.firebaseapp.com",
  "databaseURL": "https://espiot-c42bc.firebaseio.com",
  "projectId": "espiot-c42bc",
  "storageBucket": "espiot-c42bc.appspot.com",
  "messagingSenderId": "294917733350",
  "appId": "1:294917733350:web:3a5eb6cbe389d110b87427",
  "measurementId": "G-JE2EFGVKPK"
};
*/

firebase.initializeApp(firebaseconfig);

var dbRef3 = firebase.database().ref();
dbRef3.on('value', function(snap){
var lectura = snap.val();

incremento = lectura.NDevice;
document.getElementById("CantBloques").value = incremento;
document.getElementById("API").setAttribute("placeholder", fire);
decremento = lectura.NDevice;

ESP01(); //ESP8266 - Witty ESP-12F
ESP02(); //ESP8266 - NodeMCU

$(document).ready(function(){
    for(var i=0; i<incremento; i++){
    	if(document.getElementsByClassName("DispClass"+i).length == 1){
    	}else{
	    var div = document.createElement('div');
			div.setAttribute('id', "Disp"+i);
			div.setAttribute("style", "position: relative; float: left; width: 300px; height: 100%; margin-bottom: 2.5%; margin-right: 2.5%; margin-left: 2.5%; background-color: transparent; border-radius: 8px; border-color: gray; border-style: solid;");
			div.setAttribute('class', "DispClass"+i);
			document.getElementById('AddDevice').appendChild(div);

			var nombre = document.createElement('input');
			nombre.setAttribute("id","inputNombre"+i);
			nombre.setAttribute("class","NombreDisp");
			nombre.setAttribute("placeholder","Nombre Dispositivo");
			div.appendChild(nombre);

			var GuarCam = document.createElement('button'); //Boton para guardar los cambios
			GuarCam.setAttribute("id", "GuarCam"+i);
			GuarCam.setAttribute("class", "GuarCam");
			GuarCam.setAttribute("onclick", "ModNombre("+i+")");
			GuarCam.innerHTML = "Modificar";
			div.appendChild(GuarCam);

			var divOnOff = document.createElement('div'); //Boton div OnOff
			divOnOff.setAttribute("id", "divOnOff"+i);
			divOnOff.setAttribute("class", "divOnOff");
			div.appendChild(divOnOff);

			var divOn = document.createElement('div'); //Boton div On
			divOn.setAttribute("id", "divOn"+i);
			divOn.setAttribute("class", "divOn");
			divOn.setAttribute("onclick", 'On('+i+')');
			divOn.innerHTML = "<p>On</p>";
			divOnOff.appendChild(divOn);

			var divOff = document.createElement('div'); //Boton div Off
			divOff.setAttribute("id", "divOff"+i);
			divOff.setAttribute("class", "divOff");
			divOff.setAttribute("onclick", 'Off('+i+')');
			divOff.innerHTML = "<p>Off</p>";
			divOnOff.appendChild(divOff);

			var exis = document.createElement('div');
			var imgDelete = document.createElement('img');
			exis.setAttribute('class',"addDel");
			exis.setAttribute('id',"addDel"+i);
			imgDelete.setAttribute('class',"ImgDel");
			imgDelete.setAttribute('id',"ImgDel"+i);
			imgDelete.setAttribute('src',"delete.png");
			imgDelete.setAttribute('onclick','DivAlerta('+i+')');
			exis.appendChild(imgDelete);
			div.appendChild(exis);

			var divChat = document.createElement('div');
			divChat.setAttribute("id", "divChat"+i);
			divChat.setAttribute("class", "divChat");

			var ChatBoton = document.createElement('select');
			ChatBoton.setAttribute("id", "ChatBoton"+i);
			ChatBoton.setAttribute("class", "ChatBoton");
			ChatBoton.setAttribute("onclick", "GPIO("+i+")");

			for(var j=0; j<Object.values(WESP[seleccion]).length; j++){
				  var Opciones = document.createElement('option');
					Opciones.setAttribute("id", "opcion");
					Opciones.setAttribute("class", "opcion"+j);
					Opciones.setAttribute("value", Object.values(WESP[seleccion])[j]);
					Opciones.innerHTML = "GPIO"+Object.values(WESP[seleccion])[j];
					ChatBoton.appendChild(Opciones);
			}

			div.appendChild(ChatBoton);
			EstadoDisp(i);
		}
	}
});
});

}

function EstadoDisp(n){
	var dbRef3 = firebase.database().ref();
	var lectura;
	dbRef3.on('value', function(snap){
		lectura = snap.val();
	});

	if(lectura['Disp'+n].Estado == 1){On(n);}
	else if(lectura['Disp'+n].Estado == 0){Off(n);}
	console.log("Estado Disp"+n+": "+lectura['Disp'+n].Estado); //Print estado dispositivo

	document.getElementById("inputNombre"+n).value = lectura['Disp'+n].Nombre;
	document.getElementById("ChatBoton"+n).value = lectura['Disp'+n].GPIO;
}

function AddDevice(){
	var Device = firebase.database().ref().update({NDevice: incremento + 1});
}

function DelDevice(n){
	var Device = firebase.database().ref().update({NDevice: decremento - 1});
	var DelDevicex = firebase.database().ref("Disp"+n).remove();
}

function lecturaf(){
	var selecto = document.getElementById("lista").value;
	var WESP = [];

	WESP[0] = { //ESP8266 - Witty ESP-12F
		  GPIO0: 0, GPIO1: 1, GPIO2: 2, GPIO3: 3, GPIO4: 4,
		  GPIO5: 5, GPIO12: 12, GPIO13: 13, GPIO14: 14,
		  GPIO15: 15, GPIO16: 16, GPIOA0: 'A0'
		}

	WESP[1] = { //ESP8266 - NodeMCU
		  GPIO1: 1, GPIO2: 2, GPIO3: 3, GPIO4: 4
		}

	var dbRef3 = firebase.database().ref();
	var lectura;
	dbRef3.on('value', function(snap){
		lectura = snap.val();
	});

	for(var i=0; i<lectura.NDevice; i++){
			var ChatBoton1 = document.getElementById("ChatBoton"+i);
			var disp = document.getElementById("Disp"+i);
			if(!!ChatBoton1){disp.removeChild(ChatBoton1);}
	}

	for(var i=0; i<lectura.NDevice; i++){
			var disp = document.getElementById("Disp"+i);
			var ChatBoton = document.createElement('select');
			ChatBoton.setAttribute("id", "ChatBoton"+i);
			ChatBoton.setAttribute("class", "ChatBoton");
					for(var j=0; j<Object.values(WESP[selecto]).length; j++){
						  var Opciones = document.createElement('option');
							Opciones.setAttribute("id", "opcion");
							Opciones.setAttribute("class", "opcion"+j);
							Opciones.setAttribute("value", Object.values(WESP[selecto])[j]);
							Opciones.innerHTML = "GPIO"+Object.values(WESP[selecto])[j];
							ChatBoton.appendChild(Opciones);
					}
			disp.appendChild(ChatBoton);
	}
}

function ESP01(){ //ESP8266 - Witty ESP-12F
	var ESP = firebase.database().ref("ESP01").update(WESP[0]);
}

function ESP02(){ //ESP8266 - NodeMCU
	var ESP = firebase.database().ref("ESP02").update(WESP[1]);
}

function proceso(){
seleccion = document.getElementById("lista").value;
console.log("Seleccion desde Proceso: "+seleccion);
firebaseconfig = "{"+document.getElementById("API").value+"}";
firebaseconfig = firebaseconfig.replaceAll("\n","");
firebaseconfig = JSON.parse(firebaseconfig);
localStorage.setItem("ConFirebase", "{"+document.getElementById("API").value+"}");

firebase.initializeApp(firebaseconfig);

var dbRef3 = firebase.database().ref();
dbRef3.on('value', function(snap){
var lectura = snap.val();

incremento = lectura.NDevice;
document.getElementById("CantBloques").value = incremento;
decremento = lectura.NDevice;

ESP01(); //ESP8266 - Witty ESP-12F
ESP02(); //ESP8266 - NodeMCU

$(document).ready(function(){
    for(var i=0; i<incremento; i++){
    	if(document.getElementsByClassName("DispClass"+i).length == 1){
    	}else{
	    var div = document.createElement('div');
			div.setAttribute('id', "Disp"+i);
			div.setAttribute("style", "position: relative; float: left; width: 300px; height: 100%; margin-bottom: 2.5%; margin-right: 2.5%; margin-left: 2.5%; background-color: transparent; border-radius: 8px; border-color: gray; border-style: solid;");
			div.setAttribute('class', "DispClass"+i);
			document.getElementById('AddDevice').appendChild(div);

			var nombre = document.createElement('input');
			nombre.setAttribute("id","inputNombre"+i);
			nombre.setAttribute("class","NombreDisp");
			nombre.setAttribute("placeholder","Nombre Dispositivo");
			div.appendChild(nombre);

			var GuarCam = document.createElement('button'); //Boton para guardar los cambios
			GuarCam.setAttribute("id", "GuarCam"+i);
			GuarCam.setAttribute("class", "GuarCam");
			GuarCam.setAttribute("onclick", "ModNombre("+i+")");
			GuarCam.innerHTML = "Modificar";
			div.appendChild(GuarCam);

			var divOnOff = document.createElement('div'); //Boton div OnOff
			divOnOff.setAttribute("id", "divOnOff"+i);
			divOnOff.setAttribute("class", "divOnOff");
			div.appendChild(divOnOff);

			var divOn = document.createElement('div'); //Boton div On
			divOn.setAttribute("id", "divOn"+i);
			divOn.setAttribute("class", "divOn");
			divOn.setAttribute("onclick", 'On('+i+')');
			divOn.innerHTML = "<p>On</p>";
			divOnOff.appendChild(divOn);

			var divOff = document.createElement('div'); //Boton div Off
			divOff.setAttribute("id", "divOff"+i);
			divOff.setAttribute("class", "divOff");
			divOff.setAttribute("onclick", 'Off('+i+')');
			divOff.innerHTML = "<p>Off</p>";
			divOnOff.appendChild(divOff);

			var exis = document.createElement('div');
			var imgDelete = document.createElement('img');
			exis.setAttribute('class',"addDel");
			exis.setAttribute('id',"addDel"+i);
			imgDelete.setAttribute('class',"ImgDel");
			imgDelete.setAttribute('id',"ImgDel"+i);
			imgDelete.setAttribute('src',"delete.png");
			imgDelete.setAttribute('onclick','DivAlerta('+i+')');
			exis.appendChild(imgDelete);
			div.appendChild(exis);

			var divChat = document.createElement('div');
			divChat.setAttribute("id", "divChat"+i);
			divChat.setAttribute("class", "divChat");

			var ChatBoton = document.createElement('select');
			ChatBoton.setAttribute("id", "ChatBoton"+i);
			ChatBoton.setAttribute("class", "ChatBoton");
			ChatBoton.setAttribute("onclick", "GPIO("+i+")");

			for(var j=0; j<Object.values(WESP[seleccion]).length; j++){
				  var Opciones = document.createElement('option');
					Opciones.setAttribute("id", "opcion");
					Opciones.setAttribute("class", "opcion"+j);
					Opciones.setAttribute("value", Object.values(WESP[seleccion])[j]);
					Opciones.innerHTML = "GPIO"+Object.values(WESP[seleccion])[j];
					ChatBoton.appendChild(Opciones);
			}

			div.appendChild(ChatBoton);
			var carga = firebase.database().ref("Disp"+i).update({
				Nombre: document.getElementById("inputNombre"+i).value, 
				Estado: 0,
				GPIO: 0});
			
			EstadoDisp(i);
		}
	}
});
});

}