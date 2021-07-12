import {useState} from 'react';

/*
  id, pw, name, mail, phone
*/
const Sign = (props) => {
  const [id, setId]       = useState(null);
  const [pw, setPw]       = useState(null);

  const changeId = (e) => {
    setId(e.target.value);
  }
  const changePw = (e) => {
    setPw(e.target.value);
  }
  const sign = () => {

  }

  return (
    <div className="Sign" style={{margin:"0 auto", textAlign:"center"}}>
      <h1> Sign </h1>
      <span> ID </span> <br/>
      <input type="text" style={style.input}/> <br/>
      <span> Pw </span> <br/>
      <input type="password" style={style.input}/> <br/>
      <span> name </span> <br/>
      <input type="text" style={style.input}/> <br/>
      <span> mail </span> <br/>
      <input type="email" style={style.input}/> <br/>
      <span> phone </span> <br/>
      <input type="tel" pattern="[0-9]{3}[0-9]{4}[0-9]{4}" title="01012345678" style={style.input}/> <br/>
      <button onClick={sign}> Sign </button>
    </div>
  )
}

const style = {
  input : {
    width:"200px",
    height:"30px",
    margin: "10px 0px",
  }
}

export default Sign;
