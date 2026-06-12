import { AboutSection } from "@/components/sections/AboutSection";
import { CTASection } from "@/components/sections/CTASection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { GlassCard } from "@/components/GlassCard";
import { Users, Target, Award, Heart } from "lucide-react";

const team = [
  { name: "Alex Rivera", role: "CEO & Founder", initials: "AR" },
  { name: "Sarah Chen", role: "CTO", initials: "SC" },
  { name: "Mike Johnson", role: "Lead Designer", initials: "MJ" },
  { name: "Emily Williams", role: "Head of Engineering", initials: "EW" },
];

export default function About() {
  return (
    <>
      <section className="relative pt-32 pb-16 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              About <span className="text-gradient">Devzfy</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We are a team of passionate developers, designers, and strategists
              dedicated to building exceptional digital experiences.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Users, label: "Team Members", value: "15+" },
              { icon: Target, label: "Projects Completed", value: "50+" },
              { icon: Award, label: "Years Experience", value: "5+" },
              { icon: Heart, label: "Happy Clients", value: "30+" },
            ].map((stat) => (
              <GlassCard key={stat.label}>
                <stat.icon className="h-6 w-6 text-purple-400 mb-3" />
                <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </GlassCard>
            ))}
          </div>

          <ScrollReveal>
            <div className="glass rounded-2xl p-8 lg:p-12 mb-16">
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="space-y-4 text-gray-400">
                <p>
                  Founded in 2024, Devzfy emerged from a vision to bridge the gap
                  between cutting-edge technology and exceptional design. We believe
                  that great software should not only function flawlessly but also
                  delight users at every interaction.
                </p>
                <p>
                  Our team brings together expertise from top tech companies and
                  creative agencies, combining years of experience in web development,
                  UI/UX design, and digital strategy. We&apos;re united by a passion for
                  crafting digital solutions that make a real impact.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-2xl font-bold text-center mb-8">
              Meet Our <span className="text-gradient">Team</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <GlassCard key={member.name} className="text-center">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                    {member.initials}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-gray-400">{member.role}</p>
                </GlassCard>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
      <CTASection />
    </>
  );
}
