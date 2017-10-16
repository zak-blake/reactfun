var NewListItemForm = React.createClass({
  getInitialState: function() {
    return {name: ''};
  },

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  },
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  },
  escFunction(event){
    if(event.keyCode === 27) {
      this.props.closeAddItemForm();
    }
  },

  handleNameChange: function(e) {
    this.setState({ name: e.target.value });
  },
  handleSubmit(event) {
    event.preventDefault();

    var name = this.state.name.trim();

    $.ajax({
      url: this.props.path,
      dataType: 'json',
      type: 'POST',
      data: {list_item: {name: this.state.name}},
      context: this,
      success: function(data) {
        this.setState({name: ''})
        this.props.addListItem(data);
      },
      error: function(data) {
        console.log(data); // need to find the error message!
      }
    });
  },
  handleCancelNewItem: function(event) {
    event.preventDefault();
    this.props.closeAddItemForm();
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit} id="new-list-item-form">

        <div className="input-group">
          <input type="text"
            autoFocus value="true"
            placeholder="New item"
            value={ this.state.name }
            onChange={ this.handleNameChange }
            id="new-list-item-name"
            className="form-control" />



          <span className="input-group-btn">
            <button type="submit" value="update" className="btn btn-success">
              <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>
            </button>

            <button onClick={this.handleCancelNewItem} className="btn btn-default btn-slate">
              <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
            </button>

          </span>
        </div>
      </form>
    );
  }
});
