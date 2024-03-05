const ClearSVG = ({ action, title }: { action: () => void; title: string }) => {
  return (
    <div style={{ display: "flex", alignItems: "center" }} title={title}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22px"
        height="22px"
        viewBox="0 0 22 22"
        version="1.1"
        onClick={action}
      >
        <g id="surface1">
          <path
            stroke="none"
            fill="rgb(100%,100%,100%)"
            d="M 17 11 C 17 14.3125 14.3125 17 11 17 C 7.6875 17 5 14.3125 5 11 C 5 7.6875 7.6875 5 11 5 C 14.3125 5 17 7.6875 17 11 Z M 17 11 "
          />
          <path
            stroke="none"
            d="M 11 3 C 6.582031 3 3 6.582031 3 11 C 3 15.417969 6.582031 19 11 19 C 15.417969 19 19 15.417969 19 11 C 19 6.582031 15.417969 3 11 3 M 7.707031 7 L 11 10.292969 L 14.292969 7 L 15 7.707031 L 11.707031 11 L 15 14.292969 L 14.292969 15 L 11 11.707031 L 7.707031 15 L 7 14.292969 L 10.292969 11 L 7 7.707031 L 7.707031 7 "
          />
        </g>
      </svg>
    </div>
  );
};

export default ClearSVG;
