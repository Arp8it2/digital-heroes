"use client";

export default function ContactPage() {
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
          Contact Us
        </h1>

        <p
          style={{
            marginTop: "10px",
            fontSize: "18px",
          }}
        >
          Need help? Get in touch with our team.
        </p>
      </div>

      {/* CONTACT CARDS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
          marginBottom: "25px",
        }}
      >
        <div
          style={{
            background: "#1a2740",
            border: "1px solid #23375d",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "10px",
            }}
          >
            📧 Email
          </h2>

          <p style={{ color: "#94a3b8" }}>
            support@golfcharity.com
          </p>
        </div>

        <div
          style={{
            background: "#1a2740",
            border: "1px solid #23375d",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "10px",
            }}
          >
            📞 Phone
          </h2>

          <p style={{ color: "#94a3b8" }}>
            +91 6387 716657
          </p>
        </div>

        <div
          style={{
            background: "#1a2740",
            border: "1px solid #23375d",
            borderRadius: "24px",
            padding: "25px",
          }}
        >
          <h2
            style={{
              fontSize: "32px",
              marginBottom: "10px",
            }}
          >
            🌍 Address
          </h2>

          <p style={{ color: "#94a3b8" }}>
            Golf Charity HQ
            <br />
            Lucknow, Uttar Pradesh, India
          </p>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div
        style={{
          background: "#1a2740",
          border: "1px solid #23375d",
          borderRadius: "24px",
          padding: "25px",
        }}
      >
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          ✉ Send Message
        </h2>

        <div
          style={{
            display: "grid",
            gap: "15px",
          }}
        >
          <input
            placeholder="Your Name"
            style={inputStyle}
          />

          <input
            placeholder="Email Address"
            style={inputStyle}
          />

          <textarea
            placeholder="Your Message"
            rows={6}
            style={{
              ...inputStyle,
              resize: "none",
            }}
          />

          <button
            style={{
              border: "none",
              padding: "14px",
              borderRadius: "14px",
              background:
                "linear-gradient(90deg,#00d26a,#b7f34d)",
              color: "#000",
              fontWeight: 800,
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Send Message
          </button>
        </div>
      </div>
    </main>
  );
}

const inputStyle = {
  padding: "14px",
  borderRadius: "12px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  width: "100%",
};