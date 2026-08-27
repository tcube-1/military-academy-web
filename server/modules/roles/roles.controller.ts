import { Request, Response } from "express";
import { RolesRepository } from "./roles.repository.js";
import { HTTP_STATUS } from "../../config/httpStatus.js";
import { ApiError } from "../../config/ApiError.js";

export class RolesController {
  static async getRoles(req: Request, res: Response) {
    const roles = await RolesRepository.findAllRoles();
    res.status(HTTP_STATUS.OK).json({ success: true, data: roles });
  }

  static async getRole(req: Request, res: Response) {
    const role = await RolesRepository.findRoleById(req.params.id as string);
    if (!role) throw new ApiError("Role not found", HTTP_STATUS.NOT_FOUND);
    
    const perms = await RolesRepository.getRolePermissions(role.id);
    const roleData = {
      ...role,
      permissions: perms.map(p => p.permission),
    };
    
    res.status(HTTP_STATUS.OK).json({ success: true, data: roleData });
  }

  static async getPermissions(req: Request, res: Response) {
    const permissions = await RolesRepository.findAllPermissions();
    res.status(HTTP_STATUS.OK).json({ success: true, data: permissions });
  }
}
