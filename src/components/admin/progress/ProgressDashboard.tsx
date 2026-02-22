import { useState } from "react";
import { Button } from "react-bootstrap";
import ExpandCollapseButton from "src/components/ExpandCollapseButton";
import RequestHandler from "src/components/RequestHandler";
import { feedbackMessages } from "src/constants/constants";
import { useQuery } from "src/hooks/useQuery";
import { ID, ProgressAdminView } from "src/types";
import { CourseQuizSectionServerModel } from "src/types/server";

import UserProgressBreakdown from "./UserProgressBreakdown";
import AdminHeader from "../AdminHeader";

const ProgressDashboard = () => {
  const [expandedUsers, setExpandedUsers] = useState<Set<ID>>(new Set());
  const [isHappyBirthdayExpanded, setIsHappyBirthdayExpanded] = useState(false);
  const { data, loading, error, refetch } = useQuery<ProgressAdminView[]>(
    "/admin/get-all-progress",
    {
      defaultError: feedbackMessages.genericError,
    },
  );

  const {
    data: quizSections,
    loading: quizSectionsLoading,
    error: quizSectionsError,
    refetch: refetchQuizSections,
  } = useQuery<CourseQuizSectionServerModel[]>("/quiz/get-all-sections", {
    defaultError: feedbackMessages.genericError,
  });

  const refetchAll = () => {
    refetch();
    refetchQuizSections();
  };

  const quizSectionsByID = new Map((quizSections ?? []).map(s => [s.id, s]));

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

  return (
    <>
      <AdminHeader title="User Progress" />
      <RequestHandler
        error={error || quizSectionsError}
        onClick={refetchAll}
        isLoading={loading || quizSectionsLoading}
        shouldShowWarning={!data?.length}
        warningMessage="No user progress data available."
      >
        <div className="progress-dashboard">
          <div className="progress-user-card">
            <ExpandCollapseButton
              isExpanded={isHappyBirthdayExpanded}
              className="progress-user-header"
              onClick={() => setIsHappyBirthdayExpanded(prev => !prev)}
            >
              <div className="progress-user-info">
                <h5 className="progress-user-name">Happy Birthday Joel!</h5>
              </div>
            </ExpandCollapseButton>
            {isHappyBirthdayExpanded ? (
              <div
                className="progress-user-breakdown"
                style={{ paddingTop: 12 }}
              >
                <p>
                  This dashboard tracks how far users have gotten in each course
                  (green dot completed section, grey dot not completed section),
                  whether they&apos;ve completed the intro or entire course.
                </p>
                <p>
                  It also shows any previous attempts they had at the quizzes
                  (showing which questions they answered incorrectly) and if it
                  hasn&apos;t been completed yet it will also show what
                  they&apos;ve selected so far in their current attempt.
                </p>
                <p>
                  NOTE - one caveat with the quiz attempt history, the backend
                  wasn&apos;t collecting this data before so this will only work
                  for future quiz attempts/submissions as there is no data for
                  anything before this feature was added :(. Anyway, hope you
                  like it, let me know if any bugs :3.
                </p>
                <p>From Jambo!</p>
              </div>
            ) : null}
          </div>

          <div className="d-flex justify-content-end">
            <Button variant="primary" size="sm" onClick={refetchAll}>
              Refresh data
            </Button>
          </div>

          {data?.map(userProgress => {
            const isExpanded = expandedUsers.has(userProgress.userID);
            return (
              <div key={userProgress.userID} className="progress-user-card">
                <ExpandCollapseButton
                  isExpanded={isExpanded}
                  className="progress-user-header"
                  onClick={() => toggleUser(userProgress.userID)}
                >
                  <div className="progress-user-info">
                    <h5 className="progress-user-name">{userProgress.name}</h5>
                    <p className="progress-user-email">{userProgress.email}</p>
                  </div>
                </ExpandCollapseButton>
                {isExpanded ? (
                  <UserProgressBreakdown
                    userProgress={userProgress}
                    quizSectionsByID={quizSectionsByID}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </RequestHandler>
    </>
  );
};

export default ProgressDashboard;
