import "./error.scss";
const Error = () => {
  return (
    <div className="error-pg">
      <div className="error-number">
        <div className="number left-coffee">4</div>
        <div className="coffee-mug"></div>
        <div className="number right-coffee">4</div>
      </div>
      <div className="sm-screen">404</div>
      <div className="mean-msg">
        Nothing to see here, <a href="/menu">go back home!</a>
      </div>
    </div>
  );
};

export default Error;
