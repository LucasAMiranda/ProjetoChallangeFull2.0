import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Menu from './Menu';
import { FaTrash } from 'react-icons/fa';

class NovaVenda extends Component {
  constructor(props) {
    super(props);

    this.state = {
      descricaoProduto: '',
      quantidadeProduto: 0,
      produtoSelecionadoId: null,
      totalVenda: 0,
      vendedores: [],
      selectedVendedor: '',
      clientes: [],
      selectedCliente: '',
      produtosAdicionados: [],
      dataHoraVenda: '', // Adicionado campo para armazenar a data e hora da venda
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const responseVenda = await axios.get('http://localhost:8000/api/venda-list/');
      const responseVendedores = await axios.get('http://localhost:8000/api/vendedor-list');
      const responseClientes = await axios.get('http://localhost:8000/api/cliente-list/');

      const vendaData = responseVenda.data;
      const vendedoresData = responseVendedores.data;
      const clientesData = responseClientes.data;

      this.setState({
        venda: vendaData,
        vendedores: vendedoresData,
        clientes: clientesData,
      });

      this.calcularTotalVenda(vendaData);
    } catch (error) {
      console.error(error);
    }
  };

  adicionarProduto = async () => {
    const {
      venda,
      produtoSelecionadoId,
      quantidadeProduto,
      produtosAdicionados,
    } = this.state;

    try {
      const response = await axios.post('http://localhost:8000/api/produto-list/', {
        venda_id: venda.id,
        produto_id: produtoSelecionadoId,
        quantidade: quantidadeProduto,
      });

      const vendaData = response.data;
      const novoProduto = vendaData.produtos.find((produto) => produto.produto_id === produtoSelecionadoId);

      this.setState({
        descricaoProduto: '',
        quantidadeProduto: 0,
        produtoSelecionadoId: null,
        venda: vendaData,
        produtosAdicionados: [...produtosAdicionados, novoProduto],
      });

      this.calcularTotalVenda(vendaData);
    } catch (error) {
      console.error(error);
    }
  };

  handleExcluirInformacoes = async (produtoId) => {
    const { venda } = this.state;

    try {
      await axios.delete(`http://localhost:8000/api/venda-list/${produtoId}`);
      const updatedVenda = {
        ...venda,
        produtos: venda.produtos.filter((produto) => produto.id !== produtoId),
      };

      this.setState({
        venda: updatedVenda,
      });

      this.calcularTotalVenda(updatedVenda);
    } catch (error) {
      console.error(error);
    }
  };

  calcularTotalVenda = (vendaData) => {
    let total = 0;

    if (vendaData && vendaData.produtos) {
      total = vendaData.produtos.reduce(
        (acc, produto) => acc + produto.preco_unitario * produto.quantidade,
        0
      );
    }

    this.setState({
      totalVenda: total,
    });
  };

  finalizarVenda = async () => {
    const { venda, totalVenda, setShowSuccessModal } = this.state;

    try {
      await axios.post(`http://localhost:8000/api/venda-list/${venda.id}`, {
        produtos: venda.produtos,
        total: totalVenda,
      });

      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      descricaoProduto,
      quantidadeProduto,
      totalVenda,
      vendedores,
      selectedVendedor,
      clientes,
      selectedCliente,
      venda,
      dataHoraVenda,
    } = this.state;

    return (
      <div>
        <div className="rectangle-114">
          <Menu />
          <h2 className="vendas-title">Nova Venda</h2>
        </div>

        <div className="produtos-container">
          <span className="produtos-text">Produtos</span>
        </div>

        <div className="buscar-container">
          <span className="buscar-text">Buscar pelo código de barras ou descrição</span>
        </div>

        <div className="">
          <input
            className="input-text rectangle-115"
            type="text"
            value={descricaoProduto}
            onChange={(event) => this.setState({ descricaoProduto: event.target.value })}
            placeholder="Digite a descrição do produto ou número da nota fiscal com código de barras"
          />
        </div>

        <span className="quantidade-itens">Quantidade de itens</span>

        <div className="rectangle-116">
          <input
            type="text"
            className="quantidade-itens-input"
            value={quantidadeProduto}
            onChange={(event) => this.setState({ quantidadeProduto: Number(event.target.value) })}
          />
        </div>

        <div className="rectangle-117">
          <button
            className="rectangle-117-button"
            style={{ border: 'none', background: 'none', padding: '0', color: '#FFFFFF' }}
            onClick={this.adicionarProduto}
          >
            Adicionar
          </button>
        </div>

        <div>
          <div className="dados-venda">Dados da venda</div>
        </div>

        <div>
          <div className="data-hora-venda">Data e Hora da Venda</div>
          <div className="rectangle-118">
            <input
              type="datetime-local"
              value={dataHoraVenda}
              onChange={(event) => this.setState({ dataHoraVenda: event.target.value })}
              placeholder="Data e Hora da Venda"
            />
          </div>
        </div>

        <div>
          <div className="vendedor-text">Escolha um vendedor</div>
          <div className="dados-venda-vendedor">
            <select
              className="select-vendedor"
              value={selectedVendedor}
              onChange={(event) => this.setState({ selectedVendedor: event.target.value })}
            >
              <option value="">Selecione um vendedor</option>
              {vendedores.map((vendedor) => (
                <option key={vendedor.id} value={vendedor.id}>
                  {vendedor.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="choose-client">
          <div className="choose-client-container">
            <select
              className="choose-client-select"
              value={selectedCliente}
              onChange={(event) => this.setState({ selectedCliente: event.target.value })}
            >
              <option value="">Escolha um cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="valor-total-venda">Valor total da venda: R$ {totalVenda}</div>
        <button className="cancelar-button">Cancelar</button>
        <button className="finalizar-button" onClick={this.finalizarVenda}>
          Finalizar
        </button>

        {venda &&
          venda.produtos.map((produto) => (
            <div className="produto-item" key={produto.id}>
              <div className="produto-descricao">{produto.descricaoProduto}</div>
              <div className="produto-quantidade">{produto.quantidade}</div>
              <div className="produto-preco">{produto.preco_unitario}</div>
              <div className="produto-total">{produto.preco_unitario * produto.quantidade}</div>
              <FaTrash
                className="delete-icon"
                onClick={() => this.handleExcluirInformacoes(produto.id)}
              />
            </div>
          ))}
      </div>
    );
  }
}

export default NovaVenda;
