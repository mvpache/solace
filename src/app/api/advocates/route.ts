import { NextRequest } from "next/server";
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { and, arrayContains, gt, ilike } from "drizzle-orm";

interface queryParams {
  firstName?: string;
  lastName?: string;
  city?: string;
  degree?: string;
  specialties?: string;
  yearsOfExpierence?: number;
}

export async function GET(req: NextRequest) {
  // Uncomment this line to use a database

  const searchParams = req.nextUrl.searchParams;

  const firstName = searchParams.get("firstName");
  const lastName = searchParams.get("lastName");
  const city = searchParams.get("city");
  const degree = searchParams.get("degree");
  const specialties = searchParams.get("specialties");
  const yearsOfExpierence = searchParams.get("yearsOfExpierence");

  const filters = [];

  if (firstName) {
    filters.push(ilike(advocates.firstName, `%${firstName}%`));
  }
  if (lastName) {
    filters.push(ilike(advocates.lastName, `%${lastName}%`));
  }
  if (city) {
    filters.push(ilike(advocates.city, `%${city}%`));
  }
  if (degree) {
    filters.push(ilike(advocates.degree, `%${degree}%`));
  }
  if (specialties) {
    filters.push(arrayContains(advocates.specialties, `%${specialties}%`));
  }
  if (yearsOfExpierence) {
    filters.push(gt(advocates.yearsOfExperience, Number(yearsOfExpierence)));
  }

  if (filters.length === 0) {
    const data = await db.select().from(advocates);
    return Response.json({ data });
  } else {
    // TODO: don't cast this as any, cast as the PGSelectBase type
    const data = await (db.select().from(advocates) as any).where(
      and(...filters)
    );
    return Response.json({ data });
  }
}
