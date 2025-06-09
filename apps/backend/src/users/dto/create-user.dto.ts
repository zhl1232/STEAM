import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUrl,
    MaxLength,
    MinLength,
} from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
    @IsNotEmpty({ message: '用户名不能为空' })
    @IsString({ message: '用户名必须是字符串' })
    @MinLength(3, { message: '用户名至少需要 3 个字符' })
    @MaxLength(50, { message: '用户名不能超过 50 个字符' })
    username!: string;

    @IsNotEmpty({ message: '密码不能为空' })
    @IsString({ message: '密码必须是字符串' })
    @MinLength(6, { message: '密码至少需要 6 个字符' })
    @MaxLength(255, { message: '密码不能超过 255 个字符' })
    password_hash!: string;

    @IsNotEmpty({ message: '邮箱不能为空' })
    @IsEmail({}, { message: '邮箱格式不正确' })
    @MaxLength(100, { message: '邮箱不能超过 100 个字符' })
    email!: string;

    @IsOptional()
    @IsPhoneNumber('CN', { message: '手机号格式不正确' })
    @MaxLength(20, { message: '手机号不能超过 20 个字符' })
    phone_number?: string;

    @IsOptional()
    @IsUrl({}, { message: '头像 URL 格式不正确' })
    @MaxLength(255, { message: '头像 URL 不能超过 255 个字符' })
    avatar_url?: string;

    @IsNotEmpty({ message: '昵称不能为空' })
    @IsString({ message: '昵称必须是字符串' })
    @MaxLength(50, { message: '昵称不能超过 50 个字符' })
    nickname!: string;

    @IsOptional()
    @IsEnum(UserRole, { message: '用户角色必须是 student、teacher 或 admin' })
    role?: UserRole;

    @IsOptional()
    @IsString({ message: '个人简介必须是字符串' })
    bio?: string;
}
