import { useState } from "react";
import ChevronRight from "src/assets/icons/chevronRight.svg?react";
import RequestHandler from "src/components/RequestHandler";
import { colors } from "src/constants/colorPalette";
import { feedbackMessages } from "src/constants/constants";
import { useQuery } from "src/hooks/useQuery";
import { ID, ProgressAdminView } from "src/types";

import UserProgressBreakdown from "./UserProgressBreakdown";
import AdminHeader from "../AdminHeader";

const ProgressDashboard = () => {
  const [expandedUsers, setExpandedUsers] = useState<Set<ID>>(new Set());
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
                {isExpanded ? (
                  <UserProgressBreakdown userProgress={userProgress} />
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
