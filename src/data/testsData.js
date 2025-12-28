export const testsData = {
  matematika: {
    title: "Matematika",
    categories: [
      {
        id: "butun-sonlar",
        title: "Butun sonlar",
        questions: [
          { id: 1, question: "1 + 13 = ?", options: ["14", "17", "15", "16"], answer: "14" },
          { id: 2, question: "5 + 7 = ?", options: ["11", "12", "13", "14"], answer: "12" },
        ],
      },
      {
        id: "ildizlar",
        title: "Ildizlar",
        questions: [
          { id: 1, question: "√16 = ?", options: ["2", "4", "8", "6"], answer: "4" },
        ],
      },
    ],
  },
  fizika: {
    title: "Fizika",
    categories: [
      {
        id: "kinematika",
        title: "Kinematika",
        questions: [
          { id: 1, question: "V = S / t, S = ?", options: ["V*t", "V+t"], answer: "V*t" },
        ],
      },
    ],
  },
};
