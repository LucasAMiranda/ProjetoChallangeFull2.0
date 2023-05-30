import React, { Component } from 'react';
import axios from 'axios';
import "../App.css";

class Comissoes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      periodoInicio: '',
      periodoFim: '',
      vendedores: [],
      totalGeralComissoes: 0,
    };
  }

  calcularComissoes = async () => {
    try {
      const { periodoInicio, periodoFim } = this.state;
      const response = await axios.get('http:://api/vendedores/comissoes/', {
        params: {
          periodo_inicio: periodoInicio,
          periodo_fim: periodoFim,
        },
      });
      this.setState({ vendedores: response.data });
      this.calcularTotalGeralComissoes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  calcularTotalGeralComissoes = (vendedores) => {
    const total = vendedores.reduce((acc, vendedor) => acc + vendedor.total_comissao, 0);
    this.setState({ totalGeralComissoes: total });
  };

  handlePeriodoInicioChange = (e) => {
    this.setState({ periodoInicio: e.target.value });
  };

  handlePeriodoFimChange = (e) => {
    this.setState({ periodoFim: e.target.value });
  };

  render() {
    const { periodoInicio, periodoFim, vendedores, totalGeralComissoes } = this.state;

    return (
      <div>
        <h2>Comissões</h2>
        <div>
          <label htmlFor="periodo-inicio">Período Início:</label>
          <input
            type="date"
            id="periodo-inicio"
            value={periodoInicio}
            onChange={this.handlePeriodoInicioChange}
          />
        </div>
        <div>
          <label htmlFor="periodo-fim">Período Fim:</label>
          <input
            type="date"
            id="periodo-fim"
            value={periodoFim}
            onChange={this.handlePeriodoFimChange}
          />
        </div>
        <button onClick={this.calcularComissoes}>Calcular Comissões</button>
        <h3>Comissões por Vendedor</h3>
        <table>
          <thead>
            <tr>
              <th>Vendedor</th>
              <th>Total de Comissão</th>
            </tr>
          </thead>
          <tbody>
            {vendedores.map((vendedor) => (
              <tr key={vendedor.id}>
                <td>{vendedor.nome}</td>
                <td>{vendedor.total_comissao}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total Geral de Comissões: {totalGeralComissoes}</h3>
      </div>
    );
  }
}

export default Comissoes;
