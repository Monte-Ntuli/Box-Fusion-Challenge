export interface CreateEmployeeDTO {

    id: string,
    firstName: string,
    lastName: string,
    email: string,
    phoneNum: string,
    DOB: string,
    isDeleted: boolean,
    address: AddressDTO,
    skills: SkillsDTO[],
}

interface SkillsDTO {
    skillID: string;
    skill: string;
    yearsExperience: number;
    seniorityRating: string;
}

interface AddressDTO {
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
}