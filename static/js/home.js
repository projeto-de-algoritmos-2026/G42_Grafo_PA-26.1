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

// adiciona
function adicionarNo(id, nome) {
    nodes.add({ id, nomme });
    grafo01.nodes.push({ id, nome });
}


// diciona aresta
function adicionarAresta(from, to) {
    const aresta = { from, to };
    edges.add(aresta);
    grafo01.edges.push(aresta);
}

// manda salvar
async function salvarGrafo() {
    const res = await fetch("/grafo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(grafo01)
    });

    const resultado = await res.json();
    console.log("Resposta do servidor:", resultado);
}

init();