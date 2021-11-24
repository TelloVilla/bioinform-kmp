import * as React from "react";
import { Col, Container, FormControl, InputGroup, Row, Button } from "react-bootstrap"
import "../style/global.sass"
import _ from "lodash";



// markup
const IndexPage = () => {
  const [input, setInput] = React.useState("");
  const [compare, setCompare] = React.useState("");
  const [stepsLPS, setStepsLPS] = React.useState([]);
  const [stepsKMP, setStepsKMP] = React.useState([]);
  const lpsSteps = [{
      step: 0,
      i: 1,
      length: 0,
      lps: [],
      instr: "lps[0] is always 0"
    }];

  const kmpSteps = [];

  function lpsStepMaker(s){

    return(
      <Row key={s.step} className="step">
        <h6>Step: {s.step}</h6>
        <p>
          i = {s.i}
          <br />
          length = {s.length}
        </p>
        <p>
          LPS = [{s.lps.map(v => v + ",")}]
        </p>
        <p>
          {s.instr}
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
      step: 0,
      i: 0,
      j: 0,
      pattern: [],
      instr: ""
    }


    let step = 0;
    let i = 0;
    let j = 0;
    while(i < n){
      step++;
      if(compare[j] === input[i]){
        newStep.instr = "String[i] = " + input[i] + " and Pat[j] = " + compare[j] + " match so increase i and j"
        j++;
        i++;
        newStep.i++;
        newStep.j++;
        newStep.step++;
        kmpSteps[step-1] = _.clone(newStep);
      }
      if(j === m){
        newStep.instr = "j = length of pattern, pattern found at " + (i-j) + ", set j to lps[j-1]"
        pattern.push((i-j))
        j = lps[j - 1];
        newStep.j = j;
        newStep.pattern = _.clone(pattern);
        newStep.step++;
        kmpSteps[step-1] = _.clone(newStep);

      }else if( i < n && compare[j] !== input[i]){
        if(j !== 0){
          newStep.instr = "String[i] = " + input[i] + " and Pat[j] = " + compare[j] + " do not match and j > 0, set j to lps[j-1]"
          j = lps[j-1];
          newStep.j = j;
          newStep.step++;
          kmpSteps[step] = _.clone(newStep);
        }else{
          newStep.instr = "String[i] = " + input[i] + " and Pat[j] = " + compare[j] + " do not match and j = 0, so increase i"
          i = i + 1;
          newStep.i = i;
          newStep.step++;
          kmpSteps[step-1] = _.clone(newStep);
        }
      }
    }
    

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
        newStep.instr = "Pat[length] = " + compare[length] + " and Pat[i] = " + compare[i] + " match so increase length and i and set lps[i] = length"
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
          newStep.instr = "Pat[length] = " + compare[length] + " and Pat[i] = " + compare[i] + " do not match and length is > 0, so length = lps[length - 1]"
          length = lps[length - 1];
          newStep.step = lpsSteps.length++;
          newStep.i = i;
          newStep.length = length;
          newStep.lps = _.clone(lps);
          lpsSteps[step] = _.clone(newStep)

        }else{
          newStep.instr = "Pat[length] = " + compare[length] + " and Pat[i] = " + compare[i] + " do not match and length is = 0, so lps[i] = 0 and increase i"
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
    return lps;
  }
  function handleSubmit(){
    kmpSearch(input, compare);
    console.log(lpsSteps)
    console.log(kmpSteps)
  }
  return (
    <Container>
      <Row>
        <Col className="input" lg="auto">
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="string-input">String Input</InputGroup.Text>
          <FormControl onChange={e => setInput(e.target.value)} aria-label="String Input" aria-describedby="string-input"></FormControl>
          <InputGroup.Text id="string-compare">Pattern</InputGroup.Text>
          <FormControl onChange={e => setCompare(e.target.value)} aria-label="pattern" aria-describedby="pattern"></FormControl>
          <Button variant="outline-dark" onClick={handleSubmit} id="string-input">Calculate</Button>
        </InputGroup>
        </Col>
      </Row>
      {stepsLPS.length > 0 && <h3>LPS Creation</h3>}
      {stepsLPS.map(lpsStepMaker)}
      {stepsKMP.length > 0 && <h3>KMP Steps</h3>}

      
    </Container>
  )
}

export default IndexPage
