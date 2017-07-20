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
  addList(newList) {
    this.setState({lists: this.state.lists.concat([newList])});
  },
  render() {
    return (
      <div>
        <Lists lists={this.state.lists} />
        <NewListForm addList={this.addList} />
      </div>
    );
  }
});
