import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const name = (body.name as string)?.trim();
  const description = (body.description as string)?.trim() || null;
  const priceDetails = (body.priceDetails as string)?.trim() || null;
  const imageUrl = (body.imageUrl as string)?.trim() || null;
  const category = (body.category as string)?.trim() || null;
  const isPublished = !!body.isPublished;

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  let slug = slugify(name);
  const existing = await prisma.service.findUnique({ where: { slug } });
  if (existing) {
    let n = 1;
    while (await prisma.service.findUnique({ where: { slug: `${slug}-${n}` } })) n++;
    slug = `${slug}-${n}`;
  }

  const service = await prisma.service.create({
    data: { name, slug, description, priceDetails, imageUrl, category, isPublished },
  });
  return NextResponse.json(service);
}
