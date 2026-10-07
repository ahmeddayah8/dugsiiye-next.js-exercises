type BlogPageProps = {
  params: Promise<{ slug?: string[] }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const path = slug?.join("/") ?? "";

  return <h1>You visited: /{path}</h1>;
}