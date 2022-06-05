import { Button, Col } from 'react-bootstrap';
import _ from 'lodash';

import classnames from 'classnames';
import Link from 'next/link';

function Post({ data = {} }) {
  const { isPlaceholder } = data;

  const Content = isPlaceholder ? PlaceholderPost : PostContent;
  return (
    <Col xs={12} sm={6} md={3} className="p-2">
      <Content data={data} />
    </Col>
  );
}

function PostContent({ data = {} }) {
  const { thumbnail: url, price, title, id, isPlaceholder } = data;
  const link = `/${id}`;
  return (
    <div
      className={classnames('gravity-post-item', {
        'gravity-post-item--show-placeholder': isPlaceholder,
      })}
    >
      <div className="gravity-post-item__container">
        <Link href={link}>
          <a>
            <div className="gravity-post-item__image-outer">
              <div className="gravity-post-item__image-aspect-ratio">
                {url && <img src={url} alt="featured-image" />}
              </div>
            </div>
            <h2 className="gravity-post-item__title">{title}</h2>
          </a>
        </Link>
        <span className="gravity-post-item__price">{price} $</span>
        <Button>Add to cart</Button>
      </div>
    </div>
  );
}

function PlaceholderPost({ data = {} }) {
  const { id } = data;
  const link = `/${id}`;
  return (
    <div
      className={classnames(
        'gravity-post-item',
        'gravity-post-item--show-placeholder'
      )}
    >
      <Link href={link}>
        <a>
          <div className="gravity-post-item__image-outer">
            <div className="gravity-post-item__image-aspect-ratio" />
          </div>
          <h2 className="gravity-post-item__title" />
          <p className="gravity-post-item__description" />
        </a>
      </Link>
    </div>
  );
}

export { Post };
