from flask import Flask,request,jsonify,render_template 
from algoritmos import carregar_grafo,salvar_grafo,ordenacao_topologica,converte_json,BFS

app= Flask("__name__")

@app.route('/')
def index():
    return render_template("index.html")

@app.route("/app/<nome>")
def app_abrir(nome):
    return render_template("home.html",nome_grafo=nome)

@app.route("/grafo")
def home():
    #grafo=carregar_grafo()
    return render_template("home.html")

# Onde o grafo eh carregado para o fetch do js
@app.route("/grafo/<nome>", methods=["GET","POST"])
def get_grafo(nome):
    grafo=carregar_grafo(nome)
    if request.method =="POST":
        grafo=request.get_json()
        salvar_grafo(grafo,nome)
        return jsonify({"status": "ok"})
    return jsonify(grafo)



@app.route("/ordem_top/<nome>")
def get_ordem(nome):
    data=carregar_grafo(nome)
    grafo=converte_json(data)
    ordem=ordenacao_topologica(grafo)
    return jsonify(ordem)

@app.route("/bfs/<nome>",methods=["GET","POST"])
def get_bfs(nome):
    if request.method =='POST':
        data=carregar_grafo(nome)
        grafo=converte_json(data)
        data=request.get_json()
        inicio=data['inicio']
        if inicio not in grafo:
            return jsonify({"erro": "No invalido"})
        bfs=BFS(grafo,inicio)
        return jsonify(bfs)


if __name__ == "__main__":
    app.run(debug=True)