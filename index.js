// Se utilizo Readline-sync en el proyecto para tener una conversación interactiva
//en el momento de preguntarle información personal como el peso y la altura al usuario

// también se utilizo i18next la cual es una dependencia regular en el proyecto para poder
// que el usuario pueda escoger su idioma preferido (español - inglés),
// por otro lado esta dependencia también ayuda a la persona a escoger
//el tipo de unidades que prefiere, ya sea, kg o lb y M o Cm

const interface = require('readline-sync');

let idioma = interface.question('¿Prefieres español o inglés? (es/en): ');
let unidadesPeso, unidadesAltura;

// Opciones para la seleccion de idiomas
if (idioma !== 'es' && idioma !== 'en') {
	idioma = 'en';
	// usar por defecto el inglés si no se proporciona una opción válida
}

let preguntas = {
	es: {
		peso: '¿Prefieres kg o lb para el peso? (kg/lb): ',
		altura: '¿Prefieres cm o m para la altura? (cm/m): ',
	},
	en: {
		peso: 'Do you prefer kg or lb for weight? (kg/lb): ',
		altura: 'Do you prefer cm or m for height? (cm/m): ',
	},
};

unidadesPeso = interface.question(preguntas[idioma].peso);
unidadesAltura = interface.question(preguntas[idioma].altura);

// Unidades seleccionadas por el usuario para el peso y la altura
if (unidadesPeso !== 'kg' && unidadesPeso !== 'lb') {
	unidadesPeso = 'kg';
	// usar kg por defecto si no se proporciona una opción válida
}
if (unidadesAltura !== 'cm' && unidadesAltura !== 'm') {
	unidadesAltura = 'm';
	// usar m por defecto si no se proporciona una opción válida
}

let pesoM, alturaM;

if (idioma === 'es') {
	pesoM = 'Ingresa tu peso en kg:';
	alturaM = 'Ingresa tu altura en metros:';
} else {
	pesoM = 'Enter your weight in kg:';
	alturaM = 'Enter your height in meters:';
}

let peso = parseFloat(interface.question(pesoM));
console.log('Peso:', peso);

let altura = parseFloat(interface.question(alturaM));
console.log('Altura:', altura);

// Calcular el IMC
function calculaIMC(peso, altura) {
	const imc = (unidadesPeso === 'kg' ? peso : peso / 2.205) / (unidadesAltura === 'cm' ? altura / 100 : altura) ** 2;
	return imc.toFixed(2);
}

// Determinar el estado del IMC
function determinaEstadoIMC(imc) {
	if (imc < 18.5) {
		return idioma === 'es' ? 'Bajo Peso' : 'Underweight';
	} else if (imc >= 18.5 && imc < 25) {
		return idioma === 'es' ? 'Peso Normal' : 'Normal Weight';
	} else if (imc >= 25 && imc < 30) {
		return idioma === 'es' ? 'Sobrepeso' : 'Overweight';
	} else {
		return idioma === 'es' ? 'Obesidad' : 'Obesity';
	}
}

const imc = calculaIMC(peso, altura);
const estadoIMC = determinaEstadoIMC(imc);

// Imprimir el resultado en el idioma seleccionado
console.log(`Su IMC es ${imc} y su estado es: ${estadoIMC}`);
