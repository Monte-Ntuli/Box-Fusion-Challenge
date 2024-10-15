using EmployeeManager.Server.Entities;

namespace EmployeeManager.Server.Repos.Interfaces
{
    public interface ISkillsRepository
    {
        Task<SkillsEntity> AddAsync(SkillsEntity entity);
        Task<IEnumerable<SkillsEntity>> GetSkillsByUserID(string userID);
        Task<bool> DeleteSkillsByUserID(string userID);
        Task<bool> DeleteSkillsBySkillID(string skillID);
        Task<SkillsEntity> UpdateSkillsByUserID(SkillsEntity skillsModel);
    }
}
