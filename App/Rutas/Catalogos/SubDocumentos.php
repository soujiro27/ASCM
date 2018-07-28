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
		$controller->Home();
	});

	$app->get('/SubTiposDocumentos/all',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/SubTiposDocumentos/add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/SubTiposDocumentos/:id',function($id) use ($controller){
		$controller->update_template($id);
	});

	$app->get('/SubTiposDocumentos/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/SubTiposDocumentos/save',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

	$app->post('/SubTiposDocumentos/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>