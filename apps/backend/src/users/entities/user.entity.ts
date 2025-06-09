import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin',
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id!: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    username!: string;

    @Column({ type: 'varchar', length: 255 })
    password_hash!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'varchar', length: 20, unique: true, nullable: true })
    phone_number!: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    avatar_url!: string;

    @Column({ type: 'varchar', length: 50 })
    nickname!: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.STUDENT,
    })
    role!: UserRole;

    @Column({ type: 'text', nullable: true })
    bio!: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at!: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at!: Date;

    @Column({ type: 'timestamp', nullable: true })
    last_login_at!: Date;

    @Column({ type: 'boolean', default: true })
    is_active!: boolean;
}
