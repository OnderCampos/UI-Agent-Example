/**
 * Data shape for a new membership registration summary.
 */
export interface MembershipRegistrationData {
	photo: string;
	idType: string;
	idNumber: string;
	membershipType: string;
	abbreviation: string;
	firstName: string;
	lastName: string;
	gender: string;
	dateOfBirth: string;
	occupation: string;
	email: string;
	mobilePhone: string;
	homePhone: string;
	notifications: string;
	address: string;
	country: string;
	state: string;
	city: string;
}

/**
 * Secondary member attached to a primary membership.
 */
export interface SecondaryMember {
	id: string;
	photo: string;
	name: string;
	hasWarning?: boolean;
}
