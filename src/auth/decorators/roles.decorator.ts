import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { SISBRole } from "../../external-services/obs-bridge";

type Role = `${SISBRole}`;

export const ROLES_KEY = "roles";
export const Roles = (...roles: Role[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
