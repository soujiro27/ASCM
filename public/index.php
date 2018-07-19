<?php 
include '/../App/vendor/autoload.php';

$root_directory = '/../App/rutas/';

/*-----------------Datos Catalogos -------------------*/

include_once $root_directory.'/Catalogos/Acciones.php';
include_once $root_directory.'/Catalogos/Textos.php';


/*------------------- API ------------------------*/
include_once $root_directory.'/Api/Api.php';


/*----------------Datos DB ------------------*/
include_once '/../../src/conexion.php';

use Illuminate\Database\Capsule\Manager as Capsule;
$capsule = new Capsule;
$capsule->addConnection([
    'driver'    => 'sqlsrv',
    'host'      => $hostname,
    'database'  => $database,
    'username'  => $username,
    'password'  => $password,
    'charset'   => 'utf8',
    'collation' => 'utf8_unicode_ci',
    'prefix'    => '',
]);
$capsule->setAsGlobal();
$capsule->bootEloquent();



/*------------------- 404 ---------------------*/

$app->notFound(function () use ($app) {
   $app->render('/react/public/404.html');
});

$app->error(function (\Exception $e) use ($app) {
   
    $message = $e->getMessage();
    $abrir = fopen('./jur/App/error.log','a+');
    fwrite($abrir,"[".date("r")."] Error: $message\r\n");
    fclose($abrir);
    
   
});