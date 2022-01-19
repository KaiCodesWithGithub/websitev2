const { fstat } = require('fs');

function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

const fs = require('fs')

fs.readdirSync("./sites").filter(file => file.endsWith('.html'))