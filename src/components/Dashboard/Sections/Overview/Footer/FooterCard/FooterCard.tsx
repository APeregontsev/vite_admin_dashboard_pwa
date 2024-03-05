import { FC } from "react";
import {
  CardBody,
  CardDetailsWrapper,
  CardHeaderWrapper,
  CardItemStat,
  CardItemText,
  CardItemWrapper,
  CardSubTitle,
  CardTitle,
  CardTitleWrapper,
  CardWrapper,
  DetailsText,
} from "./style";
import { ItemsDetails } from "../Footer";

type FooterCardProps = { item: { items: ItemsDetails[]; title: string } };

const FooterCard: FC<FooterCardProps> = ({ item }) => {
  return (
    <CardWrapper>
      <CardHeaderWrapper>
        <CardTitleWrapper>
          <CardTitle>{item.title}</CardTitle>
          <CardSubTitle>Category: Todos</CardSubTitle>
        </CardTitleWrapper>

        <CardDetailsWrapper>
          <DetailsText>View details</DetailsText>
        </CardDetailsWrapper>
      </CardHeaderWrapper>

      <CardBody>
        {item.items.map((item, index) => (
          <CardItemWrapper key={`${item.name}${index}`}>
            <CardItemText title={item.name}>{item.name}</CardItemText>
            <CardItemStat>{JSON.stringify(item.complete)}</CardItemStat>
          </CardItemWrapper>
        ))}
      </CardBody>
    </CardWrapper>
  );
};

export default FooterCard;
