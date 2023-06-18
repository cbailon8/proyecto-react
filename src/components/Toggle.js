export const Toggle = ({ children, onScreen }) => {
  return <>{onScreen ? children : null}</>;
};

export const ToggleTheme = ({ toggle }) => {
  return (
    <div style={{zIndex:"+1"}}>
      <button
        onClick={toggle}
      >
        Cambiar de tema
      </button>
    </div>
  );
};
