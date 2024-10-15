using System.Collections.Generic;
using System.Reflection.Emit;

namespace EmployeeManager.Server
{
    public class EmployeeDbContext : DbContext
    {
        public EmployeesDbContext(DbContextOptions options) : base(options) { }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
        }
    }
}
