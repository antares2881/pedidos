(() => {
  'use strict';

  const API_BASE = '';
  const state = {
    view: 'home', authenticated: null, loading: false, productsLoading: false, online: navigator.onLine,
    user: null, orders: [], directOrders: [], indirectOrders: [], invoices: [], clients: [], products: [], labs: [], priceLists: [], percentage: 0, detail: null,
    orderStep: 1, orderFilter: 'direct', invoiceFilter: 'indirect', invoiceStatus: 'pending', productQuery: '', orderQuery: '', invoiceQuery: '', inventoryQuery: '',
    payment: { type:'indirect', clientId:'', invoices:[], documents:[], receipt:'', date:new Date().toISOString().slice(0,10), observations:'', note:null }, paymentLoading:false,
    draft: load('pedidos.draft', emptyDraft())
  };
  const app = document.querySelector('#app');
  const money = new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 });
  const integer = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });
  const esc = value => String(value ?? '').replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
  const fmtDate = value => value ? new Intl.DateTimeFormat('es-CO', {day:'2-digit',month:'short',year:'numeric'}).format(new Date(`${String(value).slice(0,10)}T12:00:00`)) : 'Sin fecha';

  function emptyDraft(type='') { return { type, clientId:'', labId:'', priceListId:type==='indirect'?'1':'3', number:'', date:new Date().toISOString().slice(0,10), invoiceNumber:'', items:[] }; }
  function defaultPriceListId(type) { const preferred=type==='indirect'?'1':'3'; return String(state.priceLists.some(list=>String(list.id)===preferred)?preferred:(state.priceLists[0]?.id||'')); }
  function load(key, fallback) { try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch (_) { return fallback; } }
  function persistDraft() { localStorage.setItem('pedidos.draft', JSON.stringify(state.draft)); }
  function toast(message) { const el=document.querySelector('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2600); }
  function focusAtEnd(selector) { const input=document.querySelector(selector); if(!input)return; input.focus(); const end=input.value.length; try{input.setSelectionRange(end,end)}catch(_){} }
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
      const [directOrders,indirectOrders,invoices,clients,labs,priceLists,percentage,directConsecutive,indirectConsecutive]=await Promise.all([
        api('/historial-pedidos'), api('/historial-transferencias'), api('/facturas'), api('/clientes?selector=1'), api('/laboratorios'),
        api('/tipos-lista-precios'), api('/porcentaje'), api('/consecutivo-pedidos-calox'), api('/consecutivo-transferencias')
      ]);
      state.directOrders=(Array.isArray(directOrders)?directOrders:[]).map(o=>({...o,orderType:'direct'}));
      state.indirectOrders=(Array.isArray(indirectOrders)?indirectOrders:[]).map(o=>({...o,orderType:'indirect',razon_social:o.clientes?.razon_social,num_pedido:o.numero}));
      state.orders=[...state.directOrders,...state.indirectOrders].sort((a,b)=>String(b.fecha).localeCompare(String(a.fecha)));
      state.invoices=(Array.isArray(invoices)?invoices:[]).map(invoice=>({...invoice,invoiceType:'indirect'}));
      state.clients=Array.isArray(clients)?clients:[]; state.labs=Array.isArray(labs)?labs:[];
      state.priceLists=Array.isArray(priceLists)?priceLists:[]; state.percentage=Number(percentage?.porcentaje)||0;
      if (!state.draft.type) state.draft.type='direct';
      if (!state.priceLists.some(list=>String(list.id)===String(state.draft.priceListId))) state.draft.priceListId=defaultPriceListId(state.draft.type);
      if (!state.draft.number) state.draft.number=String(Number((state.draft.type==='indirect'?indirectConsecutive:directConsecutive)?.[0]?.consecutivo||0)+1);
      await loadProducts(state.draft.priceListId,state.draft.type,false);
      persistDraft(); state.authenticated=true;
    } catch (error) {
      if (error.status===401 || error.status===419) state.authenticated=false;
      else { toast(state.online?'No se pudieron cargar los datos':'Sin conexión. Tu borrador sigue disponible'); }
    } finally { state.loading=false; render(); }
  }

  async function loadProducts(listId,type=state.draft.type,rerender=true) {
    state.productsLoading=true;
    try {
      const rows=await api(`/listas-precios/${encodeURIComponent(listId)}`);
      state.products=(Array.isArray(rows)?rows:[]).map(p=>({...p,precio:type==='indirect'?Math.round(Number(p.precio)*state.percentage)+Number(p.precio):Number(p.precio)}));
    } catch (_) { state.products=[]; toast('No se pudo cargar la lista de precios'); }
    finally { state.productsLoading=false; if (rerender) render(); }
  }

  const nav = () => `<nav class="bottom-nav five" aria-label="Navegación principal">
    ${navButton('home','⌂','Inicio')}${navButton('new','＋','Pedido')}${navButton('invoices','▤','Facturas')}${navButton('payments','$','Abonos')}${navButton('inventory','⌕','Inventario')}
  </nav>`;
  const navButton=(view,icon,label)=>`<button class="nav-btn ${state.view===view?'active':''}" data-nav="${view}"><span>${icon}</span>${label}</button>`;
  const top = title => `${!state.online?'<div class="offline">Sin conexión · el borrador se guarda en el teléfono</div>':''}<header class="topbar"><div class="brand"><img src="icons/icon.svg" alt=""><div><strong>${esc(title)}</strong><small>Pedidos móvil</small></div></div><button class="icon-btn" data-action="logout" title="Cerrar sesión">↪</button></header>`;
  const shell = content => `<div class="app">${top(titleForView())}<main class="main">${content}</main>${nav()}</div>`;
  const titleForView=()=>({home:'Resumen',new:'Nuevo pedido',orders:'Pedidos',invoices:'Facturas',payments:'Registrar abono',inventory:'Inventario',clients:'Clientes'}[state.view]||'Pedidos');
  const skeleton=()=>'<div class="skeleton"></div><div class="skeleton"></div><div class="skeleton"></div>';

  function render() {
    if (state.authenticated===false) { app.innerHTML=loginView(); bind(); return; }
    if (state.authenticated===null) { app.innerHTML='<div class="login"><div class="login-box"><img class="login-logo" src="icons/icon.svg"><div class="skeleton"></div></div></div>'; return; }
    let content='';
    if (state.loading && !state.orders.length && state.view!=='new') content=skeleton();
    else if (state.view==='home') content=homeView();
    else if (state.view==='new') content=newOrderView();
    else if (state.view==='orders') content=ordersView();
    else if (state.view==='invoices') content=invoicesView();
    else if (state.view==='payments') content=paymentsView();
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
  function statusInfo(id) { return ({1:['Nuevo','warn'],2:['Completado',''],3:['Cancelado','danger'],4:['Pendiente','warn'],5:['Parcial','warn'],6:['Pagado','']}[Number(id)]||['Sin estado','']); }
  function orderCard(o) { const [label,klass]=statusInfo(o.estado_id); const type=o.orderType||'direct'; return `<button class="card order-card full" data-order="${esc(o.num_pedido)}" data-order-type="${type}" style="text-align:left"><div><h3>${esc(o.razon_social||o.cliente||'Cliente')}</h3><div class="meta"><span>${type==='indirect'?'Indirecto':'Directo'} #${esc(o.num_pedido)}</span><span>${fmtDate(o.fecha)}</span><span>${esc(o.Laboratorio||'')}</span></div><span class="badge ${klass}" style="margin-top:9px">${label}</span></div><div class="money">${money.format(Number(o.valor)||0)}</div></button>`; }

  function newOrderView() {
    const step=state.orderStep;
    return `<div class="screen-head"><button class="icon-btn" data-action="order-back">←</button><h1>${step===0?'Tipo de pedido':state.draft.type==='indirect'?'Pedido indirecto':'Pedido directo'}</h1></div>${step>0?`<div class="stepper"><i class="step ${step>=1?'on':''}"></i><i class="step ${step>=2?'on':''}"></i><i class="step ${step>=3?'on':''}"></i></div>`:''}${step===0?orderTypeStep():step===1?orderDataStep():step===2?productStep():cartStep()}`;
  }
  function orderTypeStep() { return `<p class="meta" style="margin-bottom:16px">Selecciona el flujo. Cada opción usa sus reglas y consecutivo correspondiente.</p><button class="card type-card full" data-order-kind="indirect"><span class="type-icon">⇄</span><span><strong>Pedido indirecto</strong><small>Transferencia a clientes · precio con porcentaje comercial</small></span><b>›</b></button><button class="card type-card full" data-order-kind="direct"><span class="type-icon">▣</span><span><strong>Pedido directo</strong><small>Compra directa por laboratorio</small></span><b>›</b></button>`; }
  function clientPicker() { const selected=state.clients.find(c=>String(c.id)===String(state.draft.clientId)); const value=selected?`${selected.razon_social} · ${selected.mcpio||''}`:''; return `<div class="client-picker"><div class="client-search-wrap"><span>⌕</span><input id="client-search" type="search" autocomplete="off" placeholder="Buscar por cliente o municipio" value="${esc(value)}" aria-label="Buscar cliente" aria-expanded="false"></div><div class="client-menu" id="client-menu" hidden><button type="button" data-client-id="" data-client-search="">Selecciona un cliente</button>${state.clients.map(c=>`<button type="button" data-client-id="${c.id}" data-client-search="${esc(`${c.razon_social} ${c.mcpio||''}`.toLowerCase())}"><strong>${esc(c.razon_social)}</strong><small>${esc(c.mcpio||'')}</small></button>`).join('')}<div class="client-no-results" hidden>No se encontraron clientes</div></div></div>`; }
  function orderDataStep() { const d=state.draft; const indirect=d.type==='indirect'; return `<div class="card"><div class="type-summary"><span class="badge ${indirect?'warn':''}">${indirect?'Pedido indirecto':'Pedido directo'}</span><button data-action="change-type">Cambiar</button></div><div class="field"><label>Lista de precios</label><select id="price-list">${state.priceLists.map(l=>`<option value="${l.id}" ${String(d.priceListId)===String(l.id)?'selected':''}>${esc(l.tipo_lista)}</option>`).join('')}</select></div><div class="field"><label>Cliente</label>${clientPicker()}</div>${indirect?'':`<div class="field"><label>Laboratorio</label><select id="lab"><option value="">Selecciona un laboratorio</option>${state.labs.map(l=>`<option value="${l.id}" ${String(d.labId)===String(l.id)?'selected':''}>${esc(l.Laboratorio)}</option>`).join('')}</select></div>`}<div class="row"><div class="field"><label>${indirect?'N.º transferencia':'N.º pedido'}</label><input id="number" inputmode="numeric" value="${esc(d.number)}"></div><div class="field"><label>Fecha</label><input id="date" type="date" value="${esc(d.date)}"></div></div></div><div class="sticky-action"><button class="primary brand-btn full" data-action="next-products">Elegir productos →</button></div>`; }
  function matchingProducts() { const q=state.productQuery.trim().toLowerCase(); return state.products.filter(p=>!q||`${p.codigo} ${p.producto} ${p.presentacion} ${p.Laboratorio}`.toLowerCase().includes(q)).slice(0,80); }
  function catalogProductCard(p) { const item=state.draft.items.find(row=>String(row.id)===String(p.id)); return `<div class="card product catalog-product ${item?'selected':''}"><div><div class="selected-label" ${item?'':'hidden'}>✓ Seleccionado</div><h3>${esc(p.producto)} · ${esc(p.presentacion)}</h3><div class="stock">${esc(p.codigo)} · ${esc(p.Laboratorio)} · Stock ${esc(p.stock)}</div><div class="money" style="margin-top:5px">${money.format(Number(p.precio)||0)}</div></div>${item?`<div class="catalog-quantity"><label for="catalog-qty-${p.id}">Cantidad</label><div><button type="button" data-catalog-minus="${p.id}" aria-label="Restar cantidad">−</button><input id="catalog-qty-${p.id}" data-catalog-qty="${p.id}" type="number" min="1" inputmode="numeric" value="${item.cantidad}" aria-label="Cantidad de ${esc(p.producto)}"><button type="button" data-catalog-plus="${p.id}" aria-label="Sumar cantidad">＋</button></div><button type="button" class="catalog-remove" data-catalog-remove="${p.id}">Quitar</button></div>`:`<button class="add" data-add="${p.id}" aria-label="Agregar ${esc(p.producto)}">＋</button>`}</div>`; }
  function productStep() { return `<div class="search"><input id="product-search" type="search" placeholder="Producto, código o laboratorio" value="${esc(state.productQuery)}" autofocus></div><div class="meta" style="margin:0 3px 13px">${state.draft.items.length} productos en el pedido</div>${state.productsLoading?skeleton():matchingProducts().map(catalogProductCard).join('')||empty('Sin resultados','Prueba otro nombre o código.')}<div class="sticky-action"><button class="primary brand-btn full" data-action="next-cart">Revisar pedido · ${state.draft.items.length}</button></div>`; }
  function cartTotal() { return state.draft.items.reduce((sum,item)=>sum+(Number(item.cantidad)||0)*(Number(item.precio)||0),0); }
  function cartStep() { return `${state.draft.items.map((item,i)=>`<div class="card cart-row"><div><h3>${esc(item.producto)}</h3><div class="cart-fields"><div><label>Cant.</label><input inputmode="numeric" data-item-field="cantidad" data-index="${i}" value="${item.cantidad}"></div><div><label>Bonif.</label><input inputmode="numeric" data-item-field="bonificacion" data-index="${i}" value="${item.bonificacion}"></div><div class="price"><label>Precio</label><input inputmode="numeric" data-item-field="precio" data-index="${i}" value="${item.precio}"></div></div></div><button class="remove" data-remove="${i}" aria-label="Quitar">×</button></div>`).join('')||empty('El pedido está vacío','Regresa y agrega al menos un producto.')}<div class="total"><span>Total</span><strong>${money.format(cartTotal())}</strong></div><div class="sticky-action"><button class="primary brand-btn full" data-action="save-order" ${!state.draft.items.length?'disabled':''}>Guardar pedido</button></div>`; }

  function ordersView() { const q=state.orderQuery.toLowerCase(); const source=state.orderFilter==='direct'?state.directOrders:state.indirectOrders; const rows=source.filter(o=>!q||`${o.razon_social} ${o.num_pedido} ${o.numero_factura||''}`.toLowerCase().includes(q)); return `<div class="screen-head"><h1>Pedidos guardados</h1></div><div class="segmented"><button data-order-filter="direct" class="${state.orderFilter==='direct'?'active':''}">Directos <b>${state.directOrders.length}</b></button><button data-order-filter="indirect" class="${state.orderFilter==='indirect'?'active':''}">Indirectos <b>${state.indirectOrders.length}</b></button></div><div class="search"><input id="order-search" type="search" placeholder="Cliente, pedido o factura" value="${esc(state.orderQuery)}"></div>${rows.map(orderCard).join('')||empty(`Sin pedidos ${state.orderFilter==='direct'?'directos':'indirectos'}`,'No encontramos resultados con ese filtro.')}`; }
  function allInvoices() { const direct=state.directOrders.filter(order=>Number(order.total_factura)>0).map(order=>({id:order.id,razon_social:order.razon_social,numero_factura:order.numero_factura,fecha_factura:order.fecha_factura,valor:order.total_factura,estado_id:order.estado_id,estado:order.estado,invoiceType:'direct'})); return state.invoiceFilter==='direct'?direct:state.invoices; }
  function invoiceCard(invoice) { const [label,klass]=statusInfo(invoice.estado_id); const number=invoice.electronica&&String(invoice.electronica)!=='0'?invoice.electronica:invoice.numero_factura; return `<div class="card invoice-card"><div><span class="badge ${invoice.invoiceType==='direct'?'warn':''}">${invoice.invoiceType==='direct'?'Directa':'Indirecta'}</span><h3>${esc(invoice.razon_social||'Cliente')}</h3><div class="meta"><span>Factura ${esc(number)}</span><span>${fmtDate(invoice.fecha_factura)}</span></div><span class="badge ${klass}" style="margin-top:8px">${label}</span></div><div class="money">${money.format(Number(invoice.valor)||0)}</div></div>`; }
  function invoicesView() { const q=state.invoiceQuery.toLowerCase(); const byStatus=invoice=>state.invoiceStatus==='all'||(state.invoiceStatus==='pending'&&[4,5].includes(Number(invoice.estado_id)))||(state.invoiceStatus==='paid'&&Number(invoice.estado_id)===6)||(state.invoiceStatus==='cancelled'&&Number(invoice.estado_id)===3); const rows=allInvoices().filter(byStatus).filter(invoice=>!q||`${invoice.razon_social} ${invoice.numero_factura} ${invoice.electronica||''}`.toLowerCase().includes(q)); return `<div class="screen-head"><h1>Historial de facturas</h1></div><div class="segmented"><button data-invoice-filter="indirect" class="${state.invoiceFilter==='indirect'?'active':''}">Indirectas</button><button data-invoice-filter="direct" class="${state.invoiceFilter==='direct'?'active':''}">Directas</button></div><div class="row"><div class="search"><input id="invoice-search" type="search" placeholder="Cliente o factura" value="${esc(state.invoiceQuery)}"></div><div class="field"><select id="invoice-status" aria-label="Filtrar estado"><option value="pending" ${state.invoiceStatus==='pending'?'selected':''}>Pendientes</option><option value="paid" ${state.invoiceStatus==='paid'?'selected':''}>Pagadas</option><option value="cancelled" ${state.invoiceStatus==='cancelled'?'selected':''}>Canceladas</option><option value="all" ${state.invoiceStatus==='all'?'selected':''}>Todas</option></select></div></div>${rows.map(invoiceCard).join('')||empty('Sin facturas','No encontramos documentos con esos filtros.')}`; }
  function paymentClientPicker() { const selected=state.clients.find(client=>String(client.id)===String(state.payment.clientId)); const value=selected?`${selected.razon_social} · ${selected.mcpio||''}`:''; return `<div class="client-picker payment-client-picker"><div class="client-search-wrap"><span>⌕</span><input id="payment-client-search" type="search" autocomplete="off" placeholder="Buscar cliente o municipio" value="${esc(value)}"></div><div class="client-menu" id="payment-client-menu" hidden>${state.clients.map(client=>`<button type="button" data-payment-client="${client.id}" data-client-search="${esc(`${client.razon_social} ${client.mcpio||''}`.toLowerCase())}"><strong>${esc(client.razon_social)}</strong><small>${esc(client.mcpio||'')}</small></button>`).join('')}<div class="client-no-results" hidden>No se encontraron clientes</div></div></div>`; }
  function paymentDocumentCard(document,index) { const number=document.electronica&&String(document.electronica)!=='0'?document.electronica:document.numero_factura; const pending=Math.max(0,Number(document.saldo)-Number(document.retencion)-Number(document.valor_nota)-Number(document.descuento)-Number(document.abono)); return `<div class="card payment-document"><div class="payment-doc-head"><div><strong>Factura ${esc(number)}</strong><small>${fmtDate(document.fecha_factura)} · Saldo ${money.format(document.saldo)}</small></div><button data-remove-payment="${index}">×</button></div><div class="payment-fields"><div><label>Retención</label><input data-payment-field="retencion" data-payment-index="${index}" inputmode="numeric" value="${integer.format(document.retencion)}"></div><div><label>Nota crédito</label><input data-payment-field="valor_nota" data-payment-index="${index}" inputmode="numeric" value="${integer.format(document.valor_nota)}"></div><div><label>Descuento</label><input data-payment-field="descuento" data-payment-index="${index}" inputmode="numeric" value="${integer.format(document.descuento)}"></div><div><label>Efectivo</label><input data-payment-field="abono" data-payment-index="${index}" inputmode="numeric" value="${integer.format(document.abono)}"></div></div><div class="payment-pending ${pending?'warn':''}">Pendiente después del abono: <strong>${money.format(pending)}</strong></div></div>`; }
  function paymentTotal() { return state.payment.documents.reduce((sum,document)=>sum+Number(document.abono||0),0); }
  function paymentsView() { const payment=state.payment; return `<div class="screen-head"><h1>Registrar abono</h1></div><div class="card"><div class="field"><label>Tipo de documento</label><div class="segmented"><button data-payment-type="indirect" class="${payment.type==='indirect'?'active':''}">Facturas indirectas</button><button data-payment-type="direct" class="${payment.type==='direct'?'active':''}">Ventas directas</button></div></div><div class="field"><label>Cliente</label>${paymentClientPicker()}</div><button class="secondary full" data-action="find-pending" ${state.paymentLoading?'disabled':''}>${state.paymentLoading?'Buscando…':'Buscar facturas con saldo'}</button></div>${payment.invoices.length?`<div class="section-title pending-title"><h2>Facturas pendientes</h2><span>${payment.invoices.length} encontradas</span></div><div class="pending-invoices-scroll">${payment.invoices.map((invoice,index)=>{const selected=payment.documents.some(doc=>String(doc.id)===String(invoice.id));const number=invoice.electronica&&String(invoice.electronica)!=='0'?invoice.electronica:invoice.numero_factura;const saldo=Number(invoice.total_factura)-Number(invoice.pagado||0)-Number(invoice.total_abono_nota||0);return `<button class="card pending-invoice ${selected?'selected':''}" data-select-pending="${index}" ${selected?'disabled':''}><span><strong>${esc(number)}</strong><small>${fmtDate(invoice.fecha_factura)}</small></span><span><b>${money.format(saldo)}</b><small>${selected?'✓ Asociada':'Agregar'}</small></span></button>`}).join('')}</div>`:''}${payment.documents.length?`<div class="section-title"><h2>Documentos asociados</h2></div><div class="row"><div class="field"><label>Fecha</label><input id="payment-date" type="date" value="${payment.date}"></div><div class="field"><label>N.º recibo</label><input id="payment-receipt" inputmode="numeric" value="${payment.receipt}"></div></div>${payment.note?.numero_nota?`<div class="note-info">Nota ${esc(payment.note.numero_nota)} disponible: <strong>${money.format(payment.note.disponible)}</strong></div>`:''}${payment.documents.map(paymentDocumentCard).join('')}<div class="field"><label>Observaciones</label><textarea id="payment-observations" rows="2">${esc(payment.observations)}</textarea></div><div class="total"><span>Total efectivo</span><strong>${money.format(paymentTotal())}</strong></div><button class="primary brand-btn full" data-action="save-payment">Guardar abono</button>`:''}`; }
  function inventoryView() { const q=state.inventoryQuery.toLowerCase(); const rows=state.products.filter(p=>!q||`${p.codigo} ${p.producto} ${p.presentacion} ${p.Laboratorio}`.toLowerCase().includes(q)).slice(0,100); return `<div class="screen-head"><h1>Inventario</h1></div><div class="search"><input id="inventory-search" type="search" placeholder="Buscar producto o código" value="${esc(state.inventoryQuery)}"></div>${rows.map(p=>`<div class="card product"><div><h3>${esc(p.producto)} · ${esc(p.presentacion)}</h3><div class="meta"><span>${esc(p.codigo)}</span><span>${esc(p.Laboratorio)}</span></div></div><div><div class="money">${p.stock}</div><small class="meta">unidades</small></div></div>`).join('')||empty('Sin productos','No encontramos resultados.')}`; }
  function empty(title,text) { return `<div class="empty"><div style="font-size:34px">◌</div><b>${title}</b>${text}</div>`; }

  async function showOrder(number,type) {
    try {
      const rows=type==='indirect'?await api(`/numero-transferencia/${encodeURIComponent(number)}`):await api(`/pedidos-calox/${encodeURIComponent(number)}`);
      if (!rows.length) return toast('No se encontró el detalle');
      const o=rows[0];
      if(type==='indirect') {
        const products=await api(`/producto-transferencias/${o.id}`);
        const items=products.map(r=>`<div class="detail-line"><span>${esc(r.productos?.producto)} · ${esc(r.presentaciones?.presentacion)}<small class="meta">${r.cantidad} + ${r.bonificacion||0}</small></span><strong>${money.format(Number(r.precio)*Number(r.cantidad))}</strong></div>`).join('');
        showModal(`<h2 style="margin-top:0">Indirecto #${esc(number)}</h2><p class="meta">${esc(o.clientes?.razon_social)} · ${fmtDate(o.fecha)}</p>${items}<div class="total"><span>Total</span><strong>${money.format(Number(o.valor)||0)}</strong></div>`);
      } else {
        const items=rows.map(r=>`<div class="detail-line"><span>${esc(r.producto)} · ${esc(r.presentacion)}<small class="meta">${r.cantidad} + ${r.adicionales||0}</small></span><strong>${money.format(Number(r.precio_entrada)*Number(r.cantidad))}</strong></div>`).join('');
        showModal(`<h2 style="margin-top:0">Directo #${esc(number)}</h2><p class="meta">${esc(o.razon_social)} · ${fmtDate(o.fecha)}</p>${items}<div class="total"><span>Total</span><strong>${money.format(Number(o.valor)||0)}</strong></div>`);
      }
    } catch (_) { toast('No fue posible cargar el pedido'); }
  }
  function showModal(content) { const wrap=document.createElement('div'); wrap.id='modal'; wrap.style.cssText='position:fixed;inset:0;z-index:80;background:rgba(10,30,24,.55);display:grid;align-items:end'; wrap.innerHTML=`<section style="background:#fff;border-radius:24px 24px 0 0;padding:22px;max-height:82vh;overflow:auto">${content}<button class="secondary full" data-close style="margin-top:10px">Cerrar</button></section>`; document.body.appendChild(wrap); wrap.addEventListener('click',e=>{if(e.target===wrap||e.target.closest('[data-close]'))wrap.remove()}); }

  async function saveOrder() {
    if (!state.online) return toast('Conéctate para enviar; el borrador está guardado');
    const d=state.draft; if (!d.clientId||(d.type==='direct'&&!d.labId)||!d.number||!d.date||!d.items.length) return toast('Completa todos los datos del pedido');
    const token=await csrfToken();
    const directPayload={cliente_id:d.clientId,laboratorio_id:d.labId,num_pedido:d.number,fecha:d.date,num_factura:null,valor:cartTotal(),total_factura:0,esFacturaDirecto:false,modificar:false,observaciones:'',entradas:d.items};
    const indirectPayload={cliente_id:d.clientId,numero:d.number,fecha:d.date,total:cartTotal(),pedidos:d.items};
    const path=d.type==='indirect'?'/transferencias':'/pedidos-calox'; const payload=d.type==='indirect'?indirectPayload:directPayload;
    try { state.loading=true; render(); const result=await api(path,{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':token},body:JSON.stringify(payload)}); if(result!=='ok') throw new Error(typeof result==='string'?result:'Error de validación'); const savedType=d.type; state.draft=emptyDraft(); localStorage.removeItem('pedidos.draft'); state.orderStep=0; toast(`Pedido ${savedType==='indirect'?'indirecto':'directo'} guardado`); await hydrate(); state.view='home'; render(); }
    catch(error){ state.loading=false; render(); toast(error.status===419?'La sesión venció. Ingresa de nuevo':error.message||'No fue posible guardar'); if(error.status===419)state.authenticated=false; }
  }

  async function resetPaymentType(type) {
    state.payment={type,clientId:'',invoices:[],documents:[],receipt:'',date:new Date().toISOString().slice(0,10),observations:'',note:null};
    try { const result=await api(type==='indirect'?'/consecutivo-recibo-caja':'/consecutivo-recibo-caja-calox'); const current=type==='indirect'?result?.[0]?.numero:result; state.payment.receipt=String(Number(current||0)+1); } catch (_) { toast('No se pudo obtener el consecutivo del recibo'); }
    render();
  }
  async function findPendingInvoices() {
    if(!state.payment.clientId)return toast('Selecciona un cliente');
    state.paymentLoading=true;render();
    try {
      const path=state.payment.type==='indirect'?`/facturas-indirectos-consaldo/${state.payment.clientId}`:`/facturas-directos-consaldo/${state.payment.clientId}`;
      const rows=await api(path);state.payment.invoices=Array.isArray(rows)?rows:[];state.payment.documents=[];
      const row=state.payment.invoices[0]; const noteValue=Number(row?.valor_nota); const spent=Number(row?.gastado||0);
      state.payment.note=Number.isFinite(noteValue)&&noteValue>0?{numero_nota:row.numero_nota,valor_nota:noteValue,gastado:spent,disponible:Math.max(0,noteValue-spent)}:null;
      if(!state.payment.invoices.length)toast('Este cliente no tiene facturas con saldo');
    } catch (_) { toast('No fue posible consultar las facturas'); }
    finally {state.paymentLoading=false;render()}
  }
  function addPaymentDocument(index) {
    const invoice=state.payment.invoices[index];if(!invoice||state.payment.documents.some(doc=>String(doc.id)===String(invoice.id)))return;
    const total=Number(invoice.total_factura)||0;const saldo=Math.max(0,total-Number(invoice.pagado||0)-Number(invoice.total_abono_nota||0));
    const retencion=Number(invoice.aplicaretencion)===1&&total>1344573?Math.round(total*.025):0;
    const descuento=state.payment.type==='direct'?Math.round(total*.05):0;
    state.payment.documents.push({id:invoice.id,numero_factura:invoice.numero_factura,electronica:state.payment.type==='indirect'?invoice.electronica:0,fecha_factura:invoice.fecha_factura,total_factura:total,saldo,retencion,descuento,valor_nota:0,abono:Math.max(0,saldo-retencion-descuento)});render();
  }
  function updatePaymentDocument(index,field,value) {
    const document=state.payment.documents[index];if(!document)return;document[field]=Math.max(0,Number(String(value).replace(/[^0-9]/g,''))||0);
    if(field!=='abono')document.abono=Math.max(0,document.saldo-document.retencion-document.valor_nota-document.descuento);render();
  }
  async function savePayment() {
    const payment=state.payment;if(!payment.date||!payment.receipt||!payment.documents.length)return toast('Completa los datos del abono');
    const invalid=payment.documents.some(doc=>Number(doc.abono)+Number(doc.retencion)+Number(doc.valor_nota)+Number(doc.descuento)>Number(doc.saldo));
    const noteUsed=payment.documents.reduce((sum,doc)=>sum+Number(doc.valor_nota||0),0);
    if(invalid)return toast('Un abono supera el saldo de la factura');
    if(noteUsed>Number(payment.note?.disponible||0))return toast('El valor de nota crédito supera el disponible');
    const token=await csrfToken();const payload={fecha:payment.date,num_recibo_caja:payment.receipt,observaciones:payment.observations,documentos:payment.documents,nota:payment.note||{numero_nota:null,valor_nota:0,gastado:0}};
    try { const result=await api(payment.type==='indirect'?'/cobros':'/abono-pedidos',{method:'POST',headers:{'Content-Type':'application/json','X-CSRF-TOKEN':token},body:JSON.stringify(payload)});if(result?.status!=='success')throw new Error(firstValidationMessage(result));const type=payment.type;toast(`Abono guardado · Recibo ${result.num_recibo}`);await hydrate();await resetPaymentType(type); }
    catch(error){toast(error.message||'No fue posible guardar el abono')}
  }
  function firstValidationMessage(result){if(!result||typeof result!=='object')return 'Verifica la información del abono';const value=Object.values(result)[0];return Array.isArray(value)?String(value[0]):String(value)}

  function bind() {
    document.querySelectorAll('[data-nav]').forEach(el=>el.onclick=async()=>{state.view=el.dataset.nav;if(state.view==='new')state.orderStep=0;if(state.view==='payments'&&!state.payment.receipt){await resetPaymentType(state.payment.type);return}render()});
    document.querySelector('[data-action="logout"]')?.addEventListener('click',async()=>{try{const token=await csrfToken();await fetch(`${API_BASE}/logout`,{method:'POST',credentials:'include',headers:{'X-CSRF-TOKEN':token,'Accept':'application/json'}})}catch(_){}state.authenticated=false;render()});
    document.querySelector('#login-form')?.addEventListener('submit',async e=>{e.preventDefault();const btn=e.currentTarget.querySelector('button');btn.disabled=true;btn.textContent='Ingresando…';try{await login(e.currentTarget.email.value,e.currentTarget.password.value)}catch(error){document.querySelector('#login-error').innerHTML=`<div class="error">${esc(error.message)}</div>`;btn.disabled=false;btn.textContent='Ingresar'}});
    document.querySelectorAll('[data-order-kind]').forEach(el=>el.onclick=async()=>{const type=el.dataset.orderKind;const path=type==='indirect'?'/consecutivo-transferencias':'/consecutivo-pedidos-calox';try{const result=await api(path);state.draft=emptyDraft(type);state.draft.priceListId=defaultPriceListId(type);state.draft.number=String(Number(result?.[0]?.consecutivo||0)+1);state.orderStep=1;persistDraft();await loadProducts(state.draft.priceListId,type)}catch(_){toast('No se pudo iniciar el pedido')}});
    document.querySelector('[data-action="change-type"]')?.addEventListener('click',()=>{state.orderStep=0;render()});
    document.querySelector('#price-list')?.addEventListener('change',async e=>{state.draft.priceListId=e.target.value;state.draft.items=[];persistDraft();await loadProducts(e.target.value,state.draft.type)});
    const clientSearch=document.querySelector('#client-search'); const clientMenu=document.querySelector('#client-menu');
    const filterClients=()=>{if(!clientMenu)return;const query=(clientSearch.value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let visible=0;clientMenu.querySelectorAll('[data-client-id]').forEach(option=>{const text=(option.dataset.clientSearch||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'');const show=!query||text.includes(query);option.hidden=!show;if(show)visible++});clientMenu.querySelector('.client-no-results').hidden=visible>0};
    clientSearch?.addEventListener('focus',()=>{clientMenu.hidden=false;clientSearch.setAttribute('aria-expanded','true');clientSearch.select();filterClients()});
    clientSearch?.addEventListener('input',()=>{state.draft.clientId='';clientMenu.hidden=false;filterClients();persistDraft()});
    clientSearch?.addEventListener('blur',()=>setTimeout(()=>{if(clientMenu){clientMenu.hidden=true;clientSearch.setAttribute('aria-expanded','false')}},150));
    clientMenu?.querySelectorAll('[data-client-id]').forEach(option=>option.addEventListener('click',()=>{state.draft.clientId=option.dataset.clientId;const client=state.clients.find(c=>String(c.id)===String(state.draft.clientId));clientSearch.value=client?`${client.razon_social} · ${client.mcpio||''}`:'';clientMenu.hidden=true;clientSearch.setAttribute('aria-expanded','false');persistDraft()}));
    document.querySelector('#lab')?.addEventListener('change',e=>{state.draft.labId=e.target.value;persistDraft()}); document.querySelector('#number')?.addEventListener('input',e=>{state.draft.number=e.target.value;persistDraft()}); document.querySelector('#date')?.addEventListener('change',e=>{state.draft.date=e.target.value;persistDraft()});
    document.querySelector('[data-action="order-back"]')?.addEventListener('click',()=>{if(state.orderStep>1){state.orderStep--;render()}else{state.view='home';render()}});
    document.querySelector('[data-action="next-products"]')?.addEventListener('click',async event=>{if(!state.draft.clientId||(state.draft.type==='direct'&&!state.draft.labId)||!state.draft.number||!state.draft.date)return toast('Completa los datos del pedido');const button=event.currentTarget;button.disabled=true;button.textContent='Cargando productos…';await loadProducts(state.draft.priceListId,state.draft.type,false);if(!state.products.length){button.disabled=false;button.textContent='Elegir productos →';return toast('La lista seleccionada no tiene productos')}state.orderStep=2;render()});
    document.querySelector('[data-action="next-cart"]')?.addEventListener('click',()=>{if(!state.draft.items.length)return toast('Agrega al menos un producto');state.orderStep=3;render()});
    document.querySelector('#product-search')?.addEventListener('input',e=>{state.productQuery=e.target.value;render();focusAtEnd('#product-search')});
    document.querySelectorAll('[data-add]').forEach(el=>el.onclick=()=>{const p=state.products.find(x=>String(x.id)===el.dataset.add);const existing=state.draft.items.find(x=>String(x.id)===String(p.id));if(existing)existing.cantidad++;else state.draft.items.push({id:p.id,codigo:p.codigo,producto:`${p.producto} · ${p.presentacion}`,cantidad:1,bonificacion:0,precio:Number(p.precio)||0,total:Number(p.precio)||0});persistDraft();toast('Producto agregado');render()});
    const updateCatalogQuantity=(id,quantity)=>{const item=state.draft.items.find(row=>String(row.id)===String(id));if(!item)return;item.cantidad=Math.max(1,Number(quantity)||1);item.total=item.cantidad*item.precio;persistDraft();render()};
    document.querySelectorAll('[data-catalog-qty]').forEach(el=>el.addEventListener('change',()=>updateCatalogQuantity(el.dataset.catalogQty,el.value)));
    document.querySelectorAll('[data-catalog-minus]').forEach(el=>el.onclick=()=>{const item=state.draft.items.find(row=>String(row.id)===el.dataset.catalogMinus);updateCatalogQuantity(el.dataset.catalogMinus,Number(item?.cantidad)-1)});
    document.querySelectorAll('[data-catalog-plus]').forEach(el=>el.onclick=()=>{const item=state.draft.items.find(row=>String(row.id)===el.dataset.catalogPlus);updateCatalogQuantity(el.dataset.catalogPlus,Number(item?.cantidad)+1)});
    document.querySelectorAll('[data-catalog-remove]').forEach(el=>el.onclick=()=>{state.draft.items=state.draft.items.filter(row=>String(row.id)!==el.dataset.catalogRemove);persistDraft();render()});
    document.querySelectorAll('[data-remove]').forEach(el=>el.onclick=()=>{state.draft.items.splice(Number(el.dataset.remove),1);persistDraft();render()});
    document.querySelectorAll('[data-item-field]').forEach(el=>el.onchange=()=>{const item=state.draft.items[Number(el.dataset.index)];item[el.dataset.itemField]=Math.max(0,Number(el.value)||0);item.total=item.cantidad*item.precio;persistDraft();render()});
    document.querySelector('[data-action="save-order"]')?.addEventListener('click',saveOrder);
    document.querySelector('#order-search')?.addEventListener('input',e=>{state.orderQuery=e.target.value;render();focusAtEnd('#order-search')}); document.querySelector('#inventory-search')?.addEventListener('input',e=>{state.inventoryQuery=e.target.value;render();focusAtEnd('#inventory-search')});
    document.querySelectorAll('[data-order-filter]').forEach(el=>el.onclick=()=>{state.orderFilter=el.dataset.orderFilter;render()});
    document.querySelectorAll('[data-invoice-filter]').forEach(el=>el.onclick=()=>{state.invoiceFilter=el.dataset.invoiceFilter;render()});
    document.querySelector('#invoice-search')?.addEventListener('input',e=>{state.invoiceQuery=e.target.value;render();focusAtEnd('#invoice-search')});
    document.querySelector('#invoice-status')?.addEventListener('change',e=>{state.invoiceStatus=e.target.value;render()});
    document.querySelectorAll('[data-payment-type]').forEach(el=>el.onclick=()=>resetPaymentType(el.dataset.paymentType));
    const paymentClientSearch=document.querySelector('#payment-client-search');const paymentClientMenu=document.querySelector('#payment-client-menu');
    const filterPaymentClients=()=>{if(!paymentClientMenu)return;const query=(paymentClientSearch.value||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let visible=0;paymentClientMenu.querySelectorAll('[data-payment-client]').forEach(option=>{const text=(option.dataset.clientSearch||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'');const show=!query||text.includes(query);option.hidden=!show;if(show)visible++});paymentClientMenu.querySelector('.client-no-results').hidden=visible>0};
    paymentClientSearch?.addEventListener('focus',()=>{paymentClientMenu.hidden=false;paymentClientSearch.select();filterPaymentClients()});paymentClientSearch?.addEventListener('input',()=>{state.payment.clientId='';paymentClientMenu.hidden=false;filterPaymentClients()});paymentClientSearch?.addEventListener('blur',()=>setTimeout(()=>{if(paymentClientMenu)paymentClientMenu.hidden=true},150));
    paymentClientMenu?.querySelectorAll('[data-payment-client]').forEach(option=>option.onclick=()=>{state.payment.clientId=option.dataset.paymentClient;const client=state.clients.find(row=>String(row.id)===String(state.payment.clientId));paymentClientSearch.value=client?`${client.razon_social} · ${client.mcpio||''}`:'';paymentClientMenu.hidden=true;state.payment.invoices=[];state.payment.documents=[]});
    document.querySelector('[data-action="find-pending"]')?.addEventListener('click',findPendingInvoices);
    document.querySelectorAll('[data-select-pending]').forEach(el=>el.onclick=()=>addPaymentDocument(Number(el.dataset.selectPending)));
    document.querySelectorAll('[data-remove-payment]').forEach(el=>el.onclick=()=>{state.payment.documents.splice(Number(el.dataset.removePayment),1);render()});
    document.querySelectorAll('[data-payment-field]').forEach(el=>el.onchange=()=>updatePaymentDocument(Number(el.dataset.paymentIndex),el.dataset.paymentField,el.value));
    document.querySelector('#payment-date')?.addEventListener('change',e=>state.payment.date=e.target.value);document.querySelector('#payment-receipt')?.addEventListener('input',e=>state.payment.receipt=e.target.value);document.querySelector('#payment-observations')?.addEventListener('input',e=>state.payment.observations=e.target.value);
    document.querySelector('[data-action="save-payment"]')?.addEventListener('click',savePayment);
    document.querySelectorAll('[data-order]').forEach(el=>el.onclick=()=>showOrder(el.dataset.order,el.dataset.orderType));
  }

  window.addEventListener('online',()=>{state.online=true;toast('Conexión restablecida');render()}); window.addEventListener('offline',()=>{state.online=false;render()});
  if ('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
  hydrate();
})();
