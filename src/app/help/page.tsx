"use client";

export default function HelpPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020b24",
        color: "white",
        padding: "30px",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#00d26a,#b7f34d)",
          borderRadius: "30px",
          padding: "35px",
          color: "#000",
          marginBottom: "25px",
        }}
      >
        <p
          style={{
            fontWeight: 800,
            textTransform: "uppercase",
          }}
        >
          Support Center
        </p>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          Help Center
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Find answers to common questions and learn how the platform works.
        </p>
      </div>

      {/* FAQ GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(350px,1fr))",
          gap: "20px",
        }}
      >
        <div style={card}>
          <h2 style={question}>
            ⛳ How do I enter a draw?
          </h2>

          <p style={answer}>
            Submit your latest golf
            scores through the Scores
            page and eligible entries
            will automatically be added
            to active draws.
          </p>
        </div>

        <div style={card}>
          <h2 style={question}>
            🎯 How are winners chosen?
          </h2>

          <p style={answer}>
            Winners are selected based
            on draw rules and matching
            score combinations.
          </p>
        </div>

        <div style={card}>
          <h2 style={question}>
            💰 How do charities benefit?
          </h2>

          <p style={answer}>
            A portion of memberships,
            entries and contributions
            is donated to registered
            charity partners.
          </p>
        </div>

        <div style={card}>
          <h2 style={question}>
            🏆 Where can I see winners?
          </h2>

          <p style={answer}>
            Visit the Winners page to
            view recent prize winners
            and payout information.
          </p>
        </div>

        <div style={card}>
          <h2 style={question}>
            👤 How do I manage my account?
          </h2>

          <p style={answer}>
            Access your Dashboard to
            manage scores,
            subscriptions and profile
            settings.
          </p>
        </div>

        <div style={card}>
          <h2 style={question}>
            📧 Need more help?
          </h2>

          <p style={answer}>
            Visit the Contact page and
            send a message to our
            support team.
          </p>
        </div>
      </div>

      {/* SUPPORT BOX */}
      <div
        style={{
          background: "#1a2740",
          border: "1px solid #23375d",
          borderRadius: "24px",
          padding: "25px",
          marginTop: "25px",
        }}
      >
        <h2
          style={{
            marginBottom: "15px",
          }}
        >
          🚀 Quick Support
        </h2>

        <p
          style={{
            color: "#94a3b8",
            lineHeight: 1.8,
          }}
        >
          If you cannot find your
          answer here, please contact
          our support team through the
          Contact page. We aim to
          respond within 24 hours.
        </p>

        <button
          style={{
            marginTop: "20px",
            border: "none",
            padding: "14px 24px",
            borderRadius: "14px",
            background:
              "linear-gradient(90deg,#00d26a,#b7f34d)",
            color: "#000",
            fontWeight: 800,
            cursor: "pointer",
          }}
        >
          Contact Support
        </button>
      </div>
    </main>
  );
}

const card = {
  background: "#1a2740",
  border: "1px solid #23375d",
  borderRadius: "24px",
  padding: "25px",
};

const question = {
  fontSize: "24px",
  marginBottom: "12px",
};

const answer = {
  color: "#94a3b8",
  lineHeight: 1.7,
};