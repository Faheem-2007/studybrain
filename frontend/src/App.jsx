import { useState } from "react"

const styles = {
  app: { minHeight: "100vh", background: "#0f0f0f", color: "#e8e8e8", fontFamily: "Segoe UI, sans-serif", padding: "40px 32px", maxWidth: "600px", margin: "0 auto" },
  logo: { fontSize: "28px", fontWeight: 600, color: "#fff", letterSpacing: "-0.5px" },
  logoSpan: { color: "#7c6af7" },
  subtitle: { fontSize: "14px", color: "#888", marginTop: "6px" },
  navCards: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginTop: "32px" },
  navCard: { background: "#1a1a1a", border: "0.5px solid #2a2a2a", borderRadius: "12px", padding: "20px 16px", cursor: "pointer", textAlign: "left" },
  navCardIcon: { fontSize: "22px", marginBottom: "12px" },
  navCardLabel: { fontSize: "13px", fontWeight: 500, color: "#e8e8e8" },
  navCardDesc: { fontSize: "11px", color: "#666", marginTop: "4px" },
  sectionTitle: { fontSize: "18px", fontWeight: 500, color: "#fff", marginBottom: "4px" },
  sectionSub: { fontSize: "13px", color: "#666", marginBottom: "24px" },
  input: { background: "#1a1a1a", border: "0.5px solid #2a2a2a", borderRadius: "8px", padding: "10px 14px", color: "#e8e8e8", fontSize: "14px", width: "100%", outline: "none", marginBottom: "10px" },
  textarea: { background: "#1a1a1a", border: "0.5px solid #2a2a2a", borderRadius: "8px", padding: "10px 14px", color: "#e8e8e8", fontSize: "14px", width: "100%", outline: "none", resize: "vertical", minHeight: "80px" },
  btn: { background: "#7c6af7", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "13px", fontWeight: 500, cursor: "pointer" },
  disabledBtn: { opacity: 0.65, cursor: "not-allowed" },
  backBtn: { background: "none", border: "none", color: "#666", fontSize: "13px", cursor: "pointer", marginBottom: "24px" },
  subjectLog: { background: "#1a1a1a", border: "0.5px solid #424242", borderRadius: "10px", padding: "16px", marginBottom: "12px" },
  subjectLogTitle: { fontSize: "13px", fontWeight: 500, color: "#bbb", marginBottom: "10px" },
  dayBadge: { display: "inline-block", background: "#1e1a40", color: "#7c6af7", fontSize: "12px", padding: "4px 12px", borderRadius: "20px", marginBottom: "20px" },
  successMessage: { marginTop: "14px", padding: "12px 14px", border: "1px solid #285943", borderRadius: "8px", background: "#14251d", color: "#79d9a8", fontSize: "13px" },
  errorMessage: { marginTop: "14px", padding: "12px 14px", border: "1px solid #663737", borderRadius: "8px", background: "#281717", color: "#f29a9a", fontSize: "13px" },
}

