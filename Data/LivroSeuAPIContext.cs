using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LivroSeuAPI.Model;

namespace LivroSeuAPI.Data
{
    public class LivroSeuAPIContext : DbContext
    {
        public LivroSeuAPIContext (DbContextOptions<LivroSeuAPIContext> options)
            : base(options)
        {
        }

        public DbSet<LivroSeuAPI.Model.Autor> Autor { get; set; } = default!;
        public DbSet<LivroSeuAPI.Model.Genero> Genero { get; set; } = default!;
        public DbSet<LivroSeuAPI.Model.Livro> Livro { get; set; } = default!;
    }
}
