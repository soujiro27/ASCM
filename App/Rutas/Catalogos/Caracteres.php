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
		$controller->Home();
	});

	$app->get('/Caracteres/all',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Caracteres/add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/Caracteres/:id',function($id) use ($controller){
		$controller->update_template($id);
	});

	$app->get('/Caracteres/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/Caracteres/save',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

	$app->post('/Caracteres/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>