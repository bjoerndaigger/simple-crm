export class Investor {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: number;
    street: string;
    zipCode: number;
    city: string;
    country: string;
    investment: number;

    /**
     * Creates a new Investor object.
     * @param {Object} [obj] - An optional object containing initial values for the properties.
     */
    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.birthDate = obj ? obj.birthDate : '';
        this.street = obj ? obj.street : '';
        this.zipCode = obj ? obj.zipCode : '';
        this.city = obj ? obj.city : '';
        this.country = obj ? obj.country : '';
        this.investment = obj ? obj.investment : '';
    }

    /**
    * Converts the Investor object to a JSON representation.
    * @returns {Object} - A JSON object representing the Investor.
    */
    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            birthDate: this.birthDate,
            street: this.street,
            zipCode: this.zipCode,
            city: this.city,
            country: this.country,
            investment: this.investment
        };
    }
}


