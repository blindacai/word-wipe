import React, { PureComponent } from 'react';

class Tile extends PureComponent{
  handleClick = () => {
    const tile = {
      "id": this.props.id,
      "value": this.props.value
    }
    this.props.selectTile(tile);
  }

  render(){
    const tile = this.props;

    return (
      <div className={"tile " + tile.selectCSS} id={tile.id} onClick={this.handleClick} >
        {tile.value}
      </div>
    )
  }
}

export default Tile