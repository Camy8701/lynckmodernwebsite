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
      expandImageLabel: "Expand image",
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
          slug: "djtechnik-youtube-growth",
          index: "02",
          category: "performance",
          categoryLabel: "Performance",
          title: "DJ-TECHNIK.DE",
          subtitle: "Music equipment e-commerce brand | Growing a YouTube audience and customer pipeline through Google Ads",
          overview:
            "How we helped a DJ equipment brand accelerate YouTube growth and build a larger audience of potential buyers through a structured Google Ads subscriber campaign.",
          image: "/assets/case-study-djtechnik-cover.webp",
          imageAlt: "DJ-TECHNIK.DE showroom with illuminated DJ equipment displays",
          chips: ["YouTube", "Google Ads", "Subscriber Growth", "E-Commerce"],
          cardFocus: "Audience growth + future buyer pipeline",
          cardMetrics: [
            { value: "+7.8k", label: "Subscribers" },
            { value: "90 Days", label: "Timeframe" },
            { value: "€0.22", label: "Cost / Subscriber" }
          ],
          heroMetrics: [
            { value: "+7.8k", label: "Subscribers" },
            { value: "90 Days", label: "Timeframe" },
            { value: "€0.22", label: "Cost / Subscriber" }
          ],
          snapshot: [
            { label: "Client", value: "DJ-TECHNIK.DE" },
            { label: "Sector", value: "Music equipment e-commerce" },
            { label: "Market", value: "Germany" },
            { label: "Channel mix", value: "YouTube subscriber campaigns via Google Ads" },
            { label: "Priority", value: "Grow the audience and future customer pipeline" }
          ],
          stackedMedia: {
            src: "/assets/case-study-djtechnik-youtube-04.jpg",
            alt: "Google Ads campaign performance view showing subscriber growth and cost efficiency",
            mode: "contain"
          },
          gallery: [
            {
              src: "/assets/case-study-djtechnik-youtube-03.png",
              mode: "contain",
              alt: "YouTube analytics showing subscriber growth over the last 90 days"
            },
            {
              src: "/assets/case-study-djtechnik-youtube-02.png",
              mode: "contain",
              alt: "YouTube analytics showing subscriber growth over the last 28 days"
            },
            {
              src: "/assets/case-study-djtechnik-youtube-01.png",
              mode: "contain",
              alt: "YouTube analytics showing channel growth since the account was created"
            }
          ],
          sections: [
            {
              kicker: "The Challenge",
              title: "A niche e-commerce brand with strong products but limited audience reach.",
              body: [
                "The DJ equipment brand already had strong product demonstrations and educational videos on YouTube, but organic growth on its own was too slow to unlock the channel’s full sales potential.",
                "Despite good content, the channel was still not reaching enough DJs, music producers, and equipment buyers in the market."
              ],
              bullets: [
                "Limited reach: the channel was sitting at roughly 1,000 subscribers, which restricted organic discovery.",
                "Slow organic growth: valuable videos were being published, but they were not reaching enough relevant viewers.",
                "Missed sales potential: every engaged viewer was also a potential buyer of DJ equipment.",
                "No structured audience acquisition: YouTube had not yet been turned into a scalable customer acquisition channel."
              ]
            },
            {
              kicker: "The Approach",
              title: "We built a YouTube subscriber growth campaign through Google Ads.",
              body: [
                "Instead of relying purely on organic discovery, we used Google Ads to accelerate channel growth and build a much larger audience of relevant future buyers."
              ],
              bullets: [
                "Launched YouTube subscriber campaigns built specifically to grow the channel by promoting relevant videos to audiences interested in DJ equipment, music production, DJ tutorials, and electronic music performance.",
                "Targeted users based on DJ and music production interests, relevant YouTube content viewers, music equipment search intent, and related channel audiences.",
                "Promoted the channel’s existing best-performing videos instead of creating ad-only content, so strong videos could keep attracting subscribers organically afterwards.",
                "Scaled budget gradually once the campaigns began producing subscribers at a very low acquisition cost.",
                "Built the whole system around long-term channel growth rather than just short-term traffic."
              ]
            },
            {
              kicker: "The Results",
              title: "Rapid subscriber growth at a very low acquisition cost.",
              body: [
                "Over roughly 90 days, the campaign helped grow the channel from around 1,000 subscribers on December 20 to about 8,800 subscribers by March 10.",
                "That means roughly 7,800 net new subscribers with about €1,700 in ad spend, bringing the average cost per subscriber to around €0.22."
              ],
              bullets: [
                "Roughly 7,800 net new subscribers during the 90-day campaign window",
                "About €1,700 total ad spend",
                "Around €0.22 average cost per subscriber",
                "Channel growth from around 1,000 subscribers to approximately 8,800",
                "A subscriber base that is now large enough to keep compounding through content and product demand",
                "A larger long-term audience of DJs, music producers, and equipment buyers"
              ]
            }
          ],
          deliverables: [
            "YouTube subscriber acquisition campaign via Google Ads",
            "Audience targeting for DJs and music production communities",
            "Video promotion strategy for existing content",
            "Budget scaling framework based on cost-per-subscriber performance",
            "Channel growth used as a long-term lead and customer pipeline"
          ],
          quote:
            "Instead of waiting for slow organic growth, the brand used Google Ads to accelerate audience acquisition and grow the channel from roughly 1,000 to about 8,800 subscribers in around 90 days."
        },
        {
          slug: "dms-progrowers-workforce-campaign",
          index: "03",
          category: "performance",
          categoryLabel: "Performance",
          title: "DMS Progrowers",
          subtitle: "Zespri supply partner | Rapid workforce recruitment during peak harvest season",
          overview:
            "How we helped a major kiwifruit packhouse operation secure the workforce needed to keep production running during a critical harvest period.",
          image: "/assets/case-study-dms-zespri-main.png",
          imageAlt: "DMS Progrowers and Zespri kiwifruit visual on a green background",
          chips: ["Lead Gen", "Meta Ads", "Recruitment", "Harvest Season"],
          cardFocus: "Secure workforce fast enough to keep operations running",
          cardMetrics: [
            { value: "100+", label: "Workers Recruited" },
            { value: "Hundreds", label: "Qualified Leads" },
            { value: "4-6 Weeks", label: "Workforce Stabilized" }
          ],
          heroMetrics: [
            { value: "100+", label: "Workers Recruited" },
            { value: "Hundreds", label: "Qualified Leads" },
            { value: "4-6 Weeks", label: "To Stabilize Workforce" },
            { value: "3 Months", label: "Season Sustained" }
          ],
          snapshot: [
            { label: "Client", value: "DMS Progrowers (Zespri supply partner)" },
            { label: "Sector", value: "Kiwifruit packhouse operations" },
            { label: "Market", value: "Regional seasonal labor market" },
            { label: "Channel mix", value: "Meta Ads, social media groups, creator amplification" },
            { label: "Priority", value: "Fill packhouse roles fast enough to protect the harvest season" }
          ],
          gallery: [
            {
              src: "/assets/case-study-dms-01.png",
              alt: "Hands sorting Zespri kiwifruit in a packing tray"
            },
            {
              src: "/assets/case-study-dms-02.png",
              alt: "Workers processing kiwifruit on a DMS Progrowers packhouse line"
            }
          ],
          sections: [
            {
              kicker: "The Challenge",
              title: "A critical labor shortage right at the start of the packing season.",
              body: [
                "DMS Progrowers operates large packhouse facilities that process and prepare kiwifruit during the harvest season. At the start of the season, the business needed a large workforce to keep packing operations moving smoothly.",
                "The initial target was to recruit around 30 seasonal workers for the early phase of operations. Then a major issue hit: many regular seasonal workers were unexpectedly unavailable, which created a much larger staffing gap across two large facilities."
              ],
              bullets: [
                "Packing delays during peak harvest would have put the whole season under pressure.",
                "Operational disruption across multiple facilities would have created immediate downstream strain.",
                "Product throughput, timing, and revenue were all at risk without a rapid recruitment response."
              ]
            },
            {
              kicker: "The Approach",
              title: "We built a rapid workforce acquisition campaign across paid and community distribution.",
              bullets: [
                "Launched targeted Meta recruitment campaigns focused on immediate job availability, seasonal work opportunities, and local employment.",
                "Used local social media communities and job groups in parallel to extend reach beyond paid distribution alone.",
                "Added creator amplification through trusted local networks, which helped compound visibility and accelerate applicant flow.",
                "Handled incoming leads through qualification and follow-up so the pipeline turned into confirmed workers, not just form fills.",
                "Scaled the system as staffing demand increased, so recruitment could support two large packhouse facilities instead of the original smaller target."
              ]
            },
            {
              kicker: "The Results",
              title: "Rapid workforce deployment that kept the season operational.",
              body: [
                "Within the first two weeks, the original target of 30 workers was successfully delivered. As the staffing need expanded, the recruitment system scaled with it.",
                "Over the following weeks, hundreds of candidate leads were generated and more than 100 seasonal workers were recruited, helping stabilize staffing across two large packhouse facilities for roughly three months until the end of the packing period."
              ],
              bullets: [
                "100+ seasonal workers recruited",
                "Hundreds of qualified candidate leads generated",
                "Workforce stabilized across two large packhouse facilities within roughly 4-6 weeks",
                "Recruitment support sustained across an approximately 3-month harvest season",
                "The client credited the recruitment campaign as a major reason operations could continue without serious disruption"
              ]
            }
          ],
          deliverables: [
            "Paid Meta recruitment campaigns",
            "Targeted seasonal job advertising",
            "Social media group distribution strategy",
            "Creator amplification through local networks",
            "Lead qualification and candidate conversion pipeline",
            "Scalable workforce recruitment framework"
          ],
          quote:
            "By combining paid social campaigns, community distribution, and rapid lead conversion, we built a recruitment engine capable of delivering the workforce needed during a critical harvest window."
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
      expandImageLabel: "Bild vergrößern",
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
          slug: "djtechnik-youtube-growth",
          index: "02",
          category: "performance",
          categoryLabel: "Performance",
          title: "DJ-TECHNIK.DE",
          subtitle: "Musikequipment-E-Commerce | YouTube-Audience und Käuferpotenzial mit Google Ads ausgebaut",
          overview:
            "So haben wir einer DJ-Equipment-Marke geholfen, ihr YouTube-Wachstum mit einer strukturierten Google-Ads-Kampagne zu beschleunigen und gleichzeitig eine größere Zielgruppe potenzieller Käufer aufzubauen.",
          image: "/assets/case-study-djtechnik-cover.webp",
          imageAlt: "Showroom von DJ-TECHNIK.DE mit beleuchteten DJ-Setups",
          chips: ["YouTube", "Google Ads", "Abonnentenwachstum", "E-Commerce"],
          cardFocus: "Audience-Wachstum + künftige Käuferpipeline",
          cardMetrics: [
            { value: "+7,8k", label: "Abonnenten" },
            { value: "90 Tage", label: "Zeitraum" },
            { value: "€0,22", label: "Kosten / Abonnent" }
          ],
          heroMetrics: [
            { value: "+7,8k", label: "Abonnenten" },
            { value: "90 Tage", label: "Zeitraum" },
            { value: "€0,22", label: "Kosten / Abonnent" }
          ],
          snapshot: [
            { label: "Kunde", value: "DJ-TECHNIK.DE" },
            { label: "Bereich", value: "Musikequipment-E-Commerce" },
            { label: "Markt", value: "Deutschland" },
            { label: "Kanalmix", value: "YouTube-Subscriber-Kampagnen über Google Ads" },
            { label: "Priorität", value: "YouTube-Audience und Käuferpipeline ausbauen" }
          ],
          stackedMedia: {
            src: "/assets/case-study-djtechnik-youtube-04.jpg",
            alt: "Google-Ads-Auswertung mit Abonnentenwachstum und effizientem Kostenverlauf",
            mode: "contain"
          },
          gallery: [
            {
              src: "/assets/case-study-djtechnik-youtube-03.png",
              mode: "contain",
              alt: "YouTube-Analytics mit Abonnentenwachstum der letzten 90 Tage"
            },
            {
              src: "/assets/case-study-djtechnik-youtube-02.png",
              mode: "contain",
              alt: "YouTube-Analytics mit Abonnentenwachstum der letzten 28 Tage"
            },
            {
              src: "/assets/case-study-djtechnik-youtube-01.png",
              mode: "contain",
              alt: "YouTube-Analytics mit Kanalentwicklung seit Kontoerstellung"
            }
          ],
          sections: [
            {
              kicker: "Die Herausforderung",
              title: "Eine starke Nischenmarke mit guten Inhalten, aber zu wenig Reichweite.",
              body: [
                "Die Marke hatte bereits starke Produktdemos und hilfreiche YouTube-Videos, aber rein organisches Wachstum war zu langsam, um das volle Potenzial des Kanals zu nutzen.",
                "Trotz guter Inhalte erreichte der Kanal noch nicht genug DJs, Musikproduzenten und potenzielle Käufer im relevanten Markt."
              ],
              bullets: [
                "Begrenzte Reichweite: Mit rund 1.000 Abonnenten war die organische Auffindbarkeit noch stark eingeschränkt.",
                "Langsames organisches Wachstum: Wertvolle Videos wurden veröffentlicht, erreichten aber zu wenige relevante Nutzer.",
                "Verlorenes Verkaufspotenzial: Jeder qualifizierte Videozuschauer ist auch ein möglicher Käufer von DJ-Equipment.",
                "Keine strukturierte Audience-Akquise: YouTube wurde noch nicht als skalierbarer Akquise-Kanal genutzt."
              ]
            },
            {
              kicker: "Der Ansatz",
              title: "Wir haben eine YouTube-Subscriber-Kampagne über Google Ads aufgebaut.",
              body: [
                "Statt ausschließlich auf organische Reichweite zu warten, haben wir Google Ads genutzt, um das Kanalwachstum gezielt zu beschleunigen und eine größere relevante Zielgruppe aufzubauen."
              ],
              bullets: [
                "Gestartet wurden spezielle YouTube-Kampagnen zur Abonnentengewinnung, die relevante Videos an Nutzer mit Interesse an DJ-Equipment, Musikproduktion, DJ-Tutorials und elektronischer Performance ausgespielt haben.",
                "Das Targeting basierte auf Interessen rund um DJing und Musikproduktion, Zuschauern relevanter YouTube-Inhalte, Suchintentionen für Musikequipment und ähnlichen Kanal-Audiences.",
                "Statt neue Videos nur für Anzeigen zu produzieren, wurden die bestehenden Top-Performer des Kanals beworben, damit sie danach auch organisch weiter Reichweite und Abonnenten einsammeln konnten.",
                "Das Budget wurde schrittweise erhöht, sobald die Kampagnen Abonnenten zu sehr niedrigen Kosten geliefert haben.",
                "Ziel war nicht nur mehr Traffic, sondern langfristiges Kanalwachstum mit echtem Marktwert."
              ]
            },
            {
              kicker: "Das Ergebnis",
              title: "Schnelles Abonnentenwachstum zu sehr niedrigen Akquisekosten.",
              body: [
                "Innerhalb von rund 90 Tagen ist der Kanal von etwa 1.000 Abonnenten am 20. Dezember auf ungefähr 8.800 Abonnenten am 10. März gewachsen.",
                "Das entspricht rund 7.800 neuen Abonnenten bei etwa 1.700 Euro Werbebudget. Die durchschnittlichen Kosten pro Abonnent lagen damit bei ungefähr 0,22 Euro."
              ],
              bullets: [
                "Rund 7.800 neue Abonnenten im 90-Tage-Zeitraum",
                "Etwa 1.700 Euro Gesamtbudget",
                "Ungefähr 0,22 Euro durchschnittliche Kosten pro Abonnent",
                "Wachstum von rund 1.000 auf ungefähr 8.800 Abonnenten",
                "Eine Abonnentenbasis, die jetzt deutlich stärker organisch weiterwachsen kann",
                "Eine deutlich größere langfristige Audience aus DJs, Musikproduzenten und potenziellen Käufern"
              ]
            }
          ],
          deliverables: [
            "YouTube-Subscriber-Kampagne über Google Ads",
            "Targeting für DJs und Musikproduktions-Communities",
            "Strategie zur Promotion bestehender Videos",
            "Budget-Skalierung auf Basis der Kosten pro Abonnent",
            "Kanalwachstum als langfristige Lead- und Käuferpipeline"
          ],
          quote:
            "Statt auf langsames organisches Wachstum zu warten, hat die Marke Google Ads genutzt, um Reichweite und Community gezielt zu beschleunigen und den Kanal in rund 90 Tagen von etwa 1.000 auf ungefähr 8.800 Abonnenten zu bringen."
        },
        {
          slug: "dms-progrowers-workforce-campaign",
          index: "03",
          category: "performance",
          categoryLabel: "Performance",
          title: "DMS Progrowers",
          subtitle: "Zespri-Lieferpartner | Schnelle Personalgewinnung in der Haupternte",
          overview:
            "So haben wir einem großen Kiwifrucht-Packhausbetrieb geholfen, genau dann genug Personal zu sichern, als die Erntesaison in die heiße Phase ging.",
          image: "/assets/case-study-dms-zespri-main.png",
          imageAlt: "Visual von DMS Progrowers und Zespri-Kiwis auf gruenem Hintergrund",
          chips: ["Lead Gen", "Meta Ads", "Recruiting", "Erntesaison"],
          cardFocus: "Genug Personal, um den Packbetrieb stabil zu halten",
          cardMetrics: [
            { value: "100+", label: "Saisonkräfte" },
            { value: "Hunderte", label: "Qualifizierte Leads" },
            { value: "4-6 Wochen", label: "Team stabilisiert" }
          ],
          heroMetrics: [
            { value: "100+", label: "Saisonkräfte" },
            { value: "Hunderte", label: "Qualifizierte Leads" },
            { value: "4-6 Wochen", label: "Bis der Betrieb stabil lief" },
            { value: "3 Monate", label: "Saison abgesichert" }
          ],
          snapshot: [
            { label: "Kunde", value: "DMS Progrowers (Zespri-Lieferpartner)" },
            { label: "Branche", value: "Kiwifrucht-Packhausbetrieb" },
            { label: "Markt", value: "Regionaler Arbeitsmarkt für Saisonkräfte" },
            { label: "Kanalmix", value: "Meta Ads, Social-Media-Gruppen, Creator-Verstärkung" },
            { label: "Priorität", value: "Schnell genug Personal finden, damit die Saison sauber durchläuft" }
          ],
          gallery: [
            {
              src: "/assets/case-study-dms-01.png",
              alt: "Haende sortieren Zespri-Kiwis in einer Packschale"
            },
            {
              src: "/assets/case-study-dms-02.png",
              alt: "Mitarbeiter an einer Packlinie von DMS Progrowers beim Verarbeiten von Kiwis"
            }
          ],
          sections: [
            {
              kicker: "Die Herausforderung",
              title: "Ein akuter Personalmangel direkt zum Start der Packhaussaison.",
              body: [
                "DMS Progrowers betreibt große Packhäuser, in denen Kiwifrüchte während der Erntesaison verarbeitet und versandbereit gemacht werden. Zum Saisonstart musste schnell genügend Personal gefunden werden, damit der Betrieb ohne Reibung anlaufen konnte.",
                "Ursprünglich sollten etwa 30 Saisonkräfte für die erste Phase gewonnen werden. Kurz nach Start der Suche fiel jedoch ein großer Teil der sonst verfügbaren Stammkräfte aus. Damit entstand plötzlich eine deutlich größere Lücke über zwei große Standorte hinweg."
              ],
              bullets: [
                "Verzögerungen in der Hochphase der Ernte hätten den gesamten Ablauf unter Druck gesetzt.",
                "Mehrere Packhäuser gleichzeitig personell abzusichern wurde zur akuten operativen Aufgabe.",
                "Ohne schnelle Rekrutierung standen Durchsatz, Produktfluss und Umsatz direkt auf dem Spiel."
              ]
            },
            {
              kicker: "Der Ansatz",
              title: "Wir haben ein schnelles Recruiting-System über Paid und Community-Distribution aufgebaut.",
              bullets: [
                "Gestartet wurden gezielte Meta-Recruiting-Kampagnen mit Fokus auf sofort verfügbare Jobs, Saisonarbeit und lokale Beschäftigung.",
                "Parallel wurden lokale Social-Media-Communities und Jobgruppen eingebunden, um die Reichweite deutlich über Paid allein hinaus zu erhöhen.",
                "Zusätzlich kamen Creator aus passenden Netzwerken dazu, die die offenen Stellen in ihren eigenen Communities weitergetragen haben.",
                "Alle eingehenden Leads wurden kontaktiert, vorqualifiziert und in bestätigte Kräfte für die Packhäuser überführt.",
                "Als der Personalbedarf weiter stieg, wurde das System mit skaliert, damit nicht nur die erste Zielgröße erreicht, sondern zwei große Standorte personell abgesichert werden konnten."
              ]
            },
            {
              kicker: "Das Ergebnis",
              title: "Schnelle Personalgewinnung, die die Saison stabil gehalten hat.",
              body: [
                "Schon innerhalb der ersten zwei Wochen wurde das ursprüngliche Ziel von 30 Kräften erreicht. Als der Bedarf anschließend größer wurde, konnte das Recruiting-System entsprechend mitwachsen.",
                "In den darauffolgenden Wochen wurden Hunderte qualifizierte Leads generiert und mehr als 100 Saisonkräfte vermittelt. So ließ sich die Personalsituation über zwei große Packhäuser hinweg innerhalb von etwa vier bis sechs Wochen stabilisieren und über rund drei Monate bis zum Saisonende absichern."
              ],
              bullets: [
                "100+ Saisonkräfte gewonnen",
                "Hunderte qualifizierte Bewerber-Leads generiert",
                "Stabilisierung des Personals über zwei große Packhausstandorte in rund 4-6 Wochen",
                "Recruiting über ungefähr 3 Monate der Erntesaison aufrechterhalten",
                "Laut Kunde war die Kampagne ein zentraler Grund dafür, dass der Betrieb ohne größere Unterbrechung weiterlaufen konnte"
              ]
            }
          ],
          deliverables: [
            "Meta-Recruiting-Kampagnen",
            "Gezielte Anzeigen für Saisonjobs",
            "Distributionsstrategie über Social-Media-Gruppen",
            "Creator-Verstärkung über lokale Netzwerke",
            "Lead-Qualifizierung und Umwandlung in bestätigte Kräfte",
            "Skalierbares Framework für die Personalgewinnung"
          ],
          quote:
            "Durch die Kombination aus Paid Social, Community-Distribution und schneller Lead-Umwandlung ist ein Recruiting-System entstanden, das genau im kritischen Erntefenster die nötigen Arbeitskräfte liefern konnte."
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

  let mediaLightboxState;

  const SCRAMBLE_CHARS = "0123456789+%€.,";

  const scrambleMetricValue = (node, finalValue, duration = 1100) => {
    const container = node.closest(".case-hero-metrics__item");
    if (container) {
      container.classList.add("is-scrambling");
      container.classList.remove("is-settled");
    }

    const start = performance.now();
    const characters = finalValue.split("");
    const frame = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const revealCount = Math.floor(progress * characters.length);
      node.textContent = characters
        .map((char, index) => {
          if (char === " ") return char;
          if (index < revealCount) return char;
          if (!SCRAMBLE_CHARS.includes(char)) return char;
          return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        })
        .join("");

      if (progress < 1) {
        requestAnimationFrame(frame);
        return;
      }

      node.textContent = finalValue;
      if (container) {
        container.classList.remove("is-scrambling");
        container.classList.add("is-settled");
      }
    };

    requestAnimationFrame(frame);
  };

  const initHeroMetricScramble = (root) => {
    const values = Array.from(root.querySelectorAll(".case-hero-metrics__item strong"));
    if (!values.length) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      values.forEach((node) => {
        const finalValue = node.textContent.trim();
        node.textContent = finalValue;
        node.closest(".case-hero-metrics__item")?.classList.add("is-settled");
      });
      return;
    }

    const metricsGroup = root.querySelector(".case-hero-metrics");
    if (!metricsGroup) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        values.forEach((node, index) => {
          const finalValue = node.textContent.trim();
          window.setTimeout(() => {
            scrambleMetricValue(node, finalValue);
          }, index * 160);
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(metricsGroup);
  };

  const ensureMediaLightbox = () => {
    if (mediaLightboxState) return mediaLightboxState;

    const lightbox = document.createElement("div");
    lightbox.className = "case-lightbox";
    lightbox.setAttribute("hidden", "");
    lightbox.innerHTML = `
      <div class="case-lightbox-backdrop" data-lightbox-close></div>
      <div class="case-lightbox-dialog" role="dialog" aria-modal="true" aria-label="Expanded image">
        <button type="button" class="case-lightbox-close" data-lightbox-close aria-label="Close image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18"/>
            <path d="m6 6 12 12"/>
          </svg>
        </button>
        <div class="case-lightbox-surface">
          <img class="case-lightbox-image" alt="">
        </div>
        <p class="case-lightbox-caption"></p>
      </div>
    `;

    document.body.appendChild(lightbox);

    const image = lightbox.querySelector(".case-lightbox-image");
    const caption = lightbox.querySelector(".case-lightbox-caption");

    const close = () => {
      lightbox.classList.remove("is-open");
      document.body.classList.remove("case-lightbox-open");
      window.setTimeout(() => {
        lightbox.setAttribute("hidden", "");
        if (image) image.setAttribute("src", "");
      }, 180);
    };

    lightbox.querySelectorAll("[data-lightbox-close]").forEach((node) => {
      node.addEventListener("click", close);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        close();
      }
    });

    const open = (src, alt) => {
      if (!image || !caption) return;
      image.setAttribute("src", src);
      image.setAttribute("alt", alt || "");
      caption.textContent = alt || "";
      lightbox.removeAttribute("hidden");
      document.body.classList.add("case-lightbox-open");
      requestAnimationFrame(() => {
        lightbox.classList.add("is-open");
      });
    };

    mediaLightboxState = { lightbox, open, close };
    return mediaLightboxState;
  };

  const initExpandableMedia = (root) => {
    const triggers = Array.from(root.querySelectorAll("[data-expand-image]"));
    if (!triggers.length) return;

    const lightbox = ensureMediaLightbox();
    triggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const src = trigger.getAttribute("data-expand-image");
        const alt = trigger.getAttribute("data-expand-alt") || "";
        if (!src) return;
        lightbox.open(src, alt);
      });
    });
  };

  const initRelatedCarousel = (viewport, grid, controls, prevButton, nextButton) => {
    if (!viewport || !grid || !controls || !prevButton || !nextButton) return;

    const applyStaticLayout = () => {
      const cardCount = grid.querySelectorAll(".case-mini-card").length;
      viewport.style.display = "flex";
      viewport.style.justifyContent = "center";
      viewport.style.overflowX = "visible";

      grid.style.display = "grid";
      grid.style.gridTemplateColumns = `repeat(${cardCount}, minmax(19rem, 23rem))`;
      grid.style.gridAutoFlow = "row";
      grid.style.gridAutoColumns = "unset";
      grid.style.width = "fit-content";
      grid.style.minWidth = "0";
      grid.style.margin = "0 auto";
      grid.style.justifyContent = "center";
    };

    const clearStaticLayout = () => {
      viewport.style.display = "";
      viewport.style.justifyContent = "";
      viewport.style.overflowX = "";

      grid.style.display = "";
      grid.style.gridTemplateColumns = "";
      grid.style.gridAutoFlow = "";
      grid.style.gridAutoColumns = "";
      grid.style.width = "";
      grid.style.minWidth = "";
      grid.style.margin = "";
      grid.style.justifyContent = "";
    };

    const getScrollStep = () => {
      const firstCard = grid.querySelector(".case-mini-card");
      if (!firstCard) return viewport.clientWidth * 0.9;
      const styles = window.getComputedStyle(grid);
      const gap = parseFloat(styles.columnGap || styles.gap || "0");
      return firstCard.getBoundingClientRect().width + gap;
    };

    const updateButtons = () => {
      const maxScroll = Math.max(0, viewport.scrollWidth - viewport.clientWidth);
      const scrollable = maxScroll > 8;
      controls.classList.toggle("is-hidden", !scrollable);
      viewport.classList.toggle("is-static", !scrollable);

      if (!scrollable) {
        applyStaticLayout();
        viewport.scrollLeft = 0;
        prevButton.disabled = true;
        nextButton.disabled = true;
        return;
      }

      clearStaticLayout();
      prevButton.disabled = viewport.scrollLeft <= 8;
      nextButton.disabled = viewport.scrollLeft >= maxScroll - 8;
    };

    prevButton.addEventListener("click", () => {
      viewport.scrollBy({ left: -getScrollStep(), behavior: "smooth" });
    });

    nextButton.addEventListener("click", () => {
      viewport.scrollBy({ left: getScrollStep(), behavior: "smooth" });
    });

    viewport.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);

    if ("ResizeObserver" in window) {
      const resizeObserver = new ResizeObserver(updateButtons);
      resizeObserver.observe(viewport);
      resizeObserver.observe(grid);
    }

    updateButtons();
  };

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
    const cardMediaClass = `case-card-media${study.imageMode === "contain" ? " is-framed" : ""}`;
    return `
      <a class="case-card" href="${getCaseUrl(lang, study.slug)}" data-category="${study.category}">
        <div class="${cardMediaClass}">
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
    const relatedViewport = document.querySelector("[data-related-viewport]");
    const relatedControls = document.querySelector("[data-related-controls]");
    const relatedPrev = document.querySelector("[data-related-prev]");
    const relatedNext = document.querySelector("[data-related-next]");
    if (!detailRoot) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get("study") || content.studies[0].slug;
    const study = getStudyBySlug(content, slug);

    document.title = `${study.title} | ${content.detailSuffix}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute("content", study.overview);

    if (study.image) {
      document.body.style.setProperty("--case-hero-bg", `url('${study.image}')`);
    }

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

    const renderSectionCard = (section) => {
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
      };

    const stackedMedia = study.stackedMedia
      ? `
        <section class="case-section-card case-inline-media${study.stackedMedia.mode === "contain" ? " is-framed" : ""}">
          <button
            type="button"
            class="case-inline-media-frame case-image-trigger"
            data-expand-image="${study.stackedMedia.src}"
            data-expand-alt="${study.stackedMedia.alt}"
            aria-label="${content.expandImageLabel}"
          >
            <img loading="eager" decoding="async" src="${study.stackedMedia.src}" alt="${study.stackedMedia.alt}">
          </button>
        </section>
      `
      : "";

    const sections = study.sections
      .map((section, index) => `${renderSectionCard(section)}${study.stackedMedia && index === 0 ? stackedMedia : ""}`)
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
                <button
                  type="button"
                  class="case-gallery-item${image.mode === "contain" ? " is-framed" : ""} case-image-trigger"
                  data-expand-image="${image.src}"
                  data-expand-alt="${image.alt}"
                  aria-label="${content.expandImageLabel}"
                >
                  <img loading="lazy" decoding="async" src="${image.src}" alt="${image.alt}">
                </button>
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
        <div class="case-detail-media${study.imageMode === "contain" ? " is-framed" : ""}">
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

    initHeroMetricScramble(detailRoot);
    initExpandableMedia(detailRoot);

    if (relatedCopy) relatedCopy.textContent = content.relatedCopy;
    if (relatedRoot) {
      const relatedStudies = content.studies.filter((item) => item.slug !== study.slug);
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

      initRelatedCarousel(relatedViewport, relatedRoot, relatedControls, relatedPrev, relatedNext);
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
