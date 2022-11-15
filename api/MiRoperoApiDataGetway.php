<?php
/**
 	* MiRoperoApiDataGetway: Archivo de conexion al servicio de datos
 	* @author Pupila BIZ SRL <info@pupila.biz>
 	* @version 1.0
 	* @link https://www.pupila.biz
 	* @builddate 2022/09/22
 	**/

/** Validacion 1
	* si no viene con referer 	
	* informo 404
	**/	
if(empty($_SERVER['HTTP_REFERER'])){
	header("HTTP/1.0 404 Not Found");	
	die();	
}

/** validacion 2 
	* cors
	**/
	
Decide if the origin in $_SERVER['HTTP_ORIGIN'] is one
you want to allow, and if so:
header("Access-Control-Allow-Origin: apidata.miropero.com.ar");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Max-Age: 86400');    // cache for 1 day
 

/** Validacion 2
	* verifico que el dominio del referer sea el mismo que le dominio
	* Sino, informo 404
	**/	

if(strpos($_SERVER['HTTP_REFERER'], 'www.miropero.ar') === false){
	header("HTTP/1.0 404 Not Found");	
	die();	
}

/*
echo "<pre>";
print_r($_SERVER['HTTP_REFERER']);
echo "</pre>";
*/
/**
	* Datos de acceso a la API
	* @URL
	* @USER
	* @PASS
	**/	
    $apidata_url  = $_ENV["REACT_APP_URL"];
    $apidata_user = $_ENV["REACT_APP_USER"];
    $apidata_pass = $_ENV["REACT_APP_PASS"];
    
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
    // $params	= $_POST;
    $params = $_REQUEST;
    $params['__'] = base64_encode(serialize(['u'=>$apidata_user,'p'=>$apidata_pass,'t'=>time()]));
    
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
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
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