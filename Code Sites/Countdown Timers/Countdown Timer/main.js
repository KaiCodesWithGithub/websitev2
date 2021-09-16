const counter = document.querySelector('.counter');
const buttonsDiv = document.querySelector('.buttons');
const secInput = document.getElementById('seconds');

var seconds;
var remseconds;
var minuts;
var toCount = false;

function toSubmit(){
    display('start');
    remove('seconds');
    remove('ok');
    seconds = Number(secInput.value);
    counting();
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
        remove("start");
    } else if(stat.id == "stop"){
        display("continue");
        remove("stop");
    } else {
        display("stop");
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
        buttonsDiv.style.opacity = "0";
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