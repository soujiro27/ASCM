<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Catalogos\SubDocumentosController;

	$controller = new SubDocumentosController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('SUBTIPODOCUMENTOS');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	$app->get('/SubTiposDocumentos',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/SubTiposDocumentos/All',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/SubTiposDocumentos/Add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/SubTiposDocumentos/Update',function() use ($controller){
		$controller->update_template();
	});

	$app->get('/SubTiposDocumentos/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/SubTiposDocumentos/Add',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

	$app->post('/SubTiposDocumentos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>
