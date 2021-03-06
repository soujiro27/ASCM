<?php
namespace Jur\App\Controllers;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use Carbon\Carbon;
use GUMP;
use Jur\App\Controllers\ErrorsController;
use \Jur\App\Models\Modulos\TiposDocumentos;
use \Jur\App\Models\Modulos\SubTipos;
use \Jur\App\Models\Catalogos\Caracteres;
use Jur\App\Models\Catalogos\Acciones;
use Jur\App\Models\Catalogos\Textos;
use \Jur\App\Models\Modulos\Areas;
use Jur\App\Models\Volantes\Auditorias;
use Jur\App\Models\Volantes\AuditoriasUnidades;
use Jur\App\Models\Volantes\Unidades;
use Jur\App\Models\Volantes\VolantesDocumentos;
use Jur\App\Models\Volantes\Volantes;
use Jur\App\Models\Modulos\Remitentes;
use Jur\App\Models\Modulos\Puestos;
use Jur\App\Models\Notificaciones\Usuarios;
use Jur\App\Models\Volantes\TurnadosJuridico;
use Jur\App\Models\Modulos\Observaciones;


class ModulosController {


	public function get_cuenta(){
		$anio = $_SESSION['aniocuenta'];
		echo json_encode($anio);
	}

	public function get_tipos_documentos(){


		$documentos = TiposDocumentos::where('tipo','JURIDICO')->where('estatus','ACTIVO')->get();

		echo json_encode($documentos);

	}

	public function get_subDocumentos(array $data){

		$tipo = $data['tipo'];
		$auditoria = $data['auditoria'];

		$SubTipos = SubTipos::where('idTipoDocto',"$tipo")
					->where('auditoria',"$auditoria")
					->where('estatus','ACTIVO')
					->get();

		echo json_encode($SubTipos);

	}

	public function get_subDocumentos_test(array $data){

		$auditoria = $data['auditoria'];

		$SubTipos = SubTipos::where('auditoria',"$auditoria")
					->where('estatus','ACTIVO')
					->get();

		echo json_encode($SubTipos);

	}

	public function get_Caracteres(){

		$Caracteres = Caracteres::where('estatus','ACTIVO')->get();
		echo json_encode($Caracteres);
	}

	public function get_Areas_Volantes(array $data){

		$tipo = $data['tipo'];


		if($tipo == 'S'){

			$areas = Areas::whereIn('idArea',['DAJPA','DIJPA','DCPA','DN','DGAJ'])->get();

		} else {

			$areas = Areas::whereIn('idArea',['DAJPA','DIJPA','DCPA','DN'])->get();
		}

		echo json_encode($areas);

	}


	public function get_Acciones(){

		$acciones = Acciones::where('estatus','ACTIVO')->get();
		echo json_encode($acciones);
	}

	public function get_Datos_Auditoria(array $dato){

		$cuenta = substr($dato['cuenta'], -2);

		if(empty($dato['clave'])){
			$datosAuditoria = array('error' => 'La Auditoria NO existe', );
		}else{
			$cveAuditoria = 'ASCM/'.$dato['clave'].'/'.$cuenta;

			$datos = Auditorias::select('idAuditoria', 'tipoAuditoria','rubros','idArea','clave')
			->where('clave',"$cveAuditoria")
			->get();

			if($datos->isEmpty()){
				$datosAuditoria = array('error' => 'La Auditoria NO existe', );
			}else{
				$idAuditoria = $datos[0]['idAuditoria'];

				$unidades = AuditoriasUnidades::select('idCuenta','idSector','idSubsector','idUnidad')
				->where('idAuditoria',"$idAuditoria")
				->get();

				$sector = $unidades[0]['idSector'];
				$subSector = $unidades[0]['idSubsector'];
				$unidad = $unidades[0]['idUnidad'];
				$cuenta = $unidades[0]['idCuenta'];

				$unidades = Unidades::select('nombre')
				->where('idSector',"$sector")
				->where('idSubsector',"$subSector")
				->where('idUnidad',"$unidad")
				->where('idCuenta',"$cuenta")
				->get();


				$datosAuditoria = array(
					'sujeto' => $unidades[0]['nombre'],
					'tipo' => $datos[0]['tipoAuditoria'],
					'rubro' => $datos[0]['rubros'],
					'id' => $datos[0]['idAuditoria'],
					'idArea' => $datos[0]['idArea'],
					'clave' => $datos[0]['clave'],
					'auditoria' => $cveAuditoria
				);
			}
		}


		echo json_encode($datosAuditoria);



	}

