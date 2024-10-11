import { removeDeletionMarker} from "@/app/lib/prisma";

export async function PATCH() {
    return await removeDeletionMarker();
}