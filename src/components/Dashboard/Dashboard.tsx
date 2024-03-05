import { FC } from "react";
import { DashboardBody, DashboardWrapper, DataGridWrapper, Wrapper } from "./style";
import { Navigate } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import { useLoadData } from "store/slices/loadDataHooks";
import { useCurrentPath } from "hooks/useCurrentPath";
import { CONFIG_DASHBOARD } from "./config";
import Sidebar from "./Sidebar";
import DashBoardHeader from "./Header";
import { ErrorBoundary } from "common/ErrorsHandling/errorBoundary";
import PageLoader from "common/Loaders/PageLoader/PageLoader";

const Dashboard: FC = () => {
  const { isLoading } = useLoadData();

  // Getting current path
  const { addressPath } = useCurrentPath();

  // Redirecting if no such page found in Dashboard/
  const routeExist = CONFIG_DASHBOARD.filter((item) => item.name.toLowerCase() === addressPath);
  if (isEmpty(routeExist)) return <Navigate to={"/dashboard/overview"} />;

  return (
    <Wrapper>
      <Sidebar />

      <DashboardWrapper>
        <ErrorBoundary>
          <DashBoardHeader title={addressPath} />
        </ErrorBoundary>

        <DashboardBody>
          <ErrorBoundary>
            <DataGridWrapper>
              {isLoading && <PageLoader />}

              {CONFIG_DASHBOARD.map((section) => {
                if (section.name.toLowerCase() === addressPath) {
                  const ContentElement = section.element;
                  return <ContentElement key={section.id} />;
                }
              })}
            </DataGridWrapper>
          </ErrorBoundary>
        </DashboardBody>
      </DashboardWrapper>
    </Wrapper>
  );
};

export default Dashboard;
