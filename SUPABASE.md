# Sincronizzazione tra i due telefoni (Supabase)

Serve una sola volta. Al termine, tutto quello che segna uno dei due compare
anche sull'altro telefono, in tempo reale.

## 1. Crea il progetto

1. Vai su <https://supabase.com> e registrati (gratis, si può usare l'account GitHub).
2. **New project** → dai un nome (es. `laraden-movies`), scegli una password
   qualsiasi per il database e la region `Europe (Frankfurt)` o `Europe (West)`.
3. Aspetta 1-2 minuti che il progetto venga creato.

## 2. Crea la tabella

Nel menu a sinistra apri **SQL Editor** → **New query**, incolla tutto questo
e premi **Run**:

```sql
create table if not exists public.titles (
  id           uuid primary key,
  title        text not null,
  kind         text,
  list_name    text,
  group_name   text,
  status       text,
  notes        text,
  together     boolean default false,
  poster       text,
  rating       integer default 0,
  poster_tried boolean default false,
  created_at   timestamptz default now()
);

-- Attiva la sicurezza a livello di riga
alter table public.titles enable row level security;

-- Permette lettura e scrittura tramite la anon key
-- (il repo è pubblico: chi trova il link può leggere/scrivere la lista)
drop policy if exists "accesso pubblico" on public.titles;
create policy "accesso pubblico" on public.titles
  for all using (true) with check (true);

-- Abilita l'aggiornamento in tempo reale tra i due telefoni
alter publication supabase_realtime add table public.titles;
```

## 3. Copia le due chiavi

Menu a sinistra → **Project Settings** → **API**. Servono:

- **Project URL** — qualcosa tipo `https://abcdefgh.supabase.co`
- **anon public** key — una stringa lunga che inizia con `eyJ...`

> La `anon` key è pensata per stare dentro le app lato client: non è una
> password del database. Chi ce l'ha può fare solo ciò che consentono le policy
> del punto 2. **Non usare mai la `service_role` key**, quella è segreta.

## 4. Attivale nell'app

Due modi:

- **Consigliato** — passale a Claude, che le scrive dentro `index.html` nel
  blocco `CONFIG`: da quel momento funziona su entrambi i telefoni senza che
  nessuno debba configurare niente.
- **Manuale** — apri il sito → icona ⚙️ → incolla URL e anon key → *Salva
  setup*. Va fatto su ogni telefono separatamente.

## 5. Porta la lista esistente sul cloud

La prima volta che un telefono si collega con il cloud **vuoto**, la lista che
ha in memoria viene caricata automaticamente.

Se serve rifarlo a mano: ⚙️ → **☁️ Carica la lista di questo telefono sul
cloud**. I titoli già presenti vengono aggiornati con la versione di quel
telefono.

> Fallo dal telefono che ha la lista **più aggiornata** (quello con i voti e i
> film Marvel già segnati), e solo su quello. Sull'altro telefono aprire il
> sito basterà a scaricare tutto.

## Come capire se sta funzionando

L'icona in alto a destra nell'app indica lo stato:

| Icona | Significato |
|-------|-------------|
| ☁️ | Sincronizzato, i due telefoni vedono la stessa lista |
| 📱 | Nessun cloud collegato, i dati restano su questo telefono |
| ⚠️ | Credenziali presenti ma il cloud non risponde (controlla la tabella e le policy) |

Toccando l'icona si apre il pannello Setup con il dettaglio.
