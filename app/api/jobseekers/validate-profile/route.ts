import { validateUserProfile} from "@/app/lib/user";



export async function PATCH() {
    await validateUserProfile();
}