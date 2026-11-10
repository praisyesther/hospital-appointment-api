
import prisma from './lib/prisma.js';

// Create a new doctor
export async function createDoctor(data: {
  name: string;
  specialty: string;
  email: string;
}) {
  return await prisma.doctor.create({
    data,
  });
}

// Get a doctor by ID
export async function getDoctor(id: number) {
  return await prisma.doctor.findUnique({
    where: { id },
    include: {
      appointments: true,
    },
  });
}

// List doctors by specialty
export async function listDoctorsBySpecialty(specialty: string) {
  return await prisma.doctor.findMany({
    where: {
      specialty: {
        equals: specialty,
        mode: 'insensitive',
      },
    },
  });
}

// Delete a doctor
export async function deleteDoctor(id: number) {
  return await prisma.doctor.delete({
    where: { id },
  });
}
