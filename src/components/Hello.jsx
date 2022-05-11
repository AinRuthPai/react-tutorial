function Hello({ colorr, name, fontSize, isSpecial }) {
  return (
    <div style={{ color: colorr, fontSize }}>
      {isSpecial ? "*****" : null}Hi {name} <br />
      {isSpecial && "***"}Hi {name}
    </div>
  );
}

Hello.defaultProps = {
  name: "이름 없음",
};

export default Hello;
