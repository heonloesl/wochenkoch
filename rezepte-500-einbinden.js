/* Import nach app.js und rezeptwelt.js laden. */
(function(){
 const data=window.WochenkochImport500;
 if(!data || typeof recipes==='undefined' || typeof ingredients==='undefined')return;
 Object.assign(ingredients,data.ingredients);
 const names=new Set(recipes.map(r=>r.name.trim().toLocaleLowerCase('de')));
 let added=0;
 for(const r of data.recipes){
   const name=r.name.trim().toLocaleLowerCase('de');
   if(names.has(name))continue;
   const keys=Object.keys(r.items);
   r.veg=!keys.some(k=>['chicken','turkey','beef','pork','salmon','cod','shrimp'].includes(k));
   r.vegan=r.veg&&!keys.some(k=>['egg','cheese','milk','yogurt','honey','cream','mozzarella','parmesan','halloumi','quark','skyr','butter','yogurt_sauce','tzatziki'].includes(k));
   recipes.push(r);names.add(name);added++;
 }
 console.info('Wochenkoch: '+added+' neue Excel-Rezepte übernommen, '+recipes.length+' insgesamt.');
 if(typeof render==='function')render();
})();
