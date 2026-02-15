import RequestHandler from "src/components/RequestHandler";
import { feedbackMessages } from "src/constants/constants";
import { useQuery } from "src/hooks/useQuery";
import { ProgressAdminView } from "src/types";

import AdminHeader from "../AdminHeader";

const ProgressDashboard = () => {
  const { data, loading, error, refetch } = useQuery<ProgressAdminView[]>(
    "/admin/get-all-progress",
    {
      defaultError: feedbackMessages.genericError,
    },
  );

  return (
    <>
      <AdminHeader title="User Progress" />
      <RequestHandler
        error={error}
        onClick={refetch}
        isLoading={loading}
        shouldShowWarning={!data?.length}
        warningMessage="No user progress data available."
      >
        <div className="progress-dashboard">
          {data?.map(userProgress => (
            <div key={userProgress.userID} className="progress-user-card">
              <h5 className="progress-user-name">{userProgress.name}</h5>
              <p className="progress-user-email">{userProgress.email}</p>
              {userProgress.progress.length === 0 ? (
                <p className="text-secondary">No course progress yet</p>
              ) : (
                userProgress.progress.map(courseProgress => (
                  <div
                    key={courseProgress.courseID}
                    className="progress-course-row"
                  >
                    <div className="progress-course-header">
                      <span className="progress-course-name">
                        {courseProgress.courseName}
                      </span>
                      <div className="progress-status-badges">
                        <span
                          className={`progress-badge ${
                            courseProgress.completedIntro
                              ? "completed"
                              : "pending"
                          }`}
                        >
                          Completed Intro
                        </span>
                        <span
                          className={`progress-badge ${
                            courseProgress.completedCourse
                              ? "completed"
                              : "pending"
                          }`}
                        >
                          Completed Course
                        </span>
                      </div>
                    </div>
                    <div className="progress-sections">
                      <span className="progress-sections-label">Sections:</span>
                      <ul className="progress-section-list">
                        {courseProgress.courseSectionProgress.map(section => (
                          <li
                            key={section.id}
                            className="progress-section-item"
                          >
                            <div
                              className={`progress-section-square ${section.completed ? "completed" : "pending"}`}
                            />
                            <span className="progress-section-title">
                              {section.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
              )}
            </div>
          ))}
        </div>
      </RequestHandler>
    </>
  );
};

export default ProgressDashboard;
