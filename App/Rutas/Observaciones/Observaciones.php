<?php
	namespace App\Rutas;

	use Jur\App\Controllers\SecurityController;

	use Jur\App\Controllers\Observaciones\ObservacionesController;

	$controller = new ObservacionesController();


	$validate_idVolante = function($idVolante){
		$security = new SecurityController();
		$security->validate_idVolante($idVolante);
	};

	$auth = function(){

		$security = new SecurityController();
		$security->validacion_sesion();
	};

	$validate_update = function($idObservacion){
		$security = new SecurityController();
		$security->validate_update_observaciones($idObservacion);
	};



$app->group('/juridico',$auth,function() use($app,$controller){


	/*------------------- Home ---------------------*/

	$app->get('/Observaciones',function() use ($controller){
		$controller->home_template();
	});

	$app->get('/Observaciones/All',function() use ($controller,$app){
		$controller->table($app->request->get());
	});


	  $app->get('/Observaciones/Register/:id',function($id) use ($controller){
	    $controller->registro($id);
	  });

/*-------------------- Insert ------------------------*/

	$app->get('/Observaciones/Add',function() use ($controller){
		$controller->insert_template();
	});


	$app->post('/Observaciones/Save',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});


	/*----------------------- Update ------------------*/

	$app->get('/Observaciones/Update',function() use ($controller){
    $controller->update_template();
  });


  $app->post('/Observaciones/Update',function() use ($controller,$app){
    $controller->update($app->request->post());
  });



/*	$app->post('/Acciones/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});*/

});





?>
