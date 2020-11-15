# Sistema de búsquedas centralizadas

Esta API realiza búsquedas en 3 diferentes servicios y los muestra en una única ruta de manera estandarizada.

* Apple https://itunes.apple.com/search?term=termino+de+busqueda&limit=25&media=all  
retorna JSON

* Tv Maze http://api.tvmaze.com/search/shows?q=terminoDeBusqueda  
retorna JSON

* Crcind http://www.crcind.com/csp/samples/SOAP.Demo.cls?soap_method=GetListByName&name=terminoDeBusqueda  
retorna XML

# Instalación en Linux

Por favor ejecute los siguientes comandos:  

1. git clone https://github.com/serter95/centralServicesBackend.git

2. cd centralServicesBackend

3. cp .env.example .env

3. yarn

4. adonis key:generate

5. adonis serve --dev

# Documentación

Para probar la ruta del backend ingrese a la documentación en la siguiente URL: http://localhost:3333/docs