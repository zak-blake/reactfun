var List = React.createClass({
  handleClick(event) {
    event.preventDefault();
    this.props.deleteList(this.props.list.id);
  },

  render() {
    return (
      <div className="list">
        {this.props.list.name}<br />
        <button onClick={this.handleClick}> Delete </button>
      </div>
    );
  }
})
