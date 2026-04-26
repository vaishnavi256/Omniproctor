import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import DashboardNavbar from "@/components/DashboardNavbar";
import { ShieldAlert, Users, FileWarning } from "lucide-react";

const SuspiciousActivities = () => {
  const adminId = localStorage.getItem("adminId");

  const [tests, setTests] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [logs, setLogs] = useState([]);

  const [loadingTests, setLoadingTests] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const API = "http://localhost:3000";

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await axios.get(`${API}/api/tests/active/${adminId}`);
        setTests(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingTests(false);
      }
    };

    fetchTests();
  }, [adminId]);

  const handleTestClick = async (test) => {
    setSelectedTest(test);
    setSelectedStudent(null);
    setLogs([]);
    setLoadingStudents(true);

    try {
      const res = await axios.get(`${API}/api/tests/${test.id}/users`);
      setStudents(res.data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingStudents(false);
    }
  };

  const handleStudentClick = async (student) => {
    setSelectedStudent(student);
    setLoadingLogs(true);

    try {
      const res = await axios.get(`${API}/api/activities`, {
        params: {
          userId: student.id,
          testId: selectedTest.id,
        },
      });

      setLogs(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLogs(false);
    }
  };

  const severityColor = (level) => {
    if (level === "HIGH") return "text-red-500 bg-red-500/10";
    if (level === "MEDIUM") return "text-yellow-500 bg-yellow-500/10";
    return "text-blue-500 bg-blue-500/10";
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <p className="text-muted-foreground text-sm font-medium mb-1">
            Monitoring Center
          </p>
          <h1 className="text-3xl font-bold text-foreground">
            Suspicious Activities
          </h1>
        </motion.div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          <SectionCard title="Active Tests" icon={ShieldAlert}>
            {loadingTests ? (
              <p className="text-muted-foreground">Loading tests...</p>
            ) : (
              <div className="space-y-4">
                {tests.map((test) => (
                  <SelectableCard
                    key={test.id}
                    active={selectedTest?.id === test.id}
                    onClick={() => handleTestClick(test)}
                  >
                    <h3 className="font-semibold text-foreground">{test.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Test ID: {test.id}
                    </p>
                  </SelectableCard>
                ))}
              </div>
            )}
          </SectionCard>

          <SectionCard title="Students" icon={Users}>
            {!selectedTest && (
              <p className="text-muted-foreground">Select a test first</p>
            )}

            {loadingStudents && (
              <p className="text-muted-foreground">Loading students...</p>
            )}

            <div className="space-y-4">
              {students.map((student) => (
                <SelectableCard
                  key={student.id}
                  active={selectedStudent?.id === student.id}
                  onClick={() => handleStudentClick(student)}
                >
                  <h3 className="font-semibold text-foreground">
                    {student.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {student.email}
                  </p>
                </SelectableCard>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Activity Logs" icon={FileWarning}>
            {!selectedStudent && (
              <p className="text-muted-foreground">Select a student first</p>
            )}

            {loadingLogs && (
              <p className="text-muted-foreground">Loading logs...</p>
            )}

            <div className="space-y-4 max-h-[650px] overflow-y-auto">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="bg-background border border-border rounded-xl p-4"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-foreground">
                      {log.eventType}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${severityColor(
                        log.severity
                      )}`}
                    >
                      {log.severity}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">
                    {log.description}
                  </p>

                  {log.metadata && (
                    <pre className="bg-card border border-border rounded-lg p-3 text-xs overflow-auto">
                      {JSON.stringify(log.metadata, null, 2)}
                    </pre>
                  )}

                  <p className="text-xs text-muted-foreground mt-3">
                    {new Date(log.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </main>
    </div>
  );
};

const SectionCard = ({ title, icon: Icon, children }) => (
  <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
    <div className="flex items-center gap-3 mb-5">
      <div className="h-10 w-10 rounded-lg bg-stat-bg flex items-center justify-center">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
    {children}
  </div>
);

const SelectableCard = ({ children, active, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`p-4 rounded-xl cursor-pointer border transition-all duration-300 ${
      active
        ? "border-primary bg-primary/5"
        : "border-border hover:border-primary/30 hover:bg-muted/30"
    }`}
  >
    {children}
  </motion.div>
);

export default SuspiciousActivities;