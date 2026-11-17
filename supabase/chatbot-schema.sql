create table public.menu_concierge_conversations (
    id uuid primary key default gen_random_uuid(),
    name text not null check (char_length(btrim(name)) between 2 and 80),
    phone text not null check (phone ~ '^[+0-9() .-]{7,20}$'),
    requirement text not null check (char_length(btrim(requirement)) between 4 and 600),
    created_at timestamptz not null default now()
);

create table public.menu_concierge_messages (
    id uuid primary key default gen_random_uuid(),
    conversation_id uuid not null references public.menu_concierge_conversations(id) on delete cascade,
    role text not null check (role in ('visitor', 'concierge')),
    content text not null check (char_length(btrim(content)) between 1 and 2000),
    message_order bigint generated always as identity,
    created_at timestamptz not null default now()
);

create index menu_concierge_messages_conversation_order_idx
    on public.menu_concierge_messages (conversation_id, message_order);

alter table public.menu_concierge_conversations enable row level security;
alter table public.menu_concierge_messages enable row level security;

create policy "deny_direct_client_access"
    on public.menu_concierge_conversations
    for all to anon, authenticated
    using (false)
    with check (false);

create policy "deny_direct_client_access"
    on public.menu_concierge_messages
    for all to anon, authenticated
    using (false)
    with check (false);

revoke all on table public.menu_concierge_conversations, public.menu_concierge_messages from anon, authenticated;
grant all on table public.menu_concierge_conversations, public.menu_concierge_messages to service_role;
grant usage, select on sequence public.menu_concierge_messages_message_order_seq to service_role;
