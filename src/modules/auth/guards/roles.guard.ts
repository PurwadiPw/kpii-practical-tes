import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from "@/modules/auth/decorators/roles.decorator";
import { Role } from "@/modules/auth/enums/role.enum";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    const isAuthenticate = requiredRoles.some((role) => user.profile?.includes(role));

    if (isAuthenticate) {
      return true;
    }

    throw new UnauthorizedException('Unauthorized user');
  }
}