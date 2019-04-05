let instellingen_tag = document.getElementById('instellingen');
let c = document.getElementsByClassName("instelling");
let count_instelligen  = 0;



instellingen_tag.addEventListener('click', () => {
    count_instelligen += 1;
    if (count_instelligen == 1) {
        let instelligen = document.createElement("div");
        let instelligen_inhoud = document.createTextNode("Hallo wereld");
        instelligen.style = "background-color: gray; height: 250px;";
        instelligen.appendChild(instelligen_inhoud);
    
        let node_instellignen = document.getElementById("instellingnode");
        node_instellignen.appendChild(instelligen);
    } else {
        console.log(count_instelligen)
    }
})