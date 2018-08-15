<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Cedulas\IfaController;

	$controller = new IfaController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('IFA');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	$app->get('/Ifa',function() use ($controller){
		$controller->Home();
	});


	$app->get('/Ifa/all',function() use ($controller){
		$controller->tabla();
	});


	$app->get('/Ifa/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Cedula');
	});

	$app->get('/Ifa/Cedula/Register/:id',function($id) use ($controller,$app){
		$controller->get_register_cedula($id);
	});


	$app->post('/Ifa/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});


	$app->post('/Ifa/Cedula/Update',function() use ($controller,$app){
		$controller->update_cedula($app->request->post());
	});


});





?>
