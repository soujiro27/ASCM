<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Catalogos\TextosController;

	$controller = new TextosController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('CAT-DOCTOSTEXTOS');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	$app->get('/DoctosTextos',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/Textos/All',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Textos/Add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/Textos/Update',function() use ($controller){
		$controller->update_template();
	});

	$app->get('/Textos/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/Textos/Add',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

	$app->post('/Textos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>
