<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Catalogos\AccionesController;

	$controller = new AccionesController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('CAT-ACCIONES');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};


$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	/*------------Home-------------------*/

	$app->get('/Acciones',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/Acciones/All',function() use ($controller){
		$controller->tabla();
	});

	/*----------------- Insert --------------------*/

	$app->get('/Acciones/Add',function() use ($controller){
		$controller->nuevo_registro();
	});

	$app->post('/Acciones/Add',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

	/*------------- UPdate ------------------*/

	$app->get('/Acciones/Update',function() use ($controller){
		$controller->update_template();
	});

	$app->get('/Acciones/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/Acciones/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});


?>
