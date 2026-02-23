        const loadScriptOnce = (() => {
            const cache = new Map();
            return (src) => {
                if (cache.has(src)) return cache.get(src);
                const promise = new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = src;
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
                cache.set(src, promise);
                return promise;
            };
        })();

        const ensureGsap = (() => {
            let pending;
            return () => {
                if (window.gsap && window.ScrollTrigger) {
                    window.gsap.registerPlugin(window.ScrollTrigger);
                    return Promise.resolve({ gsap: window.gsap, ScrollTrigger: window.ScrollTrigger });
                }
                if (pending) return pending;
                pending = Promise.all([
                    loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
                    loadScriptOnce('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js'),
                ]).then(() => {
                    if (!window.gsap || !window.ScrollTrigger) return null;
                    window.gsap.registerPlugin(window.ScrollTrigger);
                    return { gsap: window.gsap, ScrollTrigger: window.ScrollTrigger };
                }).catch(() => null);
                return pending;
            };
        })();

        const runWhenIdle = (fn, timeout = 1200) => {
            if ('requestIdleCallback' in window) {
                window.requestIdleCallback(fn, { timeout });
                return;
            }
            window.setTimeout(fn, 0);
        };

        const spotlightCards = document.querySelectorAll('.spotlight-card');
        if (spotlightCards.length) {
            spotlightCards.forEach((card) => {
                let spotRaf = 0;
                let lastX = -999;
                let lastY = -999;

                const flush = () => {
                    card.style.setProperty('--mouse-x', `${lastX}px`);
                    card.style.setProperty('--mouse-y', `${lastY}px`);
                    spotRaf = 0;
                };

                card.addEventListener('pointermove', (e) => {
                    const rect = card.getBoundingClientRect();
                    lastX = e.clientX - rect.left;
                    lastY = e.clientY - rect.top;
                    if (spotRaf) return;
                    spotRaf = requestAnimationFrame(flush);
                }, { passive: true });

                card.addEventListener('pointerleave', () => {
                    lastX = -999;
                    lastY = -999;
                    if (spotRaf) return;
                    spotRaf = requestAnimationFrame(flush);
                });
            });
        }

        // --- 2.1 FEATURE FRAME GRID ---
        (() => {
            const grid = document.getElementById('featureFrameGrid');
            if (!grid) return;
            const items = Array.from(grid.querySelectorAll('.frame-item'));
            if (!items.length) return;

            const colCount = 3;
            const rowCount = Math.ceil(items.length / colCount);
            const rowHoverSize = 6;
            const rowTotal = 8;
            const colHoverSize = 6;
            const colTotal = 12;

            const isCompact = () => window.matchMedia('(max-width: 1024px)').matches;
            const isTouch = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

            const setGrid = (row, col) => {
                if (isCompact()) return;
                const rowRest = rowCount > 1 ? (rowTotal - rowHoverSize) / (rowCount - 1) : rowTotal;
                const colRest = colCount > 1 ? (colTotal - colHoverSize) / (colCount - 1) : colTotal;
                const rows = Array.from({ length: rowCount }, (_, i) => (i === row ? `${rowHoverSize}fr` : `${rowRest}fr`));
                const cols = Array.from({ length: colCount }, (_, i) => (i === col ? `${colHoverSize}fr` : `${colRest}fr`));
                grid.style.gridTemplateRows = rows.join(' ');
                grid.style.gridTemplateColumns = cols.join(' ');
            };

            const resetGrid = () => {
                if (isCompact()) return;
                grid.style.gridTemplateRows = Array.from({ length: rowCount }, () => '4fr').join(' ');
                grid.style.gridTemplateColumns = Array.from({ length: colCount }, () => '4fr').join(' ');
            };

            const activateItem = (item, row, col) => {
                items.forEach((i) => i.classList.remove('is-hovered'));
                item.classList.add('is-hovered');
                setGrid(row, col);
            };

            const deactivateItem = (item) => {
                if (!isTouch()) {
                    item.classList.remove('is-hovered');
                    resetGrid();
                }
            };

            const syncLayout = () => {
                if (isCompact()) {
                    grid.style.removeProperty('grid-template-rows');
                    grid.style.removeProperty('grid-template-columns');
                    items.forEach((i) => i.classList.remove('is-hovered'));
                } else {
                    resetGrid();
                }
            };

            items.forEach((item, index) => {
                const row = Math.floor(index / colCount);
                const col = index % colCount;
                const serviceLink = item.getAttribute('data-service-link');
                item.addEventListener('mouseenter', () => {
                    if (isTouch()) return;
                    activateItem(item, row, col);
                });
                item.addEventListener('mouseleave', () => {
                    if (isTouch()) return;
                    deactivateItem(item);
                });
                item.addEventListener('click', (event) => {
                    if (serviceLink) {
                        window.location.href = serviceLink;
                        return;
                    }
                    if (!isTouch()) return;
                    activateItem(item, row, col);
                });
                item.addEventListener('keydown', (event) => {
                    if (!serviceLink) return;
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        window.location.href = serviceLink;
                    }
                });
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'link');
            });

            window.addEventListener('resize', syncLayout);
            syncLayout();
        })();

        // --- 2.2 WHY LYNCK ACCORDION ---
        (() => {
            const accordions = Array.from(document.querySelectorAll('[data-why-accordion]'));
            if (!accordions.length) return;

            const isTouch = () => window.matchMedia('(hover: none), (pointer: coarse)').matches;

            accordions.forEach((accordion) => {
                const items = Array.from(accordion.querySelectorAll('[data-accordion-item]'));
                if (!items.length) return;

                const syncAria = () => {
                    items.forEach((item) => {
                        const active = item.classList.contains('is-active');
                        item.setAttribute('aria-pressed', active ? 'true' : 'false');
                    });
                };

                const setActive = (target) => {
                    items.forEach((item) => item.classList.toggle('is-active', item === target));
                    syncAria();
                };

                const initial = items.find((item) => item.classList.contains('is-active')) || items[0];
                setActive(initial);

                items.forEach((item) => {
                    item.setAttribute('tabindex', '0');
                    item.setAttribute('role', 'button');

                    item.addEventListener('mouseenter', () => {
                        if (isTouch()) return;
                        setActive(item);
                    });

                    item.addEventListener('focusin', () => {
                        setActive(item);
                    });

                    item.addEventListener('click', () => {
                        setActive(item);
                    });

                    item.addEventListener('keydown', (event) => {
                        if (event.key !== 'Enter' && event.key !== ' ') return;
                        event.preventDefault();
                        setActive(item);
                    });
                });
            });
        })();

        // --- 2.2 SERVICES MARQUEE ---
        (() => {
            const section = document.querySelector('.services-marquee-section');
            if (!section) return;
            let initialized = false;

            const initServicesMarquee = () => {
                if (initialized) return;
                initialized = true;
            const tracks = Array.from(document.querySelectorAll('[data-services-track]'));
            if (!tracks.length) return;

            const services = [
                { nameEn: 'Accountant', nameDe: 'Steuerberatung', query: 'accounting office laptop tax', detailEn: 'Lead-generation campaigns for accounting and tax firms.', detailDe: 'Lead-Generation-Kampagnen fuer Steuer- und Finanzkanzleien.' },
                { nameEn: 'Architect', nameDe: 'Architektur', query: 'architect studio blueprint modern', detailEn: 'Positioning and lead funnels for architecture studios.', detailDe: 'Positionierung und Lead-Funnels fuer Architekturbueros.' },
                { nameEn: 'Automotive', nameDe: 'Automotive', query: 'automotive workshop premium car', detailEn: 'Performance acquisition for automotive brands and dealerships.', detailDe: 'Performance-Akquise fuer Automotive-Marken und Autohaeuser.' },
                { nameEn: 'B2B', nameDe: 'B2B', query: 'b2b meeting boardroom strategy', detailEn: 'Structured B2B demand generation and pipeline growth.', detailDe: 'Strukturierte B2B-Nachfragegenerierung und Pipeline-Wachstum.' },
                { nameEn: 'Chiropractor', nameDe: 'Chiropraktik', query: 'chiropractor clinic patient', detailEn: 'Appointment-focused campaigns for local chiropractic clinics.', detailDe: 'Terminorientierte Kampagnen fuer Chiropraktik-Praxen.' },
                { nameEn: 'Cleaning Services', nameDe: 'Reinigungsservice', query: 'cleaning service team office', detailEn: 'Local lead systems for recurring cleaning contracts.', detailDe: 'Lokale Lead-Systeme fuer wiederkehrende Reinigungsauftraege.' },
                { nameEn: 'Construction', nameDe: 'Bau', query: 'construction site crane team', detailEn: 'Qualified project lead acquisition for construction companies.', detailDe: 'Qualifizierte Projekt-Lead-Akquise fuer Bauunternehmen.' },
                { nameEn: 'Dentist', nameDe: 'Zahnarzt', query: 'dentist clinic modern room', detailEn: 'Patient acquisition campaigns for dental practices.', detailDe: 'Patientengewinnungskampagnen fuer Zahnarztpraxen.' },
                { nameEn: 'Ecommerce', nameDe: 'E-Commerce', query: 'ecommerce warehouse product boxes', detailEn: 'Revenue-focused ad systems for online shops.', detailDe: 'Umsatzorientierte Ad-Systeme fuer Onlineshops.' },
                { nameEn: 'Education', nameDe: 'Bildung', query: 'education classroom digital learning', detailEn: 'Enrollment and course demand growth strategies.', detailDe: 'Strategien fuer Einschreibungen und Kursnachfrage.' },
                { nameEn: 'Electrician', nameDe: 'Elektriker', query: 'electrician wiring toolkit work', detailEn: 'Service-call lead generation with local targeting.', detailDe: 'Lead-Generierung fuer Serviceeinsaetze mit lokalem Targeting.' },
                { nameEn: 'Energy', nameDe: 'Energie', query: 'energy grid renewable plant', detailEn: 'Demand capture for energy services and infrastructure.', detailDe: 'Nachfragegewinnung fuer Energiedienstleistungen und Infrastruktur.' },
                { nameEn: 'Entertainment', nameDe: 'Entertainment', query: 'concert stage lights crowd', detailEn: 'Audience growth and promotion campaigns for entertainment brands.', detailDe: 'Audience-Wachstum und Promotion-Kampagnen fuer Entertainment-Marken.' },
                { nameEn: 'Events', nameDe: 'Events', query: 'event production conference stage', detailEn: 'Ticketing and event registration performance systems.', detailDe: 'Performance-Systeme fuer Tickets und Event-Registrierungen.' },
                { nameEn: 'Fashion', nameDe: 'Fashion', query: 'fashion campaign model studio', detailEn: 'Creative-led paid media for fashion brand growth.', detailDe: 'Creative-getriebene Paid-Media-Strategien fuer Fashion-Wachstum.' },
                { nameEn: 'Fitness & Nutrition', nameDe: 'Fitness & Nutrition', query: 'fitness gym nutrition coaching', detailEn: 'Membership and coaching lead growth campaigns.', detailDe: 'Kampagnen fuer Mitglieder- und Coaching-Leads.' },
                { nameEn: 'Food', nameDe: 'Food', query: 'food restaurant chef plating', detailEn: 'Local and delivery-focused acquisition for food brands.', detailDe: 'Lokale und lieferorientierte Akquise fuer Food-Marken.' },
                { nameEn: 'Healthcare', nameDe: 'Healthcare', query: 'healthcare clinic doctor office', detailEn: 'Compliant growth campaigns for healthcare providers.', detailDe: 'Compliance-konforme Wachstumskampagnen fuer Healthcare-Anbieter.' },
                { nameEn: 'Hotel', nameDe: 'Hotel', query: 'hotel lobby reception luxury', detailEn: 'Booking-focused campaigns for hospitality brands.', detailDe: 'Buchungsorientierte Kampagnen fuer Hospitality-Marken.' },
                { nameEn: 'HVAC', nameDe: 'HVAC', query: 'hvac technician installation', detailEn: 'Seasonal demand and recurring service lead systems.', detailDe: 'Saisonale Nachfrage- und Service-Lead-Systeme.' },
                { nameEn: 'Insurance', nameDe: 'Versicherung', query: 'insurance advisor paperwork office', detailEn: 'Quote-generation funnels for insurance services.', detailDe: 'Angebots-Funnels fuer Versicherungsdienstleistungen.' },
                { nameEn: 'Interior Design', nameDe: 'Interior Design', query: 'interior design luxury living room', detailEn: 'Portfolio-driven client acquisition for design studios.', detailDe: 'Portfolio-getriebene Kundengewinnung fuer Design-Studios.' },
                { nameEn: 'Landscaping', nameDe: 'Landschaftsbau', query: 'landscaping garden outdoor design', detailEn: 'Local demand campaigns for landscaping businesses.', detailDe: 'Lokale Nachfragekampagnen fuer Landschaftsbau-Unternehmen.' },
                { nameEn: 'Law', nameDe: 'Recht', query: 'law office consultation', detailEn: 'High-intent legal lead generation and qualification.', detailDe: 'High-Intent-Lead-Generierung und Qualifizierung fuer Kanzleien.' },
                { nameEn: 'Logistics', nameDe: 'Logistik', query: 'logistics distribution warehouse shipping', detailEn: 'B2B acquisition systems for logistics operators.', detailDe: 'B2B-Akquise-Systeme fuer Logistikunternehmen.' },
                { nameEn: 'Manufacturing', nameDe: 'Produktion', query: 'manufacturing factory automation', detailEn: 'Demand generation for industrial and manufacturing solutions.', detailDe: 'Demand Generation fuer industrielle Fertigungsloesungen.' },
                { nameEn: 'Moving Company', nameDe: 'Umzugsservice', query: 'moving company truck team', detailEn: 'Lead systems for local and regional moving providers.', detailDe: 'Lead-Systeme fuer lokale und regionale Umzugsanbieter.' },
                { nameEn: 'Photography', nameDe: 'Fotografie', query: 'photography camera studio session', detailEn: 'Portfolio-to-booking growth for photography brands.', detailDe: 'Wachstum von Portfolio zu Buchung fuer Fotografie-Marken.' },
                { nameEn: 'Plumbing', nameDe: 'Sanitaer', query: 'plumbing service tools repair', detailEn: 'Emergency and recurring plumbing lead campaigns.', detailDe: 'Kampagnen fuer Notfall- und wiederkehrende Sanitär-Leads.' },
                { nameEn: 'Real Estate', nameDe: 'Immobilien', query: 'real estate modern property listing', detailEn: 'Buyer and seller lead funnels for real estate teams.', detailDe: 'Kaeufer- und Verkaeufer-Funnels fuer Immobilien-Teams.' },
                { nameEn: 'Recruitment', nameDe: 'Recruiting', query: 'recruitment interview hiring office', detailEn: 'Candidate and client acquisition for recruiting firms.', detailDe: 'Kandidaten- und Kundenakquise fuer Recruiting-Firmen.' },
                { nameEn: 'Retail', nameDe: 'Retail', query: 'retail store product shelf', detailEn: 'Footfall and online conversion growth for retail brands.', detailDe: 'Wachstum von Frequenz und Online-Conversions fuer Retail-Marken.' },
                { nameEn: 'Roofing', nameDe: 'Dachdecker', query: 'roofing contractor house roof', detailEn: 'Local service lead generation for roofing companies.', detailDe: 'Lokale Service-Lead-Generierung fuer Dachdeckerbetriebe.' },
                { nameEn: 'SaaS', nameDe: 'SaaS', query: 'saas dashboard software analytics', detailEn: 'Trial, demo, and subscription acquisition systems.', detailDe: 'Systeme fuer Trial-, Demo- und Subscription-Akquise.' },
                { nameEn: 'Small Business', nameDe: 'Kleinunternehmen', query: 'small business storefront owner', detailEn: 'Practical growth systems for small business operators.', detailDe: 'Praktische Wachstumssysteme fuer Kleinunternehmen.' },
                { nameEn: 'Sports', nameDe: 'Sport', query: 'sports training stadium athletes', detailEn: 'Audience and membership growth for sports brands.', detailDe: 'Audience- und Mitgliederwachstum fuer Sportmarken.' },
                { nameEn: 'Technology', nameDe: 'Technologie', query: 'technology chips innovation lab', detailEn: 'Performance positioning for fast-moving tech companies.', detailDe: 'Performance-Positionierung fuer schnell wachsende Tech-Unternehmen.' },
                { nameEn: 'Therapist', nameDe: 'Therapie', query: 'therapy counseling office', detailEn: 'Appointment growth campaigns for therapists and clinics.', detailDe: 'Terminwachstumskampagnen fuer Therapeuten und Praxen.' },
                { nameEn: 'Tourism', nameDe: 'Tourismus', query: 'tourism destination travel city', detailEn: 'Destination-focused campaigns that convert interest into bookings.', detailDe: 'Destinations-Kampagnen, die Interesse in Buchungen umwandeln.' },
            ];

            const industryIconMap = {
                'Accountant': 'finance',
                'Architect': 'architecture',
                'Automotive': 'automotive',
                'B2B': 'network',
                'Chiropractor': 'healthcare',
                'Cleaning Services': 'sparkles',
                'Construction': 'construction',
                'Dentist': 'dental',
                'Ecommerce': 'cart',
                'Education': 'education',
                'Electrician': 'bolt',
                'Energy': 'energy',
                'Entertainment': 'play',
                'Events': 'calendar',
                'Fashion': 'fashion',
                'Fitness & Nutrition': 'fitness',
                'Food': 'food',
                'Healthcare': 'healthcare',
                'Hotel': 'hotel',
                'HVAC': 'fan',
                'Insurance': 'shield',
                'Interior Design': 'interior',
                'Landscaping': 'leaf',
                'Law': 'law',
                'Logistics': 'logistics',
                'Manufacturing': 'gear',
                'Moving Company': 'box',
                'Photography': 'camera',
                'Plumbing': 'tool',
                'Real Estate': 'house',
                'Recruitment': 'search-user',
                'Retail': 'bag',
                'Roofing': 'roof',
                'SaaS': 'cloud',
                'Small Business': 'store',
                'Sports': 'sports',
                'Technology': 'chip',
                'Therapist': 'wellness',
                'Tourism': 'plane',
            };

            const makeVectorSvg = (title, iconName) => {
                const palettes = [
                    ['#184abc', '#0d2f7b'],
                    ['#0f3b8f', '#061c55'],
                    ['#1f4fb7', '#0b2d6e'],
                    ['#153f9d', '#081f5f'],
                ];
                const hash = Array.from(title).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
                const [start, end] = palettes[hash % palettes.length];
                const icon = (() => {
                    switch (iconName) {
                        case 'finance': return "<rect x='130' y='130' width='100' height='130' rx='8'/><path d='M150 170h60M150 194h60M150 218h40'/><rect x='170' y='108' width='100' height='130' rx='8'/><path d='M190 148h60M190 172h60M190 196h40'/><path d='M148 282h24v-30h24v30h24v-50h24v50h24'/>";
                        case 'architecture': return "<rect x='140' y='150' width='120' height='120' rx='6'/><path d='M140 190h120M140 230h120M180 150v120M220 150v120'/><path d='M100 140l100-40 100 40'/><path d='M110 280h180'/><path d='M280 120l20-20v50'/>";
                        case 'automotive': return "<path d='M110 220h180'/><path d='M130 220l16-50h108l16 50'/><rect x='106' y='220' width='188' height='40' rx='12'/><circle cx='152' cy='264' r='16'/><circle cx='248' cy='264' r='16'/><path d='M164 196h72'/><path d='M290 200l16 8v28M110 200l-16 8v28'/>";
                        case 'network': return "<circle cx='200' cy='128' r='22'/><circle cx='120' cy='240' r='22'/><circle cx='280' cy='240' r='22'/><path d='M186 146l-52 78M214 146l52 78M142 240h116'/><circle cx='200' cy='128' r='8' fill='%23eaf3ff'/><circle cx='120' cy='240' r='8' fill='%23eaf3ff'/><circle cx='280' cy='240' r='8' fill='%23eaf3ff'/>";
                        case 'construction': return "<path d='M176 280V164l-50 26v90'/><path d='M176 164l-10-40h20l-10 40'/><path d='M126 280h160'/><rect x='192' y='200' width='80' height='80' rx='6'/><path d='M192 240h80'/><rect x='212' y='252' width='20' height='28' rx='3'/><path d='M232 208h20M232 224h20'/>";
                        case 'dental': return "<path d='M168 140c-28 0-44 22-38 54 6 32 18 72 28 72 8 0 12-22 18-40 4-12 10-20 24-20s20 8 24 20c6 18 10 40 18 40 10 0 22-40 28-72 6-32-10-54-38-54-12 0-20 8-32 8s-20-8-32-8Z'/><circle cx='168' cy='168' r='6' fill='%23eaf3ff'/><circle cx='232' cy='168' r='6' fill='%23eaf3ff'/><path d='M186 180c4 6 12 10 14 10s10-4 14-10'/>";
                        case 'cart': return "<path d='M112 136h28l8 16'/><path d='M148 152l20 80h92l24-60H160'/><circle cx='180' cy='258' r='14'/><circle cx='248' cy='258' r='14'/><rect x='164' y='174' width='24' height='18' rx='4'/><path d='M206 174v18M224 174v18'/>";
                        case 'education': return "<path d='M200 120l-100 48 100 48 100-48-100-48Z'/><path d='M132 184v52c20 28 116 28 136 0v-52'/><path d='M300 168v64'/><circle cx='300' cy='240' r='8'/><path d='M200 168v48'/>";
                        case 'bolt': return "<path d='M220 100l-80 112h56l-16 88 80-112h-56l16-88Z'/><path d='M132 148l-20 4M268 248l20-4'/>";
                        case 'energy': return "<circle cx='200' cy='200' r='90'/><path d='M220 128l-52 80h36l-12 64 52-80h-36l12-64Z'/><path d='M200 108v-16M200 308v-16M108 200H92M308 200h-16M136 136l-10-10M274 274l-10-10M264 136l10-10M126 274l10-10'/>";
                        case 'play': return "<rect x='116' y='124' width='168' height='152' rx='18'/><path d='M184 176v48l40-24-40-24Z'/><path d='M116 156h168'/><circle cx='140' cy='140' r='6' fill='%23eaf3ff'/><circle cx='160' cy='140' r='6' fill='%23eaf3ff'/><circle cx='180' cy='140' r='6' fill='%23eaf3ff'/>";
                        case 'calendar': return "<rect x='118' y='136' width='164' height='140' rx='14'/><path d='M118 176h164'/><path d='M158 116v40M242 116v40'/><circle cx='160' cy='212' r='8' fill='%23eaf3ff'/><circle cx='200' cy='212' r='8' fill='%23eaf3ff'/><circle cx='240' cy='212' r='8' fill='%23eaf3ff'/><circle cx='160' cy='248' r='8' fill='%23eaf3ff'/><circle cx='200' cy='248' r='8' fill='%23eaf3ff'/>";
                        case 'fashion': return "<path d='M200 120v160'/><path d='M168 120c0-18 14-32 32-32s32 14 32 32'/><path d='M148 156c0 28 24 50 52 50s52-22 52-50'/><path d='M152 280h96'/><path d='M168 244l-20-16M232 244l20-16'/><path d='M180 188l-12 20M220 188l12 20'/>";
                        case 'fitness': return "<rect x='100' y='178' width='28' height='44' rx='8'/><rect x='272' y='178' width='28' height='44' rx='8'/><rect x='128' y='186' width='144' height='28' rx='10'/><rect x='128' y='172' width='18' height='56' rx='4'/><rect x='254' y='172' width='18' height='56' rx='4'/><path d='M200 156v-20M186 144h28'/>";
                        case 'food': return "<ellipse cx='200' cy='230' rx='80' ry='40'/><path d='M200 190v-70'/><path d='M180 120c0 24 8 42 20 54'/><path d='M220 120c0 24-8 42-20 54'/><path d='M200 120v-8'/><path d='M120 230c0 14 36 30 80 30s80-16 80-30'/><path d='M280 250v20c0 10-36 20-80 20s-80-10-80-20v-20'/>";
                        case 'healthcare': return "<path d='M200 130c-26-36-78-36-78 10 0 56 78 100 78 100s78-44 78-100c0-46-52-46-78-10'/><path d='M184 180h32M200 164v32'/>";
                        case 'hotel': return "<rect x='108' y='200' width='184' height='70' rx='12'/><path d='M136 200v-36c0-12 10-22 22-22h0c12 0 22 10 22 22v36'/><path d='M220 200v-36c0-12 10-22 22-22h0c12 0 22 10 22 22v36'/><path d='M108 270h184'/><path d='M128 130h144v70H128'/><path d='M200 130v-16'/>";
                        case 'fan': return "<circle cx='200' cy='200' r='16'/><path d='M200 184c-6-40 10-72 36-80 12 30 2 64-20 80'/><path d='M216 200c40-6 72 10 80 36-30 12-64 2-80-20'/><path d='M200 216c6 40-10 72-36 80-12-30-2-64 20-80'/><path d='M184 200c-40 6-72-10-80-36 30-12 64-2 80 20'/><circle cx='200' cy='200' r='6' fill='%23eaf3ff'/>";
                        case 'shield': return "<path d='M200 112l-76 30v60c0 54 34 88 76 106 42-18 76-52 76-106v-60l-76-30Z'/><path d='M176 204l18 18 32-36'/>";
                        case 'interior': return "<path d='M160 160h80v60h-80z'/><path d='M144 220h112'/><path d='M160 220v48M240 220v48'/><path d='M152 268h96'/><path d='M116 120v40h24v-40'/><path d='M128 120c0-10 8-16 16-16'/><circle cx='128' cy='108' r='10'/><path d='M280 160h-24v-40h24v-8c0-10-8-18-18-18h0c-10 0-18 8-18 18v68'/>";
                        case 'leaf': return "<path d='M140 276c20-80 72-132 152-148'/><path d='M292 128c-4 80-56 140-136 160'/><path d='M140 276c24-20 42-46 56-76'/><path d='M184 212c16-22 36-42 60-56'/><path d='M224 180c14-12 30-24 48-32'/>";
                        case 'law': return "<path d='M200 108v160'/><path d='M140 148h120'/><path d='M128 148l-24 44h48l-24-44Z'/><path d='M272 148l-24 44h48l-24-44Z'/><rect x='166' y='268' width='68' height='14' rx='6'/><path d='M104 192h48M248 192h48'/>";
                        case 'logistics': return "<rect x='96' y='176' width='140' height='72' rx='10'/><path d='M236 204h56l20 44H236v-44Z'/><circle cx='148' cy='260' r='16'/><circle cx='272' cy='260' r='16'/><path d='M96 204h140'/><path d='M116 176v-24h100v24'/><path d='M128 152h-20v-16h60v16'/>";
                        case 'gear': return "<circle cx='200' cy='200' r='32'/><circle cx='200' cy='200' r='14'/><path d='M200 116v28M200 256v28M116 200h28M256 200h28'/><path d='M142 142l20 20M238 238l20 20M258 142l-20 20M142 258l20-20'/><path d='M188 130l12-14M212 130l-12-14M188 270l12 14M212 270l-12 14'/>";
                        case 'box': return "<path d='M200 116l-92 48v80l92 48 92-48v-80l-92-48Z'/><path d='M108 164l92 48 92-48'/><path d='M200 212v80'/><path d='M200 116v-20M152 128l-20-12M248 128l20-12'/>";
                        case 'camera': return "<rect x='108' y='152' width='184' height='124' rx='16'/><circle cx='200' cy='214' r='36'/><circle cx='200' cy='214' r='18'/><path d='M156 152l12-28h64l12 28'/><circle cx='264' cy='176' r='8' fill='%23eaf3ff'/><path d='M128 176h16'/>";
                        case 'tool': return "<path d='M272 128c-22 0-40 18-40 40 0 8 2 16 6 22l-112 112c-12 12-12 32 0 44s32 12 44 0l112-112c6 4 14 6 22 6 22 0 40-18 40-40l-28 28-24-24 28-28c-14-4-28-2-40 8'/><circle cx='158' cy='310' r='8'/>";
                        case 'house': return "<path d='M108 204l92-76 92 76'/><rect x='136' y='204' width='128' height='76' rx='6'/><rect x='180' y='236' width='40' height='44' rx='4'/><path d='M160 228h24v20h-24zM216 228h24v20h-24z'/><path d='M200 128v-12h28v36'/>";
                        case 'search-user': return "<circle cx='172' cy='168' r='24'/><path d='M144 228c8-22 42-22 56 0'/><circle cx='252' cy='228' r='32'/><path d='M276 252l28 28'/><rect x='120' y='120' width='80' height='120' rx='12'/>";
                        case 'bag': return "<rect x='132' y='168' width='136' height='112' rx='14'/><path d='M168 168c0-22 14-40 32-40s32 18 32 40'/><path d='M132 208h136'/><circle cx='172' cy='188' r='6' fill='%23eaf3ff'/><circle cx='228' cy='188' r='6' fill='%23eaf3ff'/>";
                        case 'roof': return "<path d='M100 216l100-80 100 80'/><rect x='132' y='216' width='136' height='64' rx='6'/><rect x='180' y='240' width='40' height='40' rx='3'/><path d='M100 216h200'/><path d='M152 144l-24 8M248 144l24 8'/><path d='M200 136v-24'/>";
                        case 'cloud': return "<path d='M146 256h118c24 0 44-18 44-40s-20-40-44-40h-4c-8-28-34-44-64-44-36 0-62 24-68 54h-4c-20 0-36 16-36 35s16 35 36 35h22Z'/><path d='M186 220l12 12 24-28'/><path d='M176 188h48M176 200h32'/>";
                        case 'store': return "<rect x='120' y='184' width='160' height='92' rx='8'/><path d='M120 184h160v-28c0-8-6-14-14-14H134c-8 0-14 6-14 14v28Z'/><rect x='184' y='224' width='36' height='52' rx='4'/><path d='M140 224h28v28h-28z'/><path d='M120 276h160'/><path d='M200 142v-24M168 148l-10-20M232 148l10-20'/>";
                        case 'sports': return "<circle cx='200' cy='188' r='60'/><path d='M200 128v120M140 188h120'/><path d='M152 148c16 22 16 58 0 80'/><path d='M248 148c-16 22-16 58 0 80'/><path d='M164 276h72'/><path d='M200 248v28'/>";
                        case 'chip': return "<rect x='144' y='144' width='112' height='112' rx='10'/><rect x='168' y='168' width='64' height='64' rx='6'/><path d='M164 126v18M196 126v18M228 126v18M164 256v18M196 256v18M228 256v18M126 164h18M126 196h18M126 228h18M256 164h18M256 196h18M256 228h18'/><circle cx='200' cy='200' r='12'/>";
                        case 'wellness': return "<circle cx='200' cy='148' r='28'/><path d='M200 176v36'/><path d='M168 196l32 16 32-16'/><path d='M148 268c12-32 28-48 52-48s40 16 52 48'/><path d='M128 200c-16 8-24 20-24 36'/><path d='M272 200c16 8 24 20 24 36'/>";
                        case 'plane': return "<path d='M200 108v184'/><path d='M200 148l-72 60v28l72-28 72 28v-28l-72-60Z'/><path d='M200 260l-36 28v16l36-16 36 16v-16l-36-28Z'/><circle cx='200' cy='124' r='12'/>";
                        case 'sparkles': return "<path d='M200 112l20 48 48 20-48 20-20 48-20-48-48-20 48-20 20-48Z'/><path d='M280 224l10 22 22 10-22 10-10 22-10-22-22-10 22-10 10-22Z'/><path d='M120 224l8 18 18 8-18 8-8 18-8-18-18-8 18-8 8-18Z'/>";
                        default: return "<circle cx='200' cy='200' r='60'/><path d='M200 160v80M160 200h80'/>";
                    }
                })();
                const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'><defs><linearGradient id='g' x1='0' x2='1' y1='0' y2='1'><stop offset='0%' stop-color='${start}'/><stop offset='100%' stop-color='${end}'/></linearGradient><radialGradient id='gl' cx='30%' cy='20%' r='80%'><stop offset='0%' stop-color='rgba(255,255,255,0.22)'/><stop offset='100%' stop-color='rgba(255,255,255,0)'/></radialGradient></defs><rect width='400' height='400' rx='24' fill='url(#g)'/><rect width='400' height='400' rx='24' fill='url(#gl)'/><g fill='none' stroke='rgba(210,226,255,0.9)' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'>${icon}</g></svg>`;
                return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
            };

            const createCard = (service, index, lang) => {
                const serviceName = lang === 'de' ? (service.nameDe || service.nameEn) : service.nameEn;
                const serviceDetail = lang === 'de' ? (service.detailDe || service.detailEn) : service.detailEn;
                const card = document.createElement('article');
                card.className = 'service-mini-card';

                const image = document.createElement('img');
                image.className = 'service-mini-image';
                const iconName = industryIconMap[service.nameEn] || 'sparkles';
                image.src = makeVectorSvg(serviceName, iconName);
                image.alt = `${serviceName} service`;
                image.loading = 'lazy';
                image.decoding = 'async';

                const tint = document.createElement('div');
                tint.className = 'service-mini-tint';

                const top = document.createElement('div');
                top.className = 'service-mini-top';

                const title = document.createElement('h3');
                title.className = 'service-mini-name';
                title.textContent = serviceName;
                top.appendChild(title);

                const reveal = document.createElement('div');
                reveal.className = 'service-mini-reveal';

                const revealTitle = document.createElement('h4');
                revealTitle.className = 'service-mini-reveal-title';
                revealTitle.textContent = serviceName;

                const description = document.createElement('p');
                description.textContent = serviceDetail;

                reveal.appendChild(revealTitle);
                reveal.appendChild(description);

                card.appendChild(image);
                card.appendChild(tint);
                card.appendChild(top);
                card.appendChild(reveal);
                return card;
            };

            const createGroup = (lang) => {
                const group = document.createElement('div');
                group.className = 'services-marquee-group';
                services.forEach((service, index) => group.appendChild(createCard(service, index, lang)));
                return group;
            };

            tracks.forEach((track) => {
                if (track.children.length) return;
                const lang = track.closest('[data-services-lang]')?.getAttribute('data-services-lang') || 'en';
                const firstGroup = createGroup(lang);
                const secondGroup = createGroup(lang);
                secondGroup.setAttribute('aria-hidden', 'true');
                track.appendChild(firstGroup);
                track.appendChild(secondGroup);
            });

            // --- MARQUEE ARROW BUTTONS ---
            document.querySelectorAll('[data-marquee-arrow]').forEach((btn) => {
                const direction = btn.getAttribute('data-marquee-arrow');
                const window_ = btn.closest('.services-marquee-window');
                const track = window_?.querySelector('.services-marquee-track');
                if (!track) return;

                btn.addEventListener('click', () => {
                    // Pause auto-scroll animation
                    track.style.animationPlayState = 'paused';

                    // Get current computed translateX
                    const style = getComputedStyle(track);
                    const matrix = new DOMMatrix(style.transform);
                    const currentX = matrix.m41;

                    // Scroll by ~card width + gap
                    const step = 280;
                    const targetX = direction === 'left' ? currentX + step : currentX - step;

                    // Apply transform and transition
                    track.style.animation = 'none';
                    track.style.transform = `translateX(${targetX}px)`;
                    track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

                    // Resume auto-scroll after a pause
                    clearTimeout(track._resumeTimer);
                    track._resumeTimer = setTimeout(() => {
                        // Restart animation from current position
                        track.style.transition = '';
                        track.style.transform = '';
                        track.style.animation = '';
                        track.style.animationPlayState = '';
                    }, 3000);
                });
            });
            };

            const initDeferred = () => runWhenIdle(initServicesMarquee, 2500);
            const observer = new IntersectionObserver((entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                observer.disconnect();
                initDeferred();
            }, { rootMargin: '260px 0px' });

            observer.observe(section);
            window.addEventListener('pointerdown', initDeferred, { once: true, passive: true });
            window.addEventListener('touchstart', initDeferred, { once: true, passive: true });
            window.addEventListener('scroll', initDeferred, { once: true, passive: true });
        })();

        // --- 3. PIPELINE ---
        (() => {
            const races = document.querySelector(".pin-wrap");
            const unifiedSection = document.querySelector('.mesh-pulse-unified');
            const pipelineSection = document.querySelector('.pipeline-section');
            const sentinel = pipelineSection || unifiedSection;
            if (!sentinel) return;

            const initGsapSections = (gsap, ScrollTrigger) => {
                if (races && pipelineSection) {
                    const getScrollAmount = () => -(races.scrollWidth - window.innerWidth);
                    const tween = gsap.to(races, { x: getScrollAmount, ease: "none" });
                    ScrollTrigger.create({
                        trigger: ".pipeline-section",
                        start: "top top",
                        end: () => `+=${races.scrollWidth - window.innerWidth}`,
                        pin: true,
                        animation: tween,
                        scrub: 1,
                        invalidateOnRefresh: true
                    });

                    gsap.utils.toArray('.horiz-img').forEach((img) => {
                        gsap.fromTo(
                            img,
                            { xPercent: -15 },
                            {
                                xPercent: 15,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: ".pipeline-section",
                                    start: "top top",
                                    end: () => `+=${races.scrollWidth - window.innerWidth}`,
                                    scrub: true
                                }
                            }
                        );
                    });
                }

                if (unifiedSection) {
                    gsap.fromTo(
                        unifiedSection,
                        { yPercent: 7 },
                        {
                            yPercent: 0,
                            ease: "none",
                            scrollTrigger: {
                                trigger: unifiedSection,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true
                            }
                        }
                    );
                }
            };

            const observer = new IntersectionObserver((entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                observer.disconnect();
                ensureGsap().then((mods) => {
                    if (!mods) return;
                    initGsapSections(mods.gsap, mods.ScrollTrigger);
                });
            }, { rootMargin: '220px 0px' });

            observer.observe(sentinel);
        })();

        // --- 4. NEURAL GRID ---
        const grid = document.getElementById('neuralGrid');
        const neuralSection = document.querySelector('.neural-section');
        if (grid && neuralSection) {
            let neuralInitialized = false;
            const initNeuralGrid = () => {
                if (neuralInitialized) return;
                neuralInitialized = true;
                const spacing = window.innerWidth < 768 ? 40 : 30;
                const cols = Math.ceil(window.innerWidth / spacing);
                const rows = Math.ceil((window.innerHeight * 1.5) / spacing);
                const maxDots = window.innerWidth < 768 ? 300 : 520;
                const totalDots = Math.min(cols * rows, maxDots);

                for (let i = 0; i < totalDots; i += 1) {
                    const dot = document.createElement('div');
                    dot.classList.add('neural-dot');
                    grid.appendChild(dot);
                }

                const isUnifiedNeural = !!neuralSection.closest('.mesh-pulse-unified');
                const neuralBaseColor = isUnifiedNeural ? 'rgba(255,255,255,0.22)' : 'rgba(12,23,48,0.2)';
                const neuralActiveColor = isUnifiedNeural ? 'rgba(255,255,255,0.62)' : 'rgba(12,23,48,0.5)';
                const cachedDots = Array.from(grid.querySelectorAll('.neural-dot')).map((dot) => ({
                    dot,
                    x: dot.offsetLeft,
                    y: dot.offsetTop,
                }));

                let neuralRaf = 0;
                let active = false;
                const onMove = (e) => {
                    if (!active || neuralRaf || document.hidden) return;
                    neuralRaf = requestAnimationFrame(() => {
                        const rect = grid.getBoundingClientRect();
                        const mx = e.clientX - rect.left;
                        const my = e.clientY - rect.top;
                        const radius = window.innerWidth < 768 ? 220 : 320;

                        cachedDots.forEach((item) => {
                            const dx = item.x - mx;
                            const dy = item.y - my;
                            const dist = Math.sqrt(dx * dx + dy * dy);

                            if (dist < radius) {
                                const force = (radius - dist) / radius;
                                const angle = Math.atan2(dy, dx);
                                const moveX = Math.cos(angle) * force * 40;
                                const moveY = Math.sin(angle) * force * 40;
                                item.dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
                                item.dot.style.background = neuralActiveColor;
                            } else {
                                item.dot.style.transform = 'translate(0,0)';
                                item.dot.style.background = neuralBaseColor;
                            }
                        });
                        neuralRaf = 0;
                    });
                };

                const visibilityObserver = new IntersectionObserver((entries) => {
                    active = entries.some((entry) => entry.isIntersecting);
                }, { threshold: 0.05 });

                visibilityObserver.observe(neuralSection);
                neuralSection.addEventListener('mousemove', onMove, { passive: true });
            };

            const observer = new IntersectionObserver((entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                observer.disconnect();
                runWhenIdle(initNeuralGrid, 2600);
            }, { rootMargin: '240px 0px' });
            observer.observe(neuralSection);
        }

        // --- 5. SYSTEM PULSE ---
        const chartArea = document.getElementById('liveChart');
        if (chartArea) {
            let barsInitialized = false;
            const initBars = () => {
                if (barsInitialized) return;
                barsInitialized = true;
                const barCount = window.innerWidth < 768 ? 18 : 26;
                for (let i = 0; i < barCount; i += 1) {
                    const bar = document.createElement('div');
                    bar.classList.add('chart-bar');
                    bar.style.animationDelay = `${Math.random() * 2}s`;
                    chartArea.appendChild(bar);
                }
            };

            const pulseSection = chartArea.closest('.pulse-section') || chartArea;
            const observer = new IntersectionObserver((entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                observer.disconnect();
                runWhenIdle(initBars, 2800);
            }, { rootMargin: '260px 0px' });
            observer.observe(pulseSection);
        }

        // --- NAV DROPDOWNS ---
        (() => {
            const dropdowns = Array.from(document.querySelectorAll('.nav-dropdown'));
            if (!dropdowns.length) return;
            dropdowns.forEach((dropdown) => {
                const button = dropdown.querySelector('.nav-pill');
                if (!button) return;
                button.addEventListener('click', (event) => {
                    event.stopPropagation();
                    dropdowns.forEach((d) => { if (d !== dropdown) d.classList.remove('open'); });
                    dropdown.classList.toggle('open');
                });
            });
            document.addEventListener('click', () => {
                dropdowns.forEach((d) => d.classList.remove('open'));
            });
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape') {
                    dropdowns.forEach((d) => d.classList.remove('open'));
                }
            });
        })();

        // --- CONTACT BUTTON ---
        (() => {
            const buttons = document.querySelectorAll('[data-contact-btn]');
            if (!buttons.length) return;
            const getLang = () => {
                if (window.location.pathname.includes('/de/')) return 'de';
                try {
                    const stored = localStorage.getItem('language');
                    if (stored === 'de') return 'de';
                } catch (e) {}
                return 'en';
            };
            buttons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const lang = getLang();
                    const target = lang === 'de' ? '/de/apply/' : '/apply/';
                    window.location.href = target;
                });
            });
        })();

        // --- APPLY BUTTON ---
        (() => {
            const buttons = document.querySelectorAll('[data-apply-btn]');
            if (!buttons.length) return;
            const getLang = () => {
                if (window.location.pathname.includes('/de/')) return 'de';
                try {
                    const stored = localStorage.getItem('language');
                    if (stored === 'de') return 'de';
                } catch (e) {}
                return 'en';
            };
            buttons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const lang = getLang();
                    const target = lang === 'de' ? '/de/apply/' : '/apply/';
                    window.location.href = target;
                });
            });
        })();

        // --- STRATEGY CALL / BUILD GROWTH CTA BUTTONS ---
        (() => {
            const buttons = document.querySelectorAll('[data-strategy-call-btn], [data-build-growth-btn]');
            if (!buttons.length) return;
            const getLang = () => {
                if (window.location.pathname.includes('/de/')) return 'de';
                try {
                    const stored = localStorage.getItem('language');
                    if (stored === 'de') return 'de';
                } catch (e) {}
                return 'en';
            };
            buttons.forEach((btn) => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault();
                    const lang = getLang();
                    const target = lang === 'de' ? '/de/apply/' : '/apply/';
                    window.location.href = target;
                });
            });
        })();

        // --- LANGUAGE SWITCH ---
        (() => {
            const langButtons = document.querySelectorAll('[data-lang-switch]');
            if (!langButtons.length) return;
            const getLang = () => {
                if (window.location.pathname.includes('/de/')) return 'de';
                try {
                    const stored = localStorage.getItem('language');
                    if (stored === 'de') return 'de';
                } catch (e) {}
                return 'en';
            };
            langButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const lang = btn.getAttribute('data-lang-switch') || getLang();
                    try {
                        localStorage.setItem('language', lang);
                    } catch (e) {}
                    const dropdown = btn.closest('.nav-dropdown');
                    if (dropdown) {
                        dropdown.classList.remove('open');
                    }
                    const target = lang === 'de' ? '/de/index.html' : '/index.html';
                    window.location.href = target;
                });
            });
        })();

        // --- HOME BUTTON ---
        (() => {
            const homeButtons = document.querySelectorAll('[data-home-btn]');
            if (!homeButtons.length) return;
            const getLang = () => {
                if (window.location.pathname.includes('/de/')) return 'de';
                try {
                    const stored = localStorage.getItem('language');
                    if (stored === 'de') return 'de';
                } catch (e) {}
                return 'en';
            };
            homeButtons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const lang = getLang();
                    const target = lang === 'de' ? '/de/index.html' : '/index.html';
                    window.location.href = target;
                });
            });
        })();

        // --- HERO FALLBACK ---
        (() => {
            const frame = document.querySelector('.hero-embed-frame');
            const fallback = document.getElementById('heroFallback');
            if (!frame || !fallback) return;
            const heroShell = frame.closest('.hero-embed') || frame.closest('.hero-shell') || frame.parentElement;

            const lazySrc = frame.getAttribute('data-src');
            let booted = false;
            let fallbackRemoved = false;
            let heroReady = false;
            let readyTimeout = 0;
            const connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection;
            const isSmallViewport = window.matchMedia('(max-width: 1024px)').matches;
            const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const hasLowMemory = typeof window.navigator.deviceMemory === 'number' && window.navigator.deviceMemory <= 4;
            const hasLowCpu = typeof window.navigator.hardwareConcurrency === 'number' && window.navigator.hardwareConcurrency <= 4;
            const shouldUseFallbackOnly = (
                window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                Boolean(connection && connection.saveData) ||
                isSmallViewport ||
                isCoarsePointer ||
                hasLowMemory ||
                hasLowCpu
            );

            const hideFallback = () => {
                if (fallbackRemoved) return;
                fallbackRemoved = true;
                if (readyTimeout) {
                    window.clearTimeout(readyTimeout);
                    readyTimeout = 0;
                }
                window.removeEventListener('message', onHeroMessage);
                fallback.classList.add('is-hidden');
                window.setTimeout(() => {
                    fallback.remove();
                }, 700);
            };

            const onHeroMessage = (event) => {
                if (event.source !== frame.contentWindow) return;
                if (!event.data || event.data.type !== 'hero-ready') return;
                heroReady = true;
                hideFallback();
            };

            const bootFrame = () => {
                if (booted || !lazySrc || shouldUseFallbackOnly) return;
                booted = true;
                frame.src = lazySrc;
            };

            frame.addEventListener('load', () => {
                frame.style.opacity = '1';
                // Keep fallback visible until the iframe confirms title + scene are ready.
            });

            if (shouldUseFallbackOnly) {
                window.removeEventListener('message', onHeroMessage);
                frame.remove();
                return;
            }

            window.addEventListener('message', onHeroMessage);

            if (heroShell) {
                heroShell.addEventListener('mouseenter', bootFrame, { once: true, passive: true });
                heroShell.addEventListener('pointerdown', bootFrame, { once: true, passive: true });
                heroShell.addEventListener('touchstart', bootFrame, { once: true, passive: true });
            }
            window.addEventListener('pointerdown', bootFrame, { once: true, passive: true });
            window.addEventListener('scroll', bootFrame, { once: true, passive: true });
            window.addEventListener('keydown', bootFrame, { once: true });
        })();

        // --- HERO SCRAMBLE TEXT ---
        (() => {
            const lines = Array.from(document.querySelectorAll('[data-scramble-line]'));
            if (!lines.length) return;

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

            const scrambleTo = (line, targetText, duration = 620) => {
                if (prefersReducedMotion) {
                    line.textContent = targetText;
                    return;
                }

                const totalFrames = Math.max(12, Math.floor(duration / 16));
                let frame = 0;

                const update = () => {
                    frame += 1;
                    const progress = frame / totalFrames;
                    const revealCount = Math.floor(progress * targetText.length);
                    let output = '';

                    for (let i = 0; i < targetText.length; i += 1) {
                        const character = targetText[i];
                        if (character === ' ' || i < revealCount) {
                            output += character;
                        } else {
                            output += characterSet[Math.floor(Math.random() * characterSet.length)];
                        }
                    }

                    line.textContent = output;

                    if (frame < totalFrames) {
                        requestAnimationFrame(update);
                    } else {
                        line.textContent = targetText;
                    }
                };

                requestAnimationFrame(update);
            };

            const runSequence = () => {
                lines.forEach((line, index) => {
                    const targetText = line.getAttribute('data-text') || line.textContent || '';
                    window.setTimeout(() => {
                        scrambleTo(line, targetText, 640);
                    }, index * 90);
                });
            };

            runSequence();

            const wrapper = document.querySelector('[data-hero-scramble]');
            if (wrapper) {
                wrapper.addEventListener('mouseenter', runSequence);
                wrapper.addEventListener('focusin', runSequence);
                wrapper.addEventListener('touchstart', runSequence, { passive: true });
            }

        })();

        // --- SECTION TITLE SCRAMBLE ---
        (() => {
            const titles = Array.from(document.querySelectorAll('[data-section-title]'));
            if (!titles.length) return;

            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

            const scrambleTo = (node, targetText, duration = 560) => {
                if (prefersReducedMotion) {
                    node.textContent = targetText;
                    return;
                }

                const totalFrames = Math.max(10, Math.floor(duration / 16));
                let frame = 0;

                const tick = () => {
                    frame += 1;
                    const progress = frame / totalFrames;
                    const revealCount = Math.floor(progress * targetText.length);
                    let output = '';

                    for (let i = 0; i < targetText.length; i += 1) {
                        const character = targetText[i];
                        if (character === ' ' || i < revealCount) {
                            output += character;
                        } else {
                            output += characterSet[Math.floor(Math.random() * characterSet.length)];
                        }
                    }

                    node.textContent = output;
                    if (frame < totalFrames) {
                        requestAnimationFrame(tick);
                    } else {
                        node.textContent = targetText;
                    }
                };

                requestAnimationFrame(tick);
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const title = entry.target;
                    const targetText = title.getAttribute('data-text') || title.textContent || '';
                    scrambleTo(title, targetText, 520);
                    observer.unobserve(title);
                });
            }, { threshold: 0.65 });

            titles.forEach((title) => observer.observe(title));
            window.addEventListener('beforeunload', () => observer.disconnect());
        })();
