import { Request, Response } from "express";
import { UsersRepository } from "./users.repository.js";
import { HTTP_STATUS } from "../../config/httpStatus.js";
import { AuditService } from "../audit/audit.service.js";
import { ApiError } from "../../config/ApiError.js";

export class UsersController {
  static async getUsers(req: Request, res: Response) {
    const users = await UsersRepository.findAll();
    const sanitized = users.map(({ id, email, displayName, status, createdAt }) => ({
      id, email, displayName, status, createdAt
    }));
    res.status(HTTP_STATUS.OK).json({ success: true, data: sanitized });
  }

  static async getUser(req: Request, res: Response) {
    const user = await UsersRepository.findById(req.params.id as string);
    if (!user || user.deletedAt) {
      throw new ApiError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    const roles = await UsersRepository.getUserRoles(user.id);
    const sanitized = {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      status: user.status,
      createdAt: user.createdAt,
      roles: roles.map(r => ({ id: r.role.id, name: r.role.name })),
    };
    res.status(HTTP_STATUS.OK).json({ success: true, data: sanitized });
  }

  static async createUser(req: Request, res: Response) {
    const user = await UsersRepository.create(req.body);
    
    if (req.body.roleIds && Array.isArray(req.body.roleIds)) {
      for (const roleId of req.body.roleIds) {
        await UsersRepository.assignRole(user.id, roleId, req.user?.id);
      }
    }

    await AuditService.logEvent({
      actorId: req.user?.id || "system",
      action: "CREATE_USER",
      resourceType: "USER",
      resourceId: user.id,
      requestId: req.headers["x-request-id"] as string,
    });

    res.status(HTTP_STATUS.CREATED).json({ success: true, data: { id: user.id } });
  }

  static async updateUser(req: Request, res: Response) {
    const user = await UsersRepository.update(req.params.id as string, req.body);
    if (!user) throw new ApiError("User not found", HTTP_STATUS.NOT_FOUND);

    await AuditService.logEvent({
      actorId: req.user?.id || "system",
      action: "UPDATE_USER",
      resourceType: "USER",
      resourceId: user.id,
      requestId: req.headers["x-request-id"] as string,
    });

    res.status(HTTP_STATUS.OK).json({ success: true, data: { id: user.id } });
  }

  static async deleteUser(req: Request, res: Response) {
    const user = await UsersRepository.delete(req.params.id as string);
    if (!user) throw new ApiError("User not found", HTTP_STATUS.NOT_FOUND);

    await AuditService.logEvent({
      actorId: req.user?.id || "system",
      action: "DELETE_USER",
      resourceType: "USER",
      resourceId: user.id,
      requestId: req.headers["x-request-id"] as string,
    });

    res.status(HTTP_STATUS.OK).json({ success: true });
  }

  static async assignRole(req: Request, res: Response) {
    await UsersRepository.assignRole(req.params.id as string, req.body.roleId, req.user?.id);
    
    await AuditService.logEvent({
      actorId: req.user?.id || "system",
      action: "ASSIGN_ROLE",
      resourceType: "USER",
      resourceId: req.params.id as string,
      metadata: { roleId: req.body.roleId },
      requestId: req.headers["x-request-id"] as string,
    });

    res.status(HTTP_STATUS.OK).json({ success: true });
  }

  static async removeRole(req: Request, res: Response) {
    await UsersRepository.removeRole(req.params.id as string, req.params.roleId as string);
    
    await AuditService.logEvent({
      actorId: req.user?.id || "system",
      action: "REMOVE_ROLE",
      resourceType: "USER",
      resourceId: req.params.id as string,
      metadata: { roleId: req.params.roleId as string },
      requestId: req.headers["x-request-id"] as string,
    });

    res.status(HTTP_STATUS.OK).json({ success: true });
  }
}
