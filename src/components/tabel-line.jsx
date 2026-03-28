export const TableLine = ({ children, columnsCount }) => (
  <div 
    className="table-line" 
    style={{ gridTemplateColumns: `repeat(${columnsCount}, 1fr)` }}
  >
    {children}
  </div>
);