var NewListForm = React.createClass({
  getInitialState: function() {
    return {name: '', hidden: true};
  },
  componentWillReceiveProps() {
    this.setState({hidden: true});
  },

  componentDidMount(){
    document.addEventListener("keydown", this.escFunction, false);
  },
  componentWillUnmount(){
    document.removeEventListener("keydown", this.escFunction, false);
  },
  escFunction(event){
    if(event.keyCode === 27) {
      this.setState({hidden: true});
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
      data: {list: {name: this.state.name}},
      context: this,
      success: function(data) {
        this.setState({name: '', hidden: true})
        this.props.addList(data);
      },
      error: function(data) {
        console.log(data); // need to find the error message!
      }
    });
  },

  handleClickShow: function(event) {
    this.setState({hidden: false});
  },

  handleClickHide: function(event) {
    event.preventDefault();
    this.setState({hidden: true});
  },

  render() {
    if (this.state.hidden) {
      return (
        <div>
          <button onClick={this.handleClickShow} className="btn btn-sm btn-tran-gr">
            List &nbsp;
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
      );
    } else {
      return (
        <form onSubmit={this.handleSubmit} id="new-list-form">

          <div className="input-group">

            <input type="text"
              autoFocus value="true"
              placeholder="New List Name"
              value={ this.state.name }
              onChange={ this.handleNameChange }
              id="new-list-name"
              className="form-control" />

            <span className="input-group-btn">
              <input type="submit" value="Add" className="btn btn-success" />

              <button onClick={this.handleClickHide} className="btn btn-default btn-slate" >
                <span className="glyphicon glyphicon-remove" aria-hidden="true" />
              </button>
            </span>
          </div>
        </form>
      );
    }
  }
});
