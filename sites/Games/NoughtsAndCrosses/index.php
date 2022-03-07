<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet">
    <title>Noughts and Crosses</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <p>Click to play Noughts and Crosses<br/></p>
    <p onclick="restart()">Click here to restart</p>
    <div id="player"></div>
    <div class="row">
        <div id="0_0" onclick="place(this)"></div>
        <div id="1_0" onclick="place(this)"></div>
        <div id="2_0" onclick="place(this)"></div>
    </div>
    <div class="row">
        <div id="0_1" onclick="place(this)"></div>
        <div id="1_1" onclick="place(this)"></div>
        <div id="2_1" onclick="place(this)"></div>
    </div>
    <div class="row">
        <div id="0_2" onclick="place(this)"></div>
        <div id="1_2" onclick="place(this)"></div>
        <div id="2_2" onclick="place(this)"></div>
    </div>
    <div id="restart"></div>

    <script src="./main.js"></script>
</body>
</html>