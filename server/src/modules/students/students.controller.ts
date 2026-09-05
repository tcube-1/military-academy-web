import { Request, Response } from "express";
import { db } from "../../database/db.js";
import { 
  students, studentAddresses, studentEducation, studentFamily,
  forces, serviceRoles, villages, mandals, districts, states
} from "../../database/schema/index.js";
import { eq } from "drizzle-orm";
import { HTTP_STATUS } from "../../config/httpStatus.js";
import { asyncHandler } from "../../config/asyncHandler.js";
import { ApiError } from "../../config/ApiError.js";

export class StudentsController {
  static getStudents = asyncHandler(async (req: Request, res: Response) => {
    // For now, return basic list. Full advanced search is next phase.
    const result = await db.select({
      id: students.id,
      studentCode: students.studentCode,
      fullName: students.fullName,
      slug: students.slug,
      avatarUrl: students.avatarUrl,
      mobile: students.mobile,
      bloodGroup: students.bloodGroup,
      status: students.status,
    }).from(students).limit(50);
    
    res.status(HTTP_STATUS.OK).json({ success: true, data: result });
  });

  static getStudent = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    
    // Validate UUID to prevent DB error if string is malformed
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    if (!uuidRegex.test(id)) {
      throw new ApiError("Invalid student ID format", HTTP_STATUS.BAD_REQUEST);
    }

    const [student] = await db.select().from(students).where(eq(students.id, id)).limit(1);
    
    if (!student) {
      throw new ApiError("Student not found", HTTP_STATUS.NOT_FOUND);
    }

    // Fetch relations
    const [force] = student.forceId ? await db.select().from(forces).where(eq(forces.id, student.forceId)).limit(1) : [null];
    const [job] = student.serviceRoleId ? await db.select().from(serviceRoles).where(eq(serviceRoles.id, student.serviceRoleId)).limit(1) : [null];
    
    const [addressRecord] = await db.select().from(studentAddresses).where(eq(studentAddresses.studentId, student.id)).limit(1);
    let fullAddress = null;
    if (addressRecord) {
      fullAddress = { houseNo: addressRecord.houseNo, villageId: addressRecord.villageId } as any;
      if (addressRecord.villageId) {
        const [v] = await db.select().from(villages).where(eq(villages.id, addressRecord.villageId)).limit(1);
        if (v) {
          fullAddress.village = v.name;
          fullAddress.mandalId = v.mandalId;
          const [m] = await db.select().from(mandals).where(eq(mandals.id, v.mandalId)).limit(1);
          if (m) {
            fullAddress.mandal = m.name;
            fullAddress.districtId = m.districtId;
            const [d] = await db.select().from(districts).where(eq(districts.id, m.districtId)).limit(1);
            if (d) {
               fullAddress.district = d.name;
               fullAddress.stateId = d.stateId;
               const [s] = await db.select().from(states).where(eq(states.id, d.stateId)).limit(1);
               if (s) {
                 fullAddress.state = s.name;
               }
            }
          }
        }
      }
    }

    const education = await db.select().from(studentEducation).where(eq(studentEducation.studentId, student.id));
    const family = await db.select().from(studentFamily).where(eq(studentFamily.studentId, student.id));
    
    // Transform family records back to frontend expected structure for this phase
    let parentsDetails = {};
    for (const f of family) {
      if (f.relationType === "FATHER") {
        parentsDetails = { ...parentsDetails, fatherName: f.name, occupation: f.occupation, contactNumber: f.contactNumber };
      }
      if (f.relationType === "MOTHER") {
        parentsDetails = { ...parentsDetails, motherName: f.name };
      }
    }

    const responseShape = {
      ...student,
      job: job ? {
        id: job.id,
        title: job.title,
        category: job.category
      } : undefined,
      address: fullAddress || undefined,
      education: education.map(e => ({
        qualification: e.qualification,
        institution: e.institution,
        passingYear: e.passingYear,
        percentage: e.percentage,
        grade: e.grade
      })),
      parentsDetails: Object.keys(parentsDetails).length ? parentsDetails : undefined
    };

    res.status(HTTP_STATUS.OK).json({ success: true, data: responseShape });
  });
}
