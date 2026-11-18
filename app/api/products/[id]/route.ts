import prisma from "@/lib/prisma";

export async function GET(
    request: Request,
    { params }: { params: { id: string } },
) {
    const { id } = await params;

    try {
        const result = await prisma.product.findUnique({
            where: { id: Number(id) },
        });

        if (!result) {
            return Response.json(
                { message: "ไม่พบข้อมูล" },
                { status: 404 },
            );
        }
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json(
            { message: "พบข้อมูลผิดพลาด", error: error },
            { status: 500 },
        );
    }
}

export async function PUT(
    request: Request,
    { params }: { params: { id: string } },
) {
    const { id } = await params;
    const body = await request.json();

    try {
        const result = await prisma.product.update({
            where: { id: Number(id) },
            data: {
                proname: body.proname,
                proprice: body.proprice,
                proquantity: body.proquantity,
                prodescription: body.prodescription,
            },
        });
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json(
            { message: "พบข้อมูลผิดพลาด", error: error },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } },
) {
    const { id } = await params;

    try {
        const result = await prisma.product.delete({
            where: { id: Number(id) },
        });
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return Response.json(
            { message: "พบข้อมูลผิดพลาดในการลบข้อมูล", error: error },
            { status: 500 },
        );
    }
}