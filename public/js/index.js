let instellingen_tag = document.getElementById('instellingen');
let count_instelligen  = 0;
let instelligen;
let instelligen_inhoud;
let node_instellignen;


instellingen_tag.addEventListener('click', () => {
    count_instelligen += 1;
    if (count_instelligen == 1) {
        instelligen = document.createElement("div");
        instelligen_inhoud = document.createTextNode("Instelligen");
        instelligen.style = "background-color: gray; height: 250px;";
        instelligen.appendChild(instelligen_inhoud);
    
        node_instellignen = document.getElementById("instellingnode");
        node_instellignen.appendChild(instelligen);
    } else {
        instelligen.parentNode.removeChild(instelligen)
        count_instelligen = 0;
    }
})