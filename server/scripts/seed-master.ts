import fs from "fs";
import path from "path";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../database/schema/index.js";
import { eq, inArray } from "drizzle-orm";
import { env } from "../config/env.js";
import { z } from "zod";

const sql = neon(env.DATABASE_URL);
const db = drizzle(sql, { schema });

const rootDir = path.join(process.cwd(), "../frontend/data");
const districtsPath = path.join(rootDir, "telangana/districts.json");
const mandalsPath = path.join(rootDir, "telangana/mandals.json");
const villagesPath = path.join(rootDir, "telangana/villages.json");
const studentsPath = path.join(rootDir, "students.json");
const reportPath = path.join(process.cwd(), "data-quality-report.json");

const FORCE_MASTER: Record<string, string> = {
  "police": "Police",
  "indian-army": "Indian Army",
  "indian-navy": "Indian Navy",
  "indian-air-force": "Indian Air Force"
};

const StateSchema = z.object({ id: z.string(), name: z.string() });
const DistrictSchema = z.object({ id: z.string(), name: z.string(), stateId: z.string(), lgdCode: z.string().optional() });
const MandalSchema = z.object({ id: z.string(), name: z.string(), districtId: z.string(), lgdCode: z.string().optional() });
const VillageSchema = z.object({ id: z.string(), name: z.string(), districtId: z.string(), mandalId: z.string(), lgdCode: z.string().optional(), status: z.string().optional(), category: z.string().optional() });

const StudentSchema = z.object({
  id: z.string().uuid(),
  studentCode: z.string(),
  fullName: z.string(),
  slug: z.string(),
  avatarUrl: z.string().optional(),
  mobile: z.string().optional(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]).optional(),
  forceId: z.string().optional(),
  job: z.object({
    title: z.string(),
    category: z.string(),
    year: z.number().optional(),
    logoUrl: z.string().optional(),
  }).optional(),
  address: z.object({
    houseNo: z.string().optional(),
    villageId: z.string().optional(),
  }).optional(),
  education: z.array(z.object({
    qualification: z.string(),
    institution: z.string(),
    passingYear: z.number().optional(),
    percentage: z.number().optional(),
    grade: z.string().optional(),
  })).optional(),
  parentsDetails: z.object({
    fatherName: z.string().optional(),
    motherName: z.string().optional(),
    occupation: z.string().optional(),
    contactNumber: z.string().optional(),
  }).optional(),
  status: z.string().default("published"),
});

