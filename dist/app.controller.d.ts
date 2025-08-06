import { AppService } from './app.service';
import { UserService } from './modules/user/user.service';
export declare class AppController {
    private readonly appService;
    private readonly userService;
    constructor(appService: AppService, userService: UserService);
    getHello(): string;
}
