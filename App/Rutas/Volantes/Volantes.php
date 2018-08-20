<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Volantes\VolantesController;

	$controller = new VolantesController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('VOLANTES');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	$app->get('/Volantes',function() use ($controller){
		$controller->Home();
	});

	$app->get('/Volantes/all',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Volantes/add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/Volantes/:id',function($id) use ($controller){
		$controller->update_template($id);
	});

	$app->get('/Volantes/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->get('/Volantes/Export',function() use ($controller){
		$controller->export();
	});


	$app->post('/Volantes/save',function() use ($controller,$app){
		$controller->guardar($app->request->post(),$_FILES);
	});

	$app->post('/Volantes/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>
