import { StyledCloseSVG } from "./style";

export const ErrorIcon = () => {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--toastify-icon-color-error)">
      <path d="M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z"></path>
    </svg>
  );
};

export const SuccessIcon = () => {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="var(--toastify-icon-color-success)">
      <path d="M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z"></path>
    </svg>
  );
};

export const CloserIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <StyledCloseSVG aria-hidden="true" viewBox="0 0 14 16" width="14" height="16" onClick={onClick}>
      <path
        fillRule="evenodd"
        d="M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z"
      ></path>
    </StyledCloseSVG>
  );
};
