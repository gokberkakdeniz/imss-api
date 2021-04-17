import { Injectable } from "@nestjs/common";

@Injectable()
export class ThesisService {
  create(): string {
    return "create";
  }

  getAll(): string {
    return `getAll()`;
  }

  getOne(id: string): string {
    return `getOne(${id})`;
  }

  updateOne(id: string): string {
    return `updateOne(${id})`;
  }
}
