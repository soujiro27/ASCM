<?php  
	namespace Jur\App\Models\Catalogos;
	use Illuminate\Database\Eloquent\Model;

	class Acciones extends Model {
		protected $primaryKey = 'idAccion';
	    protected $table = 'sia_catAcciones';
	    protected $fillable = ['nombre','usrAlta','fAlta','estatus','usrModificacion','fModificacion'];
	    public $timestamps = false;
	}


?>