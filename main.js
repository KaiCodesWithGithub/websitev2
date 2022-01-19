function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

const sideNav = document.getElementsByClassName("sideNav")

const fs = require('fs')

const sitesFolders = fs.readdirSync("./sites")

function createNewElement(folderName, path) {
    var tag = document.createElement("a")
    var text = document.createTextNode(`${folderName}`)
    tag.href = `${path}/index.html`
    tag.appendChild(text)
    var element = sideNav
    element.appendChild(tag)
}

//for (folder in sitesFolders) {
    createNewElement(folder, './sites')
//}