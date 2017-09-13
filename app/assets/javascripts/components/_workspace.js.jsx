var Workspace = React.createClass({
  getInitialState() {
    return { workspace: {name: "", id: null} };
  },
  componentDidMount() {
    this.fetchWorkspace();
  },

  fetchWorkspace() {
    $.getJSON(
      "/workspaces/" + this.props.workspaceId,
      (data) => this.setState({ workspace: data })
    );
  },

  render() {
    var listsContainer = null;

    if (this.state.workspace.id != null) {
      listsContainer = (<ListsContainer
        listsPath={"/workspaces/" + this.state.workspace.id + "/lists"} />);
    }

    return (
      <div>
        <h2>{this.state.workspace.name}</h2>
        {listsContainer}
      </div>
    );
  }
});
