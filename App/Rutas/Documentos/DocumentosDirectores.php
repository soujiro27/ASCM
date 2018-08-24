<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Documentos\DocumentosDirectoresController;

	$controller = new DocumentosDirectoresController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('DOCUMENTOSJUR');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,function() use($app,$controller){

	$app->get('/Documentos',function() use ($controller){
		$controller->Home();
	});

	$app->get('/Documentos/all',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Documentos/add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/Documentos/:id',function($id) use ($controller){
		$controller->update_template($id);
	});

	$app->get('/Documentos/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/Documentos/save',function() use ($controller,$app){
		$controller->guardar($app->request->post(),$_FILES);
	});

	$app->post('/Documentos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>
