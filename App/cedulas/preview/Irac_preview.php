<?php
session_start();
// Include the main TCPDF library (search for installation path).
require_once('./../tcpdf/tcpdf.php');

$idVolante = $_GET['param'];
$obvs = $_GET['obvs'];
$texto = $_GET['texto'];
$firmas_espacio = $_GET['firmas_e'];
$copias = $_GET['copias'];
$fecha = $_GET['fecha'];
$firmas = $_GET['firmas'];

function conecta(){
  try{
    require './../../../../src/conexion.php';
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

$db=conecta();

class MYPDF extends TCPDF {
      //Page header
    public function Header() {

      $this->SetFont('helvetica', '', 11);

      $html0 = '<table cellspacing="0" cellpadding="0" border="0"><tr><td align="center"><p><b></b></p></td></tr></table>';
      $this->WriteHTML($html0);

      $html = '<table cellspacing="0" cellpadding="0" border="0" >
      <tr><td align="center"><p><b>AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO<br>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br>HOJA DE EVALUACIÓN DEL INFORME DE RESULTADOS DE AUDITORÍA PARA CONFRONTA<br>CUENTA PÚBLICA </b></p></td></tr></table>';
      $this->SetFont('helvetica', '', 11);
      $this->WriteHTML($html);

      $this->SetFont('helvetica', '', 10);
      $html2 = '<table cellspacing="0" cellpadding="1" border="1" style="background-color:#E7E6E6;" width="585"><tr><td colspan="1"><b>UNIDAD ADMINISTRATIVA AUDITORA:</b></td><td colspan="2">--------------------- DATOS DE PRUEBA ----------------------</td></tr><tr><td  colspan="1"><b>CLAVE:</b></td><td colspan="2">----------------- DATOS DE PRUEBA --------------------</td></tr><tr><td colspan="1"><b>RUBRO O FUNCIÓN DE GASTO AUDITADO:</b></td><td colspan="2">----------------- DATOS DE PRUEBA ---------------------</td></tr><tr><td colspan="1"><b>TIPO DE AUDITORÍA:</b></td><td colspan="2">-------------------- DATOS DE PRUEBA--------------------</td></tr><tr><td colspan="1"><b>SUJETO FISCALIZADO:</b></td><td colspan="2">------------------ DATOS DE PRUEBA ---------------------</td></tr></table>';
       $this->SetFont('helvetica', '', 10);
      $this->WriteHTML($html2);
    }
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de México');
$pdf->SetTitle('IRAC PREVIEW');

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


for ($i=0; $i < $obvs +2 ; $i++) {

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

for ($i=0; $i <$texto ; $i++) {
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

//var_dump($fecha);
if(($fecha) != '0' ){
$tbl='';

for ($i=0; $i < $fecha ; $i++) {

  $tbl .= <<<EOD
  <br>

EOD;
}
$pdf->writeHTML($tbl, true, false, false, false, '');
}

$tbl = <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="right">Ciudad de México, 01 de ENERO de 2018</td></tr>
  </table>
EOD;


for ($i=0; $i <$firmas_espacio; $i++) {
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
 <td align="center"><b><br><br><br><br>NOMBRE DE PRUEBA IRAC</b></td>
  <td align="center"><b><br><br><br><br>DR. IVÁN DE JESÚS OLMOS CANSINO</b></td>
 </tr>
  <tr>
  <td align="center"><b>PUESTO DE PRUEBA IRAC</b></td>
  <td align="center"><b>DIRECTOR GENERAL DE ASUNTOS JURÍDICOS</b></td>
 </tr>

</table>
EOD;

$pdf->SetFont('helvetica', '', 10);
$pdf->writeHTML($tbl, true, false, false, false, '');


// -----------------------------------------------------------------------------

$ef=explode(",",$firmas);
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
for ($i=0; $i <$copias ; $i++) {
  $to .= '<br>';
}

$tbl = <<<EOD
$to
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">SIGLAS IRAC</td>
    <td>NUMERO OFICIO</td></tr>
  </table>
EOD;
  $pdf->SetFont('helvetica', '', 8);
$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------
//Close and output PDF document
$pdf->Output('IRAC.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+
