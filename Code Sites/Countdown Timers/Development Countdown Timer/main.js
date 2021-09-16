const counter = document.querySelector('.counter');
const buttonsDiv = document.querySelector('.buttons');
const secInput = document.getElementById('seconds');

var seconds = 0;
var remseconds = 0;
var minuts = 0;
var toCount = false;

function toSubmit(){
    display("start");
    display("back");
    display("counter");
    remove("seconds");
    remove("ok");
    seconds = Number(secInput.value);
    counting();
}

function toBack(){
    display("seconds");
    display("ok");
    remove("back");
    remove("start");
    remove("stop");
    remove("continue");
    remove("counter");
    seconds = Number(secInput.value);
    toCount = false;
    seconds--;
    remseconds = seconds % 60;
    minuts = Math.floor(seconds / 60);
}

function display(e){
    document.getElementById(e).style.display = 'block';
}

function remove(e){
    document.getElementById(e).style.display = 'none';
}

function check(stat){
    toCount = stat.value;
    if(stat.id == "start"){
        display("stop");
        display("back");
        remove("start");
    } else if(stat.id == "stop"){
        display("continue");
        display("back");
        remove("stop");
    } else {
        display("stop");
        display("back");
        remove("continue");
    }
}

function count(){
    if(seconds > 0){
        if(toCount == true){
            seconds--;
            remseconds = seconds % 60;
            minuts = Math.floor(seconds / 60);

            if(remseconds < 10){
                remseconds = "0" + remseconds;
            }

            if(minuts < 10){
                minuts = "0" + minuts;
            }
        
            counter.innerHTML = minuts + " : " + remseconds;
        }
    } else {
        counter.innerHTML = "DONE!";
        display("back");
        remove("continue");
        remove("stop")
    }
}

function counting(){
    remseconds = seconds % 60;
    minuts = Math.floor(seconds / 60);

    if(remseconds < 10){
        remseconds = "0" + remseconds;
    }

    if(minuts < 10){
        minuts = "0" + minuts;
    }

    counter.innerHTML = minuts + " : " + remseconds;
    setInterval(count, 1000);
}