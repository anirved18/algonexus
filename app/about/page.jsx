"use client";

import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-10 text-slate-200">

      {/* Profile Card */}
      <div className="p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-700/40 shadow-xl shadow-black/20">
        <div className="flex items-center gap-4">

          {/* Avatar */}
          <div className="h-16 w-16 rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 
                          flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            A
          </div>

          {/* Name + Role */}
          <div>
            <h1 className="text-2xl font-bold text-white">Anirved Panda</h1>
            <p className="text-slate-400 text-sm">Computer Science Student • Full-Stack Developer</p>
          </div>
        </div>
      </div>

      {/* About */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-2 bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          About Me
        </h2>

        <p className="text-slate-300 leading-relaxed">
          I&apos;m a passionate developer who loves building interactive tools, solving complex 
          computer science problems, and designing intuitive user experiences.
        </p>
      </section>

      {/* Experience */}
      <section>
        <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
          Experience
        </h2>
        <ul className="list-disc list-inside space-y-1 text-slate-300">
          <li>Built a full RAG-based AI Assistant</li>
          <li>Developed AlgoFlow Sorting Visualizer & Compare Visualizer</li>
          <li>Worked with JavaScript, Node, MongoDB, and modern UI frameworks</li>
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h2 className="text-lg font-semibold bg-gradient-to-r from-teal-300 to-emerald-400 bg-clip-text text-transparent mb-2">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">
          {[
            "Java", "JavaScript", "Node.js", "MongoDB",
            "React", "Next.js", "Tailwind CSS",
            "Algorithms", "Data Structures",
          ].map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs bg-slate-800/60 border border-slate-700 
                         rounded-full text-slate-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Contact Section with Clickable Gmail */}
      <section>
        <h2 className="text-lg font-semibold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent mb-2">
          Contact
        </h2>

        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=anirvedpanda1818@gmail.com"
          target="_blank"
          className="flex items-center gap-3 text-slate-300 hover:text-white transition"
        >
          <Image
            src="/gmaillogo.png"
            width={28}
            height={28}
            alt="Gmail"
            className="rounded-md"
          />
          <span className="text-slate-100 underline hover:text-white">
            anirvedpanda1818@gmail.com
          </span>
        </a>
      </section>

      {/* Social Profiles */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Connect With Me</h2>

        <div className="space-y-4">

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/anirved-panda-917639299/"
            target="_blank"
            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-700
                       hover:border-sky-400 hover:bg-sky-700/10 transition-all shadow-lg hover:shadow-sky-500/20"
          >
            <Image
              src="/linkedinlogo.png"
              width={30}
              height={30}
              alt="LinkedIn"
              className="rounded-md"
            />

            <div>
              <p className="text-slate-100 font-semibold text-sm">LinkedIn</p>
              <p className="text-slate-400 text-xs">
                linkedin.com/in/anirved-panda-917639299
              </p>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/anirved18"
            target="_blank"
            className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/40 border border-slate-700
                       hover:border-purple-400 hover:bg-purple-700/10 transition-all shadow-lg hover:shadow-purple-500/20"
          >
            <Image
              src="/githublogo.jpg"
              width={30}
              height={30}
              alt="GitHub"
              className="rounded-md"
            />

            <div>
              <p className="text-slate-100 font-semibold text-sm">GitHub</p>
              <p className="text-slate-400 text-xs">
                github.com/anirved18
              </p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