function App() {
  const [page, setPage] = useState("home")
  const [numSubjects, setNumSubjects] = useState("")
  const [showSubjects, setShowSubjects] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [todayData, setTodayData] = useState(null)
  const [logs, setLogs] = useState({})
  const [setupStatus, setSetupStatus] = useState("idle")
  const [setupMessage, setSetupMessage] = useState("")

  const confirmSubjectCount = () => {
    const count = Number(numSubjects)

    if (!Number.isInteger(count) || count < 1) {
      setSetupStatus("error")
      setSetupMessage("Enter at least one subject.")
      return
    }

    setSubjects((current) =>
      Array.from({ length: count }, (_, index) => current[index] || "")
    )
    setShowSubjects(true)
    setSetupStatus("idle")
    setSetupMessage("")
  }

  const saveSubjects = async () => {
    const cleanedSubjects = subjects.map((subject) => subject.trim())

    if (cleanedSubjects.some((subject) => !subject)) {
      setSetupStatus("error")
      setSetupMessage("fill in every subject before saving.")
      return
    }

    setSetupStatus("saving")
    setSetupMessage("")

    try {
      const res = await fetch("http://localhost:8000/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subjects: cleanedSubjects })
      })

      if (!res.ok) {
        throw new Error("Unable to save subjects")
      }

      setSubjects(cleanedSubjects)
      setSetupStatus("success")
      setSetupMessage(
        `${cleanedSubjects.length} ${cleanedSubjects.length === 1 ? "subject" : "subjects"} saved successfully.`
      )
    } catch {
      setSetupStatus("error")
      setSetupMessage("Could not save your changes. Make sure the backend is running and try again.")
    }
  }

  return (
    <div style={styles.app}>

      {page === "home" && (
        <div>
          <div style={styles.logo}>Study<span style={styles.logoSpan}>Brain</span></div>
          <div style={styles.subtitle}>Your personal study companion</div>
          <div style={styles.navCards}>
            <div style={styles.navCard} onClick={() => setPage("setup")}>
              <div style={styles.navCardIcon}>📚</div>
              <div style={styles.navCardLabel}>Setup Semester</div>
              <div style={styles.navCardDesc}>Add your subjects</div>
            </div>
            <div style={styles.navCard} onClick={() => setPage("daily")}>
              <div style={styles.navCardIcon}>📝</div>
              <div style={styles.navCardLabel}>Log Today</div>
              <div style={styles.navCardDesc}>What happened in class</div>
            </div>
            <div style={styles.navCard} onClick={() => setPage("study")}>
              <div style={styles.navCardIcon}>🧠</div>
              <div style={styles.navCardLabel}>Study Mode</div>
              <div style={styles.navCardDesc}>Get your revision plan</div>
            </div>
          </div>
        </div>
      )}

      {page === "setup" && (
        <div>
          <button style={styles.backBtn} onClick={() => setPage("home")}>← Back</button>
          <div style={styles.sectionTitle}>Semester Setup</div>
          <div style={styles.sectionSub}>How many subjects this semester?</div>
          <input
            type="number"
            style={{ ...styles.input, maxWidth: "120px" }}
            placeholder="e.g. 5"
            value={numSubjects}
            min="1"
            onChange={(e) => {
              setNumSubjects(e.target.value)
              setSetupStatus("idle")
              setSetupMessage("")
            }}
          />
          <button style={styles.btn} onClick={confirmSubjectCount}>Confirm</button>

          {showSubjects && (
            <div style={{ marginTop: "20px" }}>
              {Array.from({ length: numSubjects }).map((_, i) => (
                <input
                  key={i}
                  style={styles.input}
                  placeholder={`Subject ${i + 1}`}
                  value={subjects[i] || ""}
                  onChange={(e) => {
                    const updated = [...subjects]
                    updated[i] = e.target.value
                    setSubjects(updated)
                    setSetupStatus("idle")
                    setSetupMessage("")
                  }}
                />
              ))}
              <button
                style={{
                  ...styles.btn,
                  ...(setupStatus === "saving" ? styles.disabledBtn : {})
                }}
                disabled={setupStatus === "saving"}
                onClick={saveSubjects}
              >
                {setupStatus === "saving"
                  ? "Saving..."
                  : setupStatus === "success"
                    ? "Changes Saved"
                    : "Save Changes"}
              </button>

              {setupMessage && (
                <div
                  role="status"
                  style={setupStatus === "success" ? styles.successMessage : styles.errorMessage}
                >
                  {setupMessage}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {page === "daily" && (
        <div>
          <button style={styles.backBtn} onClick={() => setPage("home")}>← Back</button>
          <div style={styles.sectionTitle}>Log Today</div>
          <button style={styles.btn} onClick={async () => {
            const res = await fetch("http://localhost:8000/today")
            const data = await res.json()
            setTodayData(data)
          }}>Load Today</button>

          {todayData && (
            <div style={{ marginTop: "20px" }}>
              <div style={styles.dayBadge}>{todayData.day}</div>
              {todayData.subjects.map((subject, i) => (
                <div key={i} style={styles.subjectLog}>
                  <div style={styles.subjectLogTitle}>{subject}</div>
                  <textarea
                    style={styles.textarea}
                    placeholder={`What happened in ${subject} today?`}
                    onChange={(e) => {
                      const updated = { ...logs }
                      updated[subject] = e.target.value
                      setLogs(updated)
                    }}
                  />
                </div>
              ))}
              <button style={{ ...styles.btn, marginTop: "12px" }} onClick={async () => {
                const res = await fetch("http://localhost:8000/log", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ date: todayData.day, logs })
                })
                const data = await res.json()
                console.log(data)
                alert("Log saved!")
              }}>Save Log</button>
            </div>
          )}
        </div>
      )}

      {page === "study" && (
        <div>
          <button style={styles.backBtn} onClick={() => setPage("home")}>← Back</button>
          <div style={styles.sectionTitle}>Study Mode</div>
          <div style={styles.sectionSub}>Claude will build your revision plan based on your logs</div>
          <button style={styles.btn}>Generate My Plan</button>
        </div>
      )}

    </div>
  )
}

export default App
