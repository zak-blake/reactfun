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
  addListItem(listItem) {
    this.setState({listItems: this.state.listItems.concat([listItem])});
  },

  handleClickAddListItem() {
    this.props.setListItemAddable(this.props.listId);
  },

  closeAddItemForm() {
    this.props.setListItemAddable(null);
  },

  render() {
    addListItem = null;

    if(this.props.itemAddable) {
      addListItem = (
        <NewListItemForm
          listId={this.props.listId}
          closeAddItemForm={this.closeAddItemForm}
          addListItem={this.addListItem} />
      );
    }else{
      addListItem = (
        <a onClick={this.handleClickAddListItem}>
          Add Item
        </a>
      );
    }

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
        {addListItem}
      </div>
    );
  }
});
