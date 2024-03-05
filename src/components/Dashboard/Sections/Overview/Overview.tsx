import { DiagramSection, Wrapper } from "./style";
import { formData } from "./functions";
import HeaderOverview from "./Header";
import AgendaBlock from "./AgendaBlock";
import FooterOverview from "./Footer";
import { useAppSelector } from "store/store";
import { useLoadData } from "store/slices/loadDataHooks";
import PageLoader from "common/Loaders/PageLoader/PageLoader";
import Chart from "./Chart";

const Overview = () => {
  const { isLoading } = useLoadData();

  const todos = useAppSelector((state) => state.data.todos);

  // Lets form data to build the chart: lets count completed/ not-completed TODOS with defined Interval
  // and build defined structure

  const interval = 10;

  const formedData = formData(todos, interval);

  return (
    <Wrapper>
      <HeaderOverview />

      <DiagramSection>
        {isLoading ? <PageLoader /> : <Chart data={formedData} />}

        <AgendaBlock />
      </DiagramSection>

      <FooterOverview />
    </Wrapper>
  );
};

export default Overview;
