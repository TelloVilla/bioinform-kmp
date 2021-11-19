import * as React from "react";
import { Col, Container, FormControl, InputGroup, Row, Button } from "react-bootstrap"
import "../style/global.sass"


// markup
const IndexPage = () => {
  const [input, setInput] = React.useState("");
  const [compare, setCompare] = React.useState("");
  function kmpSearch(input, compare){
    let n = input.length;
    let m = compare.length;
    let lps = lpsArray(input, compare);

    let i = 0;
    let j = 0;
    while(i < n){
      if(compare[j] === input[i]){
        j++;
        i++;
      }
      if(j === m){
        console.log("Found pattern at " + (i - j) );
        j = lps[j - 1];
      }else if( i < n && compare[j] !== input[i]){
        if(j != 0){
          j = lps[j-1];
        }else{
          i = i + 1;
        }
      }
    }
    

  }
  function lpsArray(input, compare){
    let length = 0;
    let lps = [];
    lps[0] = 0;
    let i = 1;
    while(i < compare.length){
      if(compare[i] === compare[length]){
        length++;
        lps[i] = length;
        i++;
      }else{
        if(length !== 0){
          length = lps[length - 1];

        }else{
          lps[i] = 0;
          i++;
        }

      }
    }
    return lps;
  }
  function handleSubmit(){
    console.log(input);
    console.log(compare);
    kmpSearch(input, compare);

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
      
    </Container>
  )
}

export default IndexPage
