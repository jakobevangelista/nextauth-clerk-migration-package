import { NextRequest, NextResponse } from "next/server";

export async function createBatchImportHandler(
  req: NextRequest,
  oldGetUserById: (id: string) => Promise<unknown>
) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = await req.json();
  console.log(body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const user = await oldGetUserById(body.id as string);

  return new NextResponse(JSON.stringify(user), { status: 200 });
}
