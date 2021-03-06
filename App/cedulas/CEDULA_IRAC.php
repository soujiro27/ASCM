<?php
session_start();
// Include the main TCPDF library (search for installation path).
require_once('./tcpdf/tcpdf.php');

$idVolante = $_GET['param'];


function conecta(){
  try{
    require './../../../src/conexion.php';
    //require 'src/conexion.php';
    $db = new PDO("sqlsrv:Server={$hostname}; Database={$database}", $username, $password );
    return $db;
  }catch (PDOException $e) {
    print "ERROR: " . $e->getMessage();
    die();
  }
}

function consultaRetorno($sql,$db){
    $query=$db->prepare($sql);
    $query->execute();
    return $query->fetchAll(PDO::FETCH_ASSOC);
}



$sql = "SELECT * FROM sia_DocumentosSiglas WHERE idVolante='$idVolante'";
$db=conecta();
$datos=consultaRetorno($sql, $db);

if(empty($datos)){
  header('Location: /SIA/juridico/Public/cedula.html');
}

$sql = "SELECT vo.numDocumento,CASE WHEN a.tipoAuditoria LIKE '%FIN%' THEN '<b>C.P. FELIPE DE JESÚS ALVA MARTÍNEZ,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Financiera y Administración.- Presente.- Para su conocimiento.<br>' WHEN us.idArea='DGACFA' or us.idArea='DGACFB' or us.idArea='DGACFC' THEN '<b>C.P. FELIPE DE JESÚS ALVA MARTÍNEZ,</b> Titular de la Unidad Técnica Sustantiva de Fiscalización Financiera y Administración.- Presente.- Para su conocimiento.<br>' ELSE ' ' END tipoau,a.idAuditoria audi ,a.clave claveAuditoria,vo.fDocumento,vo.fRecepcion ,CONCAT(us.saludo,' ',us.nombre,' ',us.paterno,' ', us.materno) nombreres, ar.nombre direccion,ds.fOficio,ds.siglas,ds.idPuestosJuridico,ds.numFolio FROM sia_Volantes vo INNER JOIN sia_volantesDocumentos vd on vo.idVolante = vd.idVolante INNER JOIN sia_areas ar on vo.idRemitente=ar.idArea INNER JOIN sia_usuarios us on ar.idEmpleadoTitular=us.idEmpleado LEFT JOIN sia_DocumentosSiglas ds on vo.idVolante=ds.idVolante INNER JOIN sia_auditorias a on vd.cveAuditoria=a.idAuditoria WHERE vo.idVolante='$idVolante';";

$db=conecta();
$datos=consultaRetorno($sql, $db);


$fecha=explode('-',$datos[0]['fDocumento']);
$mes=mes(intval($fecha[1]));

$feoficio=explode('-',$datos[0]['fOficio']);
$mes2=mes(intval($feoficio[1]));

$feRecep=explode('-',$datos[0]['fRecepcion']);
$mes3=mes(intval($feRecep[1]));



$numdocu=convierte(str_replace('/',"\n", $datos[0]['numDocumento']));
$clave=$datos[0]['claveAuditoria'];
$fdocume=$datos[0]['fDocumento'];
$nomarers=$datos[0]['nombreres'];
$direc=$datos[0]['direccion'];
$sig=$datos[0]['siglas'];
$puesjud=$datos[0]['idPuestosJuridico'];
$tipo=$datos[0]['tipoau'];
$numof=$datos[0]["numFolio"];


$cuenta=$_SESSION["idCuentaActual"];

$sql = " SELECT a.idAuditoria auditoria,ta.nombre tipo, COALESCE(convert(varchar(20),a.clave),convert(varchar(20),a.idAuditoria)) claveAuditoria,
 dbo.lstSujetosByAuditoria(a.idAuditoria) sujeto, dbo.lstObjetosByAuditoria(a.idAuditoria) objeto, a.idArea,
 ar.nombre,a.rubros,cu.anio
 FROM sia_programas p
 INNER JOIN sia_auditorias a on p.idCuenta=a.idCuenta and p.idPrograma=a.idPrograma
 INNER JOIN sia_areas ar on a.idArea=ar.idArea
 LEFT JOIN sia_tiposauditoria ta on a.tipoAuditoria= ta.idTipoAuditoria
 LEFT JOIN sia_cuentas cu on a.idCuenta = cu.idCuenta
 WHERE a.idCuenta='$cuenta' and a.idAuditoria=(select cveAuditoria from sia_VolantesDocumentos where idVolante='$idVolante')
 GROUP BY a.idAuditoria, a.clave,ta.nombre,a.idProceso,a.idEtapa,ar.nombre, a.idArea,ar.nombre,a.rubros,cu.anio;";

