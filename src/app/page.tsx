import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: "40px" }}>
      <h1>Golf Charity Platform</h1>

      <p>
        Play golf, submit scores, support charities,
        and enter monthly prize draws.
      </p>

      <div style={{ marginTop: "20px" }}>
        <Link href="/signup">
          <button>Create Account</button>
        </Link>

        {" "}

        <Link href="/login">
          <button>Login</button>
        </Link>
      </div>
    </main>
  );
}