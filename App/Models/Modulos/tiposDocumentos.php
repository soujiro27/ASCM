<?php 

namespace Jur\App\Models\Modulos;
use Illuminate\Database\Eloquent\Model;


class TiposDocumentos extends Model {
    protected $primaryKey = 'idTipoDocto';
    protected $table = 'sia_tiposdocumentos';
    public $timestamps = false;
    public $incrementing = false;

 }
