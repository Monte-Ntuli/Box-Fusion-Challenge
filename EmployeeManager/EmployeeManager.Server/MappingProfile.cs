using AutoMapper;
using EmployeeManager.Server.Entities;
using EmployeeManager.Shared.Models;

namespace EmployeeManager.Server
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<EmployeeEntity, EmployeeModel>();
            CreateMap<EmployeeModel, EmployeeEntity>();

            CreateMap<AddressEntity, AddressModel>();
            CreateMap<AddressModel, AddressEntity>();

            CreateMap<SkillsEntity, SkillsModel>();
            CreateMap<SkillsModel, SkillsEntity>();
        }
    }
}
