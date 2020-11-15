# centralServicesBackend

## English

This API searches 3 different services and displays them in a single path in a standardized way.

* Apple https://itunes.apple.com/search?term=search+term&limit=25&media=all  
return JSON

* Tv Maze http://api.tvmaze.com/search/shows?q=searchTerm  
return JSON

* Crcind http://www.crcind.com/csp/samples/SOAP.Demo.cls?soap_method=GetListByName&name=searchTerm  
return XML

### Installation

Please execute the following commands on your terminal:  

1. git clone https://github.com/serter95/centralServicesBackend.git

2. cd centralServicesBackend

3. cp .env.example .env (Windows: copy .env.example .env)

3. yarn install

4. yarn start

### Documentation

To test the backend path enter the documentation in the following URL: http://localhost:3333/docs

## Español

Esta API realiza búsquedas en 3 diferentes servicios y los muestra en una única ruta de manera estandarizada.

* Apple https://itunes.apple.com/search?term=termino+de+busqueda&limit=25&media=all  
retorna JSON

* Tv Maze http://api.tvmaze.com/search/shows?q=terminoDeBusqueda  
retorna JSON

* Crcind http://www.crcind.com/csp/samples/SOAP.Demo.cls?soap_method=GetListByName&name=terminoDeBusqueda  
retorna XML

### Instalación

Por favor ejecute los siguientes comandos en la terminal:  

1. git clone https://github.com/serter95/centralServicesBackend.git

2. cd centralServicesBackend

3. cp .env.example .env (para Windows: copy .env.example .env)

3. yarn install

4. yarn start

### Documentación

Para probar la ruta del backend ingrese a la documentación en la siguiente URL: http://localhost:3333/docs