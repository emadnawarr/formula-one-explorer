interface ListViewProps<T> {
  items: T[];
  renderListItem: (item: T) => React.ReactNode;
}

const ListView = <T,>({ items, renderListItem }: ListViewProps<T>) => {
  return (
    <div className="list-view">
      {items.map((item, index) => (
        <div key={index}>{renderListItem(item)}</div>
      ))}
    </div>
  );
};
export default ListView;
