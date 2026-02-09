import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.settings.findUnique({
      where: { key: "background_image" },
    });
    return NextResponse.json({ backgroundImage: settings?.value || null });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { backgroundImage } = body;

    if (!backgroundImage) {
      return NextResponse.json({ error: "Background image URL required" }, { status: 400 });
    }

    const setting = await prisma.settings.upsert({
      where: { key: "background_image" },
      update: { value: backgroundImage },
      create: { key: "background_image", value: backgroundImage },
    });

    return NextResponse.json({ success: true, backgroundImage: setting.value });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
