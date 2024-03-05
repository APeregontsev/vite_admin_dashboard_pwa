import { FC } from "react";
import { RefreshSpan, TextWrapper, UpdateWrapper, CloseSpan } from "./style";

type ServiceWorkerUpdateProps = { onRefresh: () => void; onCancel: () => void };

const ServiceWorkerUpdate: FC<ServiceWorkerUpdateProps> = ({ onRefresh, onCancel }) => {
  return (
    <UpdateWrapper>
      <TextWrapper>
        A new version of this App is available <RefreshSpan onClick={onRefresh}>REFRESH</RefreshSpan>
        <CloseSpan onClick={onCancel}>&#x2715;</CloseSpan>
      </TextWrapper>
    </UpdateWrapper>
  );
};

export default ServiceWorkerUpdate;
