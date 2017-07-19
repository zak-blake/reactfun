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
  render() {
    return <Lists lists={this.state.lists} />;
  }
});
