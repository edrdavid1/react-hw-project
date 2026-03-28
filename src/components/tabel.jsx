
import { TableLine } from "./tabel-line";
import { TableCell } from "./tabel-cell";

export const Table = ({ table, orientation}) => {
  if (!table || table.length === 0) return null;

  // Если ориентация "колонки", переворачиваем матрицу. 
  // Иначе — используем данные как есть.
  const renderMatrix = orientation === 'columns'
    ? table[0].map((_, colIndex) => table.map(row => row[colIndex]))
    : table;

  // Теперь таблице неважно, в каком виде изначально пришли данные. 
  // Мы всегда считаем колонки по уже подготовленной матрице:
  const columnsCount = renderMatrix[0].length;

  return (
    <div className="custom-table">
      {renderMatrix.map((row, rowIndex) => (
        <TableLine key={rowIndex} columnsCount={columnsCount}>
          {row.map((cell, cellIndex) => (
            <TableCell key={cellIndex}>
              {cell}
            </TableCell>
          ))}
        </TableLine>
      ))}
    </div>
  );
};