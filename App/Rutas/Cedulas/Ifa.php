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

$app->group('/juridico',$auth,function() use($app,$controller){

	/*----------------------- HOME ------------------*/
	
	$app->get('/Ifa',function() use ($controller){
		$controller->home_template();
	});


	$app->get('/Ifa/All',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Ifa/Cedula/:id',function($id) use ($controller){
		$controller->cedula_template($id);
	});


	/*---------------------- INSERT ------------------*/

	$app->post('/Ifa/Save',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});

	/*--------------------- UPDATE ---------------------*/


	$app->get('/Ifa/Cedula/Register/:id',function($id) use ($controller,$app){
		$controller->get_register_cedula($id);
	});

	$app->post('/Ifa/Update',function() use ($controller,$app){
		$controller->update_cedula($app->request->post());
	});

});

?>
