let grafo01;        
let nodes, edges, network; 

async function init() {
    await carregarGrafo();   
    iniciarGrafo(grafo01); 
}

async function carregarGrafo() {
    const res = await fetch("/grafo");
    grafo01 = await res.json();
    console.log("aqui", grafo01);
}

function iniciarGrafo(visGrafo) {
    const container = document.getElementById('grafo');


    nodes = new vis.DataSet(visGrafo.nodes);
    edges = new vis.DataSet(visGrafo.edges);

    const data = { nodes, edges };

    const options = {
        edges: { arrows: 'to' }
    };

    network = new vis.Network(container, data, options);
}


init();