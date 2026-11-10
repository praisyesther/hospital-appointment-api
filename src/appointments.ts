
import prisma from './lib/prisma.js';

// Book a new appointment
export async function bookAppointment(data: {
  patientId: number;
  doctorId: number;
  appointmentDate: Date;
  notes?: string;
}) {
  return await prisma.appointment.create({
    data: {
      appointmentDate: data.appointmentDate,
      notes: data.notes,
      patient: {
        connect: { id: data.patientId },
      },
      doctor: {
        connect: { id: data.doctorId },
      },
    },
    include: {
      patient: true,
      doctor: true,
    },
  });
}

// Get an appointment with patient and doctor details
export async function getAppointmentFull(id: number) {
  return await prisma.appointment.findUnique({
    where: { id },
    include: {
      patient: true,
      doctor: true,
    },
  });
}

// Get upcoming appointments for a doctor
export async function getDoctorUpcomingAppointments(doctorId: number) {
  return await prisma.appointment.findMany({
    where: {
      doctorId,
      appointmentDate: {
        gte: new Date(),
      },
    },
    include: {
      patient: true,
    },
    orderBy: {
      appointmentDate: 'asc',
    },
  });
}

// Update appointment status
export async function setAppointmentStatus(
  id: number,
  status: string,
) {
  return await prisma.appointment.update({
    where: { id },
    data: { status },
  });
}

// Cancel all appointments for a patient
export async function cancelAllPatientAppointments(patientId: number) {
  return await prisma.appointment.updateMany({
    where: { patientId },
    data: { status: 'cancelled' },
  });
}

// Delete an appointment
export async function deleteAppointment(id: number) {
  return await prisma.appointment.delete({
    where: { id },
  });
}
