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

	$app->get('/Acciones',function() use ($controller){
		$controller->Home();
	});

	$app->get('/Acciones/all',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Acciones/add',function() use ($controller){
		$controller->nuevo_registro();
	});


	$app->get('/Acciones/:id',function($id) use ($controller){
		$controller->update_template($id);
	});

	$app->get('/Acciones/Register/:id',function($id) use ($controller){
		$controller->registro($id);
	});

	$app->post('/Acciones/save',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

	$app->post('/Acciones/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});

});





?>