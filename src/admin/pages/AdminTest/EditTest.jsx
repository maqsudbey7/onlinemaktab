import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourses } from "../../../context/CourseContext";

export default function EditTest() {
  const { subjectId, testId } = useParams();
  const { testSubjects, updateTest } = useCourses();
  const nav = useNavigate();

  const subject = testSubjects.find(s => s.id === +subjectId);
  const test = subject?.tests.find(t => t.id === +testId);

  const [t, setT] = useState({
    question: "", A:"",B:"",C:"",D:"",
    correct:"A", time:30, score:1
  });

  useEffect(() => {
    if(test) setT({...test});
  }, [test]);

  const submit = () => {
    updateTest(+subjectId, +testId, t);
    nav(`/admin/tests/${subjectId}`);
  };

  if(!test) return <p className="text-center text-red-500 mt-8">Test topilmadi</p>;

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg space-y-3">
      <button
        onClick={() => nav(-1)}
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        ← Orqaga
      </button>

      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Testni Tahrirlash</h1>

      <input placeholder="Savol" className="input w-full" value={t.question} onChange={e=>setT({...t,question:e.target.value})}/>
      {["A","B","C","D"].map(v=>(
        <input key={v} placeholder={`${v} variant`} className="input w-full" value={t[v]} onChange={e=>setT({...t,[v]:e.target.value})}/>
      ))}
      <select className="input w-full" value={t.correct} onChange={e=>setT({...t,correct:e.target.value})}>
        <option>A</option><option>B</option><option>C</option><option>D</option>
      </select>
      <input type="number" placeholder="Vaqt (sek)" className="input w-full" value={t.time} onChange={e=>setT({...t,time:+e.target.value})}/>
      <input type="number" placeholder="Ball" className="input w-full" value={t.score} onChange={e=>setT({...t,score:+e.target.value})}/>

      <button onClick={submit} className="btn-primary w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg">
        Save
      </button>
    </div>
  );
}
