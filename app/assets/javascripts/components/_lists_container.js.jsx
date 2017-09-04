var ListsContainer = React.createClass({
  getInitialState() {
    return { lists: [], editTitleListId: null, addListItemListId: null };
  },
  componentDidMount() {
    this.fetchLists();
  },

  fetchLists() {
    $.getJSON(
      this.props.listsPath,
      (data) => this.setState({lists: data})
    );
  },

  deleteList(id) {
    $.ajax({
      url: `/lists/${id}`,
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
      return "You don't have any lists yet.";

    } else if (count == 1) {
      return "You have one list.";

    } else {
      return "You have " + count + " lists.";
    }
  },

  render() {
    var lists = this.state.lists.map((list, listIndex) => {
      return (
        <List
          key={list.id}
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
      <div>
        <p>{this.listCountString(this.state.lists.length)}</p>
        <NewListForm addList={this.addList} />
        {lists}
      </div>
    );
  }
});
