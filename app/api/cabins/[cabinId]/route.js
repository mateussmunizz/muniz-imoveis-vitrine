import { getBookedDatesByImovelId, getImovel } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
  const { imovelId } = params;

  try {
    const [imovel, bookedDates] = await Promise.all([
      getImovel(imovelId),
      getBookedDatesByImovelId(imovelId),
    ]);

    return Response.json({ imovel, bookedDates });
  } catch {
    return Response.json({ message: "Imovel not found" });
  }
}

// export async function POST() {}
