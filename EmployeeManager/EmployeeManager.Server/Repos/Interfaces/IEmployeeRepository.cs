using EmployeeManager.Server.Entities;

namespace EmployeeManager.Server.Repos.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<EmployeeEntity> AddAsync(EmployeeEntity entity);
        Task<IEnumerable<EmployeeEntity>> GetAllEmployees();
        Task<EmployeeEntity> GetEmployeeByID(string userID);
        Task<bool> DeleteEmployeeByID(string userID);
        Task<EmployeeEntity> UpdateEmployeeByID(EmployeeEntity employeeModel);
    }
}
