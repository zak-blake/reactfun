var Workspace = React.createClass({
  getInitialState() {
    return { workspace: {name: "", id: null}, loading: true };
  },
  componentDidMount() {
    this.fetchWorkspace();
  },
  componentWillReceiveProps(newProps) {
    this.setState({loading: true});
    this.props = newProps;
    this.fetchWorkspace();
  },

  fetchWorkspace() {
    $.getJSON(
      this.props.path,
      (data) => this.setState({ workspace: data, loading: false })
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

    var workspaceHeader = (
      <WorkspaceHeader
        path={this.props.path}
        initialName={this.state.workspace.name}
        editTitle={this.props.editTitle}
        replaceWorkspace={this.replaceWorkspace}
        deleteWorkspace={this.deleteWorkspace}/>
    );

    if (this.state.loading) {
      return (<span id="loading-spinner" className="spinner"></span>);
    }

    return (
      <div id="workspace-wrapper">
        {workspaceHeader}
        {listsContainer}
      </div>
    );
  }
});
