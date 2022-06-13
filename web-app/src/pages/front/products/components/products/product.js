import { Button, Col } from 'react-bootstrap';
import { PlaceholderContent } from './placeholder-content';
import { ProductContent } from './product-content';

function Product({ data = {} }) {
  const { isPlaceholder } = data;

  const Content = isPlaceholder ? PlaceholderContent : ProductContent;
  return (
    <Col xs={12} sm={6} md={3} className="p-2">
      <Content data={data} />
    </Col>
  );
}

export { Product };
