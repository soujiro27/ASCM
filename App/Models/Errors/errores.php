<?php
	namespace Jur\App\Models\Errors;
	use Illuminate\Database\Eloquent\Model;

	class Errores extends Model {
		protected $primaryKey = 'idError';
	    protected $table = 'sia_errores';
	    protected $fillable = ['usrAlta','modulo','descripcion'];
	    public $timestamps = false;
	}


?>
