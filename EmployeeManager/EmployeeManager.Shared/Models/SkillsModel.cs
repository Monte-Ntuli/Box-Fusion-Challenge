using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Shared.Models
{
    public class SkillsModel
    {
        public string UserID { get; set; }
        public string SkillID { get; set; }
        public string Name { get; set; }
        public int YearsExperience { get; set; }
        public string Seniority { get; set; }
    }
}
