<?php
namespace Jur\App\Models\Modulos;
use Illuminate\Database\Eloquent\Model;

class Remitentes extends Model {
    protected $table = 'sia_RemitentesJuridico';
    protected $primaryKey = 'idRemitenteJuridico';
    protected $fillable = ['tipoRemitente','saludo','nombre','puesto','siglasArea','usrAlta','fAlta','estatus'];
    public $timestamps = false;
}