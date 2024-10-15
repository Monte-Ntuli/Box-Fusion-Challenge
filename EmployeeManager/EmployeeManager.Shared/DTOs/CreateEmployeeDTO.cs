using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Shared.DTOs
{
    public class CreateEmployeeDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public DateTime DOB { get; set; }
        public bool isDeleted { get; set; }
        public Address Addresss { get; set; } = new Address();
        public List<Skill> Skills { get; set; } = new List<Skill>();

        public class Address
        {
            public string StreetAddress { get; set; }
            public string City { get; set; }
            public string PostalCode { get; set; }
            public string Country { get; set; }
        }

        public class Skill
        {
            public string SkillID { get; set; }
            public string Name { get; set; }
            public int YearsExperience { get; set; }
            public string Seniority { get; set; }
        }
    }
}
