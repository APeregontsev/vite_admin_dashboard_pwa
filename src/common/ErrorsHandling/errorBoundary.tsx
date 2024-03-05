import React, { ReactElement } from "react";

export class ErrorBoundary extends React.Component<{ children: any; component?: ReactElement }> {
  constructor(props: { children: any }) {
    super(props);
    this.state = { hasError: false };
  }

  state: Readonly<{
    hasError: boolean;
  }>;

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(
    error: { message?: string; stack?: any } = {},
    errorInfo: any,
    { message, stack } = error
  ) {
    console.warn("ErrorBoundary : componentDidCatch\n", message, stack, errorInfo?.componentStack);
  }

  // Error block to display in case of error (component received via props? component : span)
  errorBadge = this.props.component ? (
    this.props.component
  ) : (
    <span title={"Node rendering error"} style={{ margin: "3px", color: "red" }}>
      Err
    </span>
  );

  render() {
    return this.state.hasError ? this.errorBadge : this.props.children;
  }
}
