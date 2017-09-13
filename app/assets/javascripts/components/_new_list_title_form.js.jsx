var NewListTitleForm = React.createClass({
  getInitialState: function() {
    // ok to state with props because we don't care about synchronization
    return {initialName: this.props.list.name, name: ''};
  },

  handleNameChange: function(e) {
    this.setState({ name: e.target.value, initialName: null });
  },

  handleCancelUpdate: function(event) {
    event.preventDefault();
    this.props.replaceAllInstancesOfList(this.props.list);
  },

  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();

    $.ajax({
      url: this.props.path,
      dataType: 'json',
      type: 'PUT',
      data: {list: {name: this.state.name}},
      context: this,
      success: function(data) {
        this.props.replaceAllInstancesOfList(data);
      }
    });
  },

  render () {
    var name = null;

    if(this.state.initialName == null) {
      name = this.state.name;
    } else {
      name = this.state.initialName;
    }

    return (
      <form onSubmit={this.handleSubmit} id="list-title-form">

        <div className="input-group">
          <input type="text"
            placeholder="List name"
            value={ name }
            onChange={ this.handleNameChange }
            id="new-list-name"
            className="form-control" />

          <span className="input-group-btn">

            <button type="submit" value="update" className="btn btn-success">
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            </button>

            <button onClick={this.handleCancelUpdate} className="btn btn-default">
              <span className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
            </button>
          </span>
        </div>
      </form>
    );
  }
});
