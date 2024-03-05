import { BlockContainer, BlockDigit, BlockTitle } from "../style";

type ItemType = { item: { name: string; value: number } };

export const HeaderItem = ({ item }: ItemType): JSX.Element => {
  return (
    <BlockContainer key={item.name}>
      <BlockTitle>{item.name}</BlockTitle>
      <BlockDigit>{item.value}</BlockDigit>
    </BlockContainer>
  );
};
