import type { APIRoute } from "astro";
import { DemoUsers } from "@/data/DemoUsers";

export const GET: APIRoute = async ({ request }) => {
    
    
    
    return new Response(JSON.stringify(DemoUsers));
};