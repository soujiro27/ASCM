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



$app->group('/juridico',$auth,function() use($app,$controller,$validate_idVolante,$validate_update){


	$app->get('/Observaciones/:id',function($id) use ($controller,$validate_idVolante){
		$validate_idVolante($id);
		$controller->load_observaciones_home();
	});


	$app->get('/Observaciones/add/:id',function($id) use ($controller,$validate_idVolante){
		$validate_idVolante($id);
		$controller->load_observaciones_insert_template();
	});


	$app->post('/Observaciones/save',function() use ($controller,$app){
		$controller->guardar($app->request->post());
	});

	$app->get('/Observaciones/Update/:id',function($id) use ($controller,$validate_update){
		$validate_update($id);
    $controller->update_template($id);
  });





  $app->post('/Observaciones/Update',function() use ($controller,$app){
    $controller->update($app->request->post());
  });




  $app->get('/Observaciones/Register/:id',function($id) use ($controller){
    $controller->registro($id);
  });


/*	$app->post('/Acciones/Update',function() use ($controller,$app){
		$controller->Update($app->request->post());
	});*/

});





?>
