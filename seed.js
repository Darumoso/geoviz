import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const usuarios = [
    { id: 1, password: 'Fuscia', active: false, institution: 'Statistician II', email: 'kfilipowicz0@aboutads.info', firstName: 'Karena', lastName: 'Filipowicz' },
    { id: 2, password: 'Pink', active: true, institution: 'Editor', email: 'rholmyard1@miibeian.gov.cn', firstName: 'Rice', lastName: 'Holmyard' },
    { id: 3, password: 'Green', active: false, institution: 'Accountant IV', email: 'vdraco2@eventbrite.com', firstName: 'Vail', lastName: 'Draco' },
    { id: 4, password: 'Red', active: false, institution: 'VP Marketing', email: 'rspeedy3@spotify.com', firstName: 'Rasia', lastName: 'Speedy' },
    { id: 5, password: 'Khaki', active: false, institution: 'Nurse Practicioner', email: 'gluard4@thetimes.co.uk', firstName: 'Gannie', lastName: 'Luard' },
    { id: 6, password: 'Teal', active: false, institution: 'Senior Financial Analyst', email: 'cyanez5@jalbum.net', firstName: 'Cynthea', lastName: 'Yanez' },
    { id: 7, password: 'Indigo', active: false, institution: 'Systems Administrator II', email: 'acalcraft6@odnoklassniki.ru', firstName: 'Alexandros', lastName: 'Calcraft' },
    { id: 8, password: 'Fuscia', active: true, institution: 'VP Sales', email: 'ameah7@goo.ne.jp', firstName: 'Aubrey', lastName: 'Meah' },
    { id: 9, password: 'Maroon', active: true, institution: 'Nurse Practicioner', email: 'nheminsley8@marketwatch.com', firstName: 'Niki', lastName: 'Heminsley' },
    { id: 10, password: 'Indigo', active: true, institution: 'Product Engineer', email: 'cbouch9@phoca.cz', firstName: 'Cornelia', lastName: 'Bouch' },
  ];

  for (const usuario of usuarios) {
    await prisma.usuario.create({
      data: usuario,
    });
  }

  console.log('Usuarios insertados correctamente');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
