import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020b24",
        color: "white",
        padding: "40px",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background:
            "linear-gradient(90deg,#00d26a,#b7f34d)",
          borderRadius: "30px",
          padding: "50px",
          color: "#000",
          boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        }}
      >
        <p
          style={{
            fontWeight: 700,
            textTransform: "uppercase",
            fontSize: "14px",
            letterSpacing: "1px",
          }}
        >
          Golf Charity Platform
        </p>

        <h1
          style={{
            fontSize: "64px",
            fontWeight: 900,
            marginTop: "10px",
            lineHeight: 1,
          }}
        >
          Play Golf.
          <br />
          Support Charities.
          <br />
          Win Rewards.
        </h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "20px",
            maxWidth: "700px",
          }}
        >
          Submit scores, enter monthly draws, support
          charities and become part of a premium golf
          community.
        </p>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <Link href="/signup">
            <button
              style={{
                background: "#000",
                color: "#fff",
                border: "none",
                padding: "15px 30px",
                borderRadius: "999px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Create Account
            </button>
          </Link>

          <Link href="/login">
            <button
              style={{
                background: "#fff",
                color: "#000",
                border: "none",
                padding: "15px 30px",
                borderRadius: "999px",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {[
          ["£250K+", "Raised"],
          ["1,200+", "Members"],
          ["35+", "Charities"],
          ["500+", "Winners"],
        ].map(([value, label]) => (
          <div
            key={label}
            style={{
              background: "#1a2740",
              border: "1px solid #23375d",
              borderRadius: "24px",
              padding: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                fontWeight: 800,
              }}
            >
              {value}
            </h2>

            <p
              style={{
                color: "#94a3b8",
                marginTop: "5px",
              }}
            >
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* FEATURES */}
      <div
        style={{
          marginTop: "35px",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          How It Works
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(260px,1fr))",
            gap: "20px",
          }}
        >
          {[
            "Create Account",
            "Submit Scores",
            "Enter Monthly Draws",
            "Support Charities",
          ].map((step, index) => (
            <div
              key={step}
              style={{
                background: "#1a2740",
                border: "1px solid #23375d",
                borderRadius: "24px",
                padding: "25px",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(90deg,#00d26a,#b7f34d)",
                  color: "#000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800,
                  marginBottom: "15px",
                }}
              >
                {index + 1}
              </div>

              <h3>{step}</h3>

              <p
                style={{
                  marginTop: "10px",
                  color: "#94a3b8",
                }}
              >
                Complete this step and move closer to
                winning rewards.
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          marginTop: "40px",
          background: "#1a2740",
          border: "1px solid #23375d",
          borderRadius: "24px",
          padding: "35px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "36px",
          }}
        >
          Ready to Make a Difference?
        </h2>

        <p
          style={{
            color: "#94a3b8",
            marginTop: "10px",
          }}
        >
          Join Digital Heroes today and start supporting
          charities through golf.
        </p>

        <Link href="/signup">
          <button
            style={{
              marginTop: "20px",
              background:
                "linear-gradient(90deg,#00d26a,#b7f34d)",
              color: "#000",
              border: "none",
              padding: "16px 32px",
              borderRadius: "999px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Get Started
          </button>
        </Link>
      </div>
    </main>
  );
}