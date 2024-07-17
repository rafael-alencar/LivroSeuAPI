const livro={template:`
    <div>
        
        <h1>Livros</h1>

        <button type="button"
        class="btn btn-primary m-2 fload-end"
        data-bs-toggle="modal"
        data-bs-target="#livroModal"
        @click="addClick()">
        Adicionar
        </button>

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nome</th>
                    <th>Gênero</th>
                    <th>Autor</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="livro in livros">
                    <td>{{livro.id}}</td>
                    <td>{{livro.nome}}</td>
                    <td>{{livro.genero}}</td>
                    <td>{{livro.autor}}</td>
                    <td>
                        <button type="button"
                        class="btn btn-light mr-1"
                        data-bs-toggle="modal"
                        data-bs-target="#livroModal"
                        @click="editClick(livro)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                            </svg>
                        </button>
                        <button type="button" class="btn btn-light mr-1" @click="deleteClick(livro.id)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                            </svg>
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div class="modal fade" id="livroModal" tabindex="-1" aria-labelledby="livroModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="livroModalLabel">{{modalTitle}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
                    </div>
                    <div class="modal-body">
                        <div class="d-flex flex-row bd-highlight m-3">
                            <div class="p-2 w-50 bd-highlight">
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Nome</span>
                                    <input type="text" class="form-control" v-model="nome" />
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Gênero</span>
                                    <select class="form-select" v-model="genero">
                                        <option v-for="genero in generos">
                                        {{genero.nome}}
                                        </option>
                                    </select>
                                </div>
                                <div class="input-group mb-3">
                                    <span class="input-group-text">Autor</span>
                                    <select class="form-select" v-model="autor">
                                        <option v-for="autor in autores">
                                        {{autor.nome}}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <button type="button" v-if="id==0" class="btn btn-primary" @click="createClick()">Criar</button>
                        <button type="button" v-if="id!=0" class="btn btn-primary" @click="updateClick()">Editar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`,

data(){
    return{
        livros:[],
        generos:[],
        autores:[],
        modalTitle:"",
        id:0,
        nome:"",
        genero:"",
        autor:""
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL + "Livros")
        .then((response)=>{
            this.livros=response.data;
        });
        axios.get(variables.API_URL + "Generos")
        .then((response)=>{
            this.generos=response.data;
        });
        axios.get(variables.API_URL + "Autores")
        .then((response)=>{
            this.autores=response.data;
        });
    },
    addClick(){
        this.modalTitle="Adicionar Livro";
        this.id=0;
        this.nome="";
        this.genero="";
        this.autor="";
    },
    editClick(livro){
        this.modalTitle="Editar Livro";
        this.id=livro.id;
        this.nome=livro.nome;
        this.genero=livro.genero;
        this.autor=livro.autor;
    },
    createClick(){
        axios.post(variables.API_URL + "Livros",{
            nome:this.nome,
            genero:this.genero,
            autor:this.autor
        })
        .then((response)=>{
            this.refreshData();
        })
    },
    updateClick(){
        axios.put(variables.API_URL + "Livros/"+ this.id,{
            id:this.id,
            nome:this.nome,
            genero:this.genero,
            autor:this.autor
        })
        .then((response)=>{
            this.refreshData();
        })
    },
    deleteClick(id){
        if(!confirm("Tem certeza que deseja excluir?")) {
            return;
        }
        axios.delete(variables.API_URL + "Livros/" + id)
        .then((response)=>{
            this.refreshData();
        })
    }
},
mounted:function(){
    this.refreshData();
}

}