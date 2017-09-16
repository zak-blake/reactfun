var ListItemsContainer = React.createClass({
  getInitialState() {
    return { listItems: [], count: 0, completeCount: 0, expandedItemId: null };
  },
  componentDidMount() {
    this.fetchListItems();
  },

  fetchListItems() {
    $.getJSON(
      this.props.path,
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

  setItemExpanded(item) {
    this.s
  },

  handleClickAddListItem() {
    this.props.setListItemAddable(this.props.listId);
  },

  deleteListItem(deletedListItem) {
    $.ajax({
      url: this.props.path + "/" + deletedListItem.id,
      dataType: 'json',
      type: 'DELETE',
      context: this,
      success(response) {

        this.setState(state => {
          var newListItems = this.state.listItems.filter((item) => {
            return item.id != deletedListItem.id;
          });

          completeCountChange = (deletedListItem.status == "complete") ? -1 : 0;

          return {
            listItems: newListItems,
            count: this.state.count - 1,
            completeCount: this.state.completeCount + completeCountChange
          };
        });
      }
    });
  },

  completeListItem(item) {
    $.ajax({
      url: this.props.path + `/${item.id}`,
      data: { list_item: { status: 'complete' } },
      dataType: 'json',
      type: 'PATCH',
      context: this,
      success(updated_item) {
        let newListItems = this.state.listItems.map((item) => {
          return item.id == updated_item.id ? updated_item : item;
        });

        this.setState({
          completeCount: (this.state.completeCount + 1),
          listItems: newListItems
        });
      }
    });
  },

  resetListItem(item) {
    $.ajax({
      url: this.props.path + `/${item.id}`,
      data: { list_item: { status: 'incomplete' } },
      dataType: 'json',
      type: 'PATCH',
      context: this,
      success(updated_item) {
        let newListItems = this.state.listItems.map((item) => {
          return item.id == updated_item.id ? updated_item : item;
        });

        this.setState({
          completeCount: (this.state.completeCount - 1),
          listItems: newListItems
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
          path={this.props.path}
          listId={this.props.listId}
          closeAddItemForm={this.closeAddItemForm}
          addListItem={this.addListItem} />
      );
    }else{
      addListItem = (
        <button onClick={this.handleClickAddListItem} className="btn btn-default">
          <span className="glyphicon glyphicon-plus"></span>&nbsp;
          Item
        </button>
      );
    }

    listItems = null;

    if (this.state.listItems.length > 0) {
      listItems = this.state.listItems.map((item) => {
        return (
          <ListItem
            key={item.id}
            item={item}
            resetListItem={this.resetListItem}
            completeListItem={this.completeListItem}
            deleteListItem={this.deleteListItem}
          />
        );
      });
    } else {
      listItems = <p className="text-center">No list items</p>;
    }

    return (
      <div>
        <div className="list-item-list">
          {listItems}
        </div>

        <div className="list-item-list-actions">
          {addListItem}
        </div>

        <div className={this.getListCompletionClass()}></div>
      </div>
    );
  }
});
