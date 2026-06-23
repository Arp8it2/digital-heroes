"use client";

export default function PrivacyPage() {
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
          Legal Information
        </p>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: 900,
            marginTop: "10px",
          }}
        >
          Privacy Policy
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Learn how we collect, use and
          protect your information.
        </p>
      </div>

      {/* POLICY SECTIONS */}
      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        <div style={card}>
          <h2 style={heading}>
            🔒 Information We Collect
          </h2>

          <p style={text}>
            We may collect account
            details, golf scores,
            subscriptions, draw entries,
            donations and other platform
            activity required to operate
            the Golf Charity Platform.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            📊 How We Use Information
          </h2>

          <p style={text}>
            Your information is used to
            manage accounts, process
            entries, calculate winners,
            improve platform services and
            communicate important updates.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            🛡 Data Security
          </h2>

          <p style={text}>
            We use industry-standard
            security measures to help
            protect your personal
            information and account data.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            🤝 Third-Party Services
          </h2>

          <p style={text}>
            Certain services such as
            payments, authentication and
            hosting may be provided by
            trusted third-party partners.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            🍪 Cookies & Analytics
          </h2>

          <p style={text}>
            Cookies and analytics tools
            may be used to improve user
            experience and platform
            performance.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            ⚙ Your Rights
          </h2>

          <p style={text}>
            You may request access,
            correction or deletion of
            your personal information
            where permitted by law.
          </p>
        </div>
      </div>

      {/* FOOTER BOX */}
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
          📅 Last Updated
        </h2>

        <p
          style={{
            color: "#94a3b8",
            lineHeight: 1.8,
          }}
        >
          This Privacy Policy may be
          updated periodically. Continued
          use of the platform indicates
          acceptance of the latest
          version.
        </p>
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

const heading = {
  fontSize: "26px",
  marginBottom: "12px",
};

const text = {
  color: "#94a3b8",
  lineHeight: 1.8,
};