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

	$app->get('/confrontasJuridico',function() use ($controller){
		$controller->Home();
	});


	$app->get('/Confronta/all',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/Confronta/Asignacion/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Asignacion');
	});

	$app->get('/Confronta/Respuestas/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Respuestas');
	});


	$app->get('/Confronta/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Cedula');
	});

	$app->get('/Confronta/Cedulas/Register',function() use ($controller,$app){
		$controller->get_register_cedula($app->request->get());
	});


	$app->get('/Confronta/Nota/Register',function() use ($controller,$app){
		$controller->get_register_nota($app->request->get());
	});


	$app->post('/Confronta/Asignacion',function() use ($controller,$app){
		$controller->insert_asignacion($app->request->post(),$_FILES);
	});


	$app->post('/Confronta/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});



		$app->post('/Confronta/Cedula/Update',function() use ($controller,$app){
			$controller->update_cedula($app->request->post());
		});


});





?>
