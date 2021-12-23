# Pasos para instalar el proyecto

### clonarlo
E ir al directorio raíz

`cd login-dashboard-demo`

### instalar dependencias

`composer install`

`npm install`

### generar APP_KEY

`php artisan key:generate`

### crear archivo sqlite
`touch database/database.sqlite`

### Elegir sqlite como base de datos

Ir al archivo `.env`  y poner en la sección de bases de datos
 `DB_CONNECTION=sqlite`

### Migrar

`php artisan migrate`

### LLenar la BBDD con los usuarios para prueba

`php artisan db:seed --class=UserSeeder`

### Modificar `.env` con la url de la api
Agregar al final lo siguiente

`MIX_REACT_APP_API_BASE_URL=http://localhost:8000/api`

Que es la url por defecto de laravel

## Levantar el servidor y el front

`php artisan serve`

Abrir otra terminal en el mismo directorio y hacer

`npm run watch`

## Listo
 Abrir el navegador en localhost:8000 e introducir las credenciales

## Notas
Por simplicidad se utiliza sqlite3 para la base de datos.
Si no se lo tiene instalado ver: [sqlite3](https://www.sqlite.org/download.html)

En caso de querer utilizar mysql, por ejemplo, es necesario proveer las credenciales necesarias en el archivo `.env`. Recordar crear la tabla necesaria

## ¿Cómo funciona?

El sistema utiliza Laravel Sanctum para la autenticación del usuario.
Existen rutas protegidas a las que se le aplica un _middleware_ para que solo puedan ser accedidas por usuarios que provean un _token_ que es creado cuando el usuario se logea con credenciales válidas, en este caso nombre de usuario y password.

Existe también un _endpoint_ para crear usuarios.


Por el lado del frontend, hay un renderizado condicional dependiendo de si el usuario esta logeado o no, se mostrarán diferentes componentes.
Al llegar al sitio, se presenta un formulario para que el usuario ingrese sus credenciales. El formulario realiza un _fetch_ a la url de la api y en caso de ser credenciales válidas podrá acceder al dashboard y modificar sus datos como así también hacer un logout. En caso de hacer un logout, se envía un en _fetch_ su _token_ y su id. Laravel elimina su token y el usuario ya no puede acceder al dashboard sin realizar de nuevo un login.

## Mejoras posibles - errores

- Podría mejorarse la experiencia de usuario mediante avisos al completar los formularios
- Al recargar la página estando logueado y en el dashboard, redirige al login.
- Los errores devueltos por la api son inconsistentes. Deberia diseñarse un poco mejor esto.
