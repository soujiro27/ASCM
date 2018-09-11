<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Cedulas\IfaController;

	$controller = new IfaController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('IFA');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};


$app->group('/juridico',$auth,function() use($app,$controller){

	$app->get('/Ifa-Internos',function() use ($controller){
		$controller->home_internos();
	});

	$app->get('/Ifa-Internos/All',function() use ($controller){
		$controller->tabla_internos();
	});

	$app->get('/Ifa-Internos/Cedula/:id',function($id) use ($controller){
		$controller->cedula_template($id);
	});
});

?>
