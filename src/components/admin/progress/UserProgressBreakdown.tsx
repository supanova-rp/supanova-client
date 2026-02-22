import { useState } from "react";
import ExpandCollapseButton from "src/components/ExpandCollapseButton";
import { feedbackMessages } from "src/constants/constants";
import { useQuery } from "src/hooks/useQuery";
import {
  ID,
  ProgressAdminView,
  QuizAttempts as QuizAttemptHistoryType,
} from "src/types";
import type { CourseQuizSectionServerModel } from "src/types/server";

import QuizAttemptHistoryPanel from "./QuizAttemptHistoryPanel";

type Props = {
  userProgress: ProgressAdminView;
  quizSectionsByID: Map<ID, CourseQuizSectionServerModel>;
};

const UserProgressBreakdown = ({ userProgress, quizSectionsByID }: Props) => {
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
            <ExpandCollapseButton
              isExpanded={isCourseExpanded}
              onClick={() => toggleCourse(courseProgress.courseID)}
            >
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
            </ExpandCollapseButton>
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
                        <div className="progress-section-item-header">
                          <div
                            className={`progress-section-square ${section.completed ? "completed" : "pending"}`}
                          />
                          <span className="progress-section-title">
                            {section.title}
                          </span>
                          {(!!quizHistory?.attempts ||
                            !!quizHistory?.currentAttempt) && (
                            <ExpandCollapseButton
                              isExpanded={isAttemptHistoryExpanded}
                              onClick={() => toggleAttemptHistory(section.id)}
                            />
                          )}
                        </div>
                        {isAttemptHistoryExpanded ? (
                          <div className="quiz-attempt-history-card">
                            <QuizAttemptHistoryPanel
                              attempts={quizHistory?.attempts}
                              currentAttempt={quizHistory?.currentAttempt}
                              quizSection={quizSectionsByID.get(section.id)}
                            />
                          </div>
                        ) : null}
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
