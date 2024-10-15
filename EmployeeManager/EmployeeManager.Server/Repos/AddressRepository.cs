using EmployeeManager.Server.Entities;
using EmployeeManager.Server.Repos.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Server.Repos
{
    public class AddressRepository : Repository<AddressEntity>, IAddressRepository
    {
        private EmployeesDbContext _dbContext => (EmployeesDbContext)_context;
        private readonly IConfiguration _config;

        public AddressRepository(EmployeesDbContext context, IConfiguration config) : base(context)
        {
            _config = config;
        }

        public async override Task<AddressEntity> AddAsync(AddressEntity entity)
        {
            var check = await _dbContext.Address.FirstOrDefaultAsync(x => x.UserID == entity.UserID);

            if (check == null)
            {
                entity.Id = Guid.NewGuid();
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

        public async Task<AddressEntity> GetAddressByUserID(string userID)
        {
            var address = await _dbContext.Address.FirstOrDefaultAsync(x => x.UserID == userID);
            if (address != null)
            {
                return address;
            }
            return null;
        }

        public async Task<bool> DeleteAddressByUserID(string userID)
        {
            var address = await _dbContext.Address.FirstOrDefaultAsync(x => x.UserID == userID);
            if (address != null)
            {
                address.isDeleted = true;
                _dbContext.Update(address);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<AddressEntity> UpdateAddressByID(AddressEntity addressModel)
        {
            var address = await _dbContext.Address.FirstOrDefaultAsync(x => x.UserID == addressModel.UserID);
            if (address != null)
            {
                address.StreetAddress = addressModel.StreetAddress;
                address.City = addressModel.City;
                address.PostalCode = addressModel.PostalCode;
                address.Country = addressModel.Country;

                _dbContext.Update(address);
                await _dbContext.SaveChangesAsync();
                return address;
            }
            return null;
        }
    }
}
