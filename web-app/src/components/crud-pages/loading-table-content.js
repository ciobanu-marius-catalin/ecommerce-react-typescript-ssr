import { Icon } from '../icon';

function LoadingTableContent({ columnNames }) {
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
}

export { LoadingTableContent };
