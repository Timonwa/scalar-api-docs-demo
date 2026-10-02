const LINKS = [
  { href: "/docs", label: "API reference", hint: "The Scalar docs, with Test Request on every endpoint" },
  { href: "/docs/openapi.json", label: "OpenAPI document", hint: "The JSON the reference is rendered from" },
  { href: "/api/v1/books", label: "GET /api/v1/books", hint: "The live API itself" },
];

export default function HomePage() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1.5rem", lineHeight: 1.6 }}>
      <h1>Bookshop API</h1>
      <p>
        A sample API documented with <a href="https://scalar.com">Scalar</a>. The
        OpenAPI document is generated from the same Zod schemas the endpoints
        validate with, so the docs always match the API.
      </p>
      <ul>
        {LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href}>{link.label}</a> — {link.hint}
          </li>
        ))}
      </ul>
    </main>
  );
}
