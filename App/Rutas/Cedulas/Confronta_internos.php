<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Cedulas\ConfrontaController;

	$controller = new ConfrontaController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('NOTA');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};


$app->group('/juridico',$auth,function() use($app,$controller){

	$app->get('/Confrontas-Internos',function() use ($controller){
		$controller->home_template_internos();
	});


	$app->get('/Confrontas-Internos/All',function() use ($controller){
		$controller->tabla_internos();
	});

	$app->get('/Confrontas-Internos/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id);
	});

});


?>
