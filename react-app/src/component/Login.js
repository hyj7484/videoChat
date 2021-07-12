import {useState, useEffect} from 'react';


/*
  id, pw, name, mail, phone
*/
const Login = (props) => {
  const [id, setId]       = useState(null);
  const [pw, setPw]       = useState(null);
  const [name, setName]   = useState(null);
  const [mail, setMail]   = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(()=>{
    console.log(id);
    console.log(pw);
    console.log(name);
    console.log(mail);
    console.log(phone);
  }, [id, pw, name, mail, phone]);
  const changeColor = (e) => {
    console.log(e.target.value);
  }
  const changeId = (e) => {
    setId(e.target.value);
  }
  const changePw = (e) => {
    setPw(e.target.value);
  }
  const changeName = (e) => {
    setName(e.target.value);
  }
  const changeMail = (e) => {
    setMail(e.target.value);
  }
  const changePhone = (e) => {
    setPhone(e.target.value);
  }

  const changeVal = (e) => {
    console.log(e.target.value);
  }


  return (
    <div className="Login">
      <input type="text" onChange={changeId} placeholder="아이디를 입력하세요."/>
      <input type="password" onChange={changePw} placeholder="비밀번호를 입력하세요."/>
      <input type="text" onChange={changeName} placeholder="이름을 입력하세요."/>
      <input type="email" onChange={changeMail} placeholder="메일을 입력하세요."/>
      <input type="tel" onChange={changePhone} placeholder="휴대폰 번호를 입력하세요."/>
      <input type="color" onChange={changeColor}/>

      <input type="range" max="21" min="5" step="2" defaultValue="5" onChange={changeVal}/>
    </div>
  )
}

export default Login;
