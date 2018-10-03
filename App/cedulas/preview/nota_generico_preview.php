<?php  

require_once('./../tcpdf/tcpdf.php');




/*-------------Conexion a BD  ---------------------*/
function conecta(){
    try{
      require './../../../../src/conexion.php';
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

/*---------------- Consultas ------------------*/


$datos = [
    'idVolante' => $_GET['idVolante'],
    'nombreRemitente' => $_GET['nombreRemitente'],
    'puestoRemitente' => $_GET['puestoRemitente'],
    'texto' => $_GET['texto'],
    'atte' => $_GET['atte'],
    'copias' => $_GET['copias'],
    'siglas' => $_GET['siglas'],
  
  ];

  /*
foreach ($datos as $key => $value) {
    if(empty($value)){
      header('Location: /SIA/juridico/Public/cedula.html');
    }
    
  }*/
  $datos['institucion'] = $_GET['institucion'];
  

/*------------------ Configuracion del PDF -----------------*/



$pageLayout = array(216, 279); //  or array($height, $width) 

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, 'mm', $pageLayout, true, 'UTF-8', false);



$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de Mexico');
$pdf->SetTitle('NOTA-GENERICA');
$pdf->SetSubject('NOTA-GENERICA');
$pdf->SetKeywords('NOTA-GENERICA');


// remove default header/footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

$pdf->SetFooterMargin('25');


// set margins
$pdf->SetMargins('25','24','24',true);
$pdf->SetFooterMargin('21');
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


$pdf->SetFont('helvetica', '', 11);
$pdf->AddPage('P','LETTER',true);

/*-------------------------- Encabezado (LOGO Y FECHA) ---------------------*/



$text1 = '
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td width="264"><img src="../img/logo-top.png"/></td>
        <td width="323"><p style="text-align:justify"><b>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br><br>AREA QUE ELABORA LA CEDULA<br><br>NOTA INFORMATIVA</b><br><br>Ciudad de México, 01 DE ENERO DE 2018<br><br><i>"Fiscalizar con Integridad para Prevenir y Mejorar"</i></p></td>
    </tr>
</table><p></p>';



/*

if($area_header[0]['idArea'] == 'DGAJ'){

$text1 = '
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td width="264"><img src="img/logo-top.png"/></td>
        <td width="323"><p><b>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br><br>NOTA INFORMATIVA</b><br><br>Ciudad de México, 01 DE ENERO DE 2018<br><br><i>"Fiscalizar con Integridad para Prevenir y Mejorar".</i></p></td>
    </tr>
</table><p></p>';
}
*/

$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($text1);




/*----------------------- PARA: Y DE: ---------------------*/


$tbl = <<<EOD

<table cellspacing="0" cellpadding="0" border="0" style="line-height:16px">
    <tr>
        <td width="60"><b>PARA:</b></td>
        <td width="350"><b>{$datos['nombreRemitente']}<br>{$datos['puestoRemitente']}</b></td>
    </tr>
    <tr>
        <td rowspan="2"><b><br>DE: </b></td>
        <td colspan="8"><b><br>PERSONA QUE FIRMA LA CEDULA<br>PUESTO PERSONA FIRMA LA CEDULA</b></td>
      
    </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');


/*------------------ TEXTO CUERPO ---------------------*/
//$texto = mb_strtoupper($confronta[0]['texto'],'utf-8');
$texto = $datos['texto'];
$pdf->SetFont('helvetica', '', 11);
$tbl = <<<EOD
$texto
EOD;

$pdf->writeHTML($tbl, true, 0, false, false,'J');






/*-------------- ATENTAMENTE --------------------*/

$to ='';
for($i=0;$i<$datos['atte'];$i++){
    $to .= '<br>';
}

$tbl = <<<EOD
$to
<br>
<p>Sin otro particular, hago propicia la ocasión para enviarle un coordial saludo. </p>
<p><b>ATENTAMENTE</b></p>
<p></p><p></p><p></p>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



$pdf->SetFont('helvetica', '', 8);
$to ='';
for($i=0;$i<$datos['copias'];$i++){
    $to .= '<br>';
}
$tbl = <<<EOD
$to
<table cellspacing="0" cellpadding="0" border="">
    <tr>
      <td width="30">c.c.p.</td> 
      <td width="555">Persona a las que va dirigido el documento</td>
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



/*---------------¨PIE DE PAGINA ----------------*/

$to ='';
for($i=0;$i<$datos['siglas'];$i++){
    $to .= '<br>';
}
$tbl = <<<EOD
$to
<table cellspacing="0" cellpadding="1" border="0" >
    <tr >
        <td style="text-align:left">FOLIO<br><br>SIGLAS</td>
        <td style="text-align:right">Ref. REFERENCIA</td>
       
       
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');




$pdf->Output('NOTA-PREVIEW.pdf', 'I');

?>
