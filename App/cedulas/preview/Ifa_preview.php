<?php
session_start();
// Include the main TCPDF library (search for installation path).
require_once('../tcpdf/tcpdf.php');

$idVolante = $_GET['idVolante'];
$obvs = $_GET['obvs'];
$copias = $_GET['copias'];
$texto = $_GET['texto'];
$firmas = $_GET['firmas'];
$fecha = $_GET['fecha'];


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


class MYPDF extends TCPDF {
      //Page header
    public function Header() {
      
      
      $this->SetFont('helvetica', '', 11);
      
   

      $html0 = '<table cellspacing="0" cellpadding="0" border="0"><tr><td align="center"><p><b></b></p></td></tr></table>';
      $this->WriteHTML($html0);    
      
      $html = '<table cellspacing="0" cellpadding="0" border="0"  ><tr><td align="center"><p><b>AUDITORÍA SUPERIOR DE LA CIUDAD DE MÉXICO<br>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br>HOJA DE EVALUACIÓN DEL INFORMES FINALES DE AUDITORÍA<br>CUENTA PÚBLICA 2018</b></p></td></tr></table>';
      $this->WriteHTML($html);

    $this->SetFont('helvetica', '', 10);
      $html2 = '<table cellspacing="0" cellpadding="1" border="1" style="background-color:#E7E6E6;" width="582"><tr><td colspan="1"><b>UNIDAD ADMINISTRATIVA AUDITORA:</b></td><td colspan="2"> --------------------- PRUEBA -------------- </td></tr><tr><td  colspan="1"><b>CLAVE:</b></td><td colspan="2">--------------------- PRUEBA --------------</td></tr><tr><td colspan="1"><b>RUBRO O FUNCIÓN DE GASTO AUDITADO:</b></td><td colspan="2">--------------------- PRUEBA --------------</td></tr><tr><td colspan="1"><b>TIPO DE AUDITORÍA:</b></td><td colspan="2">--------------------- PRUEBA --------------</td></tr><tr><td colspan="1"><b>SUJETO FISCALIZADO:</b></td><td colspan="2">--------------------- PRUEBA --------------</td></tr></table>';
      $this->WriteHTML($html2);
    }
}

// create new PDF document
$pdf = new MYPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// set document information
$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de México');
$pdf->SetTitle('IFA PRUEBAS');
 
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
      <th  width="452"align="justify"><b>Observaciones</b></th>
    </tr>
   
EOD;

foreach ($datos as $row) {
$tbl .= <<<EOD
  <tr>
    <td colspan="1" align="center">{$row['fila']}</td>
    <td colspan="1" align="center">{$row['pagina']}</td>
    <td colspan="1" align="center">{$row['parrafo']}</td>
    <td colspan="11" align="justify" style="line-height:14px">{$row['observacion']}</td>

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


$pdf->SetFont('helvetica', '', 10);
$pdf->writeHTML($tbl, true, false, false, false, '');


// -----------------------------------------------------

$texto_seleccionado = <<<EOD
    <table cellspacing="0" cellpadding="1" border="1" width="582">
    <tr><td style="text-align:justify;line-height:14px">Esta Dirección General de Asuntos Jurídicos coincide con la (s) Potencial (es) Promoción (es) de Acción (es) señalada (s) en la cédula del Informe Final de Auditoría en revisión, por las observaciones contenidas en la presente Hoja de Evaluación.</p><p><br></p><p>Se debe considerar que esta Dirección General de Asuntos Jurídicos no cuenta con el soporte documental que permita determinar si se reúnen o no los elementos suficientes e idóneos para acreditar o no legalmente la existencia de la (s) irregularidad (es) detectada (s) y señalada (s) en los resultados de la auditoría; demostrar la eventual responsabilidad del (de los) servidor (es) público (s); y en su caso, la fecha probable de presentación de la Promoción de Acciones que correspondan ante la autoridad competente.</td></tr>
    </table>
EOD;

$pdf->SetFont('helvetica', '', 10);
$pdf->writeHTML($texto_seleccionado, true, false, false, false, '');




// -----------------------------------------------------------------------------


if($fecha > 0){
  $tbl= '';
}

for ($i=0; $i <$fecha ; $i++) { 
  $tbl .= <<<EOD
   <br>
 
EOD;
}

if($fecha > 0 ){

  $tbl .= <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="right">Ciudad de México, 01 de ENERO de 2018</td></tr>  
  </table>
EOD;
} else{

  $tbl = <<<EOD
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="right">Ciudad de México, 01 de ENERO de 2018</td></tr>  
  </table>
EOD;
}



for ($i=0; $i <$firmas ; $i++) { 
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
  <td align="center"><b>AUTORIZÓ</b></td>
  <td align="center"><b>REVISÓ</b></td>
 </tr>
 <tr>
  <td align="center"><b><br><br><br><br>DR. IVÁN DE JESÚS OLMOS CANSINO</b></td>
  <td align="center"><b><br><br><br><br>PERSONA QUE REVISO</b></td>
 </tr>
  <tr>
  <td align="center"><b>DIRECTOR GENERAL DE ASUNTOS JURÍDICOS</b></td>
  <td align="center"><b>PUESTO PERSONA REVISO</b></td>
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
$elementos=1;
  if($elementos==1){
     $elaboro=$elaboro.'<tr><td align="center"><b><p>ELABORÓ<br><br><br></p></b><br><br><br><br><b>NOMBRE ELABORO<br>PUESTO ELABORO</b></td><td></td></tr>';
  }
$lineaPuestos='';
$lineaPuestos=$lineaPuestos.'<td align="center" colspan="0"  >'.$value.'</td>';



$html = <<<EOD
<table cellspacing="0" cellpadding="0" border="0" >
$elaboro
</table>
EOD;
$pdf->SetFont('helvetica', '', 10);
$pdf->writeHTML($html, true, false, false, false, '');


// -----------------------------------------------------------------------------

$to = '';
for ($i=0; $i <$copias ; $i++) { 
  $to .= '<br>';
}

$tbl = <<<EOD
  $to
  <table cellspacing="0" cellpadding="0" border="0">
    <tr><td colspan="6" align="left">Siglas</td>
    <td>Numero Oficio</td></tr>  
  </table>
EOD;
$pdf->SetFont('helvetica', '', 8);
$pdf->writeHTML($tbl, true, false, false, false, '');
// -----------------------------------------------------------------------------
//Close and output PDF document
ob_end_clean();
$pdf->Output('IFA-PREVIEW.pdf', 'I');

//============================================================+
// END OF FILE
//============================================================+