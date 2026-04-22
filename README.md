# Transferradar

Volledige starter voor Transferradar.nl met:
- Next.js frontend
- lichte, duidelijke homepage
- clubpagina's
- backend pagina's voor clubs, geruchten, comments en settings
- Supabase schema voor auth, clubs, geruchten, stemmen, comments en follows
- logomap structuur voor Eredivisie en KKD

## Wat dit pakket al doet
- heeft een complete frontend-structuur
- gebruikt fallback-data zodat het direct draait zonder database
- is voorbereid op Supabase voor echte livegang
- heeft admin pagina's als basis voor beheer

## Wat nog nodig is voor echte livegang
1. Maak een Supabase project aan
2. Draai `supabase/schema.sql`
3. Vul `.env.example` in en hernoem naar `.env.local`
4. Zet echte logo's in `public/logos/eredivisie` en `public/logos/kkd`
5. Deploy op Vercel
6. Koppel je domein `transferradar.nl`

## Lokaal starten
```bash
npm install
npm run dev
```

## Productie build
```bash
npm install
npm run build
npm run start
```

## Aanbevolen live stack
- Hosting: Vercel
- Database/Auth/Storage: Supabase
- E-mail: Resend of Postmark

## Wat eerlijk is om te weten
Deze codebase is zo goed als klaar voor livegang, maar niet volledig plug-and-play zonder jouw eigen Supabase keys en domeininstellingen. Dat deel kan niemand veilig voor je hardcoden zonder toegang tot jouw accounts.

## Structuur
- `app/` pagina's
- `components/` UI onderdelen
- `lib/` types, fallback-data en Supabase helpers
- `public/logos/` clublogo's
- `supabase/schema.sql` database schema
