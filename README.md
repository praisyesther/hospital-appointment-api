\# Hospital Appointment API



A Hospital Appointment API built using Node.js, TypeScript, Prisma ORM, and PostgreSQL.



\## Features



\### Patient Operations

\- Create a patient

\- Retrieve patient details

\- Search patients by name or email

\- Update patient phone number

\- Delete a patient



\### Doctor Operations

\- Create a doctor

\- Retrieve doctor details

\- List doctors by specialty

\- Delete a doctor



\### Appointment Operations

\- Book an appointment

\- Retrieve appointment details with patient and doctor information

\- Get upcoming appointments for a doctor

\- Update appointment status

\- Cancel all appointments for a patient

\- Delete an appointment



\## Technologies Used

\- Node.js

\- TypeScript

\- PostgreSQL

\- Prisma ORM



\## Setup



1\. Install dependencies:



&#x20;  `npm install`



2\. Configure the `DATABASE\_URL` environment variable in `.env`.



3\. Generate Prisma Client:



&#x20;  `npx prisma generate`



4\. Seed the database:



&#x20;  `npx prisma db seed`



\## Testing



Run the CRUD test script:



`npx tsx src/test.ts`



\## Database Models

\- Patient

\- Doctor

\- Appointment



The database uses relationships between patients, doctors, and appointments.

