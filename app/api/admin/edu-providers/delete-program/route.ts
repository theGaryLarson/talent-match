import { deleteProviderProgram } from "@/app/lib/admin/eduProviderPartner";

export default async function POST(req:Request){
    const body:{provider_program_id:string} = await req.json();
    try {
        await deleteProviderProgram(body.provider_program_id)
    } catch (error) {
        
    }
}