"use client";

import Link from "next/link";

const dropdownStyle = {
  position: "absolute" as const,
  top: "38px",
  left: "0",
  background: "#1a2740",
  border: "1px solid #23375d",
  borderRadius: "14px",
  minWidth: "220px",
  padding: "10px",
  zIndex: 1000,
  boxShadow: "0 10px 25px rgba(0,0,0,.25)",
};

const itemStyle = {
  display: "block",
  padding: "10px 12px",
  borderRadius: "10px",
  color: "white",
  textDecoration: "none",
};

export default function Navbar() {
  const closeMenus = () => {
    document
      .querySelectorAll("details")
      .forEach((d) =>
        d.removeAttribute("open")
      );
  };

  return (
    <nav
      style={{
        background: "#0f172a",
        borderBottom: "1px solid #1e293b",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          padding: "16px 30px",
          flexWrap: "wrap",
        }}
      >
        {/* LOGO */}

        <Link
          href="/"
          style={{
            fontSize: "24px",
            fontWeight: 900,
            color: "white",
            textDecoration:
              "none",
          }}
          onClick={closeMenus}
        >
          ⛳ Golf Charity
        </Link>

        {/* NAVIGATION */}

        <div
          style={{
            display: "flex",
            gap: "18px",
            alignItems: "center",
            flexWrap: "wrap",
            color: "white",
          }}
        >
          <Link
            href="/"
            onClick={closeMenus}
          >
            Home
          </Link>

          <Link
            href="/dashboard"
            onClick={closeMenus}
          >
            Dashboard
          </Link>

          <Link
            href="/draws"
            onClick={closeMenus}
          >
            Draws
          </Link>

          <Link
            href="/winners"
            onClick={closeMenus}
          >
            Winners
          </Link>

          <Link
            href="/scores"
            onClick={closeMenus}
          >
            Scores
          </Link>

          {/* COMMUNITY */}

          <div
            style={{
              position:
                "relative",
            }}
          >
            <details>
              <summary
                style={{
                  cursor:
                    "pointer",
                  listStyle:
                    "none",
                }}
              >
                Community ▼
              </summary>

              <div
                style={
                  dropdownStyle
                }
              >
                <Link
                  href="/charities"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Charities
                </Link>

                <Link
                  href="/contributions"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Contributions
                </Link>
              </div>
            </details>
          </div>

          {/* ADMIN */}

          <div
            style={{
              position:
                "relative",
            }}
          >
            <details>
              <summary
                style={{
                  cursor:
                    "pointer",
                  listStyle:
                    "none",
                }}
              >
                Admin ▼
              </summary>

              <div
                style={
                  dropdownStyle
                }
              >
                <Link
                  href="/admin"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Admin Home
                </Link>

                <Link
                  href="/admin/users"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Users
                </Link>

                <Link
                  href="/admin/draws"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Draws
                </Link>

                <Link
                  href="/admin/charities"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Charities
                </Link>

                <Link
                  href="/admin/winners"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Winners
                </Link>
              </div>
            </details>
          </div>

          {/* MORE */}

          <div
            style={{
              position:
                "relative",
            }}
          >
            <details>
              <summary
                style={{
                  cursor:
                    "pointer",
                  listStyle:
                    "none",
                }}
              >
                More ▼
              </summary>

              <div
                style={
                  dropdownStyle
                }
              >
                <Link
                  href="/contact"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Contact
                </Link>

                <Link
                  href="/help"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Help
                </Link>

                <Link
                  href="/privacy"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Privacy
                </Link>

                <Link
                  href="/terms"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Terms
                </Link>
              </div>
            </details>
          </div>

          {/* ACCOUNT */}

          <div
            style={{
              position:
                "relative",
            }}
          >
            <details>
              <summary
                style={{
                  cursor:
                    "pointer",
                  listStyle:
                    "none",
                }}
              >
                👤 Account ▼
              </summary>

              <div
                style={
                  dropdownStyle
                }
              >
                <Link
                  href="/profile"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Profile
                </Link>

                <Link
                  href="/subscriptions"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Subscriptions
                </Link>

                <Link
                  href="/login"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Login
                </Link>

                <Link
                  href="/signup"
                  style={
                    itemStyle
                  }
                  onClick={
                    closeMenus
                  }
                >
                  Signup
                </Link>
              </div>
            </details>
          </div>
        </div>
      </div>
    </nav>
  );
}