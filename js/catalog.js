/**
 * Muskat Groceries catalog — renders products.html and product.html from products.json.
 *
 *   products.html            catalog grid; filter via hash (products.html#fresh-fruits)
 *   product.html?slug=...    product detail page
 *
 * The page declares what to render with <body data-page="catalog|product">.
 * products.json is fetched, so pages must be served over http(s), not file://.
 */
(() => {
  "use strict";

  const DATA_URL = "products.json";
  const PROMO_IMAGE = "images/64cb7a5cbff8aad4c14d4c75_banner-1.png";

  const ICON = {
    arrow:
      '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    cart:
      '<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>',
    search:
      '<svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  };

  // ---------------------------------------------------------------- helpers
  const ESC = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ESC[c]);
  const WA = "https://wa.me/254796110826";
  const money = (v, max) => v == null ? "Price on request" : max ? `KES ${Number(v).toLocaleString("en-KE")}–${Number(max).toLocaleString("en-KE")}` : `KES ${Number(v).toLocaleString("en-KE")}`;
  const slugify = (v) => v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const waOrder = (p, qty = 1) => `${WA}?text=${encodeURIComponent(`Hi Muskat! I'd like to place an order:\n\n- ${p.name} — ${qty} x ${p.unit}\n\nDelivery area: \nDelivery type: [Home / Office / Hotel]\nPreferred delivery date: \n\nPlease confirm availability, delivery fee and final total. Thanks!`)}`;
  const stock = (p) => (p.in_stock === false ? "Not available right now" : p.in_stock ? "In stock" : "Availability confirmed on order");
  const productUrl = (slug) => `product.html?slug=${encodeURIComponent(slug)}`;
  const categoryUrl = (slug) => `products.html#${slug}`;

  async function loadCatalog() {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`${DATA_URL}: HTTP ${res.status}`);
    const data = await res.json();
    const categories = new Map(data.categories.map((c) => Array.isArray(c) ? c : [c.slug, c.name]));
    if (!data.products && data.groups) {
      data.products = Object.entries(data.groups).flatMap(([category, rows]) => rows.map((r) => {
        const slug = slugify(r[0]);
        return { slug, name: r[0], category, price_kes: r[1], price_max_kes: r[2], unit: r[3],
          image: `images/products/${slug}.png`, note: r[5] || "", in_stock: r[6] !== false };
      }));
    }
    const counts = new Map();
    for (const p of data.products) counts.set(p.category, (counts.get(p.category) || 0) + 1);
    // Only categories that actually contain products, in declared order.
    const usedCategories = [...categories].filter(([slug]) => counts.has(slug));
    return { categories, usedCategories, counts, products: data.products };
  }

  function showError(root, title, detail) {
    root.innerHTML = `
      <div class="mx-auto max-w-xl py-10 text-center">
        <h2 class="mb-3 font-serif text-3xl text-ink">${esc(title)}</h2>
        <p class="mb-8">${esc(detail)}</p>
        <a href="products.html" class="inline-flex items-center gap-3 bg-brand px-6 py-4 font-medium text-white transition hover:bg-ink">Explore fresh picks ${ICON.arrow}</a>
      </div>`;
  }

  // ---------------------------------------------------------------- components
  const productCard = (p) => `
    <li class="product-card group flex flex-col bg-mist text-center" data-cat="${esc(p.category)}">
      <a href="${productUrl(p.slug)}" class="card-media block aspect-square overflow-hidden"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" class="h-full w-full object-contain p-6 transition duration-500 group-hover:scale-105" /></a>
      <div class="card-body flex flex-1 flex-col items-center justify-center px-5 pb-7 pt-5">
        <a href="${productUrl(p.slug)}"><h3 class="font-serif text-2xl text-ink transition hover:text-brand">${esc(p.name)}</h3></a>
        <p class="mb-4"><span class="font-semibold text-brand">${money(p.price_kes, p.price_max_kes)}</span> <span class="text-base">/${esc(p.unit)}</span></p>
        ${p.in_stock === false ? '<span class="px-4 py-2.5 text-sm font-medium text-body/60">Not in season</span>' : `<button type="button" data-add="${esc(p.slug)}" class="inline-flex items-center gap-2 bg-brand-soft px-4 py-2.5 text-sm font-medium text-brand transition hover:bg-brand hover:text-white">Add to Basket ${ICON.cart}</button>`}
      </div>
    </li>`;

  const pill = (href, label, extra = "") =>
    `<a href="${href}" class="filter-pill shrink-0 whitespace-nowrap rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium leading-6 text-ink transition hover:-translate-y-0.5 hover:border-brand hover:text-brand">${esc(label)}${extra}</a>`;

  function sidebar(cat, data) {
    const links = data.usedCategories
      .map(
        ([slug, name]) =>
          `<li><a href="${categoryUrl(slug)}" class="flex justify-between border-b border-dashed border-black/20 py-3 transition hover:text-brand ${slug === cat ? "text-brand" : ""}">${esc(name)}<span class="text-body/60">(${data.counts.get(slug)})</span></a></li>`,
      )
      .join("");
    return `
      <aside class="space-y-12 lg:order-first">
        <div>
          <h2 class="mb-5 font-serif text-[28px] text-ink">Search</h2>
          <form action="products.html" class="relative">
            <label for="side-search" class="sr-only">Search products</label>
            <input id="side-search" type="search" name="q" placeholder="Search fruits, greens, and more…" class="h-14 w-full border border-ink/70 pl-4 pr-12 text-base focus:border-brand focus:outline-none" />
            <button type="submit" aria-label="Search" class="absolute inset-y-0 right-0 grid w-12 place-items-center text-ink hover:text-brand">${ICON.search}</button>
          </form>
        </div>
        <nav aria-labelledby="side-cats">
          <h2 id="side-cats" class="mb-3 font-serif text-[28px] text-ink">Categories</h2>
          <ul>${links}</ul>
        </nav>
        <a href="${categoryUrl("exotic-produce")}" class="group relative block overflow-hidden text-center">
          <img src="${PROMO_IMAGE}" alt="" loading="lazy" class="w-full transition duration-700 group-hover:scale-105" />
          <div class="absolute inset-x-0 top-[9%]">
            <p class="text-base text-brand">Something different</p>
            <p class="font-serif text-[26px] text-ink">Exotic Finds</p>
            <span class="inline-flex items-center gap-2 text-[15px] font-medium text-ink">Shop now ${ICON.arrow}</span>
          </div>
        </a>
        <div>
          <h2 class="mb-4 font-serif text-[28px] text-ink">Tags</h2>
          <ul class="flex flex-wrap gap-2 text-[15px]">
            <li class="bg-mist px-3 py-1">Fresh</li><li class="bg-mist px-3 py-1">Nairobi delivery</li><li class="bg-mist px-3 py-1">${esc(data.categories.get(cat))}</li>
          </ul>
        </div>
      </aside>`;
  }

  function tabs(p, categoryName) {
    const n = esc(p.name);
    const panels = [
      ["details", "Product details", `
        <p class="mb-6">${n} from Muskat Groceries — selected with care for everyday cooking, fruit bowls and hospitality kitchens.</p>
        <p class="text-sm text-body/70">October 2026 catalogue price. Fresh produce prices and availability can change with the market and will be confirmed before delivery.</p>`],
      ["specs", "Specifications", `
        <dl class="grid max-w-lg grid-cols-[auto_1fr] gap-x-10 gap-y-3">
          <dt class="font-serif text-ink">Category</dt><dd>${esc(categoryName)}</dd>
          <dt class="font-serif text-ink">Sold by</dt><dd>per ${esc(p.unit)}</dd>
          <dt class="font-serif text-ink">Price</dt><dd>${esc(money(p.price_kes, p.price_max_kes))}</dd>
          <dt class="font-serif text-ink">Availability</dt><dd>${esc(stock(p))}</dd>
        </dl>`],
      ["shipping", "Delivery &amp; Orders", `
        <p class="mb-4">We deliver to homes, offices and hotels in Nairobi. Delivery dates are confirmed when we receive your order, and the delivery fee is confirmed before your order is final.</p>
        <p>Questions about substitutions or your order? Call or WhatsApp <a href="tel:+254796110826" class="text-brand hover:underline">0796 110 826</a>.</p>`],
    ];
    // Radios, labels and panels must be siblings for Tailwind's peer-checked/* variants.
    const radios = panels.map(([k], i) => `<input type="radio" name="tab" id="tab-${k}" class="peer/${k} sr-only" ${i === 0 ? "checked" : ""} />`).join("");
    const labels = panels.map(([k, t]) => `<label for="tab-${k}" class="cursor-pointer font-serif text-[26px] text-body/40 transition hover:text-ink peer-checked/${k}:text-brand">${t}</label>`).join("");
    const bodies = panels.map(([k, , c]) => `<div class="hidden basis-full pt-8 peer-checked/${k}:block">${c}</div>`).join("");
    return `<div class="mt-16 flex flex-wrap gap-x-16 gap-y-2">${radios}${labels}${bodies}</div>`;
  }

  // ---------------------------------------------------------------- pages
  function renderCatalog(data) {
    const grid = document.getElementById("catalog");
    const filter = document.getElementById("category-filter");

    filter.insertAdjacentHTML(
      "beforeend",
      pill("products.html#all", "All") +
        data.usedCategories
          .map(([slug, name]) => pill(categoryUrl(slug), name, ` <span class="text-body/60">(${data.counts.get(slug)})</span>`))
          .join(""),
    );
    grid.innerHTML = data.products.map(productCard).join("");

    const apply = () => {
      const hash = decodeURIComponent(location.hash.slice(1));
      const active = data.counts.has(hash) ? hash : "all";
      const query = new URLSearchParams(location.search).get("q")?.trim().toLowerCase() || "";
      data.products.forEach((p, i) => { grid.children[i].hidden = (active !== "all" && p.category !== active) || (query && !p.name.toLowerCase().includes(query)); });
      for (const a of filter.querySelectorAll(".filter-pill")) {
        const on = a.getAttribute("href").endsWith(`#${active}`);
        a.toggleAttribute("aria-current", on);
      }
      document.title = query ? `Search: ${query} — Muskat Groceries` : active === "all" ? "Shop — Muskat Groceries" : `${data.categories.get(active)} — Muskat Groceries`;
    };
    window.addEventListener("hashchange", apply);
    apply();
  }

  function renderProduct(data) {
    const root = document.getElementById("product-root");
    const slug = new URLSearchParams(location.search).get("slug");
    const p = data.products.find((x) => x.slug === slug);
    if (!p) {
      document.title = "Product not found — Muskat Groceries";
      return showError(root, "Looks like this one wandered off the market.", slug ? `We couldn't find "${slug}".` : "No product was specified.");
    }

    window.__muskatProduct = p;
    const categoryName = data.categories.get(p.category);
    let related = data.products.filter((q) => q.category === p.category && q.slug !== p.slug).slice(0, 3);
    if (related.length < 3) {
      related = related.concat(data.products.filter((q) => q.slug !== p.slug && !related.includes(q)).slice(0, 3 - related.length));
    }
    

    document.title = `${p.name} — Muskat Groceries`;
    // Per-product SEO: canonical URL, description and Product structured data.
    const url = `https://muskatgroceries.com/${productUrl(p.slug)}`;
    const desc = `Fresh ${p.name.toLowerCase()} from Muskat Groceries, delivered to homes, offices and hotels in Nairobi. Order on WhatsApp: 0796 110 826.`;
    const setAttr = (sel, attr, val) => document.querySelector(sel)?.setAttribute(attr, val);
    setAttr('link[rel="canonical"]', "href", url);
    setAttr('meta[property="og:url"]', "content", url);
    setAttr('meta[name="description"]', "content", desc);
    setAttr('meta[property="og:description"]', "content", desc);
    setAttr('meta[property="og:title"]', "content", document.title);
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      image: `https://muskatgroceries.com/${p.image}`,
      description: desc,
      category: categoryName,
      brand: { "@type": "Brand", name: "Muskat Groceries" },
    });
    document.head.appendChild(ld);
    root.innerHTML = `
      <div class="grid gap-14 lg:grid-cols-[330px_1fr] lg:gap-9">
        <div>
          <nav aria-label="Breadcrumb" class="mb-6 text-[15px]"><a href="index.html" class="hover:text-brand">Home</a> / <a href="products.html" class="hover:text-brand">Shop</a> / <span class="text-ink">${esc(p.name)}</span></nav>
          <div class="grid gap-10 md:grid-cols-2 md:gap-14">
            <div class="aspect-square overflow-hidden bg-mist">
              <img src="${esc(p.image)}" alt="${esc(p.name)}" class="h-full w-full object-contain p-10" />
            </div>
            <div>
              <h1 class="mb-4 font-serif text-[40px] leading-tight text-brand lg:text-[52px]">${esc(p.name)}</h1>
              <p class="mb-7 flex flex-wrap items-baseline gap-4"><span class="font-serif text-[28px] text-ink">Price:</span> <span class="text-[28px] text-ink">${money(p.price_kes, p.price_max_kes)}<span class="text-xl text-body">/${esc(p.unit)}</span></span></p>
              <p class="mb-7">Fresh ${esc(p.name.toLowerCase())}, picked with care and delivered to your home, office or hotel. Prices are in KES; we'll confirm availability and the final total when you order.</p>
              <p class="mb-5 flex gap-5"><span class="font-serif text-xl text-ink">Stock:</span> ${stock(p)}</p>
              <div class="space-y-7">
                <p class="flex items-center gap-5">
                  <label for="qty" class="font-serif text-xl text-ink">Quantity:</label>
                  <input id="qty" type="number" min="1" value="1" inputmode="numeric" class="h-11 w-20 border border-black/15 px-4 text-ink focus:border-brand focus:outline-none" />
                </p>
                ${p.in_stock === false ? '<span class="font-medium text-body/60">Not currently in season</span>' : `<button type="button" data-add="${esc(p.slug)}" data-qty-source="qty" class="inline-flex items-center gap-2 bg-brand-soft px-5 py-3 text-[15px] font-medium text-brand transition hover:bg-brand hover:text-white">Add to Basket ${ICON.cart}</button>`}
                ${p.note ? `<p class="text-sm text-body/70">${esc(p.note)}</p>` : ""}
              </div>
            </div>
          </div>
          ${tabs(p, categoryName)}
          <h2 class="mb-8 mt-20 font-serif text-[32px] text-ink">Related Products</h2>
          <ul class="grid gap-[30px] sm:grid-cols-2 lg:grid-cols-3">${related.map(productCard).join("")}</ul>
        </div>
        ${sidebar(p.category, data)}
      </div>`;
  }

  // ---------------------------------------------------------------- basket
  let catalogData;
  let basket = JSON.parse(localStorage.getItem("muskat-basket") || "{}");
  const saveBasket = () => localStorage.setItem("muskat-basket", JSON.stringify(basket));
  const basketQty = () => Object.values(basket).reduce((n, q) => n + q, 0);

  function installBasket() {
    document.body.insertAdjacentHTML("beforeend", `
      <button id="basket-open" type="button" class="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-brand px-5 py-3 font-semibold text-white shadow-2xl transition hover:bg-brand-dark" aria-label="Open basket">
        ${ICON.cart}<span>Basket</span><span id="basket-count" class="grid min-h-6 min-w-6 place-items-center rounded-full bg-white px-1 text-xs text-brand">0</span>
      </button>
      <div id="basket-wrap" class="fixed inset-0 z-[60] hidden" role="dialog" aria-modal="true" aria-labelledby="basket-title">
        <button id="basket-backdrop" class="absolute inset-0 bg-black/50" aria-label="Close basket"></button>
        <aside class="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl">
          <header class="flex items-center justify-between border-b px-6 py-5"><div><p class="text-xs font-semibold uppercase tracking-widest text-brand">October 2026 prices</p><h2 id="basket-title" class="font-serif text-3xl text-ink">Your Basket</h2></div><button id="basket-close" class="p-2 text-2xl" aria-label="Close basket">×</button></header>
          <div id="basket-lines" class="flex-1 space-y-3 overflow-y-auto p-6"></div>
          <div class="border-t p-6">
            <div class="mb-4 flex justify-between font-semibold text-ink"><span>Estimated total</span><span id="basket-total">KES 0</span></div>
            <label for="delivery-location" class="mb-2 block text-sm font-semibold text-ink">Delivery location</label>
            <textarea id="delivery-location" rows="2" placeholder="Estate, building, street or Google Maps pin" class="mb-4 w-full border border-black/20 px-3 py-2 focus:border-brand focus:outline-none"></textarea>
            <button id="share-location" type="button" class="mb-4 text-sm font-medium text-brand hover:underline">Use my current location</button>
            <p id="location-status" class="mb-3 hidden text-sm"></p>
            <button id="basket-whatsapp" type="button" class="w-full bg-[#25D366] px-5 py-3.5 font-semibold text-white transition hover:bg-[#1da851]">Send order on WhatsApp</button>
            <p class="mt-3 text-center text-xs text-body/60">Availability, delivery fee and final total will be confirmed on WhatsApp.</p>
          </div>
        </aside>
      </div>`);
    renderBasket();
  }

  function renderBasket() {
    const lines = document.getElementById("basket-lines");
    if (!lines || !catalogData) return;
    const items = Object.entries(basket).map(([slug, qty]) => [catalogData.products.find((p) => p.slug === slug), qty]).filter(([p]) => p);
    document.getElementById("basket-count").textContent = basketQty();
    document.querySelectorAll("[data-basket-count]").forEach((el) => el.textContent = basketQty());
    lines.innerHTML = items.length ? items.map(([p, qty]) => `<div class="flex gap-3 border-b pb-3"><img src="${esc(p.image)}" alt="" class="h-16 w-16 bg-mist object-contain p-2"><div class="min-w-0 flex-1"><p class="font-semibold text-ink">${esc(p.name)}</p><p class="text-sm">${money(p.price_kes, p.price_max_kes)} / ${esc(p.unit)}</p><div class="mt-2 flex items-center gap-3"><button data-cart-dec="${esc(p.slug)}" class="h-7 w-7 border">−</button><span>${qty}</span><button data-cart-inc="${esc(p.slug)}" class="h-7 w-7 border">+</button><button data-cart-remove="${esc(p.slug)}" class="ml-auto text-xs text-red-700">Remove</button></div></div></div>`).join("") : '<div class="py-16 text-center"><p class="font-serif text-2xl text-ink">Your basket is empty</p><p>Add fresh produce to begin your order.</p></div>';
    const min = items.reduce((n,[p,q]) => n + p.price_kes*q, 0), max = items.reduce((n,[p,q]) => n + (p.price_max_kes || p.price_kes)*q, 0);
    document.getElementById("basket-total").textContent = money(min, max > min ? max : null);
  }

  let toastTimer;
  function addedFeedback(btn, qty) {
    const p = catalogData.products.find((x) => x.slug === btn.dataset.add);
    if (!btn.dataset.label) btn.dataset.label = btn.innerHTML;
    btn.innerHTML = "Added ✓"; clearTimeout(btn._t);
    btn._t = setTimeout(() => (btn.innerHTML = btn.dataset.label), 1200);
    const fab = document.getElementById("basket-open");
    fab?.animate([{ transform: "scale(1)" }, { transform: "scale(1.12)" }, { transform: "scale(1)" }], { duration: 300 });
    let t = document.getElementById("basket-toast");
    if (!t) {
      document.body.insertAdjacentHTML("beforeend", '<div id="basket-toast" role="status" aria-live="polite" class="fixed bottom-20 left-4 right-4 z-50 mx-auto hidden max-w-sm items-center justify-between gap-3 rounded-lg bg-ink px-4 py-3 text-sm text-white shadow-2xl sm:left-auto sm:right-5 sm:mx-0"><span id="basket-toast-text"></span><button type="button" data-open-basket class="shrink-0 font-semibold underline">View basket</button></div>');
      t = document.getElementById("basket-toast");
    }
    document.getElementById("basket-toast-text").textContent = `${qty} × ${p ? p.name : "item"} added · ${basketQty()} in basket`;
    t.classList.remove("hidden"); t.classList.add("flex");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.classList.add("hidden"); t.classList.remove("flex"); }, 2500);
  }

  function openBasket() { document.getElementById("basket-wrap")?.classList.remove("hidden"); document.body.style.overflow = "hidden"; }
  function closeBasket() { document.getElementById("basket-wrap")?.classList.add("hidden"); document.body.style.overflow = ""; }

  document.addEventListener("click", (e) => {
    const add = e.target.closest("[data-add]");
    if (add) { const qty = Math.max(1, parseInt(document.getElementById(add.dataset.qtySource)?.value || "1", 10)); basket[add.dataset.add] = (basket[add.dataset.add] || 0) + qty; saveBasket(); renderBasket(); addedFeedback(add, qty); return; }
    const inc = e.target.closest("[data-cart-inc]"), dec = e.target.closest("[data-cart-dec]"), rem = e.target.closest("[data-cart-remove]");
    if (inc) basket[inc.dataset.cartInc]++; if (dec) basket[dec.dataset.cartDec]--; if (rem) delete basket[rem.dataset.cartRemove];
    if (dec && basket[dec.dataset.cartDec] <= 0) delete basket[dec.dataset.cartDec];
    if (inc || dec || rem) { saveBasket(); renderBasket(); }
    if (e.target.closest("#basket-open, [data-open-basket]")) openBasket();
    if (e.target.closest("#basket-close, #basket-backdrop")) closeBasket();
    if (e.target.closest("#share-location")) {
      const status = document.getElementById("location-status");
      status.classList.remove("hidden"); status.textContent = "Getting your location…";
      if (!navigator.geolocation) return status.textContent = "Location is not supported on this device.";
      navigator.geolocation.getCurrentPosition(({coords}) => { document.getElementById("delivery-location").value = `https://maps.google.com/?q=${coords.latitude.toFixed(6)},${coords.longitude.toFixed(6)}`; status.textContent = "Location added."; }, () => status.textContent = "We couldn't access your location. Please type it above.");
    }
    if (e.target.closest("#basket-whatsapp")) {
      const items = Object.entries(basket).map(([s,q]) => [catalogData.products.find(p => p.slug === s),q]).filter(([p]) => p);
      if (!items.length) return alert("Your basket is empty.");
      const location = document.getElementById("delivery-location").value.trim() || "Not provided";
      const min = items.reduce((n,[p,q])=>n+p.price_kes*q,0), max = items.reduce((n,[p,q])=>n+(p.price_max_kes||p.price_kes)*q,0);
      const list = items.map(([p,q],i)=>`${i+1}. ${p.name} — ${q} × ${p.unit} (${money(p.price_kes, p.price_max_kes)})`).join("\n");
      const msg = `Hi Muskat Groceries! I'd like to order:\n\n${list}\n\nEstimated produce total: ${money(min,max>min?max:null)}\nDelivery location: ${location}\n\nPlease confirm availability, delivery fee and final total. Thank you.`;
      window.open(`${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    }
  });

  // ---------------------------------------------------------------- boot
  const PAGES = { catalog: ["catalog-root", renderCatalog], product: ["product-root", renderProduct] };

  async function boot() {
    const [rootId, render] = PAGES[document.body.dataset.page] || [];
    if (!render) return;
    const root = document.getElementById(rootId);
    try {
      catalogData = await loadCatalog();
      render(catalogData);
      installBasket();
    } catch (err) {
      console.error(err);
      const hint = location.protocol === "file:"
        ? "This page loads products.json, which browsers block on file:// URLs. Serve the folder instead, e.g. `npx serve .` or `python3 -m http.server`."
        : "Please try again in a moment.";
      showError(root, "Products couldn't be loaded", hint);
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
