using AutoMapper;
using EmployeeManager.Server.Entities;
using EmployeeManager.Server.Services.Interfaces;
using EmployeeManager.Shared.DTOs;
using EmployeeManager.Shared.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static EmployeeManager.Shared.DTOs.UpdateEmployeeDTO;

namespace EmployeeManager.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<EmployeeController> _logger;
        private readonly IMapper _mapper;
        private readonly IConfiguration _config;

        public EmployeeController(IUnitOfWork unitOfWork, ILogger<EmployeeController> logger, IMapper mapper, IConfiguration config)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
            _config = config;

        }

        #region Add new employee
        [HttpPost("AddEmployee")]
        public async Task<IActionResult> Register([FromBody] CreateEmployeeDTO employee)
        {
            // Create a new EmployeeModel instance and populate it with data from the incoming CreateEmployeeDTO
            EmployeeModel employeeModel = new()
            {
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                PhoneNum = employee.PhoneNum,
                Email = employee.Email,
                DOB = employee.DOB
            };

            // Use AutoMapper to map EmployeeModel to EmployeeEntity and add the employee to the database
            var NewEmployee = await _unitOfWork.Employee.AddAsync(_mapper.Map<EmployeeEntity>(employeeModel));

            // Check if the employee was successfully added
            if (NewEmployee != null)
            {
                // If employee creation is successful, create a new AddressModel using data from the DTO
                AddressModel addressModel = new()
                {
                    UserID = NewEmployee.UserID, // Link the address to the newly created employee
                    StreetAddress = employee.Addresss.StreetAddress,
                    City = employee.Addresss.City,
                    PostalCode = employee.Addresss.PostalCode,
                    Country = employee.Addresss.Country
                };

                // Add the address to the database by mapping AddressModel to AddressEntity
                var EmployeeAddress = await _unitOfWork.Address.AddAsync(_mapper.Map<AddressEntity>(addressModel));

                // Loop through each skill in the DTO and create a SkillsModel for each
                foreach (var item in employee.Skills)
                {
                    SkillsModel skillsModel = new()
                    {
                        UserID = NewEmployee.UserID,
                        Name = item.Name,
                        YearsExperience = item.YearsExperience,
                        Seniority = item.Seniority
                    };

                    // Add each skill to the database by mapping SkillsModel to SkillsEntity
                    var EmployeeSkills = await _unitOfWork.Skills.AddAsync(_mapper.Map<SkillsEntity>(skillsModel));
                }

                return Ok(employee);
            }
            else
            {
                return BadRequest("Please use a different email");
            }
        }
        #endregion

        #region Delete all of employee information
        [HttpDelete("DeleteEmployeeInformation/{userID}")]
        public async Task<IActionResult> Delete(string userID)
        {
            // Attempt to delete the employee by their userID
            var employee = await _unitOfWork.Employee.DeleteEmployeeByID(userID);
            if (employee != false)
            {
                var employeeAddress = await _unitOfWork.Address.DeleteAddressByUserID(userID);
                if (employeeAddress != false)
                {
                    var employeeSkills = await _unitOfWork.Skills.DeleteSkillsByUserID(userID);
                    if (employeeSkills != false)
                    {
                        return Ok();
                    }
                    else { return Ok("No Skills to delete"); }
                }
            }
            return BadRequest();
        }
        #endregion

        #region Update Employee information
        [HttpPost("UpdateEmployeeInformation")]
        public async Task<IActionResult> Update([FromBody] UpdateEmployeeDTO employee)
        {
            EmployeeModel updateEmployeeModel = new()
            {
                UserID = employee.UserID,
                FirstName = employee.FirstName,
                LastName = employee.LastName,
                PhoneNum = employee.PhoneNum,
                Email = employee.Email,
                DOB = employee.DOB
            };

            var UpdatedNewEmployee = await _unitOfWork.Employee.UpdateEmployeeByID(_mapper.Map<EmployeeEntity>(updateEmployeeModel));

            if (UpdatedNewEmployee != null)
            {
                AddressModel UpdateAddressModel = new()
                {
                    UserID = employee.UserID,
                    StreetAddress = employee.Addresss.StreetAddress,
                    City = employee.Addresss.City,
                    PostalCode = employee.Addresss.PostalCode,
                    Country = employee.Addresss.Country
                };

                var UpdatedEmployeeAddress = await _unitOfWork.Address.UpdateAddressByID(_mapper.Map<AddressEntity>(UpdateAddressModel));
                if (UpdatedEmployeeAddress != null)
                {
                    if (employee.Skills.Count != 0)
                    {
                        foreach (var item in employee.Skills)
                        {
                            SkillsModel updateSkillsModel = new()
                            {
                                UserID = employee.UserID,
                                SkillID = item.SkillID,
                                Name = item.Name,
                                YearsExperience = item.YearsExperience,
                                Seniority = item.Seniority
                            };

                            var EmployeeSkills = await _unitOfWork.Skills.UpdateSkillsByUserID(_mapper.Map<SkillsEntity>(updateSkillsModel));
                        }

                        return Ok(employee);

                    }
                    return Ok(employee + "No skills to update, please add skills");

                }
                return BadRequest(UpdatedEmployeeAddress);
            }
            return BadRequest(employee);
        }
        #endregion

        #region Get All Employees
        [HttpGet("GetAllEmployees")]
        public async Task<IActionResult> GetAllEmployees()
        {
            var result = await _unitOfWork.Employee.GetAllEmployees();
            return Ok(result);
        }
        #endregion

        #region Get employee information by userID
        [HttpGet("GetEmployeeInformationByuserID/{userID}")]
        public async Task<IActionResult> GetEmployeeById(string userID)
        {
            var employee = await _unitOfWork.Employee.GetEmployeeByID(userID);
            if (employee != null)
            {
                var employeeAddress = await _unitOfWork.Address.GetAddressByUserID(userID);
                if (employeeAddress != null)
                {
                    var employeeSkills = await _unitOfWork.Skills.GetSkillsByUserID(userID);
                    if (employeeSkills.Count() != 0)
                    {
                        
                        AddressModel addressModel = new()
                        {
                            UserID = employeeAddress.UserID,
                            StreetAddress = employeeAddress.StreetAddress,
                            City = employeeAddress.City,
                            PostalCode = employeeAddress.PostalCode,
                            Country = employeeAddress.Country,
                        };

                        CreateEmployeeDTO employeeDetails = new()
                        {
                            FirstName = employee.FirstName,
                            LastName = employee.LastName,
                            Email = employee.Email,
                            PhoneNum = employee.PhoneNum,
                            DOB = employee.DOB,
                            Addresss = addressModel,
                        };

                        foreach (var item in employeeSkills)
                        {
                            if(item.isDeleted == false)
                            {
                                employeeDetails.Skills.Add(new SkillsModel
                                {
                                    UserID = item.UserID,
                                    SkillID = item.SkillID,
                                    Name = item.Name,
                                    YearsExperience = item.YearsExperience,
                                    Seniority = item.Seniority,
                                });
                            }
                        }

                        return Ok(employeeDetails);

                    }
                    else if (employeeSkills.Count() == 0)
                    {
                        AddressModel addressModel = new()
                        {
                            StreetAddress = employeeAddress.StreetAddress,
                            City = employeeAddress.City,
                            PostalCode = employeeAddress.PostalCode,
                            Country = employeeAddress.Country,
                        };

                        CreateEmployeeDTO employeeDetails = new()
                        {
                            FirstName = employee.FirstName,
                            LastName = employee.LastName,
                            Email = employee.Email,
                            PhoneNum = employee.PhoneNum,
                            DOB = employee.DOB,
                            Addresss = addressModel,
           
                        };

                        return Ok(employeeDetails);
                    }
                }
            }
            return BadRequest();
        }
        #endregion

    }
}
