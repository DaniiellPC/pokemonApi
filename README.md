# pokemonApi
**Aplicacion NodeJS que recibe peticiones para consultar la API de pokemon V1**

1. Para ejecutar localmente la aplicacion, clone este repositorio con el comando:  
git clone https://github.com/DaniiellPC/pokemonApi.git
2. Luego, acceda a la carpeta del proyecto y ejecute el comando:  
npm install
3. Por último, ejecute el servidor con el comando:  
npm run start

Peticiones Disponibles:

### POST:
/pokemonList  
ejemplo de body:  
{  
    "limite": 11,  
    "offset": 1  
}  
Donde Limite es la cantidad máxima de pokemon a traer la informacion  
y offset es el valor inicial desde donde debe empezar a traer la data

### POST:
/pokemonById  
ejemplo de body:  
{  
    "id": 1  
}  
Donde el id es el identificador del pokemon a traer sus datos

### POST:
/evolutionById  
ejemplo de body:  
{  
    "id": 1  
}  
Donde el id es el identificador de la evolucion del pokemon  
adicionalmente trae informacion extra del pokemon  

Estas peticiones puede probarse importando la coleccion  
de JSON para postman que se encuentra en la raiz del proyecto

## Nota:
La API fuente original no provee una descripción del pokemon, por ende,  
acá no podrá obtenerse tampoco.