let instellingen_tag = document.getElementById('instellingen');
let c = document.getElementsByClassName("instelling");


instellingen_tag.addEventListener('click', () => {
    console.log("open instelligen")
    let instelligen = document.createElement("div");
    let instelligen_inhoud = document.createTextNode("Hallo wereld");
    instelligen.appendChild(instelligen_inhoud);

    instelligen.style = "background-color: gray; height: 250px;";

    let node_instellignen = document.getElementById("instellingnode");
    node_instellignen.appendChild(instelligen);
})