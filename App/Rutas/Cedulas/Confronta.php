<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Cedulas\ConfrontaController;

	$controller = new ConfrontaController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('NOTA');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	/*------------------- HOME --------------------------*/

	$app->get('/confrontasJuridico',function() use ($controller){
		$controller->home_template();
	});


	$app->get('/Confronta/All',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Confronta/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id);
	});

	/*------------------ Insert ---------------------------*/

	$app->post('/Confronta/Save',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});


	/*--------------- Update -----------------*/

	$app->get('/Confronta/Cedula/Register/:id',function($id) use ($controller){
		$controller->get_register_cedula($id);
	});

	$app->post('/Confronta/Update',function() use ($controller,$app){
		$controller->update_cedula($app->request->post());
	});


});


?>
