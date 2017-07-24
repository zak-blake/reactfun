var ListsContainer = React.createClass({
  getInitialState() {
    return { lists: [] };
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

  addList(newList) {
    this.setState({lists: this.state.lists.concat([newList])});
  },

  render() {
    var lists = this.state.lists.map((list, listIndex) => {
      return (
        <List key={list.id} list={list} deleteList={this.deleteList} />
      );
    });

    return (
      <div>
        {lists}
        <NewListForm addList={this.addList} />
      </div>
    );
  }
});
