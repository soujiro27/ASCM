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





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	$app->get('/Irac',function() use ($controller){
		$controller->Home();
	});


	$app->get('/Irac/all',function() use ($controller){
		$controller->tabla();
	});

/* ----Rutas de Asignacion
	$app->get('/Irac/Asignacion/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Asignacion');
	});

	$app->post('/Irac/Asignacion',function() use ($controller,$app){
		$controller->insert_asignacion($app->request->post(),$_FILES);
	});

----*/

	$app->get('/Irac/Respuestas/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Respuestas');
	});

	$app->get('/Irac/Observaciones/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Observaciones');
	});


	$app->get('/Irac/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Cedula');
	});

	$app->get('/Irac/Cedulas/Register',function() use ($controller,$app){
		$controller->get_register_cedula($app->request->get());
	});



	$app->get('/Irac/Observaciones/add/:id',function($id) use ($controller){
		$controller->nueva_observacion($id);
	});


	$app->post('/Irac/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});



		$app->post('/Irac/Cedula/Update',function() use ($controller,$app){
			$controller->update_cedula($app->request->post());
		});


});





?>
