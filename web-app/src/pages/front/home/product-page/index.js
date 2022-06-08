import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { axios } from '@core';
import _ from 'lodash';
import moment from 'moment';
import { FrontendLayout } from '@layouts';
import { useRouter } from 'next/router';
import { useProductRepository } from '../../../../repositories';

function ProductPage() {
  const { data } = useFetchData();
  let isPlaceholder = _.isEmpty(data);

  let Content = isPlaceholder ? PlaceholderContent : PostContent;

  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <Content data={data} />
        </Col>
      </Row>
    </Container>
  );
}

function PostContent({ data }) {
  const { thumbnail: url, description, title, created_at } = data;
  const dateFormat = moment(created_at).format('MMMM DD, YYYY');
  return (
    <div className="gravity-post-page">
      <div className="px-md-4">
        <div className="gravity-post-page__date">
          {'Published ' + dateFormat}
        </div>

        <h1 className="gravity-post-page__title">{title}</h1>
      </div>

      <div className="gravity-post-page__image__outer">
        <div className="gravity-post-page__image-aspect-ratio">
          <img src={url} alt="featured-image" loading="lazy" />
        </div>
      </div>

      <p className="gravity-post-page__content mx-md-4">{description}</p>
    </div>
  );
}

function PlaceholderContent() {
  return (
    <div className="gravity-post-page gravity-post-page--show-placeholder">
      <div className="px-md-4">
        <div className="gravity-post-page__date" />

        <h1 className="gravity-post-page__title" />
      </div>

      <div className="gravity-post-page__image__outer">
        <div className="gravity-post-page__image-aspect-ratio"></div>
      </div>

      <p className="gravity-post-page__content mx-md-4" />
      <p className="gravity-post-page__content mx-md-4" />
      <p className="gravity-post-page__content mx-md-4" />
      <p className="gravity-post-page__content mx-md-4" />
      <p className="gravity-post-page__content mx-md-4" />
    </div>
  );
}

function useFetchData({ setError = _.noop } = {}) {
  const router = useRouter();
  const { id } = router.query;
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);

  const repository = useProductRepository();
  async function fetchData() {
    setIsLoading(true);
    try {
      const fetchedData = await repository.getItem(id);
      if (fetchedData) {
        setData(fetchedData);
      }
    } catch (e) {
      setError(e);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchData();
  }, [id]);

  return { data, isLoading };
}

ProductPage.getLayout = FrontendLayout;

export { ProductPage };
