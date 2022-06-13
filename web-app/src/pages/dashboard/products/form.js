import { CrudForm } from '@components';

let settings = [
  {
    label: 'Title',
    setting: 'title',
    type: 'input',
  },
  {
    label: 'Price',
    setting: 'price',
    type: 'input',
  },
  {
    label: 'Description',
    setting: 'description',
    as: 'textarea',
    rows: 3,
  },
  {
    label: 'Category',
    setting: 'category',
    type: 'input',
  },
];

const ProductsPageForm = (props) => {
  return <CrudForm settings={settings} {...props} />;
};

export { ProductsPageForm, settings };
