import { PrismaClient, Role, JobStatus, ApplicationStatus, WorkStatus, PaymentStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding SHRAMIKK Database with Bcrypt Passwords...');

  const defaultWorkerPasswordHash = bcrypt.hashSync('password123', 10);
  const defaultHirerPasswordHash = bcrypt.hashSync('password123', 10);
  const defaultAdminPasswordHash = bcrypt.hashSync('admin123', 10);

  // 1. Clear existing data in correct dependency order
  await prisma.notification.deleteMany({});
  await prisma.financialRecord.deleteMany({});
  await prisma.safetyNetRecord.deleteMany({});
  await prisma.insuranceOption.deleteMany({});
  await prisma.governmentScheme.deleteMany({});
  await prisma.digitalIdentity.deleteMany({});
  await prisma.payment.deleteMany({});
  await prisma.rating.deleteMany({});
  await prisma.workRecord.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.job.deleteMany({});
  await prisma.workerSkill.deleteMany({});
  await prisma.skill.deleteMany({});
  await prisma.hirerProfile.deleteMany({});
  await prisma.workerProfile.deleteMany({});
  await prisma.user.deleteMany({});

  // 2. Seed Skills
  const skillMason = await prisma.skill.create({ data: { name: 'Mason / राजमिस्त्री' } });
  const skillTile = await prisma.skill.create({ data: { name: 'Tile Worker / टाइल मिस्त्री' } });
  const skillPainter = await prisma.skill.create({ data: { name: 'Painter / पेंटर' } });
  const skillPlumber = await prisma.skill.create({ data: { name: 'Plumber / प्लंबर' } });
  const skillCarpenter = await prisma.skill.create({ data: { name: 'Carpenter / बढ़ई' } });
  const skillHelper = await prisma.skill.create({ data: { name: 'Helper / हेल्पर' } });

  console.log('Skills seeded ✓');

  // 3. Seed Users & Profiles (Workers, Hirers & Admin)
  // Worker 1: Ramesh Kumar
  const userRamesh = await prisma.user.create({
    data: {
      email: 'ramesh@shramikk.in',
      phone: '+919876543210',
      passwordHash: defaultWorkerPasswordHash,
      role: Role.WORKER,
    },
  });

  const workerRamesh = await prisma.workerProfile.create({
    data: {
      userId: userRamesh.id,
      name: 'रमेश कुमार (Ramesh Kumar)',
      location: 'Raj Nagar, Ghaziabad',
      bio: 'विशेषज्ञ राजमिस्त्री (ईंट, प्लास्टर, टाइल एवं सिविल स्ट्रक्चर)। 7 वर्षों का प्रमाणित अनुभव।',
      experience: '7 Years',
    },
  });

  await prisma.workerSkill.createMany({
    data: [
      { workerId: workerRamesh.id, skillId: skillMason.id },
      { workerId: workerRamesh.id, skillId: skillTile.id },
    ],
  });

  // Digital Identity for Ramesh
  await prisma.digitalIdentity.create({
    data: {
      workerId: workerRamesh.id,
      isPublic: true,
      publicSlug: 'ramesh-kumar',
    },
  });

  // Worker 2: Suresh Kumar
  const userSuresh = await prisma.user.create({
    data: {
      email: 'suresh@shramikk.in',
      phone: '+919811144556',
      passwordHash: defaultWorkerPasswordHash,
      role: Role.WORKER,
    },
  });

  const workerSuresh = await prisma.workerProfile.create({
    data: {
      userId: userSuresh.id,
      name: 'सुरेश कुमार (Suresh Kumar)',
      location: 'Ahinsa Khand, Indirapuram',
      bio: 'एक्सटीरियर एवं इंटीरियर पुट्टी, रॉयल शाइन और टेक्सचर पेंट विशेषज्ञ।',
      experience: '5 Years',
    },
  });

  await prisma.workerSkill.create({
    data: { workerId: workerSuresh.id, skillId: skillPainter.id },
  });

  // Digital Identity for Suresh
  await prisma.digitalIdentity.create({
    data: {
      workerId: workerSuresh.id,
      isPublic: true,
      publicSlug: 'suresh-kumar',
    },
  });

  // Hirer 1: Amit Sharma
  const userAmit = await prisma.user.create({
    data: {
      email: 'amit@shramikk.in',
      phone: '+919933311223',
      passwordHash: defaultHirerPasswordHash,
      role: Role.HIRER,
    },
  });

  const hirerAmit = await prisma.hirerProfile.create({
    data: {
      userId: userAmit.id,
      name: 'अमित शर्मा (Amit Sharma)',
      location: 'Sector 62, Noida',
      companyName: 'Sharma Civil Contractors',
    },
  });

  // Admin User
  await prisma.user.create({
    data: {
      email: 'admin@shramikk.in',
      phone: '+919999000000',
      passwordHash: defaultAdminPasswordHash,
      role: Role.ADMIN,
    },
  });

  console.log('Users and Profiles seeded with bcrypt hashes ✓');

  // 4. Seed Jobs
  const job1 = await prisma.job.create({
    data: {
      hirerId: hirerAmit.id,
      title: 'Residential Villa Plastering',
      description: 'Need a senior mason for high-quality exterior plastering.',
      location: 'Indirapuram, Ghaziabad',
      wage: 1000.0,
      status: JobStatus.COMPLETED,
    },
  });

  const job2 = await prisma.job.create({
    data: {
      hirerId: hirerAmit.id,
      title: 'Senior Mason for Boundary Wall',
      description: 'Building a boundary wall of height 6 feet and length 120 feet.',
      location: 'Lajpat Nagar, Delhi',
      wage: 950.0,
      status: JobStatus.OPEN,
    },
  });

  const job3 = await prisma.job.create({
    data: {
      hirerId: hirerAmit.id,
      title: 'Villa Painting Project',
      description: 'Interior texture painting with premium Royale Shine finish.',
      location: 'Raj Nagar Extension, Ghaziabad',
      wage: 900.0,
      status: JobStatus.IN_PROGRESS,
    },
  });

  console.log('Jobs seeded ✓');

  // 5. Seed Applications
  // Ramesh applied for job 2 (Boundary Wall)
  await prisma.application.create({
    data: {
      jobId: job2.id,
      workerId: workerRamesh.id,
      status: ApplicationStatus.PENDING,
    },
  });

  // Suresh applied for job 3 (Painting)
  await prisma.application.create({
    data: {
      jobId: job3.id,
      workerId: workerSuresh.id,
      status: ApplicationStatus.APPROVED,
    },
  });

  console.log('Applications seeded ✓');

  // 6. Seed WorkRecord, Rating & Payment (Completed journey for Job 1)
  const workRecordCompleted = await prisma.workRecord.create({
    data: {
      jobId: job1.id,
      workerId: workerRamesh.id,
      hirerId: hirerAmit.id,
      status: WorkStatus.COMPLETED,
      startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    },
  });

  // Rating from Hirer Amit to Worker Ramesh
  await prisma.rating.create({
    data: {
      workRecordId: workRecordCompleted.id,
      fromUserId: userAmit.id,
      toUserId: userRamesh.id,
      rating: 5.0,
      review: 'Outstanding masonry work, completed plastering with precision and neatness.',
    },
  });

  // Payment for the completed work
  await prisma.payment.create({
    data: {
      workRecordId: workRecordCompleted.id,
      hirerId: hirerAmit.id,
      workerId: workerRamesh.id,
      amount: 3000.0, // 3 days at 1000/day
      currency: 'INR',
      paymentMethod: 'UPI',
      demoPaymentId: 'SHR-PAY-9K2L8A71',
      workerConfirmed: true,
      hirerConfirmed: true,
      status: PaymentStatus.RELEASED,
      paidAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      releaseRequestedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      releasedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
  });

  console.log('Completed Work journey seeded ✓');

  // 7. Seed Government Schemes
  await prisma.governmentScheme.createMany({
    data: [
      {
        name: 'e-Shram Portal Registration',
        description: 'National Database of Unorganized Workers for safety net coverage.',
        eligibility: 'Unorganized workers aged 16-59 years.',
        source: 'https://eshram.gov.in',
        active: true,
      },
      {
        name: 'Building & Other Construction Workers (BOCW) Card',
        description: 'State welfare board grants for housing, medical support, and education.',
        eligibility: 'Construction workers with 90 days of work history in the last year.',
        source: 'https://labour.gov.in',
        active: true,
      },
      {
        name: 'Atal Pension Yojana (APY)',
        description: 'Guaranteed pension of ₹1000-₹5000 per month for informal sector workers.',
        eligibility: 'Indian citizens aged 18-40 years with a bank account.',
        source: 'https://www.npscra.nsdl.co.in',
        active: true,
      },
    ],
  });

  // 8. Seed Insurance Options
  await prisma.insuranceOption.createMany({
    data: [
      {
        provider: 'Government of India',
        name: 'Pradhan Mantri Suraksha Bima Yojana (PMSBY)',
        description: 'Accidental death and disability insurance coverage of ₹2 Lakhs.',
        coverage: '₹2,00,000 Accidental Protection',
        active: true,
      },
      {
        provider: 'Government of India',
        name: 'Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY)',
        description: 'Life insurance coverage of ₹2 Lakhs for any cause of death.',
        coverage: '₹2,00,000 Life Protection',
        active: true,
      },
    ],
  });

  console.log('Schemes and Insurance seeded ✓');
  console.log('Database Seeding with Bcrypt Completed Successfully! 🚀');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
