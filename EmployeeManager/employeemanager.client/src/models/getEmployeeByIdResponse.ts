export interface GetEmployeeByIDResponse {

    userID: string,
    firstName: string,
    fastName: string,
    email: string,
    phoneNum: string,
    DOB: string | undefined,
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