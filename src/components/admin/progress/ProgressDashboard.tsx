import { useState } from "react";
import ChevronRight from "src/assets/icons/chevronRight.svg?react";
import RequestHandler from "src/components/RequestHandler";
import { colors } from "src/constants/colorPalette";
import { feedbackMessages } from "src/constants/constants";
import { useQuery } from "src/hooks/useQuery";
import { ID, ProgressAdminView } from "src/types";

import AdminHeader from "../AdminHeader";

const ProgressDashboard = () => {
  const [expandedUsers, setExpandedUsers] = useState<Set<ID>>(new Set());
  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(
    new Set(),
  );
  const { data, loading, error, refetch } = useQuery<ProgressAdminView[]>(
    "/admin/get-all-progress",
    {
      defaultError: feedbackMessages.genericError,
    },
  );

  const toggleUser = (userID: ID) => {
    setExpandedUsers(prev => {
      const next = new Set(prev);
      if (next.has(userID)) {
        next.delete(userID);
      } else {
        next.add(userID);
      }

      return next;
    });
  };

  const toggleCourse = (userID: ID, courseID: ID) => {
    const key = `${userID}-${courseID}`;
    setExpandedCourses(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }

      return next;
    });
  };

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
          {data?.map(userProgress => {
            const isExpanded = expandedUsers.has(userProgress.userID);
            return (
              <div key={userProgress.userID} className="progress-user-card">
                <button
                  type="button"
                  className="progress-user-header"
                  onClick={() => toggleUser(userProgress.userID)}
                >
                  <ChevronRight
                    stroke={colors.orange}
                    width={22}
                    className={`progress-expand-icon ${isExpanded ? "expanded" : ""}`}
                  />
                  <div className="progress-user-info">
                    <h5 className="progress-user-name">{userProgress.name}</h5>
                    <p className="progress-user-email">{userProgress.email}</p>
                  </div>
                </button>
                {isExpanded && userProgress.progress.length === 0 ? (
                  <p className="text-secondary">No course progress yet</p>
                ) : null}
                {isExpanded && userProgress.progress.length > 0
                  ? userProgress.progress.map(courseProgress => {
                      const isCourseExpanded = expandedCourses.has(
                        `${userProgress.userID}-${courseProgress.courseID}`,
                      );
                      return (
                        <div
                          key={courseProgress.courseID}
                          className="progress-course-row"
                        >
                          <button
                            type="button"
                            className="progress-course-header"
                            onClick={() =>
                              toggleCourse(
                                userProgress.userID,
                                courseProgress.courseID,
                              )
                            }
                          >
                            <ChevronRight
                              stroke={colors.orange}
                              width={18}
                              className={`progress-expand-icon ${isCourseExpanded ? "expanded" : ""}`}
                            />
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
                          </button>
                          {isCourseExpanded ? (
                            <div className="progress-sections">
                              <span className="progress-sections-label">
                                Sections:
                              </span>
                              <ul className="progress-section-list">
                                {courseProgress.courseSectionProgress.map(
                                  section => (
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
                                  ),
                                )}
                              </ul>
                            </div>
                          ) : null}
                        </div>
                      );
                    })
                  : null}
              </div>
            );
          })}
        </div>
      </RequestHandler>
    </>
  );
};

export default ProgressDashboard;
