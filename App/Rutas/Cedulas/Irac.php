<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Cedulas\IracController;

	$controller = new IracController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('IRAC');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};

$app->group('/juridico',$auth,function() use($app,$controller){

/*------------------ Templates ---------------------------*/

	$app->get('/Irac',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/Irac/Cedula/:id',function($id) use ($controller){
		$controller->cedula_template($id);
	});

/*------------------- Tablas ---------------------------*/
	$app->get('/Irac/All',function() use ($controller){
		$controller->tabla();
	});

	/*----------------- Insert -------------------*/

	$app->post('/Irac/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});


	$app->get('/Irac/Remitente',function() use ($controller,$app){
		$controller->get_remitente($app->request->get());
	});

	/*--------------------- UPdate -----------------------*/

	$app->get('/Irac/Cedula/Register/:id',function($id) use ($controller,$app){
		$controller->get_register_cedula($id);
	});

	$app->post('/Irac/Cedula/Update',function() use ($controller,$app){
		$controller->update_cedula($app->request->post());
	});


});





?>
