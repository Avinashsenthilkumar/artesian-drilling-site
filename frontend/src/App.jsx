import React, { useState, useEffect } from "react";

const NAVY = "#1c2b45";
const NAVY_DARK = "#141f33";
const GOLD = "#f4b942";
const GREEN = "#25D366";

const PHONE_PRIMARY = "+254 742879962";
const PHONE_SECONDARY = "+254 794676434";
const PHONE_TEL = "+254742879962";
const WHATSAPP_NUM = "254742879962";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hello Artesian Drilling, I need an inquiry/quote on borehole drilling."
);
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUM}?text=${WHATSAPP_MESSAGE}`;

const heroImg = "/images/hero.webp";

/* ---------------- Services Data (6 Core Services) ---------------- */
const servicesList = [
  {
    id: "hydrogeological-survey",
    title: "Hydrogeological Survey & Aquifer Mapping",
    subtitle: "Geophysical groundwater exploration with certified WARMA reports",
    desc: "We deploy advanced geophysical resistivity meters (vertical electrical sounding) to assess subsurface rock formations, identify saturated water-bearing aquifers, and calculate expected drilling depths and water yields. Our licensed hydrogeologists prepare the mandatory comprehensive survey report required for WARMA drilling authorization permits in Kenya.",
    img: "/images/service-hydrogeological-survey.webp",
    alt: "Hydrogeological survey and geophysical groundwater exploration in Kenya",
    badge: "WARMA Permitted",
    specs: [
      { label: "Survey Depth", val: "Up to 350+ meters" },
      { label: "Technology", val: "Geophysical Resistivity & VES" },
      { label: "Report Delivery", val: "Within 3-5 Working Days" },
      { label: "Permit Clearance", val: "WRA / WARMA & NEMA Ready" },
    ],
    includes: [
      "Subsurface geological strata mapping",
      "Aquifer depth and water table assessment",
      "Estimated water yield (m³/hour)",
      "Optimal GPS drilling coordinate pinpointing",
      "Official certified hydrogeological report submission",
    ],
  },
  {
    id: "borehole-drilling",
    title: "Rotary Borehole Drilling in Kenya",
    subtitle: "Turnkey deep well drilling using modern heavy-duty rotary rigs",
    desc: "Equipped with high-pressure rotary drill rigs and air percussion hammers, we drill water boreholes through all Kenyan geological formations—from soft clay and silt to hard basalt, volcanic phonolites, and granite. We maintain high standards of borehole alignment, certified well casing installation, and sanitary gravel packing to guarantee 30+ years of borehole life.",
    img: "/images/service-site-assessment.webp",
    alt: "Rotary borehole drilling rig in Kenya - Artesian Drilling Ltd",
    badge: "Turnkey Drilling",
    specs: [
      { label: "Drilling Diameter", val: "8 to 12 inches" },
      { label: "Depth Capacity", val: "80m to 350m+" },
      { label: "Casings Installed", val: "Class 9/10 uPVC or Steel" },
      { label: "Drilling Speed", val: "1 - 3 Days on Site" },
    ],
    includes: [
      "Rotary air/mud drilling with geological logging",
      "Heavy-duty plain and slotted well casing pipes",
      "Graded inert river gravel pack installation",
      "Borehole development & high-pressure air jetting",
      "Continuous 24-hour yield test pumping",
    ],
  },
  {
    id: "pump-installation",
    title: "Solar & Submersible Water Pump Installation",
    subtitle: "High-efficiency EPRA-compliant solar and electric water pumping systems",
    desc: "Water is only useful when brought reliably to the surface. We engineer and install tailor-made pumping solutions including high-durability stainless steel submersible pumps, mono pumps, and solar photovoltaic pumping arrays. Solar systems eliminate high monthly power and fuel bills, delivering clean pumped water from morning till sunset.",
    img: "/images/service-pump-installation.webp",
    alt: "Solar and submersible water pump installation in Kenya",
    badge: "Zero Power Bills",
    specs: [
      { label: "Pump Types", val: "Solar DC / Hybrid / AC Submersible" },
      { label: "Solar Panels", val: "Tier-1 Monocrystalline PV" },
      { label: "Controllers", val: "MPPT Smart Inverters with Dry-Run Protection" },
      { label: "Warranty", val: "Comprehensive Manufacturer Warranty" },
    ],
    includes: [
      "Accurate hydraulic pump sizing matched to depth and yield",
      "Solar panel mounting structures and lightning protection",
      "Submersible cables, control panels & water level sensors",
      "Pressure tanks, piping and automated float switches",
      "Full commissioning and electrical safety testing",
    ],
  },
  {
    id: "water-tower",
    title: "Elevated Water Tower Construction",
    subtitle: "Durable steel and concrete elevated tanks for gravity-fed distribution",
    desc: "Proper water storage ensures consistent hydraulic pressure without relying on constant pump cycling. We design, fabricate, and erect elevated steel tank towers ranging from 6 to 18 meters in height, engineered to support steel, fiberglass, or multi-thousand-liter plastic storage tanks for residential estates, institutions, and farms.",
    img: "/images/service-water-tower.webp",
    alt: "Elevated steel water tower construction for storage and distribution in Kenya",
    badge: "Structural Engineering",
    specs: [
      { label: "Tower Heights", val: "6m, 9m, 12m, 15m, 18m" },
      { label: "Storage Capacity", val: "5,000L to 50,000L+" },
      { label: "Materials", val: "Heavy-gauge Galvanized / Primed Steel" },
      { label: "Foundation", val: "Reinforced Concrete Base" },
    ],
    includes: [
      "Custom structural engineering calculation & design",
      "Reinforced concrete pad foundation casting",
      "Anti-corrosion primed and painted steel truss towers",
      "Inlet, outlet, overflow, and drain pipe installation",
      "Safety access ladder, cage, and roof platform",
    ],
  },
  {
    id: "community-water",
    title: "Community, Farm & Institutional Water Schemes",
    subtitle: "Large-scale water supply systems for villages, ranches, schools & factories",
    desc: "We manage complete water infrastructure projects from wellhead to water kiosks and irrigation lines. Working with NGOs, County Governments, agricultural cooperatives, and private estates, we build community water distribution points, livestock troughs, drip irrigation piping networks, and institutional water storage.",
    img: "/images/service-community-water.webp",
    alt: "Community borehole drilling and public water supply project in Kenya",
    badge: "Large Scale Schemes",
    specs: [
      { label: "Beneficiaries", val: "500 to 10,000+ People" },
      { label: "Applications", val: "Irrigation, Livestock, Schools, Communities" },
      { label: "Distribution", val: "Multi-kilometer HDPE / GI Pipelines" },
      { label: "Kiosks & Troughs", val: "Vandal-resistant distribution points" },
    ],
    includes: [
      "Community water demand assessment and network design",
      "Trenching, HDPE pipe laying, and control valve chambers",
      "Water kiosk construction with prepaid meter options",
      "Livestock watering troughs with float control",
      "Water committee training and operation manuals",
    ],
  },
  {
    id: "consultancy-licensing",
    title: "Borehole Consultancy, Licensing & WARMA/NEMA Permits",
    subtitle: "Full regulatory approvals, environmental impact assessment & water testing",
    desc: "Navigating Kenyan groundwater regulations can be complex. Artesian Drilling provides complete advisory and liaison services to secure your Water Resources Authority (WARMA/WRA) drilling authorizations, NEMA Environmental Impact Assessment (EIA) licenses, and government accredited laboratory water chemical testing reports.",
    img: "/images/service-consultancy.webp",
    alt: "Borehole drilling consultancy, WARMA permits and NEMA licensing in Kenya",
    badge: "100% Legal Compliance",
    specs: [
      { label: "Authority Permits", val: "WARMA / WRA Authorizations" },
      { label: "Environmental", val: "NEMA EIA Expert Reports" },
      { label: "Water Lab Tests", val: "Potability & Mineral Analysis" },
      { label: "Abstraction", val: "Water Abstraction Permits" },
    ],
    includes: [
      "Preparation of hydrogeological survey dossiers",
      "Filing and tracking WRA drilling authorization requests",
      "NEMA Environmental Impact Assessment (EIA) processing",
      "Comprehensive KEBS-standard chemical & biological water testing",
      "Borehole completion reports & formal registration",
    ],
  },
];

/* ---------------- Other Data ---------------- */
const works = [
  {
    title: "Community Borehole Project (Narok)",
    img: servicesList[0].img,
    alt: "Completed deep community borehole drilling project in Narok Kenya",
    depth: "180m Depth",
    yield: "14,000 L/hr Yield",
  },
  {
    title: "Commercial Farm Irrigation Borehole",
    img: servicesList[1].img,
    alt: "Agricultural borehole drilling and solar pump installation in Rift Valley Kenya",
    depth: "220m Depth",
    yield: "22,000 L/hr Yield",
  },
  {
    title: "School Water Supply & Sanitation Scheme",
    img: servicesList[4].img,
    alt: "Institutional borehole and clean water distribution system in Kenya",
    depth: "140m Depth",
    yield: "8,500 L/hr Yield",
  },
  {
    title: "Elevated Steel Water Tower & Storage",
    img: servicesList[3].img,
    alt: "Elevated steel tank water tower installation for domestic and farm storage",
    depth: "12m Tower",
    yield: "20,000L Capacity",
  },
];

const homeFaqs = [
  {
    q: "How do I know if my land has water before drilling?",
    a: "We carry out a professional hydrogeological survey using modern geophysical resistivity meters. Our licensed hydrogeologists map subsurface geological strata, pinpoint the optimal aquifer location, and determine expected drilling depth and water yield before drilling commences.",
  },
  {
    q: "How much does borehole drilling cost in Kenya?",
    a: "Borehole drilling costs in Kenya depend on total drilled depth, geological rock formations (soft soils vs volcanic rock), casing specifications (class 9/10 uPVC or heavy-duty steel), and pump sizing (solar vs electric submersible). Contact us for a free site assessment and customized price quotation.",
  },
  {
    q: "How long does the entire borehole drilling process take?",
    a: "The rotary drilling phase generally takes between 1 to 3 days depending on depth and rock hardness. The full turnkey project—including casing installation, gravel packing, test pumping (yield testing), water laboratory analysis, and solar/electric pump commissioning—is typically delivered in 1 to 2 weeks.",
  },
  {
    q: "Do you supply and install solar-powered water pumps?",
    a: "Yes! We specialize in EPRA-compliant solar borehole pumping systems. Solar pumps run directly on sunlight without recurring electricity or fuel bills, making them the most cost-effective solution for off-grid farms, ranches, and residential homes in Kenya.",
  },
  {
    q: "What regulatory permits do I need before drilling a borehole in Kenya?",
    a: "Under Kenyan law, you need a Hydrogeological Survey Report, a drilling authorization permit from the Water Resources Authority (WARMA / WRA), and an Environmental Impact Assessment (EIA) approval license from NEMA. Artesian Drilling assists clients with all survey reports and permit paperwork.",
  },
  {
    q: "What areas and counties in Kenya do you serve?",
    a: "We operate nationwide across Kenya, with extensive completed projects in Narok, Nairobi, Kajiado, Nakuru, Bomet, Kiambu, Machakos, and throughout the Rift Valley and Central Kenya.",
  },
];

const servicesFaqs = [
  {
    q: "How much does borehole drilling cost in Kenya in 2026?",
    a: "Average borehole drilling in Kenya is calculated per meter plus mobilization, casing, test pumping, and pump installation. A comprehensive site survey provides the exact specifications to minimize costs while guaranteeing high water yields.",
  },
  {
    q: "How long does borehole drilling take from start to finish?",
    a: "Mobilization and rotary drilling require 1–3 days. Test pumping (24-hour yield test) and pump installation take an additional 3–5 days. We provide complete milestone timelines for every project.",
  },
  {
    q: "Which is better: a solar borehole pump or an electric submersible pump?",
    a: "Solar water pumps have zero ongoing electricity costs and operate reliably in off-grid rural areas. Electric pumps are suitable where reliable grid power exists. Many clients also opt for hybrid solar-grid systems for 24/7 pumping.",
  },
  {
    q: "What post-drilling maintenance and warranty do you offer?",
    a: "We provide comprehensive borehole development, pump warranty coverage, regular servicing, and water testing support to guarantee decades of uninterrupted clean water supply.",
  },
];

const serviceAreas = [
  {
    county: "Narok County",
    areas: "Narok Town, Kilgoris, Maasai Mara, Ololulung'a, Nairagie Enkare",
    highlight: "Home Base & Fast Mobilization",
  },
  {
    county: "Nairobi & Kiambu",
    areas: "Karen, Lang'ata, Ruiru, Kikuyu, Thika, Limuru, Juja",
    highlight: "Residential & Commercial Projects",
  },
  {
    county: "Kajiado County",
    areas: "Kitengela, Ngong, Ongata Rongai, Isinya, Kajiado Town, Loitokitok",
    highlight: "Agricultural & Farm Boreholes",
  },
  {
    county: "Nakuru & Rift Valley",
    areas: "Nakuru City, Naivasha, Gilgil, Mai Mahiu, Molo, Subukia",
    highlight: "Horticulture & Community Wells",
  },
  {
    county: "Bomet & South Rift",
    areas: "Bomet Town, Sotik, Longisa, Chepalungu, Kericho borders",
    highlight: "Dairy & Rural Water Supply",
  },
  {
    county: "Nationwide Kenya",
    areas: "Machakos, Murang'a, Kisii, Nyeri, Laikipia, and all 47 counties",
    highlight: "Full Countrywide Mobilization",
  },
];

const accreditations = [
  {
    badge: "WARMA / WRA",
    title: "Authorized Drilling Contractor",
    desc: "Fully compliant with Water Resources Authority groundwater abstraction and drilling standards.",
  },
  {
    badge: "NEMA Registered",
    title: "Environmental Impact Assessment",
    desc: "Certified environmental experts ensuring eco-friendly, sustainable groundwater extraction.",
  },
  {
    badge: "EPRA Standards",
    title: "Solar Water Pumping Systems",
    desc: "Compliant with Energy & Petroleum Regulatory Authority renewable energy solar codes.",
  },
  {
    badge: "NCA Certified",
    title: "Water & Civil Engineering Works",
    desc: "National Construction Authority certified contractors for heavy drilling and water structures.",
  },
];

const aboutFeatures = [
  {
    title: "Certified Hydrogeologists & Engineers",
    desc: "Our qualified team uses modern geophysical equipment and high-yield borehole designs to ensure long-term aquifer performance.",
  },
  {
    title: "512+ Completed Boreholes Nationwide",
    desc: "Proven track record delivering reliable water systems for agricultural farms, schools, residential homes, and commercial enterprises.",
  },
  {
    title: "Transparent, Competitive Pricing",
    desc: "No hidden charges. Clear itemized quotations covering surveying, drilling, test pumping, casing, and pump installation.",
  },
];

const aboutStats = [
  { n: "512+", l: "Successful borehole projects drilled in Kenya" },
  { n: "10+", l: "Years of professional drilling experience" },
  { n: "1,000+", l: "Solar & submersible water pumps installed" },
  { n: "100%", l: "Client satisfaction & water reliability commitment" },
];

const trustItems = [
  "WARMA / WRA Registered Contractor",
  "Modern High-Pressure Rotary Rig",
  "Geophysical Hydrogeological Surveys",
  "Durable Steel & uPVC Well Casings",
  "EPRA Certified Solar Pumping",
  "Transparent Yield Test Reports",
];

const contactImgs = [
  {
    src: "/images/contact-1.webp",
    alt: "Artesian Drilling crew mobilizing rotary drilling rig on site in Narok Kenya",
  },
  {
    src: "/images/contact-2.webp",
    alt: "Artesian Drilling drilling rig operating on agricultural borehole site in Kenya",
  },
];

/* ---------------- Reusable UI Bits ---------------- */

function Eyebrow({ children, color = NAVY }) {
  return (
    <p className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-2" style={{ color }}>
      {children}
    </p>
  );
}

function PageHero({ title, subtitle, breadcrumb }) {
  return (
    <div
      className="relative bg-cover bg-center py-16 sm:py-24"
      style={{ backgroundImage: `url('${heroImg}')` }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,31,51,0.86)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center sm:text-left">
        {breadcrumb && (
          <p className="text-xs sm:text-sm text-gray-300 font-medium mb-3">
            Home / <span style={{ color: GOLD }}>{breadcrumb}</span>
          </p>
        )}
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-gray-200 mt-4 text-sm sm:text-base max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between text-left py-5 px-6 focus:outline-none focus-visible:ring-2"
        style={{ "--tw-ring-color": NAVY }}
        aria-expanded={isOpen}
      >
        <span className="font-semibold text-sm sm:text-base pr-4" style={{ color: NAVY }}>
          {item.q}
        </span>
        <span className="text-xl font-bold leading-none flex-shrink-0" style={{ color: GOLD }}>
          {isOpen ? "−" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
          {item.a}
        </div>
      )}
    </div>
  );
}

function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border border-gray-200 bg-white rounded-sm shadow-sm divide-y divide-gray-100">
      {items.map((item, i) => (
        <FaqItem
          key={item.q}
          item={item}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? -1 : i)}
        />
      ))}
    </div>
  );
}

function AccreditationsSection() {
  return (
    <section className="bg-gray-50 border-y border-gray-200 py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <Eyebrow color={GOLD}>Compliance & Quality Assurance</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: NAVY }}>
            Regulatory Compliance & Industry Accreditations
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-2">
            Artesian Drilling Limited adheres strictly to Kenyan national water conservation laws,
            environmental protection standards, and electrical safety codes.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {accreditations.map((item) => (
            <div
              key={item.badge}
              className="bg-white p-6 border-t-4 shadow-sm rounded-sm"
              style={{ borderTopColor: GOLD }}
            >
              <div
                className="inline-block px-3 py-1 text-xs font-bold uppercase rounded mb-3"
                style={{ backgroundColor: NAVY, color: "white" }}
              >
                {item.badge}
              </div>
              <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegionalCoverageSection({ setPage }) {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
        <div>
          <Eyebrow color={GOLD}>Local Service Footprint</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
            Key Counties & Regions We Serve in Kenya
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm mt-2 max-w-2xl">
            From our Narok headquarters, our rotary drilling rigs mobilize swiftly across Rift
            Valley, Nairobi, Kajiado, Nakuru, and nationwide.
          </p>
        </div>
        <button
          onClick={() => setPage("contact")}
          className="px-6 py-3 text-xs sm:text-sm font-semibold rounded-sm shadow"
          style={{ backgroundColor: GOLD, color: NAVY_DARK }}
        >
          INQUIRE FOR YOUR COUNTY →
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceAreas.map((area) => (
          <div
            key={area.county}
            className="p-6 border border-gray-200 rounded-sm hover:border-gray-400 transition-colors bg-white shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-extrabold text-base sm:text-lg" style={{ color: NAVY }}>
                  {area.county}
                </h3>
                <span
                  className="text-[11px] font-bold px-2 py-0.5 rounded"
                  style={{ backgroundColor: "#fdf3d8", color: "#875f0a" }}
                >
                  {area.highlight}
                </span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed mb-4">
                <strong>Towns & Hubs:</strong> {area.areas}
              </p>
            </div>
            <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">Hydrogeological Surveys & Drilling</span>
              <button
                onClick={() => setPage("contact")}
                className="font-bold underline"
                style={{ color: NAVY }}
              >
                Get Quote
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Header & Footer ---------------- */

function Header({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ["home", "Home", "/"],
    ["services", "Services", "/services"],
    ["about", "About Us", "/about"],
    ["contact", "Contact & Quote", "/contact"],
  ];

  const handleNavClick = (e, key) => {
    e.preventDefault();
    setPage(key);
    setMenuOpen(false);
  };

  return (
    <header className="relative z-30">
      {/* Top Bar */}
      <div className="border-b border-white/10 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between px-6 py-2.5 gap-2">
          <div className="flex items-center gap-4 text-gray-300">
            <span>📍 Opp. Mara Frontier Hotel, Narok, Kenya</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">🕒 Mon - Sat: 8:00 AM - 6:00 PM</span>
          </div>
          <div className="flex items-center gap-4 font-semibold" style={{ color: GOLD }}>
            <a href={`tel:${PHONE_TEL}`} className="hover:underline">
              📞 {PHONE_PRIMARY}
            </a>
            <span>/</span>
            <a href="tel:+254794676434" className="hover:underline">
              {PHONE_SECONDARY}
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a
          href="/"
          onClick={(e) => handleNavClick(e, "home")}
          className="text-left group flex flex-col"
          aria-label="Artesian Drilling Limited Homepage"
        >
          <span className="text-white font-extrabold tracking-wider text-base sm:text-xl">
            ARTESIAN DRILLING
          </span>
          <span
            className="text-[10px] tracking-widest font-semibold uppercase"
            style={{ color: GOLD }}
          >
            Limited &bull; Kenya
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map(([key, label, path]) => (
            <a
              key={key}
              href={path}
              onClick={(e) => handleNavClick(e, key)}
              style={{
                color: page === key ? GOLD : "white",
                borderBottom: page === key ? `2px solid ${GOLD}` : "2px solid transparent",
              }}
              className="py-1 hover:opacity-80 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs font-bold text-white rounded flex items-center gap-2"
            style={{ backgroundColor: GREEN }}
          >
            <span>💬</span> WhatsApp
          </a>
          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded"
            style={{ backgroundColor: GOLD, color: NAVY_DARK }}
          >
            REQUEST A QUOTE
          </a>
        </div>

        <button
          className="md:hidden text-white text-2xl p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          &#9776;
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-3 px-6 pb-6 text-white text-sm font-medium bg-gray-900 border-t border-white/10">
          {navItems.map(([key, label, path]) => (
            <a
              key={key}
              href={path}
              onClick={(e) => handleNavClick(e, key)}
              style={{ color: page === key ? GOLD : "white", textAlign: "left" }}
              className="py-2 border-b border-white/5"
            >
              {label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-center py-2.5 text-xs font-bold text-white rounded"
              style={{ backgroundColor: GREEN }}
            >
              Chat on WhatsApp
            </a>
            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, "contact")}
              className="text-center py-2.5 text-xs font-bold uppercase rounded"
              style={{ backgroundColor: GOLD, color: NAVY_DARK }}
            >
              Request a Free Quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Footer({ setPage }) {
  const handleNavClick = (e, key) => {
    e.preventDefault();
    setPage(key);
  };

  return (
    <footer style={{ backgroundColor: NAVY_DARK }} className="text-gray-300 pb-16 md:pb-0">
      <div className="max-w-7xl mx-auto px-6 py-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-extrabold text-lg mb-3">ARTESIAN DRILLING LIMITED</h3>
          <p className="text-sm leading-relaxed text-gray-400 mb-4">
            Kenya's dependable borehole drilling, hydrogeological survey, and solar water supply
            contractor. Delivering certified, high-yield clean groundwater solutions across Narok,
            Rift Valley, Nairobi, and nationwide.
          </p>
          <div className="text-xs text-gray-400">
            <strong>Accreditation:</strong> WARMA Authorized &amp; NEMA Compliant
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-base">Drilling Services</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            {servicesList.map((s) => (
              <li key={s.id}>
                <a
                  href="/services"
                  onClick={(e) => handleNavClick(e, "services")}
                  className="hover:text-white text-left block"
                >
                  • {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-base">Kenya Office &amp; Contact</h4>
          <ul className="space-y-2.5 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-white">📍</span>
              <span>Opp. Mara Frontier Hotel, Narok, Kenya</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">📞</span>
              <a href={`tel:${PHONE_TEL}`} className="hover:text-white">
                {PHONE_PRIMARY}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">📞</span>
              <a href="tel:+254794676434" className="hover:text-white">
                {PHONE_SECONDARY}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">✉️</span>
              <a href="mailto:artesiandrillingltd@gmail.com" className="hover:text-white">
                artesiandrillingltd@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-white">💬</span>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: GREEN }}
              >
                Direct WhatsApp Chat
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 text-base">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400 mb-4">
            <li>
              <a href="/" onClick={(e) => handleNavClick(e, "home")} className="hover:text-white">
                • Home Overview
              </a>
            </li>
            <li>
              <a
                href="/services"
                onClick={(e) => handleNavClick(e, "services")}
                className="hover:text-white"
              >
                • All 6 Drilling Services
              </a>
            </li>
            <li>
              <a href="/about" onClick={(e) => handleNavClick(e, "about")} className="hover:text-white">
                • About Artesian Drilling
              </a>
            </li>
            <li>
              <a
                href="/contact"
                onClick={(e) => handleNavClick(e, "contact")}
                className="hover:text-white"
              >
                • Contact Head Office
              </a>
            </li>
          </ul>
          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="block w-full text-center py-2.5 text-xs font-bold uppercase rounded shadow"
            style={{ backgroundColor: GOLD, color: NAVY_DARK }}
          >
            Get Free Site Quote
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-gray-400 px-6">
        <p>
          Copyright &copy; {new Date().getFullYear()} Artesian Drilling Limited. All Rights
          Reserved.
        </p>
        <p className="mt-1 text-gray-500">
          Specialist borehole drilling contractor, hydrogeological surveys &amp; solar water
          installations in Kenya.
        </p>
        <div className="mt-3 flex items-center justify-center gap-4 text-gray-500">
          <button
            onClick={() => handleNavClick({ preventDefault: () => {} }, "privacy")}
            className="hover:text-gray-300 transition-colors underline"
          >
            Privacy Policy
          </button>
          <span>·</span>
          <button
            onClick={() => handleNavClick({ preventDefault: () => {} }, "terms")}
            className="hover:text-gray-300 transition-colors underline"
          >
            Terms of Service
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- Form Component ---------------- */
const API_BASE = import.meta?.env?.VITE_API_BASE ?? "";

function QuoteAndFaq({ faqs, defaultService = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    project: defaultService || "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (defaultService) {
      setForm((f) => ({ ...f, project: defaultService }));
    }
  }, [defaultService]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE}/api/quote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(
          (data.errors && data.errors.join(" ")) || data.error || "Something went wrong."
        );
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || "Couldn't reach the server. Please call or WhatsApp us directly.");
    }
  };

  return (
    <section id="quote-section" className="max-w-7xl mx-auto px-6 py-14">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Quote Form */}
        <div className="p-8 sm:p-10 rounded-sm shadow-xl" style={{ backgroundColor: NAVY_DARK }}>
          <Eyebrow color={GOLD}>Direct Inquiries &amp; Site Assessment</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
            Request a Free Borehole Quotation
          </h2>
          <p className="text-gray-300 text-sm mb-6">
            Tell us about your property location and water requirements. Our drilling engineers will
            provide an itemized survey and drilling cost plan.
          </p>

          {status === "sent" ? (
            <div className="bg-emerald-900/60 border border-emerald-500 text-white p-6 rounded-sm">
              <h3 className="font-bold text-lg mb-2">Thank you! Request Received</h3>
              <p className="text-sm text-gray-200">
                Our drilling engineers are reviewing your specifications and will get in touch
                promptly. For immediate assistance, call{" "}
                <a href={`tel:${PHONE_TEL}`} className="font-bold underline text-white">
                  {PHONE_PRIMARY}
                </a>
                .
              </p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Kamau"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-400 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. name@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-400 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Service Type / County Location
                </label>
                <select
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  className="w-full bg-gray-900 border border-white/20 text-white px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-yellow-400"
                >
                  <option value="">Select a Drilling or Water Service...</option>
                  {servicesList.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Borehole Inquiries">General Borehole Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Project Details / Location Description
                </label>
                <textarea
                  placeholder="Describe your property (town/county), intended water use (domestic, irrigation, commercial), and expected timeline..."
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/20 text-white placeholder-gray-400 px-4 py-3 text-sm rounded-sm focus:outline-none focus:border-yellow-400 resize-none"
                />
              </div>

              {status === "error" && (
                <p className="text-xs font-semibold text-red-300 bg-red-950/60 p-3 rounded">
                  {errorMsg}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="flex-1 px-6 py-3.5 text-xs font-bold uppercase tracking-wider disabled:opacity-60 rounded-sm shadow"
                  style={{ backgroundColor: GOLD, color: NAVY_DARK }}
                >
                  {status === "sending" ? "SUBMITTING QUOTE..." : "SUBMIT QUOTE REQUEST"}
                </button>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 text-xs font-bold text-white rounded-sm text-center flex items-center justify-center gap-2"
                  style={{ backgroundColor: GREEN }}
                >
                  <span>💬</span> WhatsApp Direct
                </a>
              </div>
            </form>
          )}
        </div>

        {/* FAQs */}
        <div>
          <Eyebrow color={GOLD}>Knowledge &amp; FAQ</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: NAVY }}>
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Detailed answers about hydrogeological surveys, drilling permits, project timelines, and
            pumping system choices.
          </p>
          <FaqList items={faqs} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- DEDICATED SERVICES PAGE ---------------- */
function ServicesPage({ setPage }) {
  const [selectedService, setSelectedService] = useState("");

  const handleInquire = (serviceTitle) => {
    setSelectedService(serviceTitle);
    const formEl = document.getElementById("quote-section");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white">
      <PageHero
        title="Borehole Drilling & Water Engineering Services in Kenya"
        subtitle="Complete turnkey groundwater solutions: hydrogeological survey, rotary drilling, test pumping, casing, solar water pumps, and elevated storage tanks."
        breadcrumb="Services"
      />

      {/* Services Subnav / Quick Jump */}
      <div className="bg-gray-100 border-b border-gray-200 py-4 px-6 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto text-xs font-bold whitespace-nowrap py-1">
          <span className="text-gray-500 uppercase tracking-wider">Quick Jump:</span>
          {servicesList.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 rounded bg-white hover:bg-gray-200 text-gray-800 border border-gray-300 transition-colors"
            >
              {s.title.split("&")[0].trim()}
            </a>
          ))}
        </div>
      </div>

      {/* The 6 Core Services - Detailed Catalog */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        <div className="text-center max-w-3xl mx-auto">
          <Eyebrow color={GOLD}>Our Specialized Offerings</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
            Comprehensive Groundwater &amp; Water Supply Services
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-3">
            Every borehole project requires careful engineering, high-grade equipment, and
            regulatory compliance. Below is our complete catalog of specialized services offered
            across all 47 counties in Kenya.
          </p>
        </div>

        {servicesList.map((s, idx) => (
          <div
            key={s.id}
            id={s.id}
            className={`grid lg:grid-cols-12 gap-10 items-center p-8 sm:p-10 border border-gray-200 rounded-sm shadow-sm ${
              idx % 2 === 1 ? "bg-gray-50" : "bg-white"
            }`}
          >
            {/* Image Column */}
            <div className={`lg:col-span-5 ${idx % 2 === 1 ? "lg:order-2" : ""}`}>
              <div className="aspect-[4/3] rounded-sm overflow-hidden bg-gray-200 shadow-md relative">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src.endsWith(".webp")) {
                      e.currentTarget.src = e.currentTarget.src.replace(/\.webp$/, ".jpeg");
                    }
                  }}
                  className="w-full h-full object-cover"
                />
                <span
                  className="absolute top-3 left-3 px-3 py-1 text-xs font-extrabold uppercase rounded shadow"
                  style={{ backgroundColor: NAVY, color: GOLD }}
                >
                  {s.badge}
                </span>
              </div>
            </div>

            {/* Content Column */}
            <div className={`lg:col-span-7 ${idx % 2 === 1 ? "lg:order-1" : ""}`}>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ backgroundColor: NAVY }}
                >
                  {idx + 1}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Specialized Service
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-2" style={{ color: NAVY }}>
                {s.title}
              </h3>
              <p className="text-sm font-semibold mb-4" style={{ color: "#a87103" }}>
                {s.subtitle}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">{s.desc}</p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-white p-4 rounded border border-gray-200 text-xs">
                {s.specs.map((sp) => (
                  <div key={sp.label}>
                    <span className="text-gray-500 block">{sp.label}</span>
                    <span className="font-bold text-gray-900">{sp.val}</span>
                  </div>
                ))}
              </div>

              {/* What's Included */}
              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                  What This Service Includes:
                </h4>
                <ul className="grid sm:grid-cols-2 gap-2 text-xs text-gray-700">
                  {s.includes.map((inc) => (
                    <li key={inc} className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: GOLD }}>
                        ✓
                      </span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => handleInquire(s.title)}
                  className="px-6 py-3 text-xs font-bold uppercase rounded shadow"
                  style={{ backgroundColor: GOLD, color: NAVY_DARK }}
                >
                  Inquire for This Service →
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(
                    `Hello Artesian Drilling, I need a quotation for: ${s.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 text-xs font-bold text-white rounded flex items-center gap-1.5"
                  style={{ backgroundColor: GREEN }}
                >
                  <span>💬</span> WhatsApp Inquiry
                </a>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Step-by-Step Borehole Drilling Process */}
      <section className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <Eyebrow color={GOLD}>Execution Methodology</Eyebrow>
            <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
              Our 6-Step Borehole Drilling Process
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              From site survey to pure running water, we deliver transparent project management at
              every milestone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Hydrogeological Survey",
                desc: "Resistivity scanning identifies underground aquifer layers, estimated yield, and optimal drilling coordinates. WARMA report generated.",
              },
              {
                step: "02",
                title: "Permits & WARMA Approvals",
                desc: "We file the Water Resources Authority (WARMA/WRA) drilling authorization and NEMA Environmental Impact Assessment (EIA) clearance.",
              },
              {
                step: "03",
                title: "Rotary Rig Mobilization & Drilling",
                desc: "Heavy-duty rotary rigs drill using air percussion hammers or mud drilling, logging geological strata samples every 2 meters.",
              },
              {
                step: "04",
                title: "Casing & Gravel Packing",
                desc: "Installation of heavy-duty slotted and plain casing pipes surrounded by inert graded gravel pack to prevent silting.",
              },
              {
                step: "05",
                title: "24-Hour Test Pumping",
                desc: "Continuous yield testing establishes exact dynamic water yield (m³/hr), recovery rate, and static water level.",
              },
              {
                step: "06",
                title: "Solar Pump & Tower Commissioning",
                desc: "Installation of EPRA-compliant solar or submersible pump systems, connection to water towers, and water potability testing.",
              },
            ].map((st) => (
              <div
                key={st.step}
                className="bg-white p-6 border border-gray-200 rounded-sm shadow-sm hover:border-gray-400 transition-colors"
              >
                <span
                  className="text-3xl font-black block mb-2"
                  style={{ color: GOLD }}
                >
                  {st.step}
                </span>
                <h3 className="font-bold text-base mb-2" style={{ color: NAVY }}>
                  {st.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Cost Factors Transparency */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="p-8 sm:p-12 border border-gray-200 rounded-sm bg-white shadow-sm">
          <Eyebrow color={GOLD}>Pricing Transparency</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: NAVY }}>
            How Much Does Borehole Drilling Cost in Kenya?
          </h2>
          <div className="space-y-4 text-sm text-gray-700 leading-relaxed max-w-4xl">
            <p>
              Borehole drilling costs in Kenya are calculated on an itemized basis to prevent
              overcharging. The total investment is determined by:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3 pl-2">
              <li className="flex items-start gap-2">
                <span className="font-bold" style={{ color: GOLD }}>•</span>
                <span><strong>Survey &amp; Permits:</strong> Hydrogeological survey report, WARMA drilling permit &amp; NEMA EIA clearance.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold" style={{ color: GOLD }}>•</span>
                <span><strong>Per-Meter Drilling:</strong> Rotary drilling depth (typically between 100m to 250m depending on the aquifer).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold" style={{ color: GOLD }}>•</span>
                <span><strong>Casings:</strong> High-grade Class 9/10 uPVC or heavy mild steel casing pipes and screen slots.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold" style={{ color: GOLD }}>•</span>
                <span><strong>Pumping System:</strong> Solar-powered submersible pump (zero electricity bills) vs electric grid pump.</span>
              </li>
            </ul>
            <p className="pt-2">
              We provide transparent, fixed-price contracts with no unexpected surprise costs. Contact
              us with your location for a fast, free estimate.
            </p>
          </div>
        </div>
      </section>

      {/* Services Quote Form & FAQ */}
      <QuoteAndFaq faqs={servicesFaqs} defaultService={selectedService} />
    </div>
  );
}

