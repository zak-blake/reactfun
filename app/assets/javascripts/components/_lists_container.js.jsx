var ListsContainer = React.createClass({
  getInitialState() {
    return { lists: [], editTitleListId: null, addListItemListId: null };
  },
  componentDidMount() {
    this.fetchLists();
  },
  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.setState({editTitleListId: null, addListItemListId: null});
    this.fetchLists();
  },

  path() {
    return this.props.path + "/lists";
  },

  fetchLists() {
    $.getJSON(
      this.path(),
      (data) => this.setState({lists: data})
    );
  },

  deleteList(id) {
    $.ajax({
      url: this.path() + "/" + id,
      dataType: 'json',
      type: 'DELETE',
      context: this,
      success(response) {

        this.setState(state => {
          var newLists = this.state.lists.filter((list) => {
            return list.id != id;
          });

          return {lists: newLists};
        });
      }
    });
  },

  setListEditable(id) {
    this.setState(state => {
      return {
        addListItemListId: null,
        editTitleListId: id
      };
    });
  },

  setListItemAddable(id) {
    this.setState(state => {
      return {addListItemListId: id, editTitleListId: null};
    });
  },

  replaceAllInstancesOfList(newList) {
    updatedLists = this.state.lists.map(function(e) {
      return e.id == newList.id ? newList : e;
    });

    this.setState({lists: updatedLists, editTitleListId: null});
  },

  addList(newList) {
    this.setState({lists: this.state.lists.concat([newList])});
  },

  listCountString(count) {
    if (count <= 0) {
      return "No lists in this workspace.";

    } else if (count == 1) {
      return "One list in this workspace.";

    } else {
      return count + " lists in this workspace.";
    }
  },

  render() {
    var lists = this.state.lists.map((list, listIndex) => {
      return (
        <List
          key={list.id}
          path={this.path() + "/" + list.id}
          list={list}
          deleteList={this.deleteList}
          setListEditable={this.setListEditable}
          setListItemAddable={this.setListItemAddable}
          itemAddable={this.state.addListItemListId == list.id}
          replaceAllInstancesOfList={this.replaceAllInstancesOfList}
          editableTitle={list.id == this.state.editTitleListId}
        />
      );
    });

    return (
      <div className="lists-container">
        <p>{this.listCountString(this.state.lists.length)}</p>

        <NewListForm addList={this.addList} path={this.path()} />

        {lists}
      </div>
    );
  }
});
