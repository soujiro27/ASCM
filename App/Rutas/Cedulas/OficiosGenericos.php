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

	/*--------------------- Home -----------------------*/

	$app->get('/DocumentosDiversos',function() use ($controller){
		$controller->home_template();
	});


	$app->get('/DocumentosDiversos/All',function() use ($controller){
		$controller->tabla();
	});

	$app->get('/DocumentosDiversos/Cedula/:id',function($id) use ($controller){
		$controller->load_cedula_template($id);
	});

	/*-------------------- Insert ---------------------------*/


	$app->post('/OficiosGenericos/Save',function() use ($controller,$app){
		$controller->insert_cedula_oficio($app->request->post());
	});


	$app->post('/NotaGenericos/Cedula/add',function() use ($controller,$app){
		$controller->insert_cedula_nota($app->request->post());
	});


	/*---------------------- Update ---------------------------*/

	$app->get('/DocumentosDiversos/Register/:id',function($id) use ($controller,$app){
		$controller->get_register_cedula($id);
	});


	$app->post('/DocumentosDiversos/Oficio/Update',function() use ($controller,$app){
		$controller->update_cedula_oficio($app->request->post());
	});


	$app->post('/DocumentosDiversos/Cedula/Nota/Update',function() use ($controller,$app){
		$controller->update_cedula_nota($app->request->post());
	});


	$app->get('/DocumentosDiversos/Nota/Register',function($id) use ($controller,$app){
		$controller->get_register_nota($app->request->get());
	});




});





?>
