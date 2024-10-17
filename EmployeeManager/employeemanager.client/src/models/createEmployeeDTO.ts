export interface CreateEmployeeDTO {

    firstName: string,
    lastName: string,
    email: string,
    phoneNum: string,
    DOB: Date,
    isDeleted: boolean,
    address: AddressDTO,
    skills: SkillsDTO[],
}

interface SkillsDTO {
    userID: string;
    skillID: string;
    name: string;
    yearsExperience: number;
    seniority: string;
}

interface AddressDTO {
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
}