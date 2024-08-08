using KoEnAPI.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace KoEnAPI.Data
{
    public class KoEnAPIDbContext : DbContext
    {
        public KoEnAPIDbContext(DbContextOptions options) : base(options)
        { 
        }

        public DbSet<TranslationPair> TranslationPairs { get; set; }
    }
}
