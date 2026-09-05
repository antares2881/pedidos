(() => {
  'use strict';

  const API_BASE = '';
  const state = {
    view: 'home', authenticated: null, loading: false, online: navigator.onLine,
    user: null, orders: [], clients: [], products: [], labs: [], detail: null,
    orderStep: 1, productQuery: '', orderQuery: '', inventoryQuery: '',
    draft: load('pedidos.draft', emptyDraft())
  };
  const app = document.querySelector('#app');
  const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const fmtDate = value => value ? new Intl.DateTimeFormat('es-CO', {day:'2-digit',month:'short',year:'numeric'}).format(new Date(`${String(value).slice(0,10)}T12:00:00`)) : 'Sin fecha';

  function emptyDraft() { return { clientId:'', labId:'', number:'', date:new Date().toISOString().slice(0,10), invoiceNumber:'', items:[] }; }
  function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (_) { return fallback; } }
  function persistDraft() { localStorage.setItem('pedidos.draft', JSON.stringify(state.draft)); }
  function toast(message) { const el=document.querySelector('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2600); }
  function headers(extra={}) { return {'Accept':'application/json','X-Requested-With':'XMLHttpRequest',...extra}; }
  async function api(path, options={}) {
    const response = await fetch(`${API_BASE}${path}`, {credentials:'include', ...options, headers:headers(options.headers)});
    if (response.status === 401 || response.status === 419) throw Object.assign(new Error('SESSION'), {status:response.status});
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const type=response.headers.get('content-type')||'';
    return type.includes('json') ? response.json() : response.text();
  }
  async function csrfToken() {
    const response=await fetch(`${API_BASE}/`, {credentials:'include'});
    const html=await response.text();
    const doc=new DOMParser().parseFromString(html,'text/html');
    return doc.querySelector('input[name="_token"]')?.value || doc.querySelector('meta[name="csrf-token"]')?.content || '';
  }

  async function login(email,password) {
    const token=await csrfToken();
    const body=new URLSearchParams({_token:token,email,password});
    const response=await fetch(`${API_BASE}/login`,{method:'POST',credentials:'include',headers:{'Accept':'application/json','X-Requested-With':'XMLHttpRequest','Content-Type':'application/x-www-form-urlencoded'},body});
    if (!response.ok) throw new Error(response.status===422?'Usuario o contraseña incorrectos':'No fue posible iniciar sesión');
    state.authenticated=true; await hydrate(); state.view='home'; render();
  }

  async function hydrate() {
    state.loading=true; render();
    try {
      const [orders,clients,labs,products,consecutive]=await Promise.all([
        api('/historial-pedidos'), api('/clientes?selector=1'), api('/laboratorios'), api('/listas-precios/3'), api('/consecutivo-pedidos-calox')
      ]);
      state.orders=Array.isArray(orders)?orders:[]; state.clients=Array.isArray(clients)?clients:[];
      state.labs=Array.isArray(labs)?labs:[]; state.products=Array.isArray(products)?products:[];
      if (!state.draft.number) state.draft.number=String(Number(consecutive?.[0]?.consecutivo||0)+1);
      persistDraft(); state.authenticated=true;
    } catch (error) {
      if (error.status===401 || error.status===419) state.authenticated=false;
      else { toast(state.online?'No se pudieron cargar los datos':'Sin conexión. Tu borrador sigue disponible'); }
    } finally { state.loading=false; render(); }
  }

  const nav = () => `<nav class="bottom-nav" aria-label="Navegación principal">
    ${navButton('home','⌂','Inicio')}${navButton('new','＋','Pedido')}${navButton('orders','▤','Historial')}${navButton('inventory','⌕','Inventario')}
  </nav>`;
  const navButton=(view,icon,label)=>`<button class="nav-btn ${state.view===view?'active':''}" data-nav="${view}"><span>${icon}</span>${label}</button>`;
  const top = title => `${!state.online?'<div class="offline">Sin conexión · el borrador se guarda en el teléfono</div>':''}<header class="topbar"><div class="brand"><img src="icons/icon.svg" alt=""><div><strong>${esc(title)}</strong><small>Pedidos móvil</small></div></div><button class="icon-btn" data-action="logout" title="Cerrar sesión">↪</button></header>`;
  const shell = content => `<div class="app">${top(titleForView())}<main class="main">${content}</main>${nav()}</div>`;
  const titleForView=()=>({home:'Resumen',new:'Nuevo pedido',orders:'Historial',inventory:'Inventario',clients:'Clientes'}[state.view]||'Pedidos');
  const skeleton=()=>'<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';

  function render() {
    if (state.authenticated===false) { app.innerHTML=loginView(); bind(); return; }
    if (state.authenticated===null) { app.innerHTML='<div class="login"><div class="login-box"><img class="login-logo" src="icons/icon.svg"><div class="skeleton"></div></div></div>'; return; }
    let content='';
    if (state.loading && !state.orders.length && state.view!=='new') content=skeleton();
    else if (state.view==='home') content=homeView();
    else if (state.view==='new') content=newOrderView();
    else if (state.view==='orders') content=ordersView();
    else if (state.view==='inventory') content=inventoryView();
    app.innerHTML=shell(content); bind();
  }

  function loginView() { return `<div class="login"><form class="login-box" id="login-form"><img class="login-logo" src="icons/icon.svg" alt="Pedidos"><h1>Tu operación,<br>en el bolsillo.</h1><p>Ingresa con la misma cuenta de Pedidos.</p><div id="login-error"></div><div class="field"><label for="email">Correo</label><input id="email" name="email" type="email" autocomplete="username" required></div><div class="field"><label for="password">Contraseña</label><input id="password" name="password" type="password" autocomplete="current-password" required></div><button class="primary brand-btn full" type="submit">Ingresar</button></form></div>`; }

  function homeView() {
    const pending=state.orders.filter(o=>[1,4,5].includes(Number(o.estado_id)));
    const today=new Date().toISOString().slice(0,10);
    const todayOrders=state.orders.filter(o=>String(o.fecha||'').slice(0,10)===today);
    return `<section class="hero"><h1>Todo listo para vender</h1><p>Crea pedidos en pocos toques y consulta lo importante desde cualquier lugar.</p><button class="primary" data-nav="new">＋ Nuevo pedido</button></section>
      <div class="grid" style="margin-top:14px"><div class="stat"><div class="value">${pending.length}</div><div class="label">Pendientes</div></div><div class="stat"><div class="value">${todayOrders.length}</div><div class="label">Hoy</div></div><div class="stat"><div class="value">${state.clients.length}</div><div class="label">Clientes</div></div><div class="stat"><div class="value">${state.products.length}</div><div class="label">Productos</div></div></div>
      <div class="section-title"><h2>Pedidos recientes</h2><button data-nav="orders">Ver todos</button></div>${state.orders.slice(0,5).map(orderCard).join('')||empty('Aún no hay pedidos','Crea el primero desde el botón superior.')}`;
  }
  function statusInfo(id) { return ({1:['Nuevo','warn'],3:['Cancelado','danger'],4:['Pendiente','warn'],5:['Parcial','warn'],6:['Pagado','']}[Number(id)]||['Sin estado','']); }
  function orderCard(o) { const [label,klass]=statusInfo(o.estado_id); return `<button class="card order-card full" data-order="${esc(o.num_pedido)}" style="text-align:left"><div><h3>${esc(o.razon_social||o.cliente||'Cliente')}</h3><div class="meta"><span>Pedido #${esc(o.num_pedido)}</span><span>${fmtDate(o.fecha)}</span><span>${esc(o.Laboratorio||'')}</span></div><span class="badge ${klass}" style="margin-top:9px">${label}</span></div><div class="money">${money.format(Number(o.valor)||0)}</div></button>`; }

  function newOrderView() {
    const step=state.orderStep;
    return `<div class="screen-head"><button class="icon-btn" data-action="order-back">←</button><h1>Nuevo pedido</h1></div><div class="stepper"><i class="step ${step>=1?'on':''}"></i><i class="step ${step>=2?'on':''}"></i><i class="step ${step>=3?'on':''}"></i></div>${step===1?orderDataStep():step===2?productStep():cartStep()}`;
  }
  function orderDataStep() { const d=state.draft; return `<div class="card"><div class="field"><label>Cliente</label><select id="client"><option value="">Selecciona un cliente</option>${state.clients.map(c=>`<option value="${c.id}" ${String(d.clientId)===String(c.id)?'selected':''}>${esc(c.razon_social)} · ${esc(c.mcpio||'')}</option>`).join('')}</select></div><div class="field"><label>Laboratorio</label><select id="lab"><option value="">Selecciona un laboratorio</option>${state.labs.map(l=>`<option value="${l.id}" ${String(d.labId)===String(l.id)?'selected':''}>${esc(l.Laboratorio)}</option>`).join('')}</select></div><div class="row"><div class="field"><label>Número</label><input id="number" inputmode="numeric" value="${esc(d.number)}"></div><div class="field"><label>Fecha</label><input id="date" type="date" value="${esc(d.date)}"></div></div></div><div class="sticky-action"><button class="primary brand-btn full" data-action="next-products">Elegir productos →</button></div>`; }
  function matchingProducts() { const q=state.productQuery.trim().toLowerCase(); return state.products.filter(p=>!q||`${p.codigo} ${p.producto} ${p.presentacion} ${p.Laboratorio}`.toLowerCase().includes(q)).slice(0,80); }
  function productStep() { return `<div class="search"><input id="product-search" type="search" placeholder="Producto, código o laboratorio" value="${esc(state.productQuery)}" autofocus></div><div class="meta" style="margin:0 3px 13px">${state.draft.items.length} productos en el pedido</div>${matchingProducts().map(p=>`<div class="card product"><div><h3>${esc(p.producto)} · ${esc(p.presentacion)}</h3><div class="stock">${esc(p.codigo)} · ${esc(p.Laboratorio)} · Stock ${esc(p.stock)}</div><div class="money" style="margin-top:5px">${money.format(Number(p.precio)||0)}</div></div><button class="add" data-add="${p.id}" aria-label="Agregar ${esc(p.producto)}">＋</button></div>`).join('')||empty('Sin resultados','Prueba otro nombre o código.')}<div class="sticky-action"><button class="primary brand-btn full" data-action="next-cart">Revisar pedido · ${state.draft.items.length}</button></div>`; }
  function cartTotal() { return state.draft.items.reduce((sum,item)=>sum+(Number(item.cantidad)||0)*(Number(item.precio)||0),0); }
  function cartStep() { return `${state.draft.items.map((item,i)=>`<div class="card cart-row"><div><h3>${esc(item.producto)}</h3><div class="cart-fields"><div><label>Cant.</label><input inputmode="numeric" data-item-field="cantidad" data-index="${i}" value="${item.cantidad}"></div><div><label>Bonif.</label><input inputmode="numeric" data-item-field="bonificacion" data-index="${i}" value="${item.bonificacion}"></div><div class="price"><label>Precio</label><input inputmode="numeric" data-item-field="precio" data-index="${i}" value="${item.precio}"></div></div></div><button class="remove" data-remove="${i}" aria-label="Quitar">×</button></div>`).join('')||empty('El pedido está vacío','Regresa y agrega al menos un producto.')}<div class="total"><span>Total</span><strong>${money.format(cartTotal())}</strong></div><div class="sticky-action"><button class="primary brand-btn full" data-action="save-order" ${!state.draft.items.length?'disabled':''}>Guardar pedido</button></div>`; }

  function ordersView() { const q=state.orderQuery.toLowerCase(); const rows=state.orders.filter(o=>!q||`${o.razon_social} ${o.num_pedido} ${o.numero_factura||''}`.toLowerCase().includes(q)); return `<div class="screen-head"><h1>Historial</h1></div><div class="search"><input id="order-search" type="search" placeholder="Cliente, pedido o factura" value="${esc(state.orderQuery)}"></div>${rows.map(orderCard).join('')||empty('Sin pedidos','No encontramos resultados con ese filtro.')}`; }
  function inventoryView() { const q=state.inventoryQuery.toLowerCase(); const rows=state.products.filter(p=>!q||`${p.codigo} ${p.producto} ${p.presentacion} ${p.Laboratorio}`.toLowerCase().includes(q)).slice(0,100); return `<div class="screen-head"><h1>Inventario</h1></div><div class="search"><input id="inventory-search" type="search" placeholder="Buscar producto o código" value="${esc(state.inventoryQuery)}"></div>${rows.map(p=>`<div class="card product"><div><h3>${esc(p.producto)} · ${esc(p.presentacion)}</h3><div class="meta"><span>${esc(p.codigo)}</span><span>${esc(p.Laboratorio)}</span></div></div><div><div class="money">${p.stock}</div><small class="meta">unidades</small></div></div>`).join('')||empty('Sin productos','No encontramos resultados.')}`; }
  function empty(title,text) { return `<div class="empty"><div style="font-size:34px">◌</div><b>${title}</b>${text}</div>`; }

  async function showOrder(number) {
    try { const rows=await api(`/pedidos-calox/${encodeURIComponent(number)}`); if (!rows.length) return toast('No se encontró el detalle'); const o=rows[0]; const items=rows.map(r=>`<div class="detail-line"><span>${esc(r.producto)} · ${esc(r.presentacion)}<small class="meta">${r.cantidad} + ${r.adicionales||0}</small></span><strong>${money.format(Number(r.precio_entrada)*Number(r.cantidad))}</strong></div>`).join(''); showModal(`<h2 style="margin-top:0">Pedido #${esc(number)}</h2><p class="meta">${esc(o.razon_social)} · ${fmtDate(o.fecha)}</p>${items}<div class="total"><span>Total</span><strong>${money.format(Number(o.valor)||0)}</strong></div>`); } catch (_) { toast('No fue posible cargar el pedido'); }
  }
  function showModal(content) { const wrap=document.createElement('div'); wrap.id='modal'; wrap.style.cssText='position:fixed;inset:0;z-index:80;background:rgba(10,30,24,.55);display:grid;align-items:end'; wrap.innerHTML=`<section style="background:#fff;border-radius:24px 24px 0 0;padding:22px;max-height:82vh;overflow:auto">${content}<button class="secondary full" data-close style="margin-top:10px">Cerrar</button></section>`; document.body.appendChild(wrap); wrap.addEventListener('click',e=>{if(e.target===wrap||e.target.closest('[data-close]'))wrap.remove()}); }

  async function saveOrder() {
    if (!state.online) return toast('Conéctate para enviar; el borrador está guardado');
    const d=state.draft; if (!d.clientId||!d.labId||!d.number||!d.date||!d.items.length) return toast('Completa todos los datos del pedido');
    const token=await csrfToken();
    const payload={cliente_id:d.clientId,laboratorio_id:d.labId,num_pedido:d.number,fecha:d.date,num_factura:null,valor:cartTotal(),total_factura:0,esFacturaDirecto:false,modificar:false,observaciones:'',entradas:d.items};
    try { state.loading=true; render(); const result=await api('/pedidos-calox',{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':token},body:JSON.stringify(payload)}); if(result!=='ok') throw new Error(typeof result==='string'?result:'Error de validación'); state.draft=emptyDraft(); localStorage.removeItem('pedidos.draft'); state.orderStep=1; toast('Pedido guardado correctamente'); await hydrate(); state.view='home'; render(); }
    catch(error){ state.loading=false; render(); toast(error.status===419?'La sesión venció. Ingresa de nuevo':error.message||'No fue posible guardar'); if(error.status===419)state.authenticated=false; }
  }

  function bind() {
    document.querySelectorAll('[data-nav]').forEach(el=>el.onclick=()=>{state.view=el.dataset.nav;if(state.view==='new')state.orderStep=1;render()});
    document.querySelector('[data-action="logout"]')?.addEventListener('click',async()=>{try{const token=await csrfToken();await fetch(`${API_BASE}/logout`,{method:'POST',credentials:'include',headers:{'X-CSRF-TOKEN':token,'Accept':'application/json'}})}catch(_){}state.authenticated=false;render()});
    document.querySelector('#login-form')?.addEventListener('submit',async e=>{e.preventDefault();const btn=e.currentTarget.querySelector('button');btn.disabled=true;btn.textContent='Ingresando…';try{await login(e.currentTarget.email.value,e.currentTarget.password.value)}catch(error){document.querySelector('#login-error').innerHTML=`<div class="error">${esc(error.message)}</div>`;btn.disabled=false;btn.textContent='Ingresar'}});
    document.querySelector('#client')?.addEventListener('change',e=>{state.draft.clientId=e.target.value;persistDraft()}); document.querySelector('#lab')?.addEventListener('change',e=>{state.draft.labId=e.target.value;persistDraft()}); document.querySelector('#number')?.addEventListener('input',e=>{state.draft.number=e.target.value;persistDraft()}); document.querySelector('#date')?.addEventListener('change',e=>{state.draft.date=e.target.value;persistDraft()});
    document.querySelector('[data-action="order-back"]')?.addEventListener('click',()=>{if(state.orderStep>1){state.orderStep--;render()}else{state.view='home';render()}});
    document.querySelector('[data-action="next-products"]')?.addEventListener('click',()=>{if(!state.draft.clientId||!state.draft.labId||!state.draft.number||!state.draft.date)return toast('Completa los datos del pedido');state.orderStep=2;render()});
    document.querySelector('[data-action="next-cart"]')?.addEventListener('click',()=>{if(!state.draft.items.length)return toast('Agrega al menos un producto');state.orderStep=3;render()});
    document.querySelector('#product-search')?.addEventListener('input',e=>{state.productQuery=e.target.value;render();const input=document.querySelector('#product-search');input?.focus();input?.setSelectionRange(input.value.length,input.value.length)});
    document.querySelectorAll('[data-add]').forEach(el=>el.onclick=()=>{const p=state.products.find(x=>String(x.id)===el.dataset.add);const existing=state.draft.items.find(x=>String(x.id)===String(p.id));if(existing)existing.cantidad++;else state.draft.items.push({id:p.id,codigo:p.codigo,producto:`${p.producto} · ${p.presentacion}`,cantidad:1,bonificacion:0,precio:Number(p.precio)||0,total:Number(p.precio)||0});persistDraft();toast('Producto agregado');render()});
    document.querySelectorAll('[data-remove]').forEach(el=>el.onclick=()=>{state.draft.items.splice(Number(el.dataset.remove),1);persistDraft();render()});
    document.querySelectorAll('[data-item-field]').forEach(el=>el.onchange=()=>{const item=state.draft.items[Number(el.dataset.index)];item[el.dataset.itemField]=Math.max(0,Number(el.value)||0);item.total=item.cantidad*item.precio;persistDraft();render()});
    document.querySelector('[data-action="save-order"]')?.addEventListener('click',saveOrder);
    document.querySelector('#order-search')?.addEventListener('input',e=>{state.orderQuery=e.target.value;render();document.querySelector('#order-search')?.focus()}); document.querySelector('#inventory-search')?.addEventListener('input',e=>{state.inventoryQuery=e.target.value;render();document.querySelector('#inventory-search')?.focus()});
    document.querySelectorAll('[data-order]').forEach(el=>el.onclick=()=>showOrder(el.dataset.order));
  }

  window.addEventListener('online',()=>{state.online=true;toast('Conexión restablecida');render()}); window.addEventListener('offline',()=>{state.online=false;render()});
  if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
  hydrate();
})();
