import { List } from './components';
import { FrontendLayout } from '@layouts';

// import { SearchInput } from "@components";

const ProductsStaticPage = ({ products, nrOfPages }) => {
  return (
    <div className="gravity-front-page">
      <div className="gravity-front-page__hero">
        <h1 className="gravity-front-page__title">Ecommerce</h1>
        <p className="gravity-front-page__description">
          <span>
            This ecommerce platform was created by Ciobanu Marius-Catalin for my
          </span>
          &nbsp;
          <a
            href="https://github.com/ciobanu-marius-catalin/blog-react-laravel"
            target="_blank"
            rel="noreferrer"
          >
            Github portfolio
          </a>
          &nbsp;
          <span>
            to show a sample of my coding using React and Laravel as the main
            technologies. You can view the posts on this page or log in to view
            the CMS dashboard
          </span>
        </p>
        <div className="gravity-front-page__search">
          {/*<SearchInput placeholder="Search for posts" />*/}
        </div>
      </div>
      <List products={products} nrOfPages={nrOfPages} />
    </div>
  );
};

ProductsStaticPage.getLayout = FrontendLayout;

export * from './product-page';
export { ProductsStaticPage };
