import React, { useState } from "react";

const NAVY = "#1c2b45";
const NAVY_DARK = "#141f33";
const GOLD = "#f4b942";

/* ---------------- Content & images ----------------
 * Images point at /images/... — run download-images.sh (in the project
 * root) once to pull the real photos from artesiandrilling.com into
 * public/images, then these paths resolve locally. Until you do that,
 * swap these back to the live artesiandrilling.com URLs if you want to
 * preview with real photos immediately.
 * ---------------------------------------------------- */

const heroImg = "/images/hero.jpeg";

const services = [
  {
    title: "Hydrogeological Survey",
    desc: "We conduct professional site visits and hydrogeological surveys to determine the best drilling locations. Our experts analyze the land, water table, and soil conditions to ensure successful borehole projects.",
    img: "/images/service-hydrogeological-survey.jpeg",
  },
  {
    title: "Community Water Projects",
    desc: "We work closely with communities, institutions, and organizations to provide reliable water solutions. Our team manages large-scale borehole projects that support schools, villages, and public facilities.",
    img: "/images/service-community-water.jpeg",
  },
  {
    title: "Water Tower Construction",
    desc: "We design and construct strong and durable water towers for both steel and plastic tanks. These structures ensure proper water storage and distribution for homes, farms, and industries.",
    img: "/images/service-water-tower.jpeg",
  },
  {
    title: "Borehole Consultancy",
    desc: "We provide expert advice and technical guidance for all types of borehole projects. From planning to completion, we help clients make the right decisions for efficient and cost-effective water systems.",
    img: "/images/service-consultancy.jpeg",
  },
  {
    title: "Site Assessment & Project Planning",
    desc: "Our team evaluates land conditions, access, and drilling requirements to create an effective project plan. This ensures safe operations, proper equipment selection, and successful drilling outcomes.",
    img: "/images/service-site-assessment.jpeg",
  },
  {
    title: "Pump Installation & Water Supply",
    desc: "We supply and install submersible, solar, and manual hand pumps for boreholes. Our systems are designed to provide consistent and clean water supply for residential, agricultural, and commercial use.",
    img: "/images/service-pump-installation.jpeg",
  },
];

const works = [
  { title: "Community Borehole Project", img: services[0].img },
  { title: "Deep Borehole Drilling", img: services[1].img },
  { title: "School Water Supply System", img: services[4].img },
  { title: "Elevated Water Tower Installation", img: services[2].img },
];

const homeFaqs = [
  {
    q: "How do I know if my land has water for a borehole?",
    a: "We conduct a professional hydrogeological survey to assess the underground water potential. This survey helps determine the best drilling location and expected water yield.",
  },
  {
    q: "How long does it take to complete a borehole project?",
    a: "The timeline depends on the depth, soil conditions, and site accessibility. Most borehole drilling projects are completed within a few days, followed by pump installation and testing.",
  },
  {
    q: "Do you provide solar-powered pumping systems?",
    a: "Yes, we supply and install solar-powered water pumps along with submersible and manual hand pumps. Solar systems are ideal for areas without reliable electricity.",
  },
  {
    q: "What maintenance is required after drilling?",
    a: "Regular pump servicing and periodic water testing are recommended to ensure long-term performance and water quality. We offer maintenance and support services for our installations.",
  },
  {
    q: "Do you work with farms, homes, and institutions?",
    a: "Yes, we provide borehole drilling and water supply solutions for residential properties, farms, schools, industries, and community projects.",
  },
  {
    q: "Know more contact our team",
    a: "Contact our team for professional borehole drilling solutions — reach us on +254 742879962 / +254 794676434 or artesiandrillingltd@gmail.com.",
  },
];

