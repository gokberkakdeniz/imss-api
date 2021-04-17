import { SetMetadata } from "@nestjs/common";
import { SISBRole } from  "../../external-services/obs-bridge"; 

export const ROLES_KEY = "roles";
export const Roles = (...roles: SISBRole[]) => SetMetadata(ROLES_KEY, roles);
