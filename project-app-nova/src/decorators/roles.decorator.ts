import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/common/constants/roles.enum";

export const ROLES_KEY = 'roles';// esto es una clave para identificar los roles en los metadatos
export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles);