<!doctype html>
<html class="no-js" lang="es">

<head>
  <meta charset="utf-8">
	  <title>MiRopero - Api DATA - jsLibraryTest </title>
	  <meta name="description" content="">
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<meta name="theme-color" content="#fafafa">  	
	</head>	
	<body>
  
  	<h1>Prueba de libreria de conexion a API</h1>  	
  	<h4>Debug console:</h4>
  	<div id="log" style="width:100%; height:400px; overflow:auto; border:1px solid #000;"></div>
  	<h4>TEST:</h4>
  	<button type="button" name="LIMPIAR" onclick="document.getElementById('log').innerHTML=''">LIMPIAR</button>
  	<br/><br/>
  	<button type="button" name="LOGIN OK" onclick="loginOk()">LOGIN OK</button>
  	<button type="button" name="LOGIN ERROR" onclick="loginError()">LOGIN ERROR</button>
  	<br/><br/>
  	<button type="button" name="TIENDAS IN HOME" onclick=" tiendasInHome()">TIENDAS IN HOME</button>
  	<br/><br/>
  	<button type="button" name="COLECCIONES ALL" onclick=" coleccionesAll()">COLECCIONES ALL</button>
  	<br/><br/>
  	<label>Avatar UPLOAD</label>
  	<input type="file" id="file_input_avatar">  	  	
  	<button type="button" name="UPLOAD AVATAR" onclick="uploadAvatar()">UPLOAD AVATAR</button>
  
  	<script>
  		(function () {
		    var old = console.log;
		    var logger = document.getElementById('log');
		    console.log = function () {
		      for (var i = 0; i < arguments.length; i++) {
		        if (typeof arguments[i] == 'object') {
		        	logger.innerHTML += (JSON && JSON.stringify ? JSON.stringify(arguments[i], undefined, 2) : arguments[i]) + '<br />';
		        } else {
		        	logger.innerHTML += "" + arguments[i] + '<br />';
		        }
		        logger.innerHTML += "</hr>";
		      }
		    }
			})();
  	</script>
		<script>			
			function loginOk()
			{
				
				const formData = new FormData();
							formData.append('email', 'esarias@gmail.com');
							formData.append('clave', '1234567890');
				
				fetch('/MiRoperoApiDataGetway.php?class=clientes&method=login', {
					method: 'POST',					
					body: formData
				})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});	
			
			}
			
			function loginError()
			{
				
				const formData = new FormData();
							formData.append('email', 'esarias@gmail.com');
							formData.append('clave', '123245');
				
				fetch('/MiRoperoApiDataGetway.php?class=clientes&method=login', {
					method: 'POST',					
					body: formData
				})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});	
				
			}  					
  		
  		function tiendasInHome()
  		{  			
				fetch('/MiRoperoApiDataGetway.php?class=tiendas&method=inhome ', {
					method: 'POST'
				})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});	
					
			}
  	
  		function coleccionesAll()
  		{  			
  			fetch('/MiRoperoApiDataGetway.php?class=colecciones&method=all  ', {
					method: 'POST'
				})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});			
			}  					
			
			function uploadAvatar(){
				
				const formData = new FormData();
							formData.append('idcliente', '36');
							formData.append('avatar', document.getElementById('file_input_avatar').files[0] );
				
				fetch('/MiRoperoApiDataGetway.php?class=clientes&method=update_avatar', {
					method: 'POST',					
					body: formData
				})
				.then((response) => response.json())
				.then((data) => {
					console.log('Success:', data);
				})
				.catch((error) => {
					console.error('Error:', error);
				});	
				
			}					
  	</script>  
	</body>
</html>