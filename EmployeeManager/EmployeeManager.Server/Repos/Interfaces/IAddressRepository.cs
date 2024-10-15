using EmployeeManager.Server.Entities;

namespace EmployeeManager.Server.Repos.Interfaces
{
    public interface IAddressRepository
    {
        Task<AddressEntity> AddAsync(AddressEntity entity);
        Task<AddressEntity> GetAddressByUserID(string userrID);
        Task<bool> DeleteAddressByUserID(string userID);
        Task<AddressEntity> UpdateAddressByID(AddressEntity addressModel);
    }
}
