"use client";

export default function TermsPage() {
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
          Terms & Conditions
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Please read these terms carefully before using the platform.
        </p>
      </div>

      {/* TERMS */}
      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        <div style={card}>
          <h2 style={heading}>
            📋 Acceptance of Terms
          </h2>

          <p style={text}>
            By accessing or using the
            Golf Charity Platform, you
            agree to comply with these
            Terms and Conditions.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            👤 User Accounts
          </h2>

          <p style={text}>
            Users are responsible for
            maintaining accurate account
            information and protecting
            login credentials.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            ⛳ Score Submissions
          </h2>

          <p style={text}>
            All submitted golf scores
            must be accurate and genuine.
            Fraudulent submissions may
            result in account suspension
            or removal.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            🎯 Draw Entries
          </h2>

          <p style={text}>
            Entry into prize draws is
            subject to eligibility rules
            and platform requirements.
            Draw outcomes are final.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            🏆 Prizes & Winners
          </h2>

          <p style={text}>
            Winners may be required to
            verify identity before prize
            distribution. The platform
            reserves the right to review
            any suspicious activity.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            💝 Charity Contributions
          </h2>

          <p style={text}>
            Contributions and donations
            are directed toward approved
            charity partners according to
            platform policies.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            🚫 Prohibited Activities
          </h2>

          <p style={text}>
            Users may not misuse the
            platform, submit false
            information, manipulate draw
            results or engage in harmful
            activities.
          </p>
        </div>

        <div style={card}>
          <h2 style={heading}>
            ⚖ Limitation of Liability
          </h2>

          <p style={text}>
            The platform is provided on
            an "as-is" basis. We are not
            liable for indirect damages,
            service interruptions or
            losses arising from use of
            the platform.
          </p>
        </div>
      </div>

      {/* FOOTER */}
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
          📅 Updates to Terms
        </h2>

        <p
          style={{
            color: "#94a3b8",
            lineHeight: 1.8,
          }}
        >
          These Terms & Conditions may
          be updated from time to time.
          Continued use of the platform
          constitutes acceptance of the
          latest version.
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