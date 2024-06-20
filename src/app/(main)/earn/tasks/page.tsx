export const dynamic = "force-dynamic";
import BackButton from "@/components/common/back-button";
import TopNavigation from "@/components/common/earn/top-navigation";
import ErrorPage from "@/components/common/error-page";
import TasksList from "@/components/common/tasks/tasks-list";
import Gem from "@/components/icons/gem";
import React from "react";
const base = process.env.BASE_URL!;

async function getData() {
  const res = await fetch(`${base}/api/task/list`, {
    cache: "force-cache",
    next: { revalidate: 1200 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return res.json();
}

export default async function TasksPage() {
  const result = await getData();
  if (!result.success) return <ErrorPage />;
  const tasks = result.data;
  return (
    <main className="pl-4">
      <BackButton />
      <div className="pt-4 pr-4">
        <TopNavigation active="tasks" />
      </div>
      <div className="mt-5 flex flex-col items-center pr-4">
        <Gem size={40} />
        <h1 className="text-2xl font-semibold my-3">Задания</h1>
        <p className="text-center text-sm text-[#ebebf599] font-medium my-3">
          Награда начисляется сразу же <br />
          после выполнения задания
        </p>
      </div>
      <TasksList tasks={JSON.parse(JSON.stringify(tasks))} />
    </main>
  );
}
