var ListItemsContainer = React.createClass({
  getInitialState() {
    return { listItems: [], count: 0, completeCount: 0 };
  },
  componentDidMount() {
    this.fetchListItems();
  },

  fetchListItems() {
    $.getJSON(
      '/lists/' + this.props.listId + '/items',
      (data) => this.setState({
        listItems: data["list_items"],
        count: data["list_items_count"],
        completeCount: data["list_items_complete_count"]
      })
    );
  },
  addListItem(listItem) {
    this.setState({
      listItems: this.state.listItems.concat([listItem]),
      count: this.state.count + 1
    });
  },

  handleClickAddListItem() {
    this.props.setListItemAddable(this.props.listId);
  },

  handleClickDeleteListItem(deletedListItem) {
    $.ajax({
      url: `/list_items/${deletedListItem.id}`,
      dataType: 'json',
      type: 'DELETE',
      context: this,
      success(response) {

        this.setState(state => {
          var newListItems = this.state.listItems.filter((item) => {
            return item.id != deletedListItem.id;
          });

          completeCountChange = (deletedListItem.status == "complete") ? -1 : 0;

          console.log(completeCountChange);

          return {
            listItems: newListItems,
            count: this.state.count - 1,
            completeCount: this.state.completeCount + completeCountChange
          };
        });
      }
    });
  },

  closeAddItemForm() {
    this.props.setListItemAddable(null);
  },

  getListCompletionClass() {
    let total = this.state.count;
    let complete = this.state.completeCount;
    let completion = (total == 0 || complete == 0) ? 0 : Math.round(complete/total*100);

    return "completion compl-" + completion;
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
        <li key={item.id}>
          {item.name}
          &nbsp;
          <a onClick={() => this.handleClickDeleteListItem(item)}>
            <span className="glyphicon glyphicon-remove-circle"></span>
          </a>
        </li>
      );
    });

    return (
      <div>
        <div className="list-content">
          <ul>
            {listItems}
          </ul>
          {addListItem}
        </div>

        <div className={this.getListCompletionClass()}></div>
      </div>
    );
  }
});
