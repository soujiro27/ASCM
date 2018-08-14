<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Cedulas\DocumentosDiversosController;

	$controller = new DocumentosDiversosController();


	$rol = function(){
		$security = new SecurityController();
		$security->valida_rol('NOTA');
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};





$app->group('/juridico',$auth,$rol,function() use($app,$controller){

	$app->get('/DocumentosDiversos',function() use ($controller){
		$controller->Home();
	});


	$app->get('/DocumentosDiversos/all',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/DocumentosDiversos/Asignacion/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Asignacion');
	});

	$app->get('/DocumentosDiversos/Respuestas/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Respuestas');
	});


	$app->get('/DocumentosDiversos/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id,'Cedula');
	});

	$app->get('/DocumentosDiversos/Cedulas/Register',function() use ($controller,$app){
		$controller->get_register_cedula($app->request->get());
	});


	$app->get('/DocumentosDiversos/Nota/Register',function() use ($controller,$app){
		$controller->get_register_nota($app->request->get());
	});


  $app->get('/DocumentosDiversos/OficioGenerico/:id',function($id) use ($controller){
		$controller->load_template_oficio($id);
	});


	$app->post('/DocumentosDiversos/Asignacion',function() use ($controller,$app){
		$controller->insert_asignacion($app->request->post(),$_FILES);
	});


	$app->post('/DocumentosDiversos/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula($app->request->post());
	});



		$app->post('/DocumentosDiversos/Cedula/Update',function() use ($controller,$app){
			$controller->update_cedula($app->request->post());
		});


});





?>
