<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Internos\IracController;

	$controller = new IracController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('IRAC-INTERNO');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

/*------------------- HOME -----------------*/

	$app->get('/Irac-Internos',function() use ($controller){
		$controller->home_template();
	});

/*-------------------- Tabla -------------------*/

	$app->get('/Irac-Internos/All',function() use ($controller){
		$controller->tabla();
	});




	$app->get('/Irac-Internos/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id);
	});

	$app->get('/Irac-Internos/Cedula/Register/:id',function($id) use ($controller,$app){
		$controller->get_register_cedula($id);
	});


	$app->post('/Irac-Internos/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});


	$app->post('/Irac-Internos/Cedula/Update',function() use ($controller,$app){
		$controller->update_cedula($app->request->post());
	});


});





?>
