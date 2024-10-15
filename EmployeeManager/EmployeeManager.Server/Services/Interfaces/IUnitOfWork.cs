using EmployeeManager.Server.Repos.Interfaces;

namespace EmployeeManager.Server.Services.Interfaces
{
    public interface IUnitOfWork
    {
        IEmployeeRepository Employee { get; }
        IAddressRepository Address { get; }
        ISkillsRepository Skills { get; }
    }
}
