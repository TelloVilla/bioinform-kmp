import * as React from "react";
import { Col, Container, FormControl, InputGroup, Row, Button } from "react-bootstrap"
import "../style/global.sass"


// markup
const IndexPage = () => {
  const [input, setInput] = React.useState("");
  function handleSubmit(){
    console.log(input);

  }
  return (
    <Container>
      <Row>
        <Col className="input" lg="auto">
        <InputGroup size="lg" className="mb-3">
          <InputGroup.Text id="string-input">String Input</InputGroup.Text>
          <FormControl onChange={e => setInput(e.target.value)} aria-label="String Input" aria-describedby="string-input"></FormControl>
          <Button variant="outline-dark" onClick={handleSubmit} id="string-input">Calculate</Button>
        </InputGroup>
        </Col>
      </Row>
      
    </Container>
  )
}

export default IndexPage
