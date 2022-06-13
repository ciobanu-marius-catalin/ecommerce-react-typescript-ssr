import { Icon } from '../icon';
import { ColumnNamesType } from './types';
import { FC } from 'react';

interface PropsInterface {
  columnNames: ColumnNamesType;
}

const LoadingTableContent: FC<PropsInterface> = ({ columnNames }) => {
  return (
    <tbody>
      <tr>
        <td
          className="gravity-crud-table__loading-column"
          colSpan={columnNames.length}
        >
          <div className="gravity-crud-table__loading-column__content">
            <Icon name="spin" className="fa-spinner" />
          </div>
        </td>
      </tr>
    </tbody>
  );
};

export { LoadingTableContent };
