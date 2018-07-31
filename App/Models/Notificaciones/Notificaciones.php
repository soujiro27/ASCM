<?php  
	namespace Jur\App\Models\Notificaciones;
	use Illuminate\Database\Eloquent\Model;

	class Notificaciones extends Model {
		protected $table = 'sia_notificacionesmensajes';
		 protected $fillable = [
		  	'idNotificacion',
				'idUsuario',
				'mensaje',
				'idPrioridad',
				'idImpacto',
				'fAlta',
				'usrAlta',
				'estatus',
				'situacion',
				'identificador',
				'idCuenta',
				'idAuditoria',
				'idModulo',
				'referencia',
		];
     public $timestamps = false;
	}


?>
