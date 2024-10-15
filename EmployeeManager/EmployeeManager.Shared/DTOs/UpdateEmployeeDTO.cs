using EmployeeManager.Shared.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Shared.DTOs
{
    public class UpdateEmployeeDTO
    {
        public string UserID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string PhoneNum { get; set; }
        public DateTime DOB { get; set; }
        public bool isDeleted { get; set; }
        public AddressModel Addresss { get; set; } = new AddressModel();
        public List<SkillsModel> Skills { get; set; } = new List<SkillsModel>();

    }
}
