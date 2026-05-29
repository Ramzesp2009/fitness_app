import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
    // // test user
    // const user = await prisma.user.upsert({
    //     where: { email: 'test@test.com' },
    //     update: {},
    //     create: {
    //         username: 'testuser',
    //         email: 'test@test.com',
    //         password: await bcrypt.hash('password123', 10)
    //     },
    // });

    // console.log('Seeded user:', user);

    const exercises = await Promise.all([
        prisma.exercise.upsert({
            where: { id: '00000000-0000-0000-0000-000000000001' },
            update: {},
            create: {
                id: '00000000-0000-0000-0000-000000000001',
                name: 'Присідання',
                muscleGroup: 'Ноги',
                isCustom: false,
            },
        }),
        prisma.exercise.upsert({
            where: { id: '00000000-0000-0000-0000-000000000002' },
            update: {},
            create: {
                id: '00000000-0000-0000-0000-000000000002',
                name: 'Жим лежачи',
                muscleGroup: 'Груди',
                isCustom: false,
            },
            }),
            prisma.exercise.upsert({
            where: { id: '00000000-0000-0000-0000-000000000003' },
            update: {},
            create: {
                id: '00000000-0000-0000-0000-000000000003',
                name: 'Станова тяга',
                muscleGroup: 'Спина',
                isCustom: false,
            },
        }),
    ])

    console.log('Seed завершено:', { user: user.username, exercises: exercises.length });
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());