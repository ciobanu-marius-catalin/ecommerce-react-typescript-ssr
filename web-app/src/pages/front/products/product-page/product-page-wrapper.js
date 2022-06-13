import { useFetchData } from './use-fetch-data';
import { Col, Container, Row } from 'react-bootstrap';
import { PostContent } from './post-content';

function ProductPageWrapper({ data }) {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <PostContent data={data} />
        </Col>
      </Row>
    </Container>
  );
}
export { ProductPageWrapper };
