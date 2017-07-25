var List = React.createClass({
  handleClickDelete(event) {
    event.preventDefault();
    this.props.deleteList(this.props.list.id);
  },

  handleClickEdit(event) {
    event.preventDefault();
  },

  render() {
    return (
      <div className="list">
        <h4>
          <span>{this.props.list.name}</span>

          <div role="group" className="btn-group pull-right">
            <button onClick={this.handleClickEdit} className="btn">
              <span className="glyphicon glyphicon-edit"></span>
            </button>
            <button onClick={this.handleClickDelete} className="btn">
              <span className="glyphicon glyphicon-remove"></span>
            </button>
          </div>

        </h4>
      </div>
    );
  }
})
