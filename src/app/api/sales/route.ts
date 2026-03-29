import { NextResponse } from 'next/server';
import salesData from '@/data/salesData.json';

export async function GET() {
  return NextResponse.json(salesData);
}