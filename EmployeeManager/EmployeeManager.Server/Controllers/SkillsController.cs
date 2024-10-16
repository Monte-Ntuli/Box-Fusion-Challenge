using AutoMapper;
using EmployeeManager.Server.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SkillsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<SkillsController> _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public SkillsController(IUnitOfWork unitOfWork, ILogger<SkillsController> logger, IMapper mapper, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _config = config;

        }

        #region Delete Skill
        [HttpDelete("DeleteSkillBySkillId/{skillId}")]
        public async Task<IActionResult> Delete(string skillId)
        {
            var employeeSkill = await _unitOfWork.Skills.DeleteSkillsBySkillID(skillId);
            return Ok(employeeSkill);
        }
        #endregion
    }
}
