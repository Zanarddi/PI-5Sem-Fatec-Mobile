import { useNavigate } from "react-router-dom";

export const Documentation = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="app-containter">
      <div className='login-page'>
        <h1>Documentation</h1>
        <button onClick={goBack}>Home</button>
      </div>
    </div>
  );
}