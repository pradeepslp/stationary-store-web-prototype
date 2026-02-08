import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.service.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const service = await prisma.service.findUnique({ where: { id } });
  if (!service) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const name = (body.name as string)?.trim();
  const slug = (body.slug as string)?.trim() || service.slug;
  const description = (body.description as string)?.trim() || null;
  const priceDetails = (body.priceDetails as string)?.trim() || null;
  const imageUrl = (body.imageUrl as string)?.trim() || null;
  const category = (body.category as string)?.trim() || null;
  const isPublished = !!body.isPublished;

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });

  const updated = await prisma.service.update({
    where: { id },
    data: { name, slug, description, priceDetails, imageUrl, category, isPublished },
  });
  return NextResponse.json(updated);
}
