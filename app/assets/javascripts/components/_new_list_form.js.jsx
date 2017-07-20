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
      <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="New List Name" value={ this.state.name } onChange={ this.handleNameChange } /><br />
        <input type="submit" value="Create" />
      </form>
    );
  }
});
