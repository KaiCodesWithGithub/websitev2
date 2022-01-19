<?php

$message = '<p>hi</p>'

if($_POST["message"]) {

    

mail("kai@homehacks.tk", "Here is the subject line", $message, "From: website@homehacks.tk");


}


?>

