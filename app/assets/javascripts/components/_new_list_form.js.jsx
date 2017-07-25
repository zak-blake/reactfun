var NewListForm = React.createClass({
  getInitialState: function() {
    return {name: ''};
  },
  handleNameChange: function(e) {
    this.setState({ name: e.target.value });
  },
  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();

    $.ajax({
      url: '/lists',
      dataType: 'json',
      type: 'POST',
      data: {list: {name: this.state.name}},
      context: this,
      success: function(data) {
        this.setState({name: ''})
        this.props.addList(data);
      },
      error: function(data) {
        console.log(data); // need to find the error message!
      }
    });
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="new-list-form">

        <div className="form-group">
          <label htmlFor="new-list-name">Add a List</label>
          <input type="text" placeholder="Name" value={ this.state.name } onChange={ this.handleNameChange } id="new-list-name" className="form-control" />
        </div>

        <input type="submit" value="Create" className="btn btn-primary" />
      </form>
    );
  }
});
