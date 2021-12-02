import * as React from "react";
import { Col, Container, FormControl, InputGroup, Row, Button, Toast, ToastContainer } from "react-bootstrap"
import "../style/global.sass"
import _ from "lodash";



// markup
const IndexPage = () => {
  const [input, setInput] = React.useState("");
  const [compare, setCompare] = React.useState("");
  const [stepsLPS, setStepsLPS] = React.useState([]);
  const [stepsKMP, setStepsKMP] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const lpsSteps = [{
      step: 0,
      i: 1,
      length: 0,
      lps: [0],
      instr: "lps[0] is always 0"
    }];

  const kmpSteps = [];

  function resetSteps(){
    lpsSteps.splice(1, lpsSteps.length-1);
    kmpSteps.splice(1,kmpSteps.length-1);
  }

  function lpsStepMaker(s){

    return(
      <Row key={s.step} className="step">
        <h4>Step: {s.step}</h4>
        <h5>Pattern: {compare}</h5>
        <hr></hr>
        <p>
          {s.instr}
        </p>
        <hr></hr>
        <p>
          i = {s.i}
          <br />
          length = {s.length}
        </p>
        <p>
          LPS = [{s.lps.map(v => v + ",")}]
        </p>
      </Row>
    )

  }
  function kmpStepMaker(s){
    return(
      <Row key={s.step} className="step">
        <h4>Step: {s.step}</h4>
        <h5>String: {s.string}</h5>
        <h5>Pattern: {s.comp}</h5>
        <hr></hr>
        <p>
          {s.instr}
        </p>
        <hr></hr>
        <p>
          i = {s.i}
          <br />
          j = {s.j}
        </p>
        <p>
          LPS = [{s.lps.map(v => v + ",")}]
        </p>
        <p>
          Patterns found at index: {s.pattern.map(p => p + ", ")}
        </p>
      </Row>
    )
  }
    


  
  function kmpSearch(input, compare){
    
    let n = input.length;
    let m = compare.length;
    let lps = lpsArray(input, compare);
    let pattern = []
    setStepsLPS(lpsSteps);

    let newStep = {
      string: input,
      comp: compare,
      step: 0,
      i: 0,
      j: 0,
      pattern: [],
      instr: "Starting Values",
      lps: lps
    }

    kmpSteps[0] = _.clone(newStep);


    let step = 0;
    let i = 0;
    let j = 0;
    while(i < n){
      if(compare[j] === input[i]){
        step++;
        newStep.instr = "i = " + i + " j = " + j + ", String[i] = " + input[i] + " and Pat[j] = " + compare[j] + ", match so increase i and j"
        j++;
        i++;
        newStep.i++;
        newStep.j++;
        newStep.step++;
        kmpSteps[step] = _.clone(newStep);
      }
      if(j === m){
        step++;
        newStep.instr = "j = " + j + " = length of pattern, pattern found at " + (i-j) + ", set j to lps[j-1] = " + lps[j-1]
        pattern.push((i-j))
        j = lps[j - 1];
        newStep.j = j;
        newStep.pattern = _.clone(pattern);
        newStep.step++;
        kmpSteps[step] = _.clone(newStep);

      }else if( i < n && compare[j] !== input[i]){
        if(j !== 0){
          step++;
          newStep.instr = "i = " + i + " j = " + j + ", String[i] = " + input[i] + " and Pat[j] = " + compare[j] + ", do not match and j = " + j + " which is > 0, set j to lps[j-1] = " + lps[j-1]
          j = lps[j-1];
          newStep.j = j;
          newStep.step++;
          kmpSteps[step] = _.clone(newStep);
        }else{
          step++;
          newStep.instr = "i = " + i + " j = " + j + ", String[i] = " + input[i] + " and Pat[j] = " + compare[j] + ", do not match and j = 0, so increase i"
          i++;
          newStep.i = i;
          newStep.step++;
          kmpSteps[step] = _.clone(newStep);
        }
      }
    }
    newStep.instr = "Finished as i >= length of string = " + n
    newStep.step++
    kmpSteps[step+1] = _.clone(newStep)
    

  }
  function lpsArray(input, compare){
    let length = 0;
    let lps = [];
    lps[0] = 0;
    let i = 1;
    let step = 0;
    let newStep = {
      step: 0,
      i: 0,
      length: 0,
      lps: [],
      instr: ""
    }
    while(i < compare.length){
      step++;
      if(compare[i] === compare[length]){
        newStep.instr = "i = " + i + " and length = " + length + ", Pat[length] = " + compare[length] + " and Pat[i] = " + compare[i] + ", match so increase length and i and set lps[i] = length"
        length++;
        lps[i] = length;
        i++;
        newStep.step = lpsSteps.length++;
          newStep.i = i;
          newStep.length = length;
          newStep.lps = _.clone(lps);
          lpsSteps[step] = _.clone(newStep)
        
      }else{
        if(length !== 0){
          newStep.instr = "i = " + i + " and length = " + length + ", Pat[length] = " + compare[length] + " and Pat[i] = " + compare[i] + ", do not match and length is > 0, so length = lps[length - 1]"
          length = lps[length - 1];
          newStep.step = lpsSteps.length++;
          newStep.i = i;
          newStep.length = length;
          newStep.lps = _.clone(lps);
          lpsSteps[step] = _.clone(newStep)

        }else{
          newStep.instr = "i = " + i + " and length = " + length + ", Pat[length] = " + compare[length] + " and Pat[i] = " + compare[i] + ", do not match and length is = 0, so lps[i] = 0 and increase i"
          lps[i] = 0;
          i++;
          newStep.step = lpsSteps.length++;
          newStep.i = i;
          newStep.length = length;
          newStep.lps = _.clone(lps);
          lpsSteps[step] = _.clone(newStep)
        }

      }
    }
    newStep.instr = "Finished as i > Pattern length = " + compare.length
    newStep.step = lpsSteps.length++;
    lpsSteps[step+1] = _.clone(newStep)
    return lps;
  }
  function handleSubmit(){
    if(input.length > 30 || compare.length > 30){
      setShow(true);
      return;
    }
    resetSteps();
    kmpSearch(input, compare);
    setStepsKMP(kmpSteps)
  }
  return (
    <Container>
      <Row>
        <ToastContainer position="middle-center">
        <Toast bg="warning" onClose={()=>setShow(false)} show={show} delay={5000} autohide>
          <Toast.Header>
            <strong className="me-auto">Alert</strong>
          </Toast.Header>
          <Toast.Body>
            String or Pattern may not exceed 30 characters
          </Toast.Body>
        </Toast>
        </ToastContainer>
        
        <Col className="input" lg="auto">
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="string-input">String Input</InputGroup.Text>
          <FormControl onChange={e => setInput(e.target.value)} aria-label="String Input" aria-describedby="string-input"></FormControl>
          <InputGroup.Text id="string-compare">Pattern</InputGroup.Text>
          <FormControl onChange={e => setCompare(e.target.value)} aria-label="pattern" aria-describedby="pattern"></FormControl>
          <Button variant="info" onClick={handleSubmit} id="string-input">Calculate</Button>
        </InputGroup>
        </Col>
      </Row>
      {stepsLPS.length > 0 && <h3>LPS Creation Steps</h3>}
      {stepsLPS.map(lpsStepMaker)}
      {stepsKMP.length > 0 && <h3>KMP Search Steps</h3>}
      {stepsKMP.map(kmpStepMaker)}

      
    </Container>
  )
}

export default IndexPage
