<?php
include '/../App/vendor/autoload.php';

$root_directory = '/../App/rutas/';

/*-----------------Datos Catalogos -------------------*/

include_once $root_directory.'/Catalogos/Acciones.php';
include_once $root_directory.'/Catalogos/Textos.php';
include_once $root_directory.'/Catalogos/SubDocumentos.php';
include_once $root_directory.'/Catalogos/Caracteres.php';


/*------------------- API ------------------------*/
include_once $root_directory.'/Api/Api.php';


/*------------------ Volantes ---------------------*/
include_once $root_directory.'/Volantes/Volantes.php';
include_once $root_directory.'/Volantes/VolantesDiversos.php';


/*----------------- Documentos Digitalizados ----------*/
include_once $root_directory.'/Documentos/DocumentosGral.php';
include_once $root_directory.'/Documentos/DocumentosDirectores.php';


/*------------------- Cedulas -------------------------*/
include_once $root_directory.'/Cedulas/Ifa.php';
include_once $root_directory.'/Cedulas/Irac.php';
include_once $root_directory.'/Cedulas/Confronta.php';
include_once $root_directory.'/Cedulas/OficiosGenericos.php';


/*--------------------- Asignacion -------------------------*/
include_once $root_directory.'/Asignacion/Asignacion.php';


/*--------------------- Respuestas -------------------------*/
include_once $root_directory.'/Respuestas/Respuestas.php';


/*------------------- observaciones -------------------------*/
include_once $root_directory.'/Observaciones/Observaciones.php';


/*------------------- Cedulas internos -------------------------*/
include_once $root_directory.'/Cedulas/irac_internos.php';


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
   $app->render('/jur/public/404.html');
});

$app->error(function (\Exception $e) use ($app) {

    $message = $e->getMessage();
    //$error = $e->errorInfo();
    $abrir = fopen('./jur/App/error.log','a+');
    fwrite($abrir,"[".date("r")."] Error: $message\r\n");
    fwrite($abrir,"[".date("r")."] Error: $e\r\n");
    fclose($abrir);


});
