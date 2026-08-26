import { faker } from '@faker-js/faker';

const TOTAL_STUDENTS = 3000;
const STUDENT_PREFIX = 'TJC';

faker.seed(3000);
// ---------------------------------------------
// Defence Academy custom data
// ---------------------------------------------

const forces = [
  {
    id: 'army',
    categories: ['Indian Army'],
    titles: ['Soldier', 'Sepoy', 'General Duty Soldier'],
    logoUrl: '/logos/army-logo.png',
  },
  {
    id: 'navy',
    categories: ['Indian Navy'],
    titles: ['Sailor', 'Naval Personnel'],
    logoUrl: '/logos/navy-logo.png',
  },
  {
    id: 'air-force',
    categories: ['Indian Air Force'],
    titles: ['Airman', 'Air Force Personnel'],
    logoUrl: '/logos/airforce-logo.png',
  },
  {
    id: 'police',
    categories: ['Police'],
    titles: ['Constable', 'Police Constable'],
    logoUrl: '/logos/army-logo.png',
  },
];

// ---------------------------------------------
// Temporary Telangana location dataset
// Later we can replace this with the complete
// real Village → Mandal → District dataset.
// ---------------------------------------------

const locations = [
  {
    district: 'Nizamabad',
    mandals: [
      {
        name: 'Bodhan',
        villages: ['Bodhan', 'Salampad', 'Pegadapalli'],
      },
      {
        name: 'Armoor',
        villages: ['Armoor', 'Ankapur', 'Mamidipalli'],
      },
      {
        name: 'Dichpally',
        villages: ['Dichpally', 'Dharpally', 'Indalwai'],
      },
    ],
  },

  {
    district: 'Karimnagar',
    mandals: [
      {
        name: 'Huzurabad',
        villages: ['Huzurabad', 'Kanagarthi', 'Pothireddypally'],
      },
      {
        name: 'Manakondur',
        villages: ['Manakondur', 'Devampalli', 'Maddikunta'],
      },
    ],
  },

  {
    district: 'Warangal',
    mandals: [
      {
        name: 'Hanamkonda',
        villages: ['Hanamkonda', 'Hasanparthy', 'Madikonda'],
      },
      {
        name: 'Narsampet',
        villages: ['Narsampet', 'Muthojipet', 'Rajupet'],
      },
    ],
  },
];

// ---------------------------------------------
// Helpers
// ---------------------------------------------

function randomItem<T>(items: T[]): T {
  return faker.helpers.arrayElement(items);
}

function generateStudentCode(index: number): string {
  return `${STUDENT_PREFIX}${String(index).padStart(3, '0')}`;
}

function generateSlug(fullName: string, studentCode: string): string {
  return `${faker.helpers.slugify(fullName).toLowerCase()}-${studentCode.toLowerCase()}`;
}

// ---------------------------------------------
// Generate one student
// ---------------------------------------------

function generateStudent(index: number) {
  const fullName = faker.person.fullName();

  const force = randomItem(forces);

  const category = randomItem(force.categories);

  const title = randomItem(force.titles);

  const district = randomItem(locations);

  const mandal = randomItem(district.mandals);

  const village = randomItem(mandal.villages);

  const studentCode = generateStudentCode(index);
  return {
    id: faker.string.uuid(),

    studentCode: studentCode,

    fullName,

    slug: generateSlug(fullName, studentCode),

    avatarUrl: faker.image.avatar(),

    mobile: faker.string.numeric({
      length: 10,
    }),

    forceId: force.id,

    job: {
      title,

      category,

      year: faker.number.int({
        min: 2020,
        max: 2026,
      }),

      logoUrl: force.logoUrl,
    },

    address: {
      houseNo: faker.location.buildingNumber(),
      villageId: village,
      mandal: mandal.name,
      district: district.district,
      state: 'Telangana',
    },

    education: [
      {
        qualification: 'SSC',

        institution: faker.company.name() + ' High School',

        passingYear: faker.number.int({
          min: 2018,
          max: 2022,
        }),

        percentage: Number(
          faker.number
            .float({
              min: 60,
              max: 95,
              fractionDigits: 2,
            })
            .toFixed(2),
        ),
      },

      {
        qualification: 'Intermediate',

        institution: faker.company.name() + ' Junior College',

        passingYear: faker.number.int({
          min: 2020,
          max: 2024,
        }),

        percentage: Number(
          faker.number
            .float({
              min: 60,
              max: 95,
              fractionDigits: 2,
            })
            .toFixed(2),
        ),
      },
    ],

    parentsDetails: {
      fatherName: faker.person.fullName(),

      motherName: faker.person.fullName(),

      // Optional additional information
      occupation: faker.helpers.arrayElement([
        'Farmer',
        'Government Employee',
        'Private Employee',
        'Business',
        'Self Employed',
      ]),
    },

    status: 'published',

    createdAt: faker.date.between({
      from: '2024-01-01',
      to: '2026-01-01',
    }),

    updatedAt: new Date(),

    deletedAt: null,
  };
}

// ---------------------------------------------
// Generate 3000 students
// ---------------------------------------------

const students = Array.from({ length: TOTAL_STUDENTS }, (_, index) =>
  generateStudent(index + 1),
);

// console.log(`Generated ${students.length} students`);

// console.dir(students.slice(0, 3), {
//   depth: null,
// });

import fs from 'node:fs';
import path from 'node:path';

const outputDir = path.resolve('data');

fs.mkdirSync(outputDir, {
  recursive: true,
});

fs.writeFileSync(
  path.join(outputDir, 'students.json'),
  JSON.stringify(students, null, 2),
);

console.log(`Generated ${students.length} students`);
console.log(`Saved to data/students.json`);
