<?php  
namespace Jur\App\Controllers;
use \Jur\App\Models\Modulos\TiposDocumentos;
use \Jur\App\Models\Modulos\SubTipos;
use \Jur\App\Models\Catalogos\Caracteres;
use Jur\App\Models\Catalogos\Acciones;
use \Jur\App\Models\Modulos\Areas;
use Jur\App\Models\Volantes\Auditorias;
use Jur\App\Models\Volantes\AuditoriasUnidades;
use Jur\App\Models\Volantes\Unidades;
use Jur\App\Models\Volantes\VolantesDocumentos;

class ModulosController {

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
			
			$datos = Auditorias::select('idAuditoria', 'tipoAuditoria','rubros','idArea')
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
					'idArea' => $datos[0]['idArea']
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
}

?>