$db=conecta();
$datos=consultaRetorno($sql, $db);

function convierte($cadena){
  $str = utf8_decode($cadena);
  return $str;
}

function mes($num){
  $meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio', 'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return $meses[$num-1];
}


$aud=convierte(str_replace('/',"\n", $datos[0]['auditoria']));
$ti=convierte(str_replace('/',"\n", $datos[0]['tipo']));
$clave=$datos[0]['claveAuditoria'];
$sSujeto=$datos[0]['sujeto'];
$unidadAdmin=$datos[0]['nombre'];
$rubro=$datos[0]['rubros'];
$an=$datos[0]['anio'];



class MYPDF extends TCPDF {
      //Page header
    public function Header() {
      $ao = $GLOBALS['an'];
      $unidadAdmin = $GLOBALS['unidadAdmin'];

      $this->SetFont('helvetica', '', 11);



      $html0 = '<table cellspacing="0" cellpadding="0" border="0"><tr><td align="center"><p><b></b></p></td></tr></table>';
      $this->WriteHTML($html0);

      $html = '<table cellspacing="0" cellpadding="0" border="0"  ><tr><td align="center"><p><b>AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO<br>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br>HOJA DE EVALUACIÓN DEL INFORME DE RESULTADOS DE AUDITORÍA PARA CONFRONTA<br>CUENTA PÚBLICA ' . $ao . '</b></p></td></tr></table>';
        $this->SetFont('helvetica', '', 11);
      $this->WriteHTML($html);

      $this->SetFont('helvetica', '', 10);
      $html2 = '<table cellspacing="0" cellpadding="1" border="1" style="background-color:#E7E6E6;" width="585"><tr><td colspan="1"><b>UNIDAD ADMINISTRATIVA AUDITORA:</b></td><td colspan="2">'.$unidadAdmin.'</td></tr><tr><td  colspan="1"><b>CLAVE:</b></td><td colspan="2">'.$GLOBALS['clave'].'</td></tr><tr><td colspan="1"><b>RUBRO O FUNCIÓN DE GASTO AUDITADO:</b></td><td colspan="2">'.$GLOBALS['rubro'].'</td></tr><tr><td colspan="1"><b>TIPO DE AUDITORÍA:</b></td><td colspan="2">'.$GLOBALS['ti'].'</td></tr><tr><td colspan="1"><b>SUJETO FISCALIZADO:</b></td><td colspan="2">'.$GLOBALS['sSujeto'].'</td></tr></table>';
       $this->SetFont('helvetica', '', 10);
      $this->WriteHTML($html2);
    }
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de México');
$pdf->SetTitle('IRAC ' .$clave);

//$pdf->setPrintHeader(true);
$pdf->setPrintFooter(false);

// set header and footer fonts
//$pdf->setHeaderFont(Array(PDF_FONT_NAME_MAIN, '', PDF_FONT_SIZE_MAIN));
//$pdf->setFooterFont(Array(PDF_FONT_NAME_DATA, '', PDF_FONT_SIZE_DATA));

// set default monospaced font
$pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);

// set margins
$pdf->SetMargins('25','80','25',true);
$pdf->SetFooterMargin('21');
$pdf->SetHeaderMargin('14');
// set auto page breaks
$pdf->SetY(0, true, true);
$pdf->SetAutoPageBreak(true, '21');

// set image scale factor
$pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

// set some language-dependent strings (optional)
if (@file_exists(dirname(__FILE__).'/lang/eng.php')) {
    require_once(dirname(__FILE__).'/lang/eng.php');
    $pdf->setLanguageArray($l);
}

// -------------------------------------------------------------------


$pdf->AddPage('P','LETTER',true);
$pdf->SetFont('helvetica', '', 8);


