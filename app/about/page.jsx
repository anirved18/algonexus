"use client";

export default function AboutPage() {
  return (
    <div className="space-y-4 text-slate-200">
      <h1 className="text-xl font-bold text-white">About Me</h1>

      <p>
        Hi, I’m <span className="text-sky-400 font-semibold">Anirved Panda</span>,
        a passionate Computer Science student and aspiring full-stack developer.
      </p>

      <div>
        <h3 className="font-semibold">Experience</h3>
        <p>Built RAG AI-Assistant, AlgoFlow Visualizer, and more.</p>
      </div>

      <div>
        <h3 className="font-semibold">Skills</h3>
        <p>
          Java, JavaScript, Node.js, MongoDB, React, Tailwind CSS,
          CS fundamentals & algorithms.
        </p>
      </div>

      <div>
        <h3 className="font-semibold">Contact</h3>
        <p>Email: anirvedpanda1818@gmail.com</p>
      </div>
    </div>
  );
}
