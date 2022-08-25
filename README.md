# Hideki Task Simon Hurtado

![N|Solid](assets/logos/hideki-logo-principal.png)

Proyecto final para curso de javascript realizado en CoderHouse. Con uso de Javascript, SASS, CSS3, Bootstrap, HTML5.

## Descripción

Task Manager multiusuario desarrollado con javascript, con hosting de Firebase y responsive web design.

El mismo cuenta con una pagina principal con login de usuario que da acceso a la aplicacion web. Dentro de esta se pueden visualizar tareas, agregar tareas, eliminarlas, y modificar sus valores e inclusive los colaboradores correspondientes. Siendo que cada modificacion de estas se ve reflejado directamente en la base de datos y actualizando a los usuarios.

## Visuales

Para este desarrollo se tuvo en cuenta las diferentes resoluciones que puede prensentar: mobile, tablet y desktop

![N|Solid](https://i.ibb.co/kQDPpF9/Dise-o-sin-t-tulo-preview-rev-1.png)

Ademas se consideró el redimensionado de las tareas en sus diferentes resoluciones para mejorar la experiencia de usuario.

## Instalación

Instalación del nodejs y el npm para poder editar los archivos .scss

> Iniciar el npm

```sh
npm init
```

> Instalar el nodemon

```sh
npm install -D node-sass nodemon.
```

Crear carpeta `SCSS` y `CSS` y sus archivos respectivos.

> Editar el package.json e insertar las lineas:

```sh
"build-css": "node-sass --include-path scss scss/style.scss css/style.css",
"watch-css": "nodemon -e scss -x \"npm     run build-css\"",
```

> Compilar con npm

```sh
npm run watch-css
```

## Hoja de ruta

Resumen de los commits realizados en el repositorio:

`Prototipo final con Fetch, Async y Await `
>Committed on 14 Jul 2022

`Prototipo funcional con simulacion de base de datos con API JSONStorage`
>Committed on 23 Ago 2022

`Agregado de librerias`
>Committed on 17 Ago 2022

`Reestructuracion del proyecto y uso de operadores avanzados`
>Committed on 15 Ago 2022

`Prototipo funcional login`
>Committed on 9 Ago 2022

`Prototipo funcional ABM - DOM y eventos`
>Committed on 5 Ago 2022

`Diseño, manipulacion de DOM y enventos`
>Committed on 4 Ago 2022

`Subida de archivos y primera pre entrega del proyecto final`
>Committed on 1 Ago 2022

## Autores y agradecimientos

Autor: Carlos Diego Simon Hurtado

Agradecimientos: 
A mi tutora Solange Mac Intyre por responder siempre mis dudas con mucha paciencia y claridad a lo largo del curso y a mi profesora Florencia Hendel por todo el conocimiento aportado a lo largo de estas clases, lo cual hizo posible el desarrollo de este proyecto.

## Estado del proyecto

En Proceso

Entrega de incorporar Fetch