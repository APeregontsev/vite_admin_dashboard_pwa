import { Fragment } from "react";
import { ErrorBoundary } from "./errorBoundary";

type RenderCollection<Data> = {
  collection: Data[];
  Component: any;
  ErrorComponent?: any;
  componentProps?: Record<string, any>;
};

const RenderCollection = <Data,>(props: RenderCollection<Data>): React.ReactNode => {
  const { collection, Component, componentProps, ErrorComponent } = props;

  return collection.map((item, index) => {
    return (
      <Fragment key={index}>
        <ErrorBoundary component={ErrorComponent}>
          <Component item={item} {...componentProps} />
        </ErrorBoundary>
      </Fragment>
    );
  });
};

export default RenderCollection;
