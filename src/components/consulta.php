<?php
  //require("config.php");
  $mysqli = new mysqli ('localhost','root','107005205','test');
  $mysqli->query("SET ID 'utf8'");
  if ($mysqli->connect_error) {
      echo "Hay un problema con el servidor: (" . $mysqli->connect_errno .") " . $mysqli->connect_error;
      
  }

  $results = $mysqli->query("SELECT id, temp, tiempo FROM test");
  echo "let datosTemp=[";
  while($row = $results->fetch_object()){
      echo "{";
      echo "id:'". $row->id ."',";
      echo "temp: '". $row->temp ."',";
      echo "fecha: '". $row->tiempo ."'},";
      //echo "<br />";
  }
  echo "];";
  $mysqli->close();

?>
