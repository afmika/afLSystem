const links = [
    {
        text : "Basic", 
        value : "./basic.html"
    },
    {
        text : "Algae", 
        value : "./algae.html"
    },
    {
        text : "Dragon", 
        value : "./dragon.html"
    },
    {
        text : "Koch's curve", 
        value : "./koch.html"
    },
    {
        text : "Sierpinski", 
        value : "./sierpinski.html"
    }
];

links.forEach(link => {
    document.querySelector("#link_list").innerHTML +=
    `<a href="${link.value}">
        <button class="btn btn-primary btn-lg btn-block" type="button">
            ${link.text}
        </button>
        <br/>
    </a>`;
});