	public function get_Turnados_Auditoria(array $dato){


		$cuenta = substr($dato['cuenta'], -2);

		if(empty($dato['clave']))
		{
			$turnos  = array('error' => 'No Hay Datos', );
		}else{

			$clave = 'ASCM/'.$dato['clave'].'/'.$cuenta;



			$datos = Auditorias::select('idAuditoria', 'tipoAuditoria','rubros')
			->where('clave',"$clave")
			->get();

			$idAuditoria = $datos[0]['idAuditoria'];

			$turnos = VolantesDocumentos::select('sub.nombre','t.idAreaRecepcion')
			->join('sia_volantes as v','v.idVolante','sia_volantesDocumentos.idVolante')
			->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','sia_volantesDocumentos.idSubTipoDocumento')
			->join('sia_TurnadosJuridico as t','t.idVolante','sia_volantesDocumentos.idVolante')
			->where('sia_volantesDocumentos.cveAuditoria',"$idAuditoria")
			->where('t.idTipoTurnado','V')
			->get();
		}
		echo json_encode($turnos);
	}

	public function export(){

		$volantes = Volantes::select('sia_Volantes.*','vd.cveAuditoria','a.clave','sub.nombre','t.idEstadoTurnado','t.idAreaRecepcion')
		->join('sia_VolantesDocumentos as vd','vd.idVolante','=','sia_volantes.idVolante')
		->join('sia_TurnadosJuridico as t','t.idVolante','=','sia_Volantes.idVolante'  )
		->join('sia_auditorias as a','a.idAuditoria','=','vd.cveAuditoria')
		->join('sia_catSubTiposDocumentos as sub','sub.idSubTipoDocumento','=','vd.idSubTipoDocumento')
		->where('sub.auditoria','SI')
		->where('t.idTipoTurnado','V')
		->orderBy("folio","ASC")
		->get();

		$spreadsheet = new Spreadsheet();
		$sheet = $spreadsheet->getActiveSheet();

		$array_volantes = $volantes->toArray();
		$colums = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','X','Y','Z','AA','AB','AC','AD'];
		$count = 0;
		$row = 1;

		foreach ($array_volantes[0] as $key => $value) {
			$sheet->setCellValue($colums[$count].$row, $key);
			$count++;

		}

		$count = 0;
		foreach ($array_volantes as $key => $value) {
			foreach ($array_volantes[$key] as $llave => $valor) {
				$row = $key + 2 ;
				$sheet->setCellValue($colums[$count].$row, $valor);
				$count++;
			}
		}


		$writer = new Xlsx($spreadsheet);
		$writer->save('./jur/export/volantes/volantes.xlsx');
	}

	public function add_Remitentes(array $data){

		try {
		$validate = $this->validate_Remitentes($data);
		if($validate['estatus']){
			$remitente = new Remitentes([
				'tipoRemitente' => $data['tipo'],
				'saludo' => $data['saludo'],
				'nombre' => $data['nombre'],
				'puesto' => $data['puesto'],
				'siglasArea' => $data['siglasArea'],
				'usrAlta' => $_SESSION['idUsuario'],
				'estatus' => 'ACTIVO',
			]);

			$remitente->save();
			}

			echo json_encode($validate);


		} catch (\Illuminate\Database\QueryException $e) {
			$error = new ErrorsController();
			$error->errores_load_table($e,'Volantes');
		}
	}

	public function validate_Remitentes(array $data){

		$validate['estatus'] = false;
		$is_valid = GUMP::is_valid($data,array(
			'tipo' => 'required|max_len,1|numeric',
			'saludo'=> 'required|max_len,15',
			'nombre' => 'required|max_len,120',
			'puesto' => 'required|max_len,120',
			'siglasArea' =>  'required|max_len,20',
		));

		if($is_valid === true){
			$validate['estatus'] = true;
		}

		return $validate;

	}

	public function get_remitentes(array $data){

		$tipo = $data['tipo'];

		$remitentes = Remitentes::where('tipoRemitente',"$tipo")->where('estatus','ACTIVO')->get();
		echo json_encode($remitentes);
	}


