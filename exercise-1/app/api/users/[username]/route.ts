import { NextResponse } from "next/server";

type UserRouteContext = {
  params: Promise<{ username: string }>;
};

export async function GET(
  _request: Request,
  { params }: UserRouteContext
) {
  const { username } = await params;

  return NextResponse.json({ username });
}