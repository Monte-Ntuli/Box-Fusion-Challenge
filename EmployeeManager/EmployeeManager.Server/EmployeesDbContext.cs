using EmployeeManager.Server.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace EmployeeManager.Server
{
    public class EmployeesDbContext : DbContext
    {
        public virtual DbSet<EmployeeEntity> Employees { get; set; }
        public virtual DbSet<SkillsEntity> Skills { get; set; }
        public virtual DbSet<AddressEntity> Address { get; set; }
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
