var ListsContainer = React.createClass({
  getInitialState() {
    return { lists: [], editTitleListId: null };
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
      return {editTitleListId: id};
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

  render() {
    var lists = this.state.lists.map((list, listIndex) => {
      return (
        <List
          key={list.id}
          list={list}
          deleteList={this.deleteList}
          setListEditable={this.setListEditable}
          replaceAllInstancesOfList={this.replaceAllInstancesOfList}
          editableTitle={list.id == this.state.editTitleListId}
        />
      );
    });

    return (
      <div>
        <p>You have {this.state.lists.length} lists.</p>
        {lists}
        <NewListForm addList={this.addList} />
      </div>
    );
  }
});
