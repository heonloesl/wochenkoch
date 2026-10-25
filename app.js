
/* =====================================================
   WOCHENKOCH – APP
   Anmeldung, Profil, Rezepte, Wochenplan, Einkaufsliste
   Hamburger-Menü und eigener Menüpunkt Preise
   ===================================================== */

const ingredients = {
  pasta: { name: 'Nudeln', size: 500, unit: 'g', price: 1.39 },
  tomato: { name: 'Passierte Tomaten', size: 500, unit: 'g', price: 1.19 },
  onion: { name: 'Zwiebeln', size: 1000, unit: 'g', price: 1.79 },
  cheese: { name: 'Geriebener Käse', size: 200, unit: 'g', price: 2.19 },
  rice: { name: 'Reis', size: 500, unit: 'g', price: 1.49 },
  beans: { name: 'Kidneybohnen', size: 250, unit: 'g', price: 0.99 },
  corn: { name: 'Mais', size: 285, unit: 'g', price: 1.09 },
  pepper: { name: 'Paprika', size: 500, unit: 'g', price: 2.49 },
  potato: { name: 'Kartoffeln', size: 1000, unit: 'g', price: 2.49 },
  egg: { name: 'Eier', size: 10, unit: 'Stk', price: 2.99 },
  spinach: { name: 'TK-Spinat', size: 450, unit: 'g', price: 1.79 },
  lentil: { name: 'Rote Linsen', size: 500, unit: 'g', price: 2.29 },
  carrot: { name: 'Karotten', size: 1000, unit: 'g', price: 1.49 },
  wrap: { name: 'Tortilla-Wraps', size: 6, unit: 'Stk', price: 1.99 },
  yogurt: { name: 'Naturjoghurt', size: 500, unit: 'g', price: 1.29 },
  chicken: { name: 'Hähnchenbrust', size: 400, unit: 'g', price: 5.49 },
  broccoli: { name: 'Brokkoli', size: 500, unit: 'g', price: 2.19 },
  couscous: { name: 'Couscous', size: 500, unit: 'g', price: 1.99 },
  chickpea: { name: 'Kichererbsen', size: 240, unit: 'g', price: 0.99 },
  milk: { name: 'Milch', size: 1000, unit: 'ml', price: 1.19 }
};

/* GRUNDREZEPTE */

const recipesBase = [
  {
    name: 'Pasta mit Tomatensoße',
    veg: true,
    items: { pasta: 100, tomato: 180, onion: 70, cheese: 30 },
    steps: 'Nudeln kochen. Zwiebeln anbraten, Tomaten dazugeben und köcheln. Mit Käse servieren.'
  },
  {
    name: 'Bohnen-Reis-Pfanne',
    veg: true,
    items: { rice: 85, beans: 125, corn: 70, pepper: 120, onion: 40 },
    steps: 'Reis kochen. Gemüse anbraten, Bohnen und Mais zugeben und mit Reis mischen.'
  },
  {
    name: 'Kartoffel-Spinat-Omelett',
    veg: true,
    items: { potato: 250, egg: 2, spinach: 120, onion: 30 },
    steps: 'Kartoffeln vorgaren. Mit Zwiebeln und Spinat anbraten, verquirlte Eier darübergeben und stocken lassen.'
  },
  {
    name: 'Rote-Linsen-Dal',
    veg: true,
    items: { lentil: 100, tomato: 140, carrot: 100, rice: 60 },
    steps: 'Karotten würfeln. Mit Linsen und Tomaten in Wasser weich kochen. Reis separat garen.'
  },
  {
    name: 'Gemüse-Wraps',
    veg: true,
    items: { wrap: 2, beans: 90, pepper: 100, yogurt: 80, corn: 70 },
    steps: 'Gemüse und Bohnen erhitzen. Wraps füllen und mit Joghurt servieren.'
  },
  {
    name: 'Couscous mit Kichererbsen',
    veg: true,
    items: { couscous: 90, chickpea: 120, pepper: 100, carrot: 80, yogurt: 50 },
    steps: 'Couscous quellen lassen. Gemüse anbraten und Kichererbsen zugeben. Mit Joghurt servieren.'
  },
  {
    name: 'Brokkoli-Nudelauflauf',
    veg: true,
    items: { pasta: 100, broccoli: 180, cheese: 55, milk: 90 },
    steps: 'Nudeln vorgaren. Brokkoli blanchieren, mit Milch und Käse mischen und überbacken.'
  },
  {
    name: 'Hähnchen-Reis-Pfanne',
    veg: false,
    items: { chicken: 180, rice: 90, broccoli: 160, onion: 40 },
    steps: 'Reis garen. Hähnchen vollständig durchgaren und mit Gemüse anbraten.'
  },
  {
    name: 'Hähnchen-Wraps',
    veg: false,
    items: { chicken: 160, wrap: 2, pepper: 100, yogurt: 70 },
    steps: 'Hähnchen vollständig durchgaren. Mit Paprika und Joghurt in Wraps füllen.'
  }
];

/* Zusätzliche Rezepte aus recipes-extra.js */

const recipes = [
  ...recipesBase,
  ...(Array.isArray(window.WochenkochExtraRecipes)
    ? window.WochenkochExtraRecipes
    : [])
].filter(recipe =>
  recipe &&
  recipe.name &&
  recipe.items &&
  Object.keys(recipe.items).every(key => ingredients[key])
);

const DAYS = [
  'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag',
  'Freitag', 'Samstag', 'Sonntag'
];

const STORES = [
  'REWE', 'EDEKA', 'Lidl', 'Aldi',
  'Netto', 'Kaufland', 'Penny'
];

const ICONS = ['🍝', '🥘', '🥔', '🍛', '🌯', '🥗', '🧀', '🍗', '🌮'];

const $ = id => document.getElementById(id);

const money = value =>
  Number(value).toLocaleString('de-DE', {
    style: 'currency',
    currency: 'EUR'
  });

const esc = value =>
  String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));

