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

  replaceWorkspace(workspace) {
    if (this.state.workspace.id) {
      this.props.replaceWorkspace(workspace);
    }
  },

  deleteWorkspace() {
    if (this.state.workspace.id) {
      this.props.deleteWorkspace(this.state.workspace.id);
    }
  },

  render() {
    var listsContainer = null;

    if (this.state.workspace.id != null) {
      listsContainer = <ListsContainer path={this.props.path} />;
    }

    var replaceWorkspaceForm = (
      <WorkspaceHeader
        path={this.props.path}
        initialName={this.state.workspace.name}
        replaceWorkspace={this.replaceWorkspace}
        deleteWorkspace={this.deleteWorkspace}/>
    );

    return (
      <div id="workspace-wrapper">
        {replaceWorkspaceForm}
        {listsContainer}
      </div>
    );
  }
});
