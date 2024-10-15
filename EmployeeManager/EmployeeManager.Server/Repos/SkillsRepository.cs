using EmployeeManager.Server.Entities;
using EmployeeManager.Server.Repos.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Server.Repos
{
    public class SkillsRepository : Repository<SkillsEntity>, ISkillsRepository
    {
        private EmployeesDbContext _dbContext => (EmployeesDbContext)_context;
        private readonly IConfiguration _config;

        public SkillsRepository(EmployeesDbContext context, IConfiguration config) : base(context)
        {
            _config = config;
        }

        public async override Task<SkillsEntity> AddAsync(SkillsEntity entity)
        {
            entity.Id = Guid.NewGuid();
            entity.SkillID = GenerateSkillID(entity.UserID);
            entity.isDeleted = false;
            await _dbContext.AddAsync(entity);
            await _dbContext.SaveChangesAsync();

            return entity;
        }

        private string GenerateSkillID(string userID)
        {
            Random random = new Random();

            string firstNumber = random.Next(1000, 9999).ToString();
            string secondNumber = random.Next(1000, 9999).ToString();

            string skillID = userID + firstNumber + secondNumber;

            var checkID = _dbContext.Skills.Where(x => x.SkillID == skillID).FirstOrDefault();
            if (checkID != null)
            {
                GenerateSkillID(userID);
            }
            return skillID;
        }
        public async Task<IEnumerable<SkillsEntity>> GetSkillsByUserID(string userID)
        {
            var skills = await _dbContext.Skills.Where(x => x.UserID == userID).ToListAsync();
            if (skills != null)
            {
                return skills;
            }
            return null;
        }

        public async Task<bool> DeleteSkillsByUserID(string userID)
        {
            var skills = await _dbContext.Skills.Where(x => x.UserID == userID).ToListAsync();
            if (skills.Count != 0)
            {

                foreach (var item in skills)
                {
                    item.isDeleted = true;
                    _dbContext.Update(item);
                }

                await _dbContext.SaveChangesAsync();
            }
            return false;
        }

        public async Task<bool> DeleteSkillsBySkillID(string skillID)
        {
            var skills = await _dbContext.Skills.Where(x => x.SkillID == skillID).FirstOrDefaultAsync();
            if (skills != null)
            {

                skills.isDeleted = true;
                _dbContext.Update(skills);
                await _dbContext.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<SkillsEntity> UpdateSkillsByUserID(SkillsEntity skillsModel)
        {
            var skills = await _dbContext.Skills.FirstOrDefaultAsync(x => x.UserID == skillsModel.UserID && x.SkillID == skillsModel.SkillID);
            if (skills != null)
            {

                skills.Name = skillsModel.Name;
                skills.YearsExperience = skillsModel.YearsExperience;
                skills.Seniority = skillsModel.Seniority;

                _dbContext.Update(skills);

                await _dbContext.SaveChangesAsync();

                return skills;
            }
            else if (skillsModel.UserID != null && skillsModel.SkillID == null)
            {

                skillsModel.Id = Guid.NewGuid();
                skillsModel.SkillID = GenerateSkillID(skillsModel.UserID);
                skillsModel.isDeleted = false;
                await _dbContext.AddAsync(skillsModel);
                await _dbContext.SaveChangesAsync();

                return skillsModel;
            }
            return null;
        }
    }
}
