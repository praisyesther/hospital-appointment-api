
import prisma from './lib/prisma.js';

async function main() {
  // Clear existing records in the correct order
  await prisma.appointment.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctor.deleteMany();

  // Create doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      email: 'sarah.johnson@hospital.com',
    },
  });

  const doctor2 = await prisma.doctor.create({
    data: {
      name: 'Dr. Michael Brown',
      specialty: 'Neurology',
      email: 'michael.brown@hospital.com',
    },
  });

  // Create patients
  const patient1 = await prisma.patient.create({
    data: {
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '9876543210',
      dateOfBirth: new Date('1995-05-15'),
    },
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '9876543211',
      dateOfBirth: new Date('2000-08-20'),
    },
  });

  // Create appointments
  await prisma.appointment.create({
    data: {
      patientId: patient1.id,
      doctorId: doctor1.id,
      appointmentDate: new Date('2027-08-15T10:00:00'),
      notes: 'Regular heart checkup',
    },
  });

  await prisma.appointment.create({
    data: {
      patientId: patient2.id,
      doctorId: doctor2.id,
      appointmentDate: new Date('2027-08-16T11:00:00'),
      notes: 'Neurology consultation',
    },
  });

  console.log('Database seeded successfully!');
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
