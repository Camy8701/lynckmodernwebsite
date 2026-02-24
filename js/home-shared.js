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

            const industryImageMap = {
                'Accountant': 'accountant.png',
                'Architect': 'architect.png',
                'Automotive': 'automotive.png',
                'B2B': 'b2b.png',
                'Chiropractor': 'chiropractor.png',
                'Cleaning Services': 'cleaning-services.png',
                'Construction': 'construction.png',
                'Dentist': 'dentist.png',
                'Ecommerce': 'e-commerce.png',
                'Education': 'education.png',
                'Electrician': 'electrician.png',
                'Energy': 'energy.png',
                'Entertainment': 'entertainment.png',
                'Events': 'event.png',
                'Fashion': 'fashion.png',
                'Fitness & Nutrition': 'fitness.png',
                'Food': 'food.png',
                'Healthcare': 'healthcare.png',
                'Hotel': 'hotel.png',
                'HVAC': 'hvac.png',
                'Insurance': 'insurance.png',
                'Interior Design': 'interior-design.png',
                'Landscaping': 'landscaping.png',
                'Law': 'law.png',
                'Logistics': 'logistic.png',
                'Manufacturing': 'manufacturing.png',
                'Moving Company': 'moving-company.png',
                'Photography': 'photography.png',
                'Plumbing': 'plumbing.png',
                'Real Estate': 'real-estate.png',
                'Recruitment': 'recruitement.png',
                'Retail': 'retail.png',
                'Roofing': 'roofing.png',
                'SaaS': 'saas.png',
                'Small Business': 'small-businesses.png',
                'Sports': 'sport.png',
                'Technology': 'technology.png',
                'Therapist': 'therapist.png',
                'Tourism': 'tourism.png',
            };

            const makeFallbackSvg = (title) => {
                const palettes = [['#184abc', '#0d2f7b'], ['#0f3b8f', '#061c55']];
                const hash = Array.from(title).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
                const [start, end] = palettes[hash % palettes.length];
                const initial = encodeURIComponent(title.charAt(0).toUpperCase());
                return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='${encodeURIComponent(start)}'/%3E%3Cstop offset='1' stop-color='${encodeURIComponent(end)}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='400' height='400' fill='url(%23g)'/%3E%3Ctext x='50%25' y='56%25' fill='%23f4f8ff' font-size='160' font-weight='700' font-family='Inter,Arial,sans-serif' text-anchor='middle' dominant-baseline='middle'%3E${initial}%3C/text%3E%3C/svg%3E`;
            };

            // Scale adjustments to normalize icon visual sizes (target ~73% fill)
            const iconScaleMap = {
                'photography.png': 1.14, 'fashion.png': 1.12, 'b2b.png': 1.11,
                'accountant.png': 1.09, 'energy.png': 1.09, 'manufacturing.png': 1.09,
                'cleaning-services.png': 1.07, 'healthcare.png': 1.07,
                'fitness.png': 0.89, 'retail.png': 0.87, 'interior-design.png': 0.86,
                'moving-company.png': 0.84, 'roofing.png': 0.81,
            };

            const createCard = (service, index, lang) => {
                const serviceName = lang === 'de' ? (service.nameDe || service.nameEn) : service.nameEn;
                const serviceDetail = lang === 'de' ? (service.detailDe || service.detailEn) : service.detailEn;
                const card = document.createElement('article');
                card.className = 'service-mini-card';

                const image = document.createElement('img');
                image.className = 'service-mini-image';
                const imgFile = industryImageMap[service.nameEn];
                image.src = imgFile ? `/assets/industries/${imgFile}` : makeFallbackSvg(serviceName);
                image.alt = `${serviceName} service`;
                image.loading = 'lazy';
                image.decoding = 'async';
                image.width = 344;
                image.height = 344;
                const iconScale = imgFile && iconScaleMap[imgFile];
                if (iconScale) image.style.setProperty('--icon-scale', iconScale);

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

        // --- SHARED LANG HELPER ---
        const getLang = () => {
            if (window.location.pathname.includes('/de/')) return 'de';
            try { const stored = localStorage.getItem('language'); if (stored === 'de') return 'de'; } catch (e) {}
            return 'en';
        };

        // --- CONTACT / APPLY / STRATEGY CALL BUTTONS (all go to /apply/) ---
        document.querySelectorAll('[data-contact-btn], [data-apply-btn], [data-strategy-call-btn], [data-build-growth-btn]').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = getLang() === 'de' ? '/de/apply/' : '/apply/';
            });
        });

        // --- LANGUAGE SWITCH ---
        document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang-switch') || getLang();
                try { localStorage.setItem('language', lang); } catch (e) {}
                const dropdown = btn.closest('.nav-dropdown');
                if (dropdown) dropdown.classList.remove('open');
                window.location.href = lang === 'de' ? '/de/index.html' : '/index.html';
            });
        });

        // --- HOME BUTTON ---
        document.querySelectorAll('[data-home-btn]').forEach((btn) => {
            btn.addEventListener('click', () => {
                window.location.href = getLang() === 'de' ? '/de/index.html' : '/index.html';
            });
        });

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
            const viewportWidth = window.innerWidth || document.documentElement.clientWidth || 0;
            const isSmallViewport = viewportWidth > 0 ? viewportWidth <= 1200 : window.matchMedia('(max-width: 1200px)').matches;
            const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
            const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints || 0) > 0;
            const isLikelyMobileUA = /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(navigator.userAgent || '');
            const hasLowMemory = typeof navigator.deviceMemory === 'number' && navigator.deviceMemory <= 4;
            const hasLowCpu = typeof navigator.hardwareConcurrency === 'number' && navigator.hardwareConcurrency <= 4;
            const shouldUseFallbackOnly = (
                window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
                Boolean(connection && connection.saveData) ||
                isSmallViewport ||
                isCoarsePointer ||
                isTouchDevice ||
                isLikelyMobileUA ||
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
            // Restore the original desktop behavior: boot the 3D hero right after initial paint.
            window.requestAnimationFrame(() => {
                window.setTimeout(bootFrame, 60);
            });

            if (heroShell) {
                heroShell.addEventListener('mouseenter', bootFrame, { once: true, passive: true });
                heroShell.addEventListener('pointerdown', bootFrame, { once: true, passive: true });
            }
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
