export const courses = [
  {
    id: 1,
    title: "JavaScript",
    description: "JavaScript bo‘yicha to‘liq kurs",
    students: "12,773",
    date: "2025, 11-Mart",
    lessonsCount: 42,
    duration: "15 soat 37 daqiqa",
    reviews: 196,
    image: "/js.webp",
    modules: [
      {
        title: "Asosiy tushunchalar",
        lessonsCount: 8,
        duration: "1 soat 20 daqiqa",
        lessons: [
          { title: "Kirish", time: "10:00", video: "https://youtu.be/9dUhZq9dkHM?si=8XBVdcve2tByFOQI", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "O'zgaruvchilar 1", time: "15:00", video: "https://youtu.be/E9OKpacyUSc?si=RnpzHYv1CNVBN663", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "O'zgaruvchilar 2", time: "15:00", video: "https://youtu.be/E9OKpacyUSc?si=RnpzHYv1CNVBN663", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "Funktsiyalar 1", time: "20:00", video: "https://youtu.be/_j7yneg6if0?si=SISj-mYRc-u4jxjO", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "Kirish 2", time: "10:00", video: "https://youtu.be/9dUhZq9dkHM?si=8XBVdcve2tByFOQI", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "O'zgaruvchilar 3", time: "15:00", video: "https://youtu.be/E9OKpacyUSc?si=RnpzHYv1CNVBN663", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "O'zgaruvchilar 4", time: "15:00", video: "https://youtu.be/E9OKpacyUSc?si=RnpzHYv1CNVBN663", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "Funktsiyalar 2", time: "20:00", video: "https://youtu.be/_j7yneg6if0?si=SISj-mYRc-u4jxjO", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "Funktsiyalar 2", time: "20:00", video: "https://youtu.be/_j7yneg6if0?si=SISj-mYRc-u4jxjO", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" }

        ]
      },
      {
        title: "Obyektlar va Arraylar",
        lessonsCount: 3,
        duration: "1 soat 40 daqiqa",
        lessons: [
          { title: "Arraylar", time: "20:00", video: "https://youtu.be/1Bmqo8tsOq8?si=igdJndFwUzdPsgPP", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "Obyektlar", time: "25:00", video: "https://youtu.be/jMermL9QA48?si=kWbY7VTnVSvLSCsn", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "Map & Set", time: "15:00", video: "https://youtu.be/dgcyvjQiJnQ?si=c6Ox8-V5fM18nCNg", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "TypeScript",
    description: "TypeScript bo‘yicha to‘liq kurs",
    students: "8,512",
    date: "2025, 10-Mart",
    lessonsCount: 38,
    duration: "12 soat",
    reviews: 120,
    image: "data:image/jpeg;base64,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",
    modules: [
      {
        title: "TypeScript asoslari",
        lessonsCount: 2,
        duration: "45 daqiqa",
        lessons: [
          { title: "Kirish", time: "15:00", video: "https://youtu.be/kc6Nv56oeX4?si=G3VR0mbIuIfuTkN3", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "Turlar", time: "30:00", video: "https://youtu.be/jMermL9QA48?si=kWbY7VTnVSvLSCsn", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" }
        ]
      },
      {
        title: "Advanced TypeScript",
        lessonsCount: 2,
        duration: "1 soat",
        lessons: [
          { title: "Generics", time: "30:00", video: "https://youtu.be/...", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" },
          { title: "Decorators", time: "30:00", video: "https://youtu.be/...", pdf: "https://en.pdfdrive.to/dl/javascript-tutorial" }
        ]
      }
    ]
  }
];
