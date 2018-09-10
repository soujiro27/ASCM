<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Cedulas\IracController;

	$controller = new IracController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('IRAC-INTERNO');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};

$app->group('/juridico',$auth,$rol,function() use($app,$controller){

/*------------------- HOME -----------------*/

	$app->get('/Irac-Internos',function() use ($controller){
		$controller->home_template_internos();
	});

	$app->get('/Irac-Internos/Cedula/:id',function($id) use ($controller){
		$controller->cedula_template($id);
	});

/*-------------------- Tabla -------------------*/
	$app->get('/Irac-Internos/All',function() use ($controller){
		$controller->tabla_internos();
	});

});


?>
