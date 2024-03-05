import { FC, useMemo } from "react";
import { FooterWrapper } from "./style";
import FooterCard from "./FooterCard";
import { useAppSelector } from "store/store";
import { lastAddedTodos, lastCompletedTodos } from "../functions";
import RenderCollection from "common/ErrorsHandling/RenderCollection";

export type ItemsDetails = { name: string; complete: boolean };

const FooterOverview: FC = () => {
  const todos = useAppSelector((state) => state.data.todos);

  // Lets prepare data for Footer blocks -> must be 2 blocks
  const lastCompleted_Todos = useMemo(() => lastCompletedTodos(todos), [todos]);
  const lastAdded_Todos = useMemo(() => lastAddedTodos(todos), [todos]);

  const footerData = [
    {
      title: "Last completed Todos",
      items: lastCompleted_Todos,
    },
    {
      title: "Last added Todos",
      items: lastAdded_Todos,
    },
  ];

  return (
    <FooterWrapper>
      <RenderCollection collection={footerData} Component={FooterCard} />
    </FooterWrapper>
  );
};

export default FooterOverview;
