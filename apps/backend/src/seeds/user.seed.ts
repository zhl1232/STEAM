import { DataSource } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';

export async function seedUsers(dataSource: DataSource): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    // 检查是否已存在用户数据
    const existingUsers = await userRepository.count();
    if (existingUsers > 0) {
        console.log('用户数据已存在，跳过种子数据生成');
        return;
    }

    // 创建示例用户
    const users = [
        {
            username: 'admin',
            password_hash: '$2b$10$example.hash.for.admin.password', // 实际应用中需要真正的哈希
            email: 'admin@steam.com',
            nickname: '系统管理员',
            role: UserRole.ADMIN,
            bio: '系统管理员账户',
            is_active: true,
        },
        {
            username: 'teacher_zhang',
            password_hash: '$2b$10$example.hash.for.teacher.password',
            email: 'zhang@steam.com',
            phone_number: '13800138001',
            nickname: '张老师',
            role: UserRole.TEACHER,
            bio: '计算机科学教师，专注于 STEAM 教育',
            is_active: true,
        },
        {
            username: 'student_li',
            password_hash: '$2b$10$example.hash.for.student.password',
            email: 'li@student.steam.com',
            phone_number: '13800138002',
            nickname: '小李同学',
            role: UserRole.STUDENT,
            bio: '对编程和科学非常感兴趣的学生',
            is_active: true,
        },
        {
            username: 'student_wang',
            password_hash: '$2b$10$example.hash.for.student.password',
            email: 'wang@student.steam.com',
            nickname: '小王同学',
            role: UserRole.STUDENT,
            bio: '喜欢数学和工程的学生',
            is_active: true,
        },
    ];

    // 插入用户数据
    for (const userData of users) {
        const user = userRepository.create(userData);
        await userRepository.save(user);
    }

    console.log(`成功创建 ${users.length} 个示例用户`);
} 