function read(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

/* =====================================================
   SPEICHER UND STATUS
   ===================================================== */

let state = {
  people: 2,
  budget: 75,
  store: 'REWE',
  diet: 'all',
  plan: [],
  checks: {},
  ...read('wochenkoch-v1', {})
};

let profile = {
  plz: '93053',
  radius: 10,
  stores: [...STORES],
  compare: 'selected',
  ...read('wochenkoch-profile-v4', {})
};

if (!Array.isArray(profile.stores)) {
  profile.stores = [...STORES];
}

if (!Array.isArray(profile.excluded)) {
  profile.excluded = [];
}

if (!Array.isArray(state.plan)) {
  state.plan = [];
}

let shopHidden = read('wochenkoch-shop-hidden-v1', []);
let shopExtras = read('wochenkoch-shop-extras-v1', []);

if (!Array.isArray(shopHidden)) shopHidden = [];
if (!Array.isArray(shopExtras)) shopExtras = [];

const MEALS = ['breakfast','lunch','dinner'];
const MEAL_NAMES = {breakfast:'Frühstück',lunch:'Mittagessen',dinner:'Abendessen'};
const FAVORITES_KEY = 'wochenkoch-favoriten-v1';
let favorites = read(FAVORITES_KEY, []);
if (!Array.isArray(favorites)) favorites = [];
let librarySearch = '', libraryDiet = 'all', libraryCategory = 'all', libraryFavorites = false;
if (!Array.isArray(state.meals) || !state.meals.length) state.meals = ['dinner'];
function slots() {return DAYS.flatMap((_,day)=>state.meals.map(meal=>({day,meal})));}
function recipeCategory(recipe) {
  const c = recipe.category || '';
  if (c === 'Dessert') return 'dessert';
  if (c === 'Frühstück') return 'breakfast';
  if (c === 'Snack & Frühstück') return /Frühstück|Overnight|Hafer-Bowl|Mini-Pfannkuchen/i.test(recipe.name)?'breakfast':'snack';
  if (/Porridge|Frühstück|Overnight|Rührei|Pfannkuchen|Joghurt-Snack/i.test(recipe.name)) return 'breakfast';
  return 'main';
}
function mealMatch(recipe,meal) {
  const c=recipeCategory(recipe);
  return meal==='breakfast' ? c==='breakfast'||c==='snack' : c==='main';
}
function favorite(name){return favorites.includes(name);}
function star(recipe){return `<button type="button" class="wk-star" data-favorite="${esc(recipe.name)}" aria-label="${favorite(recipe.name)?'Favorit entfernen':'Favorit speichern'}" aria-pressed="${favorite(recipe.name)}">${favorite(recipe.name)?'★':'☆'}</button>`;}
let shopFilter = 'all';
let tab = 'home';

let cloudUser = null;
let profileCompleted = false;
let authReady = false;
let cloudProfileLoadedFor = null;

let communityAverages = {};
let averagesLoadedFor = null;

const cloud = () => window.WochenkochCloud;

function save() {
  localStorage.setItem('wochenkoch-v1', JSON.stringify(state));
}

function saveProfile() {
  localStorage.setItem('wochenkoch-profile-v4', JSON.stringify(profile));
}

function saveShop() {
  localStorage.setItem('wochenkoch-shop-hidden-v1', JSON.stringify(shopHidden));
  localStorage.setItem('wochenkoch-shop-extras-v1', JSON.stringify(shopExtras));
}

function toast(message) {
  const element = $('toast');
  if (!element) return;

  element.textContent = message;
  element.style.display = 'block';

  clearTimeout(window._toastTimer);

  window._toastTimer = setTimeout(() => {
    element.style.display = 'none';
  }, 2500);
}

/* =====================================================
   HAMBURGER-MENÜ
   ===================================================== */

function closeSideMenu() {
  const menu = $('sideMenu');
  const backdrop = $('menuBackdrop');
  const toggle = $('menuToggle');

  if (menu) menu.hidden = true;
  if (backdrop) backdrop.hidden = true;

  if (toggle) {
    toggle.setAttribute('aria-expanded', 'false');
  }
}

function openSideMenu() {
  if (!cloudUser || !profileCompleted) return;

  const menu = $('sideMenu');
  const backdrop = $('menuBackdrop');
  const toggle = $('menuToggle');

  if (!menu || !backdrop || !toggle) return;

  menu.hidden = false;
  backdrop.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');

  $('menuClose')?.focus();
}

function navigate(destination) {
  if (!cloudUser || !profileCompleted) return;

  closeSideMenu();

  if (destination === 'prices') {
    window.location.href = './preise.html';
    return;
  }

  if (!['home', 'plan', 'shop', 'profile', 'library'].includes(destination)) {
    return;
  }

  tab = destination;
  render();

  window.scrollTo({
    top: 0,
    behavior: 'instant'
  });
}

$('menuToggle')?.addEventListener('click', () => {
  if ($('sideMenu')?.hidden) {
    openSideMenu();
  } else {
    closeSideMenu();
  }
});

$('menuClose')?.addEventListener('click', closeSideMenu);
$('menuBackdrop')?.addEventListener('click', closeSideMenu);

document.querySelectorAll('[data-menu-tab]').forEach(button => {
  button.addEventListener('click', () => {
    navigate(button.dataset.menuTab);
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeSideMenu();
});

/* =====================================================
   PREISE
   ===================================================== */

async function refreshAverages() {
  if (
    !cloudUser ||
    !profileCompleted ||
    !cloud()?.listAverageSource ||
    !window.WochenkochAverages
  ) return;

  try {
    const rows = await cloud().listAverageSource();

    communityAverages =
      window.WochenkochAverages.summarize(rows, ingredients);

    render();
  } catch (error) {
    console.warn('Durchschnittspreise:', error.message);
  }
}

function priceFor(key) {
  const all = read('wochenkoch-prices-v2', {});
  const saved = all[state.store + '|' + key];

  if (
    saved &&
    Number.isFinite(Number(saved.price)) &&
    Number(saved.price) >= 0
  ) {
    return Number(saved.price);
  }

  return communityAverages[state.store + '|' + key]?.price ?? null;
}

/* =====================================================
   REZEPTE UND EINKAUF
   ===================================================== */

function allowedRecipe(recipe) {
  if (state.diet === 'vegetarian' && !recipe.veg) {
    return false;
  }

  if (
    state.diet === 'vegan' &&
    Object.keys(recipe.items).some(key =>
      ['chicken','turkey','beef','pork','salmon','cod','shrimp','egg','cheese','milk','yogurt','honey','cream','mozzarella','parmesan','halloumi','quark','skyr','butter','yogurt_sauce','tzatziki'].includes(key)
    )
  ) {
    return false;
  }

  return !Object.keys(recipe.items).some(key =>
    profile.excluded.includes(key)
  );
}

function shopping() {
  const amounts = {};

  state.plan.forEach(index => {
    const recipe = recipes[index];
    if (!recipe) return;

    Object.entries(recipe.items).forEach(([key, quantity]) => {
      amounts[key] = (amounts[key] || 0) + quantity * state.people;
    });
  });

  return Object.entries(amounts)
    .map(([key, amount]) => {
      const ingredient = ingredients[key];
      const packs = Math.ceil(amount / ingredient.size);
      const custom = priceFor(key);

      return {
        key,
        amount,
        packs,
        cost: packs * (custom ?? ingredient.price),
        custom: custom !== null
      };
    })
    .sort((a, b) =>
      ingredients[a.key].name.localeCompare(
        ingredients[b.key].name,
        'de'
      )
    );
}

function total() {
  return shopping().reduce((sum, item) => sum + item.cost, 0);
}

function shopItems() {
  return [
    ...shopping()
      .filter(item => !shopHidden.includes(item.key))
      .map(item => ({
        ...item,
        id: item.key,
        name: ingredients[item.key].name,
        detail:
          `${item.amount} ${ingredients[item.key].unit} · ` +
          `${item.packs} × ${ingredients[item.key].size} ` +
          ingredients[item.key].unit,
        priceLabel: item.custom
          ? 'Preisbeobachtung'
          : 'Schätzwert'
      })),

    ...shopExtras.map(item => ({
      id: item.id,
      name: item.name,
      detail: 'Zusätzlich hinzugefügt',
      cost: 0,
      priceLabel: 'Ohne Preis'
    }))
  ];
}

function generate() {
  const wanted=slots();
  if(!wanted.length){toast('Bitte mindestens eine Mahlzeit wählen');return;}
  const pools=wanted.map(slot=>recipes.map((r,i)=>i).filter(i=>allowedRecipe(recipes[i])&&mealMatch(recipes[i],slot.meal)));
  if(pools.some(pool=>!pool.length)){toast('Für eine Mahlzeit fehlen passende Rezepte');return;}
  let best=[],bestCost=Infinity;
  for(let attempt=0;attempt<120;attempt++){
    const used=new Set();
    const candidate=pools.map(pool=>{
      const options=pool.filter(i=>!used.has(i));
      const choices=options.length?options:pool;
      const index=choices[Math.floor(Math.random()*choices.length)];
      used.add(index);return index;
    });
    state.plan=candidate;
    const cost=total();
    if(cost<bestCost){bestCost=cost;best=[...candidate];}
    if(cost<=state.budget)break;
  }
  state.plan=best;state.checks={};shopHidden=[];saveShop();save();render();
}

/* =====================================================
   GEMEINSAME HTML-BAUSTEINE
   ===================================================== */

function section(name, action = '', target = '') {
  return `
    <div class="section">
      <h2>${name}</h2>
      ${action
        ? `<button class="link" data-go="${target}">${action} →</button>`
        : ''}
    </div>
  `;
}

/* =====================================================
   STARTSEITE
   ===================================================== */

function home() {
  const cost = total();

  const percent = state.budget
    ? Math.min(100, cost / state.budget * 100)
    : 100;

  const firstRecipe = recipes[state.plan[0] ?? 0] || recipes[0];

  return `
    <div class="eyebrow">DEIN KÜCHENALLTAG, EINFACHER</div>

    <h1 class="title">Gut essen.<br>Clever planen.</h1>

    <p class="subtitle">
      Deine Woche auf einen Blick – alles an einem Ort.
    </p>

    <div class="hero">
      <div class="eyebrow">
        GEPLANTER EINKAUF · SCHÄTZUNG · COMMUNITY / DEMO
      </div>

      <div class="big">${money(cost)}</div>

      <p>von ${money(state.budget)} Wochenbudget</p>

      <div class="progress">
        <i style="width:${percent}%"></i>
      </div>

      <div class="row small">
        <span>
          ${cost > state.budget
            ? 'Über deinem Budget'
            : 'Im Blick behalten'}
        </span>

        <strong>
          ${cost > state.budget
            ? money(cost - state.budget) + ' darüber'
            : money(state.budget - cost) + ' übrig'}
        </strong>
      </div>
    </div>

    ${section('Heute auf dem Teller', 'Alle Gerichte', 'plan')}

    <div class="card recipe">
      <div class="recipe-art">
        ${ICONS[(state.plan[0] ?? 0) % ICONS.length]}
      </div>

      <div class="recipe-body">
        <div class="recipe-day">
          Dein erstes geplantes Gericht
        </div>

        <div class="recipe-name">
          ${esc(firstRecipe.name)}
        </div>

        <div class="small muted">
          ${state.people} Portionen
        </div>
      </div>
    </div>

    ${section('Schnellzugriff')}

    <div class="stack">
      <button class="btn full" data-go="plan">
        Wochenplan ansehen →
      </button>

      <button class="btn alt full" data-go="shop">
        Einkaufsliste öffnen →
      </button>

      <button class="btn alt full" data-go="prices">Preiszentrale öffnen →</button>
      <button class="btn alt full" data-go="library">Alle Rezepte entdecken →</button>
    </div>

    <div class="card">
      <div class="row">
        <div>
          <div class="strong">Deine Einkaufsregion</div>

          <div class="small muted">
            ${esc(profile.plz)} · ${profile.radius} km ·
            ${profile.stores.length} Märkte ausgewählt
          </div>
        </div>

        <button class="link" data-go="profile">
          Ändern
        </button>
      </div>
    </div>

    <div class="warn">
      Preise sind Testwerte oder selbst eingetragen.
      Noch kein automatischer Live-Preisvergleich.
    </div>
  `;
}

/* =====================================================
   WOCHENPLAN
   ===================================================== */

function plan() {
  return `
    <div class="eyebrow">DEIN SPEISEPLAN</div>

    <h1 class="title">Deine Woche</h1>

    <p class="subtitle">
      Dein kompletter Speiseplan – flexibel für jede Mahlzeit.
      ${recipes.length} Rezepte verfügbar.
    </p>

    <div class="card">
      <div class="fields">
        <div class="field">
          <label for="people">Personen</label>
          <select id="people">
            ${[1, 2, 3, 4, 5, 6].map(number => `
              <option
                value="${number}"
                ${state.people === number ? 'selected' : ''}
              >${number}</option>
            `).join('')}
          </select>
        </div>

        <div class="field">
          <label for="budget">Wochenbudget (€)</label>
          <input
            id="budget"
            type="number"
            min="10"
            max="1000"
            value="${state.budget}"
          >
        </div>

        <div class="field">
          <label for="store">Preisgrundlage</label>
          <select id="store">
            ${(profile.stores.length
              ? profile.stores
              : STORES
            ).map(store => `
              <option ${state.store === store ? 'selected' : ''}>
                ${store}
              </option>
            `).join('')}
          </select>
        </div>

        <div class="field">
          <label for="diet">Ernährung</label>
          <select id="diet">
            <option value="all"
              ${state.diet === 'all' ? 'selected' : ''}>
              Alles
            </option>

            <option value="vegetarian"
              ${state.diet === 'vegetarian' ? 'selected' : ''}>
              Vegetarisch
            </option>

            <option value="vegan"
              ${state.diet === 'vegan' ? 'selected' : ''}>
              Vegan
            </option>
          </select>
        </div>
      </div>

      <fieldset class="wk-meals"><legend>Mahlzeiten für alle 7 Tage</legend>
        ${MEALS.map(meal=>`<label style="display:block;padding:8px"><input type="checkbox" data-meal="${meal}" ${state.meals.includes(meal)?'checked':''}> ${MEAL_NAMES[meal]}</label>`).join('')}
      </fieldset>
      <p class="small muted">Keine Allergieprüfung.</p>

      <button class="btn full" id="generate">
        Neue Woche planen ↻
      </button>
    </div>

    ${section('Alle Gerichte')}

    ${state.plan.map((index, slotIndex) => {
      const slot = slots()[slotIndex];
      if(!slot)return '';
      const recipe = recipes[index];

      if (!recipe) return '';

      return `
        ${slotIndex===0 || slots()[slotIndex-1]?.day!==slot.day ? `
          <div class="wk-day-header"><span class="wk-day-number">${slot.day+1}</span><div><strong>${DAYS[slot.day]}</strong><div class="small muted">${state.meals.length} Mahlzeit${state.meals.length===1?'':'en'}</div></div></div>
        ` : ''}
        <div class="card wk-meal-card">
          <div class="recipe">
            <div class="recipe-art">
              ${ICONS[index % ICONS.length]}
            </div>

            <div class="recipe-body">
              <div class="recipe-day">
                ${DAYS[slot.day]} · ${MEAL_NAMES[slot.meal]}
              </div>

              <div class="recipe-name">
                ${esc(recipe.name)}
              </div>

              <span class="small muted">
                ${recipe.vegan?'Vegan':recipe.veg?'Vegetarisch':'Mit Fleisch'}
              </span>
            </div>

            ${star(recipe)}
            <button
              class="link"
              data-swap="${slotIndex}"
              aria-label="Gericht gezielt austauschen"
            >Tauschen ↻</button>
          </div>

          <details class="expand">
            <summary>Rezept & Zutaten anzeigen</summary>

            <p>${esc(recipe.steps)}</p>

            <ul>
              ${Object.entries(recipe.items)
                .map(([key, quantity]) => `
                  <li>
                    ${esc(ingredients[key].name)}:
                    ${quantity * state.people}
                    ${ingredients[key].unit}
                  </li>
                `).join('')}
            </ul>
          </details>
        </div>
      `;
    }).join('')}

    <div class="warn">
      Der Plan verwendet Demo- und Eigenpreise.
      Fehlende Gewürze, Öl und mögliche Allergene
      werden nicht berücksichtigt.
    </div>
  `;
}

/* =====================================================
   EINKAUFSLISTE
   ===================================================== */

function shop() {
  const items = shopItems();

  const done = items.filter(item => state.checks[item.id]).length;

  const remaining = items
    .filter(item => !state.checks[item.id])
    .reduce((sum, item) => sum + item.cost, 0);

  const visible = items.filter(item =>
    shopFilter === 'all' ||
    (shopFilter === 'open'
      ? !state.checks[item.id]
      : !!state.checks[item.id])
  );

  return `
    <div class="eyebrow">DEIN EINKAUF, GANZ ENTSPANNT</div>

    <h1 class="title">Einkaufen</h1>

    <p class="subtitle">
      ${esc(state.store)} · ${state.people} Personen ·
      Alles griffbereit
    </p>

    <div class="shop-summary">
      <div class="small">Noch auf deiner Liste</div>

      <div class="shop-summary-main">
        <strong>${money(remaining)}</strong>
        <span>${done} von ${items.length} erledigt</span>
      </div>

      <div class="shop-track">
        <span style="width:${
          items.length ? done / items.length * 100 : 100
        }%"></span>
      </div>

      <div class="small">
        Ungefähre Kosten der offenen Artikel · keine Livepreise
      </div>
    </div>

    <div class="shop-add">
      <input
        id="shopNewItem"
        maxlength="80"
        placeholder="Artikel hinzufügen, z. B. Äpfel"
        aria-label="Neuen Artikel eingeben"
      >

      <button class="btn" id="shopAdd">
        ＋
      </button>
    </div>

    <div class="shop-toolbar">
      <button
        data-shopfilter="all"
        class="${shopFilter === 'all' ? 'selected' : ''}"
      >
        Alle (${items.length})
      </button>

      <button
        data-shopfilter="open"
        class="${shopFilter === 'open' ? 'selected' : ''}"
      >
        Offen (${items.length - done})
      </button>

      <button
        data-shopfilter="done"
        class="${shopFilter === 'done' ? 'selected' : ''}"
      >
        Erledigt (${done})
      </button>
    </div>

    <p class="small muted shop-hint">
      Nach links wischen zum Löschen ·
      Häkchen setzen zum Abhaken
    </p>

    <div class="shop-list">
      ${visible.length
        ? visible.map(item => {
          const checked = !!state.checks[item.id];

          return `
            <div
              class="shop-swipe"
              data-swipe="${esc(item.id)}"
            >
              <button
                class="shop-delete"
                data-remove="${esc(item.id)}"
              >
                Löschen
              </button>

              <div class="shop-item">
                <label class="shop-item-check">
                  <input
                    type="checkbox"
                    data-check="${esc(item.id)}"
                    ${checked ? 'checked' : ''}
                    aria-label="${esc(item.name)} erledigt"
                  >
                </label>

                <div class="shop-item-info ${checked ? 'done' : ''}">
                  <div class="strong">
                    ${esc(item.name)}
                  </div>

                  <div class="small muted">
                    ${esc(item.detail)}
                  </div>
                </div>

                <div class="shop-item-price">
                  <strong>
                    ${item.cost ? money(item.cost) : '–'}
                  </strong>

                  <span class="small muted">
                    ${esc(item.priceLabel)}
                  </span>
                </div>

                <button
                  class="shop-remove-icon"
                  data-remove="${esc(item.id)}"
                  aria-label="${esc(item.name)} löschen"
                >×</button>
              </div>
            </div>
          `;
        }).join('')
        : '<div class="shop-empty">Hier ist gerade alles erledigt. 🌿</div>'
      }
    </div>

    <div class="shop-actions">
      <button class="btn alt" id="copy">
        Liste kopieren
      </button>

      <button class="btn ghost" id="clearChecks">
        Häkchen zurücksetzen
      </button>
    </div>

    ${shopHidden.length
      ? `<button class="link" id="restoreShop">
          ${shopHidden.length}
          entfernte Rezeptzutaten wiederherstellen ↶
        </button>`
      : ''
    }

    <div class="warn">
      Preisangaben sind Schätzungen aus verfügbaren
      Beobachtungen oder Demo-Werten.
      Selbst ergänzte Artikel haben noch keinen Preis.
    </div>

    <div class="card">
      <div class="strong">Preise verbessern</div>

      <p class="small muted">
        In der Preiszentrale kannst du Preise
        für deinen Supermarkt melden.
      </p>

      <button class="btn alt" data-go="prices">
        Preiszentrale öffnen →
      </button>
    </div>
  `;
}

/* =====================================================
   PROFIL
   ===================================================== */

function profileView() {
  return `
    <div class="eyebrow">DEINE EINSTELLUNGEN</div>

    <h1 class="title">Mein Profil</h1>

    <p class="subtitle">
      ${profileCompleted
        ? 'Deine persönlichen Einstellungen – jederzeit änderbar.'
        : 'Richte dein Profil ein, um Wochenkoch zu starten.'}
    </p>

    <div class="card">
      <div class="strong" style="margin-bottom:15px">
        Meine Einkaufsregion
      </div>

      <div class="fields">
        <div class="field">
          <label for="plz">Postleitzahl</label>

          <input
            id="plz"
            inputmode="numeric"
            maxlength="5"
            value="${esc(profile.plz)}"
          >
        </div>

        <div class="field">
          <label for="radius">Umkreis</label>

          <select id="radius">
            ${[1, 3, 5, 10, 15, 20, 30, 50].map(number => `
              <option
                value="${number}"
                ${profile.radius === number ? 'selected' : ''}
              >
                ${number} km
              </option>
            `).join('')}
          </select>
        </div>
      </div>

      <p class="small muted">
        PLZ und Radius sind Suchpräferenzen.
        Eine geprüfte Filialsuche ist noch nicht angebunden.
      </p>
    </div>

    <div class="card">
      <div class="strong" style="margin-bottom:13px">
        Meine Supermärkte
      </div>

      <div class="storegrid">
        ${STORES.map(store => `
          <label class="storecheck">
            <input
              type="checkbox"
              data-store="${store}"
              ${profile.stores.includes(store) ? 'checked' : ''}
            >
            ${store}
          </label>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="strong" style="margin-bottom:13px">
        Ernährung & Ausschlüsse
      </div>

      <div class="field">
        <label for="profileDiet">Ernährungsweise</label>

        <select id="profileDiet">
          <option value="all"
            ${state.diet === 'all' ? 'selected' : ''}>
            Alles
          </option>

          <option value="vegetarian"
            ${state.diet === 'vegetarian' ? 'selected' : ''}>
            Vegetarisch
          </option>

          <option value="vegan"
            ${state.diet === 'vegan' ? 'selected' : ''}>
            Vegan
          </option>
        </select>
      </div>

      <p class="small muted">
        Diese Zutaten in Rezepten ausschließen:
      </p>

      <div class="storegrid">
        ${Object.entries(ingredients).map(([key, ingredient]) => `
          <label class="storecheck">
            <input
              type="checkbox"
              data-exclude="${key}"
              ${profile.excluded.includes(key) ? 'checked' : ''}
            >
            ${esc(ingredient.name)}
          </label>
        `).join('')}
      </div>
    </div>

    <div class="card">
      <div class="strong" style="margin-bottom:13px">
        Preisvergleich
      </div>

      <label class="checkrow">
        <input
          type="radio"
          name="compare"
          value="selected"
          ${profile.compare === 'selected' ? 'checked' : ''}
        >
        <span>Nur meine ausgewählten Supermärkte</span>
      </label>

      <label class="checkrow">
        <input
          type="radio"
          name="compare"
          value="all"
          ${profile.compare === 'all' ? 'checked' : ''}
        >
        <span>Alle verfügbaren Märkte</span>
      </label>

      <p class="small muted">
        Vorgemerkt für den späteren Filial- und Preisvergleich.
      </p>
    </div>

    <button class="btn full" id="saveProfile">
      Einstellungen speichern
    </button>

    ${accountSection()}

    <div class="card">
      <div class="strong">Datenschutz</div>

      <p class="small muted">
        Profileinstellungen werden mit deinem Benutzerkonto
        in Supabase gespeichert. Wochenplan und Einkaufshäkchen
        bleiben derzeit lokal auf diesem Gerät.
        Preisbeobachtungen sind für andere angemeldete
        Nutzer sichtbar.
      </p>
    </div>
  `;
}

/* =====================================================
   ANMELDUNG
   ===================================================== */

function accountSection() {
  const connection = cloud();

  if (!connection?.enabled) {
    return `
      <div class="card">
        <div class="strong">Verbindung fehlt</div>

        <p class="small muted">
          Bitte Supabase-Projekt-URL und Publishable Key
          in config.js prüfen.
        </p>
      </div>
    `;
  }

  if (!cloudUser) {
    return `
      <div class="card">
        <div class="strong">
          Anmelden oder registrieren
        </div>

        <p class="small muted">
          Öffentliche Registrierung mit E-Mail-Bestätigung.
        </p>

        <div class="field">
          <label>E-Mail</label>
          <input
            id="authEmail"
            type="email"
            autocomplete="email"
          >
        </div>

        <div class="field" style="margin-top:10px">
          <label>Passwort (mindestens 8 Zeichen)</label>
          <input
            id="authPassword"
            type="password"
            minlength="8"
            autocomplete="current-password"
          >
        </div>

        <div class="row" style="margin-top:14px">
          <button class="btn" id="signIn">
            Anmelden
          </button>

          <button class="btn alt" id="signUp">
            Registrieren
          </button>
        </div>
      </div>
    `;
  }

  return `
    <div class="card">
      <div class="strong">Angemeldet</div>

      <p class="small muted">
        ${esc(cloudUser.email || 'Konto')}
      </p>

      <button class="btn alt" id="signOut">
        Abmelden
      </button>

      <p class="small muted">
        Profil wird beim Speichern synchronisiert.
        Preisbestätigungen sind in der Preiszentrale.
      </p>
    </div>
  `;
}

function authScreen() {
  return `
    <div class="eyebrow">
      WILLKOMMEN BEI WOCHENKOCH
    </div>

    <h1 class="title">Dein Essen. Dein Plan.</h1>

    <p class="subtitle">
      Erstelle ein kostenloses Konto oder melde dich an,
      um Wochenkoch zu nutzen.
    </p>

    ${accountSection()}

    <p class="small muted">
      Mit der Registrierung werden deine Profileinstellungen
      später in deinem privaten Konto gespeichert.
    </p>
  `;
}

/* =====================================================
   ANZEIGE AKTUALISIEREN
   ===================================================== */

function render() {
  const locked = !cloudUser || !profileCompleted;

  const tabs = document.querySelector('.tabs');
  if (tabs) tabs.hidden = locked;

  const menuToggle = $('menuToggle');
  if (menuToggle) menuToggle.hidden = locked;

  if (locked) closeSideMenu();

  document.querySelectorAll('[data-tab]').forEach(button => {
    const active = button.dataset.tab === tab;

    button.classList.toggle('active', active);

    button.setAttribute(
      'aria-current',
      active ? 'page' : 'false'
    );
  });

  if ($('regionTop')) {
    $('regionTop').textContent =
      profile.plz + ' · Einkaufsregion';
  }

  const content = $('content');
  if (!content) return;

  if (!authReady) {
    content.innerHTML = `
      <div class="card">
        Verbindung und Anmeldung werden geprüft …
      </div>
    `;
    return;
  }

  if (!cloudUser) {
    content.innerHTML = authScreen();
    return;
  }

  if (!profileCompleted) {
    content.innerHTML =
      '<div class="eyebrow">ERSTER SCHRITT</div>' +
      profileView();
    return;
  }

  const pages = {
    home,
    plan,
    shop,
    library,
    profile: profileView
  };

  content.innerHTML = (pages[tab] || home)();
}

function library(){
  const shown=recipes.filter(r=>{
    if(!allowedRecipe(r))return false;
    if(libraryFavorites&&!favorite(r.name))return false;
    if(libraryDiet==='vegan'&&!r.vegan&&Object.keys(r.items).some(k=>['chicken','turkey','beef','pork','salmon','cod','shrimp','egg','cheese','milk','yogurt','honey','cream','mozzarella','parmesan','halloumi','quark','skyr','butter','yogurt_sauce','tzatziki'].includes(k)))return false;
    if(libraryDiet==='vegetarian'&&!r.veg)return false;
    if(libraryDiet==='meat'&&r.veg)return false;
    if(libraryCategory!=='all'&&recipeCategory(r)!==libraryCategory)return false;
    return r.name.toLocaleLowerCase('de').includes(librarySearch.toLocaleLowerCase('de'));
  });
  return `<div class="eyebrow">ENTDECKEN & MERKEN</div><h1 class="title">Alle Rezepte</h1>
  <p class="subtitle">${shown.length} von ${recipes.length} Rezepten · ${favorites.length} Favoriten</p>
  <div class="card wk-library-filters">
  <label>Suche<input id="librarySearch" type="search" placeholder="Gericht suchen" value="${esc(librarySearch)}"></label>
  <label>Ernährung<select id="libraryDiet">${[['all','Alle'],['vegetarian','Vegetarisch'],['vegan','Vegan'],['meat','Mit Fleisch']].map(([v,n])=>`<option value="${v}" ${libraryDiet===v?'selected':''}>${n}</option>`).join('')}</select></label>
  <label>Kategorie<select id="libraryCategory">${[['all','Alle Kategorien'],['main','Hauptgerichte'],['breakfast','Frühstück'],['snack','Snacks'],['dessert','Desserts']].map(([v,n])=>`<option value="${v}" ${libraryCategory===v?'selected':''}>${n}</option>`).join('')}</select></label>
  <label class="wk-only-favs"><input id="libraryFavorites" type="checkbox" ${libraryFavorites?'checked':''}> Nur meine Favoriten ⭐</label></div>
  <div class="wk-library-results">${shown.slice(0,180).map(r=>`<div class="card wk-library-card"><div class="row"><div><strong>${esc(r.name)}</strong><div class="small muted">${r.vegan?'Vegan':r.veg?'Vegetarisch':'Mit Fleisch'} · ${recipeCategory(r)==='main'?'Hauptgericht':recipeCategory(r)==='breakfast'?'Frühstück':recipeCategory(r)==='dessert'?'Dessert':'Snack'}</div></div>${star(r)}</div><details class="expand"><summary>Rezept & Zutaten</summary><p>${esc(r.steps)}</p><ul>${Object.entries(r.items).map(([k,q])=>`<li>${esc(ingredients[k]?.name||k)}: ${q} ${ingredients[k]?.unit||''} pro Person</li>`).join('')}</ul></details></div>`).join('')||'<p>Keine passenden Rezepte.</p>'}</div>
  ${shown.length>180?`<p class="small muted">Es werden die ersten 180 Treffer angezeigt. Bitte Suche oder Filter verwenden.</p>`:''}`;
}

/* =====================================================
   EINKAUFSLISTE – AKTIONEN
   ===================================================== */

function addShopItem() {
  const input = $('shopNewItem');
  const name = input?.value.trim();

  if (!name) {
    toast('Bitte einen Artikel eingeben');
    return;
  }

  if (name.length > 80) return;

  shopExtras.push({
    id: 'extra-' + Date.now() + '-' +
      Math.random().toString(36).slice(2, 7),
    name
  });

  saveShop();
  render();

  toast('Artikel hinzugefügt');
}

function removeShopItem(id) {
  const item = shopItems().find(entry => entry.id === id);
  if (!item) return;

  if (id.startsWith('extra-')) {
    shopExtras = shopExtras.filter(entry => entry.id !== id);
  } else if (!shopHidden.includes(id)) {
    shopHidden.push(id);
  }

  delete state.checks[id];

  saveShop();
  save();
  render();

  toast('Artikel entfernt');
}

/* =====================================================
   BUTTONS UND KLICKS
   ===================================================== */

function openSwapDialog(slotIndex){
  const slot=slots()[slotIndex];if(!slot)return;
  document.getElementById('wkSwapOverlay')?.remove();
  const overlay=document.createElement('div');overlay.id='wkSwapOverlay';
  overlay.className='wk-swap-overlay';
  overlay.innerHTML=`<div class="wk-swap-dialog" role="dialog" aria-modal="true" aria-label="Gericht tauschen">
    <div class="row"><div><h2>${DAYS[slot.day]} · ${MEAL_NAMES[slot.meal]}</h2><p class="small muted">Wähle ein anderes Gericht. Einkaufsliste und Preise werden neu berechnet.</p></div><button id="wkSwapClose" class="btn alt">✕</button></div>
    <label>Gericht suchen<input id="wkSwapSearch" type="search" placeholder="Rezeptname eingeben…" autocomplete="off"></label>
    <label><input id="wkSwapFavs" type="checkbox"> Nur Favoriten ⭐</label>
    <div id="wkSwapResults" class="wk-swap-results"></div>
  </div>`;
  document.body.appendChild(overlay);
  overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.remove();});
  function results(){
    const query=(document.getElementById('wkSwapSearch')?.value||'').trim().toLocaleLowerCase('de');
    const onlyFavs=document.getElementById('wkSwapFavs')?.checked;
    const matches=recipes.map((r,i)=>({r,i})).filter(({r,i})=>i!==state.plan[slotIndex]&&allowedRecipe(r)&&mealMatch(r,slot.meal)&&(!onlyFavs||favorite(r.name))&&r.name.toLocaleLowerCase('de').includes(query));
    document.getElementById('wkSwapResults').innerHTML=matches.slice(0,70).map(({r,i})=>`<button type="button" class="wk-swap-option" data-swap-pick="${slotIndex}" data-recipe-index="${i}"><span><strong>${esc(r.name)}</strong><small>${r.vegan?'Vegan':r.veg?'Vegetarisch':'Mit Fleisch'}</small></span><span>Auswählen →</span></button>`).join('')||'<p>Keine passenden Gerichte gefunden.</p>';
    if(matches.length>70)document.getElementById('wkSwapResults').insertAdjacentHTML('beforeend',`<p class="small muted">${matches.length} Treffer – bitte Suche verfeinern.</p>`);
  }
  overlay.querySelector('#wkSwapSearch').addEventListener('input',results);
  overlay.querySelector('#wkSwapFavs').addEventListener('change',results);
  results();overlay.querySelector('#wkSwapSearch').focus();
}

document.addEventListener('click', async event => {
  const button = event.target.closest('button');
  if (!button) return;

  if(button.dataset.favorite!==undefined){
    const name=button.dataset.favorite;
    favorites=favorite(name)?favorites.filter(n=>n!==name):[...favorites,name];
    localStorage.setItem(FAVORITES_KEY,JSON.stringify(favorites));
    render();return;
  }
  if (button.dataset.shopfilter) {
    shopFilter = button.dataset.shopfilter;
    render();
    return;
  }

  if (button.dataset.remove) {
    removeShopItem(button.dataset.remove);
    return;
  }

  if (button.id === 'restoreShop') {
    shopHidden = [];
    saveShop();
    render();
    toast('Rezeptzutaten wiederhergestellt');
    return;
  }

  if (button.id === 'shopAdd') {
    addShopItem();
    return;
  }

  if (button.dataset.tab) {
    navigate(button.dataset.tab);
    return;
  }

  if (button.dataset.go) {
    navigate(button.dataset.go);
    return;
  }

  if (button.dataset.swap !== undefined) {
    openSwapDialog(Number(button.dataset.swap));
    return;
  }
  if (button.dataset.swapPick !== undefined) {
    const slotIndex=Number(button.dataset.swapPick);
    const newIndex=Number(button.dataset.recipeIndex);
    if(!Number.isInteger(slotIndex)||!Number.isInteger(newIndex))return;
    const target=slots()[slotIndex];
    if(!target || !recipes[newIndex] || !allowedRecipe(recipes[newIndex]) || !mealMatch(recipes[newIndex],target.meal))return;
    const before=total();
    state.plan[slotIndex]=newIndex;
    state.checks={};shopHidden=[];
    saveShop();save();
    document.getElementById('wkSwapOverlay')?.remove();
    render();
    toast('Gericht getauscht · Neuer Einkaufswert: '+money(total())+' (vorher '+money(before)+')');
    return;
  }
  if (button.id === 'wkSwapClose') {
    document.getElementById('wkSwapOverlay')?.remove();return;
  }

  if (button.id === 'signUp' || button.id === 'signIn') {
    const email = $('authEmail')?.value.trim();
    const password = $('authPassword')?.value;

    if (!email || !password) {
      toast('E-Mail und Passwort eingeben');
      return;
    }

    button.disabled = true;

    try {
      if (button.id === 'signUp') {
        const result = await cloud().signUp(email, password);

        toast(
          result.session
            ? 'Registriert und angemeldet'
            : 'Bitte Bestätigungs-E-Mail öffnen'
        );
      } else {
        await cloud().signIn(email, password);
        toast('Angemeldet');
      }
    } catch (error) {
      toast(error.message);
    } finally {
      button.disabled = false;
    }

    return;
  }

  if (button.id === 'signOut') {
    try {
      await cloud().signOut();

      cloudProfileLoadedFor = null;
      profileCompleted = false;

      closeSideMenu();
      toast('Abgemeldet');
    } catch (error) {
      toast(error.message);
    }

    return;
  }

  if (button.id === 'openPrices') {
    window.location.href = './preise.html';
    return;
  }

  if (button.id === 'generate') {
    state.people = Number($('people').value);

    state.budget = Math.max(
      10,
      Math.min(1000, Number($('budget').value) || 75)
    );

    state.store = $('store').value;
    state.diet = $('diet').value;
    const chosen=[...document.querySelectorAll('[data-meal]:checked')].map(x=>x.dataset.meal);
    if(!chosen.length){toast('Mindestens eine Mahlzeit auswählen');return;}
    state.meals=chosen;
    generate();
    toast('Neuer Wochenplan erstellt');
    return;
  }

  if (button.id === 'clearChecks') {
    state.checks = {};
    save();
    render();
    return;
  }

  if (button.id === 'copy') {
    const text = shopItems().map(item =>
      `${state.checks[item.id] ? '✓' : '□'} ` +
      `${item.name}: ${item.detail}` +
      `${item.cost ? ' – ' + money(item.cost) : ''}`
    ).join('\n');

    try {
      await navigator.clipboard.writeText(
        'Wochenkoch Einkaufsliste\n' + text
      );

      toast('Liste kopiert');
    } catch {
      window.prompt('Einkaufsliste kopieren:', text);
    }

    return;
  }

  if (button.id === 'saveProfile') {
    if (!cloudUser) {
      toast('Bitte zuerst anmelden');
      return;
    }

    const plz = $('plz').value.trim();
    const radius = Number($('radius').value);

    const stores = [
      ...document.querySelectorAll('[data-store]:checked')
    ].map(input => input.dataset.store);

    const compare =
      document.querySelector('input[name="compare"]:checked').value;

    if (!/^\d{5}$/.test(plz)) {
      toast('Bitte fünfstellige PLZ eingeben');
      return;
    }

    if (!stores.length && compare === 'selected') {
      toast('Bitte mindestens einen Markt wählen');
      return;
    }

    const excluded = [
      ...document.querySelectorAll('[data-exclude]:checked')
    ].map(input => input.dataset.exclude);

    state.diet = $('profileDiet').value;

    profile = {
      plz,
      radius,
      stores,
      compare,
      excluded
    };

    if (stores.length && !stores.includes(state.store)) {
      state.store = stores[0];
    }

    saveProfile();
    save();

    try {
      await cloud().saveProfile({
        ...profile,
        diet: state.diet,
        people: state.people,
        budget: state.budget,
        store: state.store
      });

      profileCompleted = true;

      refreshAverages();

      if (
        state.plan.some(index =>
          !recipes[index] ||
          !allowedRecipe(recipes[index])
        )
      ) {
        generate();
      } else {
        render();
      }

      toast('Profil gespeichert – willkommen bei Wochenkoch!');
    } catch (error) {
      toast('Online-Speicherung fehlgeschlagen: ' + error.message);
    }
  }
});

/* =====================================================
   TASTATUR UND WISCHGESTEN
   ===================================================== */

document.addEventListener('keydown', event => {
  if (
    event.key === 'Enter' &&
    event.target.id === 'shopNewItem'
  ) {
    event.preventDefault();
    addShopItem();
  }
});

let swipeStart = null;

document.addEventListener('touchstart', event => {
  const row = event.target.closest('.shop-swipe');

  if (!row || event.target.closest('button,input')) {
    return;
  }

  const touch = event.touches[0];

  swipeStart = {
    id: row.dataset.swipe,
    x: touch.clientX,
    y: touch.clientY
  };
}, { passive: true });

document.addEventListener('touchend', event => {
  if (!swipeStart) return;

  const touch = event.changedTouches[0];

  const dx = touch.clientX - swipeStart.x;
  const dy = touch.clientY - swipeStart.y;
  const id = swipeStart.id;

  swipeStart = null;

  if (
    dx < -75 &&
    Math.abs(dx) > Math.abs(dy) * 1.4
  ) {
    removeShopItem(id);
  }
}, { passive: true });

document.addEventListener('input',event=>{
  if(event.target.id==='librarySearch'){
    librarySearch=event.target.value;
    const start=event.target.selectionStart;
    render();const input=$('librarySearch');input?.focus();input?.setSelectionRange(start,start);
  }
});
document.addEventListener('change', event => {
  if(event.target.id==='libraryDiet'){libraryDiet=event.target.value;render();return;}
  if(event.target.id==='libraryCategory'){libraryCategory=event.target.value;render();return;}
  if(event.target.id==='libraryFavorites'){libraryFavorites=event.target.checked;render();return;}
  const key = event.target.dataset.check;

  if (key) {
    state.checks[key] = event.target.checked;
    save();
    render();
  }
});

/* =====================================================
   SUPABASE-KONTO SYNCHRONISIEREN
   ===================================================== */

async function syncAccount(user) {
  authReady = !!cloud()?.ready;

  const changed = cloudUser?.id !== user?.id;

  cloudUser = user;

  if (!user) {
    profileCompleted = false;
    cloudProfileLoadedFor = null;

    render();
    return;
  }

  if (changed) {
    profileCompleted = false;
    cloudProfileLoadedFor = null;
  }

  if (cloudProfileLoadedFor !== user.id) {
    cloudProfileLoadedFor = user.id;

    try {
      const savedProfile = await cloud().loadProfile();

      if (savedProfile) {
        profile = {
          ...profile,
          plz: savedProfile.postal_code,
          radius: savedProfile.radius_km,
          stores: savedProfile.stores,
          compare: savedProfile.compare_mode,
          excluded: savedProfile.excluded_ingredients || []
        };

        state.diet = savedProfile.diet || 'all';
        state.people = savedProfile.people || 2;
        state.budget = Number(savedProfile.budget_eur) || 75;
        state.store = savedProfile.preferred_store || 'REWE';

        saveProfile();
        save();

        profileCompleted = true;
      } else {
        profileCompleted = false;
      }
    } catch (error) {
      cloudProfileLoadedFor = null;
      toast('Cloud-Profil: ' + error.message);
    }
  }

  render();

  if (
    user &&
    profileCompleted &&
    averagesLoadedFor !== user.id
  ) {
    averagesLoadedFor = user.id;
    refreshAverages();
  }
}

/* =====================================================
   APP STARTEN
   ===================================================== */

window.addEventListener('wochenkoch-cloud-ready', () => {
  cloud()?.subscribe(syncAccount);
});

if (cloud()) {
  cloud().subscribe(syncAccount);
} else {
  authReady = true;
  render();
}

if (
  state.plan.length !== slots().length ||
  !state.plan.length ||
  state.plan.some(index => !recipes[index])
) {
  generate();
} else {
  render();
}

window.addEventListener('pageshow', () => {
  render();
});

if (
  'serviceWorker' in navigator &&
  location.protocol.startsWith('http')
) {
  navigator.serviceWorker
    .register('./sw.js')
    .catch(() => {});
}
