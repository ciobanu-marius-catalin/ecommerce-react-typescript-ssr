import { useContext, useState } from 'react';
import { axios } from '@core';
import { Icon } from '../icon';
import { DeleteModal } from './delete-modal';
import { useCrudContext } from './crud-context';
import { useErrorCatcher } from '@core';
import { useRouter } from 'next/router';

function TableContent({ data, columnNames, refreshPage } = {}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const router = useRouter();
  const { apiPath } = useCrudContext();
  const { setError } = useErrorCatcher();
  let currentRouterPath = location.pathname;

  const onEdit = (item) => {
    const id = item?.id;

    let editRoute = `${currentRouterPath}/edit`;
    router.push(`${editRoute}/${id}`);
  };

  const onDelete = (item) => {
    setDeleteModalItem(item);
    setShowDeleteModal(true);
  };
  const onDeleteItem = async () => {
    const item = deleteModalItem;

    const path = `${apiPath}/${item?.id}`;
    try {
      await axios.delete(path);
      refreshPage();
    } catch (e) {
      setError('Could not delete the entry, please try again later');
      console.error(e.message);
    } finally {
      setShowDeleteModal(false);
    }
  };
  const onCancelDelete = () => {
    setShowDeleteModal(false);
  };
  return (
    <>
      <tbody>
        {data.map((item) => {
          return (
            <tr key={item.id}>
              {columnNames.map((columnName) => (
                <td key={item?.[columnName]}>{item?.[columnName]}</td>
              ))}
              <td className="gravity-crud-table__action-row">
                <Icon
                  className="gravity-crud-table__icon gravity-crud-table__edit"
                  name="pencil-alt"
                  onClick={() => onEdit(item)}
                />
                <Icon
                  className="gravity-crud-table__icon  gravity-crud-table__delete"
                  name="trash"
                  onClick={() => onDelete(item)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
      <DeleteModal
        show={showDeleteModal}
        onCancel={onCancelDelete}
        onDelete={onDeleteItem}
      />
    </>
  );
}

export { TableContent };