/* ---------------- HOMEPAGE ---------------- */
function HomePage({ setPage }) {
  return (
    <>
      {/* Hero Section */}
      <div className="relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImg}')` }}
        />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,31,51,0.85)" }} />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 pt-10 pb-32 sm:pb-44">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-white mb-4 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: GREEN }} />
              WARMA &amp; NEMA Compliant Borehole Contractors
            </div>

            <h1
              className="font-extrabold leading-[1.05] mb-4 text-white"
              style={{ fontSize: "clamp(2.3rem, 6.5vw, 4.5rem)" }}
            >
              Borehole Drilling
              <br />
              <span style={{ color: GOLD }}>Services in Kenya</span>
            </h1>

            <p className="text-gray-200 max-w-3xl mb-8 leading-relaxed text-base sm:text-lg">
              <strong>Artesian Drilling Limited</strong> is Kenya's premier water contractor
              providing professional borehole drilling, hydrogeological surveys, solar water pump
              installations, and elevated water towers for farms, homes, schools, and industries.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setPage("contact")}
                className="px-8 py-4 font-bold text-sm tracking-wide rounded-sm shadow-md"
                style={{ backgroundColor: GOLD, color: NAVY_DARK }}
              >
                REQUEST A FREE QUOTE
              </button>
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-7 py-4 font-bold text-sm text-white rounded-sm flex items-center gap-2"
                style={{ backgroundColor: GREEN }}
              >
                <span>💬</span> WHATSAPP INQUIRY
              </a>
              <button
                onClick={() => setPage("services")}
                className="px-7 py-4 font-bold text-sm text-white border-2 border-white/80 rounded-sm hover:bg-white/10"
              >
                EXPLORE ALL 6 SERVICES →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Highlight Panel */}
      <section className="max-w-7xl mx-auto px-6 -mt-24 sm:-mt-32 relative z-20 pb-16">
        <div className="grid md:grid-cols-2 shadow-2xl rounded-sm overflow-hidden">
          <div className="p-10 sm:p-12" style={{ backgroundColor: GOLD }}>
            <Eyebrow>Trusted Drilling Partner</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4" style={{ color: NAVY }}>
              Trusted Borehole Drilling Experts in Kenya
            </h2>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#2c3b56" }}>
              With modern rotary drilling rigs, licensed hydrogeologists, and 10+ years of proven
              field experience across Kenya, we deliver safe, high-yielding, and long-lasting
              boreholes. From obtaining required WARMA permits to test pumping and commissioning
              solar pumps, we handle your entire project from start to finish.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setPage("contact")}
                className="px-6 py-3 text-sm font-bold text-white rounded-sm shadow"
                style={{ backgroundColor: NAVY_DARK }}
              >
                BOOK SITE SURVEY
              </button>
              <a
                href={`tel:${PHONE_TEL}`}
                className="text-sm font-bold underline"
                style={{ color: NAVY }}
              >
                Call {PHONE_PRIMARY}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 bg-white">
            <div className="p-8 sm:p-10 border-b border-r border-gray-200 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-black" style={{ color: NAVY }}>
                512+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                Successfully completed borehole projects
              </p>
            </div>
            <div className="p-8 sm:p-10 border-b border-gray-200 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-black" style={{ color: NAVY }}>
                10+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                Years of drilling experience across Kenya
              </p>
            </div>
            <div className="p-8 sm:p-10 border-r border-gray-200 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-black" style={{ color: NAVY }}>
                1,000+
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                Solar &amp; electric water pump installations
              </p>
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-black" style={{ color: NAVY }}>
                100%
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">
                Client satisfaction &amp; quality guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Overview */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
          <div>
            <Eyebrow color={GOLD}>Comprehensive Water Solutions</Eyebrow>
            <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
              Our Borehole Drilling &amp; Supply Services
            </h2>
            <p className="text-gray-600 text-sm mt-2 max-w-2xl">
              Engineered for residential homes, agriculture &amp; irrigation, educational
              institutions, and commercial operations in Kenya.
            </p>
          </div>
          <button
            onClick={() => setPage("services")}
            className="px-6 py-3 text-xs sm:text-sm font-bold uppercase rounded shadow"
            style={{ backgroundColor: GOLD, color: NAVY_DARK }}
          >
            VIEW DEDICATED SERVICE PAGE →
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((s) => (
            <div
              key={s.id}
              className="border border-gray-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                <img
                  src={s.img}
                  alt={s.alt}
                  loading="lazy"
                  onError={(e) => {
                    if (e.currentTarget.src.endsWith(".webp")) {
                      e.currentTarget.src = e.currentTarget.src.replace(/\.webp$/, ".jpeg");
                    }
                  }}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <span
                  className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold uppercase rounded"
                  style={{ backgroundColor: NAVY, color: "white" }}
                >
                  {s.badge}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{s.desc}</p>
                </div>
                <button
                  onClick={() => setPage("services")}
                  className="text-xs font-bold uppercase tracking-wider text-left flex items-center gap-1"
                  style={{ color: GOLD }}
                >
                  View Service Details <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compliance Badges */}
      <AccreditationsSection />

      {/* Regional Service Areas */}
      <RegionalCoverageSection setPage={setPage} />

      {/* Sustainability and Best Practices Split */}
      <section className="grid md:grid-cols-2">
        <div
          className="relative p-10 sm:p-16 flex flex-col justify-center min-h-[440px] bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImg}')` }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,31,51,0.78)" }} />
          <div className="relative z-10 max-w-md">
            <Eyebrow color={GOLD}>Environmental Care</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 leading-snug">
              Committed To Safe, Sustainable Groundwater
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed mb-8">
              At <strong>Artesian Drilling Limited</strong>, we protect local aquifers through
              proper borehole sanitization, sanitary seals, accurate gravel packing, and strict
              adherence to NEMA environmental guidelines.
            </p>
            <button
              onClick={() => setPage("contact")}
              className="inline-block px-6 py-3 text-sm font-bold rounded-sm shadow"
              style={{ backgroundColor: GOLD, color: NAVY_DARK }}
            >
              SPEAK TO AN ENGINEER
            </button>
          </div>
        </div>

        <div
          className="relative p-10 sm:p-16 flex flex-col justify-center min-h-[440px] bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImg}')` }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(244,185,66,0.92)" }} />
          <div className="relative z-10 max-w-md">
            <Eyebrow>Quality Standards</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5" style={{ color: NAVY }}>
              We Follow National Drilling Best Practices
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#2c3b56" }}>
              Every borehole is drilled with precision, utilizing appropriate bit sizes, certified
              casings, and extensive yield testing to guarantee continuous water supply.
            </p>
            <ul className="space-y-4">
              {[
                ["♻️", "Aquifer Protection & Sanitization"],
                ["⏱️", "On-Time Project Delivery"],
                ["💻", "Advanced Geophysical Resistivity Surveys"],
                ["🔧", "Certified Pump Installation & Testing"],
              ].map(([icon, label]) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">
                    {icon}
                  </span>
                  <span className="font-bold text-sm sm:text-base" style={{ color: NAVY }}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Latest Completed Projects */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <Eyebrow color={GOLD}>Proven Proof of Work</Eyebrow>
            <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
              Our Latest Completed Borehole Projects
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Real project examples with surveyed depths and verified water yields across Kenya.
            </p>
          </div>
          <button
            onClick={() => setPage("contact")}
            className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-sm shadow"
            style={{ backgroundColor: GOLD, color: NAVY_DARK }}
          >
            REQUEST SIMILAR PROJECT
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {works.map((w) => (
            <div
              key={w.title}
              className="relative aspect-square overflow-hidden rounded-sm group shadow-md"
            >
              <img
                src={w.img}
                alt={w.alt}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src.endsWith(".webp")) {
                    e.currentTarget.src = e.currentTarget.src.replace(/\.webp$/, ".jpeg");
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: GOLD, color: NAVY_DARK }}
                  >
                    {w.depth}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-300">{w.yield}</span>
                </div>
                <p className="font-bold text-base leading-snug">{w.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quote Form & FAQs */}
      <QuoteAndFaq faqs={homeFaqs} />
    </>
  );
}

/* ---------------- ABOUT PAGE ---------------- */
function AboutPage({ setPage }) {
  return (
    <>
      <PageHero
        title="About Artesian Drilling Ltd – Borehole Drilling Contractors Kenya"
        subtitle="A licensed groundwater engineering company committed to reliable, safe, and cost-effective water borehole solutions across Kenya."
        breadcrumb="About Us"
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="max-w-4xl space-y-6 text-gray-600 leading-relaxed mb-16">
          <Eyebrow color={GOLD}>Company Profile</Eyebrow>
          <h2 className="text-2xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>
            Reliable Groundwater Solutions Delivered by Experienced Professionals
          </h2>
          <p className="text-base sm:text-lg">
            <strong>Artesian Drilling Limited</strong> is a leading water well drilling and
            hydrogeological exploration contractor headquartered in Narok, Kenya. For over a decade,
            we have delivered sustainable, clean water solutions to private landowners, commercial
            farms, educational institutions, County Governments, and community organizations.
          </p>
          <p>
            We manage every stage of the borehole lifecycle—from initial hydrogeological
            geophysical exploration and statutory WARMA/NEMA permit acquisition to deep rotary
            drilling, casing installation, 24-hour yield testing, and high-efficiency solar water
            pump commissioning.
          </p>
          <p>
            Our core mission is straightforward: to provide reliable, affordable, and sustainable
            clean water access across Kenya through superior geological science, modern drilling
            technology, and transparent customer service.
          </p>

          <h3 className="text-xl sm:text-2xl font-extrabold pt-4" style={{ color: NAVY }}>
            Our Equipment & Technical Capabilities
          </h3>
          <p>
            Artesian Drilling operates a modern fleet of heavy-duty rotary drill rigs capable of
            penetrating all Kenyan geological formations — from soft alluvial soils to hard volcanic
            basalt and granite. Our rigs are equipped with air percussion hammers and tri-cone
            roller bits rated for depths exceeding 350 metres. Each borehole is drilled and cased
            to Kenya Bureau of Standards (KEBS) and Water Resources Authority (WRA) specifications,
            using Class 9 and Class 10 uPVC or heavy mild steel casings to ensure borehole
            longevity exceeding 30 years.
          </p>
          <p>
            Our geophysical survey team uses advanced resistivity meters and vertical electrical
            sounding (VES) equipment to locate underground aquifers with precision before a single
            metre of ground is drilled. This scientific approach eliminates guesswork, reduces
            client risk, and ensures that every borehole is drilled at the optimal location for
            maximum water yield.
          </p>

          <h3 className="text-xl sm:text-2xl font-extrabold pt-4" style={{ color: NAVY }}>
            Regulatory Compliance & Licensing
          </h3>
          <p>
            All borehole drilling in Kenya requires specific permits from the Water Resources
            Authority (WARMA/WRA) and an Environmental Impact Assessment (EIA) clearance from the
            National Environment Management Authority (NEMA). Artesian Drilling is fully
            authorized to operate under these regulations and guides our clients through the entire
            permitting process — from hydrogeological survey report preparation to submission and
            approval of WARMA drilling authorizations.
          </p>
          <p>
            We also conduct government-accredited water quality laboratory testing to verify
            potability, mineral composition, and compliance with WHO and Kenya drinking water
            standards before handing over completed boreholes.{" "}
            <button
              onClick={() => setPage("services")}
              className="underline font-semibold"
              style={{ color: NAVY }}
            >
              View our full range of drilling and water engineering services →
            </button>
          </p>

          <h3 className="text-xl sm:text-2xl font-extrabold pt-4" style={{ color: NAVY }}>
            Serving All 47 Counties Across Kenya
          </h3>
          <p>
            From our Narok headquarters, we mobilize drilling rigs rapidly across the Rift Valley,
            Nairobi Metropolitan Area, Kajiado, Nakuru, Bomet, Kiambu, Machakos, and beyond. Our
            extensive field experience includes projects for smallholder farms, large-scale
            agricultural estates, schools, hospitals, community water projects funded by NGOs, and
            County Government infrastructure programs. Whether you need a single residential
            borehole or a large-scale community water supply scheme, Artesian Drilling has the
            equipment, experience, and expertise to deliver.
          </p>
          <p>
            Ready to get started?{" "}
            <button
              onClick={() => setPage("contact")}
              className="underline font-semibold"
              style={{ color: NAVY }}
            >
              Contact our drilling engineers for a free site assessment and quotation.
            </button>
          </p>
        </div>


        {/* Features */}
        <div className="grid sm:grid-cols-3 gap-8 mb-16">
          {aboutFeatures.map((f) => (
            <div
              key={f.title}
              className="p-8 border border-gray-200 rounded-sm shadow-sm bg-white hover:border-gray-300 transition-colors"
            >
              <h3 className="font-bold text-lg mb-3" style={{ color: NAVY }}>
                {f.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16 text-center sm:text-left p-8 bg-gray-50 border border-gray-200 rounded-sm">
          {aboutStats.map((s) => (
            <div key={s.l}>
              <div className="text-3xl sm:text-5xl font-black" style={{ color: NAVY }}>
                {s.n}
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 font-medium">{s.l}</p>
            </div>
          ))}
        </div>

        {/* Why Communities Trust Us */}
        <div className="mb-10">
          <Eyebrow color={GOLD}>Trust &amp; Integrity</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: NAVY }}>
            Why Property Owners and Communities Trust Artesian Drilling
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustItems.map((t) => (
              <div
                key={t}
                className="p-6 flex items-center gap-3 border border-gray-200 rounded-sm bg-white shadow-sm"
              >
                <span className="text-lg" style={{ color: GOLD }}>
                  ✔
                </span>
                <span className="font-bold text-sm" style={{ color: NAVY }}>
                  {t}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AccreditationsSection />
    </>
  );
}

/* ---------------- CONTACT PAGE ---------------- */
function ContactPage({ setPage }) {
  const mapSrc =
    "https://maps.google.com/maps?q=Opp.%20Mara%20frontier%20hotel%20Narok.&t=m&z=13&output=embed&iwloc=near";

  return (
    <>
      <PageHero
        title="Contact Artesian Drilling Kenya – Narok Office & Site Quotes"
        subtitle="Get in touch with our hydrogeological and borehole drilling engineers. Inquire about site surveys, pricing, permits, and pump installations across Kenya."
        breadcrumb="Contact"
      />

      <section className="max-w-7xl mx-auto px-6 py-16">
        {/* Site Work Photos */}
        <div className="grid sm:grid-cols-2 gap-6 mb-16">
          {contactImgs.map((img) => (
            <div
              key={img.src}
              className="aspect-[4/3] overflow-hidden rounded-sm bg-gray-100 shadow-md"
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src.endsWith(".webp")) {
                    e.currentTarget.src = e.currentTarget.src.replace(/\.webp$/, ".jpeg");
                  }
                }}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Contact Details & Map */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div
            className="p-8 sm:p-10 rounded-sm shadow-xl text-white flex flex-col justify-between"
            style={{ backgroundColor: NAVY_DARK }}
          >
            <div>
              <Eyebrow color={GOLD}>Head Office &amp; Inquiries</Eyebrow>
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-white">
                Get In Touch With Our Team
              </h2>

              <div className="space-y-6 text-sm text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-xl">📍</span>
                  <div>
                    <p className="font-bold text-white">Physical Location</p>
                    <p>Opposite Mara Frontier Hotel, Narok Town, Kenya</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Geo Coordinates: -1.0788° S, 35.8601° E
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">📞</span>
                  <div>
                    <p className="font-bold text-white">Call / SMS</p>
                    <p>
                      <a href={`tel:${PHONE_TEL}`} className="hover:underline text-white">
                        {PHONE_PRIMARY}
                      </a>
                    </p>
                    <p>
                      <a href="tel:+254794676434" className="hover:underline text-white">
                        {PHONE_SECONDARY}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">✉️</span>
                  <div>
                    <p className="font-bold text-white">Email Address</p>
                    <p>
                      <a
                        href="mailto:artesiandrillingltd@gmail.com"
                        className="hover:underline text-white"
                      >
                        artesiandrillingltd@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-xl">🕒</span>
                  <div>
                    <p className="font-bold text-white">Business Hours</p>
                    <p>Monday – Saturday: 8:00 AM – 6:00 PM</p>
                    <p className="text-xs text-gray-400">Emergency response available on request</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 text-xs font-bold text-white rounded-sm text-center flex items-center justify-center gap-2"
                style={{ backgroundColor: GREEN }}
              >
                <span>💬</span> Chat on WhatsApp
              </a>
              <a
                href={`tel:${PHONE_TEL}`}
                className="px-6 py-3.5 text-xs font-bold uppercase rounded-sm text-center shadow"
                style={{ backgroundColor: GOLD, color: NAVY_DARK }}
              >
                Call Now
              </a>
            </div>
          </div>

          <div className="min-h-[360px] overflow-hidden rounded-sm shadow-md border border-gray-200">
            <iframe
              title="Artesian Drilling location map - Narok Kenya"
              src={mapSrc}
              className="w-full h-full min-h-[360px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Embedded Quote Form on Contact Page */}
        {/* Outgoing links — prevent dead-end page for crawlers */}
        <div className="mb-12 p-8 bg-gray-50 border border-gray-200 rounded-sm">
          <Eyebrow color={GOLD}>Explore Our Services</Eyebrow>
          <h2 className="text-xl sm:text-2xl font-extrabold mb-4" style={{ color: NAVY }}>
            Our Full Range of Borehole Drilling &amp; Water Engineering Services
          </h2>
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            Artesian Drilling provides end-to-end groundwater solutions across Kenya. From
            hydrogeological surveys and WARMA permit acquisition to deep rotary borehole drilling,
            solar pump installations, and elevated water tower construction — we handle every
            stage of your water supply project.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setPage("services")}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-sm shadow"
              style={{ backgroundColor: GOLD, color: NAVY_DARK }}
            >
              View All 6 Drilling Services →
            </button>
            <button
              onClick={() => setPage("about")}
              className="px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-sm border-2 text-gray-700 hover:bg-gray-100"
              style={{ borderColor: NAVY }}
            >
              About Artesian Drilling
            </button>
          </div>
        </div>
        <QuoteAndFaq faqs={homeFaqs} />
      </section>
    </>
  );
}

/* ---------------- CRO Floating & Sticky Bar ---------------- */
function FloatingWhatsApp() {
  return (
    <aside
      aria-label="Contact via WhatsApp"
      className="fixed bottom-20 md:bottom-8 right-6 z-40 flex items-center gap-2 group"
    >
      <span className="hidden sm:inline-block bg-white text-gray-800 text-xs font-bold py-1.5 px-3 rounded-full shadow-lg border border-gray-200 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Chat with us on WhatsApp
      </span>
      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Artesian Drilling on WhatsApp"
        className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-transform"
        style={{ backgroundColor: GREEN }}
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.181-.076.355.101.173.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.274.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.124.557 4.12 1.533 5.862l-1.633 5.966 6.136-1.609c1.674.912 3.587 1.431 5.614 1.431 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
    </aside>
  );
}

function MobileStickyBar({ setPage }) {
  return (
    <nav
      aria-label="Quick contact mobile menu"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 shadow-2xl flex items-center justify-around py-2 px-3"
      style={{ backgroundColor: NAVY_DARK }}
    >
      <a
        href={`tel:${PHONE_TEL}`}
        className="flex flex-col items-center text-[11px] font-bold text-white py-1 px-3"
      >
        <span className="text-base mb-0.5">📞</span>
        <span>Call Now</span>
      </a>

      <a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center text-[11px] font-bold text-white py-1 px-3"
        style={{ color: GREEN }}
      >
        <span className="text-base mb-0.5">💬</span>
        <span>WhatsApp</span>
      </a>

      <button
        onClick={() => {
          setPage("contact");
          const el = document.getElementById("quote-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        className="flex flex-col items-center text-[11px] font-bold py-1 px-3 rounded"
        style={{ color: GOLD }}
      >
        <span className="text-base mb-0.5">📝</span>
        <span>Get Quote</span>
      </button>
    </nav>
  );
}

/* ---------------- PRIVACY POLICY PAGE ---------------- */
function PrivacyPage({ setPage }) {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        subtitle="How Artesian Drilling Limited collects, uses, and protects your personal information."
        breadcrumb="Privacy Policy"
      />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8 text-gray-700 leading-relaxed text-sm">
          <p className="text-xs text-gray-400">Last updated: 14 September 2026</p>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>1. Who We Are</h2>
            <p>
              Artesian Drilling Limited ("we", "us", or "our") is a borehole drilling and water
              engineering contractor headquartered at Opposite Mara Frontier Hotel, Narok, Kenya.
              We operate this website at <strong>artesiandrilling.com</strong>. If you have
              questions about this policy, contact us at{" "}
              <a href="mailto:artesiandrillingltd@gmail.com" className="underline" style={{ color: NAVY }}>
                artesiandrillingltd@gmail.com
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>2. Information We Collect</h2>
            <p>We only collect information you voluntarily provide via our contact/quote form:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Service type / county location</li>
              <li>Project details or message</li>
            </ul>
            <p className="mt-3">
              We do not collect payment information, government IDs, or sensitive personal data.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>3. How We Use Your Information</h2>
            <p>We use your submitted information exclusively to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Respond to your borehole drilling enquiry or quotation request</li>
              <li>Provide site assessment and project planning information</li>
              <li>Contact you regarding your submitted project</li>
            </ul>
            <p className="mt-3">
              We do not sell, rent, or trade your personal information to any third party.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>4. Analytics</h2>
            <p>
              This website uses Google Analytics 4 (GA4) to understand how visitors interact with
              our pages. GA4 collects anonymised data such as pages visited, session duration, and
              device type. No personally identifiable information is sent to Google Analytics.
              You may opt out by installing the{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: NAVY }}
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>5. Cookies</h2>
            <p>
              Our website may use essential cookies required for basic functionality. Google Analytics
              also sets cookies for measurement purposes. By continuing to use this website you
              consent to their use.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>6. Data Retention</h2>
            <p>
              Enquiry form submissions are retained only as long as necessary to respond to your
              request, and are then securely deleted. We do not maintain mailing lists without
              your explicit consent.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>7. Your Rights</h2>
            <p>
              You have the right to request access to, correction of, or deletion of any personal
              data we hold about you. To exercise these rights, email us at{" "}
              <a href="mailto:artesiandrillingltd@gmail.com" className="underline" style={{ color: NAVY }}>
                artesiandrillingltd@gmail.com
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. The "Last updated" date at the top
              of this page will reflect any changes. Continued use of the website after changes
              constitutes acceptance of the updated policy.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-4">
            <button
              onClick={() => setPage("contact")}
              className="px-6 py-3 text-xs font-bold uppercase rounded-sm shadow"
              style={{ backgroundColor: GOLD, color: NAVY_DARK }}
            >
              Contact Us →
            </button>
            <button
              onClick={() => setPage("home")}
              className="px-6 py-3 text-xs font-bold uppercase rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Back to Homepage
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- TERMS OF SERVICE PAGE ---------------- */
function TermsPage({ setPage }) {
  return (
    <>
      <PageHero
        title="Terms of Service"
        subtitle="The terms and conditions governing your use of the Artesian Drilling Limited website and services."
        breadcrumb="Terms of Service"
      />
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="space-y-8 text-gray-700 leading-relaxed text-sm">
          <p className="text-xs text-gray-400">Last updated: 14 September 2026</p>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website (<strong>artesiandrilling.com</strong>), you
              accept and agree to be bound by these Terms of Service. If you do not agree, please
              do not use this website.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>2. Website Use</h2>
            <p>
              This website is provided for general informational purposes about Artesian Drilling
              Limited's services. You may use it to request quotations, learn about our services,
              and contact our team. You must not use this website for any unlawful purpose or in
              any manner that could damage, disable, or impair it.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>3. Quotations and Service Agreements</h2>
            <p>
              Enquiries and quote requests submitted through this website are not binding contracts.
              All project quotations are provided following a formal site assessment. A project
              commences only upon execution of a written agreement between Artesian Drilling
              Limited and the client.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>4. Intellectual Property</h2>
            <p>
              All content on this website, including text, images, logos, and layout, is the
              property of Artesian Drilling Limited. You may not reproduce, distribute, or use any
              content without prior written permission.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>5. Limitation of Liability</h2>
            <p>
              The information on this website is provided in good faith for general guidance only.
              Artesian Drilling Limited shall not be liable for any loss or damage arising from
              reliance on website content. All drilling and engineering work is governed by a
              separate written contract.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>6. External Links</h2>
            <p>
              This website may contain links to external websites (e.g. WhatsApp, Google Maps).
              We are not responsible for the content or privacy practices of those websites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>7. Governing Law</h2>
            <p>
              These terms are governed by the laws of Kenya. Any disputes shall be subject to the
              exclusive jurisdiction of the Kenyan courts.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>8. Changes to Terms</h2>
            <p>
              We reserve the right to update these terms at any time. The "Last updated" date at
              the top of this page indicates the most recent revision.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-extrabold mb-3" style={{ color: NAVY }}>9. Contact</h2>
            <p>
              Questions about these terms? Email{" "}
              <a href="mailto:artesiandrillingltd@gmail.com" className="underline" style={{ color: NAVY }}>
                artesiandrillingltd@gmail.com
              </a>{" "}
              or call{" "}
              <a href="tel:+254742879962" className="underline" style={{ color: NAVY }}>
                +254 742 879 962
              </a>.
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200 flex flex-wrap gap-4">
            <button
              onClick={() => setPage("privacy")}
              className="px-6 py-3 text-xs font-bold uppercase rounded-sm border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setPage("home")}
              className="px-6 py-3 text-xs font-bold uppercase rounded-sm shadow"
              style={{ backgroundColor: GOLD, color: NAVY_DARK }}
            >
              Back to Homepage →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- App Shell & Router ---------------- */

function getPathPage() {
  if (typeof window === "undefined") return "home";
  const path = window.location.pathname.replace(/^\/+|\/+$/g, "").toLowerCase();
  if (["services", "about", "contact", "privacy", "terms"].includes(path)) return path;
  const hash = window.location.hash.replace("#", "").toLowerCase();
  if (["services", "about", "contact", "privacy", "terms"].includes(hash)) return hash;
  return "home";
}

export default function App() {
  const [page, setPageState] = useState(getPathPage);

  const setPage = (p) => {
    setPageState(p);
    if (typeof window !== "undefined") {
      const targetPath = p === "home" ? "/" : `/${p}`;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ page: p }, "", targetPath);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setPageState(getPathPage());
    };
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("hashchange", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("hashchange", handlePopState);
    };
  }, []);

  // GA4 Analytics initialisation (fires once on mount)
  useEffect(() => {
    const GA4_ID = import.meta?.env?.VITE_GA4_ID || "G-2SWH1NQSG0";
    if (!GA4_ID || document.querySelector(`script[data-ga4]`)) return;
    const s1 = document.createElement("script");
    s1.setAttribute("data-ga4", "1");
    s1.async = true;
    s1.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s1);
    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA4_ID, { page_path: window.location.pathname });
  }, []);

  // Synchronize all SEO meta tags dynamically per page
  useEffect(() => {
    const titles = {
      home: "Borehole Drilling Services in Kenya | Artesian Drilling Ltd",
      services: "Borehole Drilling & Hydrogeological Survey Services Kenya | Artesian Drilling Ltd",
      about: "About Artesian Drilling Ltd | Top Water Drilling Contractors Kenya",
      contact: "Contact Artesian Drilling Kenya | Narok Head Office & Free Quote",
      privacy: "Privacy Policy | Artesian Drilling Limited",
      terms: "Terms of Service | Artesian Drilling Limited",
    };

    const descriptions = {
      home: "Artesian Drilling provides reliable borehole drilling, hydrogeological surveys, and solar pump installations across Kenya. Get a free quote today.",
      services: "Explore all 6 specialized borehole drilling services: hydrogeological survey, rotary drilling, solar pump installation, water tower construction, and WARMA permits.",
      about: "Artesian Drilling Limited is a licensed water drilling contractor with 10+ years experience and 512+ completed borehole projects across Kenya.",
      contact: "Contact Artesian Drilling Limited in Narok, Kenya for borehole drilling quotes, hydrogeological site assessments, and solar pump pricing.",
      privacy: "Read the Privacy Policy for Artesian Drilling Limited, explaining how we collect, use, and protect your personal information.",
      terms: "Read the Terms of Service for Artesian Drilling Limited governing the use of our website and services.",
    };

    const canonicals = {
      home: "https://artesiandrilling.com/",
      services: "https://artesiandrilling.com/services",
      about: "https://artesiandrilling.com/about",
      contact: "https://artesiandrilling.com/contact",
      privacy: "https://artesiandrilling.com/privacy",
      terms: "https://artesiandrilling.com/terms",
    };

    const breadcrumbs = {
      home: null,
      services: [{ name: "Home", url: "https://artesiandrilling.com/" }, { name: "Services", url: "https://artesiandrilling.com/services" }],
      about: [{ name: "Home", url: "https://artesiandrilling.com/" }, { name: "About Us", url: "https://artesiandrilling.com/about" }],
      contact: [{ name: "Home", url: "https://artesiandrilling.com/" }, { name: "Contact", url: "https://artesiandrilling.com/contact" }],
      privacy: [{ name: "Home", url: "https://artesiandrilling.com/" }, { name: "Privacy Policy", url: "https://artesiandrilling.com/privacy" }],
      terms: [{ name: "Home", url: "https://artesiandrilling.com/" }, { name: "Terms of Service", url: "https://artesiandrilling.com/terms" }],
    };

    // Title
    if (titles[page]) document.title = titles[page];

    // Meta description
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && descriptions[page]) metaDesc.setAttribute("content", descriptions[page]);

    // Canonical
    let canonicalEl = document.querySelector('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement("link");
      canonicalEl.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalEl);
    }
    if (canonicals[page]) canonicalEl.setAttribute("href", canonicals[page]);

    // og:url
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl && canonicals[page]) ogUrl.setAttribute("content", canonicals[page]);

    // og:title
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && titles[page]) ogTitle.setAttribute("content", titles[page]);

    // twitter:title
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle && titles[page]) twTitle.setAttribute("content", titles[page]);

    // og:description
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && descriptions[page]) ogDesc.setAttribute("content", descriptions[page]);

    // twitter:description
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc && descriptions[page]) twDesc.setAttribute("content", descriptions[page]);

    // BreadcrumbList JSON-LD — inject/update per page
    const existingBreadcrumb = document.querySelector('script[data-breadcrumb]');
    if (existingBreadcrumb) existingBreadcrumb.remove();
    const crumbs = breadcrumbs[page];
    if (crumbs) {
      const bSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": crumbs.map((c, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "name": c.name,
          "item": c.url,
        })),
      };
      const sc = document.createElement("script");
      sc.setAttribute("type", "application/ld+json");
      sc.setAttribute("data-breadcrumb", "1");
      sc.textContent = JSON.stringify(bSchema);
      document.head.appendChild(sc);
    }

    // GA4 page_view event on SPA navigation
    if (window.gtag && canonicals[page]) {
      window.gtag("event", "page_view", { page_path: canonicals[page].replace("https://artesiandrilling.com", "") || "/" });
    }
  }, [page]);

  const pages = {
    home: <HomePage setPage={setPage} />,
    services: <ServicesPage setPage={setPage} />,
    about: <AboutPage setPage={setPage} />,
    contact: <ContactPage setPage={setPage} />,
    privacy: <PrivacyPage setPage={setPage} />,
    terms: <TermsPage setPage={setPage} />,
  };

  return (
    <div
      className="min-h-screen bg-white text-gray-800 flex flex-col"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}
    >
      <div style={{ backgroundColor: NAVY_DARK }}>
        <Header page={page} setPage={setPage} />
      </div>

      <main className="flex-grow">{pages[page]}</main>

      <Footer setPage={setPage} />
      <FloatingWhatsApp />
      <MobileStickyBar setPage={setPage} />
    </div>
  );
}
