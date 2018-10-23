class EventBrite{
    constructor(){
        this.token_auth = '53HFISX4Z55XWLG6T6TP';
        this.ordenar = 'date'; 
    }

    async obtenerCategorias(){
        //consultar a la rest api
        const respuestaCategoria = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.token_auth}`);
        const categorias = await respuestaCategoria.json();
        return {
            categorias
        }
    }

    async obtenerEventos(evento, categoria){
        const respuestaEvento = await fetch(`https://www.eventbriteapi.com/v3/events/search/?q=${evento}&sort_by=${this.ordenar}&categories=${categoria}&token=${this.token_auth}`);
        const eventos = await respuestaEvento.json();
        return {
           eventos
        }
    }
}
    

