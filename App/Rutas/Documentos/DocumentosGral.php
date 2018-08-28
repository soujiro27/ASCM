<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Documentos\DocumentosGralController;

	$controller = new DocumentosGralController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('DOCUMENTOSGRAL');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

/*--------------------- Home  ----------------------------*/

	$app->get('/DocumentosGral',function() use ($controller){
		$controller->home_template();
	});


	$app->get('/DocumentosGral/All',function() use ($controller){
		$controller->tabla();
	});




	$app->get('/DocumentosGral/add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/DocumentosGral/:id',function($id) use ($controller){
		$controller->update_template($id);
	});

	$app->get('/DocumentosGral/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/DocumentosGral/save',function() use ($controller,$app){
		$controller->guardar($app->request->post(),$_FILES);
	});

	$app->post('/DocumentosGral/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>
