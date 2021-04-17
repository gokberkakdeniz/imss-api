import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { SISBRole } from "../../external-services/obs-bridge";

export const ROLES_KEY = "roles";
export const Roles = (...roles: SISBRole[]): CustomDecorator<string> => SetMetadata(ROLES_KEY, roles);
