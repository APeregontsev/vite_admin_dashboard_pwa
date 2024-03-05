import { AgendaBlockContainer, AgendaDigit, AgendaTitle } from "../style";

type ItemType = { item: { name: string; value: number } };

export const AgendaItem = ({ item }: ItemType): JSX.Element => {
  return (
    <AgendaBlockContainer key={item.name}>
      <AgendaTitle>{item.name}</AgendaTitle>
      <AgendaDigit>{item.value}</AgendaDigit>
    </AgendaBlockContainer>
  );
};
