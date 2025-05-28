interface CardsListViewProps<T> {
  items: T[];
  renderCard: (item: T) => React.ReactNode;
}

const CardsListView = <T,>({ items, renderCard }: CardsListViewProps<T>) => {
  return (
    <div className="grid-view">
      {items.map((item, index) => (
        <div key={index}>{renderCard(item)}</div>
      ))}
    </div>
  );
};
export default CardsListView;
