import React, { useState } from "react";

function TextForm(props) {


  const [text, setText] = useState('');
  const handleUpClick = () => {
    let newtext = text.toUpperCase();
    setText(newtext);
    props.showAlert("Converted to uppercase!","success");
  };
  const handleLoClick = () => {
    let newtext = text.toLowerCase();
    setText(newtext);
    props.showAlert("Converted to lowercase!","success");
  };
  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text=text;
    window.speechSynthesis.speak(msg);
    props.showAlert("speak text!","success");
  };
  const copy = () => {
    navigator.clipboard.writeText(text);
    props.showAlert("copy text!","success");
  };
  const handleExtraSpaces = () => {
    let newtext=text.split(/[ ]+/);
    setText(newtext.join(" "));
  }
  const handleClearClick = () => {
    let newtext ='';
    setText(newtext);
    props.showAlert("Clear text!","success");
  };

  const handleOnChange = (event) => {
    setText(event.target.value);
  };

  return (
    <>
      <div className="container" style={{color:props.mode==='dark'?'white':'#042743'}}>
        <div className="mb-3">
          <h1 className="mb-3">{props.heading}</h1>
          <textarea
            className="form-control"
            value={text}
            style={{backgroundColor:props.mode==='dark'?'#13466e':'white',color:props.mode==='dark'?'white':'#042743'}}
            onChange={handleOnChange}
            id="myBox"
            rows="8"
          ></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>
          Convert to Lowercase
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={speak}>
          Speak text
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={copy}>
          copy text
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>
          Remove Extra Spaces
        </button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick}>
          Clear text
        </button>
      </div>
      <div className="container my-3" style={{color:props.mode==='dark'?'white':'#042743'}}>
        <h1>Your text summery</h1>
        <p>
          {text.split(/\s+/).filter((element)=>{ return element.length !== 0}).length} words and {text.length} characters
        </p>
        <p>{0.008 * text.split(" ").filter((element)=>{ return element.length !== 0}).length} Minute read</p>
        <h2>Preview</h2>
        <p>{text.length>0?text:"Nothing to preview!!"}</p>
      </div>
    </>
  );
}

export default TextForm;
