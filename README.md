## Descripción

Se ha hecho un ejercicio de NestJs donde se ha creado un pequeño backend con la lógica para un servicio de mensajes basado en el esquema de emails. Esto es, un usuario puede enviar un mensaje a otro (siempre que este activo) y los mensajes no tienen relación entre ellos, es decir, no hay una conversación única. Para entender mejor la lógica, se puede consultar el archivo requisitos.txt, donde se define mejor los requisitos y la lógica que sigue la aplicación

## Instalación
Se ha usado Docker para facilitar la instalación y prueba de la aplicación. Para ello se crean 3 contenedores. Uno es contenedor ejecutando una base de datos PostgresSQL. El segundo es para poder acceder a mediante una aplicación web a la gestión de la base de datos. Este anterior es opcional. Y ya el último contenedor es la aplicación en NestJs que ejecuta la lógica.

Para ejecutar la base de datos
```bash
$ docker-compose up postgres
```

Para ejecutar la aplicación web para gestionar la BBDD (esto es opcional)
```bash
$ docker-compose up pgadmin
```
Finalmente para ejecutar el contenedor de la aplicación
```bash
$ docker-compose up nestjs
```

Si se quiere se puede ejecutar todo junto usando
```bash
$ docker-compose up
```

Si se quiere ejecutar sin usar Docker, se debe cambiar los datos en .env para indicar donde este ubicada la base de datos.
## Rutas Postman

Dentro del directorio hay un archivo llamado EjercicioNestJS.postman_collection.json que se puede importar a Postman y que tiene todas las rutas para poder probar las diferentes rutas (también existe un archivo llamado rutas.txt donde están estas).

Para poder usarlo, se debe crear un enviroment y crear una variable llamada jwt_token, así es más sencillo poder probar las rutas ya que cuando se hace inicio de sesión, se guarda el token de autentificación. 

Existen diferentes carpetas:
Auth: 
 - Register default users: Aquí están dos peticiones para poder registrar los dos usuarios que luego se usan para probar el resto de la aplicación
 - Register a user: permite registrar a un usuario cualquiera
 - Login with *: Esto es para logearse con un usuario. Existen diferentes pruebas dependiendo del usuario logeado, por lo que con estas dos peticiones, se puede logear con cualquiera de las dos

Testing:
 - Send a message to itself: se debe usar el usuario user6@user.com. Prueba a enviarse a si mismo un mensaje
 - Register a user that already exists: se puede hacer tanto con user6@user.com o user7@user.com. Prueba a registrar a un usuario que ya existe en la BBDD

User:
 - Get user details: se puede hacer tanto con user6@user.com o user7@user.com. Devuelve los datos del usuario
 - Get all users active: se puede hacer tanto con user6@user.com o user7@user.com. Devuelve los usuarios que esten activos
 - Update user: se puede hacer tanto con user6@user.com o user7@user.com. Actualiza los datos del usuario
 - Toggle active User: se puede hacer tanto con user6@user.com o user7@user.com. Activa o desactiva al usuario
 - Get notifications: se puede hacer tanto con user6@user.com o user7@user.com. Consulta todas las notificaciones
 - Get new notifications: se puede hacer tanto con user6@user.com o user7@user.com. Consulta todas las notificaciones nuevas (que no se hayan leído)

Message:
 - Send Message: se debe usar el usuario user6@user.com. Envía un mensaje al usuario user7@user.com
 - Get messages sended: se debe usar el usuario user6@user.com. Devuelve los mensajes enviados
 - Get messages recieved: se debe usar el usuario user7@user.com. Devuelve los mensajes recibidos.

Un detalle es que para probar las notificaciones, se debe enviar uno o varios mensajes para poder crear las notificaciones. 

## Posibles mejoras
Finalmente, se ha incluido un documento llamado mejoras.txt con ideas de posibles mejoras para la aplicación.

## Datos de contacto
Para cualquier duda o consulta:

- Autor - Arturo Zambrano
- Correo - azambranoperales@gmail.com

