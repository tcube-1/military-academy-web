export type StudentProfile = {
  id: string;
  studentCode: string;
  fullName: string;
  slug: string;
  avatarUrl: string;
  mobile: string;
  bloodGroup: string;
  force: {
    id: string;
    code: string;
    name: string;
    logoUrl: string;
  };
  job: {
    id: string;
    title: string;
    category: string;
    joiningYear: number;
  };
  address: {
    id: string;
    houseNo: string;
    village: {
      id: string;
      name: string;
      lgdCode: string;
    };
    mandal: {
      id: string;
      name: string;
      lgdCode: string;
    };
    district: {
      id: string;
      name: string;
      lgdCode: string;
    };
    state: {
      id: string;
      name: string;
    };
    pinCode: string | null;
  };
  education: Array<{
    id: string;
    qualification: string;
    institution: string;
    passingYear: number;
    percentage: number;
    grade: string | null;
  }>;
  family: Array<{
    id: string;
    name: string;
    relationType: 'FATHER' | 'MOTHER';
    occupation: string | null;
    contactNumber: string | null;
  }>;
  documents: Array<{
    id: string;
    name: string;
    status: 'Verified' | 'Pending';
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
  }>;
  history: Array<{
    id: string;
    date: string;
    type: 'Created' | 'Updated';
    description: string;
  }>;
  status: 'published' | 'draft' | 'archived';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  createdAtLabel: string;
  updatedAtLabel: string;
};

export const studentProfile: StudentProfile = {
  id: '91d15ed5-6aa7-48ef-9e1a-bc81fb0003',
  studentCode: 'DDA003',
  fullName: 'Arjun Lebsack',
  slug: 'arjun-lebsack-DDA003',
  avatarUrl: 'https://i.pravatar.cc/300?img=4',
  mobile: '9000000003',
  bloodGroup: 'B+',

  force: {
    id: 'force-indian-air-force',
    code: 'indian-air-force',
    name: 'Indian Air Force',
    logoUrl: '/logos/airforce-logo.png',
  },

  job: {
    id: 'service-role-indian-air-force-airman-technical',
    title: 'Airman Technical',
    category: 'Air Force',
    joiningYear: 2022,
  },

  address: {
    id: 'address-0003',
    houseNo: '103',
    village: {
      id: 'sample-village-003',
      name: 'Sample Village',
      lgdCode: '570003',
    },
    mandal: {
      id: 'nelakondapalli',
      name: 'Nelakondapalli',
      lgdCode: '4503',
    },
    district: {
      id: 'khammam',
      name: 'Khammam',
      lgdCode: '503',
    },
    state: {
      id: 'telangana',
      name: 'Telangana',
    },
    pinCode: null,
  },

  education: [
    {
      id: 'education-0003-1',
      qualification: 'SSC',
      institution: 'Singh Group High School',
      passingYear: 2023,
      percentage: 83.39,
      grade: null,
    },
    {
      id: 'education-0003-2',
      qualification: 'Intermediate',
      institution: 'Yadav, Howe and Yost Junior College',
      passingYear: 2024,
      percentage: 86.23,
      grade: null,
    },
  ],

  family: [
    {
      id: 'family-0003-1',
      name: 'Mr. Aditya Patel',
      relationType: 'FATHER',
      occupation: 'Teacher',
      contactNumber: null,
    },
    {
      id: 'family-0003-2',
      name: 'Mrs. Varun Naik',
      relationType: 'MOTHER',
      occupation: null,
      contactNumber: null,
    },
  ],

  documents: [
    {
      id: 'document-0003-1',
      name: 'SSC Certificate',
      status: 'Verified',
    },
    {
      id: 'document-0003-2',
      name: 'Intermediate Certificate',
      status: 'Verified',
    },
    {
      id: 'document-0003-3',
      name: 'ID Proof',
      status: 'Verified',
    },
    {
      id: 'document-0003-4',
      name: 'Service Certificate',
      status: 'Verified',
    },
  ],

  achievements: [],

  history: [
    {
      id: 'history-0003-2',
      date: '03 Aug 2026, 11:10 PM',
      type: 'Updated',
      description: 'Student profile updated',
    },
    {
      id: 'history-0003-1',
      date: '03 Mar 2024, 03:30 PM',
      type: 'Created',
      description: 'Student profile created',
    },
  ],

  status: 'published',
  createdAt: '2024-03-03T10:00:00.000Z',
  updatedAt: '2026-08-03T17:40:52.951Z',
  deletedAt: null,
  createdAtLabel: '03 Mar 2024, 03:30 PM',
  updatedAtLabel: '03 Aug 2026, 11:10 PM',
};
