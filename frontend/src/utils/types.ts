export interface studentDataType {
  id: string;
  studentCode: string;
  fullName: string;
  slug: string;
  avatarUrl: string;
  mobile: string;
  bloodGroup: BloodGroup | null;
  force: forceType;
  job: jobType;
  address: Address | null;
  education: Education[];
  family: Family[];
  status: StudentStatus;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface forceType {
  id: string;
  code: string;
  name: string;
  logoUrl: string;
}

export interface jobType {
  id: string;
  title: string;
  category: string;
  joiningYear: number;
}
export interface Address {
  id: string;
  houseNo: string;
  village: AddressLocation;
  mandal: AddressLocation;
  district: AddressLocation;
  state: AddressLocation;
}
export interface Education {
  id: string;
  qualification: string;
  institution: string;
  passingYear: number | null;
  percentage: number | null;
  grade?: string | null;
}
export interface Family {
  id: string;
  name: string;
  relationType: FamilyRelationType;
  occupation: string;
  contactNumber: string | null;
}

export interface AddressLocation {
  id: string;
  name: string;
  lgdCode?: string | null;
}

export type BloodGroup =
  'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type StudentStatus = 'draft' | 'published' | 'archived';

export type FamilyRelationType = 'FATHER' | 'MOTHER' | 'GUARDIAN';
