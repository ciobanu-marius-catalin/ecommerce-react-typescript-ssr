import { CrudForm } from '@components';

let settings = [
  {
    label: 'Title',
    setting: 'title',
    type: 'input',
  },
  {
    label: 'price',
    setting: 'price',
    type: 'input',
  },
  {
    label: 'Description',
    setting: 'description',
    as: 'textarea',
    rows: 3,
  },
];

const ProductsPageForm = (props) => {
  return <CrudForm settings={settings} {...props} />;
};

export { ProductsPageForm, settings };