	public function get_puestos_asignacion(){

		$area = $_SESSION['idArea'];
		$rpe = $_SESSION['idEmpleado'];



		$puestos = Puestos::where('idArea',"$area")->where('estatus','ACTIVO')->orderBy('idPuestoJuridico','DESC')->get();
		$puestos_array = $puestos->toArray();
		$puestos_final=[];
		foreach ($puestos_array as $key => $value) {
				if($value['rpe'] != $rpe ){
					array_push($puestos_final,$value);
				}
		}

		echo json_encode($puestos_final);
	}

	public function get_puestos_cedula(){
		$area = $_SESSION['idArea'];

		$puestos = Puestos::where('idArea',"$area")->where('estatus','ACTIVO')->where('titular','NO')->orderBy('idPuestoJuridico','DESC')->get();

		echo json_encode($puestos);
	}

	public function get_textos_cedula(){
			$textos = Textos::where('estatus','ACTIVO')->get();
			echo json_encode($textos);
	}


	public function get_respuestas(array $data){

		$idUsuario = $_SESSION['idUsuario'];

		$idPuesto = $data['empleado'];
		$idVolante = $data['idVolante'];
		$puestos = Puestos::where('idPuestoJuridico',"$idPuesto")->get();
		$rpe = $puestos[0]['rpe'];

		$usuarios = Usuarios::where('idEmpleado',"$rpe")->get();
		$usrReceptor = $usuarios[0]['idUsuario'];

		$turnadosUsuario = TurnadosJuridico::select('sia_TurnadosJuridico.*','a.archivoFinal')
		->leftJoin('sia_AnexosJuridico as a ','a.idTurnadoJuridico','=','sia_TurnadosJuridico.idTurnadoJuridico')
		->where('sia_TurnadosJuridico.idUsrReceptor',"$idUsuario")->where('sia_TurnadosJuridico.usrAlta',"$usrReceptor")
		->where('idTipoTurnado','I')->where('sia_TurnadosJuridico.idVolante',"$idVolante")->get();


		$turnadosReceptor = TurnadosJuridico::select('sia_TurnadosJuridico.*','a.archivoFinal')
		->leftJoin('sia_AnexosJuridico as a ','a.idTurnadoJuridico','=','sia_TurnadosJuridico.idTurnadoJuridico')
		->where('sia_TurnadosJuridico.idUsrReceptor',"$usrReceptor")->where('sia_TurnadosJuridico.usrAlta',"$idUsuario")
		->where('idTipoTurnado','I')->where('sia_TurnadosJuridico.idVolante',"$idVolante")->get();

		$merge = $turnadosUsuario->merge($turnadosReceptor);
		$turnados = $merge->all();

	foreach ($turnados as $key => $value) {
			$turnados[$key]['usrActual'] = $idUsuario;
	}

	echo json_encode($turnados);

	}



	public function get_firmas_nota_generico(){
		$puestos = Puestos::where('firmaNota','SI')->get();
		echo json_encode($puestos);
	}

	public function get_remitente_cedula(array $data){
		try {
			$idVolante = $data['idVolante'];
			$data = VolantesDocumentos::select('u.saludo','u.nombre','u.paterno','u.materno','a.nombre as puesto')
											->join('sia_auditorias as audi','audi.idAuditoria','=','sia_volantesDocumentos.cveAuditoria')
											->join('sia_areas as a','a.idArea','=','audi.idArea')
											->join('sia_usuarios as u','u.idEmpleado','=','a.idEmpleadoTitular')
											->where('sia_volantesDocumentos.idVolante',"$idVolante")
											->get();
			echo json_encode(array('status'=>true,'data' => $data));
	
		}catch(\Illuminate\Database\QueryException $e){
	
			$error = new ErrorsController();
			$error->errores_load_table($e,'Api');
	
		}
	
	}

	public function get_remitente_cedula_diversos(array $data){
		try {
			$idVolante = $data['idVolante'];
			$data = Volantes::select('r.saludo','r.nombre','r.puesto','r.tipoRemitente')
							->join('sia_RemitentesJuridico as r','r.idRemitenteJuridico','=','sia_volantes.idRemitenteJuridico')
							->where('sia_volantes.idVolante',"$idVolante")
							->get();
			echo json_encode(array('status'=>true,'data' => $data));
	
		}catch(\Illuminate\Database\QueryException $e){
	
			$error = new ErrorsController();
			$error->errores_load_table($e,'Api');
	
		}
	
	}


}

?>
