export default async function SlowComponent() {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 3000);
  });

  return <p>Content loaded after 3 seconds!</p>;
}