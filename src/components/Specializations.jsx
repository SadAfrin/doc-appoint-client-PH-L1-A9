const Specializations = () => {
  const categories = [
    { name: "Cardiology", icon: "❤️", desc: "Heart & blood vessels" },
    { name: "Neurology", icon: "🧠", desc: "Brain & nerves" },
    { name: "Gynecology", icon: "👩‍⚕️", desc: "Women health" },
    { name: "Pediatrics", icon: "🧸", desc: "Child care" },
    { name: "Dermatology", icon: "✨", desc: "Skin treatment" },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto text-center px-4">

        {/* Heading */}
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3">
          Our Specializations
        </h2>

        <p className="text-slate-500 mb-12">
          Choose the right specialist for your health needs
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">

          {categories.map((cat, i) => (
            <div
              key={i}
              className="group bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300 cursor-pointer"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition">
                {cat.icon}
              </div>

              <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition">
                {cat.name}
              </h3>

              <p className="text-xs text-slate-400 mt-1">
                {cat.desc}
              </p>

              {/* hover underline */}
              <div className="w-0 group-hover:w-12 h-1 bg-blue-500 mx-auto mt-4 transition-all duration-300 rounded-full"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Specializations;