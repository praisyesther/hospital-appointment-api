import prisma from './lib/prisma.js';

export async function createPatient(data: {
  name: string;
  email: string;
  phone?: string;
  dateOfBirth?: Date;
}) {
  return await prisma.patient.create({
    data,
  });
}

export async function getPatient(id: number) {
  return await prisma.patient.findUnique({
    where: { id },
    include: {
      appointments: true,
    },
  });
}

export async function searchPatients(query: string) {
  return await prisma.patient.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ],
    },
  });
}

export async function updatePatientPhone(id: number, phone: string) {
  return await prisma.patient.update({
    where: { id },
    data: { phone },
  });
}

export async function deletePatient(id: number) {
  return await prisma.patient.delete({
    where: { id },
  });
}
