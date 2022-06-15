import { Col, Container, Row } from 'react-bootstrap';
import { ProductContent } from './product-content';
import { ProductContentPlaceholder } from './product-placeholder-content';

function ProductPageWrapper({ data = {} }) {
  const { isPlaceholder } = data;

  const Content = isPlaceholder ? ProductContentPlaceholder : ProductContent;

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center p-0 ">
          <Content data={data} />
        </Col>
      </Row>
    </Container>
  );
}
export { ProductPageWrapper };
