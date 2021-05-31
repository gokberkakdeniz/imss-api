import {
  CallHandler,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  NestInterceptor,
  NotFoundException,
  PreconditionFailedException,
} from "@nestjs/common";
import { IllegalStateException, PermissionDeniedException } from "../exceptions";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { NotFoundError } from "@mikro-orm/core";

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const isProduction = process.env.NODE_ENV === "production";

    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PermissionDeniedException) {
          return throwError(new ForbiddenException(error.message));
        } else if (error instanceof IllegalStateException) {
          return throwError(new PreconditionFailedException(error.message));
        } else if (error instanceof NotFoundError) {
          return throwError(new NotFoundException(!isProduction && error.message));
        } else {
          return throwError(error);
        }
      }),
    );
  }
}
