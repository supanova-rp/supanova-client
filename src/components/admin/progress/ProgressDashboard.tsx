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
  const [search, setSearch] = useState("");
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

  const filteredData = search
    ? data?.filter(u => {
        const q = search.toLowerCase();
        return (
          u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
        );
      })
    : data;

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
          <div className="d-flex align-items-center gap-3 justify-content-between">
            <div className="progress-search">
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              {search ? (
                <button
                  type="button"
                  className="progress-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  &times;
                </button>
              ) : null}
            </div>
            <Button variant="primary" size="sm" onClick={refetchAll}>
              Refresh data
            </Button>
          </div>

          {filteredData?.map(userProgress => {
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
