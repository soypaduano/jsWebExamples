class Cotizador{


    async obtenerMonedasApi (){
        //Fetch a la api
        const urlObtenerMonedas = await fetch('https://api.coinmarketcap.com/v1/ticker/');
        const monedas = await urlObtenerMonedas.json();
        return monedas;
    }

    async obtenerValores(moneda, criptomoneda){
        //Convierte los selects
        const urlConvertir = await fetch(`https://api.coinmarketcap.com/v1/ticker/${criptomoneda}/?convert=${moneda}`);
        const resultado = await urlConvertir.json();
        return {
            resultado
        }
    }
}