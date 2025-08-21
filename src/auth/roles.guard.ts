import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core"; // 런타임시 메타데이터 조회 가능
import { Observable } from "rxjs";
import { User } from "./entity/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());

        if (!roles) {
            return true; // 역할이 지정되지 않은 경우 접근 허용
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as User;

        return user && user.authorities && user.authorities.some(role => roles.includes(role));
    }
    
}