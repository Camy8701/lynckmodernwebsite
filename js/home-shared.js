        gsap.registerPlugin(ScrollTrigger);

        ;

        const spotlightCards = document.querySelectorAll('.spotlight-card');
        if (spotlightCards.length) {
            window.addEventListener('mousemove', (e) => {
                spotlightCards.forEach((card) => {
                    const rect = card.getBoundingClientRect();
                    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
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

        // --- 3. PIPELINE ---
        const races = document.querySelector(".pin-wrap");
        const getScrollAmount = () => -(races.scrollWidth - window.innerWidth);
        const tween = gsap.to(races, { x: getScrollAmount, ease: "none" });
        ScrollTrigger.create({ trigger: ".pipeline-section", start: "top top", end: () => `+=${races.scrollWidth - window.innerWidth}`, pin: true, animation: tween, scrub: 1, invalidateOnRefresh: true });
        
        // Revised Parallax to utilize scale buffer
        gsap.utils.toArray('.horiz-img').forEach(img => { 
            gsap.fromTo(img, 
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

        // Continue the scrubbed transition across the full unified mesh+pulse block
        const unifiedSection = document.querySelector('.mesh-pulse-unified');
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

        // --- 4. NEURAL GRID ---
        const grid = document.getElementById('neuralGrid');
        const cols = Math.ceil(window.innerWidth / 30);
        const rows = Math.ceil((window.innerHeight * 1.5) / 30);
        const totalDots = cols * rows;

        for(let i=0; i<totalDots; i++) { 
            const dot = document.createElement('div'); 
            dot.classList.add('neural-dot'); 
            grid.appendChild(dot); 
        }

        const neuralSection = document.querySelector('.neural-section');
        const isUnifiedNeural = !!neuralSection?.closest('.mesh-pulse-unified');
        const neuralBaseColor = isUnifiedNeural ? 'rgba(255,255,255,0.22)' : 'rgba(12,23,48,0.2)';
        const neuralActiveColor = isUnifiedNeural ? 'rgba(255,255,255,0.62)' : 'rgba(12,23,48,0.5)';
        neuralSection.addEventListener('mousemove', (e) => {
            const dots = document.querySelectorAll('.neural-dot'); 
            const rect = grid.getBoundingClientRect(); 
            const mx = e.clientX - rect.left; 
            const my = e.clientY - rect.top;
            
            const radius = 350;

            dots.forEach(dot => {
                const dotRect = dot.getBoundingClientRect();
                const dx = (dotRect.left - rect.left) - mx; 
                const dy = (dotRect.top - rect.top) - my;
                const dist = Math.sqrt(dx*dx + dy*dy);
                
                if(dist < radius) {
                    const force = (radius - dist) / radius; 
                    const angle = Math.atan2(dy, dx);
                    const moveX = Math.cos(angle) * force * 50;
                    const moveY = Math.sin(angle) * force * 50;
                    dot.style.transform = `translate(${moveX}px, ${moveY}px)`;
                    dot.style.background = neuralActiveColor;
                } else {
                    dot.style.transform = `translate(0,0)`;
                    dot.style.background = neuralBaseColor;
                }
            });
        });

        // --- 5. SYSTEM PULSE ---
        const chartArea = document.getElementById('liveChart');
        for(let i=0; i<30; i++) {
            const bar = document.createElement('div');
            bar.classList.add('chart-bar');
            bar.style.animationDelay = `${Math.random() * 2}s`;
            chartArea.appendChild(bar);
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
                try {
                    const stored = localStorage.getItem('language');
                    if (stored === 'de') return 'de';
                } catch (e) {}
                return window.location.pathname.includes('/de/') ? 'de' : 'en';
            };
            buttons.forEach((btn) => {
                btn.addEventListener('click', () => {
                    const lang = getLang();
                    const target = lang === 'de' ? '/de/contact.html' : '/contact.html';
                    window.location.href = target;
                });
            });
        })();

        // --- LANGUAGE SWITCH ---
        (() => {
            const langButtons = document.querySelectorAll('[data-lang-switch]');
            if (!langButtons.length) return;
            const getLang = () => {
                try {
                    const stored = localStorage.getItem('language');
                    if (stored === 'de') return 'de';
                } catch (e) {}
                return window.location.pathname.includes('/de/') ? 'de' : 'en';
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
                try {
                    const stored = localStorage.getItem('language');
                    if (stored === 'de') return 'de';
                } catch (e) {}
                return window.location.pathname.includes('/de/') ? 'de' : 'en';
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
            frame.addEventListener('load', () => {
                fallback.classList.add('is-hidden');
                window.setTimeout(() => {
                    fallback.remove();
                }, 700);
            });
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

            const randomCycle = window.setInterval(() => {
                const line = lines[Math.floor(Math.random() * lines.length)];
                const targetText = line.getAttribute('data-text') || line.textContent || '';
                scrambleTo(line, targetText, 520);
            }, 2800);

            const wrapper = document.querySelector('[data-hero-scramble]');
            if (wrapper) {
                wrapper.addEventListener('mouseenter', runSequence);
                wrapper.addEventListener('focusin', runSequence);
                wrapper.addEventListener('touchstart', runSequence, { passive: true });
            }

            window.addEventListener('beforeunload', () => {
                window.clearInterval(randomCycle);
            });
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

            const runAll = () => {
                titles.forEach((title, index) => {
                    const targetText = title.getAttribute('data-text') || title.textContent || '';
                    window.setTimeout(() => scrambleTo(title, targetText, 580), index * 110);
                });
            };

            runAll();
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const title = entry.target;
                    const targetText = title.getAttribute('data-text') || title.textContent || '';
                    scrambleTo(title, targetText, 520);
                });
            }, { threshold: 0.65 });

            titles.forEach((title) => observer.observe(title));
            window.addEventListener('beforeunload', () => observer.disconnect());
        })();

