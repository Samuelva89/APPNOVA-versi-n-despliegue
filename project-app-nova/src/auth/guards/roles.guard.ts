import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from 'src/common/constants/roles.enum'; // exportacion de roles// exportacion de roles
import { ROLES_KEY } from 'src/decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (!user || !user.roles) {
      return false;
    }

    // El LIDER_DE_PROYECTO siempre tiene acceso.
    if (user.roles.includes(UserRole.LIDER_DE_PROYECTO)) {
      return true;
    }

    // Para todos los demás, se requiere que la ruta tenga roles definidos.
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [
        context.getHandler(), // roles en el metodo
        context.getClass(), // roles en el controlador
      ],
    );

    // Si no hay roles requeridos en la ruta, se deniega el acceso (a menos que sea LÍDER).
    if (!requiredRoles) {
      return false;
    }

    // Se comprueba si el usuario tiene alguno de los roles requeridos.
    return requiredRoles.some((role) => user.roles.includes(role));
  }
}
