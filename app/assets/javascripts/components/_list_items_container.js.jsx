var ListItemsContainer = React.createClass({
  getInitialState() {
    return { listItems: [] };
  },
  componentDidMount() {
    this.fetchListItems();
  },

  fetchListItems() {
    $.getJSON(
      '/lists/' + this.props.listId + '/items',
      (data) => this.setState({listItems: data})
    );
  },

  render() {
    listItems = this.state.listItems.map((item) => {
      return (
        <li key={item.id}>{item.name}</li>
      );
    });

    return (
      <div>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
});
