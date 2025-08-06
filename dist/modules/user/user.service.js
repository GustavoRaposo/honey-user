"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repositories/user.repository");
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists');
        }
        const user = await this.userRepository.create(createUserDto);
        return this.excludePassword(user);
    }
    async findAll() {
        const users = await this.userRepository.findAll();
        return users.map(user => this.excludePassword(user));
    }
    async findOne(id) {
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        return this.excludePassword(user);
    }
    async update(id, updateUserDto) {
        await this.findOne(id);
        if (updateUserDto.email) {
            const existingUser = await this.userRepository.findByEmail(updateUserDto.email);
            if (existingUser && existingUser.id !== id) {
                throw new common_1.ConflictException('Email already exists');
            }
        }
        const user = await this.userRepository.update(id, updateUserDto);
        return this.excludePassword(user);
    }
    async remove(id) {
        await this.findOne(id);
        await this.userRepository.remove(id);
    }
    async getStats() {
        const totalUsers = await this.userRepository.count();
        return { totalUsers };
    }
    excludePassword(user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map