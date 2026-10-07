export const dynamic = "force-dynamic";

export default function SSRPage() {
  const time = new Date().toLocaleTimeString();

  return (
    <main>
      <h1>SSR Exercise</h1>
      <p>Server time: {time}</p>
    </main>
  );
}