$tbl ='';

$sqlEspacios = "select * from sia_EspaciosJuridico where idVolante = '$idVolante'";

$espacios = consultaRetorno($sqlEspacios,$db);


for ($i=0; $i < $espacios[0]['encabezado'] +2 ; $i++) {

  $tbl .= <<<EOD
  <br>

EOD;
}


$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$sql="SELECT ROW_NUMBER() OVER (ORDER BY idVolante  desc ) as fila, idObservacionDoctoJuridico, idVolante, idSubTipoDocumento, cveAuditoria,pagina,parrafo,observacion FROM sia_ObservacionesDoctosJuridico WHERE idVolante='$idVolante' and estatus='ACTIVO' order by pagina, parrafo ASC";

$db=conecta();



$datos=consultaRetorno($sql, $db);

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="1" border="1">
    <tr style="background-color:#E7E6E6;">
      <th colspan="1" align="center" width="35"><b>No.</b></th>
      <th colspan="1" align="center" width="45"><b>Página</b></th>
      <th colspan="1" align="center" width="50.6"><b>Párrafo</b></th>
      <th  width="454"align="justify"><b>Observaciones</b></th>
    </tr>

EOD;

foreach ($datos as $row) {
$tbl .= <<<EOD
  <tr>
    <td colspan="1" align="center">{$row['fila']}</td>
    <td colspan="1" align="center">{$row['pagina']}</td>
    <td colspan="1" align="center">{$row['parrafo']}</td>
    <td colspan="11" align="justify" style="line-height:13px">{$row['observacion']}</td>

  </tr>

EOD;
}

$tbl .= <<<EOD
  </table>
EOD;

for ($i=0; $i <$espacios[0]['cuerpo'] ; $i++) {
 $tbl .= <<<EOD
<br>
EOD;
}


$tbl .= <<<EOD
<table style="border:1px solid black; text-align:justify" width="584.5">
<tr><td style="line-height:13px">Se debe considerar que la Dirección General de Asuntos Jurídicos no cuenta con soporte documental que permita determinar si se reúnen o no los elementos suficientes e idóneos para acreditar las observaciones detectadas en la auditoría.<br><br>Una vez evaluada la respuesta presentada en confronta y en caso de que esa UAA determine la existencia de Potenciales Promociones de Acción, se sugiere lo siguiente: 1).- Señalar los resultados en la cédula de potenciales promociones de acciones correspondiente. 2).- Indicar la normatividad infringida vigente en el período de revisión.</td></tr></table>
EOD;

$pdf->SetFont('helvetica', '', 10);
$pdf->writeHTML($tbl, true, false, false, false, '');

// -----------------------------------------------------------------------------

$sql="SELECT ar.idArea,pj.puesto juridico,CONCAT(pj.saludo,' ',pj.nombre,' ',pj.paterno,' ',pj.materno) nombre, ds.siglas,ds.fOficio
FROM sia_Volantes vo
INNER JOIN sia_TurnadosJuridico tj on tj.idVolante = vo.idVolante
INNER JOIN sia_areas ar on tj.idAreaRecepcion= ar.idArea
INNER JOIN sia_usuarios us on ar.idEmpleadoTitular=us.idEmpleado
INNER JOIN sia_PuestosJuridico pj on us.idEmpleado=pj.rpe
INNER JOIN sia_DocumentosSiglas ds on vo.idVolante = ds.idVolante
WHERE vo.idVolante='$idVolante' and tj.idTipoTurnado ='V'";

$db=conecta();
$date=consultaRetorno($sql, $db);

$Nombreela=$date[0]['juridico'];
$nombrecon=$date[0]['nombre'];
$sig=$date[0]['siglas'];


$fecha=explode('-',$date[0]['fOficio']);
//var_dump($fecha);
$mes=mes(intval($fecha[1]));

$tbl = '';

for ($i=0; $i <$espacios[0]['fechaDocto'] ; $i++) {
 $tbl .= <<<EOD
  <br>
EOD;
}

$tbl .= <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="right">Ciudad de México, $fecha[2] de $mes de $fecha[0]</td></tr>
  </table>
EOD;

for ($i=0; $i <$espacios[0]['pie'] ; $i++) {
 $tbl .= <<<EOD
  <br>

EOD;
}

