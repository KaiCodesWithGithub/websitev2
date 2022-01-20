// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

function openNav() {
    document.getElementById("sideNav").style.width = "250px";
}

function closeNav() {
    document.getElementById("sideNav").style.width = "0";
}

ui.start('#firebaseui-auth-container', {
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    // Other config options...
});

// const sideNav = document.getElementsByClassName("sideNav")
//
// const sitesFolders = fs.readdirSync("./sites")
//
// function createNewElement(folderName, path) {
//     var tag = document.createElement("a")
//     var text = document.createTextNode(`${folderName}`)
//     tag.href = `${path}/index.html`
//     tag.appendChild(text)
//     var element = sideNav
//     element.appendChild(tag)
// }
//
// for (folder in sitesFolders) {
//     createNewElement(folders, './sites')
// }