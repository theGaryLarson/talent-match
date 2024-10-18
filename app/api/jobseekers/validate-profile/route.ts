import { unflagDeletion } from "@/app/lib/user";
import {setPool} from "@/app/lib/jobseeker";

export async function PATCH() {
    return await unflagDeletion();
    // return await setPool(); here for testing purposes only.
}