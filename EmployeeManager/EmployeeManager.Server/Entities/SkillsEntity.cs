using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace EmployeeManager.Server.Entities
{
    public class SkillsEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string UserID { get; set; }
        public string SkillID { get; set; }
        public string Name { get; set; }
        public int YearsExperience { get; set; }
        public string Seniority { get; set; }
        public bool isDeleted { get; set; }
    }
}
