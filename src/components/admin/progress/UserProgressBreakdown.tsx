import { useState } from "react";
import { Button } from "react-bootstrap";
import ChevronRight from "src/assets/icons/chevronRight.svg?react";
import { colors } from "src/constants/colorPalette";
import { feedbackMessages } from "src/constants/constants";
import { useQuery } from "src/hooks/useQuery";
import {
  ID,
  ProgressAdminView,
  QuizAttempts as QuizAttemptHistoryType,
} from "src/types";

import QuizAttemptHistoryPanel from "./QuizAttemptHistoryPanel";

type Props = {
  userProgress: ProgressAdminView;
};

const UserProgressBreakdown = ({ userProgress }: Props) => {
  const [expandedCourses, setExpandedCourses] = useState<Set<ID>>(new Set());
  const [expandedAttemptHistories, setExpandedAttemptHistories] = useState<
    Set<ID>
  >(new Set());
  const { data: attemptHistory } = useQuery<QuizAttemptHistoryType[]>(
    "/admin/quiz/get-attempts",
    {
      defaultError: feedbackMessages.genericError,
      requestBody: {
        userID: userProgress.userID,
      },
    },
  );

  const attemptsByQuizID = new Map(
    (attemptHistory ?? []).map(h => [h.quizID, h]),
  );

  const toggleAttemptHistory = (sectionID: ID) => {
    setExpandedAttemptHistories(prev => {
      const next = new Set(prev);
      if (next.has(sectionID)) {
        next.delete(sectionID);
      } else {
        next.add(sectionID);
      }

      return next;
    });
  };

  const toggleCourse = (courseID: ID) => {
    setExpandedCourses(prev => {
      const next = new Set(prev);
      if (next.has(courseID)) {
        next.delete(courseID);
      } else {
        next.add(courseID);
      }

      return next;
    });
  };

  if (userProgress.progress.length === 0) {
    return <p className="text-secondary">No course progress yet</p>;
  }

  return (
    <>
      {userProgress.progress.map(courseProgress => {
        const isCourseExpanded = expandedCourses.has(courseProgress.courseID);
        return (
          <div key={courseProgress.courseID} className="progress-course-row">
            <button
              type="button"
              className="progress-course-header"
              onClick={() => toggleCourse(courseProgress.courseID)}
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
                    courseProgress.completedIntro ? "completed" : "pending"
                  }`}
                >
                  Completed Intro
                </span>
                <span
                  className={`progress-badge ${
                    courseProgress.completedCourse ? "completed" : "pending"
                  }`}
                >
                  Completed Course
                </span>
              </div>
            </button>
            {isCourseExpanded ? (
              <div className="progress-sections">
                <span className="progress-sections-label">Sections:</span>
                <ul className="progress-section-list">
                  {courseProgress.courseSectionProgress.map(section => {
                    const quizHistory = attemptsByQuizID.get(section.id);
                    const isAttemptHistoryExpanded =
                      expandedAttemptHistories.has(section.id);
                    return (
                      <li key={section.id} className="progress-section-item">
                        <div
                          className={`progress-section-square ${section.completed ? "completed" : "pending"}`}
                        />
                        <span className="progress-section-title">
                          {section.title}
                        </span>
                        {quizHistory != null && (
                          <div className="progress-attempt-history">
                            <Button
                              variant="link"
                              className="nav-link progress-section-attempts-btn"
                              onClick={() => toggleAttemptHistory(section.id)}
                            >
                              {isAttemptHistoryExpanded
                                ? "Hide attempts"
                                : "Show attempts"}
                            </Button>
                            {isAttemptHistoryExpanded ? (
                              <QuizAttemptHistoryPanel
                                attempts={quizHistory.attempts}
                                currentAttempt={quizHistory.currentAttempt}
                              />
                            ) : null}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
};

export default UserProgressBreakdown;
