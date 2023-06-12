export const Toggle = ({ children, onScreen }) => {
  return <>{onScreen ? children : null}</>;
};

export const ToggleTheme = ({ toggle }) => {
  return (
    <div style={{zIndex:"+1", top: "0", left: "0", position: "absolute" }}>
      <button
        onClick={toggle}
      >
        Cambiar de tema
      </button>
    </div>
  );
};
