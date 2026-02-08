import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.OWNER_EMAIL ?? "owner@example.com";
  const password = process.env.OWNER_PASSWORD ?? "changeme";
  const passwordHash = await hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    create: { email, passwordHash },
    update: { passwordHash },
  });
  console.log("Owner user synced:", email);

  // Seed sample products
  const products = [
    {
      name: "Premium Ballpoint Pen Set",
      slug: "premium-ballpoint-pen-set",
      description: "Smooth writing experience with comfortable grip",
      price: 299.99,
      category: "Pens",
      published: true,
      imageUrl: null,
    },
    {
      name: "Leather-Bound Notebook",
      slug: "leather-bound-notebook",
      description: "Perfect for journaling and note-taking",
      price: 599.99,
      category: "Notebooks",
      published: true,
      imageUrl: null,
    },
    {
      name: "Colored Pencil Collection (24 colors)",
      slug: "colored-pencil-collection",
      description: "Professional-grade colored pencils for artists",
      price: 799.99,
      category: "Pencils",
      published: true,
      imageUrl: null,
    },
    {
      name: "A4 Copy Paper (500 sheets)",
      slug: "a4-copy-paper",
      description: "High-quality white paper for printing and copying",
      price: 199.99,
      category: "Paper",
      published: true,
      imageUrl: null,
    },
    {
      name: "Highlighter Marker Set",
      slug: "highlighter-marker-set",
      description: "Bright colors for marking important text",
      price: 149.99,
      category: "Markers",
      published: true,
      imageUrl: null,
    },
    {
      name: "Desk Organizer with Compartments",
      slug: "desk-organizer",
      description: "Keep your desk organized and clutter-free",
      price: 449.99,
      category: "Accessories",
      published: true,
      imageUrl: null,
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      create: product,
      update: product,
    });
  }
  console.log("Sample products seeded");

  // Seed sample services
  const services = [
    {
      name: "Xerox & Photocopy",
      slug: "xerox-photocopy",
      description: "Fast and reliable photocopying and document duplication services. Perfect for all your copying needs.",
      category: "Xerox",
      priceDetails: "₹5-10 per page\nBulk discounts available for large orders\nColor copies available",
      isPublished: true,
      imageUrl: null,
    },
    {
      name: "Print Outs Service",
      slug: "print-outs-service",
      description: "High-quality color and black & white printing for all your needs. From brochures to posters.",
      category: "Printing",
      priceDetails: "B/W: ₹5 per page\nColor: ₹15 per page\nBulk packages with special rates available\nSame-day delivery for rush orders",
      isPublished: true,
      imageUrl: null,
    },
    {
      name: "Tamil Nadu E-Sevai Services",
      slug: "tamil-nadu-e-sevai",
      description: "Authorized Tamil Nadu government e-services center. Access all government services at one place.",
      category: "E-Service",
      priceDetails: "Document verification: ₹50\nCertificate issuance: ₹100-200\nOther services as per government rates\nFast processing with expert assistance",
      isPublished: true,
      imageUrl: null,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      create: service,
      update: service,
    });
  }
  console.log("Sample services seeded");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