const seedMaster = async () => {
  console.log("Starting Master Data Seed...");

  const districtsRaw = JSON.parse(fs.readFileSync(districtsPath, "utf-8"));
  const mandalsRaw = JSON.parse(fs.readFileSync(mandalsPath, "utf-8"));
  const villagesRaw = JSON.parse(fs.readFileSync(villagesPath, "utf-8"));
  const studentsRaw = JSON.parse(fs.readFileSync(studentsPath, "utf-8"));

  const districts = z.array(DistrictSchema).parse(districtsRaw);
  const mandals = z.array(MandalSchema).parse(mandalsRaw);
  const villages = z.array(VillageSchema).parse(villagesRaw);
  const students = z.array(StudentSchema).parse(studentsRaw);

  await db.insert(schema.states).values({ id: "telangana", name: "Telangana", code: "TS" }).onConflictDoNothing();
  console.log("Seeded State.");

  if (districts.length > 0) {
    await db.insert(schema.districts).values(districts.map(d => ({
      id: d.id, name: d.name, stateId: d.stateId, lgdCode: d.lgdCode
    }))).onConflictDoNothing();
  }
  console.log(`Seeded ${districts.length} Districts.`);

  if (mandals.length > 0) {
    const chunkSize = 1000;
    for (let i = 0; i < mandals.length; i += chunkSize) {
      const chunk = mandals.slice(i, i + chunkSize);
      await db.insert(schema.mandals).values(chunk.map(m => ({
        id: m.id, name: m.name, districtId: m.districtId, lgdCode: m.lgdCode
      }))).onConflictDoNothing();
    }
  }
  console.log(`Seeded ${mandals.length} Mandals.`);

  if (villages.length > 0) {
    const chunkSize = 1000;
    for (let i = 0; i < villages.length; i += chunkSize) {
      const chunk = villages.slice(i, i + chunkSize);
      await db.insert(schema.villages).values(chunk.map(v => ({
        id: v.id, name: v.name, districtId: v.districtId, mandalId: v.mandalId,
        lgdCode: v.lgdCode, status: v.status, category: v.category
      }))).onConflictDoNothing();
    }
  }
  console.log(`Seeded ${villages.length} Villages.`);

  const forceMap = new Map();
  const roleMap = new Map();

  for (const s of students) {
    if (s.forceId && !forceMap.has(s.forceId)) {
      const [f] = await db.insert(schema.forces).values({
        code: s.forceId,
        name: FORCE_MASTER[s.forceId] || s.forceId,
      }).onConflictDoUpdate({
        target: schema.forces.code,
        set: { name: FORCE_MASTER[s.forceId] || s.forceId }
      }).returning();
      forceMap.set(s.forceId, f.id);
    }
  }

  for (const s of students) {
    if (s.job && s.forceId) {
      const fId = forceMap.get(s.forceId);
      const roleKey = fId + "-" + s.job.title;
      if (!roleMap.has(roleKey)) {
        const [sr] = await db.insert(schema.serviceRoles).values({
          forceId: fId,
          title: s.job.title,
          category: s.job.category,
        }).onConflictDoNothing().returning(); 
        
        if (sr) {
          roleMap.set(roleKey, sr.id);
        } else {
          const exist = await db.select().from(schema.serviceRoles)
            .where(eq(schema.serviceRoles.forceId, fId));
          const match = exist.find(r => r.title === s.job?.title);
          if (match) roleMap.set(roleKey, match.id);
        }
      }
    }
  }

  console.log("Seeded Forces & Service Roles.");

  const allVillageIds = new Set(villages.map(v => v.id));
  const allVillageNames = new Map(villages.map(v => [v.name.toLowerCase(), v.id]));
  
  const unresolvedVillages: any[] = [];
  const addressesToInsert: any[] = [];
  const educationToInsert: any[] = [];
  const familyToInsert: any[] = [];

  for (const s of students) {
    const fId = s.forceId ? forceMap.get(s.forceId) : null;
    let srId = null;
    if (s.job && fId) {
      const roleKey = fId + "-" + s.job.title;
      srId = roleMap.get(roleKey) || null;
    }

    const [student] = await db.insert(schema.students).values({
      id: s.id,
      studentCode: s.studentCode,
      fullName: s.fullName,
      slug: s.slug,
      avatarUrl: s.avatarUrl,
      mobile: s.mobile,
      bloodGroup: s.bloodGroup || null,
      forceId: fId,
      serviceRoleId: srId,
      joiningYear: s.job?.year,
      status: s.status,
    }).onConflictDoUpdate({
      target: schema.students.studentCode,
      set: {
        fullName: s.fullName,
        slug: s.slug,
        forceId: fId,
        serviceRoleId: srId
      }
    }).returning();

    const studentId = student?.id || s.id;

    if (s.address) {
      let resolvedVillageId = s.address.villageId;
      if (resolvedVillageId && !allVillageIds.has(resolvedVillageId)) {
        const match = allVillageNames.get(resolvedVillageId.toLowerCase());
        if (match) {
          resolvedVillageId = match;
        } else {
          unresolvedVillages.push({
            studentCode: s.studentCode,
            originalVillageValue: resolvedVillageId,
            resolutionStatus: "FAILED",
            reason: "Village ID not found in villages.json"
          });
          resolvedVillageId = undefined;
        }
      }

      addressesToInsert.push({
        studentId,
        houseNo: s.address.houseNo,
        villageId: resolvedVillageId,
      });
    }

    if (s.education && s.education.length > 0) {
      for (const ed of s.education) {
        educationToInsert.push({
          studentId,
          qualification: ed.qualification,
          institution: ed.institution,
          passingYear: ed.passingYear,
          percentage: ed.percentage,
          grade: ed.grade,
        });
      }
    }

    if (s.parentsDetails) {
      if (s.parentsDetails.fatherName) {
        familyToInsert.push({
          studentId, name: s.parentsDetails.fatherName, relationType: "FATHER", occupation: s.parentsDetails.occupation, contactNumber: s.parentsDetails.contactNumber
        });
      }
      if (s.parentsDetails.motherName) {
        familyToInsert.push({
          studentId, name: s.parentsDetails.motherName, relationType: "MOTHER"
        });
      }
    }
  }
  
  if (addressesToInsert.length > 0) {
    const chunkSize = 500;
    for (let i = 0; i < addressesToInsert.length; i += chunkSize) {
      await db.insert(schema.studentAddresses)
        .values(addressesToInsert.slice(i, i + chunkSize))
        .onConflictDoUpdate({
           target: schema.studentAddresses.studentId,
           set: { houseNo: sql`EXCLUDED.house_no`, villageId: sql`EXCLUDED.village_id` }
        });
    }
  }

  // Education/Family arrays can be large, and no simple unique constraint, so delete and insert
  if (students.length > 0) {
    const studentIds = students.map(s => s.id);
    // Delete in chunks if needed, but since it's dev seed, we can do it
    await db.delete(schema.studentEducation);
    if (educationToInsert.length > 0) {
      const chunkSize = 500;
      for (let i = 0; i < educationToInsert.length; i += chunkSize) {
        await db.insert(schema.studentEducation).values(educationToInsert.slice(i, i + chunkSize));
      }
    }

    await db.delete(schema.studentFamily);
    if (familyToInsert.length > 0) {
      const chunkSize = 500;
      for (let i = 0; i < familyToInsert.length; i += chunkSize) {
        await db.insert(schema.studentFamily).values(familyToInsert.slice(i, i + chunkSize));
      }
    }
  }

  fs.writeFileSync(reportPath, JSON.stringify(unresolvedVillages, null, 2));

  console.log(`Seeded ${students.length} Students.`);
  if (unresolvedVillages.length > 0) {
    console.log(`Found ${unresolvedVillages.length} invalid village references. Saved to data-quality-report.json`);
  }
  
  process.exit(0);
};

seedMaster().catch(console.error);
