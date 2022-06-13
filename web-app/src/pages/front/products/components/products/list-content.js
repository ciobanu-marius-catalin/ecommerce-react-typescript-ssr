import { Container, Row } from 'react-bootstrap';
import { Product } from './product';
import { CrudTablePagination } from '@components';

function ListContent({ items, page, setPage, nrOfPages }) {
  return (
    <Container className="product-list-page">
      <Row>
        {items.map((post, index) => {
          return <Product key={post.id} data={post} />;
        })}
        <CrudTablePagination
          activePage={page}
          setPage={setPage}
          nrOfPages={nrOfPages}
        />
      </Row>
    </Container>
  );
}

export { ListContent };
