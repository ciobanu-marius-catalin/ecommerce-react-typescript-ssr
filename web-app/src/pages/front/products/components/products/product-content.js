import { useRouter } from 'next/router';
import classnames from 'classnames';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

function ProductContent({ data = {}, className }) {
  const { thumbnail: url, price, title, id } = data;

  const router = useRouter();
  const pathname = router.pathname;
  const link = `${pathname}/${id}`;

  const formattedPrice = price ? `${price} $` : null;
  return (
    <div className={classnames('product-list-page__item', className)}>
      <div className="product-list-page__item__container">
        <Link href={link}>
          <a>
            <div className="product-list-page__item__image-outer">
              {url && <img src={url} alt="featured-image" />}
            </div>

            <h2 className="product-list-page__item__title">{title}</h2>
          </a>
        </Link>
        <span className="product-list-page__item__price">{formattedPrice}</span>
        <Button>Add to cart</Button>
      </div>
    </div>
  );
}

export { ProductContent };
