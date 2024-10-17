export interface EmployeeDTO {

    userID: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNum: string,
    DOB: Date,
    isDeleted: boolean,
    addresss: AddressDTO,
    skills: SkillsDTO[],
}

interface AddressDTO {

    userID: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
}

interface SkillsDTO {

    userID: string;
    skillID: string;
    name: string;
    yearsExperience: number;
    seniority: string;
}