export default function Page({ params }: { params: { test: string } }) {
  return (
    <main>
      <h1>{params.test}</h1>
    </main>
  );
}

// http://localhost:3000/test/kake
