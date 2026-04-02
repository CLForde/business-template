import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'sites.json');

export async function POST(req: Request) {
  const body = await req.json();

  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let data = [];

  if (fs.existsSync(filePath)) {
    const file = fs.readFileSync(filePath, 'utf-8');
    data = JSON.parse(file);
  }

  const existingIndex = data.findIndex((site: any) => site.slug === body.slug);

  if (existingIndex >= 0) {
    data[existingIndex] = body;
  } else {
    data.push(body);
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

  return NextResponse.json({ success: true });
}