$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($tbl, true, false, false, false, '');


// -----------------------------------------------------------------------------

$tbl = <<<EOD
<table cellspacing="0" cellpadding="0" border="0">

 <tr>
  <td align="center"><b>REVISÓ</b></td>
  <td align="center"><b>AUTORIZÓ</b></td>
 </tr>
 <tr>
  <td align="center"><b><br><br><br><br>{$nombrecon}</b></td>
  <td align="center"><b><br><br><br><br>DR. IVÁN DE JESÚS OLMOS CANSINO</b></td>
 </tr>
  <tr>
  <td align="center"><b>{$Nombreela}</b></td>
  <td align="center"><b>DIRECTOR GENERAL DE ASUNTOS JURÍDICOS</b></td>
 </tr>

</table>
EOD;

$pdf->SetFont('helvetica', '', 10);
$pdf->writeHTML($tbl, true, false, false, false, '');


// -----------------------------------------------------------------------------
$ef=explode(",",$puesjud);
$nombres=array();
$puestos=array();
for($i=0;$i<count($ef);$i++){
    $usrf=$ef[$i];
    $sql="select concat(saludo,' ',nombre,' ',paterno,' ',materno) as nombre,puesto from sia_PuestosJuridico where idPuestoJuridico='$usrf'";
    $nombre=consultaRetorno($sql,$db);
    array_push($nombres,$nombre[0]['nombre']);
    array_push($puestos,$nombre[0]['puesto']);
}

$linea='';
$elaboro='';
$cont=1;
$firmaSecond='';
$elementos=count($nombres);
  if($elementos==1){
     $elaboro=$elaboro.'<tr><td align="center"><b><p>ELABORÓ<br><br><br></p></b><br><br><br><br><b>'.$nombres[$elementos-1].'<br>'.$puestos[$elementos-1].'</b></td><td></td></tr>';
  }elseif ($elementos==2) {
    $elaboro='<tr><br>';
    foreach ($nombres as $llave => $valor) {
        $elaboro=$elaboro.'<td align="center"><b><p>ELABORÓ<br><br><br></p></b><br><br><br><br><b>'.$valor.'<br>'.$puestos[$llave].'</b></td>';
      }
    $elaboro=$elaboro.'</tr>';
  }elseif ($elementos==3) {
    $cont=1;
    $elaboro='<tr><br>';
    foreach ($nombres as $llave => $valor) {
        if($cont>2){
          $elaboro=$elaboro.'<tr><td align="center"><b><p>ELABORÓ<br><br><br></p></b><br><br><br><br><b>'.$valor.'<br>'.$puestos[$llave].'</b></td></tr>';
        }elseif($cont>1){

        $elaboro=$elaboro.'<td align="center"><b><p>ELABORÓ<br><br><br></p></b><br><br><br><br><b>'.$valor.'<br>'.$puestos[$llave].'</b></td></tr><br><br>';

        }else{
           $elaboro=$elaboro.'<td align="center"><b><p>ELABORÓ<br><br><br></p></b><br><br><br><br><b>'.$valor.'<br>'.$puestos[$llave].'</b></td>';
        }
        $cont++;
      }

  }
$lineaPuestos='';

foreach ($puestos as $key => $value) {
  $lineaPuestos=$lineaPuestos.'<td align="center" colspan="0"  >'.$value.'</td>';
}


$html = <<<EOD
<table cellspacing="0" cellpadding="0" border="0" >
$elaboro
</table>
EOD;
$pdf->writeHTML($html, true, false, false, false, '');

if($cont>2){

$html = <<<EOD
<table cellspacing="0" cellpadding="0" border="0" >
$firmaSecond
</table>
EOD;
$pdf->writeHTML($html, true, false, false, false, '');
}

// -----------------------------------------------------------------------------


$to = '';
for ($i=0; $i <$espacios[0]['copiaCedula'] ; $i++) {
  $to .= '<br>';
}

$tbl = <<<EOD
$to
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">{$sig}</td>
    <td>{$numof}</td></tr>
  </table>
EOD;
  $pdf->SetFont('helvetica', '', 8);
$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------
//Close and output PDF document
ob_end_clean();
$pdf->Output('IRAC.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
