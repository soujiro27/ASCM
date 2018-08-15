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




	$app->get('/Confronta/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Cedula');
	});

	$app->get('/Confronta/Cedula/Register/:id',function($id) use ($controller,$app){
		$controller->get_register_cedula($id);
	});


	$app->get('/Confronta/Nota/Register',function() use ($controller,$app){
		$controller->get_register_nota($app->request->get());
	});



	$app->post('/Confronta/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});



		$app->post('/Confronta/Cedula/Update',function() use ($controller,$app){
			$controller->update_cedula($app->request->post());
		});


});





?>
