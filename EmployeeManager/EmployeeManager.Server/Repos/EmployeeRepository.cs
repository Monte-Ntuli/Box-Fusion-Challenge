using EmployeeManager.Server.Entities;
using EmployeeManager.Server.Repos.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Server.Repos
{
    public class EmployeeRepository : Repository<EmployeeEntity>, IEmployeeRepository
    {
        private EmployeesDbContext _dbContext => (EmployeesDbContext)_context;
        private readonly IConfiguration _config;

        public EmployeeRepository(EmployeesDbContext context, IConfiguration config) : base(context)
        {
            _config = config;
        }

        public async override Task<EmployeeEntity> AddAsync(EmployeeEntity entity)
        {
            var check = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Email == entity.Email && x.isDeleted == false);

            if (check == null)
            {
                entity.Id = Guid.NewGuid();
                entity.UserID = GenerateUserID();
                entity.isDeleted = false;
                await _dbContext.AddAsync(entity);
                await _dbContext.SaveChangesAsync();

                return entity;
            }
            if (check != null)
            {
                return null;
            }
            else return null;

        }
        private string GenerateUserID()
        {
            Random random = new Random();
            string letters = new string(Enumerable.Repeat("ABCDEFGHIJKLMNOPQRSTUVWXYZ", 2)
                                       .Select(s => s[random.Next(s.Length)]).ToArray());
            string numbers = random.Next(1000, 9999).ToString();
            string userID = letters + numbers;

            var checkID = _dbContext.Employees.Where(x => x.UserID == userID).FirstOrDefault();
            if (checkID != null)
            {
                GenerateUserID();
            }
            return userID;
        }

        public async Task<IEnumerable<EmployeeEntity>> GetAllEmployees()
        {
            return await _dbContext.Employees.Where(x => x.isDeleted == false).ToListAsync();
        }

        public async Task<EmployeeEntity> GetEmployeeByID(string userID)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.UserID == userID);
            if (employee != null)
            {
                return employee;
            }
            return null;
        }

        public async Task<bool> DeleteEmployeeByID(string userID)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.UserID == userID);
            if (employee != null)
            {
                employee.isDeleted = true;
                _dbContext.Update(employee);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<EmployeeEntity> UpdateEmployeeByID(EmployeeEntity employeeModel)
        {
            var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.UserID == employeeModel.UserID);
            if (employee != null)
            {
                employee.FirstName = employeeModel.FirstName;
                employee.LastName = employeeModel.LastName;
                employee.Email = employeeModel.Email;
                employee.PhoneNum = employeeModel.PhoneNum;
                employee.DOB = employeeModel.DOB;

                _dbContext.Update(employee);
                await _dbContext.SaveChangesAsync();
                return employee;
            }
            return null;
        }

    }
}
