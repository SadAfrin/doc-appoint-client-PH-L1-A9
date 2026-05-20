const StatsSection = () => {
  const stats = [
    { label: "Satisfied Patients", value: "10K+", icon: "👨‍⚕️" },
    { label: "Expert Doctors", value: "500+", icon: "🩺" },
    { label: "Hospital Branches", value: "25+", icon: "🏥" },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden">

      {/* background glow */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-white rounded-full blur-3xl -bottom-20 -right-20"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-lg hover:scale-105 transition duration-300"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>

              <h3 className="text-4xl font-extrabold text-white">
                {stat.value}
              </h3>

              <p className="text-blue-100 mt-2 font-medium">
                {stat.label}
              </p>

              {/* subtle underline animation */}
              <div className="w-0 group-hover:w-16 h-1 bg-white mx-auto mt-4 transition-all duration-300 rounded-full"></div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default StatsSection;