const servicesFaqs = [
  {
    q: "How much does borehole drilling cost in Kenya?",
    a: "The cost of borehole drilling depends on several factors including location, drilling depth, ground conditions, and the type of pumping system required. A site survey helps determine the estimated project requirements.",
  },
  {
    q: "How long does borehole drilling take?",
    a: "The drilling timeline depends on the depth of the borehole and site conditions. Our team provides a project plan after evaluating the location.",
  },
  {
    q: "Do you install solar water pumps?",
    a: "Yes, we provide solar water pump installation together with borehole solutions.",
  },
];

const recentBlogs = [
  {
    title: "Borehole Drilling",
    desc: "Learn about the step-by-step process of borehole drilling, from site assessment to looking for water, covering companies, casings and grouting.",
    img: "/images/blog-borehole-drilling.jpeg",
  },
  {
    title: "Water Sanitation",
    desc: "Discover effective strategies for maintaining a borehole water system. This guide covers preventive maintenance, water quality assessment, common repair tasks and verification.",
    img: "/images/blog-water-sanitation.jpeg",
  },
  {
    title: "Solar Pump Systems",
    desc: "Explore the advantages of solar powered water pumping systems and water supply from boreholes. Ideal for off-grid applications, discover how solar technology has revolutionized pumping.",
    img: services[3].img,
  },
];

const aboutFeatures = [
  {
    title: "Professional Drilling Team",
    desc: "Experienced technicians and modern equipment ensure safe, accurate, and efficient borehole drilling projects.",
  },
  {
    title: "Proven Track Record",
    desc: "We have successfully completed projects for communities, schools, farms, and industries across the region.",
  },
  {
    title: "Cost-Effective Solutions",
    desc: "We provide high-quality water systems tailored to client needs at competitive and transparent pricing.",
  },
];

const aboutStats = [
  { n: "325", l: "Successful borehole projects completed" },
  { n: "525", l: "Skilled team members and technicians" },
  { n: "300+", l: "Pump installations across homes, farms, and institutions" },
  { n: "10+", l: "Years of drilling experience" },
];

const trustItems = [
  "Experienced Professionals",
  "Modern Equipment",
  "Innovation",
  "Fieldwork in Rural Kenya",
  "Responsive",
  "Accountability",
];

const contactImgs = ["/images/contact-1.jpeg", "/images/contact-2.jpeg"];

/* ---------------- Reusable bits ---------------- */

function Eyebrow({ children, color = NAVY }) {
  return <p className="text-sm font-semibold mb-2" style={{ color }}>{children}</p>;
}

function PageHero({ title }) {
  return (
    <div
      className="relative bg-cover bg-center py-24 sm:py-32"
      style={{ backgroundImage: `url('${heroImg}')` }}
    >
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,31,51,0.82)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{title}</h1>
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
      >
        <span className="font-medium" style={{ color: NAVY }}>{item.q}</span>
        <span className="text-xl leading-none flex-shrink-0 ml-4" style={{ color: NAVY }}>
          {isOpen ? "\u2212" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">{item.a}</div>
      )}
    </div>
  );
}

