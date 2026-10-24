import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';
const conf=window.WOCHENKOCH_SUPABASE||{};
const enabled=/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(conf.url||'')&&!!conf.publishableKey;
const client=enabled?createClient(conf.url,conf.publishableKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}}):null;
let user=null;let ready=false;
const listeners=new Set();
function notify(){for(const f of listeners)f(user)}
function fail(e){throw Error(e?.message||'Unbekannter Fehler')}
async function init(){if(!client)return;const {data,error}=await client.auth.getUser();if(!error)user=data.user;ready=true;notify();client.auth.onAuthStateChange((_event,session)=>{user=session?.user||null;notify()})}
const cloud={enabled, get ready(){return ready}, get user(){return user}, subscribe(fn){listeners.add(fn);fn(user);return()=>listeners.delete(fn)},
 async signUp(email,password){if(!client)throw Error('Supabase ist noch nicht eingerichtet.');const {data,error}=await client.auth.signUp({email,password});if(error)fail(error);return data},
 async signIn(email,password){const {error}=await client.auth.signInWithPassword({email,password});if(error)fail(error)},
 async signOut(){const {error}=await client.auth.signOut();if(error)fail(error)},
 async loadProfile(){if(!user)return null;const {data,error}=await client.from('profiles').select('postal_code,radius_km,stores,compare_mode,diet,excluded_ingredients,people,budget_eur,preferred_store').eq('user_id',user.id).maybeSingle();if(error)fail(error);return data},
 async saveProfile(p){if(!user)throw Error('Bitte anmelden.');const {error}=await client.from('profiles').upsert({user_id:user.id,postal_code:p.plz,radius_km:p.radius,stores:p.stores,compare_mode:p.compare,diet:p.diet,excluded_ingredients:p.excluded,people:p.people,budget_eur:p.budget,preferred_store:p.store},{onConflict:'user_id'});if(error)fail(error)},
 async listPrices({barcode,store,postalCode}){if(!user)throw Error('Bitte anmelden.');let q=client.from('price_observations').select('id,barcode,product_name,store,postal_code,price_eur,package_label,observed_on,is_promotion,created_at').order('observed_on',{ascending:false}).limit(40);if(barcode)q=q.eq('barcode',barcode);if(store)q=q.eq('store',store);if(postalCode)q=q.eq('postal_code',postalCode);const {data,error}=await q;if(error)fail(error);return data||[]},
 async submitPrice(p){if(!user)throw Error('Bitte anmelden.');const {error}=await client.from('price_observations').insert({user_id:user.id,...p});if(error)fail(error)},
 async listConfirmations(ids){if(!user||!ids.length)return [];const {data,error}=await client.from('price_confirmations').select('observation_id,user_id').in('observation_id',ids.slice(0,40));if(error)fail(error);return data||[]},
 async confirm(id){if(!user)throw Error('Bitte anmelden.');const {error}=await client.from('price_confirmations').insert({observation_id:id,user_id:user.id});if(error)fail(error)}
};
window.WochenkochCloud=cloud;window.dispatchEvent(new Event('wochenkoch-cloud-ready'));init().catch(e=>console.error('Supabase Auth:',e.message));
