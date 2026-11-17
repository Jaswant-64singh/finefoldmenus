import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: Record<string, unknown>, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
}

function text(value: unknown, minimum: number, maximum: number): string | null {
    if (typeof value !== "string") return null;
    const trimmed = value.trim();
    return trimmed.length >= minimum && trimmed.length <= maximum ? trimmed : null;
}

function getSecretKey(): string {
    const secretMap = JSON.parse(Deno.env.get("SUPABASE_SECRET_KEYS") ?? "{}");
    const secret = secretMap.default ?? Object.values(secretMap)[0];
    return typeof secret === "string" ? secret : Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
}

async function databaseRequest(path: string, method: string, body?: unknown, prefer = "return=minimal") {
    const url = Deno.env.get("SUPABASE_URL");
    const key = getSecretKey();
    if (!url || !key) throw new Error("Storage is not configured.");

    const response = await fetch(`${url}/rest/v1/${path}`, {
        method,
        headers: {
            apikey: key,
            Authorization: `Bearer ${key}`,
            "Content-Type": "application/json",
            Prefer: prefer,
        },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!response.ok) throw new Error("Storage request failed.");
    const responseBody = await response.text();
    return responseBody ? JSON.parse(responseBody) : null;
}

Deno.serve(async (request: Request) => {
    if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
    if (request.method !== "POST") return jsonResponse({ error: "Method not allowed." }, 405);

    const rawBody = await request.text();
    if (rawBody.length > 12000) return jsonResponse({ error: "Request is too large." }, 413);
    let payload: Record<string, unknown>;
    try {
        payload = JSON.parse(rawBody);
    } catch (_) {
        return jsonResponse({ error: "Invalid request." }, 400);
    }

    try {
        if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
            return jsonResponse({ error: "Invalid request." }, 400);
        }

        if (payload.action === "start") {
            const name = text(payload.name, 2, 80);
            const phone = text(payload.phone, 7, 20);
            const requirement = text(payload.requirement, 4, 600);
            const greeting = text(payload.greeting, 1, 2000);
            const answer = text(payload.answer, 1, 2000);
            if (!name || !phone || !/^[+0-9() .-]{7,20}$/.test(phone) || !requirement || !greeting || !answer) {
                return jsonResponse({ error: "Please check the enquiry details and try again." }, 400);
            }

            const rows = await databaseRequest(
                "menu_concierge_conversations?select=id",
                "POST",
                { name, phone, requirement },
                "return=representation",
            );
            const conversationId = rows?.[0]?.id;
            if (!conversationId) throw new Error("Conversation was not created.");

            try {
                await databaseRequest("menu_concierge_messages", "POST", [
                    { conversation_id: conversationId, role: "concierge", content: greeting },
                    { conversation_id: conversationId, role: "visitor", content: requirement },
                    { conversation_id: conversationId, role: "concierge", content: answer },
                ]);
            } catch (error) {
                await databaseRequest(
                    `menu_concierge_conversations?id=eq.${encodeURIComponent(conversationId)}`,
                    "DELETE",
                ).catch(() => null);
                throw error;
            }

            return jsonResponse({ conversation_id: conversationId });
        }

        if (payload.action === "append") {
            const conversationId = typeof payload.conversation_id === "string" ? payload.conversation_id : "";
            const visitorMessage = text(payload.visitor_message, 1, 600);
            const assistantMessage = text(payload.assistant_message, 1, 2000);
            if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(conversationId) || !visitorMessage || !assistantMessage) {
                return jsonResponse({ error: "Invalid chat message." }, 400);
            }

            await databaseRequest("menu_concierge_messages", "POST", [
                { conversation_id: conversationId, role: "visitor", content: visitorMessage },
                { conversation_id: conversationId, role: "concierge", content: assistantMessage },
            ]);
            return jsonResponse({ saved: true });
        }

        return jsonResponse({ error: "Unknown action." }, 400);
    } catch (_) {
        return jsonResponse({ error: "We could not save the conversation right now. Please try again." }, 500);
    }
});
