(() => {
  const CASE_CONTENT = {
    en: {
      pageTitle: "Case Studies | LYNCK Studio",
      pageDescription:
        "A closer look at how LYNCK Studio structures growth across search, paid social, content systems, and conversion-focused web experiences.",
      detailSuffix: "Case Study | LYNCK Studio",
      filters: [
        { id: "all", label: "All" },
        { id: "performance", label: "Performance" },
        { id: "social", label: "Social Ads" },
        { id: "web", label: "Web Systems" },
        { id: "content", label: "Content" }
      ],
      emptyStateTitle: "No case studies in this filter yet",
      emptyStateCopy: "Switch to another category to explore the other project layouts.",
      cardCta: "Open case study",
      cardFocusLabel: "Project focus",
      backLabel: "Back to case studies",
      relatedHeading: "More case studies",
      relatedCopy: "Each project is built as a full story page, so you can drop in final names, assets, and verified results later.",
      sidebarTitle: "Project Snapshot",
      sidebarNote:
        "This structure is ready for the final client name, verified metrics, campaign screenshots, and before/after assets.",
      quoteSource: "Case study template ready for final client sign-off",
      ctaTitle: "Want your growth system to look like this?",
      ctaCopy:
        "We build the strategy, creative direction, tracking logic, and conversion architecture together, so the next case study is not luck. It is structure.",
      ctaPrimary: "Start your project",
      ctaSecondary: "Explore services",
      studies: [
        {
          slug: "buechelbergerei-google-ads",
          index: "01",
          category: "performance",
          categoryLabel: "Performance",
          title: "Büchelbergerei",
          subtitle: "Chalet Vacation Homes | More bookings through cleaner Google Ads signals",
          overview:
            "How we restructured Google Ads for a chalet-vacation brand so rising tourism costs, seasonal pressure, and mixed brand signals stopped distorting performance.",
          image: "/assets/case-study-buechelbergerei-01.jpg",
          imageAlt: "Büchelbergerei chalet homes at dusk",
          chips: ["Google Ads", "Tourism", "Remarketing", "1P Data"],
          cardFocus: "Bookings + cleaner Google Ads signals",
          cardMetrics: [
            { value: "+27%", label: "Conversions" },
            { value: "€0.38", label: "Avg. CPC" },
            { value: "+25%", label: "CTR" }
          ],
          heroMetrics: [
            { value: "+27%", label: "Conversions" },
            { value: "€0.38", label: "Avg. CPC" },
            { value: "+25%", label: "CTR" }
          ],
          snapshot: [
            { label: "Client", value: "Büchelbergerei" },
            { label: "Sector", value: "Chalet vacation homes / tourism" },
            { label: "Market", value: "Germany" },
            { label: "Channel mix", value: "Google Ads, Demand Gen, Display remarketing" },
            { label: "Priority", value: "More bookings with cleaner signals" }
          ],
          gallery: [
            {
              src: "/assets/case-study-buechelbergerei-02.jpg",
              alt: "Private sauna and hot tub at a Büchelbergerei chalet"
            },
            {
              src: "/assets/case-study-buechelbergerei-03.jpg",
              alt: "Interior dining and living area of a Büchelbergerei chalet"
            },
            {
              src: "/assets/case-study-buechelbergerei-04.jpg",
              alt: "Exterior path between Büchelbergerei chalet homes at dusk"
            }
          ],
          sections: [
            {
              kicker: "The Challenge",
              title: "Rising costs, mixed signals, and creatives that were too broad.",
              body: [
                "Tourism performance gets expensive fast when seasonality and market pressure start pushing CPCs up. At the same time, brand terms were mixed into multiple campaigns, making performance look cleaner than it really was and sending budget toward weaker signals."
              ],
              bullets: [
                "Increasing spend was producing fewer conversions while CPCs kept rising under seasonal pressure and stronger competition.",
                "Brand keywords were mixed into the wider account, which distorted performance data and wasted budget.",
                "Ad creatives were too broad and did not clearly reflect what the user actually wanted to see."
              ]
            },
            {
              kicker: "The Approach",
              title: "We rebuilt the account around cleaner segmentation, sharper intent, and proven creative angles.",
              bullets: [
                "Built a dedicated Brand Search campaign targeting all of Germany so brand and non-brand traffic were finally separated cleanly.",
                "Shifted budget into the campaigns that were already proving profitable instead of spreading spend too widely.",
                "Built a full-funnel audience across all visitor touchpoints, from general browsing to deeper engagement, request pages, and booking pages.",
                "Restructured remarketing with Demand Gen for upper-funnel re-engagement and a separate Display campaign for direct retargeting.",
                "Refocused creatives around what already showed the strongest pull: pool, private sauna and hot tub, and the breakfast basket.",
                "Set a target CPA inside PMax campaigns and integrated first-party data to strengthen signals and reduce algorithm volatility."
              ]
            },
            {
              kicker: "The Results",
              title: "More conversions, lower click costs, and a steadier account through high and low season.",
              bullets: [
                "+27% conversions",
                "Avg. CPC at €0.38",
                "+25% CTR",
                "15% more stable CPC through stronger first-party data signals",
                "A full-funnel strategy from awareness to retargeting",
                "Consistent conversions across on and off season with less algorithm volatility and cleaner campaign segmentation"
              ]
            }
          ],
          deliverables: [
            "Dedicated Brand Search campaign",
            "Full-funnel audience build",
            "Demand Gen + Display remarketing split",
            "Creative refresh around top-performing chalet angles",
            "PMax target CPA optimisation",
            "1P data signal integration"
          ],
          quote:
            "Once brand traffic, remarketing, and first-party data were separated cleanly, the account stopped guessing and started scaling with much steadier signals."
        },
        {
          slug: "paid-social-launch-system",
          index: "02",
          category: "social",
          categoryLabel: "Social Ads",
          title: "Paid Social Launch System",
          subtitle: "UGC-style creative, stronger offer framing, and controlled testing",
          overview:
            "How we combine UGC-style creative with a tighter paid social structure so launches do not depend on one winning ad or one short-lived audience pocket.",
          image: "/assets/ugc-image-2.webp",
          imageAlt: "UGC-style content setup for paid social campaigns",
          chips: ["Paid Social", "UGC", "Creative Testing"],
          snapshot: [
            { label: "Channel", value: "Meta Ads" },
            { label: "Scope", value: "UGC + retargeting" },
            { label: "Priority", value: "Efficient scale" }
          ],
          sections: [
            {
              kicker: "Situation",
              title: "Creative was doing too much work by itself.",
              body: [
                "The brand needed a launch system that could introduce the offer to cold audiences, build conviction, and give the team room to iterate without resetting the whole account every time a creative angle changed.",
                "That meant pairing creative variation with a clearer campaign framework, not relying on a single ad to carry performance."
              ]
            },
            {
              kicker: "What We Built",
              title: "A launch structure that gives creative room to work.",
              bullets: [
                "Mapped the offer into colder-audience education, proof-driven middle stages, and sharper conversion pushes.",
                "Used UGC-style formats to make the product feel native to the feed instead of over-produced.",
                "Separated testing logic from scaling logic so useful learnings were easier to read.",
                "Built a retargeting layer that reinforces the strongest messages instead of repeating the same angle."
              ]
            },
            {
              kicker: "Why It Matters",
              title: "Paid social works better when message and structure move together.",
              body: [
                "The real value is not one short-term winner. It is a system that helps the team learn faster, keep creative fresh, and scale with more control.",
                "This page is ready for the final launch timeline, creative examples, and verified blended ROAS detail."
              ]
            }
          ],
          deliverables: [
            "Creative testing matrix",
            "UGC angle planning",
            "Retargeting sequence",
            "Offer-led campaign logic"
          ],
          quote:
            "The point is not just better ads. The point is a launch structure that lets better ads compound."
        },
        {
          slug: "conversion-web-rebuild",
          index: "03",
          category: "web",
          categoryLabel: "Web Systems",
          title: "Conversion Web Rebuild",
          subtitle: "A sharper site journey designed to carry paid traffic",
          overview:
            "What happens when a website stops acting like a brochure and starts behaving like the conversion layer behind paid media, offer clarity, and lead capture.",
          image: "/assets/web-systems-image-3.webp",
          imageAlt: "Conversion-focused website design interface",
          chips: ["Web Systems", "Messaging", "Conversion"],
          snapshot: [
            { label: "Channel", value: "Website" },
            { label: "Scope", value: "UX + offer structure" },
            { label: "Priority", value: "Lower friction" }
          ],
          sections: [
            {
              kicker: "Situation",
              title: "Traffic was arriving, but the site was not carrying the conversation forward.",
              body: [
                "A lot of paid traffic problems are not ad problems. They are handoff problems. The website was visually decent, but it was too broad in its messaging and too weak in how it guided next steps.",
                "We treated the rebuild as part of the acquisition system, not as a separate branding task."
              ]
            },
            {
              kicker: "What We Built",
              title: "A web layer that helps traffic convert instead of hesitate.",
              bullets: [
                "Clarified the value proposition earlier so users understood the offer faster.",
                "Reduced visual and structural friction around core actions.",
                "Reworked section order to support trust, proof, and momentum in a clearer sequence.",
                "Created a page structure that is easier to test alongside paid traffic."
              ]
            },
            {
              kicker: "Why It Matters",
              title: "The website becomes part of the growth engine.",
              body: [
                "When the site aligns with the ad message and the offer framing, conversion quality becomes easier to improve without forcing media teams to compensate for weak pages.",
                "This template is ready for final screenshots, before-and-after UX comparisons, and verified conversion-rate changes."
              ]
            }
          ],
          deliverables: [
            "Offer-first page structure",
            "Message hierarchy refinement",
            "Conversion path cleanup",
            "Testing-ready web system"
          ],
          quote:
            "Better websites do not just look more premium. They remove the friction that keeps paid traffic from becoming revenue."
        },
        {
          slug: "youtube-demand-engine",
          index: "04",
          category: "content",
          categoryLabel: "Content",
          title: "YouTube Demand Engine",
          subtitle: "Long-form visibility supported by search, hooks, and audience signals",
          overview:
            "A structured YouTube growth system designed to turn authority content into discoverability, warmer demand, and stronger retargeting inputs for the wider funnel.",
          image: "/assets/youtube-growth-image-1.webp",
          imageAlt: "YouTube growth strategy visual",
          chips: ["YouTube", "Content Strategy", "Audience Signals"],
          snapshot: [
            { label: "Channel", value: "YouTube" },
            { label: "Scope", value: "Packaging + distribution" },
            { label: "Priority", value: "Qualified attention" }
          ],
          sections: [
            {
              kicker: "Situation",
              title: "Content existed, but it was not yet behaving like a growth asset.",
              body: [
                "The brand had the expertise to create useful content, but discoverability, packaging, and audience pathways were too inconsistent to turn that effort into compounding momentum.",
                "We approached YouTube as a system: positioning, hooks, structure, publishing rhythm, and downstream audience value."
              ]
            },
            {
              kicker: "What We Built",
              title: "A more deliberate path from content to demand.",
              bullets: [
                "Tightened positioning so each video speaks to clearer audience intent.",
                "Improved title, thumbnail, and hook logic to support discoverability and watch-through.",
                "Structured publishing around repeatable themes instead of isolated uploads.",
                "Used audience signals from content performance to strengthen future paid and remarketing decisions."
              ]
            },
            {
              kicker: "Why It Matters",
              title: "Content becomes more valuable when it informs the rest of the funnel.",
              body: [
                "A stronger YouTube engine creates more than views. It creates better audience understanding, warmer remarketing pools, and a deeper trust layer around the brand.",
                "This case page is ready for final watch-time data, packaging examples, and the verified growth story."
              ]
            }
          ],
          deliverables: [
            "Channel positioning",
            "Packaging system",
            "Publishing rhythm",
            "Audience signal feedback loop"
          ],
          quote:
            "The goal is not just content output. The goal is a content system that keeps teaching the business where demand is coming from."
        }
      ]
    },
    de: {
      pageTitle: "Fallstudien | LYNCK Studio",
      pageDescription:
        "Ein genauer Blick darauf, wie LYNCK Studio Wachstum über Google Ads, Social Ads, Content-Systeme und conversion-starke Websysteme aufbaut.",
      detailSuffix: "Fallstudie | LYNCK Studio",
      filters: [
        { id: "all", label: "Alle" },
        { id: "performance", label: "Performance" },
        { id: "social", label: "Social Ads" },
        { id: "web", label: "Websysteme" },
        { id: "content", label: "Content" }
      ],
      emptyStateTitle: "In diesem Filter ist noch keine Fallstudie hinterlegt",
      emptyStateCopy: "Wechsle zu einer anderen Kategorie, um die anderen Projektlayouts zu sehen.",
      cardCta: "Fallstudie ansehen",
      cardFocusLabel: "Projektfokus",
      backLabel: "Zurück zu den Fallstudien",
      relatedHeading: "Weitere Fallstudien",
      relatedCopy: "Jedes Projekt ist als vollständige Story-Seite aufgebaut, damit später echte Namen, Assets und verifizierte Ergebnisse sauber ergänzt werden können.",
      sidebarTitle: "Projektüberblick",
      sidebarNote:
        "Diese Struktur ist bereit für den finalen Kundennamen, verifizierte Kennzahlen, Kampagnen-Screenshots und Vorher-Nachher-Assets.",
      quoteSource: "Fallstudien-Template bereit für die finale Freigabe",
      ctaTitle: "Soll dein Wachstumssystem so aussehen?",
      ctaCopy:
        "Wir bauen Strategie, Creative-Richtung, Tracking-Logik und Conversion-Architektur gemeinsam auf, damit die nächste Fallstudie kein Zufall ist, sondern Struktur hat.",
      ctaPrimary: "Projekt starten",
      ctaSecondary: "Leistungen ansehen",
      studies: [
        {
          slug: "buechelbergerei-google-ads",
          index: "01",
          category: "performance",
          categoryLabel: "Performance",
          title: "Büchelbergerei",
          subtitle: "Chalet Vacation Homes | Mehr Buchungen durch sauberere Google-Ads-Signale",
          overview:
            "Wie wir Google Ads für einen Chalet-Anbieter neu aufgesetzt haben, damit steigende Klickpreise, saisonale Schwankungen und vermischte Brand-Signale die Performance nicht länger verzerren.",
          image: "/assets/case-study-buechelbergerei-01.jpg",
          imageAlt: "Chalet-Anlage der Büchelbergerei in der Abendstimmung",
          chips: ["Google Ads", "Tourismus", "Remarketing", "1P Data"],
          cardFocus: "Mehr Buchungen + sauberere Google-Ads-Signale",
          cardMetrics: [
            { value: "+27%", label: "Conversions" },
            { value: "0,38 €", label: "CPC Ø" },
            { value: "+25%", label: "CTR" }
          ],
          heroMetrics: [
            { value: "+27%", label: "Conversions" },
            { value: "0,38 €", label: "CPC Ø" },
            { value: "+25%", label: "CTR" }
          ],
          snapshot: [
            { label: "Kunde", value: "Büchelbergerei" },
            { label: "Branche", value: "Chalet Vacation Homes / Tourismus" },
            { label: "Markt", value: "Deutschland" },
            { label: "Kanalmix", value: "Google Ads, Demand Gen, Display-Retargeting" },
            { label: "Priorität", value: "Mehr Buchungen bei saubereren Signalen" }
          ],
          gallery: [
            {
              src: "/assets/case-study-buechelbergerei-02.jpg",
              alt: "Private Sauna und Hot Tub in einem Chalet der Büchelbergerei"
            },
            {
              src: "/assets/case-study-buechelbergerei-03.jpg",
              alt: "Wohn- und Essbereich in einem Chalet der Büchelbergerei"
            },
            {
              src: "/assets/case-study-buechelbergerei-04.jpg",
              alt: "Weg zwischen den Chalet-Häusern der Büchelbergerei in der Abendstimmung"
            }
          ],
          sections: [
            {
              kicker: "Die Herausforderung",
              title: "Steigende Kosten, vermischte Signale und Creatives ohne klaren Fokus.",
              body: [
                "Im Tourismus ziehen Kosten schnell an, sobald Saison und Wettbewerb stärker werden. Gleichzeitig liefen Brand-Begriffe quer durch mehrere Kampagnen, wodurch die Daten zu gut aussahen und Budget in die falschen Signale floss."
              ],
              bullets: [
                "Mehr Spend brachte weniger Conversions, während die CPCs durch Saisonalität und Wettbewerb stiegen.",
                "Brand-Keywords waren in mehreren Kampagnen vermischt, was die Performance-Daten verzerrte und Budget verschwendete.",
                "Die Creatives waren zu breit und zeigten keine klare Botschaft zu dem, was Nutzer wirklich sehen wollten."
              ]
            },
            {
              kicker: "Der Ansatz",
              title: "Wir haben Struktur, Zielgruppen und Creatives konsequent auf Buchungsabsicht ausgerichtet.",
              bullets: [
                "Eine eigene Brand-Search-Kampagne für ganz Deutschland trennte Brand- und Non-Brand-Traffic endlich sauber voneinander.",
                "Budget wurde nur noch in profitablere Kampagnen verschoben statt breit verteilt.",
                "Es wurde eine Full-Funnel-Audience über alle Touchpoints hinweg aufgebaut: vom ersten Seitenbesuch bis zu Anfrage- und Buchungsseiten.",
                "Das Remarketing wurde neu strukturiert: Demand Gen für den Upper Funnel, eine separate Display-Kampagne für direktes Retargeting.",
                "Die Creatives wurden auf die klaren Gewinner fokussiert: Pool, private Sauna & Hot Tub sowie Frühstückskorb. Schwächere Varianten wurden ersetzt.",
                "In den PMax-Kampagnen wurde ein Target CPA gesetzt. Zusätzlich wurde 1P Data integriert, um die Signale zu stärken und Algorithmus-Schwankungen zu reduzieren."
              ]
            },
            {
              kicker: "Das Ergebnis",
              title: "Mehr Conversions, günstigere Klicks und ein deutlich stabileres Setup über Haupt- und Nebensaison.",
              bullets: [
                "+27% Conversions",
                "CPC Ø 0,38 €",
                "+25% CTR",
                "15% stabilerer CPC durch stärkere 1P-Data-Signale",
                "Full-Funnel-Strategie von Awareness bis Retargeting",
                "Konstantere Conversions in Haupt- und Nebensaison bei weniger Algorithmus-Schwankungen und saubererer Kampagnentrennung"
              ]
            }
          ],
          deliverables: [
            "Eigene Brand-Search-Kampagne",
            "Full-Funnel-Audience-Aufbau",
            "Getrennte Demand-Gen- und Display-Retargeting-Logik",
            "Creative-Refresh auf Basis der stärksten Chalet-Angles",
            "PMax-Optimierung mit Target CPA",
            "Integration von 1P Data"
          ],
          quote:
            "Sobald Brand-Traffic, Remarketing und 1P Data sauber getrennt waren, wurde das Konto deutlich ruhiger, klarer und verlässlicher skalierbar."
        },
        {
          slug: "paid-social-launch-system",
          index: "02",
          category: "social",
          categoryLabel: "Social Ads",
          title: "Paid Social Launch System",
          subtitle: "UGC-nahe Creatives, klareres Angebots-Framing und kontrolliertes Testing",
          overview:
            "So kombinieren wir UGC-nahe Creatives mit einer saubereren Paid-Social-Struktur, damit ein Launch nicht an einer einzigen Anzeige oder einer kurzen Zielgruppenphase hängen bleibt.",
          image: "/assets/ugc-image-2.webp",
          imageAlt: "UGC-Setup für Social-Ads-Kampagnen",
          chips: ["Social Ads", "UGC", "Creative-Tests"],
          snapshot: [
            { label: "Kanal", value: "Meta Ads" },
            { label: "Umfang", value: "UGC + Retargeting" },
            { label: "Priorität", value: "Effizientes Skalieren" }
          ],
          sections: [
            {
              kicker: "Ausgangslage",
              title: "Das Creative musste zu viel alleine tragen.",
              body: [
                "Die Marke brauchte ein Launch-System, das kalte Zielgruppen sauber an das Angebot heranführt, Vertrauen aufbaut und dem Team Spielraum für Iterationen gibt, ohne das ganze Konto jedes Mal neu aufzusetzen.",
                "Dafür reicht kein einzelnes starkes Ad. Es braucht eine Struktur, in der Creative-Varianten sinnvoll arbeiten können."
              ]
            },
            {
              kicker: "Was wir aufgebaut haben",
              title: "Eine Launch-Struktur, die Creatives wirklich arbeiten lässt.",
              bullets: [
                "Das Angebot wurde in klare Phasen für kalte Zielgruppen, Vertrauensaufbau und Conversion unterteilt.",
                "UGC-nahe Formate sorgen dafür, dass das Produkt im Feed glaubwürdiger und nativer wirkt.",
                "Testing-Logik und Skalierungs-Logik wurden getrennt, damit Learnings besser lesbar bleiben.",
                "Retargeting stärkt die besten Botschaften, statt einfach dieselbe Anzeige erneut auszuliefern."
              ]
            },
            {
              kicker: "Warum das wichtig ist",
              title: "Paid Social wird stärker, wenn Botschaft und Struktur zusammenarbeiten.",
              body: [
                "Der eigentliche Wert liegt nicht in einem kurzfristigen Gewinner, sondern in einem System, das schneller lernt, Creatives frischer hält und kontrollierter skaliert.",
                "Diese Seite ist bereit für die finale Launch-Chronologie, echte Creative-Beispiele und verifizierte kombinierte ROAS-Daten."
              ]
            }
          ],
          deliverables: [
            "Creative-Testmatrix",
            "UGC-Ansatzplanung",
            "Retargeting-Sequenz",
            "Angebotsorientierte Kampagnenlogik"
          ],
          quote:
            "Es geht nicht nur um bessere Anzeigen. Es geht um eine Launch-Struktur, in der bessere Anzeigen weiter tragen."
        },
        {
          slug: "conversion-web-rebuild",
          index: "03",
          category: "web",
          categoryLabel: "Websysteme",
          title: "Conversion Web Rebuild",
          subtitle: "Ein klarerer Website-Aufbau, der bezahlten Traffic besser aufnimmt",
          overview:
            "Was passiert, wenn eine Website nicht mehr nur wie eine Broschüre funktioniert, sondern wie die Conversion-Ebene hinter Paid Media, Angebotsklarheit und Lead-Erfassung.",
          image: "/assets/web-systems-image-3.webp",
          imageAlt: "Interface einer conversion-starken Website",
          chips: ["Websysteme", "Messaging", "Conversion"],
          snapshot: [
            { label: "Kanal", value: "Website" },
            { label: "Umfang", value: "UX + Angebotsstruktur" },
            { label: "Priorität", value: "Weniger Reibung" }
          ],
          sections: [
            {
              kicker: "Ausgangslage",
              title: "Traffic kam an, aber die Website hat das Gespräch nicht weitergeführt.",
              body: [
                "Viele Probleme im Paid Traffic sind keine Anzeigenprobleme, sondern Übergabeprobleme. Die Website sah ordentlich aus, war in der Botschaft aber zu breit und in der Führung zum nächsten Schritt zu schwach.",
                "Darum wurde der Relaunch als Teil des Akquise-Systems betrachtet und nicht als getrennte Branding-Übung."
              ]
            },
            {
              kicker: "Was wir aufgebaut haben",
              title: "Eine Web-Ebene, die den Traffic nicht ausbremst.",
              bullets: [
                "Das Leistungsversprechen wurde früher und klarer sichtbar gemacht.",
                "Visuelle und strukturelle Reibung rund um die wichtigsten Aktionen wurde reduziert.",
                "Die Seitenreihenfolge wurde so überarbeitet, dass Vertrauen, Belege und Momentum besser ineinandergreifen.",
                "Die neue Struktur lässt sich sauberer zusammen mit Paid Traffic weiter testen."
              ]
            },
            {
              kicker: "Warum das wichtig ist",
              title: "Die Website wird Teil des Wachstumssystems.",
              body: [
                "Wenn Website, Anzeigenbotschaft und Angebots-Framing sauber zusammenpassen, lässt sich Conversion-Qualität verbessern, ohne dass Media-Teams ständig eine schwache Seite ausgleichen müssen.",
                "Dieses Template ist bereit für finale Screenshots, Vorher-Nachher-Vergleiche und verifizierte Conversion-Rate-Entwicklungen."
              ]
            }
          ],
          deliverables: [
            "Angebotsorientierte Seitenstruktur",
            "Sauberere Message-Hierarchie",
            "Bereinigter Conversion-Pfad",
            "Testfähiges Websystem"
          ],
          quote:
            "Bessere Websites wirken nicht nur hochwertiger. Sie nehmen die Reibung raus, die bezahlten Traffic von Umsatz trennt."
        },
        {
          slug: "youtube-demand-engine",
          index: "04",
          category: "content",
          categoryLabel: "Content",
          title: "YouTube Demand Engine",
          subtitle: "Longform-Sichtbarkeit mit Suchlogik, Hooks und stärkeren Zielgruppen-Signalen",
          overview:
            "Ein strukturiertes YouTube-Wachstumssystem, das Expertise in Sichtbarkeit, wärmere Nachfrage und bessere Retargeting-Signale für den restlichen Funnel übersetzt.",
          image: "/assets/youtube-growth-image-1.webp",
          imageAlt: "Visual für YouTube-Wachstumsstrategie",
          chips: ["YouTube", "Content-Strategie", "Zielgruppen-Signale"],
          snapshot: [
            { label: "Kanal", value: "YouTube" },
            { label: "Umfang", value: "Titel, Thumbnails + Distribution" },
            { label: "Priorität", value: "Qualifizierte Aufmerksamkeit" }
          ],
          sections: [
            {
              kicker: "Ausgangslage",
              title: "Content war da, aber noch kein echter Wachstumshebel.",
              body: [
                "Die Marke hatte das Know-how für relevante Inhalte, aber Sichtbarkeit, Video-Verpackung und Zielgruppenpfade waren zu inkonsistent, um daraus nachhaltige Dynamik entstehen zu lassen.",
                "Deshalb haben wir YouTube als System behandelt: Positionierung, Hooks, Struktur, Publishing-Rhythmus und nachgelagerter Wert für den restlichen Funnel."
              ]
            },
            {
              kicker: "Was wir aufgebaut haben",
              title: "Ein klarerer Weg von Content zu Nachfrage.",
              bullets: [
                "Die Positionierung jeder Video-Säule wurde enger an konkrete Zielgruppenabsicht angepasst.",
                "Titel, Thumbnail-Logik und Hooks wurden für bessere Auffindbarkeit und Watchtime geschärft.",
                "Die Veröffentlichung wurde entlang wiederholbarer Themen statt isolierter Uploads strukturiert.",
                "Zielgruppen-Signale aus dem Content fließen gezielter in spätere Paid- und Remarketing-Entscheidungen ein."
              ]
            },
            {
              kicker: "Warum das wichtig ist",
              title: "Content wird wertvoller, wenn er den restlichen Funnel mitsteuert.",
              body: [
                "Ein stärkeres YouTube-System erzeugt nicht nur Views. Es schafft besseres Zielgruppenverständnis, wärmere Remarketing-Pools und eine tiefere Vertrauensebene für die Marke.",
                "Diese Fallstudie ist bereit für finale Watchtime-Daten, Titel-Thumbnail-Beispiele und die verifizierte Wachstumsgeschichte."
              ]
            }
          ],
          deliverables: [
            "Kanal-Positionierung",
            "Titel-Thumbnail-System",
            "Publishing-Rhythmus",
            "Feedback-Loop für Zielgruppen-Signale"
          ],
          quote:
            "Es geht nicht nur um mehr Content. Es geht um ein Content-System, das dem Unternehmen ständig zeigt, wo Nachfrage entsteht."
        }
      ]
    }
  };

  const getLang = () => (window.location.pathname.includes("/de/") ? "de" : "en");

  const getHubUrl = (lang) => (lang === "de" ? "/de/case-studies/" : "/case-studies/");

  const getCaseUrl = (lang, slug) =>
    `${lang === "de" ? "/de" : ""}/case-studies/case.html?study=${encodeURIComponent(slug)}`;

  const getStudyBySlug = (content, slug) =>
    content.studies.find((study) => study.slug === slug) || content.studies[0];

  const createArrowIcon = () =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>';

  const createBackIcon = () =>
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/><path d="M9 12h10"/></svg>';

  const renderMetrics = (metrics, className = "case-card-metrics") => {
    if (!Array.isArray(metrics) || !metrics.length) return "";
    return `
      <div class="${className}">
        ${metrics
          .map(
            (metric) => `
              <div class="${className}__item">
                <strong>${metric.value}</strong>
                <span>${metric.label}</span>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  };

  const renderCard = (lang, content, study) => {
    const chips = study.chips.map((chip) => `<span class="case-chip">${chip}</span>`).join("");
    return `
      <a class="case-card" href="${getCaseUrl(lang, study.slug)}" data-category="${study.category}">
        <div class="case-card-media">
          <img loading="lazy" decoding="async" src="${study.image}" alt="${study.imageAlt}">
        </div>
        <div class="case-card-body">
          <div class="case-card-meta">
            <span class="case-card-category">${study.categoryLabel}</span>
          </div>
          <div>
            <h2 class="case-card-title">${study.title}</h2>
            <p class="case-card-subtitle">${study.subtitle}</p>
          </div>
          <p class="case-card-copy">${study.overview}</p>
          ${renderMetrics(study.cardMetrics)}
          <div class="case-chip-row">${chips}</div>
          <div class="case-card-footer">
            <div>
              <strong>${content.cardFocusLabel}</strong>
              <p>${study.cardFocus || study.snapshot[study.snapshot.length - 1].value}</p>
            </div>
            <span class="case-card-link">${content.cardCta} ${createArrowIcon()}</span>
          </div>
        </div>
      </a>
    `;
  };

  const renderHub = (lang, content) => {
    const filtersRoot = document.querySelector("[data-case-filters]");
    const gridRoot = document.querySelector("[data-case-grid]");
    if (!filtersRoot || !gridRoot) return;

    let activeFilter = "all";

    const updateGrid = () => {
      const studies =
        activeFilter === "all"
          ? content.studies
          : content.studies.filter((study) => study.category === activeFilter);

      if (!studies.length) {
        gridRoot.innerHTML = `
          <div class="case-empty">
            <strong>${content.emptyStateTitle}</strong>
            <p>${content.emptyStateCopy}</p>
          </div>
        `;
        return;
      }

      gridRoot.innerHTML = studies.map((study) => renderCard(lang, content, study)).join("");
    };

    filtersRoot.innerHTML = content.filters
      .map(
        (filter) => `
          <button type="button" class="case-filter${filter.id === activeFilter ? " is-active" : ""}" data-filter-button="${filter.id}" aria-pressed="${filter.id === activeFilter}">
            ${filter.label}
          </button>
        `
      )
      .join("");

    filtersRoot.querySelectorAll("[data-filter-button]").forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.getAttribute("data-filter-button") || "all";
        filtersRoot.querySelectorAll("[data-filter-button]").forEach((node) => {
          const selected = node === button;
          node.classList.toggle("is-active", selected);
          node.setAttribute("aria-pressed", String(selected));
        });
        updateGrid();
      });
    });

    updateGrid();
  };

  const renderDetail = (lang, content) => {
    const detailRoot = document.querySelector("[data-case-detail]");
    const relatedRoot = document.querySelector("[data-related-grid]");
    const relatedCopy = document.querySelector("[data-related-copy]");
    if (!detailRoot) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("study") || content.studies[0].slug;
    const study = getStudyBySlug(content, slug);

    document.title = `${study.title} | ${content.detailSuffix}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", study.overview);

    const stats = study.snapshot
      .map(
        (item) => `
          <div class="case-stat">
            <span class="case-stat-label">${item.label}</span>
            <span class="case-stat-value">${item.value}</span>
          </div>
        `
      )
      .join("");

    const sections = study.sections
      .map((section) => {
        const body = Array.isArray(section.body)
          ? section.body.map((paragraph) => `<p>${paragraph}</p>`).join("")
          : "";
        const bullets = Array.isArray(section.bullets)
          ? `<ul class="case-bullet-list">${section.bullets.map((item) => `<li>${item}</li>`).join("")}</ul>`
          : "";

        return `
          <section class="case-section-card">
            <span class="case-section-kicker">${section.kicker}</span>
            <h2 class="case-section-title">${section.title}</h2>
            <div class="case-section-body">
              ${body}
              ${bullets}
            </div>
          </section>
        `;
      })
      .join("");

    const snapshotList = study.snapshot
      .map(
        (item) => `
          <li>
            <strong>${item.label}</strong>
            <span>${item.value}</span>
          </li>
        `
      )
      .join("");

    const deliverables = study.deliverables
      .map((item) => `<li>${item}</li>`)
      .join("");

    const heroMetrics = renderMetrics(study.heroMetrics, "case-hero-metrics");
    const gallery = Array.isArray(study.gallery) && study.gallery.length
      ? `
        <section class="case-gallery">
          ${study.gallery
            .map(
              (image) => `
                <figure class="case-gallery-item">
                  <img loading="lazy" decoding="async" src="${image.src}" alt="${image.alt}">
                </figure>
              `
            )
            .join("")}
        </section>
      `
      : "";

    detailRoot.innerHTML = `
      <a class="case-back-link" href="${getHubUrl(lang)}">${createBackIcon()} ${content.backLabel}</a>
      <div class="case-detail-hero">
        <div class="case-detail-panel">
          <span class="case-section-kicker">${study.categoryLabel}</span>
          <div>
            <h1 class="case-detail-title">${study.title}</h1>
            <p class="case-detail-subtitle">${study.subtitle}</p>
          </div>
          <p class="case-detail-summary">${study.overview}</p>
          ${heroMetrics}
          <div class="case-stats">${stats}</div>
        </div>
        <div class="case-detail-media">
          <img loading="eager" decoding="async" src="${study.image}" alt="${study.imageAlt}">
        </div>
      </div>
      ${gallery}
      <div class="case-story-grid">
        <div class="case-story-stack">
          ${sections}
          <section class="case-section-card">
            <span class="case-section-kicker">${lang === "de" ? "Leistungsumfang" : "Deliverables"}</span>
            <h2 class="case-section-title">${lang === "de" ? "Was in dieser Struktur enthalten ist" : "What is built into this structure"}</h2>
            <div class="case-section-body">
              <ul class="case-bullet-list">${deliverables}</ul>
            </div>
          </section>
          <div class="case-quote">
            <p>${study.quote}</p>
            <strong>${content.quoteSource}</strong>
          </div>
        </div>
        <aside class="case-side-panel">
          <h2 class="case-side-title">${content.sidebarTitle}</h2>
          <ul class="case-side-list">${snapshotList}</ul>
          <div class="case-side-note">
            <p>${content.sidebarNote}</p>
          </div>
        </aside>
      </div>
    `;

    if (relatedCopy) relatedCopy.textContent = content.relatedCopy;
    if (relatedRoot) {
      const relatedStudies = content.studies.filter((item) => item.slug !== study.slug).slice(0, 3);
      relatedRoot.innerHTML = relatedStudies
        .map(
          (item) => `
            <a class="case-mini-card" href="${getCaseUrl(lang, item.slug)}">
              <div class="case-card-media">
                <img loading="lazy" decoding="async" src="${item.image}" alt="${item.imageAlt}">
              </div>
              <div class="case-card-body">
                <span class="case-card-category">${item.categoryLabel}</span>
                <h3 class="case-card-title">${item.title}</h3>
                <p class="case-card-copy">${item.overview}</p>
                <span class="case-card-link">${content.cardCta} ${createArrowIcon()}</span>
              </div>
            </a>
          `
        )
        .join("");
    }
  };

  const bindSharedNavigation = (lang, content) => {
    const dropdowns = Array.from(document.querySelectorAll(".nav-dropdown"));
    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector(".nav-pill");
      if (!button) return;
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        dropdowns.forEach((node) => {
          if (node !== dropdown) node.classList.remove("open");
        });
        dropdown.classList.toggle("open");
      });
    });

    document.addEventListener("click", () => {
      dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        dropdowns.forEach((dropdown) => dropdown.classList.remove("open"));
      }
    });

    document.querySelectorAll("[data-home-btn]").forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = lang === "de" ? "/de/index.html" : "/index.html";
      });
    });

    document.querySelectorAll("[data-apply-btn], [data-contact-btn]").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = lang === "de" ? "/de/apply/" : "/apply/";
      });
    });

    document.querySelectorAll("[data-lang-switch]").forEach((button) => {
      button.addEventListener("click", () => {
        const targetLang = button.getAttribute("data-lang-switch");
        if (!targetLang) return;
        try {
          localStorage.setItem("language", targetLang);
        } catch (error) {}
        const dropdown = button.closest(".nav-dropdown");
        if (dropdown) dropdown.classList.remove("open");

        const isDetailPage = window.location.pathname.endsWith("/case.html");
        if (!isDetailPage) {
          window.location.href = getHubUrl(targetLang);
          return;
        }

        const params = new URLSearchParams(window.location.search);
        const slug = params.get("study") || content.studies[0].slug;
        window.location.href = getCaseUrl(targetLang, slug);
      });
    });
  };

  const applyMeta = (content) => {
    document.title = content.pageTitle;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", content.pageDescription);
  };

  const lang = getLang();
  const content = CASE_CONTENT[lang];

  applyMeta(content);
  bindSharedNavigation(lang, content);
  renderHub(lang, content);
  renderDetail(lang, content);

  const ctaTitle = document.querySelector("[data-case-cta-title]");
  const ctaCopy = document.querySelector("[data-case-cta-copy]");
  const ctaPrimary = document.querySelector("[data-case-cta-primary]");
  const ctaSecondary = document.querySelector("[data-case-cta-secondary]");
  const relatedHeading = document.querySelector("[data-related-heading]");

  if (ctaTitle) ctaTitle.textContent = content.ctaTitle;
  if (ctaCopy) ctaCopy.textContent = content.ctaCopy;
  if (ctaPrimary) ctaPrimary.textContent = content.ctaPrimary;
  if (ctaSecondary) ctaSecondary.textContent = content.ctaSecondary;
  if (relatedHeading) relatedHeading.textContent = content.relatedHeading;
})();