function FaqList({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="border border-gray-200">
      {items.map((item, i) => (
        <FaqItem key={item.q} item={item} isOpen={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
      ))}
    </div>
  );
}

/* ---------------- Header / Footer ---------------- */

function Header({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    ["home", "Home"],
    ["services", "Services"],
    ["about", "About"],
    ["contact", "Contact us"],
  ];
  const go = (p) => {
    setPage(p);
    setMenuOpen(false);
  };
  return (
    <div className="relative z-20">
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <button
            onClick={() => go("home")}
            className="text-white font-bold tracking-wide text-sm sm:text-base border-2 px-3 py-1"
            style={{ borderColor: "#2f6b3a" }}
          >
            ARTESIAN DRILLING LIMITED
          </button>
          <div className="hidden sm:block text-sm" style={{ color: GOLD }}>
            Make a call : +254 742879962 / +254 794676434
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navItems.map(([key, label]) => (
            <button
              key={key}
              onClick={() => go(key)}
              style={{ color: page === key ? GOLD : "white" }}
              className="hover:opacity-80"
            >
              {label}
            </button>
          ))}
        </nav>
        <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          &#9776;
        </button>
        <button
          onClick={() => go("contact")}
          className="hidden md:inline-block px-6 py-3 text-sm font-semibold"
          style={{ backgroundColor: GOLD, color: NAVY_DARK }}
        >
          GET A QUOTE
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-6 pb-6 text-white text-sm font-medium">
          {navItems.map(([key, label]) => (
            <button key={key} onClick={() => go(key)} style={{ color: page === key ? GOLD : "white", textAlign: "left" }}>
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ backgroundColor: NAVY_DARK }} className="text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="text-white font-bold text-lg mb-4">ARTESIAN DRILLING LIMITED</h3>
          <p className="text-sm leading-relaxed">
            We are committed to quality workmanship, safe operations, and cost-effective
            services that ensure a dependable water supply for every client.
          </p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Our Services</h4>
          <ul className="space-y-2 text-sm">
            <li>Hydrogeological Surveys</li>
            <li>Borehole Drilling</li>
            <li>Water Well Construction</li>
            <li>Solar Water Pump Systems</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Office in Kenya</h4>
          <ul className="space-y-2 text-sm">
            <li>+254 742879962</li>
            <li>+254 794676434</li>
            <li>artesiandrillingltd@gmail.com</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4">Our Locations</h4>
          <p className="text-sm">Opp. Mara frontier hotel Narok.</p>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-sm text-gray-400">
        Copyright &copy; 2026 ArtesianDrilling
      </div>
    </footer>
  );
}

/* ---------------- Pages ---------------- */

function HomePage({ setPage }) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${heroImg}')` }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,31,51,0.82)" }} />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-6 pt-6 pb-32 sm:pb-40">
            <h1 className="font-extrabold leading-[1.05] mb-2" style={{ color: GOLD, fontSize: "clamp(2.2rem, 6vw, 4.2rem)" }}>
              Borehole Drilling
              <br />
              Services in Kenya
            </h1>
            <h2 className="font-extrabold text-white leading-tight mb-6" style={{ fontSize: "clamp(1.8rem, 5vw, 3.4rem)" }}>
              Vision Got Larger
            </h2>
            <h3 className="text-white text-xl sm:text-2xl font-semibold mb-3">
              Professional Water Solutions in Kenya
            </h3>
            <p className="text-gray-200 max-w-3xl mb-8 leading-relaxed">
              Artesian Drilling Ltd provides reliable Borehole Drilling Services in Kenya for
              residential, commercial, agricultural, and industrial projects. Our experienced team
              delivers complete groundwater solutions including borehole drilling, water well
              construction, and pump installation.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setPage("services")} className="px-8 py-4 font-semibold text-sm" style={{ backgroundColor: GOLD, color: NAVY_DARK }}>
                OUR SERVICES
              </button>
              <button onClick={() => setPage("contact")} className="px-8 py-4 font-semibold text-sm text-white border-2 border-white">
                CONTACT US
              </button>
            </div>
          </div>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 -mt-24 sm:-mt-28 relative z-10 pb-16">
        <div className="grid md:grid-cols-2 shadow-xl">
          <div className="p-10 sm:p-12" style={{ backgroundColor: GOLD }}>
            <Eyebrow>Build Your Dream</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-5" style={{ color: NAVY }}>
              Trusted Borehole Drilling Experts
            </h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#2c3b56" }}>
              For years, <strong>Artesian Drilling Limited</strong> has been delivering reliable
              water solutions across homes, farms, and industries. With modern equipment, skilled
              technicians, and a commitment to quality, we ensure every project is completed
              safely, efficiently, and cost-effectively. Our Borehole Drilling Services in Kenya
              are designed to provide reliable groundwater solutions for residential, agricultural,
              commercial, and industrial projects. We use modern drilling equipment and experienced
              teams to deliver safe and efficient water systems.
            </p>
            <button onClick={() => setPage("contact")} className="inline-block px-6 py-3 text-sm font-semibold text-white" style={{ backgroundColor: NAVY_DARK }}>
              WORK WITH US
            </button>
          </div>
          <div className="grid grid-cols-2 bg-white">
            <div className="p-8 sm:p-10 border-b border-r border-gray-200 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>512+</div>
              <p className="text-sm text-gray-600 mt-2">Successfully completed borehole projects</p>
            </div>
            <div className="p-8 sm:p-10 border-b border-gray-200 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>10+</div>
              <p className="text-sm text-gray-600 mt-2">Years of drilling experience</p>
            </div>
            <div className="p-8 sm:p-10 border-r border-gray-200 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>1000+</div>
              <p className="text-sm text-gray-600 mt-2">Water pump installations</p>
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-center">
              <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>100%</div>
              <p className="text-sm text-gray-600 mt-2">Client satisfaction focus</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <Eyebrow>Build Your Dream</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>Quality Services</h2>
          </div>
          <button onClick={() => setPage("services")} className="text-sm font-semibold flex items-center gap-2" style={{ color: NAVY }}>
            VIEW ALL <span aria-hidden="true">&#8594;</span>
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {services.map((s) => (
            <div key={s.title}>
              <div className="aspect-[4/3] overflow-hidden mb-4 bg-gray-100">
                <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>{s.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div
          className="relative p-10 sm:p-16 flex flex-col justify-center min-h-[420px] bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImg}')` }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(20,31,51,0.72)" }} />
          <div className="relative z-10 max-w-md">
            <Eyebrow color={GOLD}>Sustainability</Eyebrow>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-5 leading-snug">
              Committed To Safe, Reliable Water Solutions
            </h2>
            <p className="text-gray-200 text-sm leading-relaxed mb-8">
              At <strong>Artesian Drilling Limited</strong>, safety, environmental care, and
              community well-being are at the heart of every project. We follow strict operational
              standards to protect people, equipment, and natural resources while delivering
              reliable borehole and water supply solutions.
            </p>
            <button onClick={() => setPage("contact")} className="inline-block px-6 py-3 text-sm font-semibold" style={{ backgroundColor: GOLD, color: NAVY_DARK }}>
              GET IN TOUCH
            </button>
          </div>
        </div>
        <div
          className="relative p-10 sm:p-16 flex flex-col justify-center min-h-[420px] bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImg}')` }}
        >
          <div className="absolute inset-0" style={{ backgroundColor: "rgba(244,185,66,0.88)" }} />
          <div className="relative z-10 max-w-md">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-5" style={{ color: NAVY }}>We Follow Best Practices</h2>
            <p className="text-sm leading-relaxed mb-8" style={{ color: "#2c3b56" }}>
              We are committed to delivering high-quality water solutions using safe, efficient,
              and modern techniques that meet client expectations and environmental standards.
            </p>
            <ul className="space-y-4">
              {[
                ["\u267B", "Sustainability"],
                ["\u23F1", "Project On Time"],
                ["\uD83D\uDCBB", "Modern Technology"],
                ["\uD83D\uDD27", "Quality Workmanship"],
              ].map(([icon, label]) => (
                <li key={label} className="flex items-center gap-3">
                  <span style={{ color: NAVY }} aria-hidden="true">{icon}</span>
                  <span className="font-semibold" style={{ color: NAVY }}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <Eyebrow>About Founders</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>Our Latest Works</h2>
            <h2 className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>Latest from Our Blog</h2>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => setPage("services")} className="px-6 py-3 text-sm font-semibold text-center" style={{ backgroundColor: GOLD, color: NAVY_DARK }}>
              VIEW PROJECTS
            </button>
            <button onClick={() => setPage("services")} className="px-6 py-3 text-sm font-semibold text-center" style={{ backgroundColor: GOLD, color: NAVY_DARK }}>
              VIEW BLOGS
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4">
          {works.map((w) => (
            <div key={w.title} className="relative aspect-square overflow-hidden">
              <img src={w.img} alt={w.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <p className="absolute bottom-4 left-4 right-4 text-white font-bold text-lg leading-snug">{w.title}</p>
            </div>
          ))}
        </div>
      </section>

      <QuoteAndFaq faqs={homeFaqs} />
    </>
  );
}

// Point this at your running backend (see /backend in the project root).
// Falls back to a relative path, which works if frontend and backend are
// served from the same origin behind a reverse proxy.
const API_BASE = import.meta?.env?.VITE_API_BASE || "http://localhost:4000";

function QuoteAndFaq({ faqs }) {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState("");

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
        throw new Error((data.errors && data.errors.join(" ")) || data.error || "Something went wrong.");
      }
      setStatus("sent");
    } catch (err) {
      // Backend not running yet (e.g. during design review) — this is
      // expected until you start it with `npm start` inside /backend.
      setStatus("error");
      setErrorMsg(err.message || "Couldn't reach the server. Is the backend running?");
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="p-8 sm:p-10" style={{ backgroundColor: NAVY_DARK }}>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">Request a Quote</h2>
          <p className="text-gray-300 text-sm mb-6">Ready to Work Together? Build a project with us!</p>
          {status === "sent" ? (
            <p className="text-white font-medium">
              Thanks! Your request has been noted &mdash; we'll get back to you shortly.
            </p>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                required
                placeholder="Enter your name *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-transparent border border-white/30 text-white placeholder-gray-400 px-4 py-3 text-sm focus:outline-none focus:border-white"
              />
              <input
                type="email"
                required
                placeholder="Enter your email address *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-transparent border border-white/30 text-white placeholder-gray-400 px-4 py-3 text-sm focus:outline-none focus:border-white"
              />
              <input
                type="text"
                placeholder="Project type"
                value={form.project}
                onChange={(e) => setForm({ ...form, project: e.target.value })}
                className="w-full bg-transparent border border-white/30 text-white placeholder-gray-400 px-4 py-3 text-sm focus:outline-none focus:border-white"
              />
              <textarea
                placeholder="Message"
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-transparent border border-white/30 text-white placeholder-gray-400 px-4 py-3 text-sm focus:outline-none focus:border-white resize-none"
              />
              {status === "error" && (
                <p className="text-sm" style={{ color: "#f4a3a3" }}>{errorMsg}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                className="px-6 py-3 text-sm font-semibold disabled:opacity-60"
                style={{ backgroundColor: GOLD, color: NAVY_DARK }}
              >
                {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          )}
        </div>
        <div>
          <Eyebrow color={GOLD}>Learn More From</Eyebrow>
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6" style={{ color: NAVY }}>
            Frequently Asked Questions
          </h2>
          <FaqList items={faqs} />
        </div>
      </div>
    </section>
  );
}

function ServicesPage({ setPage }) {
  return (
    <>
      <PageHero title="Professional Borehole Drilling Service in Kenya" />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <p className="text-gray-600 mb-12">
          Learn more about{" "}
          <button onClick={() => setPage("about")} className="font-semibold underline" style={{ color: NAVY }}>
            Artesian Drilling Limited
          </button>{" "}
          and our experience in delivering reliable water solutions across Kenya.
        </p>

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: NAVY }}>Recent Blogs</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {recentBlogs.map((b) => (
            <div key={b.title} className="border border-gray-100 shadow-sm">
              <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                <img src={b.img} alt={b.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>{b.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{b.desc}</p>
                <span className="text-sm font-semibold" style={{ color: GOLD }}>Read More &#8594;</span>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-3xl space-y-6 mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: NAVY }}>
            Borehole Drilling Service in Kenya
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Artesian Drilling Ltd is a trusted borehole drilling service in Kenya providing complete
            groundwater solutions for residential, commercial, agricultural, and industrial
            projects. Our experienced team uses modern drilling techniques and reliable equipment
            to deliver sustainable water supply solutions.
          </p>
          <p className="text-gray-600 leading-relaxed">
            We specialize in hydrogeological surveys, borehole drilling, water well construction,
            borehole development, and solar water pumping systems. Our approach ensures every
            project is carefully planned based on ground conditions, water requirements, and
            customer needs.
          </p>
          <p className="text-gray-600 leading-relaxed">
            As a professional borehole drilling company in Kenya, we focus on providing efficient,
            cost-effective, and long-lasting water solutions. From identifying suitable drilling
            locations to installing complete pumping systems, we support our clients throughout the
            entire process.
          </p>
        </div>

        <div className="max-w-3xl space-y-6 mb-20">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: NAVY }}>
            Our Borehole Drilling Process
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Our borehole drilling process begins with a detailed site assessment and hydrogeological
            survey to identify the most suitable drilling location. After the survey, our
            specialists carry out drilling using appropriate equipment based on geological
            conditions.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Once water is reached, we complete borehole construction, casing installation,
            development, and testing to ensure the water source meets quality and performance
            requirements. We also provide pump installation solutions to help customers access a
            reliable water supply.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6" style={{ color: NAVY }}>
              Frequently Asked Questions
            </h2>
            <FaqList items={servicesFaqs} />
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>
                Reliable Water Solutions for Homes, Farms and Businesses
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Artesian Drilling Ltd provides dependable groundwater solutions designed to meet the
                needs of different customers across Kenya. Whether you need water for residential
                use, agricultural activities, commercial operations, or industrial applications, our
                experienced team delivers solutions planned to your requirements — from initial site
                assessment through drilling, installation, and maintenance support.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>
                Why Choose Artesian Drilling for Borehole Solutions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                We combine technical expertise, modern drilling equipment, and a customer-focused
                approach to deliver effective groundwater solutions. Every location has different
                geological conditions, so we carefully evaluate each project and recommend suitable
                drilling methods, borehole designs, and pumping solutions for residential, farm,
                commercial, institutional, and industrial clients alike.
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: NAVY }}>Our Services</h2>
        <div className="grid sm:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>Hydrogeological Survey</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our hydrogeological survey service helps identify suitable groundwater locations before
              drilling begins. We use professional assessment methods to determine underground water
              availability, expected depth and the best drilling location.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>Borehole Drilling</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Our borehole drilling services use modern equipment and experienced technicians to
              provide reliable water solutions for homes, farms, businesses and institutions across
              Kenya.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>Water Well Construction</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              We provide complete water well construction solutions including casing installation,
              borehole development, testing and preparation for pumping systems.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function AboutPage({ setPage }) {
  return (
    <>
      <PageHero title="About Artesian Drilling Kenya" />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Eyebrow>About Us</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 max-w-3xl" style={{ color: NAVY }}>
          About Artesian Drilling Ltd &ndash; Reliable Borehole Drilling Solutions
        </h2>
        <div className="max-w-3xl space-y-5 text-gray-600 leading-relaxed mb-8">
          <p>
            <strong>About Artesian Drilling Limited</strong> is a professional water borehole
            drilling company based in Narok, Kenya. We specialize in deep and shallow borehole
            drilling, pump installation, solar water systems, and water storage solutions for
            homes, farms, industries, and institutions.
          </p>
          <p>
            With a strong reputation for quality workmanship and dependable service, our team uses
            modern equipment and proven drilling methods to deliver safe, efficient, and
            cost-effective water solutions.
          </p>
          <p>
            We offer complete services from hydrogeological surveys to drilling, installation,
            testing, and commissioning&mdash;ensuring our clients receive a reliable and
            long-lasting water supply.
          </p>
          <p>
            Explore our borehole drilling{" "}
            <button onClick={() => setPage("services")} className="font-semibold underline" style={{ color: NAVY }}>
              services
            </button>{" "}
            in Kenya.
          </p>
        </div>
        <button onClick={() => setPage("services")} className="px-6 py-3 text-sm font-semibold mb-16 inline-block" style={{ backgroundColor: GOLD, color: NAVY_DARK }}>
          OUR SERVICES
        </button>

        <div className="grid sm:grid-cols-3 gap-8 mb-20">
          {aboutFeatures.map((f) => (
            <div key={f.title} className="p-6 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-lg mb-2" style={{ color: NAVY }}>{f.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20 text-center sm:text-left">
          {aboutStats.map((s) => (
            <div key={s.l}>
              <div className="text-3xl sm:text-4xl font-extrabold" style={{ color: NAVY }}>{s.n}</div>
              <p className="text-sm text-gray-600 mt-2">{s.l}</p>
            </div>
          ))}
        </div>

        <Eyebrow>Trust and Worth</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: NAVY }}>
          Why Communities Trust Us
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustItems.map((t) => (
            <div key={t} className="p-6 flex items-center gap-3" style={{ backgroundColor: "#f7f8fa" }}>
              <span style={{ color: GOLD }} aria-hidden="true">&#9679;</span>
              <span className="font-semibold" style={{ color: NAVY }}>{t}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ContactPage() {
  const mapSrc =
    "https://maps.google.com/maps?q=Opp.%20Mara%20frontier%20hotel%20Narok.&t=m&z=13&output=embed&iwloc=near";
  return (
    <>
      <PageHero title="Contact Us" />
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Eyebrow>Contact Artesian Drilling Ltd</Eyebrow>
        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {contactImgs.map((src) => (
            <div key={src} className="aspect-[4/3] overflow-hidden bg-gray-100">
              <img src={src} alt="Artesian Drilling site work" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div className="max-w-3xl space-y-5 text-gray-600 leading-relaxed mb-16">
          <h2 className="text-2xl sm:text-3xl font-extrabold" style={{ color: NAVY }}>
            Our Borehole Drilling Services Across Kenya
          </h2>
          <p>
            Artesian Drilling Ltd provides complete groundwater solutions for customers throughout
            Kenya. Our services include borehole drilling, hydrogeological surveys, water well
            construction, borehole testing, and water pump installation.
          </p>
          <p>
            We work with homeowners, farmers, businesses, institutions, and organizations that
            require reliable water supply solutions. Our team evaluates each project carefully to
            understand the location, water requirements, and technical requirements before
            recommending the best solution.
          </p>
          <p>
            From the first consultation to project completion, Artesian Drilling Ltd focuses on
            delivering professional service, quality workmanship, and long-lasting water solutions.
          </p>
        </div>

        <Eyebrow>Our Branches</Eyebrow>
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-8" style={{ color: NAVY }}>Contact Details</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-8" style={{ backgroundColor: NAVY_DARK }}>
            <h3 className="text-white font-bold text-lg mb-6">Head Office</h3>
            <div className="space-y-5 text-sm text-gray-300">
              <div>
                <p className="font-semibold text-white mb-1">Address:</p>
                <p>Opp. Mara frontier hotel, Narok.</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Phone:</p>
                <p>+254 742879962</p>
                <p>+254 794676434</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Email:</p>
                <p>artesiandrillingltd@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="min-h-[280px] overflow-hidden">
            <iframe
              title="Artesian Drilling location map"
              src={mapSrc}
              className="w-full h-full min-h-[280px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------------- App shell ---------------- */

export default function App() {
  const [page, setPage] = useState("home");

  const pages = {
    home: <HomePage setPage={setPage} />,
    services: <ServicesPage setPage={setPage} />,
    about: <AboutPage setPage={setPage} />,
    contact: <ContactPage setPage={setPage} />,
  };

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      <div style={{ backgroundColor: NAVY_DARK }}>
        <Header page={page} setPage={setPage} />
      </div>
      {pages[page]}
      <Footer />
    </div>
  );
}
