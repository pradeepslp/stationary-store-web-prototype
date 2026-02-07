import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await prisma.product.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}

export async function PUT(request: Request, { params }: Params) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await request.json();
  const name = (body.name as string)?.trim();
  const slug = (body.slug as string)?.trim() || product.slug;
  const description = (body.description as string)?.trim() || null;
  const price = typeof body.price === "number" ? body.price : parseFloat(body.price);
  const imageUrl = (body.imageUrl as string)?.trim() || null;
  const category = (body.category as string)?.trim() || null;
  const published = !!body.published;

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (Number.isNaN(price) || price < 0)
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });

  const updated = await prisma.product.update({
    where: { id },
    data: { name, slug, description, price, imageUrl, category, published },
  });
  return NextResponse.json(updated);
}
