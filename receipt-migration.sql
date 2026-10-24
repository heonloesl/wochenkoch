-- Einmal im Supabase SQL Editor ausführen. Kassenzettel enthalten oft keine EAN.
ALTER TABLE public.price_observations ALTER COLUMN barcode DROP NOT NULL;
-- Vorhandene CHECK-Bedingung erlaubt NULL bereits (SQL CHECK wertet UNKNOWN als zulässig).
