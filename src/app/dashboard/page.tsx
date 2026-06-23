import AuthGuard from "@/components/AuthGuard";

"use client";

export default function Dashboard() {
  const scores = [31, 33, 28, 31, 24];
  const drawNumbers = [24, 31, 28, 33, 31];

  return (
    <AuthGuard>
      <main
      style={{
          height: "100vh",
          overflow: "hidden",
          background: "#020b24",
      }}

     className="min-h-screen bg-[#0b1220] text-white w-full">
      <div className="w-full px-8">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-5xl font-bold">Dashboard</h1>
            <p className="text-slate-400 mt-2">
              Welcome back to Digital Heroes
            </p>
          </div>

          <button
          className="bg-green-500 text-black font-bold rounded-full"
          style={{
            padding: "14px 28px",
            fontSize: "16px",
            minWidth: "180px",
            height: "52px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
            cursor: "pointer",
            }}
            >
            Enter New Draw
            </button>
        </div>

        {/* HERO */}
        <div className="bg-gradient-to-r from-emerald-500 via-green-400 to-lime-300 rounded-3xl p-8 mb-8 text-black shadow-2xl"
        style={{
          marginTop: "30px",
          }}
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div 
            style={{
              paddingLeft: "12px",
              }}
            >
            <p  className="font-semibold text-sm uppercase"
              style={{
                paddingTop: "6px",
                lineHeight: "18px",
                }}
                >
                Subscriber Dashboard
                </p>
                <h2
                className="text-5xl font-black"
                style={{
                  marginTop: "8px",
                  lineHeight: "1.1",
                  }}
                  >
                  Golf Charity Platform
                  </h2>
                  <p
                  className="text-lg"
                  style={{
                    marginTop: "12px",
                    lineHeight: "1.5",
                    }}
                    >
                    Premium Membership Active
                    </p>
            </div>

            <div className="mt-6 lg:mt-0 flex gap-4 items-center">
              <span className="bg-white px-4 py-2 rounded-full font-bold">
                ✓ Pro Yearly
              </span>

              <div className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl">
                A
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          <StatCard
            title="Draws Entered"
            value="7"
            sub="Next draw in 3 days"
          />

          <StatCard
            title="Total Won"
            value="£340"
            sub="2 prizes claimed"
          />

          <StatCard
            title="Charity Given"
            value="£48.60"
            sub="Supporting good causes"
          />

          <StatCard
            title="Average Score"
            value="29.4"
            sub="Stableford Points"
          />
        </div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-3 gap-6 mb-8">

          {/* SCORES */}
          <div className="xl:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-6"
          style={{
            minHeight: "400px",
              }}
>            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                My Last 5 Scores
              </h2>

              <button className="text-green-400">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {scores.map((score, index) => (
                <div
                  key={index}
                  className="bg-slate-800 rounded-2xl p-4 flex justify-between items-center"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-green-500 text-black rounded-xl flex items-center justify-center font-black">
                      {score}
                    </div>

                    <div>
                      <h3 className="font-bold">
                        {score} Points
                      </h3>

                      <p className="text-slate-400 text-sm">
                        Round #{index + 1}
                      </p>
                    </div>
                  </div>

                  <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
                    Top 15%
                  </span>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 border border-slate-700 rounded-xl py-3 hover:bg-slate-800">
              + Add New Score
            </button>
          </div>

          {/* DRAW */}
          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <h2 className="text-2xl font-bold mb-5">
              March Draw
            </h2>

            <div className="flex flex-wrap gap-3 mb-6">
              {drawNumbers.map((n, i) => (
                <div
                  key={i}
                  className="w-14 h-14 rounded-full bg-green-500 text-black font-bold flex items-center justify-center"
                >
                  {n}
                </div>
              ))}
            </div>

            <h3 className="font-bold mb-4">
              Prize Breakdown
            </h3>

            <div className="space-y-3 text-slate-300">
              <div className="flex justify-between">
                <span>5 Match Jackpot</span>
                <span>£4,200</span>
              </div>

              <div className="flex justify-between">
                <span>4 Match</span>
                <span>£1,470</span>
              </div>

              <div className="flex justify-between">
                <span>3 Match</span>
                <span>£1,050</span>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="grid lg:grid-cols-2 gap-6"
        style={{
          marginTop: "8px",
          }}
>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <h2 className="text-2xl font-bold mb-4">
              ❤️ My Charity
            </h2>

            <div className="bg-slate-800 rounded-2xl p-5">
              <h3 className="text-xl font-bold">
                Digital Heroes Foundation
              </h3>

              <p className="text-slate-400 mt-3">
                Supporting communities through sports,
                technology and education initiatives.
              </p>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6">
            <h2 className="text-2xl font-bold mb-4">
              💰 Winnings & Payouts
            </h2>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Total Won
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  £340
                </h3>
              </div>

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Claimed
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  2
                </h3>
              </div>

              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm">
                  Pending
                </p>

                <h3 className="text-2xl font-bold mt-2">
                  £0
                </h3>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
    </AuthGuard>
  );
}

function StatCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
      <p className="text-slate-400">
        {title}
      </p>

      <h2 className="text-4xl font-black mt-3">
        {value}
      </h2>

      <p className="text-green-400 mt-3">
        {sub}
      </p>
    </div>
  );
}