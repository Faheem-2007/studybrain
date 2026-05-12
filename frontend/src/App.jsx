import { useState } from "react"

function App() {
  const [page, setPage] = useState("home")
  const [numSubjects, setNumSubjects] = useState("")
  const [showSubjects, setShowSubjects] = useState(false)
  const [subjects, setSubjects] = useState([])
  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI" }}>
      {page === "home" && (
        <div>
          <h1>StudyBrain</h1>
          <p>Your personal study companion</p>
          <button onClick={() => setPage("setup")}>Setup Semester</button>
          <button onClick={() => setPage("daily")}>Log Today</button>
          <button onClick={() => setPage("study")}>Study Mode</button>
        </div>
      )}

      {page === "setup" && (
        <div>
          <h2>Semester Setup</h2>
          <p>How many subjects this semester?</p>
          <input
            type="number"
            value={numSubjects}
            onChange={(e) => setNumSubjects(e.target.value)}
            placeholder="Enter number"
          />
          <button onClick={() => setShowSubjects(true)}>Confirm</button>
          <button onClick={() => setPage("home")}>Back</button>

          {showSubjects && (
            <div>
              {Array.from({ length: numSubjects }).map((_, i) => (
                <input
                  key={i}
                  placeholder={`Subject ${i + 1}`}
                  onChange={(e) => {
                    const updated = [...subjects]
                    updated[i] = e.target.value
                    setSubjects(updated)
                  }}
                />
              ))}
              <br />
              <button onClick={() => console.log(subjects)}>Save Subjects</button>
            </div>
          )}
        </div>
      )}

      {page === "daily" && (
        <div>
          <h2>Log Today</h2>
          <button onClick={() => setPage("home")}>Back</button>
        </div>
      )}

      {page === "study" && (
        <div>
          <h2>Study Mode</h2>
          <button onClick={() => setPage("home")}>Back</button>
        </div>
      )}
    </div>
  )
}

export default App