import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';
import Menu from './Menu';
import { FaTrash } from 'react-icons/fa';

class EditarVenda extends Component {
  state = {
    venda: {
      id: null,
      produtos: [],
    },
    descricaoProduto: '',
    quantidadeProduto: 0,
    produtoSelecionadoId: null,
    totalVenda: 0,
    vendedores: [],
    selectedVendedor: '',
    clientes: [],
    selectedCliente: '',
    produtosAdicionados: [],
    mostrarModal: false,
  };

  componentDidMount() {
    this.fetchVenda();
    this.fetchVendedores();
    this.fetchClientes();
  }

  fetchVenda = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/venda/');
      const vendaData = response.data;

      this.setState({ venda: vendaData });
      this.calcularTotalVenda(vendaData);
    } catch (error) {
      console.error(error);
    }
  };

  fetchVendedores = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/vendedor/');
      this.setState({ vendedores: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  fetchClientes = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cliente/');
      this.setState({ clientes: response.data });
    } catch (error) {
      console.error(error);
    }
  };

  adicionarProduto = async () => {
    const { venda, produtoSelecionadoId, quantidadeProduto } = this.state;
    try {
      const response = await axios.post('http://localhost:8000/api/venda/', {
        venda_id: venda.id,
        produto_id: produtoSelecionadoId,
        quantidade: quantidadeProduto,
      });

      const { produtos } = response.data;
      const novoProduto = produtos.find((produto) => produto.produto_id === produtoSelecionadoId);

      this.setState((prevState) => ({
        descricaoProduto: '',
        quantidadeProduto: 0,
        produtoSelecionadoId: null,
        venda: response.data,
        produtosAdicionados: [...prevState.produtosAdicionados, novoProduto],
      }));

      this.calcularTotalVenda(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  handleExcluirInformacoes = async (produtoId) => {
    const { venda } = this.state;
    try {
      await axios.delete(`http://localhost:8000/api/venda/${produtoId}`);

      const updatedVenda = {
        ...venda,
        produtos: venda.produtos.filter((produto) => produto.id !== produtoId),
      };

      this.setState({ venda: updatedVenda });
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

    this.setState({ totalVenda: total });
  };

  exibirModal = () => {
    this.setState({ mostrarModal: true });
  };

  fecharModal = () => {
    this.setState({ mostrarModal: false });
  };

  finalizarVenda = async () => {
    const { venda, totalVenda } = this.state;
    try {
      await axios.post('http://localhost:8000/api/venda/', {
        venda_id: venda.id,
        produtos: venda.produtos,
        total: totalVenda,
      });

      // Fazer algo quando a venda for finalizada

    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const {
      venda,
      descricaoProduto,
      quantidadeProduto,
      totalVenda,
      vendedores,
      selectedVendedor,
      clientes,
      selectedCliente,
      mostrarModal,
    } = this.state;

    return (
      <div>
        <div className="rectangle-114">
          <Menu />
          <h2 className="vendas-title">Alterar Nova Venda</h2>
        </div>

        <div className="produtos-container">
          <span className="produtos-text">Produtos</span>
        </div>

        <div className="buscar-container">
          <span className="buscar-text">
            Buscar pelo código de barras ou descrição
          </span>
        </div>

        <input
          className="input-text rectangle-115"
          type="text"
          value={descricaoProduto}
          onChange={(event) => this.setState({ descricaoProduto: event.target.value })}
          placeholder="Digite a descrição do produto ou número da nota fiscal com código de barras"
        />

        <span className="quantidade-itens">Quantidade de itens</span>

        <div className="rectangle-116">
          <input
            type="text"
            className="quantidade-itens-input"
            value={quantidadeProduto}
            onChange={(event) =>
              this.setState({ quantidadeProduto: Number(event.target.value) })
            }
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
            <input type="datetime-local" value={venda.dataHora} placeholder="Data e Hora da Venda" />
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
                <option key={vendedor.id} value={vendedor.id}>{vendedor.nome}</option>
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
                <option key={cliente.id} value={cliente.id}>{cliente.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="valor-total-venda">Valor total da venda: R$ {totalVenda}</div>
        <button className="cancelar-button" onClick={this.exibirModal}>Cancelar</button>
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

        {mostrarModal && (
          <div className="modal-container">
            <div className="modal">
              <h3>Deseja cancelar a venda?</h3>
              <div className="modal-buttons">
                <button className="modal-cancel-button" onClick={this.fecharModal}>
                  Não
                </button>
                <button className="modal-confirm-button" onClick={this.cancelarVenda}>
                  Sim
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default EditarVenda;
