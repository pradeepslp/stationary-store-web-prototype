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
  const price = typeof body.price === "number" ? body.price : parseFloat(body.price);
  const imageUrl = (body.imageUrl as string)?.trim() || null;
  const category = (body.category as string)?.trim() || null;
  const published = !!body.published;

  if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
  if (Number.isNaN(price) || price < 0)
    return NextResponse.json({ error: "Invalid price" }, { status: 400 });

  let slug = slugify(name);
  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) {
    let n = 1;
    while (await prisma.product.findUnique({ where: { slug: `${slug}-${n}` } })) n++;
    slug = `${slug}-${n}`;
  }

  const product = await prisma.product.create({
    data: { name, slug, description, price, imageUrl, category, published },
  });
  return NextResponse.json(product);
}
