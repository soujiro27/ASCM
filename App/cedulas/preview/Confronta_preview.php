<?php  

require_once('./../tcpdf/tcpdf.php');
$siglas = $_GET['siglas'];



/*------------------ Configuracion del PDF -----------------*/


$pageLayout = array(216, 279); //  or array($height, $width) 

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, 'mm', $pageLayout, true, 'UTF-8', false);



$pdf->SetCreator(PDF_CREATOR);
$pdf->SetAuthor('Auditoria Superior de la Ciudad de Mexico');
$pdf->SetTitle('Confronta');
$pdf->SetSubject('Confronta');
$pdf->SetKeywords('Confronta');


// remove default header/footer
$pdf->setPrintHeader(false);
$pdf->setPrintFooter(false);

$pdf->SetFooterMargin('25');


// set margins
$pdf->SetMargins('24','24','24',true);
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












/*------------------ Funciones ----------------*/


function texto_confronta(){

	$array_clave_auditoria = explode('-',$confronta[0]['idPrograma']);


	$textoNota='Hago referencia a su Nota Informativa PRUEBAS';
	$texto='Hago referencia a su oficio Pruebas';
	$textoDos=' y Nota Informativa Pruebas';
	$textoTres=' mediante los cuales solicita se proporcione el nombre del servidor público que asistira a la reunión de Confronta, correspondiente a la Cuenta Pública 2018, sobre el particular, se informa el nombre del representante:';
    
    $textoFinal=$textoNota.$textoTres;
	return $textoFinal;

}


/*-------------------------- Encabezado (LOGO Y FECHA) ---------------------*/

$text1 = '
<table cellspacing="0" cellpadding="0" border="0">
    <tr>
        <td width="264"><img src="../img/logo-top.png"/></td>
        <td width="323"><p style="text-align:justify"><b>DIRECCIÓN GENERAL DE ASUNTOS JURÍDICOS<br><br>NOTA INFORMATIVA</b><br><br>Ciudad de México, 01 Enero de 2018 <br><br><i>"Fiscalizar con Integridad para Prevenir y Mejorar".</i></p></td>
    </tr>
</table>';
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($text1);
 



/*----------------------- PARA: Y DE: ---------------------*/

$tbl = <<<EOD
<br><br>
<table cellspacing="0" cellpadding="0" border="0" style="line-height:15px">
    <tr>
        <td width="60"><b>PARA:</b></td>
        <td width="350"><b>TITULAR DE AREA<br>PUESTO DEL AREA</b></td>
    </tr>
    <tr>
        <td rowspan="2"><b><br>DE: </b></td>
        <td colspan="8"><b><br>DR. IVÁN DE JESÚS OLMOS CANSINO<br>DIRECTOR GENERAL DE ASUNTOS JURÍDICOS</b></td>
      
    </tr>

</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');


/*--------------------- TEXTO CONFRONTA -----------------------*/

$texto = texto_confronta();


$tbl = <<<EOD
  <br>
	<p style="text-align:justify">$texto</p><br>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');



/*-------------------- TABLA DATOS CONFRONTA ---------------*/

$tbl = <<<EOD
<table cellspacing="0" cellpadding="1" border="1" style="text-align:center" width="587">
    <tr style="background-color:#efefef">
        <td>ENTIDAD</td>
        <td>CLAVE</td>
        <td>DIA/HORA</td>
        <td>ASISTE</td>
        <td>CARGO</td>
    </tr>
    <tr>
    	<td>PRUEBAS</td>
        <td>PRUEBAS</td>
        <td>
        	01/01/0101
			<br>
			15:00
        </td>
        <td>Persona que Asiste</td>
        <td>Cargo que Asiste</td>
    </tr>
</table>
EOD;
$pdf->SetFont('helvetica', '', 8);
$pdf->writeHTML($tbl, true, false, false, false, '');


/*-------------- TEXTO PIE DE PAGINA --------------------*/



$tbl = <<<EOD
<p>Sin otro particular, hago propicia la ocasión para enviarle un coordial saludo.</p>
<br><br><br>
<br><p><b>ATENTAMENTE</b></p>

EOD;
$pdf->SetFont('helvetica', '', 11);
$pdf->writeHTML($tbl, true, false, false, false, '');


/*--------------------- SIGLAS -------------------*/

$pdf->SetFont('helvetica', '', 8);
$to ='';
for($i=0;$i<$siglas;$i++){
    $to .= '<br>';
}

$tbl = <<<EOD
<br><br>$to
<table cellspacing="0" cellpadding="1" border="0" >
    <tr >
        <td style="text-align:left">FOLIO<br><br>SIGLAS</td>
        <td style="text-align:right"><br>Referencia</td>
    </tr>
</table>
EOD;

$pdf->writeHTML($tbl, true, false, false, false, '');


ob_end_clean();
$pdf->Output('Confronta-Preview.pdf', 'I');

?>
