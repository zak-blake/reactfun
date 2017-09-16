var Workspace = React.createClass({
  getInitialState() {
    return { workspace: {name: "", id: null} };
  },
  componentDidMount() {
    this.fetchWorkspace();
  },
  componentWillReceiveProps(newProps) {
    this.props = newProps;
    this.fetchWorkspace();
  },

  fetchWorkspace() {
    $.getJSON(
      this.props.path,
      (data) => this.setState({ workspace: data })
    );
  },

  render() {
    var listsContainer = null;

    if (this.state.workspace.id != null) {
      listsContainer = <ListsContainer path={this.props.path} />;
    }

    return (
      <div>
        {listsContainer}
      </div>
    );
  }
});
