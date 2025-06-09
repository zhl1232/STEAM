import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUsersTable1749481448812 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 首先创建枚举类型
        await queryRunner.query(`
            CREATE TYPE "user_role_enum" AS ENUM('student', 'teacher', 'admin')
        `);

        // 创建用户表
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "serial",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                    },
                    {
                        name: "username",
                        type: "varchar",
                        length: "50",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "password_hash",
                        type: "varchar",
                        length: "255",
                        isNullable: false,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "100",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "phone_number",
                        type: "varchar",
                        length: "20",
                        isUnique: true,
                        isNullable: true,
                    },
                    {
                        name: "avatar_url",
                        type: "varchar",
                        length: "255",
                        isNullable: true,
                    },
                    {
                        name: "nickname",
                        type: "varchar",
                        length: "50",
                        isNullable: false,
                    },
                    {
                        name: "role",
                        type: "user_role_enum",
                        default: "'student'",
                        isNullable: false,
                    },
                    {
                        name: "bio",
                        type: "text",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP",
                        isNullable: false,
                    },
                    {
                        name: "last_login_at",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true,
                        isNullable: false,
                    },
                ],
            }),
            true,
        );

        // 创建索引
        await queryRunner.createIndex("users", new TableIndex({
            name: "IDX_USER_USERNAME",
            columnNames: ["username"]
        }));
        await queryRunner.createIndex("users", new TableIndex({
            name: "IDX_USER_EMAIL",
            columnNames: ["email"]
        }));
        await queryRunner.createIndex("users", new TableIndex({
            name: "IDX_USER_PHONE",
            columnNames: ["phone_number"]
        }));
        await queryRunner.createIndex("users", new TableIndex({
            name: "IDX_USER_ROLE",
            columnNames: ["role"]
        }));
        await queryRunner.createIndex("users", new TableIndex({
            name: "IDX_USER_ACTIVE",
            columnNames: ["is_active"]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // 删除表
        await queryRunner.dropTable("users");

        // 删除枚举类型
        await queryRunner.query(`DROP TYPE "user_role_enum"`);
    }

}
