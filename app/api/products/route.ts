import prisma from "@/lib/prisma";
//handle การเพิ่มข้อมูลลงตาราง
export async function POST(request: Request) {
    const body = await request.json();

    //เพิ่มข้อมูลลงตารางในฐานข้อมูล
    try {
        const result = await prisma.product.create({
            data: {
                proname: body.proname,
                proprice: body.proprice,
                proquantity: body.proquantity,
                prodescription: body.prodescription,
            }
        });
        return Response.json(result, { status: 201 });

    } catch (error) {
        console.error("Error:", error);
        return Response.json(
            { message: "พบข้อมูลผิดพลาด", error: error },
            { status: 500 },
        );
    }
}

export async function GET(request: Request) {
    const url = new URL(request.url);
    const proprice = url.searchParams.get("proprice");
    const prodescription = url.searchParams.get("prodescription");

    try {
        //เพิ่มเงื่อนไขในการตรวจสอบเพื่อดึงข้อมูลตามเงื่อนไขที่กำหนด
        if (proprice && prodescription) {
            const result = await prisma.product.findMany({
                where: {
                    AND: [
                        { proprice: { gte: Number(proprice) } },
                        { prodescription: prodescription },
                    ],
                },
            });
            return Response.json(result, { status: 200 });
        }
        const result = await prisma.product.findMany({
            orderBy: { proname: "asc" },
        });

        if (result.length === 0) {
            return Response.json(
                { message: "ไม่พบข้อมูล" },
                { status: 404 },
            );
        }

        return Response.json(result, { status: 200 });

    } catch (error) {
        console.error("Failed for:", error);
        return Response.json(
            { message: "พบข้อมูลผิดพลาด" },
            { status: 500 },
        );
    }

}
export async function PUT(
    request: Request,) {
    const url = new URL(request.url);
    const proqauntity = Number(url.searchParams.get("proquantity"));
    try {
        const result = await prisma.product.updateMany({
            where: {
                proquantity: { gte: proqauntity }
            },
            data: {
                prodescription: "comingsoon",
            }
        });
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Failed for:", error);
        return Response.json(
            { message: "พบข้อมูลผิดพลาด" },
            { status: 500 },
        );
    }

}

export async function DELETE(
    request: Request,) {
    const url = new URL(request.url);
    const proqauntity = Number(url.searchParams.get("proquantity"));
    try {
        const result = await prisma.product.deleteMany({
            where: {
                proquantity: { gte: proqauntity }
            },
        });
        return Response.json(result, { status: 200 });
    } catch (error) {
        console.error("Failed for:", error);
        return Response.json(
            { message: "พบข้อมูลผิดพลาดในการลบข้อมูล" },
            { status: 500 },
        );
    }

}
