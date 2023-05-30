import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import '../App.css';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  toggleMenu = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  render() {
    const { isOpen } = this.state;

    return (
      <div className={`menu-container ${isOpen ? 'open' : ''}`}>
        <div className="menu-content">
          <Link to="api/venda" className="menu-item vendas-option">
            <span className="menu-icon"></span>
            <div className="menu-text">Vendas</div>
          </Link>

          <Link to="api/vendedores/comissoes">
            <div className="menu-item comissoes-option">
              <span className="menu-icon"></span>
              <div className="menu-text">Comissões</div>
            </div>
          </Link>

        </div>
        <div className="menu-toggle" onClick={this.toggleMenu}>
          <FiMenu className="menu-icon" />
        </div>
      </div>
    );
  }
}

export default Menu;
