const routes=[
    {path:'/autores',component:autor},
    {path:'/generos',component:genero},
    {path:'/livros',component:livro}
]

const router=new VueRouter({
    routes
})

const app=new Vue({
    router
}).$mount('#app')