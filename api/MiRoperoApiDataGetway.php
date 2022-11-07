<?php
print_r($_SERVER['SERVER_ADDR']);

/**
 	* MiRoperoApiDataGetway: Archivo de conexion al servicio de datos
 	* @author Pupila BIZ SRL <info@pupila.biz>
 	* @version 1.0
 	* @link https://www.pupila.biz
 	* @builddate 2022/09/22
 	**/
 	
/**
	* Datos de acceso a la API
	* @URL
	* @USER
	* @PASS
	**/	
$apidata_url  = "https://apidata.miropero.com.ar/";
$apidata_user = "accesomiroperoweb";
$apidata_pass = "#acc3s47dm1pp";


/**
	* Variables por GET
	* @CLASS
	* @METHOD
	**/
$class = !empty($_GET['class']) ? $_GET['class'] : false;
$method = !empty($_GET['method']) ? $_GET['method'] : false;


/**
	* Validaciones basicas 
	**/
	
if(!$class) die("La clase no fue definida");
if(!$method) die("El metodo no fue definido");

	
/**
	* TODO LOS QUE LLEGA POR $_POST SE ENVIA COMO PARAM AL SERVICIO
	**/
$params	= $_POST;

/**
	* TODO LOS QUE LLEGA POR $_FILES 
	* SE PROCESA CON CURLFILE Y SE ENVIA COMO PARAM AL SERVICIO
	**/
if( !empty($_FILES)){
	foreach($_FILES as $index => $file){
		$params[$index] = new CURLFile($file['tmp_name'], $file['type'], $file['name']);
	}
}

/**
	* Abro la conexion 
	**/	
$ch = curl_init();    
curl_setopt($ch, CURLOPT_URL, $apidata_url . "/" . $class . "/" . $method);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_USERPWD, $apidata_user . ":" . $apidata_pass); 
curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_ANY);    
curl_setopt($ch, CURLOPT_TIMEOUT, 10);
curl_setopt($ch, CURLOPT_POST, true);    
curl_setopt($ch, CURLOPT_POSTFIELDS, $params); // the SOAP request
       	
$response = curl_exec($ch); 
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

/**
	* Cierro la conexion 
	**/
curl_close($ch);		

/**
	* Si esta todo bien
	**/
if( $httpcode == 200 || $httpcode == 500){
	http_response_code($httpcode);  
	echo $response;		
}
else
{
	http_response_code(500);  
  header('Content-Type: application/json; charset=utf-8');
  die(json_encode(['status' => 'error', 'result' => $response]));    
}
?>