"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="mx-auto mt-5 flex max-w-5xl gap-4 rounded border border-gray-300 p-3">
      <div className="w-64 shrink-0 rounded border border-gray-300">
        <Image
          src="/home/pf.png"
          alt="Profile Image"
          width={256}
          height={256}
          className="h-auto w-full rounded"
        />
        <div className="p-3 text-sm">
          <b>Sutthita Pudee</b>, 20 years old
          <br />
          Student ID: <b>68000324</b>
          <br />
          <b>Major:</b> Computer Science and Software Development
          <br />
          Sripatum University (<b>SPU</b>)
        </div>
      </div>
      <div className="text-justify">
        <p>
          <b>About Me</b> I am a Computer Science and Software Development
          student at Sripatum University. Here are my skills and experiences:
        </p>

        <ul className="my-3 list-disc space-y-2 pl-6">
          <li>
            <b>Web Development</b> I can build websites with HTML, CSS,
            JavaScript.
          </li>
          <li>
            <b>Modern Front-End Stack:</b> I am comfortable working with React,
            TypeScript, Tailwind CSS, Node.js and Next.js.
          </li>
          
          <li>
            <b>In my free time</b> I enjoy watching movies, listening to music, and occasionally playing video games.
          </li>
          <li>
            Personally, I am not very good at computers, but I chose to study in this field because I once attended a computer camp at the University of Phayao. That experience inspired me to learn more about programming.

I found coding interesting and enjoyable because it challenges me to write code and make it work correctly. Whenever I finally get my code to run successfully, I feel proud of myself and enjoy the process even more. That is why I decided to study Computer Science and Software Development.

Although I find it very difficult sometimes, I will keep trying my best to improve my coding skills and become a better programmer.
          </li>
        </ul>

        <p>
          <b>Thank you for visiting my page!</b>
        </p>
      </div>
    </div>
  );
}
