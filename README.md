# Hideki Task Simon Hurtado

![N|Solid](assets/logos/hideki-logo-principal.png)

Proyecto final para el curso de javascript realizado en CoderHouse. Con uso de Javascript, chart.js, SASS, CSS3, Bootstrap y HTML5.

## Descripción

Hideki Task Manager es un administrador de tareas multiusuario desarrollado con javascript, con hosting de Firebase y responsive web design.

El mismo cuenta con una pagina principal con login de usuario que da acceso a la aplicacion web. Dentro de esta se pueden visualizar tareas, agregar tareas, eliminarlas, y modificar sus valores e inclusive agregar/eliminar usuarios colaboradores. Siendo que cada modificacion se ve reflejada directamente en el JSON storage, haciendo que cada vez que se ingrese a la plataforma se traigan mediante la API los datos actualizados.

## Visuales

Para este desarrollo se tuvo en cuenta las diferentes resoluciones que puede prensentar: mobile, tablet y desktop.

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

`Optimización de proyecto y documentación`
>Committed on 5 Sep 2022

`Prototipo final de estilos `
>Committed on 4 Sep 2022

`Prototipo final con Fetch, Async y Await `
>Committed on 24 Ago 2022

`Prototipo funcional con simulación de base de datos con API JSONStorage`
>Committed on 23 Ago 2022

`Agregado de librerias`
>Committed on 17 Ago 2022

`Reestructuración del proyecto y uso de operadores avanzados`
>Committed on 15 Ago 2022

`Prototipo funcional login`
>Committed on 9 Ago 2022

`Prototipo funcional ABM - DOM y eventos`
>Committed on 5 Ago 2022

`Diseño, manipulación de DOM y enventos`
>Committed on 4 Ago 2022

`Subida de archivos y primera pre entrega del proyecto final`
>Committed on 1 Ago 2022

## Autores y agradecimientos

Autor: Carlos Diego Simon Hurtado

Agradecimientos: 
A mi tutora Solange Mac Intyre por acompañarme en este proceso de aprendizaje respondiendo siempre mis consultas y orientandome con el proyecto. También a mi profesora Florencia Hendel por todo el conocimiento aportado a lo largo del curso, lo cual hizo posible este desarrollo. Por ultimo agradecer a la fundacion empujar por la oportunidad de esta capacitación y a mi coordinador Mariano.

## Estado del proyecto

Finalizado

Entrega del Proyecto Final