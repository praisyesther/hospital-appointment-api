
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from './patients.js';

import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from './doctors.js';

import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from './appointments.js';

async function main() {
  console.log('\n========== PATIENT TESTS ==========');

  const patient = await createPatient({
    name: 'Test Patient',
    email: `test.patient.${Date.now()}@email.com`,
    phone: '9876500000',
    dateOfBirth: new Date('1998-05-20'),
  });
  console.log('1. Patient created:', patient.name);

  const foundPatient = await getPatient(patient.id);
  console.log('2. Patient retrieved:', foundPatient?.name);

  const searchedPatients = await searchPatients('Test Patient');
  console.log('3. Patient search results:', searchedPatients.length);

  await updatePatientPhone(patient.id, '9999999999');
  console.log('4. Patient phone updated');

  console.log('\n========== DOCTOR TESTS ==========');

  const doctor = await createDoctor({
    name: 'Dr. Test Doctor',
    specialty: 'Dermatology',
    email: `test.doctor.${Date.now()}@hospital.com`,
  });
  console.log('1. Doctor created:', doctor.name);

  const foundDoctor = await getDoctor(doctor.id);
  console.log('2. Doctor retrieved:', foundDoctor?.name);

  const doctors = await listDoctorsBySpecialty('Dermatology');
  console.log('3. Doctors by specialty:', doctors.length);

  console.log('\n========== APPOINTMENT TESTS ==========');

  const appointment = await bookAppointment({
    patientId: patient.id,
    doctorId: doctor.id,
    appointmentDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    notes: 'Test appointment',
  });
  console.log('1. Appointment booked:', appointment.id);

  const fullAppointment = await getAppointmentFull(appointment.id);
  console.log('2. Full appointment retrieved:',
    fullAppointment?.patient.name,
    'with',
    fullAppointment?.doctor.name,
  );

  const upcoming = await getDoctorUpcomingAppointments(doctor.id);
  console.log('3. Upcoming appointments:', upcoming.length);

  await setAppointmentStatus(appointment.id, 'confirmed');
  console.log('4. Appointment status updated');

  const cancelled = await cancelAllPatientAppointments(patient.id);
  console.log('5. Patient appointments cancelled:', cancelled.count);

  await deleteAppointment(appointment.id);
  console.log('6. Appointment deleted');

  console.log('\n========== CLEANUP ==========');

  await deletePatient(patient.id);
  console.log('Patient deleted');

  await deleteDoctor(doctor.id);
  console.log('Doctor deleted');

  console.log('\nAll CRUD tests completed successfully!');
}

main()
  .catch((error) => {
    console.error('Test failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    const { default: prisma } = await import('./lib/prisma.js');
    await prisma.$disconnect();
  });
