function Cliente(nombre, saldo){
    this.nombre = nombre;
    this.saldo = saldo;
}

//Prototipo que imprime saldo y no,bre
Cliente.prototype.printClienteSaldo = function(){
    return this.saldo;
}

const cliente = new Cliente('Pedro', 100);
console.log(cliente.printClienteSaldo());

//Heredar un prototipo:
function Empresa(nombre, saldo, telefono, tipo){
    Cliente.call(this, nombre, saldo);
    this.telefono = telefono;
    this.tipo = tipo;
}


const empresa = new Empresa("Udemy", 10000, "33838383", "educacion");

empresa.prototype = Object.create(Cliente.prototype);

//La funcion de object create

const mary = Object.create(Cliente);
mary.nombre = "Mary";
mary.saldo = "20";
console.log(mary);


//Creacion de clases con ECMASCRIPT 6


class Persona {
    constructor(nombre, apellido, saldo){
        this.nombre = nombre;
        this.apellido = apellido;
        this.saldo = saldo;
    }

    imprimirSaldo(){
        return this.saldo;
    }

    static bienvenida(){
        return "Bienvenido al cajero";
    }

}

const maria = new Persona('Maria', 'Perez', 1000);
console.log(maria);
console.log(maria.imprimirSaldo());


class Empresario extends Persona{
    constructor(nombre, apellido, saldo, tipo, pais){
        super(nombre, apellido, saldo);
        //no existen en constructor padre
        this.tipo = tipo;
        this.pais = pais;
    }
}

const empresario = new Empresario("juan", "lopez0", 10000, "educacion", "Venezuela");
console.log(empresario);