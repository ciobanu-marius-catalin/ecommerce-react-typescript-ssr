import { Icon } from '../icon';

function EmptyTableContent({ columnNames = [] }) {
  return (
    <tbody>
      <tr>
        <td
          className="gravity-crud-table__empty-column"
          colSpan={columnNames.length}
        >
          <div className="gravity-crud-table__empty-column__content">
            <Icon name="meh"></Icon>
            <span>No results found</span>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export { EmptyTableContent };
