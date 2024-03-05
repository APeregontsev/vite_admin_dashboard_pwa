import { FC } from "react";
import { ButtonsWrapper, ConfirmBody, ConfirmWrapper, HighlightText } from "./style";
import { Subtitle, Title } from "ui/Titles";
import { CancelButton, DeleteButton } from "ui/Buttons";
import InlineLoader from "common/Loaders/InlineLoader/InlineLoader";

type ConfirmPlateProps = { onConfirm: () => void; onCancel: () => void; title: string; isLoading: boolean };

const ConfirmPlate: FC<ConfirmPlateProps> = ({ onConfirm, onCancel, title, isLoading }) => {
  return (
    <ConfirmWrapper>
      <ConfirmBody>
        <Title $caution>Delete this entry?</Title>
        <Subtitle $alignLeft>
          Are you sure you want to delete the <HighlightText>"{title}"</HighlightText> ?
        </Subtitle>
      </ConfirmBody>

      <ButtonsWrapper>
        <DeleteButton onClick={onConfirm} disabled={isLoading}>
          {isLoading ? <InlineLoader /> : "Delete"}
        </DeleteButton>

        <CancelButton $confirm onClick={onCancel}>
          Cancel
        </CancelButton>
      </ButtonsWrapper>
    </ConfirmWrapper>
  );
};

export default ConfirmPlate;
