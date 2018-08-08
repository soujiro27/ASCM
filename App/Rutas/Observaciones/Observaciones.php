<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Observaciones\ObservacionesController;

	$controller = new ObservacionesController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('CAT-ACCIONES');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,function() use($app,$controller){


	$app->post('/Observaciones/save',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

/*	$app->post('/Acciones/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});*/

});





?>
