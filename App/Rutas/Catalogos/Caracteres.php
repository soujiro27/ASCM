<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Catalogos\CaracteresController;

	$controller = new CaracteresController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('CAT-CARACTERES');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	$app->get('/Caracteres',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/Caracteres/All',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Caracteres/Add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/Caracteres/Update',function() use ($controller){
		$controller->update_template();
	});

	$app->get('/Caracteres/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/Caracteres/Add',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

	$app->post('/Caracteres/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>
