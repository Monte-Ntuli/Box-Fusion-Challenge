using EmployeeManager.Server.Repos;
using EmployeeManager.Server.Repos.Interfaces;
using EmployeeManager.Server.Services.Interfaces;

namespace EmployeeManager.Server.Services
{
    public class UnitOfWork : IUnitOfWork
    {
        readonly EmployeesDbContext _context;

        private readonly IConfiguration _config;

        public UnitOfWork(EmployeesDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }
        public IEmployeeRepository _employee;
        public IEmployeeRepository Employee
        {
            get
            {
                if (_employee == null)
                {
                    _employee = new EmployeeRepository(_context, _config);
                }
                return _employee;
            }
        }

        public IAddressRepository _address;
        public IAddressRepository Address
        {
            get
            {
                if (_address == null)
                {
                    _address = new AddressRepository(_context, _config);
                }
                return _address;
            }
        }

        public ISkillsRepository _skills;
        public ISkillsRepository Skills
        {
            get
            {
                if (_skills == null)
                {
                    _skills = new SkillsRepository(_context, _config);
                }
                return _skills;
            }
        }
    }
}
