import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { FaTrash, FaEdit, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Menu from './Menu';

const Vendas = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [vendas, setVendas] = useState([]);
  const [produtosAdicionados] = useState([]);
  const [showSuccessModal] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8000/api/venda-list/')
      .then(response => response.json())
      .then(data => setVendas(data))
      .catch(error => console.log(error));
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(prevState => !prevState);
  };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const handleRemoverVenda = () => {
    toggleModal();
  };

  const handleEditarVenda = numero_nota_fiscal => {
    window.location.href = `/editar-venda/${numero_nota_fiscal}`;
  };

  return (
    <div className="rectangle-114">
      <Menu />
      <h2 className="vendas-title">Vendas</h2>
      <h3 className="vendas-realizadas">Vendas Realizadas</h3>
      <div className="auto-layout">
        <div className="auto-layout">
          <Link to="/nova-venda" className="auto-layout-text">
            Inserir Nova Venda
          </Link>
        </div>
      </div>
      <div className="vendas-info linha-reta">
        <span className="nota-fiscal">Nota Fiscal</span>
        <span className="cliente">Cliente</span>
        <span className="vendedor">Vendedor</span>
        <span className="data-venda">Data da Venda</span>
        <span className="valor-total">Valor Total</span>
        <div className="opcoes">
          <div className="dropdown-container">
            <span className="dropdown-trigger" onClick={toggleDropdown}>
              Ver Itens {showDropdown ? <FaAngleUp /> : <FaAngleDown />}
            </span>
            {showDropdown && (
              <div className="dropdown">
                {produtosAdicionados.map(produto => (
                  <div className="dropdown-item" key={produto.id}>
                    <div>{produto.descricao}</div>
                    <div>{produto.quantidade}</div>
                    <div>{produto.preco_unitario}</div>
                    <div>{produto.preco_unitario * produto.quantidade}</div>
                    <div>% da Comissão</div>
                    <div>Comissão</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <FaTrash className="opcoes-icon" onClick={toggleModal} />
          {showModal && (
            <div className="modal">
              <p className="modal-message">Deseja remover a venda?</p>
              <div className="modal-actions">
                <button className="modal-btn modal-btn-sim" onClick={handleRemoverVenda}>
                  SIM
                </button>
                <button className="modal-btn modal-btn-nao" onClick={toggleModal}>
                  NÃO
                </button>
              </div>
            </div>
          )}
          <FaEdit
            className="opcoes-icon"
            onClick={() => handleEditarVenda(vendas.numero_nota_fiscal)}
          />
        </div>
      </div>
      <div className="vendas-list">
        {vendas.map(venda => (
          <div className="venda-item" key={venda.id}>
            <span className="nota-fiscal">{venda.numero_nota_fiscal}</span>
            <span className="cliente">{venda.cliente.nome}</span>
            <span className="vendedor">{venda.vendedor.nome}</span>
            <span className="data-venda">{venda.data_hora}</span>
            <span className="valor-total">{venda.valor_total}</span>
          </div>
        ))}
      </div>
      {showSuccessModal && (
        <div className="modal-success">
          <div className="modal-success-message">Venda Realizada com Sucesso!</div>
        </div>
      )}
    </div>
  );
};

export default Vendas;
