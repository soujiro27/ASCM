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





$app->group('/juridico',$auth,function() use($app,$controller){

	$app->get('/Confrontas-Internos',function() use ($controller){
		$controller->home_template_internos();
	});


	$app->get('/Confrontas-Internos/all',function() use ($controller){
		$controller->tabla_internos();
	});




	$app->get('/Confrontas-Internos/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Cedula');
	});

	$app->get('/Confrontas-Internos/Cedula/Register/:id',function($id) use ($controller,$app){
		$controller->get_register_cedula($id);
	});


	$app->get('/Confrontas-Internos/Nota/Register',function() use ($controller,$app){
		$controller->get_register_nota($app->request->get());
	});



	$app->post('/Confrontas-Internos/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});



		$app->post('/Confrontas-Internos/Cedula/Update',function() use ($controller,$app){
			$controller->update_cedula($app->request->post());
		});


});





?>
